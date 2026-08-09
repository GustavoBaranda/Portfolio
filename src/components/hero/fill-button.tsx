"use client";

import { motion, MotionProps } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, ReactNode } from "react";

export interface FillButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  fillDirection?: "left" | "right" | "bottom" | "top";
  variant?: "primary" | "ghost";
  motionProps?: MotionProps;
}

export function FillButton({
  href,
  children,
  className = "",
  ariaLabel,
  fillDirection = "left",
  variant = "primary",
  motionProps = {},
}: FillButtonProps) {
  const [prefersHover, setPrefersHover] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setPrefersHover(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setPrefersHover(event.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      }
    };
  }, []);

  const baseDirectionStyles = {
    left: "before:left-0 before:top-0 before:h-full",
    right: "before:right-0 before:top-0 before:h-full",
    bottom: "before:bottom-0 before:left-0 before:w-full",
    top: "before:top-0 before:left-0 before:w-full",
  };

  const animatedFillStyles = {
    left: "before:w-0 hover:before:w-full",
    right: "before:w-0 hover:before:w-full",
    bottom: "before:h-0 hover:before:h-full",
    top: "before:h-0 hover:before:h-full",
  };

  const staticFillStyles = {
    left: "before:w-full",
    right: "before:w-full",
    bottom: "before:h-full",
    top: "before:h-full",
  };

  const directionStyles = `
    ${baseDirectionStyles[fillDirection]}
    ${(prefersHover ? animatedFillStyles : staticFillStyles)[fillDirection]}
  `;

  const baseStyles = `
    group
    relative
    inline-flex
    items-center
    justify-center
    rounded-[0.35rem]
    px-6
    py-2.5
    text-lg
    font-semibold
    transition-colors
    duration-300
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2
  `;

  const primaryStyles = `
    overflow-hidden
    border-2
    border-gray-dark
    bg-[#f8fafc]
    before:absolute
    before:z-0
    before:bg-[#0f172a]
    before:transition-all
    before:duration-500
    before:ease-out
    before:content-['']
    ${directionStyles}
    hover:border-[#0f172a]
    dark:border-gray-700
    dark:bg-[#0f172a]
    dark:before:bg-[#f8fafc]
    dark:hover:border-[#f8fafc]
  `;

  const primaryTextStyles = prefersHover
    ? `
      text-[#0f172a]
      hover:text-[#f8fafc]
      dark:text-[#f8fafc]
      dark:hover:text-[#0f172a]
    `
    : `
      text-[#f8fafc]
      hover:text-[#f8fafc]
      dark:text-[#0f172a]
      dark:hover:text-[#0f172a]
    `;

  const ghostStyles = `
    text-[var(--text)]
    dark:hover:text-[var(--muted)]
    focus-visible:text-[var(--accent)]
    border
    hover:border-gray-400
  `;

  const defaultMotion: MotionProps = {
    initial: { opacity: 0, x: -20, y: 8 },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const mergedMotion: MotionProps = {
    ...defaultMotion,
    ...motionProps,
    transition: {
      ...defaultMotion.transition,
      ...(motionProps.transition ?? {}),
    },
  };

  const isFullWidth = /\bw-full\b/.test(className);

  return (
    <motion.div {...mergedMotion} className={isFullWidth ? "w-full" : undefined}>
      <Link
        href={href}
        aria-label={ariaLabel}
        className={`
          ${baseStyles}
          ${
            variant === "primary"
              ? `${primaryStyles} ${primaryTextStyles}`
              : ghostStyles
          }
          ${className}
        `}
      >
        <span className={`flex items-center gap-1 ${variant === "primary" ? "relative z-10" : ""}`}>
          {children}
        </span>
      </Link>
    </motion.div>
  );
}
