"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { COLOR_MAP, cardVariants } from "@/data/aboutData";

export default function EducationCard({ edu, index }) {
  const colors = COLOR_MAP[edu.color] || COLOR_MAP.syspro;

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

      {/* Card */}
      <div
        className={`w-full text-left rounded-2xl border ${colors.border} bg-card p-5 sm:p-2 transition-all duration-300`}
      >
        <div className="flex items-start gap-4">
          {/* Logo / Initials */}
          <div
            className="hidden sm:flex shrink-0 h-16 w-16 rounded-xl items-center justify-center font-bold text-lg bg-muted text-foreground"
            aria-hidden="true"
          >
            {edu.logo ? (
              <Image
                src={edu.logo}
                alt={`${edu.institution} logo`}
                width={60}
                height={60}
                className="object-contain rounded-xl"
              />
            ) : (
              <span>
                {(edu.institution || edu.title)
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className={`text-lg sm:text-xl font-bold ${colors.heading}`}>
              {edu.title}
            </h3>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {edu.institution}
              </div>

              <div className="hidden sm:flex self-center items-center shrink-0">
                <span
                  className={`text-[0.6rem] px-2 py-0.5 rounded-md bg-dark text-foreground font-dark border uppercase tracking-wider ${colors.badge}`}
                >
                  {edu.status}
                </span>
              </div>
            </div>

            <div className="flex mt-3 flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 italic">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                {edu.period}
              </span>
              {edu.location && (
                <span className="flex items-center gap-1.5 italic">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {edu.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
