export interface Experience {
  id: number;
  role: string;
  company: string;
  initials: string;
  type: string | null;
  period: string;
  duration: string;
  location: string;
  description: string;
  mainSkills: string[];
  skills: string[];
  color: string;
  modalidad: "Remoto" | "Híbrido" | "Presencial";
  url?: string;
}

export interface Education {
  id: string;
  title: string;
  institution: string;
  period: string;
  location: string | null;
  color: string;
  logo: string;
  status: "En curso" | "Finalizado";
}

export interface Project {
  id: string;
  title: string;
  category: "full-stack" | "apis" | "opensource";
  categoryLabel: string;
  company: string;
  period: string;
  challenge: string;
  solution: string;
  image: string;
  tags: string[];
  featured: boolean;
  githubUrl?: string | null;
  demoUrl?: string | null;
}
