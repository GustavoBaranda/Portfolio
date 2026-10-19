"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EDUCATION, parsePeriodEnd, textReveal, type Education } from "@/data/aboutData";
import EducationCard from "./EducationCard";

export function sortEducationByPeriod(education: Education[]) {
  return education.slice().sort((a, b) => {
    const da = parsePeriodEnd(a.period).getTime();
    const db = parsePeriodEnd(b.period).getTime();
    return db - da;
  });
}

export default function EducationSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const lastCardRef = useRef<HTMLDivElement | null>(null);
  const [lineTop, setLineTop] = useState<number>(36);
  const [lineHeight, setLineHeight] = useState<number>(0);

  const { scrollYProgress: eduScrollY } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 80%"],
  });
  const eduScaleY = useTransform(eduScrollY, [0, 1], [0, 1]);

  const sortedEducation = sortEducationByPeriod(EDUCATION);

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
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="space-y-10 mb-20"
    >
      <motion.header className="max-w-3xl space-y-3 sm:space-y-4" variants={textReveal}>
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
          Formación
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground text-balance">
          Una formación en constante{" "}
          <span className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400">
            evolución
          </span>.
        </h2>

        <p className="max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
          Formación técnica, universitaria y complementaria que acompaña mi desarrollo profesional.
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
              scaleY: eduScaleY,
              top: `${lineTop}px`,
              height: `${lineHeight}px`,
              transformOrigin: "top",
            }}
            aria-hidden="true"
          />
        )}

        {sortedEducation.map((edu, i) => {
          const isFirst = i === 0;
          const isLast = i === sortedEducation.length - 1;
          const ref = isFirst ? firstCardRef : isLast ? lastCardRef : undefined;

          return (
            <EducationCard
              key={edu.id}
              edu={edu}
              index={i}
              cardRef={ref}
            />
          );
        })}
      </div>
    </motion.section>
  );
}
