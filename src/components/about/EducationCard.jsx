"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { COLOR_MAP, cardVariants } from "@/data/aboutData";

export default function EducationCard({ edu, index, cardRef }) {
  const colors = COLOR_MAP[edu.color] || COLOR_MAP.syspro;

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

      {/* Card */}
      <div
        className={`w-full text-left rounded-[0.35rem] border ${colors.border} surface-card p-4 sm:p-5 transition-all duration-300`}
      >
        <div className="flex items-start gap-4">
          {/* Logo / Initials */}
          <div
            className="hidden sm:flex shrink-0 h-16 w-16 rounded-[0.35rem] items-center justify-center p-2 bg-white border border-soft shadow-xs"
            aria-hidden="true"
          >
            {edu.logo ? (
              <Image
                src={edu.logo}
                alt={`${edu.institution} logo`}
                width={60}
                height={60}
                className="object-contain w-full h-full"
              />
            ) : (
              <span className="font-bold text-lg text-slate-800">
                {(edu.institution || edu.title)
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="space-y-2 flex-1 min-w-0">
            {/* Header row: Title + Status Tag */}
            <div className="flex items-start justify-between gap-3">
              <h3 className={`text-base sm:text-xl font-bold leading-snug ${colors.heading} flex-1 min-w-0`}>
                {edu.title}
              </h3>
              {edu.status && (
                <span
                  className={`shrink-0 text-[0.6rem] sm:text-[0.65rem] font-bold px-2.5 py-0.5 rounded-[0.35rem] border uppercase tracking-wider ${colors.badge}`}
                >
                  {edu.status}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm font-semibold text-foreground">
              {edu.institution}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/80 font-medium italic pt-0.5">
              <span>🗓️ {edu.period}</span>
              {edu.location && <span>📍 {edu.location}</span>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
