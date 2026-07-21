"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EDUCATION, parsePeriodEnd, textReveal } from "@/data/aboutData";
import EducationCard from "./EducationCard";

export default function EducationSection() {
  const containerRef = useRef(null);
  const firstCardRef = useRef(null);
  const lastCardRef = useRef(null);
  const [lineTop, setLineTop] = useState(36);
  const [lineHeight, setLineHeight] = useState(0);

  const { scrollYProgress: eduScrollY } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 80%"],
  });
  const eduScaleY = useTransform(eduScrollY, [0, 1], [0, 1]);

  const sortedEducation = EDUCATION.slice().sort((a, b) => {
    const da = parsePeriodEnd(a.period);
    const db = parsePeriodEnd(b.period);
    return db - da; // most recent first
  });

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
      <motion.header className="space-y-6" variants={textReveal}>
        <p className="text-xl sm:text-2xl font-bold uppercase tracking-[0.3em] text-foreground">
          Formación
        </p>

        <h2 className="text-2xl font-extrabold leading-snug sm:text-3xl md:text-5xl text-foreground whitespace-normal">
          Formación académica y certificaciones.
        </h2>

        <p className="max-w-2xl text-foreground">
          Títulos y cursos. Completa las fechas y el lugar cuando quieras.
        </p>
      </motion.header>

      {/* Timeline */}
      <div className="relative space-y-6" ref={containerRef}>
        {/* Track line (fondo continuo) */}
        {lineHeight > 0 && (
          <div
            className="hidden sm:block absolute left-[1.6875rem] w-0.5 bg-border z-0"
            style={{
              top: `${lineTop}px`,
              height: `${lineHeight}px`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Animated fill line (relleno progresivo continuo con scroll) */}
        {lineHeight > 0 && (
          <motion.div
            className="hidden sm:block absolute left-[1.6875rem] w-0.5 bg-indigo-600 origin-top z-0"
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
          const ref = isFirst ? firstCardRef : isLast ? lastCardRef : null;

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
