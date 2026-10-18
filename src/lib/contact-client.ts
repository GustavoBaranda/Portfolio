import type { ContactFormData } from "@/types";
import { CONTACT_FIELDS, type ContactFieldErrors } from "./contact-validation";

type ContactAttemptResult =
  | { success: true }
  | { success: false; error: string; fieldErrors: ContactFieldErrors };

const UNCONFIRMED = "No se pudo confirmar el envío. Podés intentarlo nuevamente o escribirme por correo directo. Tus datos se conservan.";

/** One explicit submission, never an automatic retry. No SMTP or server state. */
export async function sendContactAttempt(
  data: ContactFormData,
  company: string,
  clearTransientFields: () => void,
  request: typeof fetch = fetch,
): Promise<ContactAttemptResult> {
  try {
    const response = await request("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, company }),
    });
    const value: unknown = await response.json();
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      return { success: false, error: UNCONFIRMED, fieldErrors: {} };
    }
    const body = value as Record<string, unknown>;
    if (response.ok && body.success === true) return { success: true };
    const fieldErrors: ContactFieldErrors = {};
    if (typeof body.fieldErrors === "object" && body.fieldErrors !== null) {
      const fields = body.fieldErrors as Record<string, unknown>;
      for (const field of CONTACT_FIELDS) {
        if (typeof fields[field] === "string") fieldErrors[field] = fields[field];
      }
    }
    return {
      success: false,
      error: typeof body.error === "string" && body.error.trim() ? body.error : UNCONFIRMED,
      fieldErrors,
    };
  } catch {
    return { success: false, error: UNCONFIRMED, fieldErrors: {} };
  } finally {
    // Reset only transient fields after every outcome, without signalling which
    // protection rejected the request. The visitor must choose to submit again.
    clearTransientFields();
  }
}
