"use client";

import Link from "next/link";
import { NavigationNavBar } from "./ItemNavigation";
import { useActiveSection } from "@/components/utils/useActiveSection";

const sectionIds = NavigationNavBar.map((item) => item.targetId);

const ItemMenu: React.FC = () => {
  const activeSection = useActiveSection(sectionIds, "home");

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  return (
    <nav aria-label="Navegación principal">
      <ul className="mx-auto flex items-center gap-8 text-md font-medium text-link-muted">
        {NavigationNavBar.map((item) => {
          const isActive = activeSection === item.targetId;
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.targetId)}
                className={
                  isActive
                    ? "text-link-active font-semibold transition-colors py-1"
                    : "text-link-muted hover:text-link-active hover:font-semibold transition-colors py-1"
                }
                aria-current={isActive ? "page" : undefined}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ItemMenu;
