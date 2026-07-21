export const PROJECT_CATEGORIES = [
  { id: "all", label: "Todos los Proyectos" },
  { id: "full-stack", label: "Full Stack" },
  { id: "apis", label: "APIs y Microservicios" },
  { id: "opensource", label: "Open Source / Freelance" },
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
    tags: ["Python", "Django", "Oracle", "ETL", "Pandas", "Active Directory", "SQL"],
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
      "Sistema de gestión de pacientes, administración de pruebas médicas, informes clínicos y generación dinámica de reportes en PDF.",
    description:
      "Plataforma completa desarrollada en Laravel y MySQL con interfaz dinámica mediante Yajra DataTables y AJAX. Permite la carga, almacenamiento seguro y visualización de informes médicos digitales con control de roles por servidor.",
    image: "/images/fundacion_maldonado.png",
    tags: ["Laravel", "PHP", "MySQL", "Blade", "Yajra DataTables", "JavaScript", "Tailwind CSS"],
    featured: false,
    githubUrl: null,
    demoUrl: null,
  },
  {
    id: "las-verde-ecommerce",
    title: "E-Commerce & Catálogo Interactivo 'Las Verde'",
    category: "opensource",
    categoryLabel: "Open Source / Freelance",
    company: "Las Verde",
    period: "2022 — 2023",
    summary:
      "Aplicación web en ReactJS para comercialización de jugos naturales con catálogo interactivo y sincronización de pedidos en Firebase.",
    description:
      "Desarrollado como proyecto seleccionado en el top 10 de Coderhouse. Presenta catálogo dinámico de productos, carrito de compras, integración en tiempo real con Firebase Firestore y diseño responsive avanzado con Sass.",
    image: "/images/las_verde.png",
    tags: ["React.js", "Firebase", "JavaScript", "React Router", "Sass"],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda",
    demoUrl: "https://lasverde.com.ar/",
  },
  {
    id: "maternal-descubriendo",
    title: "Sitio Web Institucional Jardín Maternal Descubriendo",
    category: "opensource",
    categoryLabel: "Open Source / Freelance",
    company: "Descubriendo",
    period: "2022",
    summary:
      "Plataforma institucional para presentación de servicios educativos, comunicación institucional y diseño UX responsivo.",
    description:
      "Proyecto real asignado por Coderhouse tras quedar en el top 10 del curso de Desarrollo Web. Enfoque prioritario en rendimiento, accesibilidad y experiencia de usuario optimizada en dispositivos móviles.",
    image: "/images/descubriendo_jardin.svg",
    tags: ["HTML5", "CSS3", "JavaScript", "UX/UI", "Responsive Design"],
    featured: false,
    githubUrl: "https://github.com/GustavoBaranda",
    demoUrl: "https://maternaldescubrimiento.vercel.app/",
  },
];
