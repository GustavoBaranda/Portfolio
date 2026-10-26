import type { MetadataRoute } from "next";
import { CANONICAL_URL_BY_LOCALE, LANGUAGE_ALTERNATES } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(CANONICAL_URL_BY_LOCALE).map((url) => ({
    url,
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: LANGUAGE_ALTERNATES,
    },
  }));
}
