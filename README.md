# Gustavo Baranda

**Full Stack Python Developer · Backend Engineering · Open Source**

[English](README.md) · [Español](README.es.md)

Personal portfolio built with Next.js, React, and TypeScript. It presents my professional profile, experience, education, software projects, and open-source work.

- [View portfolio](https://gustavobaranda.com/)
- [Source code](https://github.com/GustavoBaranda/Portfolio)

## Project status

The public website currently remains in Spanish at `/`. The repository now contains the typed internationalization model for `es-AR` and `en`, but localized public routes and a language selector are intentionally deferred to the next implementation phase.

The current visual design, navigation, contact flow, accessibility behavior, SEO URLs, and public route remain unchanged.

## Features

- Responsive design for mobile, tablet, and desktop.
- Persistent light and dark themes.
- Section navigation for Home, About, Projects, and Contact.
- Native mobile dialog with Escape handling and focus restoration.
- Experience, education, and project cards with accessible disclosures.
- Project filtering by category and technology.
- Links to public repositories and demos when available.
- Motion and interaction effects with reduced-motion support.
- Contact form with shared client/server validation and accessible feedback.
- Origin checks, body-size limits, honeypot protection, and per-process rate limiting.
- Canonical metadata, Open Graph, Twitter Cards, JSON-LD, sitemap, and robots configuration.
- Integrated error and not-found pages.
- Typed Spanish and English dictionaries prepared for localized rendering.

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
│   ├── app/                     # App Router, home page, API, metadata, and errors
│   │   └── api/contact/         # Contact form POST endpoint
│   ├── components/              # UI components grouped by section
│   ├── config/                  # Public site configuration and URL resolution
│   ├── data/
│   │   ├── portfolioFacts.ts    # Locale-independent identity and technical facts
│   │   ├── aboutData.ts         # Current Spanish compatibility view for components
│   │   └── projectsData.ts      # Current Spanish compatibility view for components
│   ├── i18n/
│   │   ├── config.ts            # Supported locales and default locale
│   │   ├── format.ts            # Locale-aware date and duration formatting
│   │   └── dictionaries/        # Typed es-AR and en dictionaries
│   ├── lib/                     # Validation, security, reusable logic, and tests
│   └── types/                   # Shared application types
├── next.config.mjs              # Next.js and HTTP header configuration
└── package.json                 # Scripts and dependencies
```

The interface, content, locale-independent facts, and server logic are kept separate. Existing components continue to consume the same `EXPERIENCES`, `EDUCATION`, and `PROJECTS` contracts, so the internationalization foundation does not alter current rendering.

## Internationalization model

`src/i18n/config.ts` is the source of truth for the supported locales:

- `es-AR`: current default and public language.
- `en`: prepared English content.

The dictionaries are TypeScript objects with a shared compile-time shape. Runtime tests also compare their complete leaf structure, preventing missing or additional translation keys.

`src/data/portfolioFacts.ts` stores values that must not be translated: stable identifiers, company and institution names, URLs, image paths, technology tags, category identifiers, normalized dates, and internal status codes. Presentation text remains in the dictionaries.

Dates use normalized year or year-month values. `Intl.DateTimeFormat` and `Intl.NumberFormat` are used by locale-aware helpers instead of parsing translated month names. Compatibility helpers remain available while existing components continue to render the approved Spanish copy.

This phase does not add `/en`, locale redirects, a language selector, international canonical URLs, or localized SEO. Those changes require a separate reviewed phase.

Whenever a later phase changes user-visible behavior, both `README.md` and `README.es.md` must be updated together.

## Contact form

The form sends JSON to `POST /api/contact`. Shared validation checks required fields, email format, length limits, and unsupported control characters. The browser preserves visitor input after errors and associates messages with their fields.

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

`SITE_CONFIG.url` is the canonical public URL used by metadata, Open Graph, Twitter Cards, sitemap, and robots. `getSiteUrl()` separately resolves the operational origin used by the contact endpoint for `Origin` validation.

The root layout publishes `Person` and `WebSite` structured data. The sitemap currently contains only `/`, and the document language remains Spanish until localized routes are approved.

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
```

The suite covers contact validation and security, SMTP acceptance with mocks, navigation and disclosure contracts, styles, accessibility, motion, dictionary parity, locale-independent data, and normalized date formatting. Tests do not send real email.

In the restricted Windows sandbox, `tsx` can fail before test discovery because `os.userInfo()` returns `uv_os_get_passwd/ENOMEM`. The same `npm test` command runs normally outside that sandbox; no project monkeypatch is used.

## Deployment

The project is configured for Vercel. Configure the email variables and operational base URL for the target environment, run the production build, and verify metadata, sitemap, robots, and the contact flow before publishing.

## Issues

Report problems through [GitHub Issues](https://github.com/GustavoBaranda/Portfolio/issues/new).

## License

Distributed under the MIT License. See [LICENSE](LICENSE).
