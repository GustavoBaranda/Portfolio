"use client";

import { motion, MotionConfig } from "framer-motion";

export interface MenuProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({ active, setActive }) => {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        onClick={() => setActive(!active)}
        className={`flex self-center relative h-10 w-10 rounded-full bg-transparent md:hidden text-link-active z-999 ${active ? "border-2! border-gray-200" : ""}`}
        animate={active ? "open" : "closed"}
        aria-label={active ? "Cerrar menú" : "Abrir menú"}
      >
        <motion.span
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
