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
      "Sistema integral para logística de depósitos fiscales con módulo público de turnos (Turnero), monitoreo en tiempo real y gestión empresarial de cargas y contenedores.",
    description:
      "Arquitectura distribuida multimodular compuesta por el portal público de reserva de turnos para operadores logísticos (Turnero) y la plataforma empresarial interna (depofis.web) para recepción, entrega y trazabilidad de contenedores de importación, exportación y nacionales. Backend en Django 4.2 y SQL Server, comunicación en tiempo real con WebSockets (Django Channels), tareas asíncronas con Celery & Redis, generación de reportes/firmas digitales (ReportLab, PyMuPDF, pyHanko) y geolocalización de depósitos con Leaflet.",
    image: "/images/syspro.png",
    tags: ["Python", "Django", "SQL Server", "Celery & Redis", "WebSockets", "Leaflet", "Tailwind CSS", "Bootstrap 5"],
    featured: true,
    githubUrl: null,
    demoUrl: null,
  },
  {
    id: "solar-banco-etl",
    title: "Motor Backend de Riesgos, LCR & Brechas de Liquidez",
    category: "full-stack",
    categoryLabel: "Full Stack",
    company: "Solar Banco",
    period: "2024 — 2025",
    summary:
      "Motor backend en Django y pipelines ETL para el cálculo dinámico de LCR, VaR de liquidez, calce de plazos y parámetros regulatorios bancarios.",
    description:
      "Diseño y desarrollo de solución backend financiera en Django 5.0 para el cálculo de Ratios de Cobertura de Liquidez (LCR), Valor en Riesgo (VaR de liquidez) y calce de plazos por bandas temporales. Implementación de pipelines ETL automáticos en Python (Pandas, cx_Oracle, OpenPyXL) para ingesta y sincronización entre SQLite, Excel y Data Warehouse en Oracle. Autenticación SSO con Active Directory corporativo (LDAP) y logs de auditoría.",
    image: "/images/solar_banco.png",
    tags: ["Python", "Django 5", "Oracle Data Warehouse", "ETL", "LCR & VaR", "Pandas", "Active Directory LDAP"],
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
      "Aplicación e-commerce en React.js para fábrica de jugos naturales con catálogo interactivo y sincronización en tiempo real con Firebase Firestore.",
    description:
      "Proyecto cliente real otorgado por Coderhouse como distinción por quedar seleccionado en el Top 10 del curso de React.js. Incorpora catálogo dinámico de productos e insumos con Firebase Firestore, ruteo SPA con React Router v6, arquitectura de estilos modular en Sass (SCSS) y canal de contacto directo por WhatsApp.",
    image: "/images/las_verde_preview.png",
    tags: ["React.js", "Firebase Firestore", "React Router v6", "Sass (SCSS)", "JavaScript"],
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
      "Plataforma institucional responsiva con catálogo de propuesta educativa, slider interactivo, FAQ y validación de contacto.",
    description:
      "Proyecto cliente real asignado por Coderhouse como premio por quedar en el Top 10 del curso de Desarrollo Web. Desarrollado con HTML5 semántico, CSS3/Bootstrap 5 y JavaScript (ES6+). Incluye slider interactivo de instalaciones, validación cliente de formularios, acordeón de preguntas frecuentes e integración con Google Maps y WhatsApp.",
    image: "/images/descubriendo_jardin.svg",
    tags: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript (ES6+)", "UX/UI", "Responsive Design"],
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

