import { DEFAULT_LOCALE, type Locale } from "../config";
import { enDictionary } from "./en";
import { esARDictionary } from "./es-AR";
import type { Dictionary } from "./types";

export const DICTIONARIES: Readonly<Record<Locale, Dictionary>> = {
  "es-AR": esARDictionary,
  en: enDictionary,
};

export function getDictionary(locale: Locale = DEFAULT_LOCALE): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary } from "./types";
