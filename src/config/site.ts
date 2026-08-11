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

/**
 * Resuelve la URL base del sitio con el siguiente orden de prioridad:
 * 1. NEXT_PUBLIC_BASE_URL  → variable explícita (producción: https://gustavobaranda.com)
 * 2. VERCEL_URL            → inyectada automáticamente por Vercel en cada deployment
 *                            (útil para preview deployments de PRs sin configuración extra)
 * 3. Fallback hardcoded    → https://gustavobaranda.com (protege builds sin env vars)
 *
 * Siempre devuelve la URL sin trailing slash.
 */
export const getSiteUrl = (): string => {
  // 1. Variable explícita (máxima prioridad)
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    const url = process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
    // En producción, forzar HTTPS por si alguien puso http:// por error
    if (process.env.NODE_ENV === "production" && url.startsWith("http://")) {
      return url.replace("http://", "https://");
    }
    return url;
  }

  // 2. Variable automática de Vercel — disponible en todos los deployments
  // VERCEL_URL no incluye protocolo, ej: "gusdev-abc123.vercel.app"
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 3. Fallback seguro para producción sin env vars configuradas
  return "https://gustavobaranda.com";
};

