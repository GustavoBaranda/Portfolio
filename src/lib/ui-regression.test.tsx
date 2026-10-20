import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import ts from "typescript";
import { renderToStaticMarkup } from "react-dom/server";
import ExperienceCard from "../components/about/ExperienceCard";
import ExperienceSection, { nextExpandedExperienceId } from "../components/about/ExperienceSection";
import EducationCard from "../components/about/EducationCard";
import EducationSection, { sortEducationByPeriod } from "../components/about/EducationSection";
import ProjectsGrid, {
  filterProjects,
  getProjectRowBlockMinHeights,
  groupProjectsIntoRows,
  shouldEqualizeProjectRow,
  sortProjectsByPriority,
  updateExpandedProjectIds,
} from "../components/projects/ProjectsGrid";
import Menu from "../components/header/Menu";
import BurgerMenuMobile from "../components/header/BurgerMenuMobile";
import ThemeToggle from "../components/common/ThemeToggle";
import HeroBio from "../components/about/HeroBio";
import ProjectCard, {
  PROJECT_CARD_BLOCKS,
  splitProjectSolution,
} from "../components/projects/ProjectCard";
import { FillButton } from "../components/hero/fill-button";
import { EDUCATION, EXPERIENCES } from "../data/aboutData";
import { PROJECTS } from "../data/projectsData";
import { closeNavigationDialogAfterExit } from "./navigation-dialog";
import { createHomeMetadata, createRootMetadata, SITE_CONFIG } from "../config/site";
import { createPortfolioStructuredData, serializeJsonLd } from "./structured-data";

test("home metadata uses the centralized professional identity", async () => {
  const root = JSON.parse(JSON.stringify(createRootMetadata(SITE_CONFIG.url))) as {
    title: { default: string; template: string };
  };
  const effective = JSON.parse(JSON.stringify(createHomeMetadata(SITE_CONFIG.url))) as {
    title: { absolute: string };
    description: string;
    alternates: { canonical: string };
    openGraph: {
      title: string;
      description: string;
      url: string;
      images: Array<{ url: string; width: number; height: number }>;
    };
    twitter: {
      title: string;
      description: string;
      images: Array<{ url: string; width: number; height: number }>;
    };
  };

  assert.deepEqual(root.title, {
    default: "Gustavo Baranda | Full Stack Python Developer",
    template: "%s | Gustavo Baranda",
  });
  assert.deepEqual(effective.title, {
    absolute: "Gustavo Baranda | Full Stack Python Developer",
  });
  assert.equal(
    effective.description,
    "Full Stack Python Developer especializado en backend con Django y SQL Server. Desarrollo aplicaciones empresariales, integraciones y proyectos open source.",
  );
  assert.equal(effective.alternates.canonical, "https://gustavobaranda.com");
  assert.equal(effective.openGraph.title, effective.title.absolute);
  assert.equal(effective.twitter.title, effective.title.absolute);
  assert.equal(effective.openGraph.description, SITE_CONFIG.socialDescription);
  assert.equal(effective.twitter.description, SITE_CONFIG.socialDescription);
  assert.equal(effective.openGraph.url, SITE_CONFIG.url);
  assert.equal(effective.openGraph.images[0].url, `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`);
  assert.equal(effective.twitter.images[0].url, `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`);
  assert.deepEqual(
    [effective.openGraph.images[0].width, effective.openGraph.images[0].height],
    [1200, 630],
  );

  const [layout, page, site] = await Promise.all([
    readFile("src/app/layout.tsx", "utf8"),
    readFile("src/app/page.tsx", "utf8"),
    readFile("src/config/site.ts", "utf8"),
  ]);
  assert.match(layout, /export const metadata = createRootMetadata\(baseUrl\)/);
  assert.match(page, /export const metadata = createHomeMetadata\(baseUrl\)/);
  const pageMetadataSetup = page.slice(0, page.indexOf("export default function HomePage"));
  assert.doesNotMatch(pageMetadataSetup, /Full Stack Python Developer especializado|chatflow-agent/);
  assert.doesNotMatch(
    `${layout}\n${page}\n${site}`,
    /Full Stack Developer & Data Science Student|Transformo ideas en soluciones digitales|Portafolio profesional de Gustavo Baranda/,
  );
});

test("JSON-LD represents one coherent Person and WebSite with safe serialization", async () => {
  const structuredData = createPortfolioStructuredData();
  assert.equal(structuredData["@context"], "https://schema.org");
  assert.equal(structuredData["@graph"].length, 2);

  const person = structuredData["@graph"][0];
  const website = structuredData["@graph"][1];
  assert.equal(person["@type"], "Person");
  assert.equal(person["@id"], `${SITE_CONFIG.url}/#person`);
  assert.equal(person.name, SITE_CONFIG.name);
  assert.equal(person.jobTitle, "Full Stack Python Developer");
  assert.equal(person.url, SITE_CONFIG.url);
  assert.equal(person.description, SITE_CONFIG.description);
  assert.match(person.description, /backend con Django y SQL Server/);
  assert.deepEqual(person.sameAs, [SITE_CONFIG.links.github, SITE_CONFIG.links.linkedin]);
  assert.ok(person.knowsAbout.includes("Python"));
  assert.ok(person.knowsAbout.includes("Django"));
  assert.ok(person.knowsAbout.includes("SQL Server"));

  const completedInstitutions = EDUCATION
    .filter(({ status }) => status === "Finalizado")
    .map(({ institution }) => institution);
  assert.deepEqual(person.alumniOf.map(({ name }) => name), completedInstitutions);
  assert.ok(person.alumniOf.every(({ "@type": type }) => type === "EducationalOrganization"));
  assert.doesNotMatch(
    person.alumniOf.map(({ name }) => name).join("\n"),
    /Universidad de la Ciudad de Buenos Aires/,
  );

  assert.equal(website["@type"], "WebSite");
  assert.equal(website["@id"], `${SITE_CONFIG.url}/#website`);
  assert.equal(website.url, person.url);
  assert.equal(website.inLanguage, "es");
  assert.equal(website.author["@id"], person["@id"]);
  assert.equal(new Set(structuredData["@graph"].map(({ "@id": id }) => id)).size, 2);
  assert.doesNotMatch(
    JSON.stringify(structuredData),
    /SearchAction|SoftwareApplication|"@type":"Organization"/,
  );

  const unsafeValue = { text: "</script><script>alert('x')</script>" };
  const serializedUnsafeValue = serializeJsonLd(unsafeValue);
  assert.doesNotMatch(serializedUnsafeValue, /</);
  assert.match(serializedUnsafeValue, /\\u003c\/script>/);
  assert.deepEqual(JSON.parse(serializedUnsafeValue), unsafeValue);
  assert.deepEqual(JSON.parse(serializeJsonLd(structuredData)), structuredData);

  const layout = await readFile("src/app/layout.tsx", "utf8");
  assert.match(layout, /createPortfolioStructuredData\(\)/);
  assert.match(layout, /serializeJsonLd\(structuredData\)/);
  assert.equal((layout.match(/application\/ld\+json/g) ?? []).length, 1);
  assert.doesNotMatch(layout, /const jsonLdPerson|JSON\.stringify\(jsonLdPerson\)/);
});

test("the whole experience card is a native accessible disclosure independent from its link", async () => {
  const exp = EXPERIENCES.find((item) => item.url)!;
  assert.ok(exp);
  assert.equal(nextExpandedExperienceId(null, exp.id), exp.id);
  assert.equal(nextExpandedExperienceId(exp.id, exp.id), null);
  assert.equal(nextExpandedExperienceId(EXPERIENCES[0].id, exp.id), exp.id);

  for (const expanded of [false, true]) {
    const html = renderToStaticMarkup(<ExperienceCard exp={exp} index={0} isExpanded={expanded} onToggle={() => {}} />);
    const buttons = [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g)];
    assert.equal(buttons.length, 1);
    assert.match(buttons[0][0], /class="[^"]*absolute inset-0[^"]*focus-visible:outline-2/);
    assert.doesNotMatch(buttons[0][1], /<(?:a|button)\b/);
    assert.match(html, /<a\b[^>]*href=/);
    assert.match(html, /<a\b[^>]*class="[^"]*pointer-events-auto relative z-20/);
    const controlled = html.match(/aria-controls="([^"]+)"/)?.[1];
    assert.ok(controlled);
    assert.ok(html.includes(`id="${controlled}"`));
    assert.equal(/inert=""/.test(html), !expanded);
    assert.ok(html.includes(`aria-expanded="${expanded}"`));
  }

  const source = await readFile("src/components/about/ExperienceCard.tsx", "utf8");
  assert.doesNotMatch(source, /onKeyDown=/);
  assert.match(source, /pointer-events-none relative z-10/);
  assert.equal([...source.matchAll(/motion-reduce:transition-none/g)].length, 3);
});

test("experience roles are consistent and public technology labels omit versions", () => {
  assert.equal(EXPERIENCES.length, 5);
  assert.deepEqual(
    EXPERIENCES.map(({ company, role }) => [company, role]),
    [
      ["SysPro Consulting", "Full Stack Python Developer"],
      ["Fundación Maldonado", "Full Stack Laravel Developer"],
      ["Solar Banco", "Backend Python Developer"],
      ["Las Verde", "Frontend React Developer"],
      ["Descubriendo Jardín Maternal", "Frontend Developer"],
    ],
  );

  const labels = EXPERIENCES.flatMap(({ mainSkills, skills }) => [...mainSkills, ...skills]);
  assert.ok(labels.includes("Laravel"));
  assert.ok(labels.includes("Django"));
  assert.ok(labels.includes("React"));
  assert.ok(labels.includes("Python"));
  assert.ok(labels.includes("JavaScript"));
  assert.doesNotMatch(labels.join("\n"), /(?:\bDjango|\bLaravel|\bPHP|\bPython|\bReact(?: Router)?|\bJavaScript|\bHTML|\bCSS|\bBootstrap)(?:\.js)?\s*(?:v?\d|ES\d)/i);

  const descriptions = EXPERIENCES.flatMap(({ description }) =>
    Array.isArray(description) ? description : [description],
  ).join("\n");
  assert.doesNotMatch(descriptions, /\b(?:Django|Laravel|PHP|Python|React(?: Router)?|JavaScript|HTML|CSS|Bootstrap)\s*(?:v?\d|ES\d)/i);
  const syspro = EXPERIENCES.find(({ company }) => company === "SysPro Consulting")!;
  assert.ok(Array.isArray(syspro.description));
  assert.equal(syspro.description.length, 4);
  assert.match(syspro.description[0], /plataforma empresarial para la gestión integral/);
  assert.match(syspro.description[1], /coordinación de cargas, gestión de tallys/);
  assert.match(syspro.description[1], /portal público TURNERO_APP/);
  assert.match(syspro.description[2], /desarrollo de Bamby/);
  assert.match(syspro.description[2], /capacidades de integración con inteligencia artificial/);
  assert.match(syspro.description[3], /procesamiento asíncrono/);
  assert.doesNotMatch(syspro.description.join("\n"), /\bRAG\b/i);
  assert.match(descriptions, /visualización web de archivos DICOM/);
  assert.match(descriptions, /liquidez regulatoria, LCR, Value at Risk/);
  assert.match(descriptions, /Firebase y Firestore/);
  assert.match(descriptions, /sitio institucional responsive/);

  const projectLinks = EXPERIENCES.filter(({ url }) => url).map(({ company, url }) => [company, url]);
  assert.deepEqual(projectLinks, [
    ["Las Verde", "https://lasverde.gustavobaranda.com/"],
    ["Descubriendo Jardín Maternal", "https://descubriendo.gustavobaranda.com"],
  ]);
});

test("Descubriendo Jardín keeps its lightweight SVG logo and existing presentation", async () => {
  const [logo, data, card] = await Promise.all([
    readFile("public/images/descubriendo_jardin.svg", "utf8"),
    readFile("src/data/aboutData.ts", "utf8"),
    readFile("src/components/about/ExperienceCard.tsx", "utf8"),
  ]);

  assert.ok(Buffer.byteLength(logo) < 200_000);
  assert.match(logo, /viewBox="0 0 204 193"/);
  assert.match(logo, /<ellipse[^>]+fill="url\(#pattern0\)"/);
  assert.match(logo, /data:image\/jpeg;base64,/);
  assert.match(data, /initials: "\/images\/descubriendo_jardin\.svg"/);
  assert.match(card, /width=\{60\}[\s\S]+height=\{60\}[\s\S]+object-contain w-full h-full/);
});

test("education preserves five ordered static records with consistent academic names", async () => {
  assert.equal(EDUCATION.length, 5);
  assert.deepEqual(
    sortEducationByPeriod(EDUCATION).map(({ title, institution, status, period }) => ({
      title,
      institution,
      status,
      period,
    })),
    [
      {
        title: "Licenciatura en Ciencia de Datos",
        institution: "Universidad de la Ciudad de Buenos Aires (Udelaciudad)",
        status: "En curso",
        period: "Marzo 2026 — Actualidad",
      },
      {
        title: "Técnico Superior en Desarrollo de Software",
        institution: "Instituto de Formación Técnica Superior N°29",
        status: "Finalizado",
        period: "Julio 2023 — Diciembre 2025",
      },
      {
        title: "Tramo de Formación Pedagógica",
        institution: "Universidad FASTA",
        status: "Finalizado",
        period: "Agosto 2024 — Diciembre 2025",
      },
      {
        title: "Python Developer",
        institution: "Education IT",
        status: "Finalizado",
        period: "Agosto 2022 — Diciembre 2022",
      },
      {
        title: "Frontend Developer",
        institution: "Coderhouse",
        status: "Finalizado",
        period: "Diciembre 2021 — Julio 2022",
      },
    ],
  );

  for (const [index, education] of sortEducationByPeriod(EDUCATION).entries()) {
    const html = renderToStaticMarkup(<EducationCard edu={education} index={index} />);
    assert.match(html, /<h3\b/);
    assert.ok(html.includes(education.title));
    assert.ok(html.includes(education.status));
    assert.doesNotMatch(html, /<(?:button|a)\b|aria-expanded=|aria-controls=/);
  }

  const section = await readFile("src/components/about/EducationSection.tsx", "utf8");
  assert.match(section, /Una formación en constante/);
  assert.match(section, />\s*evolución\s*</);
  assert.match(section, /Formación técnica, universitaria y complementaria que acompaña mi desarrollo profesional\./);
  assert.doesNotMatch(section, /Títulos y cursos que sostienen mi trabajo como desarrollador/);
});

test("collapsed technology filters are inert with a named disclosure and selected category", () => {
  const html = renderToStaticMarkup(<ProjectsGrid />);
  assert.match(html, /aria-expanded="false"[^>]*aria-controls="technology-filters"/);
  assert.match(html, /id="technology-filters"[^>]*inert=""[^>]*aria-hidden="true"/);
  assert.match(html, /aria-pressed="true"/);
});

test("biography keeps its disclosure mounted and CTA wrapper retains responsive width prefixes", () => {
  const bio = renderToStaticMarkup(<HeroBio />);
  assert.match(bio, /id="bio-details"[^>]*inert=""[^>]*aria-hidden="true"/);
  assert.match(bio, /aria-expanded="false" aria-controls="bio-details"/);
  const cta = renderToStaticMarkup(<FillButton href="#projects" className="w-[min(100%,20rem)] md:w-auto">Projects</FillButton>);
  assert.match(cta, /class="min-w-0 max-w-full w-\[min\(100%,20rem\)\] md:w-auto"/);
  assert.match(cta, /<a\b[^>]*href="#projects"/);
  assert.doesNotMatch(cta, /<button\b/);
});

test("hero projects CTA is a native hash link with the original fill layers", async () => {
  const page = await readFile("src/app/page.tsx", "utf8");
  const button = await readFile("src/components/hero/fill-button.tsx", "utf8");
  const cta = renderToStaticMarkup(
    <FillButton href="#projects" ariaLabel="Ver proyectos">Proyectos</FillButton>,
  );

  assert.match(page, /<FillButton\s+href="#projects"/);
  assert.match(page, /<section id="projects"/);
  assert.match(cta, /<a\b/);
  assert.match(cta, /href="#projects"/);
  assert.match(cta, /aria-label="Ver proyectos"/);
  assert.doesNotMatch(button, /preventDefault|onPointerDown|onClick|useState|isFilled/);
  assert.match(button, /before:duration-500/);
  assert.match(button, /before:ease-out/);
  assert.match(button, /hover:before:w-full focus-visible:before:w-full active:before:w-full/);
  assert.match(button, /before:pointer-events-none/);
  assert.match(button, /motion-reduce:before:transition-none/);
  assert.match(button, /relative z-10/);
});

test("hero and biography communicate the backend-focused Python positioning", async () => {
  const page = await readFile("src/app/page.tsx", "utf8");
  assert.match(page, /text="Full Stack Python Developer"/);
  assert.match(page, /Desarrollo software que conecta negocios, tecnología y datos\./);
  assert.match(page, /Especializado en backend con Python, Django y SQL Server\./);
  assert.match(page, /soluciones Full Stack para logística, servicios financieros y medicina laboral/);
  assert.match(page, /proyectos open source como chatflow-agent/);
  assert.doesNotMatch(page, /Transformo ideas en soluciones digitales con código y diseño/);

  const bio = renderToStaticMarkup(<HeroBio />);
  assert.match(bio, /Técnico Superior en Desarrollo de Software/);
  assert.match(bio, /Licenciatura en Ciencia de Datos/);
  assert.match(bio, /backend con Python, Django y SQL Server/);
  assert.match(bio, /reglas de negocio, bases de datos relacionales/);
  assert.match(bio, /logística y depósitos fiscales, servicios financieros/);
  assert.match(bio, /chatflow-agent/);
  assert.match(bio, /creador y mantenedor/);
  assert.match(bio, /mantenible, escalable y fácil de evolucionar/);
  assert.match(bio, /aprendizaje continuo, el trabajo en equipo y la comunicación clara/);
  assert.doesNotMatch(bio, /Licenciatura en Ciencias de Datos/);
});

test("the five main section headings share hierarchy, copy and highlighted words", async () => {
  const about = renderToStaticMarkup(<HeroBio />);
  const experience = renderToStaticMarkup(<ExperienceSection />);
  const education = renderToStaticMarkup(<EducationSection />);
  const page = await readFile("src/app/page.tsx", "utf8");

  for (const html of [about, experience, education]) {
    assert.equal([...html.matchAll(/<h2\b/g)].length, 1);
    assert.match(html, /<header\b/);
    assert.match(html, /text-3xl sm:text-4xl md:text-5xl/);
    assert.match(html, /leading-tight tracking-tight/);
  }

  assert.match(about, /Construyendo el puente entre el/);
  assert.match(about, />código<\/span>/);
  assert.match(about, />datos<\/span>/);
  assert.match(about, /id="about-section-subtitle"/);
  assert.match(about, /Desarrollo soluciones donde la lógica de negocio/);

  assert.match(experience, /Desarrollando/);
  assert.match(experience, />soluciones<\/span>/);
  assert.match(experience, /para desafíos reales\./);
  assert.match(experience, /Mi recorrido desarrollando aplicaciones empresariales, integraciones y soluciones digitales\./);

  assert.match(education, /Una formación en constante/);
  assert.match(education, />evolución<\/span>/);
  assert.match(education, /Formación técnica, universitaria y complementaria que acompaña mi desarrollo profesional\./);

  assert.match(page, /Proyectos que convierten/);
  assert.match(page, />\s*ideas\s*</);
  assert.match(page, /en soluciones\./);
  assert.match(page, /Una selección de desarrollos empresariales, aplicaciones web y proyectos open source\./);
  assert.match(page, /<header className="max-w-3xl space-y-3 sm:space-y-4">/);
  assert.doesNotMatch(page, /Proyectos Destacados|Casos de estudio reales/);
  assert.match(page, /¿Tenés un proyecto en mente\?/);
  assert.match(page, />\s*Hablemos\.\s*</);
  assert.match(page, /Estoy disponible para conversar sobre oportunidades laborales, colaboraciones y proyectos de desarrollo de software\./);
  assert.doesNotMatch(page, /¿Tienes una idea o proyecto\?|Envíame un mensaje/);
  assert.match(page, /<ContactForm \/>/);
  assert.match(page, /<ContactInfo \/>/);
  assert.match(page, /grid min-w-0 grid-cols-1 gap-6 items-stretch lg:grid-cols-2/);

  const sources = [
    await readFile("src/components/about/HeroBio.tsx", "utf8"),
    await readFile("src/components/about/ExperienceSection.tsx", "utf8"),
    await readFile("src/components/about/EducationSection.tsx", "utf8"),
    page,
  ].join("\n");
  assert.ok((sources.match(/from-violet-600 via-indigo-600 to-blue-600/g) ?? []).length >= 5);
  assert.ok((sources.match(/dark:from-violet-400 dark:via-indigo-400 dark:to-blue-400/g) ?? []).length >= 5);
});

test("contact cards can shrink within the mobile grid without clipping", async () => {
  const [page, form, info] = await Promise.all([
    readFile("src/app/page.tsx", "utf8"),
    readFile("src/components/contact/ContactForm.tsx", "utf8"),
    readFile("src/components/contact/ContactInfo.tsx", "utf8"),
  ]);

  assert.match(page, /grid min-w-0 grid-cols-1 gap-6 items-stretch lg:grid-cols-2/);
  assert.match(form, /className="min-w-0 w-full rounded-\[0\.35rem\]/);
  assert.match(info, /className="min-w-0 w-full rounded-\[0\.35rem\]/);
  assert.match(info, /inline-flex w-fit max-w-full/);
  assert.match(info, /<span className="min-w-0">Disponible para nuevas oportunidades<\/span>/);
});

test("editable contact controls keep a zoom-safe font size", async () => {
  const form = await readFile("src/components/contact/ContactForm.tsx", "utf8");

  assert.equal((form.match(/px-3\.5 py-2\.5 text-base/g) ?? []).length, 4);
  assert.doesNotMatch(form, /px-3\.5 py-2\.5 text-xs sm:text-sm/);
});

test("project disclosure keeps one mounted detail region and animates a reversible height", async () => {
  const project = PROJECTS.find((item) => item.solution.length > 160)!;
  const target = `project-solution-${project.id}`;
  for (const expanded of [false, true]) {
    const html = renderToStaticMarkup(
      <ProjectCard project={project} index={0} expanded={expanded} />,
    );
    assert.ok(html.includes(`id="${target}"`));
    assert.ok(html.includes(`aria-controls="${target}"`));
    assert.ok(html.includes(`aria-expanded="${expanded}"`));
    assert.ok(html.includes(`aria-hidden="${!expanded}"`));
  }

  const split = splitProjectSolution(project.solution);
  assert.ok(split.summary.length > 0);
  assert.ok(split.detail.length > 0);
  assert.equal(`${split.summary} ${split.detail}`, project.solution);

  const source = await readFile("src/components/projects/ProjectCard.tsx", "utf8");
  assert.match(source, /height: isExpanded \? "auto" : 0/);
  assert.match(source, /duration: reducedMotion \? 0 : 0\.36/);
  assert.match(source, /duration: reducedMotion \? 0 : 0\.22/);
  assert.match(source, /will-change-\[height,opacity\]/);
  assert.doesNotMatch(source, /mode="popLayout"|layout="size"|setTimeout/);
});

test("project rows derive closed alignment per block and keep mobile and odd rows natural", async () => {
  const grid = renderToStaticMarkup(<ProjectsGrid />);
  const gridSource = await readFile("src/components/projects/ProjectsGrid.tsx", "utf8");
  const cardSource = await readFile("src/components/projects/ProjectCard.tsx", "utf8");

  const shortCard = {
    meta: 28,
    heading: 62,
    challenge: 104,
    solution: 88,
    control: 30,
    stack: 76,
    footer: 42,
  };
  const longCard = {
    meta: 34,
    heading: 98,
    challenge: 182,
    solution: 116,
    control: 34,
    stack: 112,
    footer: 50,
  };
  assert.deepEqual(
    getProjectRowBlockMinHeights([shortCard, longCard], true),
    longCard,
  );
  assert.deepEqual(getProjectRowBlockMinHeights([shortCard, longCard], false), {});
  assert.deepEqual(getProjectRowBlockMinHeights([longCard], true), {});

  const djangoProjects = filterProjects(sortProjectsByPriority(PROJECTS), "all", {
    id: "django",
    label: "Django",
    aliases: ["django"],
  });
  const djangoRows = groupProjectsIntoRows(djangoProjects);
  assert.equal(djangoProjects.length, 3);
  assert.deepEqual(djangoRows.map((row) => row.length), [2, 1]);
  assert.deepEqual(getProjectRowBlockMinHeights([shortCard], true), {});

  assert.equal(
    [...grid.matchAll(/grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start/g)].length,
    5,
  );
  assert.deepEqual(PROJECT_CARD_BLOCKS, [
    "meta",
    "heading",
    "challenge",
    "solution",
    "control",
    "stack",
    "footer",
  ]);
  assert.match(gridSource, /getBoundingClientRect\(\)\.height/);
  assert.match(gridSource, /--project-row-\$\{block\}/);
  assert.match(gridSource, /window\.matchMedia\("\(min-width: 768px\)"\)/);
  assert.match(gridSource, /useLayoutEffect/);
  assert.match(cardSource, /minHeight: `var\(--project-row-\$\{block\}\)`/);
  assert.match(cardSource, /group relative self-start flex flex-col/);
  assert.match(cardSource, /equalizeHeight \? "md:h-full md:self-stretch" : ""/);
  assert.doesNotMatch(`${gridSource}\n${cardSource}`, /ResizeObserver|setTimeout|grid-rows-subgrid|row-span-3/);
  assert.doesNotMatch(cardSource, /min-h-\[(?:\d|\d+px)/);
  assert.doesNotMatch(cardSource, /min-h-20|sm:min-h-22|closedMinHeight/);
});

test("project rows equalize exterior height only when both cards are expanded", () => {
  const pair = [
    { id: "syspro-logistica" },
    { id: "chatflow-agent" },
  ];
  const empty = new Set<string>();
  const firstExpanded = updateExpandedProjectIds(empty, "syspro-logistica", true);
  const bothExpanded = updateExpandedProjectIds(firstExpanded, "chatflow-agent", true);
  const secondOnly = updateExpandedProjectIds(bothExpanded, "syspro-logistica", false);

  assert.deepEqual([...empty], []);
  assert.deepEqual([...firstExpanded], ["syspro-logistica"]);
  assert.deepEqual([...bothExpanded], ["syspro-logistica", "chatflow-agent"]);
  assert.deepEqual([...secondOnly], ["chatflow-agent"]);
  assert.equal(shouldEqualizeProjectRow(pair, empty), false);
  assert.equal(shouldEqualizeProjectRow(pair, firstExpanded), false);
  assert.equal(shouldEqualizeProjectRow(pair, secondOnly), false);
  assert.equal(shouldEqualizeProjectRow(pair, bothExpanded), true);
  assert.equal(shouldEqualizeProjectRow(pair.slice(0, 1), bothExpanded), false);

  const closedCard = renderToStaticMarkup(
    <ProjectCard project={PROJECTS[0]} index={0} expanded={false} equalizeHeight={false} />,
  );
  const independentlyExpandedCard = renderToStaticMarkup(
    <ProjectCard project={PROJECTS[0]} index={0} expanded equalizeHeight={false} />,
  );
  const equalizedCard = renderToStaticMarkup(
    <ProjectCard project={PROJECTS[0]} index={0} expanded equalizeHeight />,
  );

  for (const naturalCard of [closedCard, independentlyExpandedCard]) {
    assert.match(naturalCard, /self-start/);
    assert.doesNotMatch(naturalCard, /md:h-full|md:self-stretch/);
  }
  assert.match(equalizedCard, /self-start[^\"]*md:h-full md:self-stretch/);
});

test("projects prioritize professional relevance and keep category and technology filters", () => {
  assert.equal(PROJECTS.length, 10);
  assert.equal(new Set(PROJECTS.map(({ id }) => id)).size, PROJECTS.length);
  const originalProjectIds = [
    "syspro-logistica",
    "mhine-home",
    "gusflow-kanban",
    "fundacion-medicina",
    "weatherflow-api",
    "solar-banco-etl",
    "portfolio-personal",
    "las-verde-ecommerce",
    "maternal-descubriendo",
  ];
  assert.ok(originalProjectIds.every((id) => PROJECTS.some((project) => project.id === id)));
  assert.ok(
    PROJECTS.every(({ category }) =>
      ["full-stack", "apis", "opensource"].includes(category),
    ),
  );
  const sorted = sortProjectsByPriority(PROJECTS);
  assert.deepEqual(
    sorted.slice(0, 4).map(({ id }) => id),
    ["syspro-logistica", "chatflow-agent", "solar-banco-etl", "fundacion-medicina"],
  );
  assert.equal(new Set(PROJECTS.map(({ priority }) => priority)).size, PROJECTS.length);

  assert.ok(filterProjects(sorted, "all", null).length === 10);
  assert.ok(filterProjects(sorted, "opensource", null).some(({ id }) => id === "chatflow-agent"));
  assert.ok(
    filterProjects(sorted, "all", {
      id: "python",
      label: "Python",
      aliases: ["python", "pytest"],
    }).some(({ id }) => id === "chatflow-agent"),
  );
  assert.ok(filterProjects(sorted, "all", "SQLite").some(({ id }) => id === "chatflow-agent"));
});

test("chatflow-agent uses verified public claims and project labels omit framework versions", () => {
  const chatflow = PROJECTS.find(({ id }) => id === "chatflow-agent")!;
  assert.equal(chatflow.company, "Open Source · Creador y mantenedor");
  assert.equal(chatflow.githubUrl, "https://github.com/GustavoBaranda/chatflow-agent");
  assert.equal(chatflow.image, null);
  assert.match(chatflow.solution, /librería Python open source/);
  assert.match(chatflow.solution, /ejecución asíncrona/);
  assert.match(chatflow.solution, /handoffs entre agentes/);
  assert.match(chatflow.solution, /CLI, webhooks, WhatsApp y Telegram/);
  assert.match(chatflow.solution, /controles de concurrencia/);
  assert.match(chatflow.solution, /revisión de contribuciones/);
  assert.doesNotMatch(`${chatflow.challenge} ${chatflow.solution}`, /\bRAG\b|producción|enterprise/i);
  const html = renderToStaticMarkup(<ProjectCard project={chatflow} index={0} />);
  assert.match(html, /href="https:\/\/github\.com\/GustavoBaranda\/chatflow-agent"/);
  assert.match(html, /aria-controls="project-solution-chatflow-agent"/);

  const publicCopy = PROJECTS.flatMap(({ solution, tags }) => [solution, ...tags]).join("\n");
  assert.doesNotMatch(
    publicCopy,
    /\b(?:Next\.js|React|Django|Laravel|PHP|Python|React Router|JavaScript|HTML|CSS|Bootstrap|Tailwind CSS|NextAuth)\s*(?:v?\d|ES\d)/i,
  );
  assert.match(publicCopy, /OpenAPI 3/);
});

test("the three highlighted project narratives are precise and balanced", () => {
  const syspro = PROJECTS.find(({ id }) => id === "syspro-logistica")!;
  const chatflow = PROJECTS.find(({ id }) => id === "chatflow-agent")!;
  const portfolio = PROJECTS.find(({ id }) => id === "portfolio-personal")!;

  assert.match(syspro.challenge, /turnos, documentación y movimientos de mercadería/);
  assert.match(syspro.solution, /participo en el diseño, la implementación y la integración/);
  assert.match(syspro.solution, /turnero público/);
  assert.match(syspro.solution, /procesamiento asíncrono y comunicación en tiempo real/);
  assert.doesNotMatch(syspro.solution, /diseñé e implementé la arquitectura|pyHanko|Huawei Cloud|ReportLab/);

  assert.match(chatflow.challenge, /separar la lógica de negocio de los proveedores/);
  assert.match(chatflow.solution, /creador y responsable técnico/);
  assert.doesNotMatch(`${chatflow.challenge} ${chatflow.solution}`, /\bframework\b/i);

  assert.match(portfolio.challenge, /presencia profesional/);
  assert.match(portfolio.challenge, /clara, accesible y adaptable/);
  assert.match(portfolio.solution, /arquitectura de componentes reutilizables/);
  assert.match(portfolio.solution, /diseño responsive/);
  assert.doesNotMatch(`${portfolio.challenge} ${portfolio.solution}`, /Lighthouse|\b100\b|altamente escalable/i);

  for (const project of [syspro, chatflow, portfolio]) {
    assert.ok(project.challenge.length >= 140 && project.challenge.length <= 260);
    assert.ok(project.solution.length >= 250 && project.solution.length <= 500);
  }
});

test("project media uses responsive reserved ratios and content-safe presentation variants", async () => {
  const presentations = new Set(PROJECTS.map((project) => project.imagePresentation));
  assert.deepEqual(presentations, new Set(["interface", "wide-logo", "square-logo"]));

  for (const project of PROJECTS) {
    const html = renderToStaticMarkup(<ProjectCard project={project} index={0} />);
    assert.match(html, /aspect-video sm:aspect-\[2\/1\]/);
    if (project.image) {
      assert.match(html, /object-contain/);
      assert.match(html, /sizes="\(max-width: 768px\) 100vw, \(max-width: 1200px\) 50vw, 600px"/);
      if (project.imagePresentation === "interface") assert.match(html, /object-contain object-top/);
      else assert.match(html, /object-contain object-center/);
    } else {
      assert.match(html, /role="img"/);
      assert.match(html, /Open Source/);
      assert.match(html, /chatflow-agent/);
      assert.doesNotMatch(html, /<img\b/);
    }
  }

  const source = await readFile("src/components/projects/ProjectCard.tsx", "utf8");
  assert.doesNotMatch(source, /object-cover/);
  assert.doesNotMatch(source, /\bh-44\b|\bh-52\b|\bh-56\b/);
  assert.match(source, /satisfies Record<ProjectItem\["imagePresentation"\], string>/);
});

test("project links avoid persistent underlines and retain hover and focus affordances", async () => {
  const project = PROJECTS.find(({ demoUrl, githubUrl }) => demoUrl && githubUrl)!;
  const html = renderToStaticMarkup(<ProjectCard project={project} index={0} />);
  const source = await readFile("src/components/projects/ProjectCard.tsx", "utf8");

  assert.equal((source.match(/no-underline/g) ?? []).length, 2);
  assert.doesNotMatch(source, /hover:underline|underline-offset/);
  assert.match(source, /hover:text-indigo-800 dark:hover:text-indigo-300/);
  assert.match(source, /text-muted hover:text-foreground/);
  assert.ok((source.match(/focus-visible:ring-2 focus-visible:ring-indigo-500/g) ?? []).length >= 2);
  assert.ok((source.match(/group-hover\/(?:link|github):translate-x-0\.5/g) ?? []).length >= 2);
  assert.ok(html.includes(`href="${project.demoUrl}"`));
  assert.ok(html.includes(`href="${project.githubUrl}"`));
  assert.equal((html.match(/target="_blank"/g) ?? []).length, 2);
});


test("mobile trigger exposes its dialog relationship and toggle state", () => {
  for (const active of [false, true]) {
    const html = renderToStaticMarkup(<Menu active={active} setActive={() => {}} />);
    assert.match(html, /type="button"/);
    assert.match(html, /aria-controls="mobile-navigation"/);
    assert.match(html, /aria-haspopup="dialog"/);
    assert.ok(html.includes(`aria-expanded="${active}"`));
    assert.equal([...html.matchAll(/<span\b/g)].length, 3);
    assert.doesNotMatch(html, /<svg\b/);
  }
  assert.match(renderToStaticMarkup(<ThemeToggle />), /aria-label="Cambiar tema"/);
});

test("mobile drawer does not introduce a second close button or independent X", () => {
  const html = renderToStaticMarkup(<BurgerMenuMobile updateMenu={() => {}} />);
  assert.doesNotMatch(html, /aria-label="Cerrar menú"/);
  assert.doesNotMatch(html, /menu-close|✕/);
});

test("hamburger preserves the original three-line Motion keyframes and half-second easing", async () => {
  const source = ts.createSourceFile("Menu.tsx", await readFile("src/components/header/Menu.tsx", "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const variants: unknown[] = [];
  const value = (node: ts.Expression): unknown => {
    if (ts.isStringLiteral(node)) return node.text;
    if (ts.isArrayLiteralExpression(node)) return node.elements.map((item) => value(item as ts.Expression));
    if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map((property) => {
      assert.ok(ts.isPropertyAssignment(property));
      return [property.name.getText(source), value(property.initializer)];
    }));
    assert.fail(`Unexpected keyframe syntax: ${node.getText(source)}`);
  };
  const visit = (node: ts.Node) => {
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(source) === "motion.span") {
      const attribute = node.attributes.properties.find((item) => ts.isJsxAttribute(item) && item.name.getText(source) === "variants");
      assert.ok(attribute && ts.isJsxAttribute(attribute) && attribute.initializer && ts.isJsxExpression(attribute.initializer) && attribute.initializer.expression);
      variants.push(value(attribute.initializer.expression));
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  assert.deepEqual(variants, [
    { open: { rotate: ["0deg", "0deg", "45deg"], top: ["35%", "50%", "50%"] }, closed: { rotate: ["45deg", "0deg", "0deg"], top: ["50%", "50%", "35%"] } },
    { open: { rotate: ["0deg", "0deg", "-45deg"] }, closed: { rotate: ["-45deg", "0deg", "0deg"] } },
    { open: { rotate: ["0deg", "0deg", "-45deg"], left: "calc(50% - 10px)", bottom: ["35%", "50%", "50%"] }, closed: { rotate: ["-45deg", "0deg", "0deg"], left: "calc(50% - 5px)", bottom: ["50%", "50%", "35%"] } },
  ]);
  assert.match(source.text, /duration: reducedMotion \? 0 : 0\.5/);
  assert.match(source.text, /ease: "easeInOut"/);
});

test("dialog closes after exit and a quick reopen cancels that close", () => {
  let closes = 0;
  const dialog = { open: true, close() { this.open = false; closes++; } };
  assert.equal(closeNavigationDialogAfterExit(dialog, true), false);
  assert.equal(dialog.open, true);
  assert.equal(closes, 0);
  assert.equal(closeNavigationDialogAfterExit(dialog, false), true);
  assert.equal(dialog.open, false);
  assert.equal(closes, 1);
  assert.equal(closeNavigationDialogAfterExit(dialog, false), true);
  assert.equal(closes, 1);
});

test("mobile drawer restores original entrance, exit and item timing", async () => {
  const animation = await readFile("src/components/header/Animation.ts", "utf8");
  assert.equal([...animation.matchAll(/duration: 0\.8/g)].length, 4);
  assert.equal([...animation.matchAll(/delay: 0\.05 \* i/g)].length, 2);
  const header = await readFile("src/components/header/index.tsx", "utf8");
  assert.match(header, /onExitComplete=\{finishMenuClose\}/);
  assert.match(header, /event\.preventDefault\(\); closeMenu\(\)/);
  assert.match(header, /closeNavigationDialogAfterExit\(dialog, activeRef\.current\)/);
});
