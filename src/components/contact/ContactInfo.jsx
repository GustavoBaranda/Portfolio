"use client";

import { Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="rounded-[0.35rem] border border-soft surface-card p-5 sm:p-8 shadow-sm flex flex-col justify-between h-full">
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Availability Badge */}
        <span className="inline-flex w-fit items-center gap-2 rounded-[0.35rem] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          Disponible para nuevas oportunidades
        </span>

        {/* Title */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">Detalles de Contacto</h3>
          <p className="mt-1 text-xs sm:text-sm text-muted leading-relaxed">
            Puedes escribirme por correo directo o mediante el formulario de la izquierda.
          </p>
        </div>

        {/* Contact List */}
        <div className="flex flex-col gap-3">
          {/* Correo */}
          <a
            href="mailto:baranda.gustavo@gmail.com"
            className="group flex items-center gap-3.5 rounded-[0.35rem] border border-soft p-3.5 sm:p-4 transition-colors hover:border-indigo-500/40 hover:bg-surface min-w-0"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.35rem] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Mail className="w-5 h-5" />
            </span>
            <span className="flex flex-col min-w-0 flex-1">
              <span className="text-[0.65rem] sm:text-xs font-bold tracking-wide text-muted uppercase">CORREO ELECTRÓNICO</span>
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate">baranda.gustavo@gmail.com</span>
            </span>
            <ArrowUpRight className="ml-auto w-4 h-4 text-muted transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0" />
          </a>

          {/* Ubicación */}
          <div className="flex items-center gap-3.5 rounded-[0.35rem] border border-soft p-3.5 sm:p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.35rem] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <MapPin className="w-5 h-5" />
            </span>
            <span className="flex flex-col min-w-0 flex-1">
              <span className="text-[0.65rem] sm:text-xs font-bold tracking-wide text-muted uppercase">UBICACIÓN</span>
              <span className="text-xs sm:text-sm font-semibold text-foreground">Buenos Aires, Argentina</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
