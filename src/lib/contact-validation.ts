import type { ContactFormData } from "@/types";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const CONTACT_FIELDS = ["nombre", "email", "asunto", "mensaje"] as const;
export type ContactFieldErrors = Partial<Record<keyof ContactFormData, string>>;

export function validateContactFields(
  data: ContactFormData,
  locale: Locale = DEFAULT_LOCALE,
): ContactFieldErrors {
  const messages = getDictionary(locale).contact.validation;
  const errors: ContactFieldErrors = {};
  if (!data.nombre.trim()) errors.nombre = messages.nameRequired;
  else if (data.nombre.length > 100) errors.nombre = messages.nameTooLong;
  else if (/[\r\n\0]/.test(data.nombre)) errors.nombre = messages.nameInvalid;
  if (!data.email.trim()) errors.email = messages.emailRequired;
  else if (data.email.length > 254 || !EMAIL_REGEX.test(data.email.trim())) errors.email = messages.emailInvalid;
  if (data.asunto.length > 200) errors.asunto = messages.subjectTooLong;
  else if (/[\r\n\0]/.test(data.asunto)) errors.asunto = messages.subjectInvalid;
  if (!data.mensaje.trim()) errors.mensaje = messages.messageRequired;
  else if (data.mensaje.length > 2000) errors.mensaje = messages.messageTooLong;
  return errors;
}

export function parseContactPayload(value: unknown, locale: Locale = DEFAULT_LOCALE):
  | { success: true; data: ContactFormData; company: string }
  | { success: false; error: string; fieldErrors?: ContactFieldErrors } {
  const dictionary = getDictionary(locale);
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { success: false, error: dictionary.contact.server.invalidBody };
  }
  const body = value as Record<string, unknown>;
  if (CONTACT_FIELDS.some((field) => typeof body[field] !== "string") ||
      (body.company !== undefined && typeof body.company !== "string")) {
    return { success: false, error: dictionary.contact.server.textFields };
  }
  const data = Object.fromEntries(CONTACT_FIELDS.map((field) => [field, body[field]])) as unknown as ContactFormData;
  const fieldErrors = validateContactFields(data, locale);
  if (Object.keys(fieldErrors).length) {
    return { success: false, error: dictionary.contact.validation.reviewFields, fieldErrors };
  }
  return {
    success: true,
    data: { nombre: data.nombre.trim(), email: data.email.trim(), asunto: data.asunto.trim(), mensaje: data.mensaje.trim() },
    company: typeof body.company === "string" ? body.company : "",
  };
}
