"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { menuSlide, slide } from "./Animation";
import ItemNavigationMobile from "./ItemNavigationMobile";
import { getNavigationNavBar } from "./ItemNavigation";
import ThemeToggle from "@/components/common/ThemeToggle";
import SocialLinks from "@/components/common/SocialLinks";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useActiveSection } from "@/components/utils/useActiveSection";
import { LOCALE_BASE_PATH, localizedSectionHref } from "@/i18n/config";
import { useI18n } from "@/i18n/LocaleProvider";

export interface BurgerMenuMobileProps {
  updateMenu: () => void;
}

export default function BurgerMenuMobile({ updateMenu }: BurgerMenuMobileProps) {
  const { locale, dictionary } = useI18n();
  const navigationItems = getNavigationNavBar(locale);
  const activeSection = useActiveSection(navigationItems.map(({ targetId }) => targetId), "home");
  const navItemsWithIndex = navigationItems.map((item, index) => ({ ...item, index: index + 1 }));
  const year = new Date().getFullYear();
  const slideMotionProps = { variants: slide, initial: "initial", animate: "enter", exit: "exit" } as const;
  const footerStartIndex = navItemsWithIndex.length + 1;

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === (LOCALE_BASE_PATH[locale] || "/")) {
      event.preventDefault();
      const element = document.getElementById("home");
      if (element) {
        element.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        window.history.pushState(null, "", "#home");
      }
    }
    updateMenu();
  };

  return (
    <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit" className="menu">
      <div className="body">
        <nav className="nav" aria-label={dictionary.navigation.sectionsLabel}>
          <Link href={localizedSectionHref(locale, "home")} onClick={handleLogoClick}>
            <motion.div {...slideMotionProps} custom={0} className="header border-b border-soft pb-4 cursor-pointer">
              <h2 className="text-2xl font-bold">Gustavo Baranda</h2>
              <p className="text-lg font-semibold opacity-90">Full Stack Developer</p>
            </motion.div>
          </Link>
          {navItemsWithIndex.map((data) => (
            <ItemNavigationMobile key={data.href} data={data} onClick={updateMenu} isActive={activeSection === data.targetId} />
          ))}
        </nav>

        <motion.div {...slideMotionProps} custom={footerStartIndex} className="footer border-t border-soft pt-5 pb-3 shrink-0 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2.5">
            <Link href={localizedSectionHref(locale, "home")} onClick={handleLogoClick} className="group flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer" aria-label={dictionary.navigation.goHome}>
              <Image src="/images/logo.svg" alt={dictionary.common.logoAlt} width={26} height={26} className="w-6 h-6 object-contain transition-all duration-200 grayscale brightness-0 opacity-40 group-hover:opacity-70 dark:invert" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors leading-none">Gustavo Baranda</span>
            </Link>
            <span className="text-slate-400 dark:text-slate-500 text-xs opacity-60 leading-none">·</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 leading-none">&copy; {year}</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <SocialLinks className="flex items-center gap-4" iconSize={18} includeEmail={false} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
