import AnimatedText from '@/components/utils/AnimatedText';
import TransitionEffect from '@/components/hero/TransitionEffect';
import { FillButton } from "@/components/hero/fill-button";
import { ArrowRight, Mail } from "lucide-react";
import TiltImage from '@/components/hero/TiltImage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gustavo Baranda | Full Stack Developer & Data Science Student',
  description: 'Portafolio profesional de Gustavo Baranda. Desarrollador Full Stack especializado en Python, Django, React y TypeScript con enfoque en arquitectura limpia y datos.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <TransitionEffect />
      <main className="flex md:items-center md:justify-center text-dark md:min-h-[calc(100vh-225px)] dark:text-light w-full">
        <div className="pt-2 pb-8 md:pt-0 md:pb-0 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-12 w-full">
            <div className="w-full md:w-5/12 flex justify-center items-center">
              <div className="w-full max-w-[240px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[350px] mx-auto">
                <TiltImage
                  src="/images/logo.svg"
                  alt="Logo Gustavo Baranda"
                  width={340}
                  height={240}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
            <div className="w-full md:w-7/12 flex flex-col items-start self-center text-left">
              
              {/* Nombre (H1) */}
              <AnimatedText
                text="Gustavo Baranda"
                as="h1"
                align="left"
                className="text-2xl sm:text-3xl md:text-4xl font-bold capitalize leading-tight"
              />

              {/* Rol */}
              <AnimatedText
                text="Full Stack Developer"
                as="h2"
                align="left"
                className="text-base md:text-xl font-semibold opacity-90 mt-1 md:mt-2"
              />

              {/* Headline */}
              <AnimatedText
                text="Transformo ideas en soluciones digitales con código y diseño."
                as="h2"
                align="left"
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mt-4 md:mt-6 leading-snug md:leading-[1.05] pb-1 md:pb-2!"
                allowWrap={true}
              />

              {/* Descripción */}
              <AnimatedText
                text="Enfocado en construir sistemas robustos que combinan eficiencia técnica y claridad visual."
                as="p"
                align="left"
                className="text-sm sm:text-base md:text-lg font-medium mt-3 md:mt-4 max-w-xl opacity-80"
                allowWrap={true}
              />

              {/* Botones: mobile solo Proyectos; Contacto desde md */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center mt-5 md:mt-6 gap-3 md:gap-5 w-full md:w-auto justify-start">
                <FillButton
                  href="/projects"
                  ariaLabel="Ver proyectos"
                  motionProps={{
                    initial: { opacity: 0, x: 0, y: -8 },
                    transition: { duration: 0.5, ease: "easeOut", delay: 0.05 },
                  }}
                  className="w-full md:w-auto hover:-translate-y-px hover:shadow-sm hover:bg-[#081026]/90 hover:text-[#f8fafc]/90"
                >
                  Proyectos
                  <ArrowRight className="h-5 w-5" />
                </FillButton>
                <div className="hidden md:block">
                  <FillButton
                    href="/contact"
                    ariaLabel="Contacto"
                    variant="ghost"
                    motionProps={{
                      initial: { opacity: 0, x: 0, y: 8 },
                      transition: { duration: 0.5, ease: "easeOut", delay: 0.25 },
                    }}
                  >
                    Contacto
                    <Mail className="h-5 w-5" />
                  </FillButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
