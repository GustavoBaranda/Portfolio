import ProjectsGrid from "@/components/projects/ProjectsGrid";

export const metadata = {
  title: "Proyectos | Gustavo Baranda",
  description: "Explora mis proyectos de desarrollo Full Stack, APIs REST, pipelines ETL en Python, Django y React.",
};

export default function ProjectsPage() {
  return (
    <div className="pb-6 pt-0 sm:pb-12 space-y-8 sm:space-y-12">
      {/* Header */}
      <section className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
          Portafolio
        </p>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-balance">
          Proyectos destacados & <span className="text-indigo-600">Soluciones de Software</span>.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
          Una selección de plataformas empresariales, soluciones backend, APIs REST y desarrollos frontend construidos con enfoque en rendimiento y calidad de código.
        </p>
      </section>

      {/* Grid */}
      <ProjectsGrid />
    </div>
  );
}
