"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");

    try {
      const mailtoLink = `mailto:baranda.gustavo@gmail.com?subject=${encodeURIComponent(
        formData.subject || `Contacto de ${formData.name}`
      )}&body=${encodeURIComponent(
        `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;
      setStatus("success");
    } catch (err) {
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
                ¡Cliente de correo abierto!
              </h4>
              <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto">
                Se ha preparado tu mensaje para enviarlo directamente a baranda.gustavo@gmail.com.
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setFormData({ name: "", email: "", subject: "", message: "" });
                }}
                className="mt-3 sm:mt-4 px-5 sm:px-6 py-2 rounded-[0.35rem] bg-indigo-600 text-white font-semibold text-xs sm:text-sm hover:bg-indigo-700 transition cursor-pointer"
              >
                Enviar otro mensaje
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label
                    htmlFor="name"
                    className="text-[0.7rem] sm:text-xs font-bold tracking-wide text-muted uppercase"
                  >
                    NOMBRE COMPLETO <span className="text-indigo-600 dark:text-indigo-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
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
                    placeholder="tu@email.com"
                    className="rounded-[0.35rem] border border-soft surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2">
                <label
                  htmlFor="subject"
                  className="text-[0.7rem] sm:text-xs font-bold tracking-wide text-muted uppercase"
                >
                  ASUNTO
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Ej. Oportunidad laboral / Consulta de proyecto"
                  className="rounded-[0.35rem] border border-soft surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:gap-2">
                <label
                  htmlFor="message"
                  className="text-[0.7rem] sm:text-xs font-bold tracking-wide text-muted uppercase"
                >
                  MENSAJE <span className="text-indigo-600 dark:text-indigo-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
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
                    <span>Procesando...</span>
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
