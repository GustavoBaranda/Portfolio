"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Layers, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLeft = index % 2 === 0;
  const initialX = isLeft ? -20 : 20;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.25, 1, 0.5, 1],
      }}
      className="group relative flex flex-col justify-between rounded-[0.35rem] border border-soft surface-card p-4 sm:p-6 lg:p-8 transition-[border-color,box-shadow] duration-300 hover:border-indigo-500/40 hover:shadow-xl dark:hover:shadow-indigo-950/20"
    >
      <div>
        {/* Top bar with company & category */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-wider text-muted mb-3 sm:mb-4">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-[0.35rem] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {project.categoryLabel}
          </span>
          <span className="text-muted text-[0.7rem] sm:text-xs">{project.period}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Company subtitle */}
        <p className="text-xs sm:text-sm font-semibold text-muted mt-1 mb-3 sm:mb-4">
          {project.company}
        </p>

        {/* Image Preview / Banner */}
        <div className="relative w-full h-28 sm:h-36 my-3 sm:my-4 rounded-[0.35rem] overflow-hidden bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center p-3 sm:p-4 shadow-xs transition-colors">
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={200}
            className="object-contain max-h-full w-auto transition-transform duration-500 group-hover:scale-105 rounded-[0.25rem] dark:brightness-95 dark:contrast-105"
          />
        </div>

        {/* Description / Summary with Read More */}
        <div className="my-3 sm:my-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={isExpanded ? "full" : "summary"}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed"
            >
              {isExpanded ? project.description : project.summary}
            </motion.p>
          </AnimatePresence>

          {project.description && project.description !== project.summary && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mt-2.5 transition-colors cursor-pointer focus:outline-none"
            >
              <span>{isExpanded ? "Ver menos" : "Ver más detalles"}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 pt-4 border-t border-soft">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-[0.35rem] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links Footer (se renderiza solo si existen enlaces) */}
        {(project.demoUrl || project.githubUrl) && (
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 mt-3 border-t border-soft/50">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <span>Ver sitio en vivo</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Código</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
