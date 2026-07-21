"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Layers, ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative flex flex-col justify-between rounded-3xl border border-soft surface-card p-6 sm:p-8 transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl dark:hover:shadow-indigo-950/20"
    >
      <div>
        {/* Top bar with company & category */}
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider text-muted mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Layers className="w-3.5 h-3.5" />
            {project.categoryLabel}
          </span>
          <span className="text-muted">{project.period}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>

        {/* Company subtitle */}
        <p className="text-sm font-semibold text-muted mt-1 mb-4">
          {project.company}
        </p>

        {/* Image Preview / Banner */}
        <div className="relative w-full h-48 sm:h-56 my-4 rounded-2xl overflow-hidden bg-muted/20 border border-soft flex items-center justify-center p-4">
          <Image
            src={project.image}
            alt={project.title}
            width={400}
            height={240}
            className="object-contain max-h-full w-auto transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed my-4">
          {project.description}
        </p>
      </div>

      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 my-4 pt-4 border-t border-soft">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.65rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-surface border border-soft text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links Footer */}
        <div className="flex items-center gap-4 pt-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>Ver sitio en vivo</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Código</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
