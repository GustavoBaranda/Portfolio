"use client";

import Link from "next/link";
import Image from "next/image";
import SocialLinks from "@/components/common/SocialLinks";
import { localizedSectionHref } from "@/i18n/config";
import { useI18n } from "@/i18n/LocaleProvider";

export default function Footer() {
  const { locale, dictionary } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-soft surface-glass backdrop-blur rounded-t-xl mt-auto">
      <div className="max-w-7xl mx-auto px-6 pt-5 pb-4 sm:pt-5 sm:pb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo & Copyright */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href={localizedSectionHref(locale)}
            className="group flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
            aria-label={dictionary.navigation.goHome}
          >
            <Image
              src="/images/logo.svg"
              alt={dictionary.common.logoAlt}
              width={26}
              height={26}
              className="w-6 h-6 sm:w-6.5 sm:h-6.5 object-contain transition-all duration-200 grayscale brightness-0 opacity-40 group-hover:opacity-70 dark:invert"
            />
            <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors leading-none">
              Gustavo Baranda
            </span>
          </Link>
          <span className="text-slate-400 dark:text-slate-500 text-xs opacity-60 leading-none">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 leading-none">&copy; {year}</span>
        </div>

        {/* Redes */}
        <SocialLinks className="flex items-center gap-4" />
      </div>
    </footer>
  );
}
