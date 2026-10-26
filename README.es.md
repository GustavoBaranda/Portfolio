# Gustavo Baranda

**Full Stack Python Developer · Ingeniería Backend · Open Source**

[English](README.md) · [Español](README.es.md)

Portfolio personal desarrollado con Next.js, React y TypeScript. Presenta mi perfil profesional, experiencia, formación, proyectos de software y trabajo open source.

- [Ver portfolio](https://gustavobaranda.com/)
- [Código fuente](https://github.com/GustavoBaranda/Portfolio)

## Estado del proyecto

El portfolio está disponible completamente en español en `/` y en inglés en `/en`. Ambas rutas renderizan el mismo árbol de componentes y los mismos registros independientes del idioma mediante diccionarios tipados.

El selector accesible `ES | EN` conserva el hash de la sección activa al cambiar de idioma. No existe redirección automática por idioma ni ubicación.

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
- Renderizado completo en español e inglés, incluidos formularios, respuestas del servidor, errores, etiquetas ARIA y metadata.
- Selector de idioma accesible que conserva las anclas de sección.

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
│   ├── app/                     # App Router, rutas localizadas, API, metadata y errores
│   │   ├── [[...locale]]/       # Ruta SSG compartida para / y /en
│   │   └── api/contact/         # Endpoint POST del formulario
│   ├── components/              # Componentes organizados por sección
│   ├── config/                  # Configuración pública y resolución de URL
│   ├── data/
│   │   ├── portfolioFacts.ts    # Identidad y datos técnicos independientes del idioma
│   │   ├── aboutData.ts         # Adaptadores localizados de experiencia y formación
│   │   └── projectsData.ts      # Adaptadores localizados de proyectos
│   ├── i18n/
│   │   ├── LocaleProvider.tsx   # Contexto tipado para componentes cliente
│   │   ├── config.ts            # Idiomas soportados e idioma predeterminado
│   │   ├── format.ts            # Formato localizado de fechas y duraciones
│   │   └── dictionaries/        # Diccionarios tipados es-AR y en
│   ├── lib/                     # Validación, seguridad, lógica reutilizable y pruebas
│   └── types/                   # Tipos compartidos
├── next.config.mjs              # Configuración de Next.js y cabeceras HTTP
└── package.json                 # Scripts y dependencias
```

`src/app/[[...locale]]` es la ruta compartida y generada estáticamente para `/` y `/en`; contiene el layout localizado, la página, la vista 404 y el límite de errores. `src/i18n/LocaleProvider.tsx` entrega el locale seleccionado y el diccionario tipado a los componentes cliente.

La interfaz, el contenido, los datos independientes del idioma y la lógica de servidor están separados. Los adaptadores localizados conservan los contratos `Experience`, `Education` y `ProjectItem` mientras derivan las vistas española e inglesa de los mismos registros.

## Modelo de internacionalización

`src/i18n/config.ts` es la fuente de verdad de los idiomas soportados:

- `es-AR`: idioma predeterminado renderizado en `/`.
- `en`: idioma inglés renderizado en `/en`.

Los diccionarios son objetos TypeScript con una estructura compartida comprobada durante la compilación. Las pruebas también comparan todas sus claves y hojas en tiempo de ejecución para impedir traducciones faltantes o adicionales.

`src/data/portfolioFacts.ts` conserva los valores que no deben traducirse: identificadores estables, nombres de empresas e instituciones, URLs, imágenes, tecnologías, identificadores de categoría, fechas normalizadas y estados internos. El contenido de presentación permanece en los diccionarios.

Las fechas se representan mediante años o valores año-mes normalizados. Los helpers localizados utilizan `Intl.DateTimeFormat` e `Intl.NumberFormat` y no interpretan nombres de meses traducidos.

La ruta localizada opcional genera estáticamente solo `/` y `/en`. Las rutas inexistentes muestran contenido traducido. El layout establece `lang="es-AR"` o `lang="en"` durante el renderizado del servidor, y el selector transforma anclas como `/#projects` en `/en#projects`. Las funciones completas de SEO internacional, como `hreflang` y el sitemap bilingüe, quedan reservadas para la fase siguiente.

Cada fase futura que modifique comportamiento visible debe actualizar conjuntamente `README.md` y `README.es.md`.

## Formulario de contacto

El formulario envía JSON a `POST /api/contact`. La validación compartida comprueba campos obligatorios, formato de correo, longitudes y caracteres de control no permitidos. El locale activo se comunica mediante `Accept-Language`, por lo que la validación cliente, los errores de la API, los estados de carga, el éxito y los anuncios accesibles utilizan el idioma seleccionado. El navegador conserva los datos ante errores y relaciona cada mensaje con su campo.

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

El layout localizado publica datos estructurados `Person` y `WebSite` para la ruta activa. La metadata básica está traducida, mientras que el sitemap permanece deliberadamente limitado a `/` hasta que la fase de SEO internacional incorpore `hreflang` y las entradas bilingües.

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

La suite cubre validación y seguridad del formulario, aceptación SMTP simulada, renderizado en ambos idiomas, resolución de rutas, cambio de idioma con conservación del hash, idioma del documento, enlaces accesibles mediante teclado, respuestas traducidas del servidor, contratos de error y 404, navegación, expansiones, estilos, accesibilidad, movimiento, paridad de diccionarios, datos independientes del idioma y fechas normalizadas. Las pruebas no envían correo real.

En el sandbox restringido de Windows, `tsx` puede fallar antes de descubrir las pruebas porque `os.userInfo()` devuelve `uv_os_get_passwd/ENOMEM`. El mismo comando `npm test` funciona normalmente fuera de ese sandbox; no se incorpora ningún monkeypatch al proyecto.

## Publicación

El proyecto está preparado para Vercel. Se deben configurar las variables de correo y URL operativa, ejecutar el build de producción y verificar metadata, sitemap, robots y el formulario antes de publicar.

## Incidencias

Los problemas pueden reportarse mediante [GitHub Issues](https://github.com/GustavoBaranda/Portfolio/issues/new).

## Licencia

Distribuido bajo la licencia MIT. Consultá [LICENSE](LICENSE).
