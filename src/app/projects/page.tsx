import ProjectsGrid from "@/components/projects/ProjectsGrid";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos | Gustavo Baranda",
  description: "Portafolio de proyectos destacados de desarrollo Full Stack: plataformas logísticas, motores bancarios ETL en Python/Django, e-commerce React y aplicaciones web.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Proyectos Destacados | Gustavo Baranda",
    description: "Explora mis soluciones de software: SysPro Turnero & Depofis, Solar Banco ETL, Fundación Maldonado y e-commerce React.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="pb-6 pt-0 sm:pb-12 space-y-12 sm:space-y-16">
      {/* Header */}
      <section className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
          Portafolio
        </p>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-balance">
          Proyectos destacados & <span className="text-indigo-600 dark:text-indigo-400">Soluciones de Software</span>.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
          Una selección de plataformas empresariales, soluciones backend, APIs REST y desarrollos frontend construidos con enfoque en rendimiento y calidad de código.
        </p>
      </section>

      {/* Grid */}
      <ProjectsGrid />

      {/* Bloque CTA Final */}
      <section className="relative overflow-hidden rounded-[0.35rem] border border-indigo-500/20 surface-card p-8 sm:p-12 text-center shadow-lg">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>¿Trabajamos juntos?</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold text-foreground leading-snug">
            ¿Tienes un proyecto en mente o buscas sumar un desarrollador Full Stack?
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
            Estoy disponible para integrarme a equipos de desarrollo, construir soluciones web empresariales o asesorarte en la arquitectura de tu plataforma.
          </p>

          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[0.35rem] bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-md shadow-indigo-600/20 hover:scale-105 cursor-pointer"
            >
              <span>Conversemos sobre tu proyecto</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
