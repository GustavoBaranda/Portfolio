"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowRight, FolderOpen } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-225px)] px-6 py-16">
      {/* Numero 404 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="relative select-none mb-6"
      >
        <span
          className="text-[8rem] sm:text-[11rem] md:text-[14rem] font-extrabold leading-none tracking-tighter text-indigo-600/10 dark:text-indigo-400/10"
          aria-hidden="true"
        >
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <FolderOpen className="w-7 h-7 sm:w-8 sm:h-8" />
          </span>
        </div>
      </motion.div>

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="space-y-3 max-w-md"
      >
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          Error 404
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
          Pagina no encontrada
        </h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          La ruta que buscos no existe o fue movida. Podes volver al inicio o explorar los proyectos.
        </p>
      </motion.div>

      {/* Botones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex flex-col sm:flex-row items-center gap-3 mt-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[0.35rem] bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Home className="w-4 h-4" />
          <span>Ir al inicio</span>
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[0.35rem] border border-soft surface-glass text-sm font-semibold text-muted hover:text-foreground hover:border-indigo-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <span>Ver proyectos</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-12 w-16 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}

