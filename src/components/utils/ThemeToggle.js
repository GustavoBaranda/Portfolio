import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedTheme = typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
    const prefersDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = storedTheme ?? (prefersDark ? "dark" : "light");
    /* eslint-disable react-hooks/set-state-in-effect */
    setTheme(nextTheme);
    setIsReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!isReady) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme, isReady]);

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