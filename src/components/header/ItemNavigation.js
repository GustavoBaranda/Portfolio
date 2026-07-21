import { Home, UserRound, BriefcaseBusiness, GraduationCap, Layers, Mail } from "lucide-react";

export const ProjectsDropdown = [
  { id: 1, text: "Full Stack", href: "/projects#full-stack" },
  { id: 2, text: "APIs y Microservicios", href: "/projects#apis" },
  { id: 3, text: "Open Source", href: "/projects#opensource" },
];

export const NavigationNavBar = [
  { id: 1, text: "Home", href: "/", icon: Home },
  { id: 2, text: "Sobre mí", href: "/about", icon: UserRound },
  // { id: 3, text: "Experiencia", href: "/experience", icon: BriefcaseBusiness },
  // { id: 4, text: "Educación", href: "/education", icon: GraduationCap },
  // { id: 5, text: "Skills", href: "/skills" },
  { id: 6, text: "Proyectos", href: "/projects", dropdownItems: ProjectsDropdown, icon: Layers },
  { id: 7, text: "Contacto", href: "/contact", icon: Mail },
];
