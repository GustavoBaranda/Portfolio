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
  challenge: string;
  solution: string;
  image: string;
  imagePresentation: "interface" | "wide-logo" | "square-logo";
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
    title: "Plataforma de Logística Portuaria & Depósitos Fiscales (DepofisWEB)",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "SysPro Consulting",
    period: "2025 — Presente",
    dateSort: "9999-99",
    challenge:
      "Depósitos fiscales y terminales logísticas portuarias operaban con procesos manuales fragmentados para la coordinación de turnos de transporte, recepción de contenedores e inspecciones aduaneras. Se requería una plataforma distribuida en tiempo real que garantizara la trazabilidad punto a punto de la carga, validez legal y operativa en la documentación emitida y alta disponibilidad operativa.",
    solution:
      "Como Full Stack Developer, diseñé e implementé la arquitectura multimodular enterprise de la plataforma DepofisWEB en Django 4.2 y Microsoft SQL Server. Estructuré el sistema en dos módulos interconectados: Portal Público de Turnos (TURNERO_APP) para transportistas y choferes, y Suite Operativa Interna (DEPO_2025_App) para gestión de recepciones, entregas, inspección física y trazabilidad de contenedores. Integré comunicación en tiempo real con WebSockets (Django Channels), procesamiento asincrónico y cronjobs con Celery & Redis, firma digital criptográfica de PDFs con validez legal (pyHanko, ReportLab, PyMuPDF), notificaciones Web Push (VAPID), almacenamiento de imágenes de inspección en Object Storage (Huawei Cloud OBS) y geolocalización avanzada.",
    image: "/images/syspro.png",
    imagePresentation: "wide-logo",
    tags: [
      "Python 3.11+",
      "Django 4.2",
      "SQL Server",
      "Celery",
      "Redis",
      "WebSockets",
      "Django Channels",
      "Firma Digital",
      "pyHanko",
      "ReportLab",
      "PyMuPDF",
      "Web Push",
      "Huawei Cloud",
      "Leaflet",
    ],
    featured: true,
    githubUrl: null,
    demoUrl: null,
  },
  {
    id: "mhine-home",
    title: "MHINE HOME — Plataforma E-Commerce & CMS de Decoración",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "MHINE HOME",
    period: "2025 — 2026",
    dateSort: "2025-04",
    challenge:
      "La marca de fragancias y decoración artesanal requería un e-commerce de alta conversión y estética premium. Se necesitaba resolver la complejidad de catálogo con variantes dinámicas (fragancias, tamaños, stock), un sistema de checkout híbrido (Mercado Pago / WhatsApp), un panel de administración (CMS) con reordenamiento de secciones de portada en tiempo real y carga optimizada de activos multimedia sin penalizar la velocidad de carga.",
    solution:
      "Construí la plataforma full stack con Next.js 15 App Router, React 19 y Tailwind CSS v4. Diseñé el modelo de datos relacional con Prisma ORM sobre PostgreSQL (Neon Serverless), soportando variantes complejas de producto y categorías. Implementé autenticación híbrida con NextAuth v5 (Auth.js) y Google OAuth, carrito persistente con sincronización local y descuentos, gestor de medios en Vercel Blob Storage, sistema transaccional de correo con Nodemailer y un panel de administración con control de acceso por roles (RBAC) que incluye un maquetador en tiempo real para reordenar dinámicamente las secciones del landing. Animaciones fluidas con Framer Motion y despliegue continuo en Vercel.",
    image: "/images/mhine-home.png",
    imagePresentation: "interface",
    tags: [
      "Next.js 15",
      "React 19",
      "Prisma ORM",
      "PostgreSQL",
      "Neon",
      "NextAuth v5",
      "Auth.js",
      "Vercel Blob",
      "Tailwind CSS v4",
      "Framer Motion",
      "Nodemailer",
    ],
    featured: true,
    githubUrl: null,
    demoUrl: "https://mhine-home.gustavobaranda.com",
  },
  {
    id: "gusflow-kanban",
    title: "GusFlow APP — Plataforma de Gestión Kanban & PWA",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "Proyecto Personal",
    period: "2025 — 2026",
    dateSort: "2025-11",
    challenge:
      "Los equipos de desarrollo y profesionales independientes requerían un gestor de tareas reactivo y personalizable en formato PWA, eliminando la dependencia de herramientas SaaS propietarias y garantizando persistencia relacional segura, soporte para adjuntos pesados, autenticación social y verificación por email.",
    solution:
      "Diseñé e implementé la plataforma web progresiva (PWA) instalable utilizando Next.js 14 App Router y React 18. Desarrollé el tablero Kanban dinámico con reordenamiento de columnas/tareas, prioridades, fechas de vencimiento y gestión de notas. Implementé la capa de datos en Vercel Postgres (PostgreSQL), gestión de adjuntos multimedia en Vercel Blob Storage, sistema de autenticación híbrido (JWT + Google/GitHub OAuth), onboarding y recuperación transaccional con Resend API y micro-interacciones con Framer Motion y Tailwind CSS.",
    image: "/images/gusflow.png",
    imagePresentation: "interface",
    tags: [
      "Next.js 14",
      "React 18",
      "PostgreSQL",
      "Vercel Blob",
      "OAuth",
      "JWT",
      "Resend API",
      "PWA",
      "Tailwind CSS",
      "Framer Motion",
      "DOMPurify",
    ],
    featured: true,
    githubUrl:null,
    demoUrl: null,
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
      "La institución médica requería reemplazar la gestión manual de legajos de pacientes y estudios clínicos por un sistema centralizado con control de acceso basado en roles (RBAC). El desafío clave exigía la integración de un visor web nativo para radiografías e imágenes médicas en formato DICOM con herramientas de diagnóstico (manipulación de contraste, rotación y zoom), garantizando la privacidad de datos de salud y la generación automatizada de informes médicos en PDF.",
    solution:
      "Diseñé e implementé la plataforma clínica integral con Laravel 12, PHP 8.2 y MySQL. Desarrollé el control de acceso multidominio con autenticación por roles (Administrador, Colaborador Médico y Paciente) y middleware de autorización. Integré un visor interactivo de archivos DICOM (DWV / Canvas) con soporte para manipulación en tiempo real (zoom, contraste/brillo, panning y rotación), tablas dinámicas de alto rendimiento con Yajra DataTables (paginación server-side y búsqueda en tiempo real), almacenamiento estructurado de legajos médicos y exportación automatizada de reportes con Tailwind CSS y Alpine.js.",
    image: "/images/fundacion_maldonado_preview.png",
    imagePresentation: "interface",
    tags: [
      "Laravel 12",
      "PHP 8.2",
      "MySQL",
      "Visor DICOM",
      "DWV & Canvas",
      "DataTables",
      "RBAC",
      "Tailwind CSS",
      "Alpine.js",
      "PDF Reports",
    ],
    featured: false,
    githubUrl: null,
    demoUrl: null,
  },

  /* ───────────────── APIs y microservicios ───────────────── */
  {
    id: "weatherflow-api",
    title: "WeatherFlow API — Backend RESTful Enterprise & OpenAPI 3",
    category: "apis",
    categoryLabel: "APIs y Microservicios",
    company: "Proyecto Personal",
    period: "2026",
    dateSort: "2026-02",
    challenge:
      "Aplicaciones móviles y web requerían una solución backend RESTful enterprise, resiliente y de baja latencia para agregación meteorológica global en tiempo real, geocodificación de ciudades, conversión automática de unidades según preferencias del usuario, notificaciones in-app y seguridad stateless tokenizada.",
    solution:
      "Diseñé e implementé la API con Django 5, Python 3.13 y Django REST Framework (DRF) estructurada en arquitectura limpia por capas (Services, Serializers, ViewSets). Integré autenticación stateless JWT (SimpleJWT) con perfil /api/users/me/, geocodificación dinámica con Open-Meteo API y caché en memoria (django.core.cache + DRF Throttling) logrando tiempos de respuesta de ~2ms por cache hit. Desarrollé un módulo nativo de notificaciones in-app con contador de no leídas (/api/notifications/), suite de 39 pruebas automatizadas con pytest-django, especificación OpenAPI 3 con Swagger UI y ReDoc (drf-spectacular), contenedorización multi-etapa en Docker y despliegue en Render Cloud con PostgreSQL y CI/CD en GitHub Actions.",
    image: "/images/weatherflow.png",
    imagePresentation: "interface",
    tags: [
      "Python 3.13",
      "Django 5.0",
      "DRF",
      "SimpleJWT",
      "OpenAPI 3",
      "Swagger",
      "drf-spectacular",
      "pytest",
      "Docker",
      "PostgreSQL",
      "Render Cloud",
      "GitHub Actions",
    ],
    featured: true,
    githubUrl: "https://github.com/GustavoBaranda/WeatherFlow-API",
    demoUrl: "https://weatherflow-api.onrender.com/api/schema/swagger-ui/",
  },
  {
    id: "solar-banco-etl",
    title: "Plataforma de Riesgos Financieros & ETL (LCR / VaR / Calce de Plazos)",
    category: "apis",
    categoryLabel: "APIs y Microservicios",
    company: "Solar Banco",
    period: "2024 — 2025",
    dateSort: "2024-12",
    challenge:
      "El departamento de Gestión de Riesgos requería automatizar la medición de liquidez regulatoria (LCR), el cálculo de Value at Risk (VaR) y la brecha de calce de plazos. La operación dependía del procesamiento de volúmenes masivos de datos heterogéneos provenientes del Data Warehouse corporativo y planillas operativas, exigiendo sincronización sin margen de error, trazabilidad de auditoría estricta y autenticación corporativa.",
    solution:
      "Diseñé e implementé la arquitectura backend en Django 5 con pipelines ETL automatizados en Python (Pandas, cx_Oracle, OpenPyXL) para la extracción, transformación y carga continua desde Oracle DW. Desarrollé el motor de cálculo para la brecha de liquidez por bandas de tiempo y moneda, modelos parametrizables de VaR y reglas de LCR según normativas financieras. Integré autenticación Single Sign-On (SSO) mediante Active Directory (LDAP), middleware de control de inactividad, log automatizado de auditoría de procesos/usuarios y dashboards interactivos con DataTables para visualización y exportación ejecutiva.",
    image: "/images/solar_banco.png",
    imagePresentation: "square-logo",
    tags: [
      "Python 3.10+",
      "Django 5",
      "Oracle DW",
      "ETL",
      "Pandas",
      "LCR",
      "VaR",
      "Active Directory",
      "OpenPyXL",
      "SQL Analytics",
    ],
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
      "Sitio en Next.js 16 App Router, React 19 y Tailwind CSS v4. Formulario de contacto con honeypot, validación por tiempo mínimo y rate limit por IP. SEO con metadataBase, sitemap, robots y JSON-LD. Tema claro/oscuro sin flash de hidratación.",
    image: "/images/opengraph.png",
    imagePresentation: "interface",
    tags: ["TypeScript", "Next.js 16", "React 19", "Tailwind CSS v4", "CSS Subgrid", "SEO", "JSON-LD", "Framer Motion", "Nodemailer", "Anti-Spam"],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda/Portfolio",
    demoUrl: "https://gustavobaranda.com",
  },
  {
    id: "las-verde-ecommerce",
    title: "Plataforma E-Commerce SPA & Catálogo — Las Verde",
    category: "opensource",
    categoryLabel: "Freelance & Open Source",
    company: "Las Verde",
    period: "2022 — 2023",
    dateSort: "2022-06",
    challenge:
      "La empresa comercializadora de jugos 100% naturales necesitaba migrar su presencia digital a una SPA moderna con catálogo de productos en tiempo real, modales detallados de ingredientes/beneficios, canal omnicanal de atención directa y alta velocidad de respuesta en dispositivos móviles.",
    solution:
      "Diseñé e implementé la aplicación Single Page Application (SPA) con React 18, React Router v6 y Firebase Firestore para la persistencia y sincronización en tiempo real del catálogo. Desarrollé arquitectura de estilos modular con Sass (SCSS) y Normalize.css, custom hooks reutilizables (useForm) para validación interactiva de consultas con envío automatizado vía API, modales de vista detallada de producto (ModalDetail), botón flotante de atención directa por WhatsApp e integración de mapas. Implementé ScrollToTop helper para navegación fluida entre rutas y despliegue continuo en Vercel. Reconocido dentro del Top 10 de la camada en Coderhouse.",
    image: "/images/las_verde_preview.png",
    imagePresentation: "interface",
    tags: [
      "React 18",
      "Firebase",
      "Firestore",
      "React Router v6",
      "Sass",
      "JavaScript ES6+",
      "Custom Hooks",
      "REST APIs",
      "Vercel",
    ],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda/Las-verde",
    demoUrl: "https://lasverde.gustavobaranda.com/",
  },
  {
    id: "maternal-descubriendo",
    title: "Plataforma Web Institucional — Descubriendo Jardín",
    category: "opensource",
    categoryLabel: "Freelance & Open Source",
    company: "Descubriendo Jardín Maternal",
    period: "2022",
    dateSort: "2022-01",
    challenge:
      "La institución educativa requería digitalizar su presencia institucional y canal de atención a las familias, resolviendo la baja tasa de conversión de consultas presenciales mediante un sitio accesible, optimizado para tráfico móvil y centrado en la experiencia de usuario (UX/UI).",
    solution:
      "Diseñé e implementé la plataforma web con HTML5 semántico, CSS3 modular (Flexbox y CSS Grid), Bootstrap 5 y JavaScript Vanilla (ES6+). Desarrollé componentes interactivos a medida (slider de imágenes nativo, navegación móvil fluida y sección de FAQ interactiva), formulario con validación client-side en tiempo real, integración con Google Maps API y canal de atención directa por WhatsApp. Optimicé la accesibilidad, el SEO técnico on-page (metaetiquetas dinámicas y verificación de dominio) y el despliegue continuo en Vercel. Distinguido dentro del Top 10 de la camada en Coderhouse.",
    image: "/images/descubriendo_jardin_preview.png",
    imagePresentation: "interface",
    tags: [
      "JavaScript ES6+",
      "HTML5",
      "CSS3",
      "Flexbox & Grid",
      "Bootstrap 5",
      "UX/UI",
      "SEO",
      "Google Maps API",
      "Vercel",
    ],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda/Descubrimiento-Jardin-Maternal",
    demoUrl: "https://descubriendo.gustavobaranda.com",
  },
];
