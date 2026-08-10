import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { Metadata } from "next";
import { getSiteUrl } from "@/config/site";

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a Gustavo Baranda para propuestas laborales, desarrollo Full Stack, arquitectura o colaboración en proyectos de software.",
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: "Contacto | Gustavo Baranda",
    description:
      "Envíame un mensaje para propuestas de trabajo, desarrollo backend/frontend o consultas técnicas.",
    url: "/contact",
    siteName: "Gustavo Baranda Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Contacto — Gustavo Baranda",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Gustavo Baranda",
    description:
      "Envíame un mensaje para propuestas de trabajo, desarrollo backend/frontend o consultas técnicas.",
    images: ["/images/opengraph.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
          Envíame un mensaje y me pondré en contacto contigo a la brevedad para conversar sobre tus requerimientos o proyectos.
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
