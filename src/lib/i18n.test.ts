import assert from "node:assert/strict";
import { test } from "node:test";
import { DEFAULT_LOCALE, isSupportedLocale, SUPPORTED_LOCALES } from "../i18n/config";
import { DICTIONARIES, getDictionary } from "../i18n/dictionaries";
import { formatDuration, formatMonthYear, periodEndDate } from "../i18n/format";
import { EDUCATION, EXPERIENCES } from "../data/aboutData";
import { PROJECTS } from "../data/projectsData";
import {
  EDUCATION_FACTS,
  EXPERIENCE_FACTS,
  PROJECT_FACTS,
  resolvePortfolioTerms,
} from "../data/portfolioFacts";

function leafShape(value: unknown, path = "root"): string[] {
  if (typeof value === "string") return [`${path}:string`];
  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => leafShape(entry, `${path}[${index}]`));
  }
  assert.ok(value && typeof value === "object", `${path} must contain only objects, arrays, and strings`);
  return Object.entries(value as Record<string, unknown>)
    .sort(([left], [right]) => left.localeCompare(right))
    .flatMap(([key, entry]) => leafShape(entry, `${path}.${key}`));
}

test("locale configuration exposes only the approved locales and keeps Spanish as the default", () => {
  assert.deepEqual(SUPPORTED_LOCALES, ["es-AR", "en"]);
  assert.equal(DEFAULT_LOCALE, "es-AR");
  assert.equal(isSupportedLocale("es-AR"), true);
  assert.equal(isSupportedLocale("en"), true);
  assert.equal(isSupportedLocale("es"), false);
  assert.equal(isSupportedLocale("en-US"), false);
});

test("English and Spanish dictionaries have the same complete leaf structure", () => {
  assert.deepEqual(
    leafShape(DICTIONARIES.en),
    leafShape(DICTIONARIES["es-AR"]),
  );
  assert.equal(getDictionary(), DICTIONARIES["es-AR"]);
  assert.equal(getDictionary("en"), DICTIONARIES.en);
});

test("localized records and locale-independent facts have one-to-one identifiers", () => {
  const spanish = DICTIONARIES["es-AR"];
  const english = DICTIONARIES.en;

  assert.deepEqual(
    Object.keys(spanish.experience.entries).sort(),
    EXPERIENCE_FACTS.map(({ contentId }) => contentId).sort(),
  );
  assert.deepEqual(
    Object.keys(english.education.entries).sort(),
    EDUCATION_FACTS.map(({ contentId }) => contentId).sort(),
  );
  assert.deepEqual(
    Object.keys(spanish.projects.entries).sort(),
    PROJECT_FACTS.map(({ id }) => id).sort(),
  );
});

test("facts keep identity and technical fields separate from localized presentation", () => {
  const forbiddenFactKeys = new Set([
    "title",
    "role",
    "period",
    "duration",
    "description",
    "challenge",
    "solution",
    "categoryLabel",
    "location",
    "modality",
  ]);

  for (const record of [...EXPERIENCE_FACTS, ...EDUCATION_FACTS, ...PROJECT_FACTS]) {
    for (const key of Object.keys(record)) {
      assert.equal(forbiddenFactKeys.has(key), false, `${key} must remain in a locale dictionary`);
    }
  }

  assert.equal(EXPERIENCES[0].role, DICTIONARIES["es-AR"].experience.entries["syspro-consulting"].role);
  assert.equal(EDUCATION[0].statusCode, "in_progress");
  assert.equal(PROJECTS.find(({ id }) => id === "chatflow-agent")?.githubUrl, "https://github.com/GustavoBaranda/chatflow-agent");
  assert.deepEqual(
    resolvePortfolioTerms(
      [{ termId: "digitalSignature" }, { termId: "semanticHtml" }],
      DICTIONARIES.en.terms,
    ),
    ["Digital signature", "Semantic HTML"],
  );
  assert.ok(EXPERIENCES[0].skills.includes("Firma digital"));
  assert.ok(PROJECTS[0].tags.includes("Firma digital"));
});

test("normalized dates format through Intl without parsing localized display text", () => {
  assert.match(formatMonthYear("2025-05", "es-AR"), /2025/);
  assert.match(formatMonthYear("2025-05", "en"), /2025/);
  assert.equal(formatDuration("2025-04", "2025-05", "es-AR"), "2 meses");
  assert.equal(formatDuration("2025-04", "2025-05", "en"), "2 months");
  assert.equal(periodEndDate(null).getUTCFullYear(), 9999);
  assert.throws(() => formatMonthYear("2025-13", "en"), RangeError);
});
