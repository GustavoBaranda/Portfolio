"use client";

import { motion, useReducedMotion } from "framer-motion";

const panels = [
  { className: "z-30 bg-[var(--accent)]", delay: 0 },
  { className: "z-20 bg-[var(--surface)]", delay: 0.2 },
  { className: "z-10 bg-[var(--text)]", delay: 0.4 },
] as const;

export default function TransitionEffect() {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;
  return (
    <div
      className="page-transition pointer-events-none fixed inset-0 z-300 overflow-hidden"
      aria-hidden="true"
    >
      {panels.map((panel) => (
        <motion.div
          key={panel.className}
          className={`absolute top-0 bottom-0 right-full w-screen ${panel.className}`}
          initial={{ x: "100%", width: "100%" }}
          animate={{ x: "0%", width: "0%" }}
          transition={{ delay: panel.delay, duration: 0.8, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
