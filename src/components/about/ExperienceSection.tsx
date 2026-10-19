"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCES, textReveal } from "@/data/aboutData";
import ExperienceCard from "./ExperienceCard";

export function nextExpandedExperienceId(currentId: number | null, selectedId: number) {
  return currentId === selectedId ? null : selectedId;
}

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const lastCardRef = useRef<HTMLDivElement | null>(null);
  const [lineTop, setLineTop] = useState<number>(36);
  const [lineHeight, setLineHeight] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 80%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const calculateLine = () => {
      if (firstCardRef.current && lastCardRef.current) {
        const top = firstCardRef.current.offsetTop + 36;
        const height = lastCardRef.current.offsetTop - firstCardRef.current.offsetTop;
        if (height > 0) {
          setLineTop(top);
          setLineHeight(height);
        }
      }
    };

    calculateLine();

    window.addEventListener("load", calculateLine);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(calculateLine);
    }

    const resizeObserver = new ResizeObserver(calculateLine);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (firstCardRef.current) resizeObserver.observe(firstCardRef.current);
    if (lastCardRef.current) resizeObserver.observe(lastCardRef.current);

    window.addEventListener("resize", calculateLine);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateLine);
      window.removeEventListener("load", calculateLine);
    };
  }, [expandedId]);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="space-y-10 mb-16 sm:mb-20 md:mb-28"
    >
      <motion.header className="max-w-3xl space-y-3 sm:space-y-4" variants={textReveal}>
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
          Experiencia
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground text-balance">
          Desarrollando{" "}
          <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">
            soluciones
          </span>{" "}
          para desafíos reales.
        </h2>

        <p className="max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
          Mi recorrido desarrollando aplicaciones empresariales, integraciones y soluciones digitales.
        </p>
      </motion.header>

      {/* Timeline */}
      <div className="relative space-y-6" ref={containerRef}>
        {/* Track line */}
        {lineHeight > 0 && (
          <div
            className="hidden sm:block absolute left-6.75 w-0.5 bg-border z-0"
            style={{
              top: `${lineTop}px`,
              height: `${lineHeight}px`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Animated fill line */}
        {lineHeight > 0 && (
          <motion.div
            className="hidden sm:block absolute left-6.75 w-0.5 bg-indigo-600 origin-top z-0"
            style={{
              scaleY,
              top: `${lineTop}px`,
              height: `${lineHeight}px`,
              transformOrigin: "top",
            }}
            aria-hidden="true"
          />
        )}

        {EXPERIENCES.map((exp, i) => {
          const isFirst = i === 0;
          const isLast = i === EXPERIENCES.length - 1;
          const ref = isFirst ? firstCardRef : isLast ? lastCardRef : undefined;

          return (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={i}
              isExpanded={expandedId === exp.id}
              onToggle={() => setExpandedId((currentId) => nextExpandedExperienceId(currentId, exp.id))}
              cardRef={ref}
            />
          );
        })}
      </div>
    </motion.section>
  );
}
