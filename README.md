# 🚀 GusDev · Portfolio Profesional

<p align="left">
  <img src="https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

Portfolio web moderno y profesional de **Gustavo Baranda**, Full Stack Developer. Desarrollado con Next.js 16 (App Router), React 19, Tailwind CSS v4 y animaciones interactivas con Framer Motion. Incluye un sistema de contacto integrado mediante API Route de Next.js y Nodemailer.

---

## ✨ Características Principales

* 🎨 **Diseño Moderno & Responsivo**: Interfaz fluida adaptable a dispositivos móviles, tablets y escritorio.
* 🌓 **Modo Oscuro / Claro**: Detección automática del tema del sistema y persistencia mediante `localStorage`.
* ✉️ **Formulario de Contacto Funcional**: Envió de mensajes por correo electrónico a través de SMTP (Gmail) utilizando Nodemailer y plantillas HTML personalizadas.
* 🚀 **SEO & Metadatos Optimizados**: Soporte para OpenGraph, Twitter Cards, estructura semántica y `metadataBase` dinámica.
* ⚡ **Rendimiento Máximo**: Optimización de fuentes con `next/font/google` (Montserrat) e imágenes SVG integradas.

---

## 🛠️ Tecnologías Utilizadas

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Biblioteca UI:** [React 19](https://react.dev/)
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
* **Iconos:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
* **Envió de Emails:** [Nodemailer](https://nodemailer.com/)

---

## 📁 Estructura del Proyecto

```bash
GusDev/
├── public/                 # Archivos estáticos e imágenes
├── src/
│   ├── app/                # Next.js App Router (Rutas de la app)
│   │   ├── about/          # Sección Sobre Mí
│   │   ├── api/            # Rutas de API de Next.js
│   │   │   └── contact/    # Endpoint POST para el formulario de contacto (Nodemailer)
│   │   ├── contact/        # Página de Contacto
│   │   ├── projects/       # Sección de Proyectos
│   │   ├── globals.css     # Estilos globales y Tailwind CSS
│   │   └── layout.js       # Layout principal (Header, Footer, Metadata)
│   ├── assets/             # Recursos vectoriales y logos
│   ├── components/         # Componentes UI reutilizables (Header, Footer, etc.)
│   └── data/               # Datos estáticos (proyectos, habilidades, etc.)
├── .env                    # Configuración de variables de entorno
└── package.json
```

---

## ⚙️ Configuración del Entorno (`.env`)

Crea un archivo `.env.local` en la raíz del proyecto basándote en la siguiente estructura:

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
   git clone https://github.com/tu-usuario/gusdev.git
   cd gusdev
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
* `npm run build`: Compila la aplicación para producción.
* `npm run start`: Inicia el servidor de producción compilado.
* `npm run lint`: Ejecuta ESLint para verificar la calidad del código.

---

## 📄 Licencia

Este proyecto es de uso personal y está bajo la licencia [MIT](LICENSE).

---
Desarrollado con ❤️ por **[Gustavo Baranda](https://github.com/tu-usuario)**
