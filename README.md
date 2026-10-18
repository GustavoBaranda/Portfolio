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

El formulario valida los mismos campos en cliente y servidor. El servidor exige JSON con tipos correctos, limita el cuerpo a 16 KiB y no informa éxito hasta que SMTP acepta el destinatario. Esa aceptación no garantiza la entrega final en la bandeja de entrada.

| Capa | Implementación | Archivo |
|---|---|---|
| **Honeypot** | Si el campo auxiliar está completo, devuelve un error genérico sin enviar correo. Al finalizar cada solicitud, el cliente limpia solo ese campo y conserva los datos legítimos. El visitante puede volver a enviar manualmente; no hay reintentos automáticos ni excepciones al límite por IP. | `ContactForm.tsx` / `contact-handler.ts` |
| **Limitador local** | 3 intentos por IP cada 10 minutos, limpieza de clientes vencidos y máximo de 5000 entradas. A capacidad completa rechaza nuevos clientes sin borrar cuotas activas. | `src/lib/contact.ts` |
| **Origen y escape** | Exige un Origin permitido, valida tipos y longitudes, rechaza controles en cabeceras y escapa contenido HTML. | `contact-validation.ts` / `route.ts` |

El limitador es **por proceso**, se reinicia en un cold start y no comparte cuotas entre instancias de Vercel. Origin y honeypot son defensas complementarias, no autenticación ni una garantía contra bots. Se retiró el timestamp del cliente: era manipulable y podía descartar contactos legítimos. No se añadió CAPTCHA ni almacenamiento externo.

Las pruebas HTTP inyectan un envío simulado: no usan credenciales reales ni conectan a SMTP. El formulario conserva los datos ante errores y anuncia validación, carga y resultado con atributos accesibles.

---

### Sistema de Temas sin Hydration Flash

```ts
// layout.tsx — ejecutado ANTES de que React hidrate
<Script id="theme-toggle" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
```

El script lee `localStorage` sincrónicamente y aplica la clase `dark` al `<html>` antes del primer paint. Los tokens CSS semánticos (`--canvas`, `--surface`, `--text`, `--muted`, `--accent`) se intercambian a nivel de `:root` / `:root.dark`. Los controles se mantienen sincronizados y conservan la transición original de 0,45 s mediante View Transitions cuando están disponibles; fondos, textos, bordes, tarjetas e iconos cambian de forma coordinada. Un almacenamiento bloqueado no impide alternar el tema.

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
| Next.js App Router | 16.4.2 | App Router, `POST /api/contact`, sitemap y robots |
| React | 19.2.3 | UI, `AnimatePresence` en el formulario y diálogo de navegación móvil |
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
| ESLint + eslint-config-next | 16.4.2 — reglas de Next.js + React Hooks |
| Node.js test runner + tsx | `npm test` — regresiones de validación, límites, origen, escape y flujo HTTP con correo simulado |

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
    │   ├── contact/           # ContactForm.tsx (validación accesible y honeypot), ContactInfo.tsx
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

- **Node.js** `>= 20.9.0`
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

## Fase 2 — Estilos, accesibilidad y navegación

### Correcciones implementadas

- Tailwind v4: `@theme inline` conecta los tokens existentes con `text-foreground`, `text-muted`, `text-muted-foreground`, `bg-border`, `ring-offset-background` y sus modificadores de opacidad. Se registraron también los colores heredados `dark`, `light` y `gray-dark`. La variante oscura admite `.dark` y `data-theme="dark"`.
- Contraste: se oscureció ligeramente el texto secundario claro y los textos de algunas etiquetas de experiencia/educación, conservando sus colores de marca en fondos y bordes. Se añadieron variantes oscuras a los acentos de la biografía y experiencia, y se reforzaron los límites visibles de los campos del formulario únicamente con CSS.
- Formulario: los campos usan el gris semántico `--border-strong`, coherente con las tarjetas y más suave que el texto secundario que se aplicaba antes. Hover mezcla sutilmente el acento, foco usa el acento completo y su anillo visible, los errores mantienen rojo diferenciado y el estado deshabilitado reduce superficie y opacidad. Los mismos tokens se adaptan al tema oscuro sin tocar validación ni envío.
- Semántica y teclado: el enlace de proyecto de una experiencia queda fuera de su botón de expansión. Los paneles colapsados de experiencia, biografía y tecnologías son inertes y se ocultan del árbol accesible. Los controles indican expansión o selección; el botón de biografía conserva su identidad al cambiar de estado.
- Filtros: Escape cierra el panel de tecnologías y devuelve el foco al disparador. Al aplicar, quitar o restablecer filtros se conserva un destino de foco estable y se anuncia la cantidad de proyectos encontrados.
- Menú móvil: un `<dialog>` abierto con `showModal()` proporciona el comportamiento modal nativo, Escape, contención y devolución de foco. El único botón hamburguesa conserva sus tres líneas, tamaño y posición: las tres utilizan exactamente los keyframes originales de Framer Motion para formar y desarmar la X. El mismo botón permanece montado mediante un portal estable, se incorpora al diálogo abierto y vuelve al encabezado al cerrar, sin duplicación ni icono X independiente. El espacio de 40 × 40 px del encabezado permanece reservado. Se conservan la secuencia de desplazamiento y rotación original, la duración de 0,5 s y `easeInOut`. El panel y sus elementos recuperan el desplazamiento original de 0,8 s, su easing y sus demoras escalonadas; el diálogo se cierra recién al terminar la salida y una reapertura rápida cancela ese cierre. Con movimiento reducido las duraciones pasan a cero, conservando los estados finales. El disparador expone `aria-expanded`, `aria-controls` y etiqueta de apertura/cierre. Seleccionar una opción cierra el menú. Al pasar a escritorio se cierra, libera el bloqueo de scroll y mueve el foco a la navegación visible.
- Foco y tamaños: indicador común de foco, destino enfocable para el enlace de salto y áreas de interacción mayores para tema, redes sociales y etiquetas técnicas.
- Movimiento: `MotionConfig reducedMotion="user"`, reducción de transiciones CSS y desplazamiento sin animación cuando se solicita movimiento reducido. Para el resto de los usuarios se conservan las animaciones originales completas: cortina de tres paneles de 0,8 s con demoras de 0/0,2/0,4 s, flotación continua del logo, inclinación interactiva, entradas con opacidad y desplazamiento, demoras escalonadas de textos, secciones y tarjetas, y transiciones de biografía y filtros. La preferencia reducida omite la cortina y detiene transformaciones continuas sin alterar el estado final ni la accesibilidad del contenido.
- Tarjetas de proyectos: “Leer más” conserva el crossfade original y suma una transición de tamaño de 0,32 s con easing suave. El contenedor accesible permanece montado durante apertura y cierre; `AnimatePresence` gestiona la sustitución del texto y movimiento reducido elimina ambas duraciones.
- Imágenes de proyectos: cada proyecto declara una presentación `interface`, `wide-logo` o `square-logo`. El marco reserva una proporción 16:9 en móvil y 2:1 desde `sm`, evitando saltos durante la carga. Las capturas de sitios, dashboards y documentación usan `object-contain` alineado arriba para conservar navegación, textos y controles; los logos se centran con padding específico. SysPro y las capturas panorámicas aprovechan casi todo el marco. Solar Banco conserva espacio lateral porque su recurso es cuadrado y llenarlo exigiría recorte o deformación.
- Responsive: se preservan los prefijos de ancho del CTA (`md:w-auto`), se limita su contenedor al ancho disponible y se permite envolver las cabeceras de educación. El diálogo usa altura dinámica del viewport y el panel conserva scroll interno.

### Validación y límites

Se ejecutaron ESLint, TypeScript, las **49 pruebas automatizadas** (32 de contacto y 17 nuevas) y el build de producción. En este entorno Windows el build utiliza un worker mediante `CIRCLE_NODE_TOTAL=2`, solo para ese proceso; no se cambió la configuración de Vercel.

Las nuevas regresiones comprueban HTML renderizado de acordeones, filtros y controles; ciclo de apertura/cierre y limpieza del diálogo con dobles; ancho responsive del CTA; contenido visible en el HTML inicial; contraste matemático de tokens y paletas sobre sus fondos declarados; y generación real de utilidades, opacidades y variantes oscuras con PostCSS/Tailwind. Las comprobaciones de contraste no cubren todos los estados compuestos ni sustituyen la inspección visual.

No había aplicaciones ni navegadores disponibles para automatización. **No se ejecutaron pruebas visuales ni E2E en navegador**. Antes de publicar deben verificarse:

- Anchos de 320, 390, 768, 1024 y 1440 px: ausencia de desbordamientos, tarjetas, etiquetas, CTA, zoom al 200 % y orientación horizontal.
- Tab y Shift+Tab en ambos temas; abrir/cerrar menú, invertir la transición con clics rápidos, Escape, clic fuera, retorno de foco y cambio a escritorio con el menú abierto. Confirmar que las tres líneas recuperan su posición, que el botón no salta, que el fondo no recibe foco mientras el diálogo está abierto y que no queda bloqueado el scroll.
- Expandir experiencia y abrir su enlace por separado; biografía y filtros sin controles ocultos alcanzables, sin pérdida de foco y con anuncios útiles en un lector de pantalla.
- Alternar tema desde escritorio y menú móvil, recargar y probar almacenamiento bloqueado. Verificar presentación y foco en estados de carga, error y éxito del formulario con respuestas simuladas, sin correo real.
- Preferencia de movimiento reducido activada antes de cargar y durante la sesión; comprobar ausencia de inclinación, flotación, cortina y paneles de entrada, además del desplazamiento inmediato. Sin esa preferencia, comprobar la cortina completa, la flotación continua y las duraciones originales.

La API, validaciones, honeypot, cuota por instancia, Gmail SMTP, remitente, destinatario y archivos de entorno se conservaron. No se actualizaron dependencias. No se declara cumplimiento WCAG 2.2 AA completo: quedan pendientes las comprobaciones de navegador y tecnología asistiva.

## Pendientes de la Fase 1

### Dependencias de desarrollo

Revisión del 17 de octubre de 2026: quedan **12 paquetes señalados por npm audit (2 moderados y 10 altos)**. Ocho tienen avisos propios y cuatro están afectados por arrastre. Su actualización está diferida por decisión del responsable del proyecto; no se aplicó `audit fix --force` ni una degradación de Next.js.

| Paquete instalado | Severidad | Corrección o pendiente |
|---|---|---|
| @humanfs/node 0.16.7 | Moderada | 0.16.8 |
| ajv 6.12.6 | Moderada | 6.14.0 |
| brace-expansion 1.1.12 / 5.0.9 | Alta | 1.1.21 / 5.0.12 |
| braces 3.0.3 | Alta | Sin versión corregida declarada en el aviso revisado |
| micromatch 4.0.8 | Alta, heredada | Resolver la dependencia afectada de braces |
| fast-glob 3.3.1 | Alta, heredada | Resolver la cadena micromatch / braces |
| @next/eslint-plugin-next 16.4.2 | Alta, heredada | Resolver la cadena fast-glob / micromatch / braces |
| eslint-config-next 16.4.2 | Alta, heredada | Resolver la cadena del plugin anterior |
| flatted 3.3.3 | Alta | 3.4.2 |
| js-yaml 4.1.1 | Alta | 4.3.2 |
| minimatch 3.1.2 | Alta | 3.1.4 |
| picomatch 4.0.3 | Alta | 4.0.4 |

Los mínimos corregidos corresponden a los avisos consultados en esa fecha; antes de actualizar hay que volver a consultar los avisos y comprobar compatibilidad. El alcance encontrado corresponde a ESLint, sus plugins, patrones y cachés de herramientas. No se encontró una ruta desde el formulario público hacia estos paquetes; no aparecen en el trazado del endpoint compilado. Esto no elimina el riesgo al procesar configuraciones, patrones o cachés no confiables en CI. Next.js 16 no ejecuta ESLint automáticamente dentro de `next build`.

### Comprobación manual del formulario

No había navegador conectado durante la validación automatizada. Queda pendiente comprobar en un entorno local con respuestas HTTP simuladas y sin conexión a SMTP:

- Recorrer el formulario con Tab y Shift+Tab; el campo auxiliar debe quedar fuera del recorrido.
- Enviar campos vacíos, espacios y correo inválido; verificar mensajes, foco y asociación de errores.
- Simular un 400 del honeypot: conservar los cuatro campos legítimos, anunciar el error y permitir un nuevo intento manual sin envío automático.
- Simular 400 por campo, 429 y 503: verificar mensajes visibles, foco, datos conservados y ausencia de éxito falso.
- Simular éxito y usar «Enviar otro mensaje»; comprobar el restablecimiento y el foco en Nombre.
- Verificar anuncios con lector de pantalla y presentación en móvil y en ambos temas.

## Revisión manual pendiente de la captura médica

`public/images/fundacion_maldonado_preview.png` muestra un visor DICOM con texto incrustado en la imagen. Se conserva sin cambios: no se confirmó que contenga datos personales reales. Antes de volver a publicarla, el responsable del material debe verificar procedencia, autorización y anonimización de los píxeles visibles, además de cualquier identificador del estudio. No se publican transcripciones de ese texto en esta documentación.
