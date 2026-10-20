import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Gustavo Baranda",
  title: "Gustavo Baranda | Full Stack Python Developer",
  description:
    "Full Stack Python Developer especializado en backend con Django y SQL Server. Desarrollo aplicaciones empresariales, integraciones y proyectos open source.",
  socialDescription:
    "Gustavo Baranda desarrolla aplicaciones empresariales con Python, Django y SQL Server, y mantiene la librería open source chatflow-agent.",
  url: "https://gustavobaranda.com",
  ogImage: "/images/opengraph.png",
  links: {
    github: "https://github.com/GustavoBaranda",
    linkedin: "https://www.linkedin.com/in/gustavobaranda/",
  },
};

export const createRootMetadata = (baseUrl: string): Metadata => ({
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  keywords: [
    "Full Stack Python Developer",
    "Python",
    "Django",
    "SQL Server",
    "React",
    "TypeScript",
    "Open Source",
    "APIs REST",
    "Software Engineer",
    "Buenos Aires",
    "Argentina",
  ],
  authors: [{ name: SITE_CONFIG.name, url: baseUrl }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: SITE_CONFIG.name,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
});

export const createHomeMetadata = (baseUrl: string): Metadata => ({
  title: {
    absolute: SITE_CONFIG.title,
  },
  description: SITE_CONFIG.description,
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.socialDescription,
    url: baseUrl,
    siteName: `${SITE_CONFIG.name} Portfolio`,
    images: [
      {
        url: `${baseUrl}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Full Stack Python Developer`,
        type: "image/png",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.socialDescription,
    images: [
      {
        url: `${baseUrl}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Full Stack Python Developer`,
      },
    ],
  },
});

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

  return SITE_CONFIG.url;
};
