import { CANONICAL_URL_BY_LOCALE, SITE_CONFIG } from "@/config/site";
import { getEducation } from "@/data/aboutData";
import { DEFAULT_LOCALE, HTML_LANG_BY_LOCALE, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface EducationalOrganizationSchema {
  "@type": "EducationalOrganization";
  name: string;
}

export interface PersonSchema {
  "@type": "Person";
  "@id": string;
  name: string;
  jobTitle: string;
  url: string;
  description: string;
  sameAs: string[];
  knowsAbout: string[];
  alumniOf: EducationalOrganizationSchema[];
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
}

export interface WebSiteSchema {
  "@type": "WebSite";
  "@id": string;
  name: string;
  url: string;
  inLanguage: "es-AR" | "en";
  author: {
    "@id": string;
  };
}

export interface PortfolioStructuredData {
  "@context": "https://schema.org";
  "@graph": [PersonSchema, WebSiteSchema];
}

export const createPortfolioStructuredData = (locale: Locale = DEFAULT_LOCALE): PortfolioStructuredData => {
  const canonicalUrl = CANONICAL_URL_BY_LOCALE[locale];
  const dictionary = getDictionary(locale);
  const personId = `${canonicalUrl}#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_CONFIG.name,
        jobTitle: "Full Stack Python Developer",
        url: canonicalUrl,
        description: dictionary.metadata.description,
        sameAs: [SITE_CONFIG.links.github, SITE_CONFIG.links.linkedin],
        knowsAbout: [
          "Backend development",
          "Full Stack development",
          "Python",
          "Django",
          "SQL Server",
          "Relational databases",
          "Software integrations",
          "React",
          "Next.js",
          "TypeScript",
          "Open source software",
          "Conversational AI",
          "Multi-agent systems",
        ],
        alumniOf: getEducation(locale).filter(({ statusCode }) => statusCode === "completed").map(
          ({ institution }) => ({
            "@type": "EducationalOrganization",
            name: institution,
          }),
        ),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Buenos Aires",
          addressCountry: "Argentina",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${canonicalUrl}#website`,
        name: SITE_CONFIG.name,
        url: canonicalUrl,
        inLanguage: HTML_LANG_BY_LOCALE[locale],
        author: {
          "@id": personId,
        },
      },
    ],
  };
};

export const serializeJsonLd = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, "\\u003c");
