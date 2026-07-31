"use client";

import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import BurgerMenuMobile from "./BurgerMenuMobile";
import ItemMenu from "./ItemMenu";
import Menu from "./Menu";
import ThemeToggle from "@/components/common/ThemeToggle";
import SocialLinks from "@/components/common/SocialLinks";

const Header = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  const closeMenu = () => setActive(false);

  return (
    <header className="sticky top-0 z-50 border-b border-soft surface-glass backdrop-blur rounded-b-[0.35rem]">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group inline-flex p-1.5 items-center justify-center rounded-[0.35rem] border-2 border-gray-200 bg-[#f8fafc] shadow-sm transition-colors duration-200 hover:border-[#0f172a] hover:bg-[#0f172a] dark:border-gray-700 dark:bg-[#0f172a] dark:hover:border-[#f8fafc] dark:hover:bg-[#f8fafc] cursor-pointer"
          aria-label="Ir al inicio"
        >
          <Image
            src="/images/logo.svg"
            alt="Logo Gustavo Baranda"
            width={24}
            height={24}
            className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <ItemMenu />
        </div>
        
        <div className="flex items-center gap-3 md:hidden w-full justify-end">
          <Menu active={active} setActive={setActive} />
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <SocialLinks className="flex items-center gap-3" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {active && <BurgerMenuMobile updateMenu={closeMenu} />}
      </AnimatePresence>
    </header>
  );
};

export default Header;
