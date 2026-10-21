"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

interface ScrollViewport {
  scrollTo(options: ScrollToOptions): void;
  matchMedia(query: string): Pick<MediaQueryList, "matches">;
}

interface FocusTarget {
  focus(options?: FocusOptions): void;
}

export function shouldShowBackToTop(scrollY: number, viewportHeight: number) {
  return viewportHeight > 0 && scrollY >= viewportHeight;
}

export function returnToPageTop(viewport: ScrollViewport, focusTarget?: FocusTarget | null) {
  const reducedMotion = viewport.matchMedia("(prefers-reduced-motion: reduce)").matches;
  viewport.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  focusTarget?.focus({ preventScroll: true });
}

export interface BackToTopControlProps {
  visible: boolean;
  liftedAboveFooter?: boolean;
  onActivate: () => void;
}

export function BackToTopControl({
  visible,
  liftedAboveFooter = false,
  onActivate,
}: BackToTopControlProps) {
  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      onClick={onActivate}
      className={`fixed right-4 sm:right-6 z-40 flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-950/20 hover:bg-indigo-700 active:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:hover:text-slate-950 dark:active:bg-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer transition-colors duration-200 ${
        liftedAboveFooter
          ? "bottom-[calc(8rem+env(safe-area-inset-bottom))] sm:bottom-[calc(5.5rem+env(safe-area-inset-bottom))]"
          : "bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(shouldShowBackToTop(window.scrollY, window.innerHeight));
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(Boolean(entry?.isIntersecting));
    });
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    returnToPageTop(window, document.getElementById("main-content"));
  };

  return (
    <BackToTopControl
      visible={visible}
      liftedAboveFooter={footerVisible}
      onActivate={scrollToTop}
    />
  );
}
