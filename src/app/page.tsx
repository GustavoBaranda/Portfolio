import AnimatedText from '@/components/utils/AnimatedText';
import TransitionEffect from '@/components/hero/TransitionEffect';
import { FillButton } from "@/components/hero/fill-button";
import { ArrowRight, Mail } from "lucide-react";
import TiltImage from '@/components/hero/TiltImage';
import HeroBio from '@/components/about/HeroBio';
import ExperienceSection from '@/components/about/ExperienceSection';
import EducationSection from '@/components/about/EducationSection';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import { createHomeMetadata } from '@/config/site';

export const metadata = createHomeMetadata();

export default function HomePage() {
  return (
    <>
      <TransitionEffect />
      <div className="space-y-20 sm:space-y-28 md:space-y-36">
        
        {/* SECCIÓN 1: HERO */}
        <section
          id="home"
          className="scroll-mt-28 flex md:items-center md:justify-center text-dark min-h-[calc(100vh-225px)] dark:text-light w-full"
        >
          <div className="pt-2 pb-8 md:pt-0 md:pb-0 w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-12 w-full">
              <div className="w-full md:w-5/12 flex justify-center items-center">
                <div className="w-full max-w-60 sm:max-w-65 md:max-w-80 lg:max-w-87.5 mx-auto">
                  <TiltImage
                    src="/images/logo.svg"
                    alt="Logo Gustavo Baranda"
                    width={340}
                    height={240}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              <div className="w-full md:w-7/12 flex flex-col items-center md:items-start self-center text-center md:text-left">
                {/* Nombre (H1) */}
                <AnimatedText
                  text="Gustavo Baranda"
                  as="h1"
                  align="responsive"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold capitalize leading-tight"
                />

                {/* Rol */}
                <AnimatedText
                  text="Full Stack Python Developer"
                  as="h2"
                  align="responsive"
                  className="text-base md:text-xl font-semibold opacity-90 mt-1 md:mt-2"
                />

                {/* Headline */}
                <AnimatedText
                  text="Desarrollo software que conecta negocios, tecnología y datos."
                  as="h2"
                  align="responsive"
                  className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mt-4 md:mt-6 leading-snug md:leading-[1.05] pb-1 md:pb-2!"
                  allowWrap={true}
                />

                {/* Descripción */}
                <AnimatedText
                  text="Especializado en backend con Python, Django y SQL Server. Desarrollo soluciones Full Stack para logística, servicios financieros y medicina laboral. También creo y mantengo proyectos open source como chatflow-agent."
                  as="p"
                  align="responsive"
                  className="text-sm sm:text-base md:text-lg font-medium mt-3 md:mt-4 max-w-xl opacity-80"
                  allowWrap={true}
                />

                {/* Botones: mobile solo Proyectos; Contacto desde md */}
                <div className="flex flex-col md:flex-row items-center md:items-center mt-5 md:mt-6 gap-3 md:gap-5 w-full md:w-auto justify-center md:justify-start">
                  <FillButton
                    href="#projects"
                    ariaLabel="Ver proyectos"
                    motionProps={{
                      initial: { opacity: 0, x: 0, y: -8 },
                      transition: { duration: 0.5, ease: "easeOut", delay: 0.05 },
                    }}
                    className="w-[min(100%,20rem)] md:w-auto py-3 md:hover:-translate-y-px md:hover:shadow-sm"
                  >
                    Proyectos
                    <ArrowRight className="h-5 w-5" />
                  </FillButton>
                  <div className="hidden md:block">
                    <FillButton
                      href="/#contact"
                      ariaLabel="Contacto"
                      variant="ghost"
                      motionProps={{
                        initial: { opacity: 0, x: 0, y: 8 },
                        transition: { duration: 0.5, ease: "easeOut", delay: 0.25 },
                      }}
                      className="px-3 font-medium"
                    >
                      Contacto
                      <Mail className="h-4 w-4 opacity-80" />
                    </FillButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: SOBRE MÍ */}
        <section id="about" className="scroll-mt-28 space-y-16 sm:space-y-24">
          <HeroBio />
          <ExperienceSection />
          <EducationSection />
        </section>

        {/* SECCIÓN 3: PROYECTOS */}
        <section id="projects" className="scroll-mt-28 space-y-10 sm:space-y-14">
          <header className="max-w-3xl space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
              Portafolio
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground text-balance">
              Proyectos que convierten{" "}
              <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">
                ideas
              </span>{" "}
              en soluciones.
            </h2>
            <p className="max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
              Una selección de desarrollos empresariales, aplicaciones web y proyectos open source.
            </p>
          </header>

          <ProjectsGrid />
        </section>

        {/* SECCIÓN 4: CONTACTO */}
        <section id="contact" className="scroll-mt-28 max-w-5xl mx-auto space-y-10 sm:space-y-12">
          <header className="max-w-3xl space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400 uppercase">
              Contacto
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground text-balance">
              ¿Tenés un proyecto en mente?{" "}
              <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">
                Hablemos.
              </span>
            </h2>
            <p className="max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
              Estoy disponible para conversar sobre oportunidades laborales, colaboraciones y proyectos de desarrollo de software.
            </p>
          </header>

          <div className="grid min-w-0 grid-cols-1 gap-6 items-stretch lg:grid-cols-2">
            <ContactForm />
            <ContactInfo />
          </div>
        </section>

      </div>
    </>
  );
}
