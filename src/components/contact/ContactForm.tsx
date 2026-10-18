"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import type { ContactFormData } from "@/types";
import { CONTACT_FIELDS, validateContactFields, type ContactFieldErrors } from "@/lib/contact-validation";
import { sendContactAttempt } from "@/lib/contact-client";

function FieldError({ name, errors }: { name: keyof ContactFormData; errors: ContactFieldErrors }) {
  if (!errors[name]) return null;
  return (
    <span id={name + "-error"} className="text-xs font-medium text-rose-600 dark:text-rose-400">
      {errors[name]}
    </span>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [company, setCompany] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const submitting = useRef(false);
  const restoreFocus = useRef(false);

  const focusField = (field: keyof ContactFormData) => {
    const input = formRef.current?.elements.namedItem(field);
    if (input instanceof HTMLElement) input.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof ContactFormData;
    const next = { ...formData, [name]: e.target.value };
    setFormData(next);
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: validateContactFields(next)[name] }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current) return;
    const errors = validateContactFields(formData);
    setFieldErrors(errors);
    const firstError = CONTACT_FIELDS.find((field) => errors[field]);
    if (firstError) {
      setErrorMessage("Revisá los campos indicados antes de enviar.");
      setStatus("error");
      focusField(firstError);
      return;
    }
    submitting.current = true;
    setStatus("loading");
    setErrorMessage("");
    try {
      const result = await sendContactAttempt(formData, company, () => setCompany(""));
      if (result.success) {
        setStatus("success");
      } else {
        setFieldErrors(result.fieldErrors);
        setErrorMessage(result.error);
        setStatus("error");
        const first = CONTACT_FIELDS.find((field) => result.fieldErrors[field]);
        // Wait for React to commit the error text and aria-describedby before
        // focusing. General errors receive focus so retry remains discoverable.
        requestAnimationFrame(() => {
          if (first) focusField(first);
          else errorRef.current?.focus();
        });
      }
    } finally {
      submitting.current = false;
    }
  };

  return (
    <div className="rounded-[0.35rem] border border-soft surface-card p-4 sm:p-8 shadow-sm flex flex-col justify-between h-full">
      <div>
        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {status === "loading" ? "Enviando mensaje." : status === "success" ? "El servicio de correo aceptó tu mensaje." : ""}
        </p>
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-8 sm:py-12 text-center space-y-3 sm:space-y-4"
            >
              <div className="inline-flex p-3 sm:p-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <h4 tabIndex={-1} ref={(node) => { node?.focus(); }} className="text-lg sm:text-xl font-bold text-foreground">
                ¡Mensaje enviado con éxito!
              </h4>
              <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto">
                Gracias por escribirme. El servicio de correo aceptó tu mensaje para su entrega. Te responderé lo antes posible.
              </p>
              <button
                onClick={() => {
                  restoreFocus.current = true;
                  setStatus("idle");
                  setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
                  setFieldErrors({});
                  setCompany("");
                  setErrorMessage("");
                }}
                className="mt-3 sm:mt-4 px-5 sm:px-6 py-2 rounded-[0.35rem] bg-indigo-600 text-white font-semibold text-xs sm:text-sm hover:bg-indigo-700 transition cursor-pointer"
              >
                Enviar otro mensaje
              </button>
            </motion.div>
          ) : (
            <form
              ref={(node) => {
                formRef.current = node;
                if (node && restoreFocus.current) {
                  restoreFocus.current = false;
                  (node.elements.namedItem("nombre") as HTMLElement)?.focus();
                }
              }}
              aria-busy={status === "loading"}
              onSubmit={handleSubmit}
              className="relative flex flex-col gap-4 sm:gap-5"
              noValidate
            >
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="company">Empresa</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              {status === "error" && (
                <div ref={errorRef} role="alert" tabIndex={-1} className="flex items-start gap-2.5 p-3 rounded-[0.35rem] bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label
                    htmlFor="nombre"
                    className="text-[0.7rem] sm:text-xs font-bold tracking-wide text-muted uppercase"
                  >
                    NOMBRE <span className="text-indigo-600 dark:text-indigo-400">*</span>
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    aria-invalid={Boolean(fieldErrors.nombre)}
                    aria-describedby={fieldErrors.nombre ? "nombre-error" : undefined}
                    type="text"
                    required
                    maxLength={100}
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="rounded-[0.35rem] border border-soft surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 focus:outline-none"
                  />
                  <FieldError name="nombre" errors={fieldErrors} />
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label
                    htmlFor="email"
                    className="text-[0.7rem] sm:text-xs font-bold tracking-wide text-muted uppercase"
                  >
                    CORREO ELECTRÓNICO <span className="text-indigo-600 dark:text-indigo-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    type="email"
                    required
                    maxLength={254}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => setFieldErrors((prev) => ({ ...prev, email: validateContactFields(formData).email }))}
                    placeholder="tu@email.com"
                    className={`rounded-[0.35rem] border surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted focus:outline-none transition-colors ${
                      fieldErrors.email
                        ? "border-rose-500/70 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                        : "border-soft focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                    }`}
                  />
                  <FieldError name="email" errors={fieldErrors} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2">
                <label
                  htmlFor="asunto"
                  className="text-[0.7rem] sm:text-xs font-bold tracking-wide text-muted uppercase"
                >
                  ASUNTO
                </label>
                <input
                  id="asunto"
                  name="asunto"
                  aria-invalid={Boolean(fieldErrors.asunto)}
                  aria-describedby={fieldErrors.asunto ? "asunto-error" : undefined}
                  type="text"
                  maxLength={200}
                  value={formData.asunto}
                  onChange={handleChange}
                  placeholder="Ej. Oportunidad laboral / Consulta de proyecto"
                  className="rounded-[0.35rem] border border-soft surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 focus:outline-none"
                />
                  <FieldError name="asunto" errors={fieldErrors} />
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2">
                <label
                  htmlFor="mensaje"
                  className="text-[0.7rem] sm:text-xs font-bold tracking-wide text-muted uppercase"
                >
                  MENSAJE <span className="text-indigo-600 dark:text-indigo-400">*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  aria-invalid={Boolean(fieldErrors.mensaje)}
                  aria-describedby={fieldErrors.mensaje ? "mensaje-error" : undefined}
                  rows={4}
                  required
                  maxLength={2000}
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntame sobre tu proyecto o propuesta..."
                  className="rounded-[0.35rem] border border-soft surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted resize-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 focus:outline-none"
                />
                  <FieldError name="mensaje" errors={fieldErrors} />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-[0.35rem] bg-indigo-600 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600/40 cursor-pointer disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Enviando correo...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>
            </form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
