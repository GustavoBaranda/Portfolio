"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { textReveal, paragraphReveal } from "@/data/aboutData";
import { useI18n } from "@/i18n/LocaleProvider";

function highlightPhrases(text: string, phrases: readonly string[]) {
  const ordered = phrases
    .map((phrase) => ({ phrase, index: text.indexOf(phrase) }))
    .filter(({ index }) => index >= 0)
    .sort((left, right) => left.index - right.index);
  const content: ReactNode[] = [];
  let cursor = 0;
  for (const { phrase, index } of ordered) {
    if (index > cursor) content.push(text.slice(cursor, index));
    content.push(<span key={`${index}-${phrase}`} className="font-semibold text-foreground">{phrase}</span>);
    cursor = index + phrase.length;
  }
  if (cursor < text.length) content.push(text.slice(cursor));
  return content;
}

export default function HeroBio() {
  const [step, setStep] = useState(1);
  const { dictionary } = useI18n();
  const biography = dictionary.about.biography;
  const openingParagraphs = [
    { text: biography.qualification, highlights: [biography.highlights.qualification, biography.highlights.degree] },
    { text: biography.backend, highlights: [biography.highlights.backend] },
    { text: biography.fullStack, highlights: [biography.highlights.fullStack] },
  ];
  const detailParagraphs = [
    { text: biography.maintainability, highlights: [biography.highlights.maintainability] },
    { text: biography.chatflow, highlights: [biography.highlights.chatflow] },
    { text: biography.perspective, highlights: [] },
    { text: biography.dataScience, highlights: [biography.highlights.dataScience] },
    { text: biography.values, highlights: [biography.highlights.values] },
    { text: biography.objective, highlights: [] },
  ];

  return (
    <motion.section className="space-y-10 mb-16 sm:mb-20 md:mb-28">
      <motion.header className="max-w-3xl space-y-3 sm:space-y-4" variants={textReveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400">{dictionary.about.eyebrow}</p>
        <h2 aria-describedby="about-section-subtitle" className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground text-balance">
          {dictionary.about.headingBeforeCode}{" "}
          <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">{dictionary.about.headingCode}</span>{" "}
          {dictionary.about.headingConnector}{" "}
          <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">{dictionary.about.headingData}</span>.
        </h2>
      </motion.header>

      <div className="space-y-6 sm:space-y-7 text-lg text-muted-foreground leading-relaxed">
        <motion.p id="about-section-subtitle" variants={paragraphReveal} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
          {dictionary.about.intro}
        </motion.p>
        {openingParagraphs.map(({ text, highlights }, index) => (
          <motion.p key={text} variants={paragraphReveal} custom={index + 1} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            {highlightPhrases(text, highlights)}
          </motion.p>
        ))}

        <div id="bio-details" inert={step !== 2} aria-hidden={step !== 2} className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${step === 2 ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="min-h-0 overflow-hidden space-y-6">
            <div>
              {detailParagraphs.map(({ text, highlights }, index) => (
                <p key={text} className={index ? "mt-6" : undefined}>{highlightPhrases(text, highlights)}</p>
              ))}
            </div>
          </div>
        </div>

        <motion.div className="pt-4" variants={paragraphReveal} custom={5} initial="hidden" animate="visible">
          <motion.button type="button" onClick={() => setStep(step === 1 ? 2 : 1)} aria-expanded={step === 2} aria-controls="bio-details" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer" whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <AnimatePresence initial={false} mode="wait">
              <motion.span key={step === 1 ? "show-more" : "show-less"} className="inline-block" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.24, ease: "easeInOut" }}>
                {step === 1 ? biography.showMore : biography.showLess}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
