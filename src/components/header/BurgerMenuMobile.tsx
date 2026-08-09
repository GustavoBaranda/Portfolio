"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { menuSlide, slide } from "./Animation";
import ItemNavigationMobile from "./ItemNavigationMobile";
import { NavigationNavBar } from "./ItemNavigation";
import ThemeToggle from "@/components/common/ThemeToggle";
import SocialLinks from "@/components/common/SocialLinks";

const normalizePath = (path: string | null) => {
  if (!path) return "/";
  return path === "/" ? "/" : path.replace(/\/+$/, "");
};

export interface BurgerMenuMobileProps {
  updateMenu: () => void;
}

const BurgerMenuMobile: React.FC<BurgerMenuMobileProps> = ({ updateMenu }) => {
  const pathname = usePathname();
  const currentPath = normalizePath(pathname);
  const navItemsWithIndex = NavigationNavBar.map((item, index) => ({
    ...item,
    index: index + 1,
  }));
  const year = new Date().getFullYear();
  const slideMotionProps = {
    variants: slide,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };
  const footerStartIndex = navItemsWithIndex.length + 1;

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="menu"
    >
      <div className="body">
        <div className="nav">
          <Link href="/" onClick={updateMenu}>
            <motion.div
              {...slideMotionProps}
              custom={0}
              className="header border-b border-soft pb-4"
            >
              <h2 className="text-2xl font-bold">Gustavo Baranda</h2>
              <p className="text-lg font-semibold opacity-90">Full Stack Developer</p>
            </motion.div>
          </Link>
          {navItemsWithIndex.map((data) => (
            <ItemNavigationMobile
              key={data.href}
              data={data}
              onClick={updateMenu}
              isActive={currentPath === normalizePath(data.href)}
            />
          ))}
        </div>

        {/* Footer del drawer — mismo patrón que el footer del sitio */}
        <motion.div
          {...slideMotionProps}
          custom={footerStartIndex}
          className="footer border-t border-soft pt-5 pb-3 shrink-0 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              onClick={updateMenu}
              className="group flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
              aria-label="Ir al inicio"
            >
              <Image
                src="/images/logo.svg"
                alt="Logo Gustavo Baranda"
                width={26}
                height={26}
                className="w-6 h-6 object-contain transition-all duration-200 grayscale brightness-0 opacity-40 group-hover:opacity-70 dark:invert"
              />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors leading-none">
                Gustavo Baranda
              </span>
            </Link>
            <span className="text-slate-400 dark:text-slate-500 text-xs opacity-60 leading-none">
              ·
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 leading-none">
              &copy; {year}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <SocialLinks className="flex items-center gap-4" iconSize={18} includeEmail={false} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BurgerMenuMobile;
