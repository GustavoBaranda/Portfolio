"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[], defaultSection: string = "home"): string {
  const [activeSection, setActiveSection] = useState<string>(defaultSection);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (windowHeight + scrollPosition >= documentHeight - 60) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      if (scrollPosition < 100) {
        setActiveSection(sectionIds[0] || defaultSection);
        return;
      }

      const offset = 140;
      let current = sectionIds[0] || defaultSection;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop - offset;
          if (scrollPosition >= top) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, defaultSection]);

  return activeSection;
}
