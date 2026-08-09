"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Github,
  Layers,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Lock,
  Target,
  Lightbulb,
  Wrench,
  Link2,
} from "lucide-react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const motionInitial = isDesktop
    ? { opacity: 0, x: index % 2 === 0 ? -20 : 20, scale: 0.98 }
    : { opacity: 0, y: 14 };
  const motionAnimate = isDesktop
    ? { opacity: 1, x: 0, scale: 1 }
    : { opacity: 1, y: 0 };

  const isLogo = project.id === "syspro-logistica" || project.id === "solar-banco-etl";
  const hasLinks = Boolean(project.demoUrl || project.githubUrl);

  return (
    <motion.article
      initial={motionInitial}
      animate={motionAnimate}
      transition={{
        duration: isDesktop ? 0.5 : 0.4,
        delay: Math.min(index * (isDesktop ? 0.1 : 0.05), isDesktop ? 0.8 : 0.25),
        ease: [0.25, 1, 0.5, 1],
      }}
      className="group relative flex flex-col justify-between rounded-[0.35rem] border border-soft surface-card p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl dark:hover:shadow-indigo-950/30 focus-within:ring-2 focus-within:ring-indigo-500/40"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-wider text-muted mb-3 sm:mb-4">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-[0.35rem] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {project.categoryLabel}
          </span>
          <span className="text-muted text-[0.7rem] sm:text-xs font-medium">{project.period}</span>
        </div>

        <div className="min-h-20 sm:min-h-22 flex flex-col justify-start mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-muted mt-1">{project.company}</p>
        </div>

        <div className="relative w-full h-44 sm:h-52 md:h-56 my-3 sm:my-4 rounded-[0.35rem] overflow-hidden bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center shadow-xs transition-colors">
          <Image
            src={project.image}
            alt={`Vista del proyecto ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className={
              isLogo
                ? "object-contain p-6 sm:p-8 transition-transform duration-500 group-hover:scale-105 dark:brightness-95 dark:contrast-105"
                : "object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-105 dark:brightness-95 dark:contrast-105"
            }
          />
        </div>

        {/* Caso de estudio: Desafío */}
        <section className="mt-3 sm:mt-4 space-y-1.5">
          <h4 className="inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Target className="w-3.5 h-3.5 shrink-0" aria-hidden />
            Desafío
          </h4>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
            {project.challenge}
          </p>
        </section>

        {/* Caso de estudio: Solución / Rol (expandible) */}
        <section className="mt-4 space-y-1.5">
          <h4 className="inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Lightbulb className="w-3.5 h-3.5 shrink-0" aria-hidden />
            Solución / Rol
          </h4>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={isExpanded ? "full" : "preview"}
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.85 }}
              transition={{ duration: 0.2 }}
              className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed"
            >
              {isExpanded
                ? project.solution
                : `${project.solution.slice(0, 160).trim()}${project.solution.length > 160 ? "…" : ""}`}
            </motion.p>
          </AnimatePresence>
          {project.solution.length > 160 && (
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mt-1 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm px-1 py-0.5 -ml-1"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? "Ver menos" : "Ver solución completa"}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </button>
          )}
        </section>
      </div>

      <div>
        {/* Stack técnico */}
        <section className="mt-4 pt-4 border-t border-soft">
          <h4 className="inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2.5">
            <Wrench className="w-3.5 h-3.5 shrink-0" aria-hidden />
            Stack técnico
          </h4>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
        </section>

        {/* Enlaces */}
        <section className="pt-3 mt-3 border-t border-soft/50">
          <h4 className="inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2.5">
            <Link2 className="w-3.5 h-3.5 shrink-0" aria-hidden />
            Enlaces
          </h4>
          {hasLinks ? (
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-sm transition-colors"
                >
                  <span className="hover:underline">Demo / sitio en vivo</span>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                </a>
              ) : (
                <span className="text-xs sm:text-sm text-muted">Sin demo pública</span>
              )}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/github inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-sm transition-colors"
                >
                  <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/github:scale-110 transition-transform duration-200" />
                  <span>Repo GitHub</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted opacity-90">
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 opacity-80" />
                  <span>Código a solicitud</span>
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted">
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 opacity-80" />
              <span>Proyecto de código privado · sin demo pública</span>
            </div>
          )}
        </section>
      </div>
    </motion.article>
  );
}
