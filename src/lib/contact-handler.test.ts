import assert from "node:assert/strict";
import { test } from "node:test";
import { handleContactRequest, MAX_CONTACT_BODY_BYTES } from "./contact-handler";
import { parseContactPayload, validateContactFields } from "./contact-validation";
import { sendContactAttempt } from "./contact-client";
import { isRateLimited } from "./contact";

const valid = { nombre: " Ada ", email: "ada@example.com", asunto: " Trabajo ", mensaje: " Hola ", company: "" };
const originOptions = { baseUrl: "https://gustavobaranda.com", nodeEnv: "production" };
function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request("https://gustavobaranda.com/api/contact", {
    method: "POST", headers: { origin: originOptions.baseUrl, "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}
function fixture() {
  const sent: unknown[] = [];
  return { sent, deps: { originOptions, rateLimited: () => false, send: async (data: unknown) => { sent.push(data); } } };
}

test("validation identifies every empty required field, including whitespace", () => {
  assert.deepEqual(Object.keys(validateContactFields({ nombre: "  ", email: " ", asunto: "", mensaje: "\n" })), ["nombre", "email", "mensaje"]);
});

test("payload rejects null, arrays, non-string fields and malformed email", () => {
  for (const body of [null, [], "text", 2, {}, { ...valid, nombre: 42 }, { ...valid, mensaje: {} }, { ...valid, company: [] }, { ...valid, email: "bad" }, { ...valid, nombre: "\0" }, { ...valid, asunto: "hi\r\nBcc: other@example.com" }]) {
    assert.equal(parseContactPayload(body).success, false);
  }
});

test("payload enforces field length limits", () => {
  for (const [field, limit] of [["nombre", 100], ["email", 254], ["asunto", 200], ["mensaje", 2000]] as const) {
    const result = parseContactPayload({ ...valid, [field]: "a".repeat(limit + 1) });
    assert.equal(result.success, false);
    if (!result.success) assert.ok(result.fieldErrors?.[field]);
  }
});

test("valid message sends normalized data exactly once without a client timestamp", async () => {
  const { sent, deps } = fixture();
  const res = await handleContactRequest(request(), deps);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).success, true);
  assert.deepEqual(sent, [{ nombre: "Ada", email: "ada@example.com", asunto: "Trabajo", mensaje: "Hola" }]);
  assert.equal(res.headers.get("cache-control"), "no-store");
});

test("honeypot rejection never reports success or sends mail", async () => {
  const { sent, deps } = fixture();
  const res = await handleContactRequest(request({ ...valid, company: "Autofilled" }), deps);
  assert.equal(res.status, 400);
  const result = await res.json();
  assert.equal(result.success, false);
  assert.ok(!/company|empresa|honeypot|campo oculto/i.test(result.error));
  assert.equal(sent.length, 0);
});

test("client recovers from accidental autofill only on a second manual submission", async () => {
  const { sent, deps } = fixture();
  const fields = Object.freeze({ nombre: "Ada", email: "ada@example.com", asunto: "Trabajo", mensaje: "Mi propuesta" });
  let company = "Accidental autofill";
  const payloads: Record<string, unknown>[] = [];
  const store = new Map<string, number[]>();
  const requestOnce: typeof fetch = async (_url, init) => {
    const payload = JSON.parse(String(init?.body));
    payloads.push(payload);
    return handleContactRequest(request(payload), {
      ...deps, rateLimited: (ip) => isRateLimited(ip, 1000, store),
    });
  };
  const clear = () => { company = ""; };

  const first = await sendContactAttempt(fields, company, clear, requestOnce);
  assert.equal(first.success, false);
  assert.equal(company, "");
  assert.equal(payloads.length, 1); // No retry, even though the transient value is cleared.
  assert.equal(sent.length, 0);
  assert.deepEqual(fields, { nombre: "Ada", email: "ada@example.com", asunto: "Trabajo", mensaje: "Mi propuesta" });
  if (!first.success) assert.ok(!/company|empresa|honeypot/i.test(first.error));

  const second = await sendContactAttempt(fields, company, clear, requestOnce);
  assert.equal(second.success, true);
  assert.equal(payloads.length, 2);
  assert.equal(payloads[0].company, "Accidental autofill");
  assert.deepEqual(payloads[1], { ...fields, company: "" });
  assert.deepEqual(sent, [fields]);
});

test("clearing the client trap never bypasses the existing IP quota", async () => {
  const { sent, deps } = fixture();
  const store = new Map<string, number[]>([["unknown", [1000, 1000]]]);
  let company = "Autofilled";
  let calls = 0;
  const requestOnce: typeof fetch = async (_url, init) => {
    calls++;
    return handleContactRequest(request(JSON.parse(String(init?.body))), {
      ...deps, rateLimited: (ip) => isRateLimited(ip, 1000, store),
    });
  };
  const clear = () => { company = ""; };
  const first = await sendContactAttempt(valid, company, clear, requestOnce);
  assert.equal(first.success, false);
  assert.equal(calls, 1);
  const second = await sendContactAttempt(valid, company, clear, requestOnce);
  assert.equal(second.success, false);
  if (!second.success) assert.match(second.error, /Demasiados intentos/);
  assert.equal(calls, 2);
  assert.equal(sent.length, 0);
});

test("a refilled trap is still rejected on each explicit attempt", async () => {
  const { sent, deps } = fixture();
  const requestOnce: typeof fetch = async (_url, init) =>
    handleContactRequest(request(JSON.parse(String(init?.body))), deps);
  for (let attempt = 0; attempt < 2; attempt++) {
    let company = "Refilled";
    const result = await sendContactAttempt(valid, company, () => { company = ""; }, requestOnce);
    assert.equal(result.success, false);
    assert.equal(company, "");
  }
  assert.equal(sent.length, 0);
});

test("client preserves server messages and field errors for 400, 429 and 503", async (t) => {
  for (const status of [400, 429, 503]) {
    await t.test(String(status), async () => {
      const message = status === 400 ? "Revisá los campos indicados." : status === 429 ? "Demasiados intentos." : "No pudimos confirmar el envío.";
      let calls = 0;
      let cleared = 0;
      const fieldErrors = status === 400 ? { nombre: "Ingresá tu nombre." } : {};
      const result = await sendContactAttempt(valid, "Autofilled", () => { cleared++; }, async () => {
        calls++;
        return Response.json({ success: false, error: message, fieldErrors }, { status });
      });
      assert.deepEqual(result, { success: false, error: message, fieldErrors });
      assert.equal(calls, 1);
      assert.equal(cleared, 1);
    });
  }
});

test("network and invalid JSON errors allow manual recovery without losing fields", async () => {
  for (const requestOnce of [
    async () => { throw new TypeError("Network failure"); },
    async () => new Response("<html>Error</html>", { status: 503 }),
    async () => Response.json(null, { status: 400 }),
  ]) {
    let cleared = false;
    let calls = 0;
    const before = { ...valid };
    const result = await sendContactAttempt(valid, "Autofilled", () => { cleared = true; }, async () => {
      calls++;
      return requestOnce();
    });
    assert.equal(result.success, false);
    if (!result.success) assert.match(result.error, /Tus datos se conservan/);
    assert.equal(cleared, true);
    assert.equal(calls, 1);
    assert.deepEqual(valid, before);
  }
});

test("bad origins and rate limits stop delivery", async () => {
  const { sent, deps } = fixture();
  assert.equal((await handleContactRequest(request(valid, { origin: "https://other.example" }), deps)).status, 403);
  const limited = await handleContactRequest(request(), { ...deps, rateLimited: () => true });
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "600");
  assert.equal(sent.length, 0);
});

test("invalid JSON, types and content type are client errors, not SMTP calls", async () => {
  const { sent, deps } = fixture();
  const broken = new Request("https://gustavobaranda.com/api/contact", {
    method: "POST", headers: { origin: originOptions.baseUrl, "content-type": "application/json" }, body: "{",
  });
  assert.equal((await handleContactRequest(broken, deps)).status, 400);
  for (const value of [null, [], { ...valid, nombre: {} }]) {
    assert.equal((await handleContactRequest(request(value), deps)).status, 400);
  }
  assert.equal((await handleContactRequest(request(valid, { "content-type": "text/plain" }), deps)).status, 415);
  const invalidFields = await handleContactRequest(request({ ...valid, nombre: " " }), deps);
  assert.ok((await invalidFields.json()).fieldErrors.nombre);
  assert.equal(sent.length, 0);
});

test("body limit applies to the actual stream, even without content-length", async () => {
  const { sent, deps } = fixture();
  const response = await handleContactRequest(request({ ...valid, mensaje: "a".repeat(MAX_CONTACT_BODY_BYTES) }), deps);
  assert.equal(response.status, 413);
  assert.equal((await response.json()).success, false);
  assert.equal(sent.length, 0);
});

test("delivery failure returns 503 without exposing provider details", async (t) => {
  const { deps } = fixture();
  t.mock.method(console, "error", () => {});
  const response = await handleContactRequest(request(), { ...deps, send: async () => { throw new Error("private-provider-detail"); } });
  assert.equal(response.status, 503);
  const body = await response.text();
  assert.equal(JSON.parse(body).success, false);
  assert.ok(!body.includes("private-provider-detail"));
});

test("success is withheld until the delivery promise resolves", async () => {
  const { deps } = fixture();
  let release!: () => void;
  const accepted = new Promise<void>((resolve) => { release = resolve; });
  let completed = false;
  const response = handleContactRequest(request(), { ...deps, send: () => accepted }).then((res) => { completed = true; return res; });
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal(completed, false);
  release();
  assert.equal((await response).status, 200);
});
