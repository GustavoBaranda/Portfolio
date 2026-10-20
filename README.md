# Gustavo Baranda

**Full Stack Python Developer · Backend Engineering · Open Source**

Portfolio personal desarrollado con Next.js, React y TypeScript. Un espacio para presentar mis proyectos, experiencia y contribuciones al software de código abierto.

- [Ver portfolio](https://gustavobaranda.com/)
- [Código fuente](https://github.com/GustavoBaranda/Portfolio)

## Sobre el proyecto

Este repositorio contiene el código de mi portfolio profesional. Es una aplicación web de una sola página que reúne mi perfil, experiencia, formación, proyectos y medios de contacto.

La interfaz está pensada para funcionar en distintos tamaños de pantalla, con navegación por secciones, temas claro y oscuro, contenido interactivo y una presentación accesible mediante teclado. El proyecto también incluye una ruta de servidor para procesar el formulario de contacto y recursos técnicos para indexación y publicación.

## Funcionalidades

- Diseño responsive para móvil, tablet y escritorio.
- Tema claro y oscuro persistido en el navegador.
- Navegación por las secciones Inicio, Sobre mí, Proyectos y Contacto.
- Menú móvil basado en un diálogo, con cierre mediante Escape y restauración del foco.
- Presentación de experiencia, formación y proyectos mediante tarjetas interactivas.
- Filtros de proyectos por categoría y tecnología.
- Detalles expandibles con estados ARIA y animaciones reversibles.
- Enlaces a demos y repositorios públicos cuando están disponibles.
- Animaciones de entrada, transiciones y efectos de interacción.
- Adaptación a `prefers-reduced-motion` para reducir o desactivar movimiento no esencial.
- Formulario de contacto con validación en cliente y servidor, estados de carga y mensajes accesibles.
- Medidas antispam y validaciones de origen, contenido y tamaño de solicitud.
- Metadatos, canonical, Open Graph, Twitter Cards, JSON-LD, sitemap y robots dinámicos.
- Páginas de error y recurso no encontrado integradas con el diseño del sitio.

## Tecnologías utilizadas

| Área | Tecnologías |
|---|---|
| Interfaz | Next.js App Router, React, TypeScript y Tailwind CSS |
| Movimiento e iconos | Framer Motion y Lucide React |
| Servidor y correo | Route Handlers de Next.js, Nodemailer y Gmail SMTP |
| Calidad | ESLint, TypeScript, Node.js Test Runner y tsx |
| Publicación | Vercel |

Las versiones instaladas y sus rangos se encuentran en [`package.json`](package.json) y [`package-lock.json`](package-lock.json).

## Arquitectura y organización

```text
Portfolio/
├── public/                     # Recursos estáticos e imágenes
├── src/
│   ├── app/                    # App Router, página principal, API, metadata y errores
│   │   └── api/contact/        # Endpoint POST del formulario de contacto
│   ├── components/             # Componentes visuales organizados por sección
│   │   ├── about/              # Biografía, experiencia y formación
│   │   ├── common/             # Tema, movimiento y enlaces compartidos
│   │   ├── contact/            # Formulario e información de contacto
│   │   ├── header/             # Navegación de escritorio y móvil
│   │   ├── hero/               # Presentación principal y transiciones
│   │   ├── projects/           # Grilla, filtros y tarjetas de proyectos
│   │   └── utils/              # Texto animado y utilidades de navegación
│   ├── config/                 # Configuración pública y resolución de la URL base
│   ├── data/                   # Contenido de experiencia, formación y proyectos
│   ├── lib/                    # Validación, seguridad, flujo del formulario y pruebas
│   └── types/                  # Tipos compartidos
├── next.config.mjs             # Configuración de Next.js y cabeceras HTTP
├── vercel.json                 # Identificación del framework para Vercel
└── package.json                # Scripts y dependencias
```

La interfaz, el contenido y la lógica del servidor están separados. Los componentes consumen datos tipados desde `src/data`; la configuración del sitio se centraliza en `src/config`; y las validaciones y funciones reutilizables permanecen en `src/lib`.

## Implementación técnica

### Navegación, tema y movimiento

El sitio utiliza anclas para navegar dentro de la ruta principal. El encabezado indica la sección activa y la navegación móvil utiliza un elemento `<dialog>` con control de foco, cierre mediante Escape y bloqueo temporal del scroll.

El tema se guarda en `localStorage`. Un script previo a la hidratación aplica la preferencia antes del primer render visible para evitar cambios bruscos de color. Cuando el navegador lo permite, el cambio usa View Transitions; con movimiento reducido, el estado se actualiza sin esa transición.

Las animaciones principales se implementan con Framer Motion. Los componentes que incluyen movimiento consultan `prefers-reduced-motion` y conservan el estado final del contenido aunque reduzcan la duración.

### Proyectos

Los proyectos se mantienen como datos tipados y se presentan en una grilla responsive. Pueden filtrarse por categoría o tecnología, y cada tarjeta expone información resumida y un detalle expandible.

En escritorio, la grilla alinea bloques comparables dentro de cada pareja. La altura exterior solo se iguala cuando ambas tarjetas de una fila están expandidas; en móvil y en filas impares se mantiene la altura natural. Las imágenes usan `next/image`, proporciones reservadas y variantes de presentación que priorizan conservar el contenido de cada captura.

### Formulario de contacto

El formulario envía JSON a `POST /api/contact`. La validación compartida comprueba campos obligatorios, formato del correo, longitudes máximas y caracteres no permitidos. El cliente conserva los datos ante errores y relaciona cada mensaje con su campo correspondiente.

El servidor agrega las siguientes medidas:

- Verificación del origen de la solicitud.
- Límite de 16 KiB para el cuerpo recibido.
- Campo honeypot para detectar automatizaciones que completan indiscriminadamente todos los controles.
- Rate limit de tres intentos por IP cada diez minutos.
- Límite de memoria para el registro local de clientes.
- Sanitización de cabeceras y escape del contenido HTML.
- Respuestas sin caché y mensajes que no exponen detalles del proveedor.

El honeypot es un campo auxiliar oculto a la interacción normal. Se incluye en el payload y debe permanecer vacío: si el servidor lo recibe completo, considera el intento automatizado, responde con un error genérico y no llama al servicio SMTP. Después de cada respuesta, el cliente limpia únicamente ese campo y conserva nombre, correo, asunto y mensaje; cualquier nuevo envío requiere una acción manual del visitante.

El límite por IP se comprueba antes de procesar el payload, por lo que un intento rechazado por el honeypot también consume cuota. Ambas medidas complementan las validaciones de contenido y origen, pero no autentican al remitente ni eliminan completamente el spam: un bot puede evitar el campo auxiliar o distribuir solicitudes entre distintas direcciones.

El rate limit se mantiene por proceso: puede reiniciarse con una nueva instancia y no comparte estado entre instancias de Vercel. Es una protección complementaria, no un límite distribuido. El formulario informa éxito cuando el servidor SMTP acepta el destinatario; esa aceptación no garantiza que el mensaje llegue finalmente a la bandeja de entrada.

Los correos se envían mediante Gmail SMTP usando la cuenta configurada en el entorno como remitente y destinatario. Las pruebas automatizadas sustituyen este envío y no se conectan a un servidor real.

### Accesibilidad

La implementación incluye estructura semántica, enlace para saltar al contenido, etiquetas de formulario, nombres accesibles, foco visible, estados `aria-expanded` y `aria-pressed`, anuncios de errores y resultados, navegación mediante teclado y contenido contraído fuera del recorrido interactivo.

Estas medidas mejoran el uso con tecnologías asistivas, pero no constituyen por sí solas una garantía de compatibilidad con todas las combinaciones de navegador y lector de pantalla.

### SEO y cabeceras

La URL base se resuelve a partir de `NEXT_PUBLIC_BASE_URL`, `VERCEL_URL` o el dominio de producción. Esa URL se reutiliza para canonical, Open Graph, Twitter Cards, sitemap y robots.

El layout publica datos estructurados `Person` en JSON-LD. `robots.txt` permite indexar el sitio y bloquea `/api/`; el sitemap describe la ruta principal. La configuración de Next.js agrega las cabeceras `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` y `Permissions-Policy`.

## Instalación y ejecución local

### Requisitos

- Node.js compatible con la versión de Next.js declarada en el proyecto.
- npm.
- Una cuenta de Gmail con contraseña de aplicación, únicamente si se desea probar el envío manual del formulario.

### Instalación

```bash
git clone https://github.com/GustavoBaranda/Portfolio.git
cd Portfolio
npm ci
```

Crear el archivo local de configuración a partir del ejemplo:

```bash
cp .env.example .env.local
```

En PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

Para comprobar el build de producción localmente:

```bash
npm run build
npm run start
```

## Variables de entorno

El archivo [`.env.example`](.env.example) documenta las variables utilizadas:

| Variable | Uso | Requerida |
|---|---|---|
| `EMAIL_USER` | Cuenta de Gmail usada como remitente y destinatario del formulario | Para enviar correos |
| `EMAIL_PASS` | Contraseña de aplicación de Gmail | Para enviar correos |
| `NEXT_PUBLIC_BASE_URL` | URL pública utilizada por metadata, validación de origen, sitemap y robots | Recomendada |
| `VERCEL_URL` | URL del despliegue o preview | Proporcionada por Vercel |

Ejemplo local sin credenciales reales:

```env
EMAIL_USER=
EMAIL_PASS=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

No se deben versionar `.env.local`, contraseñas de aplicación ni otras credenciales. En producción, `NEXT_PUBLIC_BASE_URL` debe apuntar al dominio público con HTTPS.

## Pruebas y calidad

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

La suite cubre validación del formulario, límites de solicitudes, origen, honeypot, respuestas HTTP, aceptación SMTP simulada y regresiones de interfaz, estilos, navegación, accesibilidad y movimiento. Los casos del formulario usan mocks y no envían correos reales.

## Despliegue

El proyecto está preparado para Vercel como aplicación Next.js:

1. Importar el repositorio en Vercel.
2. Configurar `EMAIL_USER`, `EMAIL_PASS` y `NEXT_PUBLIC_BASE_URL` en el entorno correspondiente.
3. Mantener `NEXT_PUBLIC_BASE_URL` con el dominio de producción y HTTPS.
4. Ejecutar el build con `npm run build` o utilizar la detección automática del framework.

Vercel proporciona `VERCEL_URL` para los previews. Cuando el repositorio está conectado a GitHub, los pushes a la rama configurada pueden iniciar despliegues automáticos.

Después del despliegue se pueden comprobar los recursos generados:

```powershell
(Invoke-WebRequest -Uri "https://gustavobaranda.com/sitemap.xml" -UseBasicParsing).Content
(Invoke-WebRequest -Uri "https://gustavobaranda.com/robots.txt" -UseBasicParsing).Content
(Invoke-WebRequest -Uri "https://gustavobaranda.com" -UseBasicParsing).Content |
  Select-String "canonical|og:url|og:image"
```

## Incidencias

Los errores pueden reportarse mediante [GitHub Issues](https://github.com/GustavoBaranda/Portfolio/issues/new).

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consultá el archivo [LICENSE](LICENSE).
