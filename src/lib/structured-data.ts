import { SITE_CONFIG } from "@/config/site";
import { EDUCATION } from "@/data/aboutData";

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
  inLanguage: "es";
  author: {
    "@id": string;
  };
}

export interface PortfolioStructuredData {
  "@context": "https://schema.org";
  "@graph": [PersonSchema, WebSiteSchema];
}

export const createPortfolioStructuredData = (): PortfolioStructuredData => {
  const canonicalUrl = SITE_CONFIG.url;
  const personId = `${canonicalUrl}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_CONFIG.name,
        jobTitle: "Full Stack Python Developer",
        url: canonicalUrl,
        description: SITE_CONFIG.description,
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
        ],
        alumniOf: EDUCATION.filter(({ status }) => status === "Finalizado").map(
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
        "@id": `${canonicalUrl}/#website`,
        name: SITE_CONFIG.name,
        url: canonicalUrl,
        inLanguage: "es",
        author: {
          "@id": personId,
        },
      },
    ],
  };
};

export const serializeJsonLd = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, "\\u003c");
