"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

/* ───────── animation variants ───────── */
const textReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const paragraphReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: custom * 0.12 },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
};

/* ───────── experience data ───────── */
const experiences = [
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
      mainSkills: ["Python", "Django", "SQL Server",],    
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
    modalidad: "Remoto"
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
      mainSkills: ["Python", "Django","ETL",],
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
    modalidad: "Remoto"
  },
  {
    id: 4,
    role: "Front-end Developer React",
    company: "Las Verde",
    initials: "/images/las_verde.png",
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
    url: "https://lasverde.com.ar/",
    modalidad: "Remoto"
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
    url: "https://maternaldescubrimiento.vercel.app/",
    modalidad: "Remoto"
  },
];

/* ───────── color maps ───────── */
const colorMap = {
  syspro: {
    badge: "bg-[#6022A4]/10 text-[#6022A4]",
    dot: "bg-[#6022A4]",
    border: "border-[#6022A4]/20 hover:border-[#6022A4]/40",
    ring: "ring-[#6022A4]/20",
    heading: "text-[#6022A4]",
    logoBg: "bg-[#6022A4]/10 text-[#6022A4]",
    skillText: "text-[#6022A4]",
    skillBorder: "border-[#6022A4]/40 hover:border-[#6022A4]/70",
    skillBg: "bg-[#6022A4]/10",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(96,34,164,0.25)]",
    skillRing: "focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  fundacion: {
    badge: "bg-[#8C215C]/10 text-[#8C215C]",
    dot: "bg-[#8C215C]",
    border: "border-[#8C215C]/20 hover:border-[#8C215C]/40",
    ring: "ring-[#8C215C]/20",
    heading: "text-[#8C215C]",
    logoBg: "bg-[#8C215C]/10 text-[#8C215C]",
    skillText: "text-[#8C215C]",
    skillBorder: "border-[#8C215C]/40 hover:border-[#8C215C]/70",
    skillBg: "bg-[#8C215C]/10",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(140,33,92,0.25)]",
    skillRing: "focus-visible:ring-rose-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  solar: {
    badge: "bg-[#E71C4C]/10 text-[#E71C4C]",
    dot: "bg-[#E71C4C]",
    border: "border-[#E71C4C]/20 hover:border-[#E71C4C]/40",
    ring: "ring-[#E71C4C]/20",
    heading: "text-[#E71C4C]",
    logoBg: "bg-[#E71C4C]/10 text-[#E71C4C]",
    skillText: "text-[#E71C4C]",
    skillBorder: "border-[#E71C4C]/40 hover:border-[#E71C4C]/70",
    skillBg: "bg-[#E71C4C]/10",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(231,28,76,0.25)]",
    skillRing: "focus-visible:ring-rose-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  lasverde: {
    badge: "bg-[#119446]/10 text-[#119446]",
    dot: "bg-[#119446]",
    border: "border-[#119446]/20 hover:border-[#119446]/40",
    ring: "ring-[#119446]/20",
    heading: "text-[#119446]",
    logoBg: "bg-[#119446]/10 text-[#119446]",
    skillText: "text-[#119446]",
    skillBorder: "border-[#119446]/40 hover:border-[#119446]/70",
    skillBg: "bg-[#119446]/10",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(17,148,70,0.25)]",
    skillRing: "focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  blue: {
    badge: "bg-[#C1E6F9]/20 text-[#0E78C7]",
    dot: "bg-[#0E78C7]",
    border: "border-[#0E78C7]/20 hover:border-[#0E78C7]/40",
    ring: "ring-[#0E78C7]/20",
    heading: "text-[#0E78C7]",
    logoBg: "bg-[#C1E6F9]/20 text-[#0E78C7]",
    skillText: "text-[#0E78C7]",
    skillBorder: "border-[#0E78C7]/40 hover:border-[#0E78C7]/70",
    skillBg: "bg-[#0E78C7]/10",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(14,120,199,0.25)]",
    skillRing: "focus-visible:ring-sky-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  unicaba: {
    badge: "bg-[#B4408F]/10 text-[#B4408F]",
    dot: "bg-[#B4408F]",
    border: "border-[#B4408F]/20 hover:border-[#B4408F]/40",
    ring: "ring-[#B4408F]/20",
    heading: "text-[#B4408F]",
    logoBg: "bg-[#B4408F]/10 text-[#B4408F]",
    skillText: "text-[#B4408F]",
    skillBorder: "border-[#B4408F]/40 hover:border-[#B4408F]/70",
    skillBg: "bg-[#B4408F]/10",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(180,64,143,0.25)]",
    skillRing: "focus-visible:ring-[#B4408F]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  fasta: {
    badge: "bg-[#011165]/10 text-[#011165]",
    dot: "bg-[#011165]",
    border: "border-[#011165]/20 hover:border-[#011165]/40",
    ring: "ring-[#011165]/20",
    heading: "text-[#011165]",
    logoBg: "bg-[#011165]/10 text-[#011165]",
    skillText: "text-[#011165]",
    skillBorder: "border-[#011165]/40 hover:border-[#011165]/70",
    skillBg: "bg-[#011165]/10",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(1,17,101,0.25)]",
    skillRing: "focus-visible:ring-[#011165]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  educacionit: {
    badge: "bg-[#0B30F1]/10 text-[#0B30F1]",
    dot: "bg-[#0B30F1]",
    border: "border-[#0B30F1]/20 hover:border-[#0B30F1]/40",
    ring: "ring-[#0B30F1]/20",
    heading: "text-[#0B30F1]",
    logoBg: "bg-[#0B30F1]/10 text-[#0B30F1]",
    skillText: "text-[#0B30F1]",
    skillBorder: "border-[#0B30F1]/40 hover:border-[#0B30F1]/70",
    skillBg: "bg-[#0B30F1]/10",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(11,48,241,0.25)]",
    skillRing: "focus-visible:ring-[#0B30F1]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
  dark: {
    badge: "bg-dark/10 text-dark",
    dot: "bg-black",
    border: "border-black/20 dark:border-white/20 hover:border-black/10",
    ring: "ring-black/20",
    heading: "text-dark",
    logoBg: "bg-black/10 text-dark",
    skillText: "text-dark",
    skillBorder: "border-black/40 hover:border-black/70",
    skillBg: "bg-black/10",
    skillShadow: "hover:shadow-[0_12px_30px_rgba(15,23,42,0.6)]",
    skillRing: "focus-visible:ring-black/60 dark:focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  },
};

const skillChipBase =
  "text-[0.65rem] font-semibold uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border shadow-sm bg-white/5 transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

/* ───────── component ───────── */
export default function Page() {
  const [step, setStep] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const lastExperienceId = experiences[experiences.length - 1]?.id;
  const isLastExperienceExpanded = expandedId === lastExperienceId;
  const timelineRef = useRef(null);
  const lastExpRef = useRef(null);
  const [maxScaleExp, setMaxScaleExp] = useState(1);
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, maxScaleExp]);

  // Educación / Formación - timeline y control de expansión (estilo Experiencia)
  const eduTimelineRef = useRef(null);
  const lastEduRef = useRef(null);
  const [maxScaleEdu, setMaxScaleEdu] = useState(1);
  
  const { scrollYProgress: eduScrollY } = useScroll({
    target: eduTimelineRef,
    offset: ["start end", "end center"],
  });
  const eduScaleY = useTransform(eduScrollY, [0, 1], [0, maxScaleEdu]);
  const [expandedEduId, setExpandedEduId] = useState(null);

  // Calcular maxScale para experiencia
  useEffect(() => {
    const calculateMaxScale = () => {
      if (lastExpRef.current && timelineRef.current) {
        const containerRect = timelineRef.current.getBoundingClientRect();
        const lastExpRect = lastExpRef.current.getBoundingClientRect();
        const heightToLastExp = lastExpRect.top - containerRect.top + 28;
        const maxScale = Math.min(heightToLastExp / containerRect.height, 1);
        setMaxScaleExp(maxScale);
      }
    };
    calculateMaxScale();
    window.addEventListener('resize', calculateMaxScale);
    return () => window.removeEventListener('resize', calculateMaxScale);
  }, []);

  // Calcular maxScale para educación
  useEffect(() => {
    const calculateMaxScaleEdu = () => {
      if (lastEduRef.current && eduTimelineRef.current) {
        const containerRect = eduTimelineRef.current.getBoundingClientRect();
        const lastEduRect = lastEduRef.current.getBoundingClientRect();
        const heightToLastEdu = lastEduRect.top - containerRect.top + 28;
        const maxScale = Math.min(heightToLastEdu / containerRect.height, 1);
        setMaxScaleEdu(maxScale);
      }
    };
    calculateMaxScaleEdu();
    window.addEventListener('resize', calculateMaxScaleEdu);
    return () => window.removeEventListener('resize', calculateMaxScaleEdu);
  }, []);

  const education = [
    {
      id: "edu-1",
      title: "Licenciatura en Ciencias de Datos",
      institution: "Universidad de la Ciudad de Buenos Aires (UniCABA)",
      period: "Marzo 2026 — Actualidad",
      location: "Ciudad de Buenos Aires",
      color: "unicaba",
      logo: "/images/inicaba.png",
      status: "En curso",
    },
    {
      id: "edu-2",
      title: "Técnico Superior en Desarrollo de Software",
      institution: "Instituto de Formación Técnica Superior N°29",
      period: "Julio 2023 — Diciembre 2025",
      location: "Ciudad de Buenos Aires",
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
      location: null,
      color: "dark",
      logo: "/images/coderhouse.jpg",
      status: "Finalizado",
    },
    {
      id: "edu-5",
      title: "Python Developer",
      institution: "Education IT",
      period: "Agosto 2022 — Diciembre 2022",
      location: null,
      color: "educacionit",
      logo: "/images/educacionit.jpg",
      status: "Finalizado",
    },
  ];

  // Helper: parse end date from a period string like "Diciembre 2021 — Julio 2022" or "Marzo 2026 — Actualidad"
  const monthMap = {
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
  };

  function parsePeriodEnd(period) {
    if (!period) return new Date(0);
    const parts = period.split(/–|—|-/).map((p) => p.trim());
    const end = parts[parts.length - 1].toLowerCase();
    if (end.includes("actual") || end.includes("actualidad")) return new Date(9999, 0, 1);
    const m = end.match(/([a-záéíóúñ]+)\s+(\d{4})/i);
    if (!m) return new Date(0);
    const monthName = m[1].toLowerCase();
    const year = parseInt(m[2], 10);
    const month = monthMap[monthName] ?? 0;
    return new Date(year, month, 1);
  }

  const sortedEducation = education.slice().sort((a, b) => {
    const da = parsePeriodEnd(a.period);
    const db = parsePeriodEnd(b.period);
    return db - da; // most recent first
  });


  return (
    <main className="pb-6 pt-0 md:py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">

        {/* ═══════ SOBRE MI ═══════ */}
        <motion.section className="space-y-10 mb-32">
          <motion.header
            className="space-y-3"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-xl sm:text-2xl font-bold uppercase tracking-[0.3em] text-foreground">
              Sobre mi
            </p>
            <h1 className="text-3xl font-extrabold leading-snug sm:text-4xl md:text-6xl text-foreground text-balance">
              Construyendo el puente entre el{" "}
              <span className="text-indigo-600">{"código"}</span> y los{" "}
              <span className="text-blue-600">{"datos"}</span>.
            </h1>
          </motion.header>

          <div className="space-y-6 sm:space-y-7 text-lg text-muted-foreground leading-relaxed">
            <motion.p
              variants={paragraphReveal}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-xl md:text-2xl"
            >
              Me gusta pensar el desarrollo de software como un punto de
              encuentro donde la lógica se transforma en soluciones y los datos
              en decisiones.
            </motion.p>

            <motion.p
              variants={paragraphReveal}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              Soy{" "}
              <span className="font-semibold text-foreground">
                {"Técnico Superior en Desarrollo de Software"}
              </span>{" "}
              y estudiante de la{" "}
              <span className="font-semibold italic text-foreground">
                {"Licenciatura en Ciencias de Datos"}
              </span>{" "}
              en la Universidad de la Ciudad de Buenos Aires (UniCABA). Comencé
              creando aplicaciones y, con el tiempo, incorporé una mirada
              analítica que hoy guía cómo afundacion cada proyecto.
            </motion.p>

            <div className="space-y-6">
              <motion.p
                variants={paragraphReveal}
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                En el{" "}
                <span className="text-indigo-600 font-semibold uppercase tracking-wider text-sm">
                  Backend
                </span>
                , busco solidez y escalabilidad. Trabajo principalmente con{" "}
                <span className="font-semibold text-foreground">
                  Python y Django
                </span>
                . Me interesa diseñar soluciones claras y mantenibles,
                equilibrando simplicidad y rendimiento desde la arquitectura.
              </motion.p>

              <motion.p
                variants={paragraphReveal}
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                En el{" "}
                <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                  Frontend
                </span>
                , utilizo React para crear interfaces limpias y funcionales.
                Creo que la experiencia de usuario no es un {"\"extra\""}: si algo
                es potente pero confuso, todavía no está terminado.
              </motion.p>

              <motion.p
                variants={paragraphReveal}
                custom={4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                La{" "}
                <span className="text-cyan-600 font-semibold uppercase tracking-wider text-sm">
                  Ciencia de Datos
                </span>{" "}
                me aporta una forma distinta de decidir. Analizo información
                para entender qué ocurre realmente y elegir caminos con
                criterio. No se trata de acumular datos, sino de usarlos para
                mejorar procesos y construir soluciones más inteligentes.
              </motion.p>
            </div>

            <AnimatePresence>
              {step === 2 && (
                <motion.div
                  key="extra-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden space-y-6"
                >
                  <motion.p variants={paragraphReveal} custom={0} initial="hidden" animate="visible">
                    Creo profundamente en el{" "}
                    <span className="font-semibold text-foreground">aprendizaje constante</span>.
                    La tecnología cambia todo el tiempo y eso es parte de lo que hace interesante
                    este rubro; para mí, la curiosidad es una herramienta de trabajo fundamental.
                  </motion.p>
                  <motion.p variants={paragraphReveal} custom={1} initial="hidden" animate="visible">
                    Valoro el{" "}
                    <span className="font-semibold text-foreground">trabajo en equipo</span> y la
                    comunicación clara. Compartir ideas, escuchar otras miradas y construir en
                    conjunto suele llevar a resultados más sólidos y completos que el trabajo
                    aislado.
                  </motion.p>
                  <motion.p variants={paragraphReveal} custom={2} initial="hidden" animate="visible">
                    Busco que exista un{" "}
                    <span className="font-semibold text-foreground">propósito en cada entrega</span>.
                    No me interesa hacer cosas por inercia, sino aportar algo concreto: optimizar
                    un proceso, mejorar una experiencia o resolver un problema real en el cruce
                    entre datos y software.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              className="pt-4"
              variants={paragraphReveal}
              custom={5}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence initial={false} mode="wait">
                {step === 1 && (
                  <motion.button
                    key="show-more"
                    onClick={() => setStep(2)}
                    className="text-indigo-600 font-semibold hover:underline"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.24, ease: "easeInOut" }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {"Ver más ↓"}
                  </motion.button>
                )}
                {step === 2 && (
                  <motion.button
                    key="show-less"
                    onClick={() => {
                      setStep(1);
                      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 420);
                    }}
                    className="text-indigo-600 font-semibold hover:underline"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.24, ease: "easeInOut" }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {"Ver menos ↑"}
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.section>

        {/* ═══════ EXPERIENCIA LABORAL ═══════ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="space-y-10 mb-32"
        >
        <motion.header className="space-y-6" variants={textReveal}>
          <p className="text-xl sm:text-2xl font-bold uppercase tracking-[0.3em] text-foreground">
            Experiencia
          </p>

          <h2 className="text-2xl font-extrabold leading-snug sm:text-3xl md:text-5xl text-foreground whitespace-normal">
            Proyectos y <span className="text-indigo-600">desafíos</span> que impulsaron mi <span className="text-blue-600">{"crecimiento"}</span>.
          </h2>

          <p className="max-w-2xl text-foreground">
            Experiencias donde convertí ideas en soluciones técnicas claras y escalables.
          </p>
        </motion.header>

          {/* Timeline */}
          <div className="relative" ref={timelineRef}>
            {/* Background vertical line (track) */}
            <div className="absolute left-5 sm:left-7 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />
            {/* Animated fill line */}
            <motion.div
              className="hidden sm:block sm:absolute sm:left-7 w-0.5 bg-indigo-600 origin-top"
              style={{
                scaleY,
                top: "1.75rem",
                bottom: isLastExperienceExpanded ? "0rem" : "8rem",
                transformOrigin: "top",
              }}
              aria-hidden="true"
            />

            <div className="space-y-6">
              {experiences.map((exp, i) => {
                const colors = colorMap[exp.color] || colorMap.syspro;
                const isExpanded = expandedId === exp.id;
                const skillClasses = [
                  skillChipBase,
                  colors.skillText,
                  colors.skillBorder,
                  colors.skillBg,
                  colors.skillShadow,
                  colors.skillRing,
                ].join(" ");

                return (
                  <motion.div
                    key={exp.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="relative pl-0 sm:pl-16"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`hidden sm:block sm:absolute sm:left-5 top-7 h-4 w-4 rounded-full ${colors.dot} ring-4 ${colors.ring} ring-offset-2 ring-offset-background z-10`}
                      aria-hidden="true"
                    />

                    {/* Card */}
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                      className={`w-full text-left rounded-2xl border ${colors.border} bg-card p-5 sm:p-2 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
                      aria-expanded={isExpanded}
                    >
                      {/* Header row with logo */}
                      <div className="flex items-start gap-4">
                        {/* Company logo / initials */}
                        <div
                          className={`hidden sm:flex shrink-0 h-16 w-16 sm:h-16 sm:w-16 rounded-xl items-center justify-center font-bold text-lg sm:text-xl`}
                          aria-hidden="true"
                        >
                          <Image src={exp.initials} alt={`${exp.company} logo`} className="object-contain" width={60} height={60} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                            <div className="space-y-1">
                              <h3 className={`text-lg sm:text-xl font-bold ${colors.heading}`}>
                                {exp.role}
                              </h3>
                              <div className="block md:flex md:flex-wrap items-center gap-1 text-base font-semibold text-foreground">
                                <div>{exp.company}</div>

                                    <div>
                                    {exp.type && (
                                      <>
                                        <span className="hidden md:inline text-muted-foreground">{"· "}</span>
                                        <span className="text-sm font-normal text-muted-foreground">{exp.type}</span>
                                        <span className="inline text-muted-foreground">{" · "}</span> 
                                      </>
                                    )}
                                    
                                    <span className="text-sm font-normal text-muted-foreground">{exp.modalidad}</span>
                                    </div>
                              </div>
                            {/* Stack Principal SIEMPRE VISIBLE */}
                            <div className="flex flex-wrap gap-2 mt-3">
                              {exp.mainSkills.map(skill => (
                                <span key={skill} className={`text-[0.6rem] px-2 py-0.5 rounded-md bg-dark text-foreground font-dark border uppercase tracking-wider ${colors.badge}`}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-3 shrink-0">
                              <span className={`text-[0.6rem] px-2 py-0.5 rounded-md bg-dark text-foreground font-dark border uppercase tracking-wider ${colors.badge}`}>
                                {exp.duration}
                              </span>
                              {/* Chevron */}
                              <motion.svg
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.25 }}
                                className="h-5 w-5 text-muted-foreground shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </motion.svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex justify-between  mt-3 ml-0 sm:ml-18 flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div>
                          <span className="flex items-center gap-1.5 italic">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1.5 italic">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {exp.location}
                          </span>
                        </div>
                        <div className="sm:hidden flex items-center gap-3 shrink-0">
                          {/* <span className={`text-[0.6rem] px-2 py-0.5 rounded-md bg-dark text-foreground font-dark border uppercase tracking-wider ${colors.badge}`}>
                            {exp.duration}
                          </span> */}
                          {/* Chevron */}
                          <motion.svg
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="h-5 w-5 text-muted-foreground shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </div>
                      </div>

                      {/* Expanded content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            key={`detail-${exp.id}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 pl-2 space-y-4 border-t border-border mt-4">
                              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                {exp.description}
                              </p>

                              {/* Skills */}
                              <div className="flex flex-wrap gap-3">
                                {exp.skills.map((skill) => (
                                  <span key={skill} className={`text-[0.6rem] px-2 py-0.5 rounded-md bg-dark text-foreground font-dark border uppercase tracking-wider ${colors.badge}`}>
                                    {skill}
                                  </span>
                                ))}
                              </div>

                              {/* Link if available */}
                              {exp.url && (
                                <a
                                  href={exp.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className={`inline-flex items-center gap-1.5 text-sm font-semibold ${colors.heading} hover:underline`}
                                >
                                  Ver proyecto
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>


        {/* ═══════ FORMACIÓN / EDUCACIÓN ═══════ */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="space-y-10 mb-20"
          ref={eduTimelineRef}
        >
          <motion.header className="space-y-6" variants={textReveal}>
            <p className="text-xl sm:text-2xl font-bold uppercase tracking-[0.3em] text-foreground">
              Formación
            </p>

            <h2 className="text-2xl font-extrabold leading-snug sm:text-3xl md:text-5xl text-foreground whitespace-normal">
              Formación académica y certificaciones.
            </h2>

            <p className="max-w-2xl text-foreground">
              Títulos y cursos. Completa las fechas y el lugar cuando quieras.
            </p>
          </motion.header>

          {/* Timeline */}
          <div className="relative">
            <div
              className="absolute left-5 sm:left-7 top-0 bottom-0 w-0.5 bg-border"
              aria-hidden="true"
            />
            <motion.div
              className="hidden sm:block sm:absolute sm:left-7 w-0.5 bg-indigo-600 origin-top"
              style={{
                scaleY: eduScaleY,
                top: "1.75rem",
                bottom: "8rem",
                transformOrigin: "top",
              }}
              aria-hidden="true"
            />

            <div className="space-y-6">
              {sortedEducation.map((edu, i) => {
                const colors = colorMap[edu.color] || colorMap.syspro;
                const isInProgress = edu.status === "En curso";   
                return (
                  <motion.div
                    key={edu.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="relative pl-0 sm:pl-16"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`hidden sm:block sm:absolute sm:left-5 top-7 h-4 w-4 rounded-full ${colors.dot} ring-4 ${colors.ring} ring-offset-2 ring-offset-background z-10`}
                      aria-hidden="true"
                    />

                    {/* Card */}
                    <div
                      className={`w-full text-left rounded-2xl border ${colors.border} bg-card p-5 sm:p-2 transition-all duration-300`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Logo / Initials */}
                        <div
                          className="hidden sm:flex shrink-0 h-16 w-16 rounded-xl items-center justify-center font-bold text-lg bg-muted text-foreground"
                          aria-hidden="true"
                        >
                          {edu.logo ? (
                            <Image
                              src={edu.logo}
                              alt={`${edu.institution} logo`}
                              width={60}
                              height={60}
                              className="object-contain rounded-xl"
                            />
                          ) : (
                            <span>
                              {(edu.institution || edu.title)
                                .split(" ")
                                .map((w) => w[0])
                                .slice(0, 2)
                                .join("")}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className={`text-lg sm:text-xl font-bold ${colors.heading}`}>
                            {edu.title}
                          </h3>
                          <div className="flex justify-between items-center">                            
                              <div className="text-sm text-muted-foreground">
                                {edu.institution}
                              </div>
           
                              <div className="hidden sm:flex self-center items-center shrink-0">
                                  <span className={`text-[0.6rem] px-2 py-0.5 rounded-md bg-dark text-foreground font-dark border uppercase tracking-wider ${colors.badge}`}>
                                    {edu.status}
                                  </span>
                              </div>
                          </div>        


                          <div className="flex mt-3 flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5 italic">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                              </svg>
                              {edu.period}
                            </span>
                           { edu.location&& 
                            <span className="flex items-center gap-1.5 italic">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                />
                              </svg>
                              {edu.location || "Lugar"}
                            </span>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>
    
           
      </div>
    </main>
  );
}