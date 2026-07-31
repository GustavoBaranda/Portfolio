"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { slide, scale } from "./Animation";
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
  const { text, href, index, icon: Icon } = data;

  const handleClick = () => {
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
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
      />
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
