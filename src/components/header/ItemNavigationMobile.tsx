"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { slide } from "./Animation";
import type { NavigationItem } from "./ItemNavigation";
import { LOCALE_BASE_PATH } from "@/i18n/config";
import { useI18n } from "@/i18n/LocaleProvider";

export interface NavigationMobileItemData extends NavigationItem {
  index: number;
}

export interface ItemNavigationMobileProps {
  data: NavigationMobileItemData;
  isActive: boolean;
  onClick?: () => void;
}

export default function ItemNavigationMobile({ data, isActive, onClick }: ItemNavigationMobileProps) {
  const { locale } = useI18n();
  const { text, href, targetId, index, icon: Icon } = data;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === (LOCALE_BASE_PATH[locale] || "/")) {
      event.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
    onClick?.();
  };

  return (
    <motion.div className={`link ${isActive ? "link-active" : ""}`} custom={index} variants={slide} initial="initial" animate="enter" exit="exit">
      <Link href={href} onClick={handleClick} className="link-content" aria-current={isActive ? "location" : undefined}>
        <Icon className="link-icon" size={20} strokeWidth={1.8} aria-hidden="true" />
        <span className="link-label">{text}</span>
      </Link>
    </motion.div>
  );
}
