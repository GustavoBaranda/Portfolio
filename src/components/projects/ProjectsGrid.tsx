"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderSearch, RotateCcw, Tag, X } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projectsData";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const matched = PROJECT_CATEGORIES.find((cat) => cat.id === hash);
      if (matched) return matched.id;
    }
    return "all";
  });

  const [selectedTechTag, setSelectedTechTag] = useState<string | null>(null);

  // Extract top/popular unique technology tags from projects
  const popularTechTags = useMemo(() => {
    const counts: Record<string, number> = {};
    PROJECTS.forEach((p) => {
      p.tags.forEach((tag) => {
        // Normalize tag names for grouping if needed
        const cleanTag = tag.trim();
        counts[cleanTag] = (counts[cleanTag] || 0) + 1;
      });
    });

    // Prioritize main core tech tags mentioned in requirements & portfolio
    const priorityList = ["Python", "Django", "React", "Next.js", "SQL Server", "TypeScript", "Tailwind CSS", "Laravel", "PWA"];
    const allTags = Object.keys(counts);

    return priorityList.filter((t) => allTags.some((at) => at.toLowerCase().includes(t.toLowerCase()))).concat(
      allTags.filter((at) => !priorityList.some((pt) => at.toLowerCase().includes(pt.toLowerCase())))
    ).slice(0, 10);
  }, []);

  const CATEGORY_ORDER: Record<string, number> = {
    "full-stack": 1,
    "apis": 2,
    "opensource": 3,
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
      const matchesTech = !selectedTechTag || p.tags.some((t) => t.toLowerCase().includes(selectedTechTag.toLowerCase()));
      return matchesCategory && matchesTech;
    });
  }, [sortedProjects, selectedCategory, selectedTechTag]);

  const handleTechClick = (tag: string) => {
    if (selectedTechTag?.toLowerCase() === tag.toLowerCase()) {
      setSelectedTechTag(null);
    } else {
      setSelectedTechTag(tag);
    }
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedTechTag(null);
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Category & Tech Filter Container */}
      <div className="space-y-4 surface-card border border-soft p-4 sm:p-6 rounded-[0.35rem] shadow-xs">
        {/* Category Tabs */}
        <div>
          <p className="text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-muted mb-2 sm:mb-3">
            Categorías
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {PROJECT_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-[0.35rem] text-xs font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
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
        </div>

        {/* Technology Tag Pills */}
        <div className="pt-3 border-t border-soft/60">
          <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
            <p className="text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-indigo-500" />
              <span>Filtrar por tecnología</span>
            </p>
            {selectedTechTag && (
              <button
                onClick={() => setSelectedTechTag(null)}
                className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Limpiar tecnología</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {popularTechTags.map((tag) => {
              const isActive = selectedTechTag?.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() => handleTechClick(tag)}
                  className={`px-2.5 py-1 rounded-[0.35rem] text-[0.7rem] sm:text-xs font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400"
                      : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filters Indicator Banner */}
        {(selectedCategory !== "all" || selectedTechTag) && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-soft/60 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Filtros activos:</span>
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium">
                  {PROJECT_CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                </span>
              )}
              {selectedTechTag && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium">
                  Tecnología: {selectedTechTag}
                </span>
              )}
            </div>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-foreground hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer text-xs font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer todo</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid container or Empty State */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={`${selectedCategory}-${selectedTechTag || "all-tech"}`}
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
                selectedTechTag={selectedTechTag}
                onSelectTechTag={handleTechClick}
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
