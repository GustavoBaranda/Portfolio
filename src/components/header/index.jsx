"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import BurgerMenuMobile from "./BurgerMenuMobile";
import ItemMenu from "./ItemMenu";
import Menu from "./Menu";
import ThemeToggle from "@/components/common/ThemeToggle";
import SocialLinks from "@/components/common/SocialLinks";

const Header = () => {
  const [active, setActive] = useState(false);

  const closeMenu = () => setActive(false);

  return (
    <header className="sticky top-0 z-50 border-b border-soft surface-glass backdrop-blur rounded-b-[0.35rem]">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="inline-flex p-1 items-center justify-center rounded-[0.35rem] border-2 border-gray-200 bg-[#f8fafc] text-xl font-semibold tracking-tight text-[#0f172a] shadow-sm transition-colors duration-200 hover:border-[#0f172a] hover:bg-[#0f172a] hover:text-[#f8fafc] dark:border-gray-700 dark:bg-[#0f172a] dark:text-[#f8fafc] dark:hover:border-[#f8fafc] dark:hover:bg-[#f8fafc] dark:hover:text-[#0f172a]"
        >
          GB
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
