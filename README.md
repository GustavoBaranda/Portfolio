# 🚀 GusDev · Portfolio Profesional

Portfolio web moderno y profesional de **Gustavo Baranda**, Full Stack Developer. Desarrollado con **TypeScript (TSX)**, Next.js 16 (App Router), React 19, Tailwind CSS v4 y animaciones interactivas con Framer Motion. Incluye un sistema de contacto integrado mediante API Route de Next.js y Nodemailer, junto con datos estructurados JSON-LD y mapas de sitio para SEO.

---

## ✨ Características Principales

* ⚛️ **100% TypeScript & TSX**: Todos los componentes React, páginas App Router y utilidades están construidos exclusivamente con **TypeScript JSX (`.tsx`)** y **TypeScript (`.ts`)**.
* 🎨 **Diseño Moderno & Responsivo**: Interfaz fluida adaptable a dispositivos móviles, tablets y escritorio.
* 🌓 **Modo Oscuro / Claro**: Detección automática del tema del sistema y persistencia mediante `localStorage`.
* ✉️ **Formulario de Contacto Funcional**: Envío de mensajes por correo electrónico a través de SMTP (Gmail) utilizando Nodemailer y plantillas HTML personalizadas.
* 🔍 **SEO & Datos Estructurados**: Integración de `sitemap.xml`, `robots.txt`, datos estructurados JSON-LD (`Person` & `WebSite` Schema.org) y metadatos OpenGraph / Twitter Cards.
* ⚡ **Rendimiento Máximo**: Optimización de fuentes con `next/font/google` (Montserrat) e imágenes SVG integradas.

---

## 🛠️ Tecnologías Utilizadas

### 💻 Frontend & Lenguajes
<p>
  <img align="left" src="https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img align="left" src="https://img.shields.io/badge/React_TSX_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React TSX" />
  <img align="left" src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img align="left" src="https://img.shields.io/badge/Tailwind_CSS_v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img align="left" src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>
<br clear="all">

### ⚙️ Backend & Servicios
<p>
  <img align="left" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img align="left" src="https://img.shields.io/badge/Nodemailer-22B573?style=for-the-badge&logo=nodemailer&logoColor=white" alt="Nodemailer" />
</p>
<br clear="all">

### 🚀 Despliegue & Herramientas
<p>
  <img align="left" src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img align="left" src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img align="left" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm" />
</p>
<br clear="all">

---

## 📁 Estructura del Proyecto (`.tsx` & `.ts`)

```bash
GusDev/
├── public/                 # Archivos estáticos e imágenes (logo.svg, etc.)
├── src/
│   ├── app/                # Next.js App Router (Páginas TSX y Rutas TS)
│   │   ├── about/          # Sección Sobre Mí (page.tsx)
│   │   ├── api/            # Rutas de API de Next.js
│   │   │   └── contact/    # Endpoint POST para el formulario (route.ts)
│   │   ├── contact/        # Página de Contacto (page.tsx)
│   │   ├── projects/       # Sección de Proyectos (page.tsx)
│   │   ├── globals.css     # Estilos globales y Tailwind CSS v4
│   │   ├── layout.tsx      # Layout principal TSX, SEO JSON-LD y Metadata
│   │   ├── page.tsx        # Página de Inicio TSX (HomePage)
│   │   ├── robots.ts       # Generador dinámico de robots.txt
│   │   └── sitemap.ts      # Generador dinámico de sitemap.xml
│   ├── assets/             # Recursos vectoriales y logos
│   ├── components/         # Componentes React TSX reutilizables
│   │   ├── about/          # HeroBio.tsx, ExperienceSection.tsx, EducationSection.tsx, etc.
│   │   ├── common/         # ThemeToggle.tsx, SocialLinks.tsx
│   │   ├── contact/        # ContactForm.tsx, ContactInfo.tsx
│   │   ├── header/         # index.tsx, BurgerMenuMobile.tsx, Menu.tsx, ItemMenu.tsx, etc.
│   │   ├── hero/           # TiltImage.tsx, fill-button.tsx, TransitionEffect.tsx
│   │   ├── projects/       # ProjectsGrid.tsx, ProjectCard.tsx
│   │   ├── utils/          # AnimatedText.tsx
│   │   └── footer.tsx      # Footer TSX
│   ├── data/               # Datasets tipados TS (projectsData.ts, aboutData.ts)
│   └── types/              # Definiciones e interfaces TypeScript (index.ts, global.d.ts)
├── .env                    # Configuración de variables de entorno
├── tsconfig.json           # Configuración de TypeScript
└── package.json
```

---

## ⚙️ Configuración del Entorno (`.env`)

Crea un archivo `.env` o `.env.local` en la raíz del proyecto basándote en la siguiente estructura:

```env
# Configuración de correo SMTP (Formulario de contacto)
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion

# URL base pública para SEO y Metadatos (Opcional en desarrollo)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> 💡 **Nota sobre Gmail**: Para obtener `EMAIL_PASS`, debes generar una *Contraseña de Aplicación* desde tu cuenta de Google (Seguridad > Verificación en 2 pasos > Contraseñas de aplicaciones).

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/GustavoBaranda/Portfolio.git
   cd Portfolio
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

---

## 📦 Comandos Disponibles

* `npm run dev`: Inicia el servidor de desarrollo local.
* `npm run build`: Compila la aplicación para producción (verificación de tipos TSX y generación estática).
* `npm run start`: Inicia el servidor de producción compilado.
* `npm run lint`: Ejecuta ESLint para verificar la calidad del código.

---

## 📄 Licencia

Este proyecto es de uso personal y está bajo la licencia [MIT](LICENSE).

---

Desarrollado con ❤️ por **[Gustavo Baranda](https://github.com/GustavoBaranda)**
