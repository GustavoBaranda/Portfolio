"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const DropDownLink = ({ children, dropdownItems, className = "", href = "#" }) => {
  const [open, setOpen] = useState(false);

  if (!dropdownItems?.length) {
    return (
      <Link href={href} className={`inline-flex items-center transition ${className}`}>
        {children}
      </Link>
    );
  }
  
  return (
    <div
      className="group relative inline-flex cursor-pointer"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={href} className={`inline-flex items-center gap-1 transition ${className}`}>
        {children}
        <span className="text-xs">▾</span>
      </Link>
      {/* <span
        style={{
          transform: open ? "scaleX(1)" : "scaleX(0)",
          backgroundColor: "var(--muted)",
        }}
        className="absolute -bottom-2 left-0 right-0 h-1 origin-left rounded-full transition-transform duration-300 ease-out"
      /> */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 rounded-2xl surface-glass p-3 shadow-xl mt-4 backdrop-blur"
          >
            <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 surface-glass" />
            <ul className="space-y-1 text-sm text-link-muted">
              {dropdownItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="dropdown-link text-link-active"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

};

export default DropDownLink;
