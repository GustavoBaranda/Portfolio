import { Home, UserRound, Layers, Mail, LucideIcon } from "lucide-react";

export interface NavigationItem {
  id: number;
  text: string;
  href: string;
  targetId: string;
  icon: LucideIcon;
}

export const NavigationNavBar: NavigationItem[] = [
  { id: 1, text: "Inicio", href: "#home", targetId: "home", icon: Home },
  { id: 2, text: "Sobre mí", href: "#about", targetId: "about", icon: UserRound },
  { id: 3, text: "Proyectos", href: "#projects", targetId: "projects", icon: Layers },
  { id: 4, text: "Contacto", href: "#contact", targetId: "contact", icon: Mail },
];
