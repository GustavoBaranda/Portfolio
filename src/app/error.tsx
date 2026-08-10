"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[Error boundary]:", error.message ?? "Unknown error");
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-225px)] px-6 py-16">
      {/* Icono */}
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20 mb-6"
      >
        <AlertTriangle className="w-8 h-8" />
      </motion.span>

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="space-y-3 max-w-md mb-8"
      >
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-rose-500 dark:text-rose-400">
          Error inesperado
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
          Algo salio mal
        </h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          Ocurrio un error al cargar esta pagina. Podes intentarlo de nuevo o volver al inicio.
        </p>
        {process.env.NODE_ENV === "development" && error.message && (
          <p className="mt-3 text-xs font-mono bg-rose-500/5 border border-rose-500/15 text-rose-600 dark:text-rose-400 rounded-[0.35rem] px-3 py-2 break-all">
            {error.message}
          </p>
        )}
      </motion.div>

      {/* Botones */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25 }}
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[0.35rem] bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Intentar de nuevo</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[0.35rem] border border-soft surface-glass text-sm font-semibold text-muted hover:text-foreground hover:border-indigo-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Home className="w-4 h-4" />
          <span>Ir al inicio</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-12 w-16 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}

