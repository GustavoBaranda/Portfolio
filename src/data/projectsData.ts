export interface ProjectCategory {
  id: string;
  label: string;
}

/**
 * Case-study shape mapped by the projects grid.
 * challenge → Problema / Desafío
 * solution  → Solución / Rol
 * tags      → Stack técnico
 * demoUrl / githubUrl → Enlaces
 */
export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  company: string;
  period: string;
  /** ISO-ish sort key YYYY-MM (higher = more recent). Use "9999-99" for ongoing top roles. */
  dateSort: string;
  /** Problema / desafío del caso */
  challenge: string;
  /** Solución implementada y rol desempeñado */
  solution: string;
  image: string;
  /** Stack técnico */
  tags: string[];
  featured: boolean;
  githubUrl: string | null;
  demoUrl: string | null;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { id: "all", label: "Todos los Proyectos" },
  { id: "full-stack", label: "Full Stack" },
  { id: "apis", label: "APIs y Microservicios" },
  { id: "opensource", label: "Freelance & Open Source" },
];

export const PROJECTS: ProjectItem[] = [
  /* ───────────────── Full Stack ───────────────── */
  {
    id: "syspro-logistica",
    title: "Plataforma de Logística & Depósitos Fiscales",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "SysPro Consulting",
    period: "2025 — Presente",
    dateSort: "9999-99",
    challenge:
      "Operadores y depósitos fiscales necesitaban coordinar turnos, cargas y contenedores sin procesos manuales fragmentados, con trazabilidad en tiempo real y reportes con validez operativa.",
    solution:
      "Como Full Stack Developer diseñé e implementé una arquitectura multimodular en Django 4.2 y SQL Server: portal público de turnos (Turnero) y plataforma interna (depofis.web) para recepción, entrega y trazabilidad de contenedores. Integré WebSockets (Channels), Celery & Redis, firmas/PDFs (ReportLab, PyMuPDF, pyHanko) y mapas con Leaflet.",
    image: "/images/syspro.png",
    tags: ["Python", "Django", "SQL Server", "Celery & Redis", "WebSockets", "Leaflet", "Tailwind CSS", "Bootstrap"],
    featured: true,
    githubUrl: null,
    demoUrl: null,
  },
  {
    id: "mhine-home",
    title: "MHINE HOME — E-Commerce de Fragancias & Decoración",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "MHINE HOME",
    period: "2025 - 2026",
    dateSort: "2025-04",
    challenge:
      "La marca necesitaba un e-commerce performante para fragancias y decoración: catálogo con variantes, checkout confiable, admin en tiempo real e identidad visual de alto impacto.",
    solution:
      "Construí la plataforma con Next.js 15 App Router y React 19: variantes de producto, carrito persistente, checkout WhatsApp/Mercado Pago, OAuth con NextAuth v5, CRUD admin con roles y reordenamiento del landing. Persistencia en PostgreSQL (Prisma/Neon), assets en Vercel Blob y mailings con Nodemailer.",
    image: "/images/mhine-home.png",
    tags: ["Next.js 15", "React 19", "Prisma ORM", "PostgreSQL", "NextAuth v5", "Vercel Blob", "Tailwind CSS", "Framer Motion"],
    featured: true,
    githubUrl: null,
    demoUrl: "https://mhine-home.vercel.app",
  },
  {
    id: "gusflow-kanban",
    title: "GusFlow — Gestor de Tareas Kanban (PWA)",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "Proyecto Personal",
    period: "2025 — 2026",
    dateSort: "2025-11",
    challenge:
      "Faltaba un tablero Kanban instalable como PWA, con adjuntos, auth social y flujo de onboarding por email sin depender de tools SaaS cerradas.",
    solution:
      "Desarrollé la PWA con Next.js 14 App Router y React 18: columnas/prioridades, Markdown, Blob Storage, OAuth Google/GitHub, verificación con Resend y Vercel Postgres. Incluye manifest, service worker e instalación nativa.",
    image: "/images/gusflow.png",
    tags: ["PWA", "Next.js 14", "React 18", "Resend", "Vercel Postgres", "Vercel Blob", "Tailwind CSS", "OAuth & JWT", "Kanban"],
    featured: true,
    githubUrl: null,
    demoUrl: "https://gusflow.vercel.app/",
  },
  {
    id: "fundacion-medicina",
    title: "Plataforma de Medicina Laboral & Visor DICOM",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "Fundación Maldonado",
    period: "2025",
    dateSort: "2025-04",
    challenge:
      "La institución necesitaba digitalizar pacientes y estudios clínicos, con roles de acceso y un visor usable para imágenes médicas DICOM y reportes en PDF.",
    solution:
      "Implementé la plataforma en Laravel 12 y MySQL con DataTables/AJAX, visor DICOM (zoom/rotación), gestión médico-paciente y control de roles (Admin, Colaborador, Paciente) más generación de reportes.",
    image: "/images/fundacion_maldonado_preview.png",
    tags: ["Laravel 12", "PHP", "MySQL", "Visor DICOM", "Yajra DataTables", "JavaScript", "Tailwind CSS"],
    featured: false,
    githubUrl: null,
    demoUrl: null,
  },

  /* ───────────────── APIs y microservicios ───────────────── */
  {
    id: "weatherflow-api",
    title: "WeatherFlow API — Servicio RESTful & OpenAPI 3",
    category: "apis",
    categoryLabel: "APIs y Microservicios",
    company: "Proyecto Personal",
    period: "2026",
    dateSort: "2026-02",
    challenge:
      "Se requería una API REST documentada y testeable para preferencias climáticas y agregación meteorológica, con convenciones product-ready.",
    solution:
      "Diseñé el servicio con Django 5 y DRF: ViewSets/Serializers modularizados, OpenAPI 3 (Swagger UI y ReDoc), /api/health/, suite pytest-django y configuración por entorno con dotenv.",
    image: "/images/weatherflow.png",
    tags: ["Python 3.10+", "Django 5.0", "REST API", "OpenAPI 3 / Swagger", "pytest-django", "Django REST Framework"],
    featured: true,
    githubUrl: "https://github.com/GustavoBaranda/WeatherFlow-API",
    demoUrl: null,
  },
  {
    id: "solar-banco-etl",
    title: "Plataforma de Riesgos & Liquidez (LCR / VaR)",
    category: "apis",
    categoryLabel: "APIs y Microservicios",
    company: "Solar Banco",
    period: "2024 — 2025",
    dateSort: "2024-12",
    challenge:
      "El área de riesgos debía calcular LCR, VaR de liquidez y calce de plazos con datos heterogéneos (Excel, Oracle) y control de acceso corporativo.",
    solution:
      "Desarrollé el backend en Django 5 y pipelines ETL en Python (Pandas, cx_Oracle, OpenPyXL) hacia Oracle DW, con SSO Active Directory (LDAP), auditorías y parámetros regulatorios dinámicos.",
    image: "/images/solar_banco.png",
    tags: ["Python", "Django 5", "Oracle DW", "ETL", "LCR & VaR", "Pandas", "Active Directory"],
    featured: true,
    githubUrl: null,
    demoUrl: null,
  },

  /* ───────────────── Freelance & open source ───────────────── */
  {
    id: "portfolio-personal",
    title: "Portfolio Web Personal & Design System",
    category: "opensource",
    categoryLabel: "Freelance & Open Source",
    company: "Proyecto Personal",
    period: "2025 — Presente",
    dateSort: "2025-01",
    challenge:
      "Necesitaba un portfolio TypeScript-first con SEO técnico real, performance, un canal de contacto confiable con protección anti-spam sin CAPTCHA y un design system propio escalable.",
    solution:
      "Construí el sitio con Next.js 16 App Router, React 19, Tailwind CSS v4 y Framer Motion. Implementé protección anti-spam multicapa: honeypot field, time-based validation y rate limiting por IP en API Route serverless. Layout de proyectos con CSS subgrid para alineación sin JS. SEO técnico completo: metadataBase dinámico, sitemap/robots generados en build time y JSON-LD Schema.org. Sistema de temas sin hydration flash via script beforeInteractive y tokens CSS semánticos.",
    image: "/images/opengraph.png",
    tags: ["TypeScript", "Next.js 16", "React 19", "Tailwind CSS v4", "CSS Subgrid", "SEO & JSON-LD", "Framer Motion", "Nodemailer", "Anti-Spam"],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda/Portfolio",
    demoUrl: "https://gustavobaranda.com",
  },
  {
    id: "las-verde-ecommerce",
    title: "E-Commerce & Catálogo Interactivo",
    category: "opensource",
    categoryLabel: "Freelance & Open Source",
    company: "Las Verde",
    period: "2022 — 2023",
    dateSort: "2022-06",
    challenge:
      "La fábrica de jugos necesitaba un catálogo digital actualizable en tiempo real y un canal simple de contacto comercial.",
    solution:
      "Desarrollé un e-commerce SPA en React con Firebase Firestore, React Router v6, Sass modular y contacto por WhatsApp. Proyecto real Coderhouse (Top 10 del curso).",
    image: "/images/las_verde_preview.png",
    tags: ["React.js", "Firebase", "React Router", "Sass", "JavaScript"],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda/Las-verde",
    demoUrl: "https://lasverde.vercel.app/",
  },
  {
    id: "maternal-descubriendo",
    title: "Sitio Web Institucional Jardín Maternal",
    category: "opensource",
    categoryLabel: "Freelance & Open Source",
    company: "Descubriendo Jardin Maternal",
    period: "2022",
    dateSort: "2022-01",
    challenge:
      "La institución requería una web clara y responsive para comunicar propuesta educativa, instalaciones y contacto con las familias.",
    solution:
      "Implementé el sitio con HTML5, CSS3/Bootstrap 5 y JS ES6+: sliders, FAQ, validación de formularios, Maps y WhatsApp. Proyecto real Coderhouse (Top 10 del curso).",
    image: "/images/descubriendo_jardin_preview.png",
    tags: ["HTML5", "CSS3", "Bootstrap 5", "UX/UI", "JavaScript", "Responsive"],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda/Descubrimiento-Jardin-Maternal",
    demoUrl: "https://jardinmaternaldescubriendo.vercel.app/",
  },
];
