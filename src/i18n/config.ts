export const SUPPORTED_LOCALES = ["es-AR", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es-AR";

export const HTML_LANG_BY_LOCALE = {
  "es-AR": "es-AR",
  en: "en",
} as const satisfies Readonly<Record<Locale, "es-AR" | "en">>;

export function isSupportedLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export const LOCALE_BASE_PATH: Readonly<Record<Locale, string>> = {
  "es-AR": "",
  en: "/en",
};

export function localeFromSegments(segments?: readonly string[]): Locale | null {
  if (!segments?.length) return DEFAULT_LOCALE;
  return segments.length === 1 && segments[0] === "en" ? "en" : null;
}

export function localeForNotFound(segments?: readonly string[]): Locale {
  return segments?.[0] === "en" ? "en" : DEFAULT_LOCALE;
}

export function localizedSectionHref(locale: Locale, section?: string): string {
  const base = LOCALE_BASE_PATH[locale] || "/";
  return section ? `${base}#${section}` : base;
}

export function localeFromLanguageHeader(value: string | null): Locale {
  return value?.toLowerCase().split(",").some((entry) => entry.trim().startsWith("en"))
    ? "en"
    : DEFAULT_LOCALE;
}
