export interface ProjectCategory {
  id: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  priority: number;
  title: string;
  category: string;
  categoryLabel: string;
  company: string;
  period: string;
  dateSort: string;
  challenge: string;
  solution: string;
  image: string | null;
  mediaLabel?: string;
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
    priority: 1,
    title: "Plataforma de Logística Portuaria & Depósitos Fiscales (DepofisWEB)",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "SysPro Consulting",
    period: "2025 — Presente",
    dateSort: "9999-99",
    challenge:
      "Coordinar operaciones de depósitos fiscales requiere conectar turnos, documentación y movimientos de mercadería que atraviesan distintos módulos y actores, manteniendo la trazabilidad entre el portal público y la operación interna.",
    solution:
      "Como Full Stack Python Developer, participo en el diseño, la implementación y la integración de funcionalidades de DepofisWEB, una plataforma modular desarrollada con Django y SQL Server. Trabajo sobre la conexión del turnero público con los módulos internos de turnos, documentación, recepciones, entregas e inspecciones, e implemento procesamiento asíncrono y comunicación en tiempo real cuando el flujo operativo lo requiere.",
    image: "/images/syspro.png",
    imagePresentation: "wide-logo",
    tags: [
      "Python",
      "Django",
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
    priority: 6,
    title: "MHINE HOME — Plataforma E-Commerce & CMS de Decoración",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "MHINE HOME",
    period: "2025 — 2026",
    dateSort: "2025-04",
    challenge:
      "La marca de fragancias y decoración artesanal requería un e-commerce de alta conversión y estética premium. Se necesitaba resolver la complejidad de catálogo con variantes dinámicas (fragancias, tamaños, stock), un sistema de checkout híbrido (Mercado Pago / WhatsApp), un panel de administración (CMS) con reordenamiento de secciones de portada en tiempo real y carga optimizada de activos multimedia sin penalizar la velocidad de carga.",
    solution:
      "Construí la plataforma full stack con Next.js App Router, React y Tailwind CSS. Diseñé el modelo de datos relacional con Prisma ORM sobre PostgreSQL (Neon Serverless), soportando variantes complejas de producto y categorías. Implementé autenticación híbrida con NextAuth (Auth.js) y Google OAuth, carrito persistente con sincronización local y descuentos, gestor de medios en Vercel Blob Storage, sistema transaccional de correo con Nodemailer y un panel de administración con control de acceso por roles (RBAC) que incluye un maquetador para reordenar las secciones del landing. Incorporé animaciones con Framer Motion y despliegue continuo en Vercel.",
    image: "/images/mhine-home.png",
    imagePresentation: "interface",
    tags: [
      "Next.js",
      "React",
      "Prisma ORM",
      "PostgreSQL",
      "Neon",
      "NextAuth",
      "Auth.js",
      "Vercel Blob",
      "Tailwind CSS",
      "Framer Motion",
      "Nodemailer",
    ],
    featured: true,
    githubUrl: null,
    demoUrl: "https://mhine-home.gustavobaranda.com",
  },
  {
    id: "gusflow-kanban",
    priority: 7,
    title: "GusFlow APP — Plataforma de Gestión Kanban & PWA",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "Proyecto Personal",
    period: "2025 — 2026",
    dateSort: "2025-11",
    challenge:
      "Los equipos de desarrollo y profesionales independientes requerían un gestor de tareas reactivo y personalizable en formato PWA, eliminando la dependencia de herramientas SaaS propietarias y garantizando persistencia relacional segura, soporte para adjuntos pesados, autenticación social y verificación por email.",
    solution:
      "Diseñé e implementé la plataforma web progresiva (PWA) instalable con Next.js App Router y React. Desarrollé el tablero Kanban dinámico con reordenamiento de columnas y tareas, prioridades, fechas de vencimiento y gestión de notas. Implementé la capa de datos en Vercel Postgres (PostgreSQL), gestión de adjuntos multimedia en Vercel Blob Storage, autenticación híbrida con JWT y Google/GitHub OAuth, onboarding y recuperación transaccional con Resend API, además de microinteracciones con Framer Motion y Tailwind CSS.",
    image: "/images/gusflow.png",
    imagePresentation: "interface",
    tags: [
      "Next.js",
      "React",
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
    priority: 4,
    title: "Plataforma de Medicina Laboral & Visor DICOM",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "Fundación Maldonado",
    period: "2025",
    dateSort: "2025-04",
    challenge:
      "La institución médica requería reemplazar la gestión manual de legajos de pacientes y estudios clínicos por un sistema centralizado con control de acceso basado en roles (RBAC). El desafío incluía integrar un visor web para radiografías e imágenes médicas en formato DICOM con herramientas de visualización y manipulación —contraste, rotación y zoom—, preservar la privacidad de los datos de salud y automatizar la generación de informes en PDF.",
    solution:
      "Diseñé e implementé la plataforma clínica con Laravel, PHP y MySQL. Desarrollé el control de acceso con autenticación por roles —Administrador, Colaborador Médico y Paciente— y middleware de autorización. Integré un visor interactivo de archivos DICOM (DWV y Canvas) con zoom, contraste, brillo, desplazamiento y rotación; tablas dinámicas con Yajra DataTables; almacenamiento estructurado de legajos médicos y exportación automatizada de reportes con Tailwind CSS y Alpine.js.",
    image: "/images/fundacion_maldonado_preview.png",
    imagePresentation: "interface",
    tags: [
      "Laravel",
      "PHP",
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
    priority: 5,
    title: "WeatherFlow API — Backend RESTful Enterprise & OpenAPI 3",
    category: "apis",
    categoryLabel: "APIs y Microservicios",
    company: "Proyecto Personal",
    period: "2026",
    dateSort: "2026-02",
    challenge:
      "Aplicaciones móviles y web requerían una solución backend RESTful enterprise, resiliente y de baja latencia para agregación meteorológica global en tiempo real, geocodificación de ciudades, conversión automática de unidades según preferencias del usuario, notificaciones in-app y seguridad stateless tokenizada.",
    solution:
      "Diseñé e implementé la API con Django, Python y Django REST Framework (DRF), estructurada por capas de servicios, serializadores y ViewSets. Integré autenticación stateless JWT (SimpleJWT), geocodificación con Open-Meteo API y caché en memoria con django.core.cache y DRF Throttling. Desarrollé notificaciones in-app, una suite de pruebas con pytest-django, especificación OpenAPI 3 con Swagger UI y ReDoc (drf-spectacular), contenedorización multi-etapa en Docker y despliegue en Render Cloud con PostgreSQL y CI/CD en GitHub Actions.",
    image: "/images/weatherflow.png",
    imagePresentation: "interface",
    tags: [
      "Python",
      "Django",
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
    priority: 3,
    title: "Plataforma de Riesgos Financieros & ETL (LCR / VaR / Calce de Plazos)",
    category: "apis",
    categoryLabel: "APIs y Microservicios",
    company: "Solar Banco",
    period: "2024 — 2025",
    dateSort: "2024-12",
    challenge:
      "El departamento de Gestión de Riesgos requería automatizar la medición de liquidez regulatoria (LCR), el cálculo de Value at Risk (VaR) y la brecha de calce de plazos. La operación dependía del procesamiento de volúmenes masivos de datos heterogéneos provenientes del Data Warehouse corporativo y planillas operativas, exigiendo sincronización sin margen de error, trazabilidad de auditoría estricta y autenticación corporativa.",
    solution:
      "Diseñé e implementé la arquitectura backend en Django con pipelines ETL automatizados en Python —Pandas, cx_Oracle y OpenPyXL— para extraer, transformar y cargar datos desde Oracle DW. Desarrollé el motor de cálculo para la brecha de liquidez por bandas de tiempo y moneda, modelos parametrizables de VaR y reglas de LCR. Integré autenticación Single Sign-On (SSO) mediante Active Directory (LDAP), control de inactividad, auditoría de procesos y usuarios, y dashboards con DataTables para visualización y exportación.",
    image: "/images/solar_banco.png",
    imagePresentation: "square-logo",
    tags: [
      "Python",
      "Django",
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
    id: "chatflow-agent",
    priority: 2,
    title: "chatflow-agent — Librería Python para agentes conversacionales",
    category: "opensource",
    categoryLabel: "Freelance & Open Source",
    company: "Open Source · Creador y mantenedor",
    period: "Proyecto activo",
    dateSort: "9999-98",
    challenge:
      "Desarrollar agentes conversacionales reutilizables exige separar la lógica de negocio de los proveedores de modelos y de los canales, sin perder estado, coordinación entre agentes ni control ante ejecuciones concurrentes.",
    solution:
      "Soy creador y responsable técnico de chatflow-agent, una librería Python open source para desarrollar agentes conversacionales y flujos multiagente. Desarrollo su ejecución asíncrona, herramientas, handoffs entre agentes, proveedores de modelos desacoplados, persistencia de sesiones e integraciones con CLI, webhooks, WhatsApp y Telegram; también mantengo la arquitectura, las pruebas, los controles de concurrencia, los mecanismos de recuperación y la revisión de contribuciones.",
    image: null,
    mediaLabel: "chatflow-agent",
    imagePresentation: "wide-logo",
    tags: [
      "Python",
      "AsyncIO",
      "Pydantic",
      "HTTPX",
      "SQLite",
      "Multi-agent",
      "Tool Calling",
      "Webhooks",
    ],
    featured: true,
    githubUrl: "https://github.com/GustavoBaranda/chatflow-agent",
    demoUrl: null,
  },
  {
    id: "portfolio-personal",
    priority: 8,
    title: "Portfolio Web Personal & Design System",
    category: "opensource",
    categoryLabel: "Freelance & Open Source",
    company: "Proyecto Personal",
    period: "2025 — Presente",
    dateSort: "2025-01",
    challenge:
      "Construir una presencia profesional requiere organizar proyectos, experiencia y habilidades con una jerarquía clara, accesible y adaptable, sin perder consistencia entre dispositivos ni sobrecargar la navegación.",
    solution:
      "Desarrollé este portfolio con Next.js, React y TypeScript mediante una arquitectura de componentes reutilizables. Implementé diseño responsive, temas claro y oscuro, navegación e interacciones accesibles, filtros de proyectos y un formulario protegido, cuidando la carga de imágenes, el movimiento reducido y la estabilidad visual.",
    image: "/images/opengraph.png",
    imagePresentation: "interface",
    tags: ["TypeScript", "Next.js", "React", "Tailwind CSS", "CSS Subgrid", "SEO", "JSON-LD", "Framer Motion", "Nodemailer", "Anti-Spam"],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda/Portfolio",
    demoUrl: "https://gustavobaranda.com",
  },
  {
    id: "las-verde-ecommerce",
    priority: 9,
    title: "Plataforma E-Commerce SPA & Catálogo — Las Verde",
    category: "opensource",
    categoryLabel: "Freelance & Open Source",
    company: "Las Verde",
    period: "2022 — 2023",
    dateSort: "2022-06",
    challenge:
      "La empresa comercializadora de jugos 100% naturales necesitaba migrar su presencia digital a una SPA moderna con catálogo de productos en tiempo real, modales detallados de ingredientes/beneficios, canal omnicanal de atención directa y alta velocidad de respuesta en dispositivos móviles.",
    solution:
      "Diseñé e implementé la aplicación Single Page Application (SPA) con React, React Router y Firebase Firestore para la persistencia y sincronización del catálogo. Desarrollé estilos modulares con Sass y Normalize.css, hooks reutilizables para validar consultas con envío mediante API, vistas detalladas de producto, atención directa por WhatsApp e integración de mapas. Implementé navegación fluida entre rutas y despliegue continuo en Vercel. El proyecto fue reconocido dentro del Top 10 de la camada en Coderhouse.",
    image: "/images/las_verde_preview.png",
    imagePresentation: "interface",
    tags: [
      "React",
      "Firebase",
      "Firestore",
      "React Router",
      "Sass",
      "JavaScript",
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
    priority: 10,
    title: "Plataforma Web Institucional — Descubriendo Jardín",
    category: "opensource",
    categoryLabel: "Freelance & Open Source",
    company: "Descubriendo Jardín Maternal",
    period: "2022",
    dateSort: "2022-01",
    challenge:
      "La institución educativa requería digitalizar su presencia institucional y canal de atención a las familias, resolviendo la baja tasa de conversión de consultas presenciales mediante un sitio accesible, optimizado para tráfico móvil y centrado en la experiencia de usuario (UX/UI).",
    solution:
      "Diseñé e implementé la plataforma web con HTML semántico, CSS modular —Flexbox y CSS Grid—, Bootstrap y JavaScript. Desarrollé un slider de imágenes, navegación móvil, preguntas frecuentes interactivas, un formulario con validación en cliente, integración con Google Maps API y atención directa por WhatsApp. Trabajé sobre accesibilidad, SEO técnico on-page y despliegue continuo en Vercel. El proyecto fue distinguido dentro del Top 10 de la camada en Coderhouse.",
    image: "/images/descubriendo_jardin_preview.png",
    imagePresentation: "interface",
    tags: [
      "JavaScript",
      "HTML",
      "CSS",
      "Flexbox & Grid",
      "Bootstrap",
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
