"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { slide } from "./Animation";
import { NavigationItem } from "./ItemNavigation";

export interface NavigationMobileItemData extends NavigationItem {
  index: number;
}

export interface ItemNavigationMobileProps {
  data: NavigationMobileItemData;
  isActive: boolean;
  onClick?: () => void;
}

const ItemNavigationMobile: React.FC<ItemNavigationMobileProps> = ({ data, isActive, onClick }) => {
  const { text, href, targetId, index, icon: Icon } = data;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
    onClick?.();
  };

  return (
    <motion.div
      className={`link ${isActive ? "link-active" : ""}`}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <Link
        href={href}
        onClick={handleClick}
        className="link-content"
        aria-current={isActive ? "page" : undefined}
      >
        {Icon ? (
          <Icon
            className="link-icon"
            size={20}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        ) : null}
        <span className="link-label">{text}</span>
      </Link>
    </motion.div>
  );
};

export default ItemNavigationMobile;
