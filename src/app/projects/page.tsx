import ProjectsGrid from "@/components/projects/ProjectsGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getSiteUrl } from "@/config/site";

const baseUrl = getSiteUrl();

const TITLE = "Proyectos";
const DESCRIPTION =
  "Casos de estudio de desarrollo Full Stack: logística fiscal, e-commerce, PWA, APIs REST, ETL bancario (LCR/VaR) y productos web con Python, Django, React y TypeScript.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
  openGraph: {
    title: `${TITLE} | Gustavo Baranda`,
    description: DESCRIPTION,
    url: "/projects",
    siteName: "Gustavo Baranda Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Proyectos destacados — Gustavo Baranda",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Gustavo Baranda`,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Proyectos destacados — Gustavo Baranda",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProjectsPage() {
  return (
    <div className="pb-6 pt-0 sm:pb-12 space-y-12 sm:space-y-16">
      <section className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
          Portafolio
        </p>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-balance">
          Proyectos destacados &{" "}
          <span className="text-indigo-600 dark:text-indigo-400">Soluciones de Software</span>.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
          Cada ítem se presenta como caso de estudio: desafío, solución y rol, stack técnico y
          enlaces a demo o repositorio cuando están disponibles.
        </p>
      </section>

      <ProjectsGrid />

      <section className="mt-4 sm:mt-8 rounded-[0.35rem] border border-soft surface-card px-6 py-10 sm:px-12 sm:py-14 text-center shadow-sm">
        <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
            Contacto
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground leading-snug text-balance">
            ¿Tenés un proyecto o un equipo donde pueda sumar?
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Disponible para desarrollo full stack, soluciones web o arquitectura.
          </p>

          <div className="pt-2">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-[0.35rem] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer"
            >
              <span>Conversemos sobre tu proyecto</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
