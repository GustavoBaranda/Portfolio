"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { LOCALE_BASE_PATH, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/LocaleProvider";

const subscribeToLocation = (notify: () => void) => {
  window.addEventListener("hashchange", notify);
  window.addEventListener("popstate", notify);
  return () => {
    window.removeEventListener("hashchange", notify);
    window.removeEventListener("popstate", notify);
  };
};

const getHash = () => window.location.hash;

export function languageSwitchHref(locale: Locale, hash = ""): string {
  return `${LOCALE_BASE_PATH[locale] || "/"}${hash.startsWith("#") ? hash : ""}`;
}

export default function LanguageSwitcher() {
  const { locale, dictionary } = useI18n();
  const hash = useSyncExternalStore(subscribeToLocation, getHash, () => "");
  const switchLanguage = (event: React.MouseEvent<HTMLAnchorElement>, targetLocale: Locale) => {
    event.preventDefault();
    window.location.assign(languageSwitchHref(targetLocale, window.location.hash));
  };

  return (
    <nav aria-label={dictionary.navigation.languageLabel} className="inline-flex items-center text-xs font-bold tracking-wide">
      <Link href={languageSwitchHref("es-AR", hash)} onClick={(event) => switchLanguage(event, "es-AR")} hrefLang="es-AR" lang="es" aria-current={locale === "es-AR" ? "page" : undefined} aria-label={dictionary.navigation.switchToSpanish} className={`inline-flex min-h-8 min-w-8 items-center justify-center ${locale === "es-AR" ? "text-link-active" : "text-link-muted hover:text-link-active"}`}>
        ES
      </Link>
      <span aria-hidden="true" className="mx-0.5 text-border">|</span>
      <Link href={languageSwitchHref("en", hash)} onClick={(event) => switchLanguage(event, "en")} hrefLang="en" lang="en" aria-current={locale === "en" ? "page" : undefined} aria-label={dictionary.navigation.switchToEnglish} className={`inline-flex min-h-8 min-w-8 items-center justify-center ${locale === "en" ? "text-link-active" : "text-link-muted hover:text-link-active"}`}>
        EN
      </Link>
    </nav>
  );
}
