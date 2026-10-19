import { Variants } from "framer-motion";

/* ───────── animation variants ───────── */
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const paragraphReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: custom * 0.12 },
  }),
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
};

/* ───────── interfaces ───────── */
export interface Experience {
  id: number;
  role: string;
  company: string;
  initials: string;
  type: string | null;
  period: string;
  duration: string;
  location: string;
  description: string | string[];
  mainSkills: string[];
  skills: string[];
  color: string;
  modalidad: string;
  url?: string;
}

export interface Education {
  id: string;
  title: string;
  institution: string;
  period: string;
  location: string;
  color: string;
  logo: string;
  status: string;
}

/* ───────── experience data ───────── */
export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Full Stack Python Developer",
    company: "SysPro Consulting",
    initials: "/images/syspro.png",
    type: null,
    period: "may. 2025 - actualidad",
    duration: "10 meses",
    location: "Buenos Aires, Argentina",
    description: [
      "Desarrollo y mantengo DepofisWEB, una plataforma empresarial para la gestión integral de operaciones logísticas y depósitos fiscales, utilizando principalmente Python, Django y SQL Server.",
      "Trabajo en el desarrollo y evolución de módulos relacionados con coordinación de cargas, gestión de tallys, recepción y entrega de mercaderías, control de inventario, trazabilidad, documentación operativa y administración de turnos, incluyendo el portal público TURNERO_APP.",
      "También participo en el desarrollo de Bamby, un asistente virtual contextual integrado en la plataforma, con resolución de intenciones, ayuda según el módulo y capacidades de integración con inteligencia artificial.",
      "Implemento funcionalidades e integraciones que incluyen procesamiento asíncrono, comunicación en tiempo real mediante WebSockets, notificaciones, generación y firma digital de documentos, almacenamiento en la nube y servicios externos, trabajando sobre la arquitectura, las reglas de negocio y la evolución del sistema.",
    ],
    mainSkills: ["Python", "Django", "SQL Server"],
    skills: [
      "Django",
      "SQL Server",
      "Celery",
      "Redis",
      "WebSockets",
      "Django Channels",
      "Firma digital",
      "pyHanko",
      "ReportLab",
      "PyMuPDF",
      "Web Push",
      "Huawei Cloud",
      "Leaflet",
      "Git",
      "GitHub",
    ],
    color: "syspro",
    modalidad: "Remoto",
  },
  {
    id: 2,
    role: "Full Stack Laravel Developer",
    company: "Fundación Maldonado",
    initials: "/images/fundacion_maldonado.png",
    type: "Freelance",
    period: "abr. 2025 - may. 2025",
    duration: "2 meses",
    location: "Córdoba, Argentina",
    description:
      "Desarrollé una plataforma de gestión de medicina laboral con Laravel, PHP y MySQL. Implementé autenticación y permisos por rol para administradores, colaboradores médicos y pacientes, junto con la gestión estructurada de legajos. Integré la visualización web de archivos DICOM mediante DWV y Canvas, tablas operativas con Yajra DataTables e informes clínicos en PDF.",
    mainSkills: ["Laravel", "PHP", "MySQL"],
    skills: [
      "Laravel",
      "PHP",
      "MySQL",
      "Visor DICOM",
      "DWV & Canvas",
      "DataTables",
      "RBAC",
      "Tailwind CSS",
      "Alpine.js",
      "Informes PDF",
      "Git",
      "GitHub",
    ],
    color: "fundacion",
    modalidad: "Remoto",
  },
  {
    id: 3,
    role: "Backend Python Developer",
    company: "Solar Banco",
    initials: "/images/solar_banco.png",
    type: "Freelance",
    period: "dic. 2024 - mar. 2025",
    duration: "4 meses",
    location: "Asuncion, Paraguay",
    description:
      "Desarrollé el backend con Python y Django, integrando Oracle Data Warehouse mediante procesos ETL con Pandas, cx_Oracle y OpenPyXL. Implementé cálculos para la medición de liquidez regulatoria, LCR, Value at Risk (VaR de liquidez) y brecha de calce de plazos por bandas temporales. También integré autenticación Single Sign-On (SSO) con Active Directory y LDAP, auditoría de procesos y dashboards operativos con DataTables.",
    mainSkills: ["Python", "Django", "ETL"],
    skills: [
      "Django",
      "Python",
      "Oracle DW",
      "ETL Pipelines",
      "Pandas",
      "LCR y VaR",
      "Active Directory",
      "cx_Oracle",
      "OpenPyXL",
      "Auditoría de procesos",
      "DataTables",
      "Git",
      "GitHub",
    ],
    color: "solar",
    modalidad: "Remoto",
  },
  {
    id: 4,
    role: "Frontend React Developer",
    company: "Las Verde",
    initials: "/images/las_verde.png",
    type: "Freelance",
    period: "dic. 2022 - mar. 2023",
    duration: "4 meses",
    location: "Mendoza, Argentina",
    description:
      "Desarrollé una aplicación Single Page Application (SPA) para el catálogo de productos de Las Verde con React. Implementé la sincronización de datos con Firebase y Firestore, la navegación con React Router, estilos modulares con Sass, componentes y hooks reutilizables, vistas detalladas de productos e integración con WhatsApp. El proyecto fue asignado por Coderhouse tras ubicarme entre los diez mejores promedios de la cursada.",
    mainSkills: ["React", "Firebase", "Sass"],
    skills: [
      "React",
      "Firebase",
      "Firestore",
      "React Router",
      "Sass (SCSS)",
      "Custom Hooks",
      "JavaScript",
      "WhatsApp API",
      "Vercel",
      "Git",
      "GitHub",
    ],
    color: "lasverde",
    url: "https://lasverde.gustavobaranda.com/",
    modalidad: "Remoto",
  },
  {
    id: 5,
    role: "Frontend Developer",
    company: "Descubriendo Jardín Maternal",
    initials: "/images/descubriendo_jardin.svg",
    type: "Freelance",
    period: "jun. 2022 - sept. 2022",
    duration: "4 meses",
    location: "Buenos Aires, Argentina",
    description:
      "Desarrollé el sitio institucional responsive de Descubriendo Jardín Maternal con HTML semántico, CSS, Bootstrap y JavaScript. Implementé un slider de imágenes, navegación móvil, una sección de preguntas frecuentes, validación de formularios e integración con Google Maps, además de optimizaciones de SEO on-page. El proyecto fue asignado por Coderhouse como reconocimiento por ubicarme entre los diez mejores promedios del curso de Desarrollo Web.",
    mainSkills: ["HTML", "CSS", "JavaScript"],
    skills: [
      "JavaScript",
      "HTML semántico",
      "CSS",
      "Flexbox & Grid",
      "Bootstrap",
      "Diseño UX/UI",
      "SEO on-page",
      "Google Maps API",
      "Vercel",
      "Git",
      "GitHub",
    ],
    color: "blue",
    url: "https://descubriendo.gustavobaranda.com",
    modalidad: "Remoto",
  },
];

/* ───────── education data ───────── */
export const EDUCATION: Education[] = [
  {
    id: "edu-1",
    title: "Licenciatura en Ciencia de Datos",
    institution: "Universidad de la Ciudad de Buenos Aires (Udelaciudad)",
    period: "Marzo 2026 — Actualidad",
    location: "Ciudad Autónoma de Buenos Aires",
    color: "unicaba",
    logo: "/images/inicaba.png",
    status: "En curso",
  },
  {
    id: "edu-2",
    title: "Técnico Superior en Desarrollo de Software",
    institution: "Instituto de Formación Técnica Superior N°29",
    period: "Julio 2023 — Diciembre 2025",
    location: "Ciudad Autónoma de Buenos Aires",
    color: "lasverde",
    logo: "/images/ifts29.png",
    status: "Finalizado",
  },
  {
    id: "edu-3",
    title: "Tramo de Formación Pedagógica",
    institution: "Universidad FASTA",
    period: "Agosto 2024 — Diciembre 2025",
    location: "Mar del Plata",
    color: "fasta",
    logo: "/images/Fasta.jpg",
    status: "Finalizado",
  },
  {
    id: "edu-4",
    title: "Frontend Developer",
    institution: "Coderhouse",
    period: "Diciembre 2021 — Julio 2022",
    location: "Ciudad Autónoma de Buenos Aires",
    color: "dark",
    logo: "/images/coderhouse.jpg",
    status: "Finalizado",
  },
  {
    id: "edu-5",
    title: "Python Developer",
    institution: "Education IT",
    period: "Agosto 2022 — Diciembre 2022",
    location: "Ciudad Autónoma de Buenos Aires",
    color: "educacionit",
    logo: "/images/educacionit.jpg",
    status: "Finalizado",
  },
];

/* ───────── color maps ───────── */
export interface ColorScheme {
  badge: string;
  dot: string;
  border: string;
  ring: string;
  heading: string;
  logoBg: string;
  skillText: string;
  skillBorder: string;
  skillBg: string;
  skillShadow: string;
  skillRing: string;
}

export const COLOR_MAP: Record<string, ColorScheme> = {
  syspro: {
    badge: "bg-[#6022A4]/10 text-[#6022A4] dark:bg-[#a855f7]/20 dark:text-[#c084fc] dark:border-[#a855f7]/30",
    dot: "bg-[#6022A4] dark:bg-[#a855f7]",
    border: "border-[#6022A4]/20 dark:border-[#a855f7]/30 hover:border-[#6022A4]/40 dark:hover:border-[#a855f7]/60",
    ring: "ring-[#6022A4]/20 dark:ring-[#a855f7]/30",
    heading: "text-[#6022A4] dark:text-[#c084fc]",
    logoBg: "bg-[#6022A4]/10 text-[#6022A4] dark:bg-[#a855f7]/20 dark:text-[#c084fc]",
    skillText: "text-[#6022A4] dark:text-[#c084fc]",
    skillBorder: "border-[#6022A4]/40 dark:border-[#a855f7]/40 hover:border-[#6022A4]/70",
    skillBg: "bg-[#6022A4]/10 dark:bg-[#a855f7]/20",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(96,34,164,0.25)]",
    skillRing: "focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  fundacion: {
    badge: "bg-[#8C215C]/10 text-[#8C215C] dark:bg-[#f43f5e]/20 dark:text-[#fb7185] dark:border-[#f43f5e]/30",
    dot: "bg-[#8C215C] dark:bg-[#f43f5e]",
    border: "border-[#8C215C]/20 dark:border-[#f43f5e]/30 hover:border-[#8C215C]/40 dark:hover:border-[#f43f5e]/60",
    ring: "ring-[#8C215C]/20 dark:ring-[#f43f5e]/30",
    heading: "text-[#8C215C] dark:text-[#fb7185]",
    logoBg: "bg-[#8C215C]/10 text-[#8C215C] dark:bg-[#f43f5e]/20 dark:text-[#fb7185]",
    skillText: "text-[#8C215C] dark:text-[#fb7185]",
    skillBorder: "border-[#8C215C]/40 dark:border-[#f43f5e]/40 hover:border-[#8C215C]/70",
    skillBg: "bg-[#8C215C]/10 dark:bg-[#f43f5e]/20",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(140,33,92,0.25)]",
    skillRing: "focus-visible:ring-rose-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  solar: {
    badge: "bg-[#E71C4C]/10 text-[#bf1741] dark:bg-[#fb7185]/20 dark:text-[#fda4af] dark:border-[#fb7185]/30",
    dot: "bg-[#E71C4C] dark:bg-[#fb7185]",
    border: "border-[#E71C4C]/20 dark:border-[#fb7185]/30 hover:border-[#E71C4C]/40 dark:hover:border-[#fb7185]/60",
    ring: "ring-[#E71C4C]/20 dark:ring-[#fb7185]/30",
    heading: "text-[#bf1741] dark:text-[#fda4af]",
    logoBg: "bg-[#E71C4C]/10 text-[#bf1741] dark:bg-[#fb7185]/20 dark:text-[#fda4af]",
    skillText: "text-[#bf1741] dark:text-[#fda4af]",
    skillBorder: "border-[#E71C4C]/40 dark:border-[#fb7185]/40 hover:border-[#E71C4C]/70",
    skillBg: "bg-[#E71C4C]/10 dark:bg-[#fb7185]/20",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(231,28,76,0.25)]",
    skillRing: "focus-visible:ring-rose-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  lasverde: {
    badge: "bg-[#119446]/10 text-[#087a38] dark:bg-[#34d399]/20 dark:text-[#6ee7b7] dark:border-[#34d399]/30",
    dot: "bg-[#119446] dark:bg-[#34d399]",
    border: "border-[#119446]/20 dark:border-[#34d399]/30 hover:border-[#119446]/40 dark:hover:border-[#34d399]/60",
    ring: "ring-[#119446]/20 dark:ring-[#34d399]/30",
    heading: "text-[#087a38] dark:text-[#6ee7b7]",
    logoBg: "bg-[#119446]/10 text-[#087a38] dark:bg-[#34d399]/20 dark:text-[#6ee7b7]",
    skillText: "text-[#087a38] dark:text-[#6ee7b7]",
    skillBorder: "border-[#119446]/40 dark:border-[#34d399]/40 hover:border-[#119446]/70",
    skillBg: "bg-[#119446]/10 dark:bg-[#34d399]/20",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(17,148,70,0.25)]",
    skillRing: "focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  blue: {
    badge: "bg-[#C1E6F9]/20 text-[#0969a9] dark:bg-[#38bdf8]/20 dark:text-[#7dd3fc] dark:border-[#38bdf8]/30",
    dot: "bg-[#0E78C7] dark:bg-[#38bdf8]",
    border: "border-[#0E78C7]/20 dark:border-[#38bdf8]/30 hover:border-[#0E78C7]/40 dark:hover:border-[#38bdf8]/60",
    ring: "ring-[#0E78C7]/20 dark:ring-[#38bdf8]/30",
    heading: "text-[#0969a9] dark:text-[#7dd3fc]",
    logoBg: "bg-[#C1E6F9]/20 text-[#0969a9] dark:bg-[#38bdf8]/20 dark:text-[#7dd3fc]",
    skillText: "text-[#0969a9] dark:text-[#7dd3fc]",
    skillBorder: "border-[#0E78C7]/40 dark:border-[#38bdf8]/40 hover:border-[#0E78C7]/70",
    skillBg: "bg-[#0E78C7]/10 dark:bg-[#38bdf8]/20",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(14,120,199,0.25)]",
    skillRing: "focus-visible:ring-sky-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  unicaba: {
    badge: "bg-[#B4408F]/10 text-[#9c307b] dark:bg-[#f472b6]/20 dark:text-[#fbcfe8] dark:border-[#f472b6]/30",
    dot: "bg-[#B4408F] dark:bg-[#f472b6]",
    border: "border-[#B4408F]/20 dark:border-[#f472b6]/30 hover:border-[#B4408F]/40 dark:hover:border-[#f472b6]/60",
    ring: "ring-[#B4408F]/20 dark:ring-[#f472b6]/30",
    heading: "text-[#9c307b] dark:text-[#fbcfe8]",
    logoBg: "bg-[#B4408F]/10 text-[#9c307b] dark:bg-[#f472b6]/20 dark:text-[#fbcfe8]",
    skillText: "text-[#9c307b] dark:text-[#fbcfe8]",
    skillBorder: "border-[#B4408F]/40 dark:border-[#f472b6]/40 hover:border-[#B4408F]/70",
    skillBg: "bg-[#B4408F]/10 dark:bg-[#f472b6]/20",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(180,64,143,0.25)]",
    skillRing: "focus-visible:ring-[#B4408F]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  fasta: {
    badge: "bg-[#011165]/10 text-[#011165] dark:bg-[#818cf8]/20 dark:text-[#c7d2fe] dark:border-[#818cf8]/30",
    dot: "bg-[#011165] dark:bg-[#818cf8]",
    border: "border-[#011165]/20 dark:border-[#818cf8]/30 hover:border-[#011165]/40 dark:hover:border-[#818cf8]/60",
    ring: "ring-[#011165]/20 dark:ring-[#818cf8]/30",
    heading: "text-[#011165] dark:text-[#c7d2fe]",
    logoBg: "bg-[#011165]/10 text-[#011165] dark:bg-[#818cf8]/20 dark:text-[#c7d2fe]",
    skillText: "text-[#011165] dark:text-[#c7d2fe]",
    skillBorder: "border-[#011165]/40 dark:border-[#818cf8]/40 hover:border-[#011165]/70",
    skillBg: "bg-[#011165]/10 dark:bg-[#818cf8]/20",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(1,17,101,0.25)]",
    skillRing: "focus-visible:ring-[#011165]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  educacionit: {
    badge: "bg-[#0B30F1]/10 text-[#0B30F1] dark:bg-[#60a5fa]/20 dark:text-[#bfdbfe] dark:border-[#60a5fa]/30",
    dot: "bg-[#0B30F1] dark:bg-[#60a5fa]",
    border: "border-[#0B30F1]/20 dark:border-[#60a5fa]/30 hover:border-[#0B30F1]/40 dark:hover:border-[#60a5fa]/60",
    ring: "ring-[#0B30F1]/20 dark:ring-[#60a5fa]/30",
    heading: "text-[#0B30F1] dark:text-[#bfdbfe]",
    logoBg: "bg-[#0B30F1]/10 text-[#0B30F1] dark:bg-[#60a5fa]/20 dark:text-[#bfdbfe]",
    skillText: "text-[#0B30F1] dark:text-[#bfdbfe]",
    skillBorder: "border-[#0B30F1]/40 dark:border-[#60a5fa]/40 hover:border-[#0B30F1]/70",
    skillBg: "bg-[#0B30F1]/10 dark:bg-[#60a5fa]/20",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(11,48,241,0.25)]",
    skillRing: "focus-visible:ring-[#0B30F1]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  dark: {
    badge: "bg-dark/10 text-dark dark:bg-white/10 dark:text-white dark:border-white/20",
    dot: "bg-black dark:bg-white",
    border: "border-black/20 dark:border-white/20 hover:border-black/40 dark:hover:border-white/40",
    ring: "ring-black/20 dark:ring-white/20",
    heading: "text-dark dark:text-white",
    logoBg: "bg-black/10 text-dark dark:bg-white/10 dark:text-white",
    skillText: "text-dark dark:text-white",
    skillBorder: "border-black/40 dark:border-white/40 hover:border-black/70 dark:hover:border-white/70",
    skillBg: "bg-black/10 dark:bg-white/10",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(15,23,42,0.6)]",
    skillRing: "focus-visible:ring-black/60 dark:focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
};

export const MONTH_MAP: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,

  ene: 0,
  feb: 1,
  mar: 2,
  abr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  sep: 8,
  sept: 8,
  oct: 9,
  nov: 10,
  dic: 11,
};

export function parsePeriodEnd(period?: string): Date {
  if (!period) return new Date(0);
  const parts = period.split(/–|—|-/).map((p) => p.trim());
  const end = parts[parts.length - 1].toLowerCase();
  if (end.includes("actual") || end.includes("actualidad")) return new Date(9999, 0, 1);
  const m = end.match(/([a-záéíóúñ]+)\.?\s+(\d{4})/i);
  if (!m) return new Date(0);
  const monthName = m[1].toLowerCase().replace(/\./g, "");
  const year = parseInt(m[2], 10);
  const month = MONTH_MAP[monthName] ?? 0;
  return new Date(year, month, 1);
}

export function calculateDuration(periodStr?: string, defaultDuration: string = ""): string {
  if (!periodStr) return defaultDuration;

  const parts = periodStr.split(/–|—|-/).map((p) => p.trim());
  if (parts.length < 2) return defaultDuration;

  const startStr = parts[0].toLowerCase();
  const endStr = parts[1].toLowerCase();

  const isCurrent = endStr.includes("actual") || endStr.includes("actualidad") || endStr.includes("presente");

  const startMatch = startStr.match(/([a-záéíóúñ]+)\.?\s+(\d{4})/i);
  if (!startMatch) return defaultDuration;

  const startMonthName = startMatch[1].toLowerCase().replace(/\./g, "");
  const startMonth = MONTH_MAP[startMonthName] ?? 0;
  const startYear = parseInt(startMatch[2], 10);

  let endYear: number, endMonth: number;

  if (isCurrent) {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth();
  } else {
    const endMatch = endStr.match(/([a-záéíóúñ]+)\.?\s+(\d{4})/i);
    if (!endMatch) return defaultDuration;
    const endMonthName = endMatch[1].toLowerCase().replace(/\./g, "");
    endMonth = MONTH_MAP[endMonthName] ?? 0;
    endYear = parseInt(endMatch[2], 10);
  }

  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  if (totalMonths <= 0) return defaultDuration;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let label = "";
  if (years > 0) {
    label += `${years} ${years === 1 ? "año" : "años"}`;
  }
  if (months > 0) {
    if (years > 0) label += " ";
    label += `${months} ${months === 1 ? "mes" : "meses"}`;
  }

  return label || defaultDuration;
}
