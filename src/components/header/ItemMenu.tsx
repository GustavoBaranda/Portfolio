"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavigationNavBar } from "./ItemNavigation";

const ItemMenu: React.FC = () => {
  const pathname = usePathname() || "/";
  const base = `/${pathname.split("/")[1] || ""}`;

  return (
    <nav>
      <ul className="mx-auto flex items-center gap-8 text-md font-medium text-link-muted">
        {NavigationNavBar.map((item) => {
          const isActive = base === item.href;
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={
                  isActive
                    ? "text-link-active font-semibold transition-colors"
                    : "text-link-muted hover:text-link-active hover:font-semibold transition-colors"
                }
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
