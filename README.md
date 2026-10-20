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

Portfolio personal de **Gustavo Baranda**, Full Stack Python Developer con foco en backend, Django y SQL Server. Sitio de una sola página construido con Next.js 16 App Router, React 19 y TypeScript: protección anti-spam sin CAPTCHA, SEO técnico, sistema de temas sin hydration flash y presentación responsive de proyectos.

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

### Tarjetas de proyectos por filas

Las tarjetas se distribuyen en una grilla responsive y conservan su altura natural cuando están cerradas o solo una está expandida. En escritorio, una pareja iguala su altura exterior únicamente mientras ambas tarjetas tienen abierto «Leer más»; en móvil y en filas impares nunca se activa esa igualación. El detalle de cada caso de estudio anima una única región de altura y opacidad sin desmontar el contenido antes de completar el cierre. La preferencia `prefers-reduced-motion` conserva el estado final y lleva la duración a cero.

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
| Tailwind CSS | v4 | Design tokens y `@custom-variant` para dark mode |
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
    │   ├── projects/          # ProjectsGrid.tsx (filtros y prioridad), ProjectCard.tsx
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

## Fase 3 — Posicionamiento profesional y contenido

### Etapa 1: hero y biografía

- El hero presenta el rol **Full Stack Python Developer** y explicita la especialización en Python, Django y SQL Server.
- La descripción resume la experiencia en logística y depósitos fiscales, servicios financieros y medicina laboral, con foco en backend, datos e integraciones.
- La biografía diferencia la especialización principal de la experiencia Full Stack complementaria y mantiene visibles la formación como Técnico Superior en Desarrollo de Software y la cursada de la Licenciatura en Ciencia de Datos.
- El contenido ampliado conserva el control accesible «Ver más» y presenta el trabajo como creador y mantenedor de `chatflow-agent`, sin modificar sus animaciones ni el comportamiento del acordeón.
- Esta etapa no modifica proyectos, experiencia profesional, versiones tecnológicas, metadata, SEO, imágenes Open Graph, formulario, correo ni dependencias.

### Validación de la etapa

Se ejecutaron ESLint, TypeScript, las **59 pruebas automatizadas**, el build de producción y `git diff --check`. Las regresiones comprueban el posicionamiento del hero, el contenido profesional de la biografía y los ajustes de experiencia, formación, proyectos, encabezados y navegación principal; las 49 pruebas anteriores continúan aprobadas.

### Etapa 2: experiencia profesional

- Toda la superficie no interactiva de cada tarjeta funciona como un control desplegable nativo, con activación mediante clic, Enter y Espacio, foco visible y estados `aria-expanded` y `aria-controls`.
- Los enlaces de proyectos permanecen como controles independientes y fuera del botón que activa la tarjeta.
- La apertura y el cierre conservan la transición existente; `prefers-reduced-motion` elimina las transiciones CSS sin ocultar el cambio de estado.
- El encabezado presenta la sección como experiencia desarrollando soluciones para desafíos reales, sin cambiar su jerarquía visual ni sus animaciones.
- Las cinco descripciones distinguen responsabilidades, contexto y particularidades técnicas con una redacción profesional en primera persona.
- La experiencia actual en SysPro resume en cuatro párrafos el alcance de DepofisWEB: operaciones logísticas, módulos empresariales, el asistente contextual Bamby y las integraciones de la plataforma.
- Los puestos utilizan nombres profesionales consistentes y las etiquetas tecnológicas públicas omiten números de versión, sin cambiar dependencias ni configuraciones.
- El detalle se denomina «Tecnologías y funcionalidades» para representar frameworks, herramientas, integraciones y capacidades sin tratarlos como una única categoría técnica.

### Etapa 3: formación

- La sección conserva sus cinco tarjetas y distingue por orden una carrera universitaria en curso, un título técnico superior finalizado, un tramo de formación pedagógica finalizado y dos cursos complementarios.
- Se unificó la denominación «Licenciatura en Ciencia de Datos» y se precisó «Tramo de Formación Pedagógica» según la nomenclatura institucional.
- El nuevo subtítulo relaciona la formación técnica, universitaria y complementaria con el desarrollo profesional, sin modificar el timeline, los estados, las fechas, la interacción ni la presentación visual.

### Etapa 4: proyectos

- Los proyectos se ordenan por relevancia profesional: DepofisWEB, `chatflow-agent`, Solar Banco y Fundación Maldonado encabezan la sección; los seis proyectos existentes restantes se conservan.
- `chatflow-agent` se presenta como proyecto open source creado y mantenido por Gustavo, con un resumen acotado a sus capacidades documentadas: ejecución asíncrona, herramientas, handoffs, memoria de sesiones, proveedores y conectores.
- La nueva tarjeta usa una identidad tipográfica dentro del mismo marco responsive porque el repositorio no contiene una imagen propia aprobada; no se generó ni sustituyó ningún recurso visual.
- Las etiquetas públicas omiten versiones de frameworks y lenguajes cuando no aportan al relato profesional. Estándares relevantes como OpenAPI 3 conservan su denominación.
- «Leer más» mantiene el resumen estable y anima únicamente el detalle entre altura cero y automática durante 0,36 s, con una transición de opacidad de 0,22 s. El panel permanece montado, los clics rápidos invierten la transición y movimiento reducido elimina las duraciones.
- Los filtros por categoría y tecnología conservan su comportamiento y el orden de prioridad dentro de cada resultado.

La validación de esta etapa es estructural y automatizada. No se declara verificación visual en navegador porque el entorno no expuso ningún navegador disponible; quedan pendientes los anchos de 320, 390, 768, 1024 y 1440 px, la inversión mediante clics rápidos y la preferencia de movimiento reducido.

### Etapa 5: encabezados de sección

- Sobre mí, Experiencia, Formación y Proyectos comparten escala tipográfica responsive, altura de línea, espaciado y ancho máximo.
- Los títulos destacan únicamente sus conceptos principales con el mismo degradado violeta, índigo y azul, incluidas variantes claras para el tema oscuro.
- Proyectos adopta alineación izquierda para sostener la misma jerarquía editorial que las otras secciones; sus filtros continúan centrados en un bloque independiente.
- El texto introductorio existente de Sobre mí funciona como subtítulo mediante su relación semántica con el título, sin reescribir la biografía ni alterar su control «Ver más».

### Etapa 6: composición de proyectos y CTA principal

- En escritorio, cada pareja calcula desde el contenido cerrado las alturas de metadatos, título, desafío, solución, control, stack y pie. Cada bloque adopta únicamente el mínimo de su pareja mediante variables CSS locales, sin valores globales fijos ni truncado.
- Una expansión supera el mínimo del bloque de solución de la tarjeta activa; la vecina conserva todas sus posiciones. Al cerrar se recupera la alineación. En móvil y en la última fila impar no se aplican mínimos compartidos.
- La medición se realiza antes de pintar con `useLayoutEffect`, se actualiza ante cambios de ancho y fuentes, y no utiliza `ResizeObserver`, `setTimeout` ni un segundo sistema de altura exterior.
- Cada pareja de proyectos activa el estiramiento natural de su fila CSS Grid exclusivamente cuando ambas tarjetas están expandidas. Con ninguna o una sola abierta usa alturas exteriores independientes; en móvil y en filas impares conserva siempre la altura natural. Las mediciones JavaScript quedan limitadas a alinear los bloques internos.
- Los casos de DepofisWEB, `chatflow-agent` y este portfolio presentan desafíos y responsabilidades con una profundidad comparable, sin atribuciones amplias ni inventarios de bibliotecas dentro de la descripción.
- El CTA «Proyectos» vuelve a ser un enlace directo a `#projects`. Su capa de relleno original responde a hover, foco y pulsación sin estado persistente, no captura eventos y elimina su transición cuando el usuario solicita movimiento reducido.
- Contacto comparte la alineación, escala y degradado de los otros encabezados y presenta el texto «¿Tenés un proyecto en mente? Hablemos.» sin modificar el formulario ni su distribución.

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
- Tarjetas de proyectos: “Leer más” mantiene el resumen visible y anima una única región de detalle entre altura cero y automática, junto con su opacidad. El contenido permanece montado durante apertura y cierre, los clics rápidos revierten la transición y movimiento reducido elimina ambas duraciones.
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

## Fase 4 — Estabilización y validación

La planificación formal de la Fase 4 se encuentra en [`docs/PHASE_4_PLAN.md`](docs/PHASE_4_PLAN.md). La entrega 4.1 diagnostica la limitación de `os.userInfo()` en el sandbox de Windows y actualiza de forma controlada las herramientas de desarrollo, sin alterar el runtime, el formulario ni la interfaz.

### Entrega 4.2.1 — Contacto responsive

La grilla de Contacto declara una columna móvil reducible y sus tarjetas respetan el ancho disponible. La insignia de disponibilidad puede ajustarse en pantallas pequeñas sin forzar el ancho del contenedor. La corrección conserva la distribución de escritorio y no modifica la lógica, validaciones ni configuración de correo del formulario.

### Entrega 4.2.2 — Accesibilidad del formulario móvil

Los cuatro controles editables del formulario utilizan un tamaño de fuente de 16 px para mejorar su legibilidad y evitar el zoom automático provocado por textos menores en Safari/iOS. El ajuste no modifica el viewport, la escala tipográfica global, las validaciones ni el envío de correo.

### Entrega 4.2.3 — Optimización del logotipo de Descubriendo Jardín

El SVG conserva su contenedor, proporciones, transparencia y referencia pública, pero reduce el JPEG incrustado a una resolución adecuada para su presentación de 60 px y escalas de alta densidad. La optimización elimina metadatos innecesarios y disminuye el recurso de 1.936.242 a 180.274 bytes sin modificar las tarjetas ni otros recursos gráficos.

### Entrega 4.2.4 — Correcciones finales de accesibilidad

Los textos animados conservan una única alternativa accesible sin aplicar atributos ARIA prohibidos a párrafos. El logotipo decorativo mantiene su flotación y hover fuera del orden de teclado, y los campos de contacto utilizan bordes locales con contraste no textual mínimo de 3:1 en ambos temas, sin alterar foco, errores ni envío.

### Deuda de dependencias de desarrollo

Revisión del 19 de octubre de 2026: la entrega 4.1 redujo la auditoría de **12 alertas (2 moderadas y 10 altas)** a **5 alertas altas**. Se actualizó ESLint dentro de la rama 9 y se aplicaron únicamente parches transitivos compatibles. No se utilizó `audit fix --force` ni se degradó la configuración de Next.js.

| Paquete original | Resultado de la entrega 4.1 |
|---|---|
| @humanfs/node 0.16.7 | Corregido en 0.16.8 |
| ajv 6.12.6 | Corregido en 6.15.0 |
| brace-expansion 1.1.12 / 5.0.9 | Corregido en 1.1.21 / 5.0.12 |
| flatted 3.3.3 | Corregido en 3.4.4 |
| js-yaml 4.1.1 | Corregido en 4.3.2 |
| minimatch 3.1.2 | Corregido en 3.1.5 |
| picomatch 4.0.3 | Corregido en 4.0.7 |
| braces 3.0.3 | Pendiente: no existe versión corregida publicada |
| micromatch 4.0.8 | Pendiente heredado de braces |
| fast-glob 3.3.1 | Pendiente heredado de micromatch / braces |
| @next/eslint-plugin-next 16.4.2 | Pendiente heredado de fast-glob |
| eslint-config-next 16.4.2 | Pendiente heredado del plugin de Next.js |

Las cinco alertas residuales corresponden a una sola cadena de ESLint: `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. `npm audit` sugiere degradar `eslint-config-next` a 14.2.35; esa salida no es compatible con Next.js 16 y no se aplica. El alcance continúa limitado al tooling de desarrollo y CI: no se encontró una ruta desde el formulario público ni desde el bundle de producción. La actualización deberá retomarse cuando `braces` o la cadena superior publiquen una corrección compatible.

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
