import { Home, UserRound, Layers, Mail, LucideIcon } from "lucide-react";

export interface NavigationItem {
  id: number;
  text: string;
  href: string;
  icon: LucideIcon;
}

export const NavigationNavBar: NavigationItem[] = [
  { id: 1, text: "Home", href: "/", icon: Home },
  { id: 2, text: "Sobre mí", href: "/about", icon: UserRound },
  { id: 6, text: "Proyectos", href: "/projects", icon: Layers },
  { id: 7, text: "Contacto", href: "/contact", icon: Mail },
];
