"use client";

import { useState, useEffect, useRef, useSyncExternalStore, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import BurgerMenuMobile from "./BurgerMenuMobile";
import ItemMenu from "./ItemMenu";
import Menu from "./Menu";
import ThemeToggle from "@/components/common/ThemeToggle";
import SocialLinks from "@/components/common/SocialLinks";
import { closeNavigationDialogAfterExit } from "@/lib/navigation-dialog";

const emptySubscribe = () => () => {};

const Header: React.FC = () => {
  const menuSlotRef = useRef<HTMLDivElement>(null);
  const [menuHost] = useState(() => {
    if (typeof document === "undefined") return null;
    const host = document.createElement("div");
    host.className = "mobile-menu-control";
    return host;
  });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(false);
  const activeRef = useRef(active);
  const focusDesktopRef = useRef(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const setMenuActive = useCallback((next: boolean) => {
    activeRef.current = next;
    setActive(next);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    const slot = menuSlotRef.current;
    if (!mounted || !dialog || !slot || !menuHost) return;
    if (!active && !dialog.open) {
      slot.appendChild(menuHost);
      return;
    }
    if (active) {
      // Keep the same mounted button in the top layer so its X transition can reverse.
      dialog.appendChild(menuHost);
      document.documentElement.classList.add("menu-open");
      if (!dialog.open) dialog.showModal();
      requestAnimationFrame(() => menuHost.querySelector<HTMLElement>("button")?.focus({ preventScroll: true }));
    }
  }, [active, mounted, menuHost]);

  useEffect(() => {
    if (!mounted) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleDesktop = () => {
      if (desktop.matches && activeRef.current) {
        focusDesktopRef.current = true;
        setMenuActive(false);
      }
    };
    desktop.addEventListener("change", handleDesktop);
    return () => desktop.removeEventListener("change", handleDesktop);
  }, [mounted, setMenuActive]);

  const closeMenu = useCallback(() => setMenuActive(false), [setMenuActive]);

  const finishMenuClose = useCallback(() => {
    // A fast second click can reopen the drawer before its exit completes.
    const dialog = dialogRef.current;
    const slot = menuSlotRef.current;
    if (!dialog || !slot || !menuHost) return;
    if (!closeNavigationDialogAfterExit(dialog, activeRef.current)) return;
    slot.appendChild(menuHost);
    document.documentElement.classList.remove("menu-open");
    requestAnimationFrame(() => {
      if (focusDesktopRef.current || window.matchMedia("(min-width: 768px)").matches) {
        document.querySelector<HTMLElement>("header nav a")?.focus();
      } else {
        menuHost.querySelector<HTMLElement>("button")?.focus({ preventScroll: true });
      }
      focusDesktopRef.current = false;
    });
  }, [menuHost]);

  useEffect(() => () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    document.documentElement.classList.remove("menu-open");
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("home");
      if (el) {
        el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        window.history.pushState(null, "", "#home");
      }
    }
  };

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
            href="/#home"
            onClick={handleLogoClick}
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

          <div ref={menuSlotRef} className="flex h-10 w-10 shrink-0 items-center md:hidden">
            {!mounted && <Menu active={false} setActive={setActive} />}
            {mounted && menuHost && createPortal(<Menu active={active} setActive={setMenuActive} />, menuHost)}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <SocialLinks className="flex items-center gap-3" />
          </div>
        </div>
      </header>

      {mounted &&
        createPortal(
          <dialog
            ref={dialogRef}
            id="mobile-navigation"
            aria-label="Navegación móvil"
            className="mobile-navigation-dialog"
            onCancel={(event) => { event.preventDefault(); closeMenu(); }}
            onClose={() => { if (activeRef.current) setMenuActive(false); }}
            onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}
          >
            <AnimatePresence initial={false} onExitComplete={finishMenuClose}>
              {active && (
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
              )}
              {active && <BurgerMenuMobile key="menu-drawer" updateMenu={closeMenu} />}
            </AnimatePresence>
          </dialog>,
          document.body
        )}
    </>
  );
};

export default Header;
