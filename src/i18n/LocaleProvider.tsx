"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import { DEFAULT_LOCALE } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";

interface LocaleContextValue {
  locale: Locale;
  dictionary: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  dictionary: getDictionary(DEFAULT_LOCALE),
});

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: LocaleContextValue & { children: ReactNode }) {
  return (
    <LocaleContext.Provider value={{ locale, dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useI18n(): LocaleContextValue {
  return useContext(LocaleContext);
}
