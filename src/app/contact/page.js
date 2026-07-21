import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata = {
  title: "Contacto | Gustavo Baranda",
  description: "Ponte en contacto con Gustavo Baranda para propuestas laborales, desarrollo de software o colaboración en proyectos.",
};

export default function ContactPage() {
  return (
    <section id="contacto" className="py-4 sm:py-12 px-1 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Encabezado */}
      <header className="text-center mb-6 sm:mb-12">
        <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-2 sm:mb-3 uppercase">
          CONTACTO
        </p>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground text-balance">
          ¿Tienes una idea o proyecto? <span className="text-indigo-600 dark:text-indigo-400">Hablemos.</span>
        </h1>
        <p className="mt-3 sm:mt-4 text-muted max-w-2xl mx-auto leading-relaxed text-pretty text-xs sm:text-base">
          Estoy disponible para colaborar en proyectos desafiantes, integrarme a equipos de desarrollo o construir soluciones a medida.
        </p>
      </header>

      {/* Grid principal */}
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-2 items-stretch">
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
}

