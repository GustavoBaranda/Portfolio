import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import ts from "typescript";
import { renderToStaticMarkup } from "react-dom/server";
import ExperienceCard from "../components/about/ExperienceCard";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import Menu from "../components/header/Menu";
import BurgerMenuMobile from "../components/header/BurgerMenuMobile";
import ThemeToggle from "../components/common/ThemeToggle";
import HeroBio from "../components/about/HeroBio";
import ProjectCard from "../components/projects/ProjectCard";
import { FillButton } from "../components/hero/fill-button";
import { EXPERIENCES } from "../data/aboutData";
import { PROJECTS } from "../data/projectsData";
import { closeNavigationDialogAfterExit } from "./navigation-dialog";

test("experience disclosure keeps the project link outside its button and hides collapsed content", () => {
  const exp = EXPERIENCES.find((item) => item.url)!;
  assert.ok(exp);
  for (const expanded of [false, true]) {
    const html = renderToStaticMarkup(<ExperienceCard exp={exp} index={0} isExpanded={expanded} onToggle={() => {}} />);
    const buttons = [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g)];
    assert.equal(buttons.length, 1);
    assert.doesNotMatch(buttons[0][1], /<(?:a|button)\b/);
    assert.match(html, /<a\b[^>]*href=/);
    const controlled = html.match(/aria-controls="([^"]+)"/)?.[1];
    assert.ok(controlled);
    assert.ok(html.includes(`id="${controlled}"`));
    assert.equal(/inert=""/.test(html), !expanded);
    assert.ok(html.includes(`aria-expanded="${expanded}"`));
  }
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
  const cta = renderToStaticMarkup(<FillButton href="/#projects" className="w-[min(100%,20rem)] md:w-auto">Projects</FillButton>);
  assert.match(cta, /class="min-w-0 max-w-full w-\[min\(100%,20rem\)\] md:w-auto"/);
  assert.doesNotMatch(cta, /<button\b/);
});

test("project disclosure keeps an accessible target and animates size without abrupt unmounting", async () => {
  const project = PROJECTS.find((item) => item.solution.length > 160)!;
  const html = renderToStaticMarkup(<ProjectCard project={project} index={0} />);
  const target = `project-solution-${project.id}`;
  assert.ok(html.includes(`id="${target}"`));
  assert.ok(html.includes(`aria-controls="${target}"`));
  assert.match(html, /aria-expanded="false"/);

  const source = await readFile("src/components/projects/ProjectCard.tsx", "utf8");
  assert.match(source, /layout="size"/);
  assert.match(source, /mode="popLayout"/);
  assert.match(source, /duration: reducedMotion \? 0 : 0\.32/);
  assert.match(source, /duration: reducedMotion \? 0 : 0\.24/);
  assert.match(source, /className="overflow-hidden"/);
});

test("project media uses responsive reserved ratios and content-safe presentation variants", async () => {
  const presentations = new Set(PROJECTS.map((project) => project.imagePresentation));
  assert.deepEqual(presentations, new Set(["interface", "wide-logo", "square-logo"]));

  for (const project of PROJECTS) {
    const html = renderToStaticMarkup(<ProjectCard project={project} index={0} />);
    assert.match(html, /aspect-video sm:aspect-\[2\/1\]/);
    assert.match(html, /object-contain/);
    assert.match(html, /sizes="\(max-width: 768px\) 100vw, \(max-width: 1200px\) 50vw, 600px"/);
    if (project.imagePresentation === "interface") assert.match(html, /object-contain object-top/);
    else assert.match(html, /object-contain object-center/);
  }

  const source = await readFile("src/components/projects/ProjectCard.tsx", "utf8");
  assert.doesNotMatch(source, /object-cover/);
  assert.doesNotMatch(source, /\bh-44\b|\bh-52\b|\bh-56\b/);
  assert.match(source, /satisfies Record<ProjectItem\["imagePresentation"\], string>/);
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
