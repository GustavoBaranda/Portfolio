"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, Layers, ArrowUpRight, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { ProjectItem } from "@/data/projectsData";

export interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  selectedTechTag?: string | null;
  onSelectTechTag?: (tag: string) => void;
}

export default function ProjectCard({
  project,
  index,
  selectedTechTag,
  onSelectTechTag,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isLeft = index % 2 === 0;
  const initialX = isLeft ? -20 : 20;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 1, 0.5, 1],
      }}
      className="group relative flex flex-col justify-between rounded-[0.35rem] border border-soft surface-card p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl dark:hover:shadow-indigo-950/30 focus-within:ring-2 focus-within:ring-indigo-500/40"
    >
      <div>
        {/* Top bar with company & category */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-wider text-muted mb-3 sm:mb-4">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-[0.35rem] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {project.categoryLabel}
          </span>
          <span className="text-muted text-[0.7rem] sm:text-xs font-medium">{project.period}</span>
        </div>

        {/* Title & Company */}
        <div className="min-h-[5rem] sm:min-h-[5.5rem] flex flex-col justify-start mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-muted mt-1">
            {project.company}
          </p>
        </div>

        {/* Image Preview / Banner */}
        {(() => {
          const isLogo = project.id === "syspro-logistica" || project.id === "solar-banco-etl";
          return (
            <div className="relative w-full h-44 sm:h-52 md:h-56 my-3 sm:my-4 rounded-[0.35rem] overflow-hidden bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center shadow-xs transition-colors">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className={
                  isLogo
                    ? "object-contain p-6 sm:p-8 transition-transform duration-500 group-hover:scale-105 dark:brightness-95 dark:contrast-105"
                    : "object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-105 dark:brightness-95 dark:contrast-105"
                }
              />
            </div>
          );
        })()}

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

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mt-2.5 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-[0.25rem] px-1 py-0.5 -ml-1"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "Ver menos" : "Ver más detalles"}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200" />
            )}
          </button>
        </div>
      </div>

      <div>
        {/* Interactive Technology Tags */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-4 pt-4 border-t border-soft">
          {project.tags.map((tag) => {
            const isSelected = selectedTechTag?.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectTechTag?.(tag)}
                title={`Filtrar proyectos por ${tag}`}
                className={`inline-flex items-center text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[0.35rem] leading-tight transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-xs ring-1 ring-indigo-400"
                    : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white hover:scale-105"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Links Footer or NDA Enterprise Badge */}
        {project.demoUrl || project.githubUrl ? (
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pt-3 mt-3 border-t border-soft/50">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-[0.25rem] transition-colors"
              >
                <span className="hover:underline">Ver sitio en vivo</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
              </a>
            )}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/github inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-[0.25rem] transition-colors"
              >
                <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/github:scale-110 transition-transform duration-200" />
                <span>Código</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted opacity-90">
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 opacity-80" />
                <span>Código a solicitud</span>
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 pt-3 mt-3 border-t border-soft/50 text-xs sm:text-sm font-medium text-muted">
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 opacity-80" />
            <span>Proyecto de código privado</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
