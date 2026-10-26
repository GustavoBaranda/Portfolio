import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CANONICAL_URL_BY_LOCALE,
  LANGUAGE_ALTERNATES,
  createHomeMetadata,
  createRootMetadata,
  SITE_CONFIG,
} from "../config/site";
import robots from "../app/robots";
import sitemap from "../app/sitemap";
import { createPortfolioStructuredData } from "./structured-data";

interface MetadataSnapshot {
  title: { absolute: string };
  description: string;
  alternates: {
    canonical: string;
    languages: Record<string, string>;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    locale: string;
    alternateLocale: string[];
    images: Array<{ url: string; alt: string }>;
  };
  twitter: {
    title: string;
    description: string;
    images: Array<{ url: string; alt: string }>;
  };
}

const metadataSnapshot = (locale: "es-AR" | "en") =>
  JSON.parse(JSON.stringify(createHomeMetadata(locale))) as MetadataSnapshot;

test("localized metadata has self-canonicals and reciprocal language alternates", () => {
  const spanish = metadataSnapshot("es-AR");
  const english = metadataSnapshot("en");

  assert.equal(spanish.alternates.canonical, "https://gustavobaranda.com/");
  assert.equal(english.alternates.canonical, "https://gustavobaranda.com/en");
  assert.notEqual(spanish.alternates.canonical, english.alternates.canonical);

  for (const metadata of [spanish, english]) {
    assert.deepEqual(metadata.alternates.languages, {
      "es-AR": "https://gustavobaranda.com/",
      en: "https://gustavobaranda.com/en",
      "x-default": "https://gustavobaranda.com/",
    });
  }
});

test("Open Graph and Twitter metadata are localized and use absolute URLs", () => {
  const spanish = metadataSnapshot("es-AR");
  const english = metadataSnapshot("en");

  assert.equal(spanish.openGraph.locale, "es_AR");
  assert.deepEqual(spanish.openGraph.alternateLocale, ["en_US"]);
  assert.equal(english.openGraph.locale, "en_US");
  assert.deepEqual(english.openGraph.alternateLocale, ["es_AR"]);
  assert.equal(spanish.openGraph.url, CANONICAL_URL_BY_LOCALE["es-AR"]);
  assert.equal(english.openGraph.url, CANONICAL_URL_BY_LOCALE.en);

  assert.match(spanish.description, /especializado en backend/);
  assert.match(english.description, /specializing in backend development/);
  assert.match(spanish.openGraph.description, /desarrolla aplicaciones empresariales/);
  assert.match(english.openGraph.description, /builds enterprise applications/);

  for (const metadata of [spanish, english]) {
    assert.equal(metadata.openGraph.title, metadata.title.absolute);
    assert.equal(metadata.twitter.title, metadata.title.absolute);
    assert.equal(metadata.twitter.description, metadata.openGraph.description);
    assert.equal(metadata.openGraph.images[0].url, `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`);
    assert.equal(metadata.twitter.images[0].url, metadata.openGraph.images[0].url);
    assert.ok(metadata.openGraph.images[0].url.startsWith("https://"));
  }

  assert.equal(spanish.openGraph.images[0].alt, "Portfolio de Gustavo Baranda — Full Stack Python Developer");
  assert.equal(english.openGraph.images[0].alt, "Gustavo Baranda portfolio — Full Stack Python Developer");
  assert.equal(spanish.twitter.images[0].alt, spanish.openGraph.images[0].alt);
  assert.equal(english.twitter.images[0].alt, english.openGraph.images[0].alt);
});

test("the sitemap exposes only both canonical pages with reciprocal alternates", () => {
  const entries = sitemap();
  assert.deepEqual(entries.map(({ url }) => url), [
    CANONICAL_URL_BY_LOCALE["es-AR"],
    CANONICAL_URL_BY_LOCALE.en,
  ]);
  assert.equal(new Set(entries.map(({ url }) => url)).size, 2);
  for (const entry of entries) {
    assert.deepEqual(entry.alternates?.languages, LANGUAGE_ALTERNATES);
    assert.doesNotMatch(entry.url, /\/api\/|\/_next\//);
    assert.ok(!("lastModified" in entry));
  }
});

test("robots keeps both localized pages indexable while excluding the contact API", () => {
  const rootRobots = JSON.parse(JSON.stringify(createRootMetadata().robots)) as {
    index: boolean;
    follow: boolean;
    googleBot: { index: boolean; follow: boolean };
  };
  assert.equal(rootRobots.index, true);
  assert.equal(rootRobots.follow, true);
  assert.equal(rootRobots.googleBot.index, true);
  assert.equal(rootRobots.googleBot.follow, true);

  const robotsConfig = robots();
  assert.deepEqual(robotsConfig.rules, {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/"],
  });
  assert.equal(robotsConfig.sitemap, `${SITE_CONFIG.url}/sitemap.xml`);
  assert.ok(!JSON.stringify(robotsConfig).includes('"/en"'));
});

test("JSON-LD follows each canonical URL and language without localized status logic", () => {
  const spanish = createPortfolioStructuredData("es-AR");
  const english = createPortfolioStructuredData("en");
  const [spanishPerson, spanishSite] = spanish["@graph"];
  const [englishPerson, englishSite] = english["@graph"];

  assert.equal(spanishPerson.url, CANONICAL_URL_BY_LOCALE["es-AR"]);
  assert.equal(spanishSite.url, CANONICAL_URL_BY_LOCALE["es-AR"]);
  assert.equal(spanishSite.inLanguage, "es-AR");
  assert.equal(englishPerson.url, CANONICAL_URL_BY_LOCALE.en);
  assert.equal(englishSite.url, CANONICAL_URL_BY_LOCALE.en);
  assert.equal(englishSite.inLanguage, "en");
  assert.equal(spanishPerson["@id"], `${CANONICAL_URL_BY_LOCALE["es-AR"]}#person`);
  assert.equal(englishPerson["@id"], `${CANONICAL_URL_BY_LOCALE.en}#person`);
  assert.equal(spanishSite.author["@id"], spanishPerson["@id"]);
  assert.equal(englishSite.author["@id"], englishPerson["@id"]);
  assert.match(spanishPerson.description, /especializado en backend/);
  assert.match(englishPerson.description, /specializing in backend development/);
  assert.deepEqual(
    spanishPerson.alumniOf.map(({ name }) => name),
    englishPerson.alumniOf.map(({ name }) => name),
  );
});
