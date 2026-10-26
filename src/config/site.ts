import type { Metadata } from "next";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const SITE_CONFIG = {
  name: "Gustavo Baranda",
  title: "Gustavo Baranda | Full Stack Python Developer",
  description:
    "Full Stack Python Developer especializado en backend con Django y SQL Server. Desarrollo aplicaciones empresariales, integraciones y proyectos open source.",
  socialDescription:
    "Gustavo Baranda desarrolla aplicaciones empresariales con Python, Django y SQL Server, y mantiene la librería open source chatflow-agent.",
  url: "https://gustavobaranda.com",
  ogImage: "/images/opengraph-v2.png",
  links: {
    github: "https://github.com/GustavoBaranda",
    linkedin: "https://www.linkedin.com/in/gustavobaranda/",
  },
};

export const CANONICAL_URL_BY_LOCALE = {
  "es-AR": new URL("/", SITE_CONFIG.url).href,
  en: new URL("/en", SITE_CONFIG.url).href,
} as const satisfies Readonly<Record<Locale, string>>;

export const LANGUAGE_ALTERNATES = {
  "es-AR": CANONICAL_URL_BY_LOCALE["es-AR"],
  en: CANONICAL_URL_BY_LOCALE.en,
  "x-default": CANONICAL_URL_BY_LOCALE["es-AR"],
} as const;

const OPEN_GRAPH_LOCALE = {
  "es-AR": "es_AR",
  en: "en_US",
} as const satisfies Readonly<Record<Locale, string>>;

const OPEN_GRAPH_ALTERNATE_LOCALE = {
  "es-AR": [OPEN_GRAPH_LOCALE.en],
  en: [OPEN_GRAPH_LOCALE["es-AR"]],
} as const satisfies Readonly<Record<Locale, readonly string[]>>;

export const createRootMetadata = (): Metadata => ({
  metadataBase: new URL(SITE_CONFIG.url),
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
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
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

export const createHomeMetadata = (locale: Locale = DEFAULT_LOCALE): Metadata => {
  const dictionary = getDictionary(locale);
  const pageUrl = CANONICAL_URL_BY_LOCALE[locale];
  const socialImage = {
    url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    width: 1200,
    height: 630,
    alt: dictionary.metadata.imageAlt,
  };

  return {
    title: {
      absolute: dictionary.metadata.title,
    },
    description: dictionary.metadata.description,
    alternates: {
      canonical: pageUrl,
      languages: LANGUAGE_ALTERNATES,
    },
    openGraph: {
      title: dictionary.metadata.title,
      description: dictionary.metadata.socialDescription,
      url: pageUrl,
      siteName: `${SITE_CONFIG.name} Portfolio`,
      images: [{ ...socialImage, type: "image/png" }],
      locale: OPEN_GRAPH_LOCALE[locale],
      alternateLocale: [...OPEN_GRAPH_ALTERNATE_LOCALE[locale]],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.title,
      description: dictionary.metadata.socialDescription,
      images: [socialImage],
    },
  };
};

interface SiteUrlEnvironment {
  NEXT_PUBLIC_BASE_URL?: string;
  VERCEL_URL?: string;
  NODE_ENV?: string;
}

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export const resolveSiteUrl = (environment: SiteUrlEnvironment): string => {
  if (environment.NEXT_PUBLIC_BASE_URL) {
    const url = new URL(environment.NEXT_PUBLIC_BASE_URL);
    if (
      environment.NODE_ENV === "production" &&
      url.protocol === "http:" &&
      !LOCAL_HOSTS.has(url.hostname)
    ) {
      url.protocol = "https:";
    }
    return url.origin;
  }

  if (environment.VERCEL_URL) {
    const deploymentUrl = environment.VERCEL_URL.replace(/^https?:\/\//, "");
    return new URL(`https://${deploymentUrl}`).origin;
  }

  return environment.NODE_ENV === "production"
    ? SITE_CONFIG.url
    : "http://localhost:3000";
};

export const getSiteUrl = (): string => resolveSiteUrl(process.env);
