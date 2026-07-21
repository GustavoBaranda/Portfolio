import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

const getInitialTheme = () => {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-theme") ?? "light";
  }
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("theme") ?? "light";
  }
  return "light";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const current = document.documentElement.getAttribute("data-theme");
    if (current && current !== theme) {
      setTheme(current);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="icon-button theme-toggle"
      aria-label="Cambiar tema"
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? (
        <MoonIcon className="w-5 h-5" />
      ) : (
        <SunIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;