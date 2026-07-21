import ProjectsGrid from "@/components/projects/ProjectsGrid";

export const metadata = {
  title: "Proyectos | Gustavo Baranda",
  description: "Explora mis proyectos de desarrollo Full Stack, APIs REST, pipelines ETL en Python, Django y React.",
};

export default function ProjectsPage() {
  return (
    <main className="pb-12 pt-4 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <p className="text-xl sm:text-2xl font-bold uppercase tracking-[0.3em] text-foreground">
          Portafolio
        </p>
        <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl text-foreground text-balance">
          Proyectos destacados & <span className="text-indigo-600">Soluciones de Software</span>.
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Una selección de plataformas empresariales, soluciones backend, APIs REST y desarrollos frontend construidos con enfoque en rendimiento y calidad de código.
        </p>
      </section>

      {/* Grid */}
      <ProjectsGrid />
    </main>
  );
}
