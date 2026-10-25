# Gustavo Baranda

**Full Stack Python Developer · Ingeniería Backend · Open Source**

[English](README.md) · [Español](README.es.md)

Portfolio personal desarrollado con Next.js, React y TypeScript. Presenta mi perfil profesional, experiencia, formación, proyectos de software y trabajo open source.

- [Ver portfolio](https://gustavobaranda.com/)
- [Código fuente](https://github.com/GustavoBaranda/Portfolio)

## Estado del proyecto

El sitio público permanece actualmente en español y en la ruta `/`. El repositorio ya contiene el modelo tipado de internacionalización para `es-AR` y `en`, pero las rutas públicas localizadas y el selector de idioma quedan deliberadamente reservados para la siguiente fase de implementación.

El diseño, la navegación, el formulario, el comportamiento accesible, las URLs SEO y la ruta pública actuales no cambian.

## Funcionalidades

- Diseño responsive para móvil, tablet y escritorio.
- Temas claro y oscuro persistidos en el navegador.
- Navegación por Inicio, Sobre mí, Proyectos y Contacto.
- Diálogo móvil nativo con cierre mediante Escape y restauración del foco.
- Tarjetas de experiencia, formación y proyectos con detalles accesibles.
- Filtros de proyectos por categoría y tecnología.
- Enlaces a repositorios y demos públicas cuando están disponibles.
- Animaciones e interacciones adaptadas a movimiento reducido.
- Formulario con validación compartida entre cliente y servidor y mensajes accesibles.
- Validación de origen, límite de cuerpo, honeypot y rate limit por proceso.
- Canonical, Open Graph, Twitter Cards, JSON-LD, sitemap y robots.
- Páginas de error y recurso no encontrado integradas.
- Diccionarios tipados en español e inglés preparados para el renderizado localizado.

## Tecnologías

| Área | Herramientas |
|---|---|
| Interfaz | Next.js App Router, React, TypeScript, Tailwind CSS |
| Movimiento e iconos | Framer Motion, Lucide React |
| Servidor y correo | Route Handlers de Next.js, Nodemailer, Gmail SMTP |
| Calidad | ESLint, TypeScript, Node.js Test Runner, tsx |
| Publicación | Vercel |

Las versiones instaladas y los rangos se encuentran en [`package.json`](package.json) y [`package-lock.json`](package-lock.json).

## Arquitectura

```text
Portfolio/
├── public/                      # Recursos estáticos e imágenes
├── src/
│   ├── app/                     # App Router, inicio, API, metadata y errores
│   │   └── api/contact/         # Endpoint POST del formulario
│   ├── components/              # Componentes organizados por sección
│   ├── config/                  # Configuración pública y resolución de URL
│   ├── data/
│   │   ├── portfolioFacts.ts    # Identidad y datos técnicos independientes del idioma
│   │   ├── aboutData.ts         # Vista compatible en español para los componentes
│   │   └── projectsData.ts      # Vista compatible en español para los componentes
│   ├── i18n/
│   │   ├── config.ts            # Idiomas soportados e idioma predeterminado
│   │   ├── format.ts            # Formato localizado de fechas y duraciones
│   │   └── dictionaries/        # Diccionarios tipados es-AR y en
│   ├── lib/                     # Validación, seguridad, lógica reutilizable y pruebas
│   └── types/                   # Tipos compartidos
├── next.config.mjs              # Configuración de Next.js y cabeceras HTTP
└── package.json                 # Scripts y dependencias
```

La interfaz, el contenido, los datos independientes del idioma y la lógica de servidor están separados. Los componentes actuales continúan consumiendo los mismos contratos `EXPERIENCES`, `EDUCATION` y `PROJECTS`; la base de internacionalización no cambia el renderizado existente.

## Modelo de internacionalización

`src/i18n/config.ts` es la fuente de verdad de los idiomas soportados:

- `es-AR`: idioma público y predeterminado actual.
- `en`: contenido inglés preparado.

Los diccionarios son objetos TypeScript con una estructura compartida comprobada durante la compilación. Las pruebas también comparan todas sus claves y hojas en tiempo de ejecución para impedir traducciones faltantes o adicionales.

`src/data/portfolioFacts.ts` conserva los valores que no deben traducirse: identificadores estables, nombres de empresas e instituciones, URLs, imágenes, tecnologías, identificadores de categoría, fechas normalizadas y estados internos. El contenido de presentación permanece en los diccionarios.

Las fechas se representan mediante años o valores año-mes normalizados. Los helpers localizados utilizan `Intl.DateTimeFormat` e `Intl.NumberFormat` y no interpretan nombres de meses traducidos. Se mantienen helpers de compatibilidad mientras los componentes continúan mostrando el contenido español aprobado.

Esta fase no incorpora `/en`, redirecciones por locale, selector de idioma, canonical internacionales ni SEO localizado. Esos cambios requieren una fase posterior revisada por separado.

Cada fase futura que modifique comportamiento visible debe actualizar conjuntamente `README.md` y `README.es.md`.

## Formulario de contacto

El formulario envía JSON a `POST /api/contact`. La validación compartida comprueba campos obligatorios, formato de correo, longitudes y caracteres de control no permitidos. El navegador conserva los datos ante errores y relaciona cada mensaje con su campo.

El servidor agrega:

- Verificación del origen.
- Límite de 16 KiB para el cuerpo.
- Campo honeypot oculto.
- Tres intentos por IP cada diez minutos.
- Registro local de clientes con tamaño acotado.
- Sanitización de cabeceras y escape de HTML.
- Respuestas sin caché que no exponen detalles del proveedor.

El rate limit es complementario y se mantiene por proceso: se reinicia con una nueva instancia y no comparte estado entre instancias de Vercel. La aceptación SMTP confirma que el proveedor aceptó el destinatario, no que el mensaje llegó a la bandeja final.

## Accesibilidad

La implementación incluye estructura semántica, enlace para saltar contenido, foco visible, controles etiquetados, estados `aria-expanded` y `aria-pressed`, anuncios accesibles, navegación por teclado, contenido contraído inerte, gestión de foco del diálogo móvil y adaptación a movimiento reducido.

Las regresiones automatizadas complementan, pero no reemplazan, la validación manual con navegadores y tecnologías asistivas.

## SEO y URLs públicas

`SITE_CONFIG.url` es la URL pública canónica utilizada por metadata, Open Graph, Twitter Cards, sitemap y robots. `getSiteUrl()` resuelve por separado el origen operativo que el endpoint de contacto utiliza para validar `Origin`.

El layout publica datos estructurados `Person` y `WebSite`. El sitemap contiene actualmente solo `/` y el idioma del documento permanece en español hasta que se aprueben las rutas localizadas.

## Desarrollo local

### Requisitos

- Una versión de Node.js compatible con la versión declarada de Next.js.
- npm.
- Una cuenta de Gmail con contraseña de aplicación únicamente para probar manualmente el envío.

### Instalación

```bash
git clone https://github.com/GustavoBaranda/Portfolio.git
cd Portfolio
npm ci
```

Crear el entorno local:

```bash
cp .env.example .env.local
```

En PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Iniciar el entorno:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Uso | Requerida |
|---|---|---|
| `EMAIL_USER` | Cuenta Gmail utilizada como remitente y destinatario | Para enviar correo |
| `EMAIL_PASS` | Contraseña de aplicación de Gmail | Para enviar correo |
| `NEXT_PUBLIC_BASE_URL` | Origen operativo usado al validar solicitudes de contacto | Recomendada |
| `VERCEL_URL` | Origen del despliegue o preview | Proporcionada por Vercel |

Las URLs canónicas de SEO no dependen de `NEXT_PUBLIC_BASE_URL`; provienen de `SITE_CONFIG.url`.

Nunca se deben versionar `.env.local`, contraseñas de aplicación ni otras credenciales.

## Validación

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

La suite cubre validación y seguridad del formulario, aceptación SMTP simulada, navegación y expansiones, estilos, accesibilidad, movimiento, paridad de diccionarios, datos independientes del idioma y formato de fechas normalizadas. Las pruebas no envían correo real.

En el sandbox restringido de Windows, `tsx` puede fallar antes de descubrir las pruebas porque `os.userInfo()` devuelve `uv_os_get_passwd/ENOMEM`. El mismo comando `npm test` funciona normalmente fuera de ese sandbox; no se incorpora ningún monkeypatch al proyecto.

## Publicación

El proyecto está preparado para Vercel. Se deben configurar las variables de correo y URL operativa, ejecutar el build de producción y verificar metadata, sitemap, robots y el formulario antes de publicar.

## Incidencias

Los problemas pueden reportarse mediante [GitHub Issues](https://github.com/GustavoBaranda/Portfolio/issues/new).

## Licencia

Distribuido bajo la licencia MIT. Consultá [LICENSE](LICENSE).
