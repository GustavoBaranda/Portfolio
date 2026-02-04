"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Linkedin, Github, Mail } from "lucide-react";
import { menuSlide, slide } from "./Animation";
import ItemNavigationMobile from "./ItemNavigationMobile";
import SvgCurve from "./SvgCurve";
import { NavigationNavBar } from "./ItemNavigation";
import Link from "next/link";
import ThemeToggle from "../utils/ThemeToggle"; 

const normalizePath = (path) => {
  if (!path) return "/";
  return path === "/" ? "/" : path.replace(/\/+$/, "");
};

const BurgerMenuMobile = ({ updateMenu }) => {
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
  const footerIcons = [
    {
      href: "https://github.com/GustavoBaranda",
      label: "GitHub",
      Icon: Github,
    },
    {
      href: "https://www.linkedin.com/in/gustavobaranda/",
      label: "LinkedIn",
      Icon: Linkedin,
    },
    {
      href: "mailto:baranda.gustavo@gmail.com",
      label: "Email",
      Icon: Mail,
    },
  ];

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
        <div className="footer border-t border-t-gray-200 pt-6">
          <motion.div {...slideMotionProps} custom={footerStartIndex}>
            <ThemeToggle />
          </motion.div>
          {footerIcons.map(({ href, label, Icon }, index) => (
            <motion.a
              key={href}
              {...slideMotionProps}
              custom={footerStartIndex + index + 1}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-muted-link transition-colors hover:text-accent"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BurgerMenuMobile;
