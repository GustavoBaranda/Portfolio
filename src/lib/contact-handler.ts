import type { ContactFormData } from "@/types";
import { clientIp, isAllowedOrigin, isHoneypot, isRateLimited } from "./contact";
import { parseContactPayload } from "./contact-validation";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const MAX_CONTACT_BODY_BYTES = 16 * 1024;
type OriginOptions = Parameters<typeof isAllowedOrigin>[1];

interface ContactDependencies {
  originOptions: OriginOptions;
  send: (data: ContactFormData) => Promise<void>;
  rateLimited?: (ip: string) => boolean;
  locale?: Locale;
}

class PayloadTooLarge extends Error {}

async function readJson(req: Request): Promise<unknown> {
  if (Number(req.headers.get("content-length")) > MAX_CONTACT_BODY_BYTES) throw new PayloadTooLarge();
  if (!req.body) throw new SyntaxError();
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_CONTACT_BODY_BYTES) {
        await reader.cancel();
        throw new PayloadTooLarge();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

// Injection keeps regression tests away from SMTP and real credentials.
export async function handleContactRequest(req: Request, deps: ContactDependencies): Promise<Response> {
  const locale = deps.locale ?? DEFAULT_LOCALE;
  const messages = getDictionary(locale).contact.server;
  const fail = (status: number, error: string, extra = {}) =>
    Response.json({ success: false, error, ...extra }, { status, headers: { "Cache-Control": "no-store" } });
  if (!isAllowedOrigin(req.headers.get("origin"), deps.originOptions)) return fail(403, messages.originDenied);
  if ((deps.rateLimited ?? isRateLimited)(clientIp(req.headers))) {
    return Response.json({ success: false, error: messages.rateLimited },
      { status: 429, headers: { "Retry-After": "600", "Cache-Control": "no-store" } });
  }
  if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return fail(415, messages.jsonRequired);
  }
  let body: unknown;
  try { body = await readJson(req); }
  catch (error) {
    return error instanceof PayloadTooLarge ? fail(413, messages.tooLarge) : fail(400, messages.invalidJson);
  }
  const parsed = parseContactPayload(body, locale);
  if (!parsed.success) return fail(400, parsed.error, { fieldErrors: parsed.fieldErrors });
  if (isHoneypot(parsed.company)) {
    return fail(400, messages.blocked);
  }
  try {
    await deps.send(parsed.data);
  } catch {
    // Don't log SMTP errors: they may include account or recipient details.
    console.error("[contact] El proveedor de correo no confirmó la aceptación del mensaje.");
    return fail(503, messages.deliveryFailed);
  }
  return Response.json({ success: true, message: messages.accepted },
    { headers: { "Cache-Control": "no-store" } });
}
