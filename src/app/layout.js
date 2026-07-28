import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
});

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
};

export const metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'Gustavo Baranda | Full Stack Developer',
    template: '%s | Gustavo Baranda',
  },
  description: 'Full Stack Developer enfocado en construir sistemas robustos con Python, Django y React. Transformo ideas en soluciones digitales con código limpio y diseño intuitivo.',
  keywords: ['Full Stack Developer', 'Python', 'Django', 'React', 'APIs', 'Argentina', 'Software Engineer'],
  authors: [{ name: 'Gustavo Baranda' }],
  creator: 'Gustavo Baranda',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Gustavo Baranda | Full Stack Developer',
    description: 'Transformo ideas en soluciones digitales con código y diseño.',
    url: getBaseUrl(),
    siteName: 'Gustavo Baranda Portfolio',
    images: [
      {
        url: '/images/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Gustavo Baranda - Full Stack Developer',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gustavo Baranda | Full Stack Developer',
    description: 'Transformo ideas en soluciones digitales con código y diseño.',
    images: ['/images/logo.svg'],
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

const RootLayout = ({ children }) => {
  return (
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <head>
        <Script id="theme-toggle" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
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
