import { ArrowRight, Mail } from "lucide-react";
import AnimatedText from "@/components/utils/AnimatedText";
import TransitionEffect from "@/components/hero/TransitionEffect";
import { FillButton } from "@/components/hero/fill-button";
import TiltImage from "@/components/hero/TiltImage";
import HeroBio from "@/components/about/HeroBio";
import ExperienceSection from "@/components/about/ExperienceSection";
import EducationSection from "@/components/about/EducationSection";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ExternalRecognition from "@/components/projects/ExternalRecognition";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { localizedSectionHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function PortfolioPage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);

  return (
    <>
      <TransitionEffect />
      <div className="space-y-20 sm:space-y-28 md:space-y-36">
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
                    alt={dictionary.common.logoAlt}
                    width={340}
                    height={240}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              <div className="w-full md:w-7/12 flex flex-col items-center md:items-start self-center text-center md:text-left">
                <AnimatedText text="Gustavo Baranda" as="h1" align="responsive" className="text-2xl sm:text-3xl md:text-4xl font-bold capitalize leading-tight" />
                <AnimatedText text={dictionary.hero.role} as="h2" align="responsive" className="text-base md:text-xl font-semibold opacity-90 mt-1 md:mt-2" />
                <AnimatedText text={dictionary.hero.headline} as="h2" align="responsive" className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mt-4 md:mt-6 leading-snug md:leading-[1.05] pb-1 md:pb-2!" allowWrap />
                <AnimatedText text={dictionary.hero.description} as="p" align="responsive" className="text-sm sm:text-base md:text-lg font-medium mt-3 md:mt-4 max-w-xl opacity-80" allowWrap />

                <div className="flex flex-col md:flex-row items-center md:items-center mt-5 md:mt-6 gap-3 md:gap-5 w-full md:w-auto justify-center md:justify-start">
                  <FillButton href={localizedSectionHref(locale, "projects")} ariaLabel={dictionary.hero.projectsCta} motionProps={{ initial: { opacity: 0, x: 0, y: -8 }, transition: { duration: 0.5, ease: "easeOut", delay: 0.05 } }} className="w-[min(100%,20rem)] md:w-auto py-3 md:hover:-translate-y-px md:hover:shadow-sm">
                    {dictionary.hero.projectsCta}<ArrowRight className="h-5 w-5" />
                  </FillButton>
                  <div className="hidden md:block">
                    <FillButton href={localizedSectionHref(locale, "contact")} ariaLabel={dictionary.hero.contactCta} variant="ghost" motionProps={{ initial: { opacity: 0, x: 0, y: 8 }, transition: { duration: 0.5, ease: "easeOut", delay: 0.25 } }} className="px-3 font-medium">
                      {dictionary.hero.contactCta}<Mail className="h-4 w-4 opacity-80" />
                    </FillButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 space-y-16 sm:space-y-24">
          <HeroBio />
          <ExperienceSection />
          <EducationSection />
        </section>

        <section id="projects" className="scroll-mt-28 space-y-10 sm:space-y-14">
          <header className="max-w-3xl space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400">{dictionary.projects.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground text-balance">
              {dictionary.projects.headingBeforeHighlight}{" "}
              <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">{dictionary.projects.headingHighlight}</span>{" "}
              {dictionary.projects.headingAfterHighlight}
            </h2>
            <p className="max-w-2xl text-base sm:text-lg text-muted leading-relaxed">{dictionary.projects.intro}</p>
          </header>
          <ProjectsGrid />
          <ExternalRecognition />
        </section>

        <section id="contact" className="scroll-mt-28 max-w-5xl mx-auto space-y-10 sm:space-y-12">
          <header className="max-w-3xl space-y-3 sm:space-y-4">
            <p className="text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400 uppercase">{dictionary.contact.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground text-balance">
              {dictionary.contact.headingBeforeHighlight}{" "}
              <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">{dictionary.contact.headingHighlight}</span>
            </h2>
            <p className="max-w-2xl text-base sm:text-lg text-muted leading-relaxed">{dictionary.contact.intro}</p>
          </header>
          <div className="grid min-w-0 grid-cols-1 gap-6 items-start lg:grid-cols-2 lg:items-stretch">
            <ContactForm />
            <ContactInfo />
          </div>
        </section>
      </div>
    </>
  );
}
