import type { ContactFormData } from "@/types";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { CONTACT_FIELDS, type ContactFieldErrors } from "./contact-validation";

type ContactAttemptResult =
  | { success: true }
  | { success: false; error: string; fieldErrors: ContactFieldErrors };

/** One explicit submission, never an automatic retry. No SMTP or server state. */
export async function sendContactAttempt(
  data: ContactFormData,
  company: string,
  clearTransientFields: () => void,
  request: typeof fetch = fetch,
  locale: Locale = DEFAULT_LOCALE,
): Promise<ContactAttemptResult> {
  const unconfirmed = getDictionary(locale).contact.feedback.unconfirmed;
  try {
    const response = await request("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept-Language": locale },
      body: JSON.stringify({ ...data, company }),
    });
    const value: unknown = await response.json();
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      return { success: false, error: unconfirmed, fieldErrors: {} };
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
      error: typeof body.error === "string" && body.error.trim() ? body.error : unconfirmed,
      fieldErrors,
    };
  } catch {
    return { success: false, error: unconfirmed, fieldErrors: {} };
  } finally {
    clearTransientFields();
  }
}
