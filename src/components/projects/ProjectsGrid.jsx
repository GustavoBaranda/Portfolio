"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projectsData";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const matched = PROJECT_CATEGORIES.find((cat) => cat.id === hash);
      if (matched) return matched.id;
    }
    return "all";
  });

  const filteredProjects =
    selectedCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

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

      {/* Grid container with smooth transition per category */}
      <AnimatePresence mode="wait">
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
      </AnimatePresence>
    </div>
  );
}
