export const SITE_CONFIG = {
  name: "Gustavo Baranda",
  title: "Gustavo Baranda | Full Stack Developer & Data Science Student",
  description:
    "Full Stack Developer enfocado en construir sistemas robustos con Python, Django y React. Estudiante de Licenciatura en Ciencias de Datos (UdelaCiudad).",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://gustavobaranda.com",
  ogImage: "https://gustavobaranda.com/images/opengraph.png",
  links: {
    github: "https://github.com/GustavoBaranda",
    linkedin: "https://www.linkedin.com/in/gustavobaranda/",
  },
};

export const getSiteUrl = (): string => {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    const url = process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
    if (process.env.NODE_ENV === "production" && url.startsWith("http://")) {
      return url.replace("http://", "https://");
    }
    return url;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  return "https://gustavobaranda.com";
};
