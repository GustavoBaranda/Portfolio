"use client";

import Link from "next/link";
import { getNavigationNavBar } from "./ItemNavigation";
import { useActiveSection } from "@/components/utils/useActiveSection";
import { LOCALE_BASE_PATH } from "@/i18n/config";
import { useI18n } from "@/i18n/LocaleProvider";

export default function ItemMenu() {
  const { locale, dictionary } = useI18n();
  const navigationItems = getNavigationNavBar(locale);
  const activeSection = useActiveSection(navigationItems.map(({ targetId }) => targetId), "home");

  const handleScrollTo = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (window.location.pathname === (LOCALE_BASE_PATH[locale] || "/")) {
      event.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  return (
    <nav aria-label={dictionary.navigation.mainLabel}>
      <ul className="mx-auto flex items-center gap-8 text-md font-medium text-link-muted">
        {navigationItems.map((item) => {
          const isActive = activeSection === item.targetId;
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={(event) => handleScrollTo(event, item.targetId)}
                className={isActive ? "text-link-active font-semibold transition-colors py-1" : "text-link-muted hover:text-link-active hover:font-semibold transition-colors py-1"}
                aria-current={isActive ? "location" : undefined}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
