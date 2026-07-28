/* ───────── animation variants ───────── */
export const textReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const paragraphReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: custom * 0.12 },
  }),
};

export const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
};

/* ───────── experience data ───────── */
export const EXPERIENCES = [
  {
    id: 1,
    role: "Full Stack Developer Python",
    company: "SysPro Consulting",
    initials: "/images/syspro.png",
    type: null,
    period: "may. 2025 - actualidad",
    duration: "10 meses",
    location: "Buenos Aires, Argentina",
    description:
      "Desarrollo y mantengo una plataforma integral para logística y gestión de depósitos fiscales, compuesta por dos productos principales: un módulo público de turnos para operadores logísticos (Turnero) y una plataforma empresarial para gestión de recepciones y entregas de contenedores y mercadería de importacion, exportacion y nacionales (depofis.web). En el frontend diseño interfaces responsivas con Tailwind CSS (Turnero) y Bootstrap (Depofis.web). En el backend defino APIs REST y lógica de negocio en Django/Python, optimizo modelos y consultas en SQL Server y aplico caché selectivo en endpoints de alto consumo. Coordino procesos asíncronos con Celery y administro colas de correos con motores configurables por empresa.",
    mainSkills: ["Python", "Django", "SQL Server"],
    skills: [
      "Django Templates",
      "REST API",
      "Celery",
      "IIS",
      "Tailwind CSS",
      "Bootstrap",
      "JavaScript",
      "Git",
      "GitHub",
    ],
    color: "syspro",
    modalidad: "Remoto",
  },
  {
    id: 2,
    role: "Full Stack Developer Laravel",
    company: "Fundación Maldonado",
    initials: "/images/fundacion_maldonado.png",
    type: "Freelance",
    period: "abr. 2025 - may. 2025",
    duration: "2 meses",
    location: "Córdoba, Argentina",
    description:
      "Desarrolle plataforma web para gestión de medicina laboral (Laravel, PHP, MySQL, Blade). Funcionalidades clave: gestión de pacientes, registro y administración de pruebas médicas, subida, almacenamiento y visualización de informes (PDF e imágenes). Integración con Yajra DataTables para listados dinámicos y paginación mediante AJAX. Control de acceso por roles y validaciones del lado servidor.",
    mainSkills: ["Laravel", "PHP", "MySQL"],
    skills: [
      "Blade",
      "Yajra DataTables",
      "JavaScript",
      "Tailwind CSS",
      "Git",
      "GitHub",
    ],
    color: "fundacion",
    modalidad: "Remoto",
  },
  {
    id: 3,
    role: "Full Stack Developer Python",
    company: "Solar Banco",
    initials: "/images/solar_banco.png",
    type: "Freelance",
    period: "dic. 2024 - mar. 2025",
    duration: "4 meses",
    location: "Asuncion, Paraguay",
    description:
      "Diseñé, desarrollé y mantuve una solución backend en Django para la gestión de parámetros regulatorios y el cálculo de brechas de liquidez. Implementación de pipelines ETL en Python (pandas, cx_Oracle) para sincronización y normalización entre Excel, SQLite y Oracle. Integración de autenticación corporativa vía Active Directory (LDAP/SSO) y control de acceso por roles (RBAC).",
    mainSkills: ["Python", "Django", "ETL"],
    skills: [
      "Django Templates",
      "cx_Oracle",
      "Oracle",
      "Pandas",
      "Active Directory",
      "Git",
      "GitHub",
    ],
    color: "solar",
    modalidad: "Remoto",
  },
  {
    id: 4,
    role: "Front-end Developer React",
    company: "Las Verde",
    initials: "/images/las_verde1.png",
    type: "Freelance",
    period: "dic. 2022 - mar. 2023",
    duration: "4 meses",
    location: "Mendoza, Argentina",
    description:
      "Desarrollé aplicación web con ReactJS para el emprendimiento 'Las Verde', dedicado a la comercialización de jugos naturales. El sistema permite visualizar información de la marca, catálogo de productos y medios de contacto. Integra Firebase para la gestión de productos y pedidos. Accedí al proyecto por quedar en el top 10 del curso de ReactJS de Coderhouse.",
    mainSkills: ["React.js", "Firebase", "JavaScript"],
    skills: [
      "React Router",
      "Context API",
      "Sass",
      "Git",
      "GitHub",
    ],
    color: "lasverde",
    url: "https://lasverde.vercel.app/",
    modalidad: "Remoto",
  },
  {
    id: 5,
    role: "Front-end Developer",
    company: "Descubriendo Jardín Maternal",
    initials: "/images/descubriendo_jardin.svg",
    type: "Freelance",
    period: "jun. 2022 - sept. 2022",
    duration: "4 meses",
    location: "Buenos Aires, Argentina",
    description:
      "Desarrollé sitio web institucional para el jardín maternal 'Descubriendo', orientado a brindar información sobre la institución, sus servicios y medios de contacto. Proyecto real otorgado por Coderhouse tras quedar en el top 10 del curso de Desarrollo Web. Diseño responsive con buenas prácticas de UX.",
    mainSkills: ["HTML5", "CSS3", "JavaScript"],
    skills: [
      "UX/UI",
      "Responsive Design",
      "Git",
      "GitHub",
    ],
    color: "blue",
    url: "https://jardinmaternaldescubriendo.vercel.app/",
    modalidad: "Remoto",
  },
];

/* ───────── education data ───────── */
export const EDUCATION = [
  {
    id: "edu-1",
    title: "Licenciatura en Ciencias de Datos",
    institution: "Universidad de la Ciudad de Buenos Aires (UniCABA)",
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
    title: "Formación Pedagógica",
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
export const COLOR_MAP = {
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
    badge: "bg-[#E71C4C]/10 text-[#E71C4C] dark:bg-[#fb7185]/20 dark:text-[#fda4af] dark:border-[#fb7185]/30",
    dot: "bg-[#E71C4C] dark:bg-[#fb7185]",
    border: "border-[#E71C4C]/20 dark:border-[#fb7185]/30 hover:border-[#E71C4C]/40 dark:hover:border-[#fb7185]/60",
    ring: "ring-[#E71C4C]/20 dark:ring-[#fb7185]/30",
    heading: "text-[#E71C4C] dark:text-[#fda4af]",
    logoBg: "bg-[#E71C4C]/10 text-[#E71C4C] dark:bg-[#fb7185]/20 dark:text-[#fda4af]",
    skillText: "text-[#E71C4C] dark:text-[#fda4af]",
    skillBorder: "border-[#E71C4C]/40 dark:border-[#fb7185]/40 hover:border-[#E71C4C]/70",
    skillBg: "bg-[#E71C4C]/10 dark:bg-[#fb7185]/20",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(231,28,76,0.25)]",
    skillRing: "focus-visible:ring-rose-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  lasverde: {
    badge: "bg-[#119446]/10 text-[#119446] dark:bg-[#34d399]/20 dark:text-[#6ee7b7] dark:border-[#34d399]/30",
    dot: "bg-[#119446] dark:bg-[#34d399]",
    border: "border-[#119446]/20 dark:border-[#34d399]/30 hover:border-[#119446]/40 dark:hover:border-[#34d399]/60",
    ring: "ring-[#119446]/20 dark:ring-[#34d399]/30",
    heading: "text-[#119446] dark:text-[#6ee7b7]",
    logoBg: "bg-[#119446]/10 text-[#119446] dark:bg-[#34d399]/20 dark:text-[#6ee7b7]",
    skillText: "text-[#119446] dark:text-[#6ee7b7]",
    skillBorder: "border-[#119446]/40 dark:border-[#34d399]/40 hover:border-[#119446]/70",
    skillBg: "bg-[#119446]/10 dark:bg-[#34d399]/20",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(17,148,70,0.25)]",
    skillRing: "focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  blue: {
    badge: "bg-[#C1E6F9]/20 text-[#0E78C7] dark:bg-[#38bdf8]/20 dark:text-[#7dd3fc] dark:border-[#38bdf8]/30",
    dot: "bg-[#0E78C7] dark:bg-[#38bdf8]",
    border: "border-[#0E78C7]/20 dark:border-[#38bdf8]/30 hover:border-[#0E78C7]/40 dark:hover:border-[#38bdf8]/60",
    ring: "ring-[#0E78C7]/20 dark:ring-[#38bdf8]/30",
    heading: "text-[#0E78C7] dark:text-[#7dd3fc]",
    logoBg: "bg-[#C1E6F9]/20 text-[#0E78C7] dark:bg-[#38bdf8]/20 dark:text-[#7dd3fc]",
    skillText: "text-[#0E78C7] dark:text-[#7dd3fc]",
    skillBorder: "border-[#0E78C7]/40 dark:border-[#38bdf8]/40 hover:border-[#0E78C7]/70",
    skillBg: "bg-[#0E78C7]/10 dark:bg-[#38bdf8]/20",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(14,120,199,0.25)]",
    skillRing: "focus-visible:ring-sky-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  unicaba: {
    badge: "bg-[#B4408F]/10 text-[#B4408F] dark:bg-[#f472b6]/20 dark:text-[#fbcfe8] dark:border-[#f472b6]/30",
    dot: "bg-[#B4408F] dark:bg-[#f472b6]",
    border: "border-[#B4408F]/20 dark:border-[#f472b6]/30 hover:border-[#B4408F]/40 dark:hover:border-[#f472b6]/60",
    ring: "ring-[#B4408F]/20 dark:ring-[#f472b6]/30",
    heading: "text-[#B4408F] dark:text-[#fbcfe8]",
    logoBg: "bg-[#B4408F]/10 text-[#B4408F] dark:bg-[#f472b6]/20 dark:text-[#fbcfe8]",
    skillText: "text-[#B4408F] dark:text-[#fbcfe8]",
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

export const MONTH_MAP = {
  // Nombres completos
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

  // Abreviaturas comunes (con o sin punto)
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

export function parsePeriodEnd(period) {
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

export function calculateDuration(periodStr, defaultDuration) {
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

  let endYear, endMonth;

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
