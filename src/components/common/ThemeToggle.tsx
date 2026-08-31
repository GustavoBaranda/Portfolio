"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const emptySubscribe = () => () => {};

function applyTheme(next: string) {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.setAttribute("data-theme", next);
  window.localStorage.setItem("theme", next);
}

export default function ThemeToggle() {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true
  );
  const skipTransition = useRef(true);

  const [theme, setTheme] = useState<string>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") ?? "light";
    }
    return "light";
  });

  useEffect(() => {
    if (isServer) return;

    if (skipTransition.current) {
      skipTransition.current = false;
      applyTheme(theme);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canTransition =
      !reduceMotion && typeof document.startViewTransition === "function";

    if (canTransition) {
      document.startViewTransition(() => applyTheme(theme));
      return;
    }

    applyTheme(theme);
  }, [theme, isServer]);

  if (isServer) {
    return (
      <button
        type="button"
        className="icon-button theme-toggle cursor-pointer"
        aria-label="Cambiar tema"
      >
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      className="icon-button theme-toggle cursor-pointer"
      aria-label="Cambiar tema"
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}
