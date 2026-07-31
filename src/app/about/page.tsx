import HeroBio from "@/components/about/HeroBio";
import ExperienceSection from "@/components/about/ExperienceSection";
import EducationSection from "@/components/about/EducationSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí | Gustavo Baranda",
  description: "Conoce mi trayectoria profesional como desarrollador Full Stack Python/Django & React, formación en Ciencia de Datos y experiencia laboral en desarrollo de software.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Sobre mí | Gustavo Baranda - Full Stack Developer",
    description: "Trayectoria técnica, desarrollo backend en Python/Django, interfaces en React y formación en Ciencia de Datos en UniCABA.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="pb-6 pt-0 md:py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        <HeroBio />
        <ExperienceSection />
        <EducationSection />
      </div>
    </main>
  );
}
