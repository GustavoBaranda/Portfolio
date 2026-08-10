export const SITE_CONFIG = {
  name: "Gustavo Baranda",
  title: "Gustavo Baranda | Full Stack Developer & Data Science Student",
  description: "Full Stack Developer enfocado en construir sistemas robustos con Python, Django y React. Estudiante de Licenciatura en Ciencias de Datos (UdelaCiudad).",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://gustavobaranda.com",
  ogImage: "https://gustavobaranda.com/images/opengraph.png",
  links: {
    github: "https://github.com/GustavoBaranda",
    linkedin: "https://linkedin.com/in/gustavo-baranda",
  },
};

export const getSiteUrl = (): string => {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
  }
  return "https://gustavobaranda.com";
};
