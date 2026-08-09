"use client";

import { motion, MotionProps } from "framer-motion";
import Link from "next/link";
import { ReactNode, useState } from "react";

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
  // On press/tap (mobile): run the same fill as desktop hover
  const [isFilled, setIsFilled] = useState(false);

  const baseDirectionStyles = {
    left: "before:left-0 before:top-0 before:h-full",
    right: "before:right-0 before:top-0 before:h-full",
    bottom: "before:bottom-0 before:left-0 before:w-full",
    top: "before:top-0 before:left-0 before:w-full",
  };

  const restFillStyles = {
    left: "before:w-0 md:hover:before:w-full",
    right: "before:w-0 md:hover:before:w-full",
    bottom: "before:h-0 md:hover:before:h-full",
    top: "before:h-0 md:hover:before:h-full",
  };

  const activeFillStyles = {
    left: "before:w-full",
    right: "before:w-full",
    bottom: "before:h-full",
    top: "before:h-full",
  };

  const directionStyles = `
    ${baseDirectionStyles[fillDirection]}
    ${isFilled ? activeFillStyles[fillDirection] : restFillStyles[fillDirection]}
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
    dark:border-slate-400/50
    dark:bg-transparent
    dark:before:bg-[#f8fafc]
    dark:hover:border-[#f8fafc]
  `;

  // Rest: dark text (outline). Filled or hover (md+): invert over fill layer.
  const primaryTextStyles = isFilled
    ? "text-[#f8fafc] dark:text-[#0f172a]"
    : "text-[#0f172a] dark:text-[#f8fafc] md:hover:text-[#f8fafc] md:dark:hover:text-[#0f172a]";

  const ghostStyles = `
    text-[var(--muted)]
    bg-transparent
    border border-transparent
    hover:text-[var(--text)]
    hover:bg-transparent
    focus-visible:text-[var(--accent)]
    focus-visible:border-transparent
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

  const hasWidthClass = /\bw-(full|\[)/.test(className);

  const triggerFill = () => {
    if (variant === "primary") setIsFilled(true);
  };

  return (
    <motion.div
      {...mergedMotion}
      className={hasWidthClass ? className.match(/w-\S+|max-w-\S+/g)?.join(" ") : undefined}
    >
      <Link
        href={href}
        aria-label={ariaLabel}
        onPointerDown={triggerFill}
        onClick={triggerFill}
        className={`
          ${baseStyles}
          ${
            variant === "primary"
              ? `${primaryStyles} ${primaryTextStyles}`
              : ghostStyles
          }
          ${hasWidthClass ? "w-full" : ""}
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
