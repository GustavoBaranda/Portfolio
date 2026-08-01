"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { menuSlide, slide } from "./Animation";
import ItemNavigationMobile from "./ItemNavigationMobile";
import SvgCurve from "./SvgCurve";
import { NavigationNavBar } from "./ItemNavigation";
import ThemeToggle from "@/components/common/ThemeToggle";
import { SOCIAL_LINKS } from "@/components/common/SocialLinks";

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
  const footerStartIndex = navItemsWithIndex.length + 1;
  const slideMotionProps = {
    variants: slide,
    initial: "initial",
    animate: "enter",
    exit: "exit",
  };

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="menu"
    >
      <SvgCurve />
      <div className="body">
        <div className="nav">
          <Link href="/" onClick={updateMenu}>
            <motion.div
              {...slideMotionProps}
              custom={0}
              className="header border-b pb-4 border-b-gray-200"
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
        <div className="footer border-t border-soft pt-6 pb-4 flex-shrink-0 flex items-center justify-center gap-6 sm:gap-8">
          <motion.div {...slideMotionProps} custom={footerStartIndex}>
            <ThemeToggle />
          </motion.div>
          {SOCIAL_LINKS.map(({ href, label, Icon }, index) => {
            const isMail = href.startsWith("mailto:");
            return (
              <motion.a
                key={href}
                {...slideMotionProps}
                custom={footerStartIndex + index + 1}
                href={href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noreferrer"}
                aria-label={label}
                className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default BurgerMenuMobile;
