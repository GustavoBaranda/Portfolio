import { Home, UserRound, Layers, Mail, type LucideIcon } from "lucide-react";
import { DEFAULT_LOCALE, localizedSectionHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export interface NavigationItem {
  id: number;
  text: string;
  href: string;
  targetId: string;
  icon: LucideIcon;
}

export function getNavigationNavBar(locale: Locale = DEFAULT_LOCALE): NavigationItem[] {
  const dictionary = getDictionary(locale);
  return [
    { id: 1, text: dictionary.common.home, href: localizedSectionHref(locale, "home"), targetId: "home", icon: Home },
    { id: 2, text: dictionary.common.about, href: localizedSectionHref(locale, "about"), targetId: "about", icon: UserRound },
    { id: 3, text: dictionary.common.projects, href: localizedSectionHref(locale, "projects"), targetId: "projects", icon: Layers },
    { id: 4, text: dictionary.common.contact, href: localizedSectionHref(locale, "contact"), targetId: "contact", icon: Mail },
  ];
}

export const NavigationNavBar: NavigationItem[] = getNavigationNavBar();
