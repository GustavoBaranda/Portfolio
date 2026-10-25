export const SUPPORTED_LOCALES = ["es-AR", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es-AR";

export const HTML_LANG_BY_LOCALE: Readonly<Record<Locale, string>> = {
  "es-AR": "es",
  en: "en",
};

export function isSupportedLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}
