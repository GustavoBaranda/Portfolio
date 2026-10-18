"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const emptySubscribe = () => () => {};
const themeEvent = "gusdev-theme-change";

function applyTheme(next: string) {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.setAttribute("data-theme", next);
  try {
    window.localStorage.setItem("theme", next);
  } catch {
    // The visual theme remains usable when storage is unavailable.
  }
  window.dispatchEvent(new Event(themeEvent));
}

export default function ThemeToggle() {
  const isServer = useSyncExternalStore(emptySubscribe, () => false, () => true);
  const skipTransition = useRef<"initial" | "sync" | null>("initial");
  const [theme, setTheme] = useState<string>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") ?? "light";
    }
    return "light";
  });

  useEffect(() => {
    const syncTheme = () => {
      const next = document.documentElement.getAttribute("data-theme") ?? "light";
      setTheme((current) => {
        if (current === next) return current;
        skipTransition.current = "sync";
        return next;
      });
    };
    window.addEventListener(themeEvent, syncTheme);
    return () => window.removeEventListener(themeEvent, syncTheme);
  }, []);

  useEffect(() => {
    if (isServer) return;
    if (skipTransition.current === "initial") {
      skipTransition.current = null;
      applyTheme(theme);
      return;
    }
    if (skipTransition.current === "sync") {
      skipTransition.current = null;
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && typeof document.startViewTransition === "function") {
      document.startViewTransition(() => applyTheme(theme));
      return;
    }
    applyTheme(theme);
  }, [theme, isServer]);

  if (isServer) {
    return (
      <button type="button" className="icon-button theme-toggle cursor-pointer" aria-label="Cambiar tema">
        <Sun aria-hidden="true" className="w-5 h-5" />
      </button>
    );
  }

  const dark = theme === "dark";
  return (
    <button type="button" onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      className="icon-button theme-toggle cursor-pointer"
      aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"} aria-pressed={dark}>
      {dark ? <Moon aria-hidden="true" className="w-5 h-5" /> : <Sun aria-hidden="true" className="w-5 h-5" />}
    </button>
  );
}
