const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f172a",
        light: "#f8fafc",
        foreground: "#0f172a",
        "muted-foreground": "#64748b",
        accent: "#60a5fa",
      },
    },
  },
};

export default config;