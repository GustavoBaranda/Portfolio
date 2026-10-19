"use client";

import { useState, useMemo, useRef, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderSearch, RotateCcw, Tag, ChevronDown, ChevronUp, X } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES, type ProjectItem } from "@/data/projectsData";
import ProjectCard, {
  PROJECT_CARD_BLOCKS,
  type ProjectCardBlock,
} from "./ProjectCard";

export interface CoreTechFilter {
  id: string;
  label: string;
  aliases: string[];
}

const CORE_TECH_FILTERS: CoreTechFilter[] = [
  { id: "python", label: "Python", aliases: ["python", "pytest"] },
  { id: "django", label: "Django", aliases: ["django"] },
  { id: "react", label: "React", aliases: ["react"] },
  { id: "nextjs", label: "Next.js", aliases: ["next.js", "next"] },
  { id: "typescript", label: "TypeScript", aliases: ["typescript", "tsx"] },
  { id: "sql", label: "SQL & Databases", aliases: ["sql", "postgres", "oracle", "mysql"] },
  { id: "apis", label: "APIs & ETL", aliases: ["api", "etl", "swagger", "openapi"] },
  { id: "tailwind", label: "Tailwind CSS", aliases: ["tailwind"] },
];

export function sortProjectsByPriority(projects: typeof PROJECTS) {
  return [...projects].sort((a, b) => a.priority - b.priority);
}

export function filterProjects(
  projects: typeof PROJECTS,
  selectedCategory: string,
  selectedTech: CoreTechFilter | string | null,
) {
  return projects.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;

    if (!selectedTech) return matchesCategory;

    const projectTagsLower = project.tags.map((tag) => tag.toLowerCase());
    if (typeof selectedTech === "string") {
      const searchTag = selectedTech.toLowerCase();
      return matchesCategory && projectTagsLower.some((tag) => tag.includes(searchTag));
    }

    return matchesCategory && selectedTech.aliases.some((alias) =>
      projectTagsLower.some((tag) => tag.includes(alias)),
    );
  });
}

export type ProjectBlockMeasurements = Partial<Record<ProjectCardBlock, number>>;

export function getProjectRowBlockMinHeights(
  measurements: ProjectBlockMeasurements[],
  isDesktop: boolean,
): ProjectBlockMeasurements {
  if (!isDesktop || measurements.length !== 2) return {};

  return Object.fromEntries(
    PROJECT_CARD_BLOCKS.map((block) => [
      block,
      Math.ceil(Math.max(...measurements.map((measurement) => measurement[block] ?? 0))),
    ]),
  );
}

export function groupProjectsIntoRows(projects: ProjectItem[]) {
  const rows: ProjectItem[][] = [];
  for (let index = 0; index < projects.length; index += 2) {
    rows.push(projects.slice(index, index + 2));
  }
  return rows;
}

export function updateExpandedProjectIds(
  currentIds: ReadonlySet<string>,
  projectId: string,
  isExpanded: boolean,
) {
  const nextIds = new Set(currentIds);
  if (isExpanded) nextIds.add(projectId);
  else nextIds.delete(projectId);
  return nextIds;
}

export function shouldEqualizeProjectRow(
  projects: readonly Pick<ProjectItem, "id">[],
  expandedIds: ReadonlySet<string>,
) {
  return projects.length === 2 && projects.every(({ id }) => expandedIds.has(id));
}

interface ProjectRowProps {
  projects: ProjectItem[];
  startIndex: number;
  selectedTechTag?: string;
  onSelectTechTag: (tag: string) => void;
}

function ProjectRow({
  projects,
  startIndex,
  selectedTechTag,
  onSelectTechTag,
}: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const blockRefs = useRef<
    Record<string, Partial<Record<ProjectCardBlock, HTMLElement | null>>>
  >({});
  const measureFrame = useRef<number | null>(null);
  const expandedIdsRef = useRef<Set<string>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const equalizeExteriorHeight = shouldEqualizeProjectRow(projects, expandedIds);

  const clearBlockHeights = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    for (const block of PROJECT_CARD_BLOCKS) {
      row.style.removeProperty(`--project-row-${block}`);
    }
  }, []);

  const measureClosedBlocks = useCallback(() => {
    const row = rowRef.current;
    clearBlockHeights();
    if (!row || projects.length !== 2 || !window.matchMedia("(min-width: 768px)").matches) {
      return;
    }

    const measurements = projects.map(({ id }) =>
      Object.fromEntries(
        PROJECT_CARD_BLOCKS.map((block) => [
          block,
          blockRefs.current[id]?.[block]?.getBoundingClientRect().height ?? 0,
        ]),
      ),
    );
    const minHeights = getProjectRowBlockMinHeights(measurements, true);
    for (const block of PROJECT_CARD_BLOCKS) {
      const minHeight = minHeights[block];
      if (minHeight) row.style.setProperty(`--project-row-${block}`, `${minHeight}px`);
    }
  }, [clearBlockHeights, projects]);

  const scheduleClosedMeasurement = useCallback(() => {
    if (measureFrame.current !== null) cancelAnimationFrame(measureFrame.current);
    measureFrame.current = requestAnimationFrame(measureClosedBlocks);
  }, [measureClosedBlocks]);

  useLayoutEffect(() => {
    let active = true;
    const resetMeasurement = () => {
      if (!active) return;
      if (expandedIdsRef.current.size > 0) {
        return;
      }
      scheduleClosedMeasurement();
    };

    measureClosedBlocks();
    window.addEventListener("resize", resetMeasurement);
    document.fonts?.ready.then(resetMeasurement);

    return () => {
      active = false;
      window.removeEventListener("resize", resetMeasurement);
      if (measureFrame.current !== null) cancelAnimationFrame(measureFrame.current);
      clearBlockHeights();
    };
  }, [clearBlockHeights, measureClosedBlocks, scheduleClosedMeasurement]);

  const updateExpanded = (projectId: string, isExpanded: boolean) => {
    const next = updateExpandedProjectIds(expandedIdsRef.current, projectId, isExpanded);
    expandedIdsRef.current = next;
    setExpandedIds(next);
  };

  const handleCollapsed = () => {
    if (expandedIdsRef.current.size > 0) return;
    measureClosedBlocks();
  };

  return (
    <div
      ref={rowRef}
      data-project-row={projects.map(({ id }) => id).join(":")}
      className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start ${
        equalizeExteriorHeight ? "md:items-stretch" : ""
      }`}
    >
      {projects.map((project, rowIndex) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={startIndex + rowIndex}
          selectedTechTag={selectedTechTag}
          onSelectTechTag={onSelectTechTag}
          expanded={expandedIds.has(project.id)}
          equalizeHeight={equalizeExteriorHeight}
          onExpandedChange={(isExpanded) => updateExpanded(project.id, isExpanded)}
          onCollapsed={handleCollapsed}
          registerBlock={(block, element) => {
            blockRefs.current[project.id] ??= {};
            blockRefs.current[project.id][block] = element;
          }}
        />
      ))}
    </div>
  );
}

export default function ProjectsGrid() {
  const techToggleRef = useRef<HTMLButtonElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [selectedTech, setSelectedTech] = useState<CoreTechFilter | string | null>(null);
  const [isTechFilterOpen, setIsTechFilterOpen] = useState<boolean>(false);

  const sortedProjects = useMemo(() => sortProjectsByPriority(PROJECTS), []);

  const filteredProjects = useMemo(() => {
    return filterProjects(sortedProjects, selectedCategory, selectedTech);
  }, [sortedProjects, selectedCategory, selectedTech]);

  const projectRows = useMemo(() => {
    return groupProjectsIntoRows(filteredProjects);
  }, [filteredProjects]);

  const handleCoreTechClick = (filter: CoreTechFilter) => {
    if (typeof selectedTech !== "string" && selectedTech?.id === filter.id) {
      setSelectedTech(null);
    } else {
      setSelectedTech(filter);
    }
    setIsTechFilterOpen(false);
    techToggleRef.current?.focus();
  };

  const handleCardTagClick = (tag: string) => {
    const matchedCore = CORE_TECH_FILTERS.find((filter) =>
      filter.aliases.some((alias) => tag.toLowerCase().includes(alias))
    );

    if (matchedCore) {
      handleCoreTechClick(matchedCore);
    } else {
      if (typeof selectedTech === "string" && selectedTech.toLowerCase() === tag.toLowerCase()) {
        setSelectedTech(null);
      } else {
        setSelectedTech(tag);
      }
    }
    techToggleRef.current?.focus();
  };

  const resetFilters = () => {
    techToggleRef.current?.focus();
    setSelectedCategory("all");
    setSelectedTech(null);
    setIsTechFilterOpen(false);
  };

  const activeTechLabel = typeof selectedTech === "string" ? selectedTech : selectedTech?.label;

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Category Tabs & Tech Toggle Header */}
      <div className="flex flex-col items-center space-y-4">
        {/* Main Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {PROJECT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                type="button"
                aria-pressed={isActive}
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsTechFilterOpen(false);
                }}
                className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-[0.35rem] text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-105"
                    : "surface-glass border border-soft text-muted hover:text-foreground hover:border-gray-400"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tech Filter Toggle & Active Badge Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <button
            ref={techToggleRef}
            type="button"
            aria-expanded={isTechFilterOpen}
            aria-controls="technology-filters"
            onClick={() => setIsTechFilterOpen(!isTechFilterOpen)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[0.35rem] border text-xs font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              isTechFilterOpen || selectedTech
                ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                : "border-soft surface-glass text-muted hover:text-foreground hover:border-gray-400"
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Filtrar por tecnología</span>
            {isTechFilterOpen ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Active Tag Badge */}
          {activeTechLabel && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[0.35rem] bg-indigo-600 text-white text-xs font-semibold shadow-xs">
              <span>{activeTechLabel}</span>
              <button
                onClick={() => { setSelectedTech(null); techToggleRef.current?.focus(); }}
                className="hover:opacity-80 cursor-pointer ml-0.5"
                title="Quitar filtro de tecnología"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {/* Reset All Filters if any active */}
          {(selectedCategory !== "all" || selectedTech) && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[0.35rem] text-xs font-medium text-muted hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer</span>
            </button>
          )}
        </div>

        {/* Collapsible Curated Core Tech Filter Grid */}
        <div
          id="technology-filters"
          inert={!isTechFilterOpen}
          aria-hidden={!isTechFilterOpen}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsTechFilterOpen(false);
              techToggleRef.current?.focus();
            }
          }}
          className={`grid w-full max-w-xl transition-[grid-template-rows] duration-200 ease-in-out ${
            isTechFilterOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden pt-0">
            <div className="flex flex-wrap items-center justify-center gap-2 py-2 px-1">
              {CORE_TECH_FILTERS.map((filter) => {
                const isActive =
                  typeof selectedTech !== "string" && selectedTech?.id === filter.id;
                return (
                  <button
                    type="button"
                    aria-pressed={isActive}
                    key={filter.id}
                    onClick={() => handleCoreTechClick(filter)}
                    className={`px-3 py-1.5 rounded-[0.35rem] text-xs font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xs scale-105"
                        : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/15 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <p role="status" className="sr-only">{filteredProjects.length} proyectos encontrados.</p>

      {/* Grid container or Empty State */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={`${selectedCategory}-${activeTechLabel || "all-tech"}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            className="space-y-6 sm:space-y-8"
          >
            {projectRows.map((row, rowIndex) => (
              <ProjectRow
                key={row.map(({ id }) => id).join("-")}
                projects={row}
                startIndex={rowIndex * 2}
                selectedTechTag={activeTechLabel}
                onSelectTechTag={handleCardTagClick}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
            className="flex flex-col items-center justify-center py-14 px-6 text-center surface-card border border-soft rounded-[0.35rem] my-4 shadow-sm"
          >
            <div className="w-14 h-14 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <FolderSearch className="w-7 h-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
              No hay proyectos coincidentes
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 max-w-md leading-relaxed">
              No se encontraron proyectos para los filtros seleccionados. Prueba seleccionando otra categoría o tecnología.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[0.35rem] bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Ver todos los proyectos</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
