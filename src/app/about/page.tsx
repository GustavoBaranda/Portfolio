import HeroBio from "@/components/about/HeroBio";
import ExperienceSection from "@/components/about/ExperienceSection";
import EducationSection from "@/components/about/EducationSection";
import { Metadata } from "next";
import { getSiteUrl } from "@/config/site";

const baseUrl = getSiteUrl();

const TITLE = "Sobre mí";
const DESCRIPTION =
  "Trayectoria de Gustavo Baranda como Full Stack Developer (Python, Django, React): experiencia laboral, formación en Ciencia de Datos y enfoque en sistemas robustos.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: `${TITLE} | Gustavo Baranda`,
    description: DESCRIPTION,
    url: "/about",
    siteName: "Gustavo Baranda Portfolio",
    locale: "es_AR",
    type: "profile",
    images: [
      {
        url: "/images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Gustavo Baranda — Full Stack Developer",
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
        alt: "Gustavo Baranda — Full Stack Developer",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
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
