import type { NormalizedDate, YearMonth } from "@/i18n/format";

export type ExperienceId =
  | "syspro-consulting"
  | "fundacion-maldonado"
  | "solar-banco"
  | "las-verde"
  | "descubriendo-jardin";

export type EducationId =
  | "data-science-degree"
  | "software-development-degree"
  | "teacher-training"
  | "frontend-development"
  | "python-development";

export type EducationStatus = "in_progress" | "completed";
export type ProjectStatus = "active" | "dated";
export type ProjectCategoryId = "full-stack" | "apis" | "opensource";
export type LocalizedTermId =
  | "digitalSignature"
  | "pdfReports"
  | "liquidityMetrics"
  | "processAuditing"
  | "semanticHtml"
  | "uxUiDesign";
export type PortfolioTerm = string | { readonly termId: LocalizedTermId };

export function resolvePortfolioTerms(
  terms: readonly PortfolioTerm[],
  labels: Record<LocalizedTermId, string>,
): string[] {
  return terms.map((term) =>
    typeof term === "string" ? term : labels[term.termId],
  );
}

export interface ExperienceFact {
  contentId: ExperienceId;
  id: number;
  company: string;
  initials: string;
  startDate: YearMonth;
  endDate: YearMonth | null;
  mainSkills: readonly string[];
  skills: readonly PortfolioTerm[];
  color: string;
  url?: string;
}

export interface EducationFact {
  contentId: EducationId;
  id: string;
  institution: string;
  startDate: YearMonth;
  endDate: YearMonth | null;
  statusCode: EducationStatus;
  color: string;
  logo: string;
}

export interface ProjectFact {
  id: string;
  priority: number;
  category: ProjectCategoryId;
  startDate: NormalizedDate | null;
  endDate: NormalizedDate | null;
  sortDate: YearMonth | null;
  status: ProjectStatus;
  image: string | null;
  imagePresentation: "interface" | "wide-logo" | "square-logo";
  tags: readonly PortfolioTerm[];
  featured: boolean;
  githubUrl: string | null;
  demoUrl: string | null;
}

export const EXPERIENCE_FACTS = [
  {
    contentId: "syspro-consulting",
    id: 1,
    company: "SysPro Consulting",
    initials: "/images/syspro.png",
    startDate: "2025-05",
    endDate: null,
    mainSkills: ["Python", "Django", "SQL Server"],
    skills: ["Django", "SQL Server", "Celery", "Redis", "WebSockets", "Django Channels", { termId: "digitalSignature" }, "pyHanko", "ReportLab", "PyMuPDF", "Web Push", "Huawei Cloud", "Leaflet", "Git", "GitHub"],
    color: "syspro",
  },
  {
    contentId: "fundacion-maldonado",
    id: 2,
    company: "Fundación Maldonado",
    initials: "/images/fundacion_maldonado.png",
    startDate: "2025-04",
    endDate: "2025-05",
    mainSkills: ["Laravel", "PHP", "MySQL"],
    skills: ["Laravel", "PHP", "MySQL", "Visor DICOM", "DWV & Canvas", "DataTables", "RBAC", "Tailwind CSS", "Alpine.js", { termId: "pdfReports" }, "Git", "GitHub"],
    color: "fundacion",
  },
  {
    contentId: "solar-banco",
    id: 3,
    company: "Solar Banco",
    initials: "/images/solar_banco.png",
    startDate: "2024-12",
    endDate: "2025-03",
    mainSkills: ["Python", "Django", "ETL"],
    skills: ["Django", "Python", "Oracle DW", "ETL Pipelines", "Pandas", { termId: "liquidityMetrics" }, "Active Directory", "cx_Oracle", "OpenPyXL", { termId: "processAuditing" }, "DataTables", "Git", "GitHub"],
    color: "solar",
  },
  {
    contentId: "las-verde",
    id: 4,
    company: "Las Verde",
    initials: "/images/las_verde.png",
    startDate: "2022-12",
    endDate: "2023-03",
    mainSkills: ["React", "Firebase", "Sass"],
    skills: ["React", "Firebase", "Firestore", "React Router", "Sass (SCSS)", "Custom Hooks", "JavaScript", "WhatsApp API", "Vercel", "Git", "GitHub"],
    color: "lasverde",
    url: "https://lasverde.gustavobaranda.com/",
  },
  {
    contentId: "descubriendo-jardin",
    id: 5,
    company: "Descubriendo Jardín Maternal",
    initials: "/images/descubriendo_jardin.svg",
    startDate: "2022-06",
    endDate: "2022-09",
    mainSkills: ["HTML", "CSS", "JavaScript"],
    skills: ["JavaScript", { termId: "semanticHtml" }, "CSS", "Flexbox & Grid", "Bootstrap", { termId: "uxUiDesign" }, "SEO on-page", "Google Maps API", "Vercel", "Git", "GitHub"],
    color: "blue",
    url: "https://descubriendo.gustavobaranda.com",
  },
] as const satisfies readonly ExperienceFact[];

export const EDUCATION_FACTS = [
  { contentId: "data-science-degree", id: "edu-1", institution: "Universidad de la Ciudad de Buenos Aires (Udelaciudad)", startDate: "2026-03", endDate: null, statusCode: "in_progress", color: "unicaba", logo: "/images/inicaba.png" },
  { contentId: "software-development-degree", id: "edu-2", institution: "Instituto de Formación Técnica Superior N°29", startDate: "2023-07", endDate: "2025-12", statusCode: "completed", color: "lasverde", logo: "/images/ifts29.png" },
  { contentId: "teacher-training", id: "edu-3", institution: "Universidad FASTA", startDate: "2024-08", endDate: "2025-12", statusCode: "completed", color: "fasta", logo: "/images/Fasta.jpg" },
  { contentId: "frontend-development", id: "edu-4", institution: "Coderhouse", startDate: "2021-12", endDate: "2022-07", statusCode: "completed", color: "dark", logo: "/images/coderhouse.jpg" },
  { contentId: "python-development", id: "edu-5", institution: "Education IT", startDate: "2022-08", endDate: "2022-12", statusCode: "completed", color: "educacionit", logo: "/images/educacionit.jpg" },
] as const satisfies readonly EducationFact[];

export const PROJECT_FACTS = [
  { id: "syspro-logistica", priority: 1, category: "full-stack", startDate: "2025", endDate: null, sortDate: null, status: "active", image: "/images/syspro.png", imagePresentation: "wide-logo", tags: ["Python", "Django", "SQL Server", "Celery", "Redis", "WebSockets", "Django Channels", { termId: "digitalSignature" }, "pyHanko", "ReportLab", "PyMuPDF", "Web Push", "Huawei Cloud", "Leaflet"], featured: true, githubUrl: null, demoUrl: null },
  { id: "mhine-home", priority: 6, category: "full-stack", startDate: "2025", endDate: "2026", sortDate: "2025-04", status: "dated", image: "/images/mhine-home.png", imagePresentation: "interface", tags: ["Next.js", "React", "Prisma ORM", "PostgreSQL", "Neon", "NextAuth", "Auth.js", "Vercel Blob", "Tailwind CSS", "Framer Motion", "Nodemailer"], featured: true, githubUrl: null, demoUrl: "https://mhine-home.gustavobaranda.com" },
  { id: "gusflow-kanban", priority: 7, category: "full-stack", startDate: "2025", endDate: "2026", sortDate: "2025-11", status: "dated", image: "/images/gusflow.png", imagePresentation: "interface", tags: ["Next.js", "React", "PostgreSQL", "Vercel Blob", "OAuth", "JWT", "Resend API", "PWA", "Tailwind CSS", "Framer Motion", "DOMPurify"], featured: true, githubUrl: null, demoUrl: null },
  { id: "fundacion-medicina", priority: 4, category: "full-stack", startDate: "2025", endDate: "2025", sortDate: "2025-04", status: "dated", image: "/images/fundacion_maldonado_preview.png", imagePresentation: "interface", tags: ["Laravel", "PHP", "MySQL", "Visor DICOM", "DWV & Canvas", "DataTables", "RBAC", "Tailwind CSS", "Alpine.js", "PDF Reports"], featured: false, githubUrl: null, demoUrl: null },
  { id: "weatherflow-api", priority: 5, category: "apis", startDate: "2026", endDate: "2026", sortDate: "2026-02", status: "dated", image: "/images/weatherflow.png", imagePresentation: "interface", tags: ["Python", "Django", "DRF", "SimpleJWT", "OpenAPI 3", "Swagger", "drf-spectacular", "pytest", "Docker", "PostgreSQL", "Render Cloud", "GitHub Actions"], featured: true, githubUrl: "https://github.com/GustavoBaranda/WeatherFlow-API", demoUrl: "https://weatherflow-api.onrender.com/api/schema/swagger-ui/" },
  { id: "solar-banco-etl", priority: 3, category: "apis", startDate: "2024", endDate: "2025", sortDate: "2024-12", status: "dated", image: "/images/solar_banco.png", imagePresentation: "square-logo", tags: ["Python", "Django", "Oracle DW", "ETL", "Pandas", "LCR", "VaR", "Active Directory", "OpenPyXL", "SQL Analytics"], featured: true, githubUrl: null, demoUrl: null },
  { id: "chatflow-agent", priority: 2, category: "opensource", startDate: null, endDate: null, sortDate: null, status: "active", image: null, imagePresentation: "wide-logo", tags: ["Python", "AsyncIO", "Pydantic", "HTTPX", "SQLite", "Multi-agent", "Tool Calling", "Webhooks"], featured: true, githubUrl: "https://github.com/GustavoBaranda/chatflow-agent", demoUrl: null },
  { id: "portfolio-personal", priority: 8, category: "opensource", startDate: "2025", endDate: null, sortDate: "2025-01", status: "active", image: "/images/opengraph.png", imagePresentation: "interface", tags: ["TypeScript", "Next.js", "React", "Tailwind CSS", "CSS Subgrid", "SEO", "JSON-LD", "Framer Motion", "Nodemailer", "Anti-Spam"], featured: false, githubUrl: "https://github.com/GustavoBaranda/Portfolio", demoUrl: "https://gustavobaranda.com" },
  { id: "las-verde-ecommerce", priority: 9, category: "opensource", startDate: "2022", endDate: "2023", sortDate: "2022-06", status: "dated", image: "/images/las_verde_preview.png", imagePresentation: "interface", tags: ["React", "Firebase", "Firestore", "React Router", "Sass", "JavaScript", "Custom Hooks", "REST APIs", "Vercel"], featured: false, githubUrl: "https://github.com/GustavoBaranda/Las-verde", demoUrl: "https://lasverde.gustavobaranda.com/" },
  { id: "maternal-descubriendo", priority: 10, category: "opensource", startDate: "2022", endDate: "2022", sortDate: "2022-01", status: "dated", image: "/images/descubriendo_jardin_preview.png", imagePresentation: "interface", tags: ["JavaScript", "HTML", "CSS", "Flexbox & Grid", "Bootstrap", "UX/UI", "SEO", "Google Maps API", "Vercel"], featured: false, githubUrl: "https://github.com/GustavoBaranda/Descubrimiento-Jardin-Maternal", demoUrl: "https://descubriendo.gustavobaranda.com" },
] as const satisfies readonly ProjectFact[];
