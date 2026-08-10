"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SocialLinks from "@/components/common/SocialLinks";
import { NavigationNavBar } from "@/components/header/ItemNavigation";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer className="w-full border-t border-soft surface-glass backdrop-blur mt-auto">
      <div className="max-w-7xl mx-auto px-6 pt-5 pb-4 sm:pt-6 sm:pb-5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">

        {/* Logo & Copyright */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Link
            href="/"
            className="group flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
            aria-label="Ir al inicio"
          >
            <Image
              src="/images/logo.svg"
              alt="Logo Gustavo Baranda"
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

        {/* Navegación central */}
        <nav aria-label="Navegación del footer">
          <ul className="flex items-center gap-4 sm:gap-5">
            {NavigationNavBar.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Redes sociales */}
        <SocialLinks className="flex items-center gap-4 shrink-0" />
      </div>
    </footer>
  );
}

