# GusDev — Portfolio Profesional

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-indigo?style=for-the-badge)](./LICENSE)

**[→ Demo en Vivo](https://gustavobaranda.com)** · **[→ Reportar un Bug](https://github.com/GustavoBaranda/Portfolio/issues/new)**

</div>

---

Portfolio personal de **Gustavo Baranda**, Full Stack Developer. Sitio de una sola página construido con Next.js 16 App Router, React 19 y TypeScript: protección anti-spam sin CAPTCHA, SEO técnico, sistema de temas sin hydration flash y layout de proyectos con CSS subgrid.

---

## Decisiones Técnicas Destacadas

Esta sección resume las implementaciones con mayor criterio de producción — pensadas para entrevistas técnicas y revisiones de código.

### Protección Anti-Spam Multicapa (Sin CAPTCHA)

El formulario de contacto combina tres capas independientes sin degradar la experiencia del usuario:

| Capa | Implementación | Archivo |
|---|---|---|
| **Honeypot field** | Campo oculto (`sr-only` + `tabIndex={-1}` + `autoComplete="off"`). Si viene completo, el backend responde `200 OK` y no envía el mail. | `ContactForm.tsx` / `src/lib/contact.ts` |
| **Time-based validation** | Timestamp al montar el formulario. Envíos en menos de 2 s se rechazan en silencio. | `ContactForm.tsx` / `src/lib/contact.ts` |
| **Rate limiting in-memory** | 3 requests por IP cada 10 min. Sin dependencias extra; el Map se vacía en cada cold start de Vercel. | `src/lib/contact.ts` |
| **Origin + HTML escape** | El POST exige un `Origin` permitido y escapa nombre, email, asunto y mensaje en la plantilla HTML. | `src/lib/contact.ts` / `route.ts` |

> El rechazo silencioso con `200 OK` en honeypot y time-based es intencional: evita que bots adaptativos detecten que están siendo filtrados.

---

### Sistema de Temas sin Hydration Flash

```ts
// layout.tsx — ejecutado ANTES de que React hidrate
<Script id="theme-toggle" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
```

El script lee `localStorage` sincrónicamente y aplica la clase `dark` al `<html>` antes del primer paint. Los tokens CSS semánticos (`--canvas`, `--surface`, `--text`, `--muted`, `--accent`) se intercambian a nivel de `:root` / `:root.dark`, sin ninguna variable de estado de React ni `useEffect` que cause parpadeo.

---

### Layout con CSS Subgrid

Las tarjetas de proyectos usan `grid-rows-subgrid` de CSS Grid Level 2 para alinear secciones homólogas (contenido / stack técnico / links) entre columnas sin JavaScript:

```css
/* ProjectsGrid — contenedor con 3 filas implícitas por fila de cards */
grid-template-rows: auto auto auto;

/* ProjectCard — hereda las filas del padre */
grid-row: span 3;
display: grid;
grid-template-rows: subgrid;
```

Cuando una tarjeta expande su sección de solución, la fila del grid se estira y las tarjetas vecinas alinean automáticamente su STACK TÉCNICO y sus links al mismo nivel sin ningún cálculo de altura en JS.

---

### SEO Técnico Avanzado

- **`metadataBase` dinámico**: resuelve todas las URLs de OpenGraph, Twitter Cards y canonical contra la URL base correcta según entorno.
- **`getSiteUrl()` con prioridad de entorno**: `NEXT_PUBLIC_BASE_URL` → `VERCEL_URL` (preview deployments automáticos) → fallback hardcoded. Fuerza `https://` en producción aunque la variable tenga `http://`.
- **Sitemap y robots dinámicos** (`src/app/sitemap.ts`, `src/app/robots.ts`). `robots` bloquea `/api/`.
- **JSON-LD `Person`** con `sameAs` GitHub/LinkedIn, `knowsAbout` y `alumniOf`.
- **Una sola ruta `/`**. La navegación es por anclas: `/#home`, `/#about`, `/#projects`, `/#contact`.

---

## Tech Stack

### Frontend

| Tecnología | Versión | Motivo |
|---|---|---|
| Next.js App Router | 16.1.6 | App Router, `POST /api/contact`, sitemap y robots |
| React | 19.2.3 | UI, `AnimatePresence` en el formulario y el menú mobile |
| TypeScript | 6.0.3 | `strict: true` en `tsconfig.json` |
| Tailwind CSS | v4 | Design tokens, subgrid, `@custom-variant` para dark mode |
| Framer Motion | 12 | Cortina de carga, drawer mobile, transiciones del formulario |

### Backend / API

| Tecnología | Motivo |
|---|---|
| Next.js API Routes | `POST /api/contact` en el mismo repo (Nodemailer + Gmail SMTP) |
| Nodemailer + Gmail SMTP | Plantilla HTML del mensaje; sin adjunto CID |

### Tooling & Deploy

| Tecnología | Motivo |
|---|---|
| Vercel | Deploy automático desde GitHub, variables de entorno por entorno |
| ESLint + eslint-config-next | 16.1.6 — reglas de Next.js + React Hooks |
| Node.js test runner + tsx | `npm test` — 7 tests de honeypot, rate limit, origen y escape HTML |

---

## Estructura del Proyecto

```
GusDev/
├── public/                    # Imágenes estáticas, OG image, logos de proyectos
└── src/
    ├── app/                   # Next.js App Router — páginas y rutas
    │   ├── api/contact/       # POST endpoint — validación, honeypot, rate limit, Nodemailer
    │   ├── layout.tsx         # Root layout — metadataBase, JSON-LD, skip-to-content, tema
    │   ├── page.tsx           # Página única: hero, about, proyectos, contacto
    │   ├── not-found.tsx
    │   ├── error.tsx
    │   ├── sitemap.ts         # Sitemap dinámico (build time)
    │   └── robots.ts          # robots.txt dinámico
    ├── components/
    │   ├── contact/           # ContactForm.tsx (honeypot, time validation), ContactInfo.tsx
    │   ├── header/            # Header sticky, menú mobile con drawer, ThemeToggle
    │   ├── hero/              # TiltImage, FillButton, TransitionEffect
    │   ├── projects/          # ProjectsGrid.tsx (filtros), ProjectCard.tsx (subgrid)
    │   ├── about/             # HeroBio, ExperienceSection, EducationSection
    │   ├── common/            # SocialLinks, ThemeToggle
    │   ├── utils/             # AnimatedText, useActiveSection
    │   └── footer.tsx
    ├── config/
    │   └── site.ts            # getSiteUrl() con lógica de entorno y fallbacks
    ├── lib/
    │   └── contact.ts         # Helpers del endpoint + contact.test.ts
    ├── data/
    │   ├── projectsData.ts    # Proyectos y categorías
    │   └── aboutData.ts       # Experiencia, formación y colores
    └── types/
        └── index.ts           # ContactFormData, ApiResponse
```

---

## Instalación y Configuración Local

### Prerrequisitos

- **Node.js** `>= 20.x`
- **npm** `>= 10.x` (o pnpm / yarn equivalente)
- Cuenta de Gmail con [Contraseña de Aplicación](https://myaccount.google.com/apppasswords) habilitada (requiere 2FA activo)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/GustavoBaranda/Portfolio.git
cd Portfolio

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# → Editar .env.local con tus valores (ver sección siguiente)

# 4. Iniciar servidor de desarrollo
npm run dev
# → http://localhost:3000
```

### Variables de Entorno

Crear `.env.local` basándose en el siguiente template:

```env
# ── Email (Formulario de Contacto) ────────────────────────────────────────────
# Cuenta Gmail desde la que se envían los emails
EMAIL_USER=tu_correo@gmail.com

# Contraseña de Aplicación de Google (NO tu contraseña de cuenta)
# Generarla en: myaccount.google.com/apppasswords
# Formato con espacios es válido: "abcd efgh ijkl mnop"
EMAIL_PASS=tu_contrasena_de_aplicacion

# ── SEO / URL Base ─────────────────────────────────────────────────────────────
# En local: http://localhost:3000
# En producción (Vercel): https://gustavobaranda.com
# Si no se define, getSiteUrl() cae al fallback https://gustavobaranda.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **En Vercel:** Configurar `NEXT_PUBLIC_BASE_URL=https://gustavobaranda.com` únicamente en el entorno **Production**. Los preview deployments usarán `VERCEL_URL` automáticamente.

### Comandos disponibles

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build de producción (type-check)
npm run start    # Servidor de producción local (requiere build previo)
npm run lint     # ESLint con reglas de Next.js
npm test         # Tests del módulo de contacto
```

---

## Verificación Post-Deploy

```powershell
# Verificar sitemap (PowerShell)
(Invoke-WebRequest -Uri "https://gustavobaranda.com/sitemap.xml" -UseBasicParsing).Content

# Verificar robots.txt
(Invoke-WebRequest -Uri "https://gustavobaranda.com/robots.txt" -UseBasicParsing).Content

# Verificar canonical y OG tags
(Invoke-WebRequest -Uri "https://gustavobaranda.com" -UseBasicParsing).Content | Select-String "canonical|og:url|og:image"
```

**Herramientas externas:**
- OpenGraph preview → [opengraph.xyz](https://www.opengraph.xyz/)
- Rich Results → [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- Page speed → [pagespeed.web.dev](https://pagespeed.web.dev/)

---

## Licencia

MIT — ver [LICENSE](./LICENSE).

---

<div align="center">
  Desarrollado por <a href="https://github.com/GustavoBaranda"><strong>Gustavo Baranda</strong></a>
</div>
