// Global TypeScript definitions for Portfolio

export interface Project {
  id: string;
  title: string;
  description: string;
  dateSort: number;
  category: "destacado" | "logistica" | "finanzas" | "frontend";
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  image: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  location: string;
  summary: string;
  details: string[];
  highlights?: string[];
  skills?: string[];
}

export interface ContactFormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
