import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import ContactInfo from "../components/contact/ContactInfo";
import ExternalRecognition from "../components/projects/ExternalRecognition";
import ProjectCard from "../components/projects/ProjectCard";
import { GITHUB_SPONSORS } from "../config/openSource";
import { XERJ_RECOGNITION } from "../config/recognition";
import { getProjects } from "../data/projectsData";
import { LocaleProvider } from "../i18n/LocaleProvider";
import { getDictionary } from "../i18n/dictionaries";

function withLocale(locale: "es-AR" | "en", children: ReactNode) {
  return (
    <LocaleProvider locale={locale} dictionary={getDictionary(locale)}>
      {children}
    </LocaleProvider>
  );
}

test("chatflow-agent is clearly presented as owned open-source work in both languages", () => {
  const spanish = getProjects("es-AR").find(({ id }) => id === "chatflow-agent")!;
  const english = getProjects("en").find(({ id }) => id === "chatflow-agent")!;

  assert.equal(spanish.githubUrl, "https://github.com/GustavoBaranda/chatflow-agent");
  assert.equal(english.githubUrl, spanish.githubUrl);
  assert.equal(spanish.packageUrl, "https://pypi.org/project/chatflow-agent/");
  assert.equal(english.packageUrl, spanish.packageUrl);
  assert.equal(spanish.documentationUrl, "https://chatflowagent.org/es/docs");
  assert.equal(english.documentationUrl, "https://chatflowagent.org/en/docs");
  assert.match(spanish.company, /Creador y mantenedor/);
  assert.match(english.company, /Creator and maintainer/);
  assert.match(spanish.solution, /open source y async-first/);
  assert.match(english.solution, /open-source, async-first/);
  assert.match(spanish.solution, /distribución en PyPI, releases, pruebas/);
  assert.match(english.solution, /PyPI distribution, releases, testing/);
  assert.doesNotMatch(`${spanish.solution} ${english.solution}`, /\bRAG\b|usuarios|downloads|production-ready|enterprise-grade/i);
});

test("the documentation platform uses localized routes and its verified public repository", () => {
  const spanish = getProjects("es-AR").find(({ id }) => id === "chatflow-agent-docs")!;
  const english = getProjects("en").find(({ id }) => id === "chatflow-agent-docs")!;

  assert.equal(spanish.priority, 3);
  assert.equal(english.priority, 3);
  assert.equal(spanish.githubUrl, "https://github.com/GustavoBaranda/chatflow-agent-web");
  assert.equal(english.githubUrl, spanish.githubUrl);
  assert.equal(spanish.demoUrl, "https://chatflowagent.org/es");
  assert.equal(english.demoUrl, "https://chatflowagent.org/en");
  assert.equal(spanish.documentationUrl, null);
  assert.equal(english.documentationUrl, null);
  assert.match(spanish.solution, /castellano, inglés y portugués/);
  assert.match(english.solution, /Spanish, English, and Brazilian Portuguese/);
  assert.match(spanish.solution, /Fumadocs y MDX/);
  assert.match(english.solution, /Fumadocs, and MDX/);
  assert.match(spanish.imageAlt!, /navegación lateral/);
  assert.match(english.imageAlt!, /sidebar navigation/);

  const spanishHtml = renderToStaticMarkup(withLocale("es-AR", <ProjectCard project={spanish} index={0} />));
  const englishHtml = renderToStaticMarkup(withLocale("en", <ProjectCard project={english} index={0} />));
  assert.match(spanishHtml, /href="https:\/\/chatflowagent\.org\/es"/);
  assert.match(spanishHtml, /Ver plataforma/);
  assert.match(englishHtml, /href="https:\/\/chatflowagent\.org\/en"/);
  assert.match(englishHtml, /View platform/);
  for (const html of [spanishHtml, englishHtml]) {
    assert.match(html, /href="https:\/\/github\.com\/GustavoBaranda\/chatflow-agent-web"/);
    assert.doesNotMatch(html, /chatflowagent\.org\/(?:es|en)\/docs/);
    assert.doesNotMatch(html, /href="https:\/\/github\.com\/GustavoBaranda\/chatflow-agent"(?:"|\/)/);
  }
});

test("XERJ is represented as external recognition of one Portfolio commit", () => {
  assert.equal(XERJ_RECOGNITION.recognizedProjectId, "portfolio-personal");
  assert.equal(XERJ_RECOGNITION.status, "license-review-pending");
  assert.equal(XERJ_RECOGNITION.selectedCommit, "0de85332b1304e04a490b8cd4b6d133be58e28a4");

  const spanish = renderToStaticMarkup(withLocale("es-AR", <ExternalRecognition />));
  const english = renderToStaticMarkup(withLocale("en", <ExternalRecognition />));
  for (const html of [spanish, english]) {
    assert.match(html, /href="https:\/\/hub\.xerj\.org\/contributors\/GustavoBaranda"/);
    assert.match(html, /href="https:\/\/github\.com\/GustavoBaranda\/Portfolio\/commit\/0de85332/);
    assert.match(html, /<aside[^>]+aria-labelledby="external-recognition-title"/);
    assert.match(html, /rel="noopener noreferrer"/);
    assert.match(html, /max-w-3xl text-sm leading-relaxed/);
    assert.match(html, /mt-4 flex flex-wrap gap-2/);
    assert.match(html, /mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between/);
    assert.equal((html.match(/rounded-sm border border-soft px-2\.5 py-1 text-xs/g) ?? []).length, 5);
    assert.doesNotMatch(html, /<dl\b|<section\b|<ul\b|<li\b|grid-cols|border-l/);
    assert.doesNotMatch(html, /employer|empleador|employee|contractor|proyecto propio de XERJ/i);
  }
  assert.match(spanish, /Reconocimiento Open Source/);
  assert.match(spanish, /Portfolio seleccionado por XERJ Corpus Hub/);
  assert.match(spanish, /El trabajo se centra en mejorar la seguridad, accesibilidad y confiabilidad del sistema de contacto/);
  for (const area of ["Seguridad", "Validación de datos", "Accesibilidad", "Manejo de errores", "Confiabilidad"]) {
    assert.match(spanish, new RegExp(`>${area}<`));
  }
  assert.match(spanish, /Selección en revisión de licencia\./);
  assert.ok(spanish.indexOf("Ver contribución") < spanish.indexOf("Selección en revisión de licencia."));
  assert.match(english, /Open Source Recognition/);
  assert.match(english, /Portfolio Selected by XERJ Corpus Hub/);
  assert.match(english, /The work focuses on improving the security, accessibility, and reliability of the contact system/);
  for (const area of ["Security", "Data validation", "Accessibility", "Error handling", "Reliability"]) {
    assert.match(english, new RegExp(`>${area}<`));
  }
  assert.match(english, /Selection pending license review\./);
  assert.ok(english.indexOf("View contribution") < english.indexOf("Selection pending license review."));
});

test("professional contact paths are equivalent, semantic and responsive", () => {
  const spanish = renderToStaticMarkup(withLocale("es-AR", <ContactInfo />));
  const english = renderToStaticMarkup(withLocale("en", <ContactInfo />));

  assert.match(spanish, /Oportunidades laborales/);
  assert.match(spanish, /Freelance y consultoría/);
  assert.match(spanish, /Colaboración open source/);
  assert.match(english, /Employment opportunities/);
  assert.match(english, /Freelance &amp; consulting/);
  assert.match(english, /Open-source collaboration/);
  for (const html of [spanish, english]) {
    assert.match(html, /<ul[^>]+aria-label=/);
    assert.equal((html.match(/<li\b/g) ?? []).length, 3);
    assert.match(html, /grid grid-cols-1 gap-2/);
    assert.match(html, /href="mailto:baranda\.gustavo@gmail\.com"/);
  }
});

test("GitHub Sponsors stays hidden while approval is pending and is config-driven", async () => {
  assert.equal(GITHUB_SPONSORS.status, "pending-approval");
  assert.equal(GITHUB_SPONSORS.enabled, false);
  assert.equal(GITHUB_SPONSORS.projectId, "chatflow-agent");
  assert.equal(GITHUB_SPONSORS.url, "https://github.com/sponsors/GustavoBaranda");

  for (const locale of ["es-AR", "en"] as const) {
    const chatflow = getProjects(locale).find(({ id }) => id === "chatflow-agent")!;
    const html = renderToStaticMarkup(withLocale(locale, <ProjectCard project={chatflow} index={0} />));
    assert.doesNotMatch(html, /github\.com\/sponsors\/GustavoBaranda/);
    assert.doesNotMatch(html, /Support maintenance|Apoyar el mantenimiento/);
  }

  const source = await readFile("src/components/projects/ProjectCard.tsx", "utf8");
  assert.match(source, /GITHUB_SPONSORS\.enabled && project\.id === GITHUB_SPONSORS\.projectId/);
  assert.match(source, /href=\{GITHUB_SPONSORS\.url\}/);
  assert.match(source, /dictionary\.projects\.card\.sponsorDescription/);
});
