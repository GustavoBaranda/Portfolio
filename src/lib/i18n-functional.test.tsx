import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import PortfolioPage from "../components/PortfolioPage";
import LanguageSwitcher, { languageSwitchHref } from "../components/common/LanguageSwitcher";
import BurgerMenuMobile from "../components/header/BurgerMenuMobile";
import { LocaleProvider } from "../i18n/LocaleProvider";
import {
  HTML_LANG_BY_LOCALE,
  localeForNotFound,
  localeFromLanguageHeader,
  localeFromSegments,
  localizedSectionHref,
} from "../i18n/config";
import { getDictionary } from "../i18n/dictionaries";
import { getEducation, getExperiences } from "../data/aboutData";
import { getProjectCategories, getProjects } from "../data/projectsData";
import { validateContactFields } from "./contact-validation";
import { handleContactRequest } from "./contact-handler";

function withLocale(locale: "es-AR" | "en", children: React.ReactNode) {
  return (
    <LocaleProvider locale={locale} dictionary={getDictionary(locale)}>
      {children}
    </LocaleProvider>
  );
}

test("localized routes accept only the Spanish root and English /en path", () => {
  assert.equal(localeFromSegments(), "es-AR");
  assert.equal(localeFromSegments([]), "es-AR");
  assert.equal(localeFromSegments(["en"]), "en");
  assert.equal(localeFromSegments(["es"]), null);
  assert.equal(localeFromSegments(["en", "missing"]), null);
  assert.equal(localeForNotFound(["en", "missing"]), "en");
  assert.equal(localizedSectionHref("es-AR", "projects"), "/#projects");
  assert.equal(localizedSectionHref("en", "projects"), "/en#projects");
});

test("the same portfolio tree renders localized Spanish and English content", () => {
  const spanish = renderToStaticMarkup(withLocale("es-AR", <PortfolioPage locale="es-AR" />));
  const english = renderToStaticMarkup(withLocale("en", <PortfolioPage locale="en" />));

  assert.match(spanish, /Desarrollo software que conecta negocios/);
  assert.match(spanish, /Proyectos que convierten/);
  assert.match(english, /I build software that connects business/);
  assert.match(english, /Projects that turn/);
  assert.match(english, /Available for new opportunities/);
  assert.doesNotMatch(english, /Enviar Mensaje|Filtrar por tecnología|Página no encontrada/);

  assert.equal(getExperiences("es-AR").length, getExperiences("en").length);
  assert.equal(getEducation("es-AR").length, getEducation("en").length);
  assert.equal(getProjects("es-AR").length, getProjects("en").length);
  assert.deepEqual(
    getProjectCategories("es-AR").map(({ id }) => id),
    getProjectCategories("en").map(({ id }) => id),
  );
});

test("the mobile menu uses localized professional content", () => {
  for (const locale of ["es-AR", "en"] as const) {
    const dictionary = getDictionary(locale);
    const html = renderToStaticMarkup(
      withLocale(locale, <BurgerMenuMobile updateMenu={() => {}} />),
    );

    assert.match(html, new RegExp(dictionary.hero.role));
    assert.doesNotMatch(html, />Full Stack Developer</);
  }
});

test("language links are keyboard-native and preserve section hashes", () => {
  assert.equal(languageSwitchHref("es-AR", "#contact"), "/#contact");
  assert.equal(languageSwitchHref("en", "#contact"), "/en#contact");
  const html = renderToStaticMarkup(withLocale("en", <LanguageSwitcher />));
  assert.match(html, /<nav[^>]+aria-label="Select language"/);
  assert.match(html, /<a[^>]+hrefLang="es-AR"[^>]+href="\/"/);
  assert.match(html, /<a[^>]+hrefLang="en"[^>]+aria-current="page"[^>]+href="\/en"/);
  assert.doesNotMatch(html, /tabindex="-1"|role="button"/i);
});

test("the localized root layout maps routes to the correct HTML lang", async () => {
  assert.equal(HTML_LANG_BY_LOCALE[localeFromSegments([])!], "es-AR");
  assert.equal(HTML_LANG_BY_LOCALE[localeFromSegments(["en"])!], "en");
  const layout = await readFile("src/app/[[...locale]]/layout.tsx", "utf8");
  assert.match(layout, /<html lang=\{HTML_LANG_BY_LOCALE\[locale\]\}/);
});

test("contact validation and server responses follow the selected locale", async () => {
  const empty = { nombre: "", email: "", asunto: "", mensaje: "" };
  assert.equal(validateContactFields(empty, "es-AR").nombre, "Ingresá tu nombre.");
  assert.equal(validateContactFields(empty, "en").nombre, "Enter your name.");
  assert.equal(localeFromLanguageHeader("en-US,en;q=0.9"), "en");
  assert.equal(localeFromLanguageHeader("es-AR,es;q=0.9"), "es-AR");

  const response = await handleContactRequest(
    new Request("https://gustavobaranda.com/api/contact", {
      method: "POST",
      headers: { origin: "https://gustavobaranda.com", "content-type": "text/plain" },
      body: "invalid",
    }),
    {
      locale: "en",
      originOptions: { baseUrl: "https://gustavobaranda.com", nodeEnv: "production" },
      send: async () => {},
      rateLimited: () => false,
    },
  );
  assert.equal(response.status, 415);
  assert.equal((await response.json()).error, "The form must be submitted as JSON.");
});

test("unknown localized paths have translated not-found and error copy", async () => {
  assert.equal(localeFromSegments(["unknown"]), null);
  assert.equal(localeFromSegments(["en", "unknown"]), null);
  assert.equal(getDictionary("es-AR").errors.notFoundTitle, "Página no encontrada");
  assert.equal(getDictionary("en").errors.notFoundTitle, "Page not found");
  const [notFound, errorPage] = await Promise.all([
    readFile("src/app/[[...locale]]/not-found.tsx", "utf8"),
    readFile("src/app/[[...locale]]/error.tsx", "utf8"),
  ]);
  assert.match(notFound, /dictionary\.errors\.notFoundTitle/);
  assert.match(errorPage, /dictionary\.errors\.genericDescription/);
});
