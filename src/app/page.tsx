import AnimatedText from '@/components/utils/AnimatedText';
import TransitionEffect from '@/components/hero/TransitionEffect';
import { FillButton } from "@/components/hero/fill-button";
import { ArrowRight, Mail } from "lucide-react";
import TiltImage from '@/components/hero/TiltImage';

export default function HomePage() {
  return (
    <>
      <TransitionEffect />
      <main className="flex items-center justify-center text-dark min-h-[calc(100vh-225px)] dark:text-light w-full">
        <div className="pt-0">
          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            <div className="w-full md:w-1/2 sm:w-full">
              <TiltImage
                src="/images/logo.svg"
                alt="Logo Gustavo Baranda"
                width={400}
                height={280}
                className="w-full h-auto md:inline-block md:w-full lg:inline-block"
              />
            </div>
            <div className="w-full md:w-1/2 sm:w-full flex flex-col items-center md:items-start self-center text-center md:text-left">
              
              {/* Nombre (H1) */}
              <AnimatedText
                text="Gustavo Baranda"
                as="h1"
                align="left"
                className="text-3xl md:text-4xl font-bold capitalize leading-tight"
              />

              {/* Rol */}
              <AnimatedText
                text="Full Stack Developer"
                as="h2"
                align="left"
                className="text-lg md:text-xl font-semibold opacity-90 mt-2"
              />

              {/* Headline */}
              <AnimatedText
                text="Transformo ideas en soluciones digitales con código y diseño."
                as="h2"
                align="left"
                className="text-3xl md:text-5xl lg:text-6xl font-bold mt-6 leading-[1.05] pb-2!"
                allowWrap={true}
              />

              {/* Descripción */}
              <AnimatedText
                text="Enfocado en construir sistemas robustos que combinan eficiencia técnica y claridad visual."
                as="p"
                align="left"
                className="text-base md:text-lg font-medium mt-4 max-w-xl opacity-80"
                allowWrap={true}
              />

              {/* Botones */}
              <div className="flex items-center mt-6 gap-5 w-full justify-center md:justify-start flex-nowrap">
                <FillButton
                  href="/projects"
                  ariaLabel="Ver proyectos"
                  motionProps={{
                    initial: { opacity: 0, x: 0, y: -8 },
                    transition: { duration: 0.5, ease: "easeOut", delay: 0.05 },
                  }}
                  className="hover:-translate-y-px hover:shadow-sm hover:bg-[#081026]/90 hover:text-[#f8fafc]/90"
                >
                  Proyectos
                  <ArrowRight className="h-5 w-5" />
                </FillButton>
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
      </main>
    </>
  );
}
