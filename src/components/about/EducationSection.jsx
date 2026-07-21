"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EDUCATION, parsePeriodEnd, textReveal } from "@/data/aboutData";
import EducationCard from "./EducationCard";

export default function EducationSection() {
  const eduTimelineRef = useRef(null);
  const [maxScaleEdu, setMaxScaleEdu] = useState(1);

  const { scrollYProgress: eduScrollY } = useScroll({
    target: eduTimelineRef,
    offset: ["start end", "end center"],
  });
  const eduScaleY = useTransform(eduScrollY, [0, 1], [0, maxScaleEdu]);

  useEffect(() => {
    const calculateMaxScaleEdu = () => {
      if (eduTimelineRef.current) {
        setMaxScaleEdu(1);
      }
    };
    calculateMaxScaleEdu();
    window.addEventListener("resize", calculateMaxScaleEdu);
    return () => window.removeEventListener("resize", calculateMaxScaleEdu);
  }, []);

  const sortedEducation = EDUCATION.slice().sort((a, b) => {
    const da = parsePeriodEnd(a.period);
    const db = parsePeriodEnd(b.period);
    return db - da; // most recent first
  });

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="space-y-10 mb-20"
      ref={eduTimelineRef}
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
      <div className="relative">
        <div
          className="absolute left-5 sm:left-7 top-0 bottom-0 w-0.5 bg-border"
          aria-hidden="true"
        />
        <motion.div
          className="hidden sm:block sm:absolute sm:left-7 w-0.5 bg-indigo-600 origin-top"
          style={{
            scaleY: eduScaleY,
            top: "1.75rem",
            bottom: "8rem",
            transformOrigin: "top",
          }}
          aria-hidden="true"
        />

        <div className="space-y-6">
          {sortedEducation.map((edu, i) => (
            <EducationCard key={edu.id} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
