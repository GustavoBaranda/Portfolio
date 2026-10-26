# Gustavo Baranda

**Full Stack Python Developer · Backend Engineering · Open Source**

[English](README.md) · [Español](README.es.md)

Personal portfolio built with Next.js, React, and TypeScript. It presents my professional profile, experience, education, software projects, and open-source work.

- [View portfolio](https://gustavobaranda.com/)
- [Source code](https://github.com/GustavoBaranda/Portfolio)

## Project status

The portfolio is fully available in Spanish at `/` and English at `/en`. Both routes render the same component tree and locale-independent records through typed dictionaries.

An accessible `ES | EN` selector preserves the active section hash when changing language. There is no automatic locale or location redirect.

## Features

- Responsive design for mobile, tablet, and desktop.
- Persistent light and dark themes.
- Section navigation for Home, About, Projects, and Contact.
- Native mobile dialog with Escape handling and focus restoration.
- Experience, education, and project cards with accessible disclosures.
- Project filtering by category and technology.
- Links to public repositories and demos when available.
- Explicit positioning of chatflow-agent as open-source work created and maintained by Gustavo Baranda.
- A verified external-recognition note for the Portfolio commit selected by XERJ Corpus Hub.
- Professional contact paths for employment, freelance and consulting work, and open-source collaboration.
- Motion and interaction effects with reduced-motion support.
- Contact form with shared client/server validation and accessible feedback.
- Origin checks, body-size limits, honeypot protection, and per-process rate limiting.
- Per-language canonicals, reciprocal `hreflang`, localized Open Graph and Twitter Cards, bilingual sitemap, JSON-LD, and robots configuration.
- Integrated error and not-found pages.
- Fully localized Spanish and English rendering, including forms, server feedback, errors, ARIA labels, and metadata.
- Accessible language selector that preserves section anchors.

## Technology

| Area | Tools |
|---|---|
| Interface | Next.js App Router, React, TypeScript, Tailwind CSS |
| Motion and icons | Framer Motion, Lucide React |
| Server and email | Next.js Route Handlers, Nodemailer, Gmail SMTP |
| Quality | ESLint, TypeScript, Node.js Test Runner, tsx |
| Deployment | Vercel |

Installed versions and dependency ranges are defined in [`package.json`](package.json) and [`package-lock.json`](package-lock.json).

## Architecture

```text
Portfolio/
├── public/                      # Static assets and images
├── src/
│   ├── app/                     # App Router, localized routes, API, metadata, and errors
│   │   ├── [[...locale]]/       # Shared SSG route for / and /en
│   │   └── api/contact/         # Contact form POST endpoint
│   ├── components/              # UI components grouped by section
│   ├── config/                  # Public URLs, professional links, recognition, and funding state
│   ├── data/
│   │   ├── portfolioFacts.ts    # Locale-independent identity and technical facts
│   │   ├── aboutData.ts         # Locale-aware experience and education adapters
│   │   └── projectsData.ts      # Locale-aware project adapters
│   ├── i18n/
│   │   ├── LocaleProvider.tsx   # Typed locale context for client components
│   │   ├── config.ts            # Supported locales and default locale
│   │   ├── format.ts            # Locale-aware date and duration formatting
│   │   └── dictionaries/        # Typed es-AR and en dictionaries
│   ├── lib/                     # Validation, security, reusable logic, and tests
│   └── types/                   # Shared application types
├── next.config.mjs              # Next.js and HTTP header configuration
└── package.json                 # Scripts and dependencies
```

`src/app/[[...locale]]` is the shared statically generated route for `/` and `/en`; it owns the localized layout, page, not-found view, and error boundary. `src/i18n/LocaleProvider.tsx` supplies the selected locale and typed dictionary to client components.

The interface, content, locale-independent facts, and server logic are kept separate. Locale-aware adapters preserve the existing `Experience`, `Education`, and `ProjectItem` contracts while deriving Spanish or English views from the same records.

## Internationalization model

`src/i18n/config.ts` is the source of truth for the supported locales:

- `es-AR`: default language rendered at `/`.
- `en`: English rendered at `/en`.

The dictionaries are TypeScript objects with a shared compile-time shape. Runtime tests also compare their complete leaf structure, preventing missing or additional translation keys.

`src/data/portfolioFacts.ts` stores values that must not be translated: stable identifiers, company and institution names, URLs, image paths, technology tags, category identifiers, normalized dates, and internal status codes. Presentation text remains in the dictionaries.

Dates use normalized year or year-month values. `Intl.DateTimeFormat` and `Intl.NumberFormat` are used by locale-aware helpers instead of parsing translated month names.

The optional localized route statically generates only `/` and `/en`. Unknown paths render translated not-found content. The root layout sets the server-rendered document language to `es-AR` or `en`, and the language selector maps anchors such as `/#projects` to `/en#projects`.

Whenever a later phase changes user-visible behavior, both `README.md` and `README.es.md` must be updated together.

## Professional and open-source positioning

chatflow-agent is presented as Gustavo Baranda's own open-source project, with the role **Creator and Maintainer**. Its description focuses on the verified scope already represented by the repository: a Python library for conversational agents, modular and extensible architecture, asynchronous execution, documentation, testing, contribution review, and community collaboration. The project card links to the official repository at `https://github.com/GustavoBaranda/chatflow-agent`.

XERJ Corpus Hub selected commit [`0de85332b1`](https://github.com/GustavoBaranda/Portfolio/commit/0de85332b1304e04a490b8cd4b6d133be58e28a4), `fix(contact): validate submissions and preserve recovery flow`, from `GustavoBaranda/Portfolio` as a reference for a corpus aimed at coding agents. The presentation links to the [public recognition record](https://hub.xerj.org/contributors/GustavoBaranda) and the selected contribution. Its status remains **selection pending license review**.

GitHub Sponsors configuration lives in `src/config/openSource.ts`. The application URL and its association with chatflow-agent are prepared, but `enabled` remains `false` and the status remains `pending-approval`. Consequently, no Sponsor link or claim that sponsorship is available is rendered. After GitHub approves and publishes the profile, changing the configuration flag is sufficient to expose the existing component integration. Its copy defines support as voluntary maintenance funding without benefits or consideration.

The existing contact form is unchanged. Its accompanying information now distinguishes employment opportunities, freelance and consulting enquiries, and open-source collaboration without adding external services.

## Contact form

The form sends JSON to `POST /api/contact`. Shared validation checks required fields, email format, length limits, and unsupported control characters. The selected locale is sent through `Accept-Language`, so client validation, API errors, loading states, success feedback, and accessible announcements use the active language. The browser preserves visitor input after errors and associates messages with their fields.

The server adds:

- Request origin validation.
- A 16 KiB request-body limit.
- A hidden honeypot field.
- Three attempts per IP every ten minutes.
- Bounded in-memory client tracking.
- Header sanitization and HTML escaping.
- No-store responses that do not expose provider details.

The rate limit is best-effort and process-local. It resets with a new instance and is not shared across Vercel instances. SMTP acceptance means the provider accepted the recipient; it does not guarantee final inbox delivery.

## Accessibility

The implementation includes semantic structure, a skip link, visible focus states, labelled controls, `aria-expanded` and `aria-pressed` states, live feedback, keyboard navigation, inert collapsed content, mobile-dialog focus management, and reduced-motion behavior.

Automated regression coverage complements, but does not replace, manual testing with browsers and assistive technologies.

## SEO and public URLs

`SITE_CONFIG.url` is the public production origin. `CANONICAL_URL_BY_LOCALE` and `LANGUAGE_ALTERNATES` are the shared source of truth used by metadata, sitemap, and JSON-LD. `getSiteUrl()` separately resolves the operational origin used by the contact endpoint for `Origin` validation.

The Spanish page uses `https://gustavobaranda.com/` as its canonical URL and the English page uses `https://gustavobaranda.com/en`. Both pages publish reciprocal `es-AR` and `en` alternates plus an `x-default` alternate pointing to the Spanish root. Open Graph uses `es_AR` or `en_US` with the reciprocal `alternateLocale`; descriptions and social image alternative text follow the active language.

The sitemap contains only both canonical public pages and repeats the reciprocal language alternates for each entry. `robots.txt` permits the public site, including `/en`, and excludes `/api/`. There is no automatic language redirect. The localized layout publishes `Person` and `WebSite` JSON-LD with the current canonical URL, document language, verified professional description, stable education facts, and public profile links.

## Local development

### Requirements

- A Node.js release supported by the declared Next.js version.
- npm.
- A Gmail account with an application password only when manually testing email delivery.

### Setup

```bash
git clone https://github.com/GustavoBaranda/Portfolio.git
cd Portfolio
npm ci
```

Create a local environment file:

```bash
cp .env.example .env.local
```

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Start development:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Purpose | Required |
|---|---|---|
| `EMAIL_USER` | Gmail account used as sender and recipient | For email delivery |
| `EMAIL_PASS` | Gmail application password | For email delivery |
| `NEXT_PUBLIC_BASE_URL` | Operational origin used by contact request validation | Recommended |
| `VERCEL_URL` | Deployment or preview origin | Provided by Vercel |

Canonical SEO URLs do not depend on `NEXT_PUBLIC_BASE_URL`; they come from `SITE_CONFIG.url`.

Never commit `.env.local`, application passwords, or other credentials.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
npm run test:seo-build
```

The suite covers contact validation and security, SMTP acceptance with mocks, both localized renders, route resolution, language switching with hash preservation, HTML language mapping, keyboard-native links, translated server feedback, professional positioning, authorship versus external recognition, contact paths, disabled Sponsors state, international metadata, sitemap, robots, JSON-LD, not-found/error contracts, navigation and disclosures, styles, accessibility, motion, dictionary parity, locale-independent data, and normalized date formatting. Tests do not send real email.

Run `npm run test:seo-build` after `npm run build`. This additional test reads the generated production HTML, `sitemap.xml`, and `robots.txt` to verify the actual canonical, `hreflang`, Open Graph, indexability, and JSON-LD output rather than configuration objects alone.

In the restricted Windows sandbox, `tsx` can fail before test discovery because `os.userInfo()` returns `uv_os_get_passwd/ENOMEM`. The same `npm test` command runs normally outside that sandbox; no project monkeypatch is used.

## Deployment

The project is configured for Vercel. Configure the email variables and operational base URL for the target environment, run the production build, and verify metadata, sitemap, robots, and the contact flow before publishing.

## Issues

Report problems through [GitHub Issues](https://github.com/GustavoBaranda/Portfolio/issues/new).

## License

Distributed under the MIT License. See [LICENSE](LICENSE).
