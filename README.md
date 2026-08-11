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

Portfolio personal de **Gustavo Baranda**, Full Stack Developer. Construido con Next.js 16 App Router, React 19 y TypeScript para reflejar criterio de producción real: protección anti-spam sin CAPTCHA, SEO técnico avanzado, sistema de temas sin hydration flash y layout con CSS subgrid moderno.

---

## Decisiones Técnicas Destacadas

Esta sección resume las implementaciones con mayor criterio de producción — pensadas para entrevistas técnicas y revisiones de código.

### Protección Anti-Spam Multicapa (Sin CAPTCHA)

El formulario de contacto combina tres capas independientes sin degradar la experiencia del usuario:

| Capa | Implementación | Archivo |
|---|---|---|
| **Honeypot field** | Campo oculto (`display:none` + `tabIndex={-1}` + `autoComplete="off"`) invisible para humanos pero completado por bots. El backend rechaza silenciosamente con `200 OK` para no alertar al bot. | `ContactForm.tsx` / `route.ts` |
| **Time-based validation** | Timestamp de inicio del formulario incluido en el payload. Envíos en < 2 s se rechazan silenciosamente. | `ContactForm.tsx` / `route.ts` |
| **Rate limiting in-memory** | Ventana deslizante de 3 requests / IP cada 10 min. Implementado sin dependencias externas, con comentario explícito sobre el comportamiento en cold starts de Vercel. | `src/app/api/contact/route.ts` |

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
- **Sitemap y robots dinámicos** generados por Next.js en build time (`src/app/sitemap.ts`, `src/app/robots.ts`).
- **JSON-LD `Person`** con `sameAs` GitHub/LinkedIn, `knowsAbout` y `alumniOf` para rich results de Google.

---

## Tech Stack

### Frontend

| Tecnología | Versión | Motivo |
|---|---|---|
| Next.js App Router | 16 | Server Components por defecto, rutas de API integradas, generación estática de sitemap/robots |
| React | 19 | Concurrent features, `useOptimistic` disponible para futuras mejoras del formulario |
| TypeScript | 6 | Tipado estricto en componentes, datos y respuestas de API |
| Tailwind CSS | v4 | Design tokens nativos, subgrid support, `@custom-variant` para dark mode sin config extra |
| Framer Motion | 12 | Animaciones declarativas con `AnimatePresence` para transiciones de estado del formulario |

### Backend / API

| Tecnología | Motivo |
|---|---|
| Next.js API Routes | Serverless functions en el mismo repo, sin servidor externo |
| Nodemailer + Gmail SMTP | Envío de email con plantilla HTML personalizada y adjunto de logo inline (CID) |

### Tooling & Deploy

| Tecnología | Motivo |
|---|---|
| Vercel | Deploy automático desde GitHub, edge network, variables de entorno por entorno |
| ESLint + eslint-config-next | Reglas de Next.js + React Hooks linting |

---

## Estructura del Proyecto

```
GusDev/
├── public/                    # Imágenes estáticas, OG image, logos de proyectos
└── src/
    ├── app/                   # Next.js App Router — páginas y rutas
    │   ├── api/contact/       # POST endpoint — validación, honeypot, rate limit, Nodemailer
    │   ├── about/             # Página About (Server Component)
    │   ├── contact/           # Página Contact
    │   ├── projects/          # Página Proyectos
    │   ├── layout.tsx         # Root layout — metadataBase, JSON-LD, skip-to-content, tema
    │   ├── page.tsx           # Hero page
    │   ├── sitemap.ts         # Sitemap dinámico (build time)
    │   └── robots.ts          # robots.txt dinámico
    ├── components/
    │   ├── contact/           # ContactForm.tsx (honeypot, time validation), ContactInfo.tsx
    │   ├── header/            # Header sticky, menú mobile con drawer, ThemeToggle
    │   ├── hero/              # TiltImage, FillButton, TransitionEffect
    │   ├── projects/          # ProjectsGrid.tsx (filtros), ProjectCard.tsx (subgrid)
    │   ├── about/             # HeroBio, ExperienceSection, EducationSection
    │   ├── common/            # SocialLinks
    │   ├── utils/             # AnimatedText
    │   └── footer.tsx
    ├── config/
    │   └── site.ts            # getSiteUrl() con lógica de entorno y fallbacks
    ├── data/
    │   └── projectsData.ts    # Datos tipados de proyectos y categorías
    └── types/
        └── index.ts           # Interfaces TypeScript globales (ContactFormData, ApiResponse)
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
# En producción (Vercel): https://tudominio.com
# Si no se define, getSiteUrl() cae al fallback https://gustavobaranda.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **En Vercel:** Configurar `NEXT_PUBLIC_BASE_URL=https://tudominio.com` únicamente en el entorno **Production**. Los preview deployments usarán `VERCEL_URL` automáticamente.

### Comandos disponibles

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build de producción (type-check + export estático)
npm run start    # Servidor de producción local (requiere build previo)
npm run lint     # ESLint con reglas de Next.js
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
