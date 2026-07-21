"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCES, textReveal } from "@/data/aboutData";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState(null);
  const timelineRef = useRef(null);
  const [maxScaleExp, setMaxScaleExp] = useState(1);

  const lastExperienceId = EXPERIENCES[EXPERIENCES.length - 1]?.id;
  const isLastExperienceExpanded = expandedId === lastExperienceId;

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, maxScaleExp]);

  useEffect(() => {
    const calculateMaxScale = () => {
      if (timelineRef.current) {
        const containerRect = timelineRef.current.getBoundingClientRect();
        // Aproximar cálculo de altura hasta el último item
        const maxScale = 1;
        setMaxScaleExp(maxScale);
      }
    };
    calculateMaxScale();
    window.addEventListener("resize", calculateMaxScale);
    return () => window.removeEventListener("resize", calculateMaxScale);
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="space-y-10 mb-32"
    >
      <motion.header className="space-y-6" variants={textReveal}>
        <p className="text-xl sm:text-2xl font-bold uppercase tracking-[0.3em] text-foreground">
          Experiencia
        </p>

        <h2 className="text-2xl font-extrabold leading-snug sm:text-3xl md:text-5xl text-foreground whitespace-normal">
          Proyectos y <span className="text-indigo-600">desafíos</span> que impulsaron mi{" "}
          <span className="text-blue-600">{"crecimiento"}</span>.
        </h2>

        <p className="max-w-2xl text-foreground">
          Experiencias donde convertí ideas en soluciones técnicas claras y escalables.
        </p>
      </motion.header>

      {/* Timeline */}
      <div className="relative" ref={timelineRef}>
        {/* Background vertical line (track) */}
        <div className="absolute left-5 sm:left-7 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />
        {/* Animated fill line */}
        <motion.div
          className="hidden sm:block sm:absolute sm:left-7 w-0.5 bg-indigo-600 origin-top"
          style={{
            scaleY,
            top: "1.75rem",
            bottom: isLastExperienceExpanded ? "0rem" : "8rem",
            transformOrigin: "top",
          }}
          aria-hidden="true"
        />

        <div className="space-y-6">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={i}
              isExpanded={expandedId === exp.id}
              onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
