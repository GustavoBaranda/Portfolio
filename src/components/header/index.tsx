"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import BurgerMenuMobile from "./BurgerMenuMobile";
import ItemMenu from "./ItemMenu";
import Menu from "./Menu";
import ThemeToggle from "@/components/common/ThemeToggle";
import SocialLinks from "@/components/common/SocialLinks";

const emptySubscribe = () => () => {};

const Header: React.FC = () => {
  const [active, setActive] = useState(false);
  // Client-only flag for portals without setState-in-effect
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    if (!active) return;

    const html = document.documentElement;
    html.classList.add("menu-open");

    return () => {
      html.classList.remove("menu-open");
    };
  }, [active]);

  const closeMenu = () => setActive(false);

  return (
    <>
      <header
        className={`site-header border-b border-soft backdrop-blur ${
          active
            ? "z-220 border-transparent bg-transparent"
            : "z-50 surface-glass"
        }`}
      >
        <div className="relative mx-auto flex h-(--site-header-h) max-w-7xl items-center justify-between px-6">
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
      </header>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {active ? (
              <motion.button
                key="menu-backdrop"
                type="button"
                aria-label="Cerrar menú"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="menu-backdrop"
                onClick={closeMenu}
              />
            ) : null}
            {active ? (
              <BurgerMenuMobile key="menu-drawer" updateMenu={closeMenu} />
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Header;
