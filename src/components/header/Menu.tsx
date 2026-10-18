"use client";

import { motion, MotionConfig } from "framer-motion";
import { useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(notify: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
const getReducedMotion = () => window.matchMedia(motionQuery).matches;

export interface MenuProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ active, setActive }) => {
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, () => false);
  return (
    <MotionConfig
      reducedMotion="never"
      transition={{
        duration: reducedMotion ? 0 : 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        type="button"
        aria-expanded={active}
        aria-controls="mobile-navigation"
        aria-haspopup="dialog"
        onClick={() => setActive(!active)}
        className="menu-toggle flex self-center relative h-10 w-10 shrink-0 rounded-full bg-transparent md:hidden text-link-active z-999"
        animate={active ? "open" : "closed"}
        aria-label={active ? "Cerrar menú" : "Abrir menú"}
      >
        <motion.span
          aria-hidden="true"
          className="absolute z-999 h-0.75 w-5 rounded-full"
          style={{ left: "50%", top: "35%", x: "-50%", y: "-50%", backgroundColor: "currentColor" }}
          variants={{
            open: {
              rotate: ["0deg", "0deg", "45deg"],
              top: ["35%", "50%", "50%"],
            },
            closed: {
              rotate: ["45deg", "0deg", "0deg"],
              top: ["50%", "50%", "35%"],
            },
          }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute z-999 h-0.75 w-5 rounded-full"
          style={{ left: "50%", top: "50%", x: "-50%", y: "-50%", backgroundColor: "currentColor" }}
          variants={{
            open: {
              rotate: ["0deg", "0deg", "-45deg"],
            },
            closed: {
              rotate: ["-45deg", "0deg", "0deg"],
            },
          }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute z-999 h-0.75 w-2.5 rounded-full"
          style={{
            left: "calc(50% - 5px)",
            bottom: "35%",
            x: "50%",
            y: "50%",
            backgroundColor: "currentColor",
          }}
          variants={{
            open: {
              rotate: ["0deg", "0deg", "-45deg"],
              left: "calc(50% - 10px)",
              bottom: ["35%", "50%", "50%"],
            },
            closed: {
              rotate: ["-45deg", "0deg", "0deg"],
              left: "calc(50% - 5px)",
              bottom: ["50%", "50%", "35%"],
            },
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

export default Menu;
