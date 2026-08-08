export interface ProjectCategory {
  id: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  company: string;
  period: string;
  dateSort: string;
  summary: string;
  description: string;
  image: string;
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
  /* ───────────────── 1. FULL STACK (Más reciente al más antiguo) ───────────────── */
  {
    id: "syspro-logistica",
    title: "Plataforma de Logística & Depósitos Fiscales",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "SysPro Consulting",
    period: "2025 — Presente",
    dateSort: "9999-99",
    summary:
      "Sistema integral para logística de depósitos fiscales con módulo público de turnos (Turnero), monitoreo en tiempo real y gestión empresarial de cargas y contenedores.",
    description:
      "Arquitectura distribuida multimodular compuesta por el portal público de reserva de turnos para operadores logísticos (Turnero) y la plataforma empresarial interna (depofis.web) para recepción, entrega y trazabilidad de contenedores de importación, exportación y nacionales. Backend en Django 4.2 y SQL Server, comunicación en tiempo real con WebSockets (Django Channels), tareas asíncronas con Celery & Redis, generación de reportes/firmas digitales (ReportLab, PyMuPDF, pyHanko) y geolocalización de depósitos con Leaflet.",
    image: "/images/syspro.png",
    tags: ["Python", "Django", "SQL Server", "Celery & Redis", "WebSockets", "Leaflet", "Tailwind", "Bootstrap"],
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
    summary:
      "Plataforma e-commerce de alto rendimiento para fragancias artesanales y decoración del hogar con Next.js 15, React 19, Prisma ORM, PostgreSQL (Neon), NextAuth v5, Vercel Blob y panel admin en tiempo real.",
    description:
      "E-commerce de productos para el hogar construido sobre Next.js 15 App Router y React 19. Cuenta con catálogo interactivo con variantes de fragancias y gramajes, visualizador de imágenes a pantalla completa, carrito deslizable persistente, checkout integrado (WhatsApp/Mercado Pago), autenticación OAuth con Google (NextAuth v5) y panel de administración completo (CRUD de productos/categorías, roles de usuario y reordenamiento en tiempo real de las secciones del landing page). Persistencia en PostgreSQL vía Prisma ORM, subida de imágenes a Vercel Blob y notificaciones por mailing con Nodemailer.",
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
    summary:
      "Plataforma web progresiva (PWA) e interactiva de gestión de tareas estilo Kanban con Next.js 14 App Router, Vercel Postgres, Vercel Blob Storage, autenticación JWT/OAuth y envío de emails con Resend.",
    description:
      "Aplicación web progresiva (PWA) de gestión de proyectos y productividad personal estilo Kanban construida sobre Next.js 14 (App Router) y React 18. Cuenta con soporte de instalación nativa (PWA manifest y Service Worker), tablero dinámico con columnas y prioridades, formato Markdown, subida de archivos adjuntos a Vercel Blob Storage, autenticación social con Google y GitHub OAuth, verificación por email con Resend y almacenamiento relacional en Vercel Postgres.",
    image: "/images/gusflow.png",
    tags: ["PWA", "Next.js 14", "React 18", "Vercel Postgres", "Vercel Blob", "Tailwind CSS", "Resend", "OAuth & JWT", "Kanban"],
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
    summary:
      "Sistema de gestión de pacientes, visor interactivo de imágenes médicas DICOM, administración de estudios clínicos y reportes en PDF.",
    description:
      "Plataforma médica desarrollada en Laravel 12 y MySQL con interfaz dinámica mediante Yajra DataTables y AJAX. Incorpora visor interactivo de estudios (resonancias y tomografías) con controles de zoom y rotación, gestión de pacientes/médicos y control de acceso multinivel por roles (Admin, Colaborador, Paciente).",
    image: "/images/fundacion_maldonado_preview.png",
    tags: ["Laravel 12", "PHP", "MySQL", "Visor DICOM", "Yajra DataTables", "JavaScript", "Tailwind CSS"],
    featured: false,
    githubUrl: null,
    demoUrl: null,
  },

  /* ───────────────── 2. APIS Y MICROSERVICIOS (Más reciente al más antiguo) ───────────────── */
  {
    id: "weatherflow-api",
    title: "WeatherFlow API — Servicio RESTful & OpenAPI 3",
    category: "apis",
    categoryLabel: "APIs y Microservicios",
    company: "Proyecto Open Source",
    period: "2026",
    dateSort: "2026-02",
    summary:
      "Servicio web RESTful modular desarrollado en Python 3.10+ y Django REST Framework para la gestión de usuarios, preferencias de temperatura y agregación meteorológica con Swagger UI & ReDoc.",
    description:
      "API RESTful de alta calidad construida con Django 5.0+ y Django REST Framework (DRF 3.15+). Cuenta con arquitectura limpia con separación de ViewSets y Serializers en paquetes dedicados, documentación interactiva OpenAPI 3 (Swagger UI y ReDoc vía drf-spectacular), comprobación de salud (/api/health/), suite de pruebas unitarias/integración con pytest-django y variables de entorno dinámicas con python-dotenv.",
    image: "/images/weatherflow.png",
    tags: ["Python 3.10+", "Django 5.0", "Django REST Framework", "OpenAPI 3 / Swagger", "pytest-django", "REST API"],
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
    summary:
      "Motor backend en Django y pipelines ETL para el cálculo dinámico de LCR, VaR de liquidez, calce de plazos y parámetros regulatorios bancarios.",
    description:
      "Diseño y desarrollo de solución backend financiera en Django 5.0 para el cálculo de Ratios de Cobertura de Liquidez (LCR), Valor en Riesgo (VaR de liquidez) y calce de plazos por bandas temporales. Implementación de pipelines ETL automáticos en Python (Pandas, cx_Oracle, OpenPyXL) para ingesta y sincronización entre SQLite, Excel y Data Warehouse en Oracle. Autenticación SSO con Active Directory corporativo (LDAP) y logs de auditoría.",
    image: "/images/solar_banco.png",
    tags: ["Python", "Django 5", "Oracle DW", "ETL", "LCR & VaR", "Pandas", "Active Directory"],
    featured: true,
    githubUrl: null,
    demoUrl: null,
  },

  /* ───────────────── 3. FREELANCE & OPEN SOURCE (Más reciente al más antiguo) ───────────────── */
  {
    id: "portfolio-personal",
    title: "Portfolio Web Personal & Design System (TSX)",
    category: "opensource",
    categoryLabel: "Freelance & Open Source",
    company: "Proyecto Personal",
    period: "2025 — Presente",
    dateSort: "2025-01",
    summary:
      "Sitio web personal 100% TypeScript (TSX) desarrollado con Next.js 16 App Router, Tailwind CSS v4, Framer Motion, optimización SEO (Sitemap & JSON-LD) e integración de API de contacto.",
    description:
      "Plataforma web profesional migrada 100% a TypeScript (TSX) sobre React 19 y Next.js 16 App Router. Incorpora arquitectura limpia, sistema de temas dinámico (Dark/Light mode) con escala de colores Slate neutra, microinteracciones avanzadas con Framer Motion, metadatos SEO dinámicos (sitemap.xml, robots.txt, Schema.org Person JSON-LD) e integración de Nodemailer API Route en Next.js.",
    image: "/images/opengraph.png",
    tags: ["TypeScript", "React 19 (TSX)", "Next.js 16", "Tailwind CSS v4", "SEO & JSON-LD", "Framer Motion", "Nodemailer"],
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
    summary:
      "Aplicación e-commerce en React.js para fábrica de jugos naturales con catálogo interactivo y sincronización en tiempo real con Firebase Firestore.",
    description:
      "Proyecto cliente real otorgado por Coderhouse como distinción por quedar seleccionado en el Top 10 del curso de React.js. Incorpora catálogo dinámico de productos e insumos con Firebase Firestore, ruteo SPA con React Router v6, arquitectura de estilos modular en Sass (SCSS) y canal de contacto directo por WhatsApp.",
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
    company: "Descubriendo",
    period: "2022",
    dateSort: "2022-01",
    summary:
      "Plataforma institucional responsiva con catálogo de propuesta educativa, slider interactivo, FAQ y validación de contacto.",
    description:
      "Proyecto cliente real asignado por Coderhouse como premio por quedar en el Top 10 del curso de Desarrollo Web. Desarrollado con HTML5 semántico, CSS3/Bootstrap 5 y JavaScript (ES6+). Incluye slider interactivo de instalaciones, validación cliente de formularios, acordeón de preguntas frecuentes e integración con Google Maps y WhatsApp.",
    image: "/images/descubriendo_jardin_preview.png",
    tags: ["HTML5", "CSS3", "Bootstrap 5", "UX/UI", "JavaScript", "Responsive"],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda/Descubrimiento-Jardin-Maternal",
    demoUrl: "https://jardinmaternaldescubriendo.vercel.app/",
  },
];
