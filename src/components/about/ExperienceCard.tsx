"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { COLOR_MAP, cardVariants, calculateDuration, Experience } from "@/data/aboutData";
import { RefObject } from "react";

export interface ExperienceCardProps {
  exp: Experience;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  cardRef?: RefObject<HTMLDivElement | null>;
}

export default function ExperienceCard({
  exp,
  index,
  isExpanded,
  onToggle,
  cardRef,
}: ExperienceCardProps) {
  const colors = COLOR_MAP[exp.color] || COLOR_MAP.syspro;
  const displayDuration = calculateDuration(exp.period, exp.duration);

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative pl-0 sm:pl-16"
    >
      {/* Timeline dot */}
      <div
        className={`hidden sm:block sm:absolute sm:left-5 top-7 h-4 w-4 rounded-full ${colors.dot} ring-4 ${colors.ring} ring-offset-2 ring-offset-background z-20`}
        aria-hidden="true"
      />

      {/* Card button */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full text-left rounded-[0.35rem] border ${colors.border} surface-card p-4 sm:p-5 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
        aria-expanded={isExpanded}
      >
        {/* Header row with logo */}
        <div className="flex items-start gap-4">
          {/* Company logo / initials */}
          <div
            className="hidden sm:flex shrink-0 h-16 w-16 rounded-[0.35rem] items-center justify-center p-2 bg-white border border-soft shadow-xs"
            aria-hidden="true"
          >
            {exp.initials ? (
              <Image
                src={exp.initials}
                alt={`${exp.company} logo`}
                width={60}
                height={60}
                className="object-contain w-full h-full"
              />
            ) : (
              <span className={`font-bold text-lg ${colors.heading}`}>
                {exp.company
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="space-y-2 flex-1 min-w-0">
            {/* Header: Title on top-left, Badge + Chevron on top-right */}
            <div className="flex items-start justify-between gap-2.5 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h3 className={`text-base sm:text-xl font-bold leading-snug ${colors.heading}`}>
                  {exp.role}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-foreground mt-0.5">
                  {exp.company}{" "}
                  {exp.type && <span className="font-normal opacity-80">• {exp.type}</span>}{" "}
                  {exp.modalidad && <span className="font-normal opacity-80">• {exp.modalidad}</span>}
                </p>
              </div>

              {/* Duration badge & Chevron */}
              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 pt-0.5">
                <span
                  className={`hidden sm:inline-block text-[0.65rem] font-bold px-2.5 py-0.5 rounded-[0.35rem] border uppercase tracking-wider ${colors.badge}`}
                >
                  {displayDuration}
                </span>

                {/* Chevron */}
                <span
                  className={`transform transition-transform duration-200 text-foreground/60 text-xs sm:text-sm ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </div>
            </div>

            {/* Main tech chips */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {exp.mainSkills.map((skill) => (
                <span
                  key={skill}
                  className={`text-[0.65rem] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-[0.35rem] border ${colors.badge}`}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Dates & Location */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/80 font-medium italic pt-0.5">
              <span>🗓️ {exp.period}</span>
              {exp.location && <span>📍 {exp.location}</span>}
            </div>
          </div>
        </div>

        {/* Collapsible accordion body */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-soft space-y-4">
                {/* Description */}
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                  {exp.description}
                </p>

                {/* All skills grid */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Tecnologías y Herramientas:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`text-xs px-2.5 py-1 rounded-[0.35rem] border font-medium transition-all ${colors.skillBg} ${colors.skillText} ${colors.skillBorder}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Optional URL */}
                {exp.url && (
                  <div className="pt-2">
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold hover:underline ${colors.heading}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ver proyecto ↗
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
