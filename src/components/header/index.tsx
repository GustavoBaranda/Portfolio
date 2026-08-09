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

const Header: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (!active) return;

    const scrollY = window.scrollY;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyOverflowX: body.style.overflowX,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };

    // Lock page scroll while the drawer is open (prevents iOS/desktop x-scrollbars)
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overflowX = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.overflowX = prev.bodyOverflowX;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyWidth;
      body.style.paddingRight = prev.bodyPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [active]);

  const closeMenu = () => setActive(false);

  return (
    <header className="sticky top-0 z-50 border-b border-soft surface-glass backdrop-blur rounded-b-[0.35rem]">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group inline-flex items-center justify-center bg-transparent transition-transform cursor-pointer"
          aria-label="Ir al inicio"
        >
          <Image
            src="/images/logo.svg"
            alt="Logo Gustavo Baranda"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-all duration-300 ease-out group-hover:scale-115 dark:invert dark:brightness-125 group-hover:drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]"
            priority
          />
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <ItemMenu />
        </div>

        <div className="flex items-center gap-3 md:hidden">
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
