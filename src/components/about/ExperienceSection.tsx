"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCES, textReveal } from "@/data/aboutData";
import ExperienceCard from "./ExperienceCard";

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
      <div className="relative space-y-6" ref={containerRef}>
        {/* Track line */}
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

        {/* Animated fill line */}
        {lineHeight > 0 && (
          <motion.div
            className="hidden sm:block absolute left-[1.6875rem] w-0.5 bg-indigo-600 origin-top z-0"
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
              onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
              cardRef={ref}
            />
          );
        })}
      </div>
    </motion.section>
  );
}
