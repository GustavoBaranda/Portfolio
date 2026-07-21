"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { COLOR_MAP, cardVariants, calculateDuration } from "@/data/aboutData";

export default function ExperienceCard({ exp, index, isExpanded, onToggle }) {
  const colors = COLOR_MAP[exp.color] || COLOR_MAP.syspro;
  const displayDuration = calculateDuration(exp.period, exp.duration);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative pl-0 sm:pl-16"
    >
      {/* Timeline dot */}
      <div
        className={`hidden sm:block sm:absolute sm:left-5 top-7 h-4 w-4 rounded-full ${colors.dot} ring-4 ${colors.ring} ring-offset-2 ring-offset-background z-10`}
        aria-hidden="true"
      />

      {/* Card button */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full text-left rounded-2xl border ${colors.border} bg-card p-5 sm:p-2 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
        aria-expanded={isExpanded}
      >
        {/* Header row with logo */}
        <div className="flex items-start gap-4">
          {/* Company logo / initials */}
          <div
            className="hidden sm:flex shrink-0 h-16 w-16 sm:h-16 sm:w-16 rounded-xl items-center justify-center font-bold text-lg sm:text-xl"
            aria-hidden="true"
          >
            <Image
              src={exp.initials}
              alt={`${exp.company} logo`}
              className="object-contain"
              width={60}
              height={60}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="space-y-1">
                <h3 className={`text-lg sm:text-xl font-bold ${colors.heading}`}>
                  {exp.role}
                </h3>
                <div className="block md:flex md:flex-wrap items-center gap-1 text-base font-semibold text-foreground">
                  <div>{exp.company}</div>

                  <div>
                    {exp.type && (
                      <>
                        <span className="hidden md:inline text-muted-foreground">{"· "}</span>
                        <span className="text-sm font-normal text-muted-foreground">{exp.type}</span>
                        <span className="inline text-muted-foreground">{" · "}</span>
                      </>
                    )}

                    <span className="text-sm font-normal text-muted-foreground">{exp.modalidad}</span>
                  </div>
                </div>

                {/* Stack Principal SIEMPRE VISIBLE */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {exp.mainSkills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-[0.6rem] px-2 py-0.5 rounded-md bg-dark text-foreground font-dark border uppercase tracking-wider ${colors.badge}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <span
                  className={`text-[0.6rem] px-2 py-0.5 rounded-md bg-dark text-foreground font-dark border uppercase tracking-wider ${colors.badge}`}
                >
                  {displayDuration}
                </span>

                {/* Chevron */}
                <motion.svg
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="h-5 w-5 text-muted-foreground shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </div>
            </div>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex justify-between mt-3 ml-0 sm:ml-18 flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <div>
            <span className="flex items-center gap-1.5 italic">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              {exp.period}
            </span>
            <span className="flex items-center gap-1.5 italic">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              {exp.location}
            </span>
          </div>
          <div className="sm:hidden flex items-center gap-3 shrink-0">
            <motion.svg
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="h-5 w-5 text-muted-foreground shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key={`detail-${exp.id}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 pl-2 space-y-4 border-t border-border mt-4">
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {exp.description}
                </p>

                {/* Secondary Skills */}
                <div className="flex flex-wrap gap-3">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-[0.6rem] px-2 py-0.5 rounded-md bg-dark text-foreground font-dark border uppercase tracking-wider ${colors.badge}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Link if available */}
                {exp.url && (
                  <a
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${colors.heading} hover:underline`}
                  >
                    Ver proyecto
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
