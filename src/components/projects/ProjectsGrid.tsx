"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderSearch, RotateCcw } from "lucide-react";
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

  const sortedProjects = [...PROJECTS].sort((a, b) =>
    b.dateSort.localeCompare(a.dateSort)
  );

  const filteredProjects =
    selectedCategory === "all"
      ? sortedProjects
      : sortedProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {PROJECT_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-[0.35rem] text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
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

      {/* Grid container or Empty State */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
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
              No hay proyectos en esta categoría por el momento
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 max-w-md leading-relaxed">
              Los módulos de APIs y Microservicios están integrados dentro de las soluciones Full Stack o bajo acuerdo de confidencialidad (NDA).
            </p>
            <button
              onClick={() => setSelectedCategory("all")}
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
