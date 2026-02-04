"use client"

import React from "react"
import { motion } from "framer-motion"

const quote = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { delay: 0.3, staggerChildren: 0.08 },
  },
}

const singleWord = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9 },
  },
}

const AnimatedText = ({
  text,
  className = "",
  allowWrap = false,
  align = "center", // "left" | "center"
  as = "h2", // h1, h2, p, span
}) => {
  const words = text.split(" ")
  const Component = motion[as] || motion.h2

  const alignClasses =
    align === "left"
      ? "justify-start text-left"
      : "justify-center text-center"

  return (
    <div className={`w-full mx-auto flex items-center ${alignClasses} overflow-hidden`}>
      <Component
        className={`mx-0 inline-block w-full text-dark dark:text-light sm:py-0 ${className}`}
        variants={quote}
        initial="initial"
        animate="animate"
      >
        {words.map((word, index) => (
          <React.Fragment key={word + "" + index}>
            <motion.span className="inline-block" variants={singleWord}>
              {word}
            </motion.span>
            {index < words.length - 1 && (allowWrap ? " " : "\u00a0")}
          </React.Fragment>
        ))}
      </Component>
    </div>
  )
}

export default AnimatedText
