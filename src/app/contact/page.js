import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata = {
  title: "Contacto | Gustavo Baranda",
  description: "Ponte en contacto con Gustavo Baranda para propuestas laborales, desarrollo de software o colaboración en proyectos.",
};

export default function ContactPage() {
  return (
    <main className="pb-12 pt-4 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <p className="text-xl sm:text-2xl font-bold uppercase tracking-[0.3em] text-foreground">
          Contacto
        </p>
        <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl text-foreground text-balance">
          ¿Tienes una idea o proyecto? <span className="text-indigo-600">Hablemos</span>.
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Estoy disponible para colaborar en proyectos desafiantes, integrarme a equipos de desarrollo o construir soluciones a medida.
        </p>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
        <div className="lg:col-span-5">
          <ContactInfo />
        </div>
      </div>
    </main>
  );
}
