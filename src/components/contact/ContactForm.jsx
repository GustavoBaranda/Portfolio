"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error

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

    // Abrir mailto directamente de forma fallback amigable y limpia
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
    <div className="surface-card border border-soft rounded-3xl p-6 sm:p-10 shadow-lg">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Envíame un mensaje
      </h2>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-12 text-center space-y-4"
          >
            <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              ¡Cliente de correo abierto!
            </h3>
            <p className="text-sm text-muted max-w-sm mx-auto">
              Se ha preparado tu mensaje para enviarlo directamente a baranda.gustavo@gmail.com.
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setFormData({ name: "", email: "", subject: "", message: "" });
              }}
              className="mt-4 px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
                >
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-xl surface border border-soft text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
                >
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-xl surface border border-soft text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
              >
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Ej. Oportunidad laboral / Consulta de proyecto"
                className="w-full px-4 py-3 rounded-xl surface border border-soft text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
              >
                Mensaje *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntame sobre tu proyecto o propuesta..."
                className="w-full px-4 py-3 rounded-xl surface border border-soft text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-indigo-600/20 disabled:opacity-50 cursor-pointer"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Enviar Mensaje</span>
                </>
              )}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
