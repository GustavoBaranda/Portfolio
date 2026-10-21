"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
} from "lucide-react";
import { ProjectItem } from "@/data/projectsData";

export interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  selectedTechTag?: string | null;
  onSelectTechTag?: (tag: string) => void;
  expanded?: boolean;
  equalizeHeight?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onCollapsed?: () => void;
  registerBlock?: (block: ProjectCardBlock, element: HTMLElement | null) => void;
}

export const PROJECT_CARD_BLOCKS = [
  "meta",
  "heading",
  "challenge",
  "solution",
  "control",
  "stack",
  "footer",
] as const;

export type ProjectCardBlock = (typeof PROJECT_CARD_BLOCKS)[number];

export function splitProjectSolution(solution: string, maxPreviewLength = 160) {
  if (solution.length <= maxPreviewLength) {
    return { summary: solution, detail: "" };
  }

  const sentenceEnd = solution.lastIndexOf(". ", maxPreviewLength);
  const wordEnd = solution.lastIndexOf(" ", maxPreviewLength);
  const splitAt = sentenceEnd >= maxPreviewLength * 0.55 ? sentenceEnd + 1 : wordEnd;

  return {
    summary: solution.slice(0, splitAt).trim(),
    detail: solution.slice(splitAt).trim(),
  };
}

export default function ProjectCard({
  project,
  index,
  selectedTechTag,
  onSelectTechTag,
  expanded,
  equalizeHeight = false,
  onExpandedChange,
  onCollapsed,
  registerBlock,
}: ProjectCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = expanded ?? internalExpanded;
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

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

  const imageClasses = {
    interface:
      "object-contain object-top transition-transform duration-500 group-hover:scale-105 dark:brightness-95 dark:contrast-105",
    "wide-logo":
      "object-contain object-center p-3 sm:p-5 transition-transform duration-500 group-hover:scale-105 dark:brightness-95 dark:contrast-105",
    "square-logo":
      "object-contain object-center p-5 sm:p-8 transition-transform duration-500 group-hover:scale-105 dark:brightness-95 dark:contrast-105",
  } satisfies Record<ProjectItem["imagePresentation"], string>;
  const hasLinks = Boolean(project.demoUrl || project.githubUrl);
  const { summary, detail } = splitProjectSolution(project.solution);
  const hasExpandableSolution = detail.length > 0;
  const blockStyle = (block: ProjectCardBlock) => ({
    minHeight: isDesktop ? `var(--project-row-${block})` : undefined,
  });

  const toggleExpanded = () => {
    const nextExpanded = !isExpanded;
    if (expanded === undefined) setInternalExpanded(nextExpanded);
    onExpandedChange?.(nextExpanded);
  };

  return (
    <motion.article
      data-project-card={project.id}
      initial={motionInitial}
      animate={motionAnimate}
      transition={{
        duration: isDesktop ? 0.5 : 0.4,
        delay: Math.min(index * (isDesktop ? 0.1 : 0.05), isDesktop ? 0.8 : 0.25),
        ease: [0.25, 1, 0.5, 1],
      }}
      className={`group relative self-start flex flex-col rounded-[0.35rem] border border-soft surface-card p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl dark:hover:shadow-indigo-950/30 focus-within:ring-2 focus-within:ring-indigo-500/40 ${
        equalizeHeight ? "md:h-full md:self-stretch" : ""
      }`}
    >
      <div className={equalizeHeight ? "md:flex-1" : undefined}>
        <div
          ref={(element) => registerBlock?.("meta", element)}
          style={blockStyle("meta")}
          className="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] sm:text-xs font-semibold uppercase tracking-wider text-muted mb-3 sm:mb-4"
        >
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 rounded-[0.35rem] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {project.categoryLabel}
          </span>
          <span className="text-muted text-[0.7rem] sm:text-xs font-medium">{project.period}</span>
        </div>

        <div
          ref={(element) => registerBlock?.("heading", element)}
          style={blockStyle("heading")}
          className="flex flex-col justify-start mb-3 sm:mb-4"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-muted mt-1">{project.company}</p>
        </div>

        <div className="relative w-full aspect-video sm:aspect-[2/1] my-3 sm:my-4 rounded-[0.35rem] overflow-hidden bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center shadow-xs transition-colors">
          {!project.image ? (
            <div
              role="img"
              aria-label={`Identidad tipográfica del proyecto ${project.title}`}
              className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-4 text-center bg-linear-to-br from-indigo-500/10 via-transparent to-cyan-500/10"
            >
              <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400">
                Open Source
              </span>
              <strong className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-foreground">
                {project.mediaLabel ?? project.title}
              </strong>
              <span className="text-[0.7rem] sm:text-xs font-medium text-muted">
                Python · agentes conversacionales
              </span>
            </div>
          ) : imgFailed ? (
            <span className="text-sm font-semibold text-muted px-4 text-center">
              {project.company}
            </span>
          ) : (
            <Image
              src={project.image}
              alt={`Vista del proyecto ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              onError={() => setImgFailed(true)}
              className={imageClasses[project.imagePresentation]}
            />
          )}
        </div>

        {/* Caso de estudio: Desafío */}
        <section
          ref={(element) => registerBlock?.("challenge", element)}
          style={blockStyle("challenge")}
          className="mt-3 sm:mt-4 space-y-1.5"
        >
          <h4 className="inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Target className="w-3.5 h-3.5 shrink-0" aria-hidden />
            Desafío
          </h4>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
            {project.challenge}
          </p>
        </section>

        {/* Caso de estudio: Solución / Rol (expandible) */}
        <section className="mt-4">
          <div
            ref={(element) => registerBlock?.("solution", element)}
            style={blockStyle("solution")}
            className="space-y-1.5"
          >
            <h4 className="inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Lightbulb className="w-3.5 h-3.5 shrink-0" aria-hidden />
              Solución / Rol
            </h4>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              {summary}
              {!isExpanded && hasExpandableSolution ? "…" : ""}
              {hasExpandableSolution && (
                <motion.span
                  id={`project-solution-${project.id}`}
                  initial={false}
                  animate={{
                    height: isExpanded ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{
                    height: {
                      duration: reducedMotion ? 0 : 0.36,
                      ease: [0.25, 1, 0.5, 1],
                    },
                    opacity: {
                      duration: reducedMotion ? 0 : 0.22,
                      ease: "easeOut",
                    },
                  }}
                  aria-hidden={!isExpanded}
                  className="block overflow-hidden will-change-[height,opacity]"
                  onAnimationComplete={() => {
                    if (!isExpanded) onCollapsed?.();
                  }}
                >
                  <span className="block pt-1">{detail}</span>
                </motion.span>
              )}
            </p>
          </div>
          <div
            ref={(element) => registerBlock?.("control", element)}
            style={blockStyle("control")}
            className="mt-1"
          >
            {hasExpandableSolution && (
              <button
                type="button"
                onClick={toggleExpanded}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm px-1 py-0.5 -ml-1"
                aria-controls={`project-solution-${project.id}`}
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? "Leer menos" : "Leer más"}</span>
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>
            )}
          </div>
        </section>
      </div>
      {/* Fila 2: Stack técnico */}
      <section
        ref={(element) => registerBlock?.("stack", element)}
        style={blockStyle("stack")}
        className="mt-4 pt-4 border-t border-soft"
      >
          <h4 className="inline-flex items-center gap-1.5 text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2.5">
            <Wrench className="w-3.5 h-3.5 shrink-0" aria-hidden />
            Stack técnico
          </h4>
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags.map((tag) => {
              const isSelected = selectedTechTag?.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectTechTag?.(tag)}
                  aria-pressed={isSelected}
                  title={`Filtrar proyectos por ${tag}`}
                  className={`inline-flex min-h-6 items-center text-[0.68rem] sm:text-xs font-semibold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[0.35rem] leading-normal transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
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

      {/* Fila 3: Links / estado privado */}
      {hasLinks ? (
        <section
          ref={(element) => registerBlock?.("footer", element)}
          style={blockStyle("footer")}
          className="mt-4 pt-4 sm:pt-5 border-t border-soft/50"
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-sm transition-colors"
              >
                Ver demo
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/github inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-muted hover:text-foreground no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-sm transition-colors"
              >
                <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/github:translate-x-0.5 group-hover/github:-translate-y-0.5 transition-transform duration-200" />
                Ver código
              </a>
            )}
          </div>
        </section>
      ) : (
        <div
          ref={(element) => registerBlock?.("footer", element)}
          style={blockStyle("footer")}
          className="mt-4 pt-4 sm:pt-5 border-t border-soft/50"
        >
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            Proyecto corporativo · código privado
          </span>
        </div>
      )}

    </motion.article>
  );
}
