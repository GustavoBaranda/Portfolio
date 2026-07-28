export const PROJECT_CATEGORIES = [
  { id: "all", label: "Todos los Proyectos" },
  { id: "full-stack", label: "Full Stack" },
  { id: "apis", label: "APIs y Microservicios" },
  { id: "opensource", label: "Freelance & Open Source" },
];

export const PROJECTS = [
  {
    id: "syspro-logistica",
    title: "Plataforma de Logística & Depósitos Fiscales (Turnero & Depofis)",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "SysPro Consulting",
    period: "2025 — Presente",
    summary:
      "Sistema integral para logística de depósitos fiscales con módulo público de turnos (Turnero) y gestión empresarial de contenedores de importación y exportación.",
    description:
      "Arquitectura distribuida compuesta por un módulo web público en Tailwind CSS para reserva de turnos de operadores logísticos y la plataforma depofis.web para administración interna. APIs REST en Django, consultas optimizadas en SQL Server, caché selectivo y tareas en segundo plano con Celery.",
    image: "/images/syspro.png",
    tags: ["Python", "Django", "SQL Server", "Celery", "Tailwind CSS", "Bootstrap", "REST API"],
    featured: true,
    githubUrl: null,
    demoUrl: null,
  },
  {
    id: "solar-banco-etl",
    title: "Solución Backend Reguladores y Brechas de Liquidez",
    category: "apis",
    categoryLabel: "APIs y Microservicios",
    company: "Solar Banco",
    period: "2024 — 2025",
    summary:
      "Motor backend en Django y pipelines ETL en Python (Pandas, cx_Oracle) para el cálculo dinámico de brechas de liquidez y parámetros regulatorios bancarios.",
    description:
      "Diseño y desarrollo de pipelines de extracción, transformación y carga (ETL) sincronizando bases de datos Oracle, SQLite y archivos Excel. Integración con Active Directory corporativo (SSO/LDAP) y control de acceso basado en roles (RBAC).",
    image: "/images/solar_banco.png",
    tags: ["Python", "Django", "Oracle", "SQL", "ETL", "Active Directory", "Pandas",],
    featured: true,
    githubUrl: null,
    demoUrl: null,
  },
  {
    id: "fundacion-medicina",
    title: "Plataforma Web de Gestión en Medicina Laboral",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "Fundación Maldonado",
    period: "2025",
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
  {
    id: "las-verde-ecommerce",
    title: "E-Commerce & Catálogo Interactivo 'Las Verde'",
    category: "opensource",
    categoryLabel: "Freelance",
    company: "Las Verde",
    period: "2022 — 2023",
    summary:
      "Aplicación web en ReactJS para comercialización de jugos naturales con catálogo interactivo y sincronización de pedidos en Firebase.",
    description:
      "Desarrollado como proyecto seleccionado en el top 10 de Coderhouse tras quedar en el top 10 del curso de React.js. Presenta catálogo dinámico de productos, integración en tiempo real con Firebase Firestore y diseño responsive avanzado con Sass.",
    image: "/images/las_verde_preview.png",
    tags: ["React.js", "Firebase", "JavaScript", "React Router", "Sass"],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda/Las-verde",
    demoUrl: "https://lasverde.vercel.app/",
  },
  {
    id: "maternal-descubriendo",
    title: "Sitio Web Institucional Jardín Maternal Descubriendo",
    category: "opensource",
    categoryLabel: "Freelance",
    company: "Descubriendo",
    period: "2022",
    summary:
      "Plataforma institucional para presentación de servicios educativos, comunicación institucional y diseño UX responsivo.",
    description:
      "Proyecto real asignado por Coderhouse tras quedar en el top 10 del curso de Desarrollo Web. Enfoque prioritario en rendimiento, accesibilidad y experiencia de usuario optimizada en dispositivos móviles.",
    image: "/images/descubriendo_jardin.svg",
    tags: ["HTML5", "CSS3", "JavaScript", "UX/UI", "Responsive Design"],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda/Descubrimiento-Jardin-Maternal",
    demoUrl: "https://jardinmaternaldescubriendo.vercel.app/",
  },
  {
    id: "portfolio-personal",
    title: "Portfolio Web Profesional & Design System",
    category: "opensource",
    categoryLabel: "Open Source",
    company: "Proyecto Personal",
    period: "2025 — Presente",
    summary:
      "Sitio web personal desarrollado con Next.js 16 App Router, Tailwind CSS v4, animaciones con Framer Motion e integración de API de contacto.",
    description:
      "Plataforma web construida con React 19 y Next.js App Router para la presentación de experiencia profesional y proyectos. Incorpora arquitectura limpia, sistema de temas dinámico (Dark/Light mode), microinteracciones avanzadas con Framer Motion e integración de Nodemailer API en Next.js Server Routes.",
    image: "/images/opengraph.png",
    tags: ["Next.js", "React 19", "Tailwind CSS", "Framer Motion", "Nodemailer", "JavaScript"],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda/portfolio",
    demoUrl: "https://gustavobaranda.vercel.app/",
  },
];

