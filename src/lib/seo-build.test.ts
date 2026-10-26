import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";

const readBuildFile = (path: string) => readFile(`.next/server/app/${path}`, "utf8");

function assertSingle(html: string, pattern: RegExp, message: string) {
  assert.equal(html.match(pattern)?.length ?? 0, 1, message);
}

function parseJsonLd(html: string) {
  const value = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(value, "The production HTML must contain one JSON-LD script");
  return JSON.parse(value) as {
    "@graph": Array<{ "@type": string; url: string; inLanguage?: string }>;
  };
}

test("production HTML contains self-canonicals, reciprocal hreflang and localized social metadata", async () => {
  const [spanish, english] = await Promise.all([
    readBuildFile("index.html"),
    readBuildFile("en.html"),
  ]);

  // Next.js serializes an origin-only URL without its equivalent trailing slash.
  assertSingle(spanish, /<link rel="canonical" href="https:\/\/gustavobaranda\.com"\/>/g, "Spanish must have one self-canonical");
  assertSingle(english, /<link rel="canonical" href="https:\/\/gustavobaranda\.com\/en"\/>/g, "English must have one self-canonical");

  for (const html of [spanish, english]) {
    assertSingle(html, /<link rel="alternate" hrefLang="es-AR" href="https:\/\/gustavobaranda\.com"\/>/g, "Missing es-AR alternate");
    assertSingle(html, /<link rel="alternate" hrefLang="en" href="https:\/\/gustavobaranda\.com\/en"\/>/g, "Missing en alternate");
    assertSingle(html, /<link rel="alternate" hrefLang="x-default" href="https:\/\/gustavobaranda\.com"\/>/g, "Missing x-default alternate");
    assert.match(html, /<meta name="robots" content="index, follow"\/>/);
  }

  assert.match(spanish, /<meta property="og:locale" content="es_AR"\/>/);
  assert.match(spanish, /<meta property="og:locale:alternate" content="en_US"\/>/);
  assert.match(english, /<meta property="og:locale" content="en_US"\/>/);
  assert.match(english, /<meta property="og:locale:alternate" content="es_AR"\/>/);
  assert.match(spanish, /<meta property="og:image:alt" content="Portfolio de Gustavo Baranda — Full Stack Python Developer"\/>/);
  assert.match(english, /<meta property="og:image:alt" content="Gustavo Baranda portfolio — Full Stack Python Developer"\/>/);
  assert.match(spanish, /<meta name="twitter:description" content="Gustavo Baranda desarrolla aplicaciones empresariales/);
  assert.match(english, /<meta name="twitter:description" content="Gustavo Baranda builds enterprise applications/);
});

test("production sitemap and robots expose only the intended public routes", async () => {
  const [sitemap, robots] = await Promise.all([
    readBuildFile("sitemap.xml.body"),
    readBuildFile("robots.txt.body"),
  ]);

  assertSingle(sitemap, /<loc>https:\/\/gustavobaranda\.com\/<\/loc>/g, "Spanish sitemap URL must appear once");
  assertSingle(sitemap, /<loc>https:\/\/gustavobaranda\.com\/en<\/loc>/g, "English sitemap URL must appear once");
  for (const language of ["es-AR", "en", "x-default"]) {
    assert.equal((sitemap.match(new RegExp(`hreflang="${language}"`, "g")) ?? []).length, 2);
  }
  assert.doesNotMatch(sitemap, /\/api\/|\/_next\/|lastmod/);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Disallow: \/api\//);
  assert.doesNotMatch(robots, /Disallow: \/en/);
  assert.match(robots, /Sitemap: https:\/\/gustavobaranda\.com\/sitemap\.xml/);
});

test("production JSON-LD matches each localized canonical and document language", async () => {
  const [spanishHtml, englishHtml] = await Promise.all([
    readBuildFile("index.html"),
    readBuildFile("en.html"),
  ]);
  const spanish = parseJsonLd(spanishHtml)["@graph"];
  const english = parseJsonLd(englishHtml)["@graph"];
  const spanishSite = spanish.find(({ "@type": type }) => type === "WebSite");
  const englishSite = english.find(({ "@type": type }) => type === "WebSite");
  const spanishPerson = spanish.find(({ "@type": type }) => type === "Person");
  const englishPerson = english.find(({ "@type": type }) => type === "Person");

  assert.ok(spanishSite);
  assert.ok(englishSite);
  assert.equal(spanishSite.url, "https://gustavobaranda.com/");
  assert.equal(spanishSite.inLanguage, "es-AR");
  assert.equal(englishSite.url, "https://gustavobaranda.com/en");
  assert.equal(englishSite.inLanguage, "en");
  assert.equal(spanishPerson?.url, "https://gustavobaranda.com/");
  assert.equal(englishPerson?.url, "https://gustavobaranda.com/en");
});
