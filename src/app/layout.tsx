import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Metadata } from 'next';
import { ReactNode } from 'react';

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
});

import { getSiteUrl } from '@/config/site';

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Gustavo Baranda | Full Stack Developer & Data Science Student',
    template: '%s | Gustavo Baranda',
  },
  description: 'Full Stack Developer enfocado en construir sistemas robustos con Python, Django y React. Estudiante de Licenciatura en Ciencias de Datos (Udelaciudad).',
  keywords: [
    'Full Stack Developer',
    'Python',
    'Django',
    'React',
    'TypeScript',
    'Ciencia de Datos',
    'ETL',
    'APIs REST',
    'Software Engineer',
    'Buenos Aires',
    'Argentina'
  ],
  authors: [{ name: 'Gustavo Baranda', url: baseUrl }],
  creator: 'Gustavo Baranda',
  publisher: 'Gustavo Baranda',
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Gustavo Baranda | Full Stack Developer & Data Science Student',
    description: 'Transformo ideas en soluciones digitales con código limpio, arquitectura escalable y análisis de datos.',
    url: baseUrl,
    siteName: 'Gustavo Baranda Portfolio',
    images: [
      {
        url: `${baseUrl}/images/opengraph.png`,
        width: 1200,
        height: 630,
        alt: 'Gustavo Baranda - Full Stack Developer & Data Science Student',
        type: 'image/png',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gustavo Baranda | Full Stack Developer',
    description: 'Transformo ideas en soluciones digitales con código y diseño.',
    images: [
      {
        url: `${baseUrl}/images/opengraph.png`,
        width: 1200,
        height: 630,
        alt: 'Gustavo Baranda - Full Stack Developer',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const themeScript = `(() => {
  try {
    const stored = localStorage.getItem("theme");
    const theme = stored ?? "light";
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.setAttribute("data-theme", theme);
  } catch (error) {
    /* no-op */
  }
})();`;

const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gustavo Baranda',
  jobTitle: 'Full Stack Developer',
  url: baseUrl,
  sameAs: [
    'https://github.com/GustavoBaranda',
    'https://linkedin.com/in/gustavo-baranda'
  ],
  knowsAbout: [
    'Full Stack Software Development',
    'Python',
    'Django',
    'React.js',
    'TypeScript',
    'Node.js',
    'SQL Server',
    'Oracle ETL',
    'Data Science'
  ],
  alumniOf: [
    {
      '@type': 'EducationalOrganization',
      name: 'Instituto de Formación Técnica Superior N°29',
    },
    {
      '@type': 'EducationalOrganization',
      name: 'Universidad de la Ciudad de Buenos Aires (Udelaciudad)',
    }
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Buenos Aires',
    addressCountry: 'Argentina'
  }
};

export interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <head>
        <Script id="theme-toggle" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      </head>
      <body
        className={`${montserrat.className} antialiased flex min-h-screen flex-col`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-6 py-10">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
