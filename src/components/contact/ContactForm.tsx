"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { ContactFormData, ApiResponse } from "@/types";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const validateEmail = (email: string): string => {
    if (!email) {
      return "El correo es obligatorio";
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      return "Email inválido (ej. tu@email.com)";
    }
    return "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      if (emailError) {
        setEmailError(validateEmail(value));
      }
    }
  };

  const handleEmailBlur = () => {
    if (formData.email) {
      setEmailError(validateEmail(formData.email));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const err = validateEmail(formData.email);
    if (err) {
      setEmailError(err);
      return;
    }

    if (!formData.nombre || !formData.mensaje) return;

    setStatus("loading");
    setErrorMessage("");
    setEmailError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setErrorMessage(data.error || "Ocurrió un error al enviar el mensaje.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("No se pudo conectar con el servidor. Inténtalo de nuevo.");
      setStatus("error");
    }
  };

  return (
    <div className="rounded-[0.35rem] border border-soft surface-card p-4 sm:p-8 shadow-sm flex flex-col justify-between h-full">
      <div>
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
              <h4 className="text-lg sm:text-xl font-bold text-foreground">
                ¡Mensaje enviado con éxito!
              </h4>
              <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto">
                Gracias por escribirme. Tu mensaje ha sido enviado directamente a mi correo y te responderé lo antes posible.
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
                  setEmailError("");
                }}
                className="mt-3 sm:mt-4 px-5 sm:px-6 py-2 rounded-[0.35rem] bg-indigo-600 text-white font-semibold text-xs sm:text-sm hover:bg-indigo-700 transition cursor-pointer"
              >
                Enviar otro mensaje
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5" noValidate>
              {status === "error" && (
                <div className="flex items-start gap-2.5 p-3 rounded-[0.35rem] bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs sm:text-sm">
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
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="rounded-[0.35rem] border border-soft surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 focus:outline-none"
                  />
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
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                    placeholder="tu@email.com"
                    className={`rounded-[0.35rem] border surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted focus:outline-none transition-colors ${
                      emailError
                        ? "border-rose-500/70 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                        : "border-soft focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                    }`}
                  />
                  {emailError && (
                    <span className="text-[0.7rem] font-medium text-rose-500 dark:text-rose-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{emailError}</span>
                    </span>
                  )}
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
                  type="text"
                  value={formData.asunto}
                  onChange={handleChange}
                  placeholder="Ej. Oportunidad laboral / Consulta de proyecto"
                  className="rounded-[0.35rem] border border-soft surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 focus:outline-none"
                />
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
                  rows={4}
                  required
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntame sobre tu proyecto o propuesta..."
                  className="rounded-[0.35rem] border border-soft surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted resize-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 focus:outline-none"
                />
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
