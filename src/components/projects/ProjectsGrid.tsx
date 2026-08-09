"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderSearch, RotateCcw, Tag, ChevronDown, ChevronUp, X } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projectsData";
import ProjectCard from "./ProjectCard";

// Define curated, high-impact Core Technologies for top UX filtering
export interface CoreTechFilter {
  id: string;
  label: string;
  aliases: string[]; // matching substrings in project tags
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

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const matched = PROJECT_CATEGORIES.find((cat) => cat.id === hash);
      if (matched) return matched.id;
    }
    return "all";
  });

  const [selectedTech, setSelectedTech] = useState<CoreTechFilter | string | null>(null);
  const [isTechFilterOpen, setIsTechFilterOpen] = useState<boolean>(false);

  const CATEGORY_ORDER: Record<string, number> = {
    "full-stack": 1,
    apis: 2,
    opensource: 3,
  };

  const sortedProjects = useMemo(() => {
    return [...PROJECTS].sort((a, b) => {
      const catA = CATEGORY_ORDER[a.category] || 99;
      const catB = CATEGORY_ORDER[b.category] || 99;
      if (catA !== catB) {
        return catA - catB;
      }
      return b.dateSort.localeCompare(a.dateSort);
    });
  }, []);

  const filteredProjects = useMemo(() => {
    return sortedProjects.filter((p) => {
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;

      if (!selectedTech) return matchesCategory;

      const projectTagsLower = p.tags.map((t) => t.toLowerCase());

      if (typeof selectedTech === "string") {
        // Direct tag click from project card
        const searchTag = selectedTech.toLowerCase();
        const matchesDirectTech = projectTagsLower.some((t) => t.includes(searchTag));
        return matchesCategory && matchesDirectTech;
      } else {
        // Core tech filter click
        const matchesCoreTech = selectedTech.aliases.some((alias) =>
          projectTagsLower.some((t) => t.includes(alias))
        );
        return matchesCategory && matchesCoreTech;
      }
    });
  }, [sortedProjects, selectedCategory, selectedTech]);

  const handleCoreTechClick = (filter: CoreTechFilter) => {
    if (typeof selectedTech !== "string" && selectedTech?.id === filter.id) {
      setSelectedTech(null);
    } else {
      setSelectedTech(filter);
    }
  };

  const handleCardTagClick = (tag: string) => {
    // Check if tag matches a core tech filter for better UX
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
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedTech(null);
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
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
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
                onClick={() => setSelectedTech(null)}
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

      {/* Grid container or Empty State */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={`${selectedCategory}-${activeTechLabel || "all-tech"}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
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
