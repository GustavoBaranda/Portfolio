import type { ContactFormData } from "@/types";

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const CONTACT_FIELDS = ["nombre", "email", "asunto", "mensaje"] as const;
export type ContactFieldErrors = Partial<Record<keyof ContactFormData, string>>;

// Shared by the browser and server; contains no credentials or server state.
export function validateContactFields(data: ContactFormData): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  if (!data.nombre.trim()) errors.nombre = "Ingresá tu nombre.";
  else if (data.nombre.length > 100) errors.nombre = "El nombre no puede superar los 100 caracteres.";
  else if (/[\r\n\0]/.test(data.nombre)) errors.nombre = "El nombre contiene caracteres no permitidos.";
  if (!data.email.trim()) errors.email = "Ingresá tu correo electrónico.";
  else if (data.email.length > 254 || !EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Ingresá un correo electrónico válido (ej. tu@email.com).";
  }
  if (data.asunto.length > 200) errors.asunto = "El asunto no puede superar los 200 caracteres.";
  else if (/[\r\n\0]/.test(data.asunto)) errors.asunto = "El asunto contiene caracteres no permitidos.";
  if (!data.mensaje.trim()) errors.mensaje = "Escribí tu mensaje.";
  else if (data.mensaje.length > 2000) errors.mensaje = "El mensaje no puede superar los 2000 caracteres.";
  return errors;
}

export function parseContactPayload(value: unknown):
  | { success: true; data: ContactFormData; company: string }
  | { success: false; error: string; fieldErrors?: ContactFieldErrors } {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { success: false, error: "El cuerpo debe ser un objeto JSON." };
  }
  const body = value as Record<string, unknown>;
  if (CONTACT_FIELDS.some((field) => typeof body[field] !== "string") ||
      (body.company !== undefined && typeof body.company !== "string")) {
    return { success: false, error: "Los campos del formulario deben ser texto." };
  }
  const data = Object.fromEntries(CONTACT_FIELDS.map((field) => [field, body[field]])) as unknown as ContactFormData;
  const fieldErrors = validateContactFields(data);
  if (Object.keys(fieldErrors).length) {
    return { success: false, error: "Revisá los campos indicados antes de enviar.", fieldErrors };
  }
  return {
    success: true,
    data: { nombre: data.nombre.trim(), email: data.email.trim(), asunto: data.asunto.trim(), mensaje: data.mensaje.trim() },
    company: typeof body.company === "string" ? body.company : "",
  };
}
