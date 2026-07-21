import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat'
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: 'Gustavo Baranda | Full Stack Developer',
  description: 'Full Stack Developer enfocado en construir sistemas robustos con Python, Django y React. Transformo ideas en soluciones digitales con código limpio y diseño intuitivo.',
  keywords: ['Full Stack Developer', 'Python', 'Django', 'React', 'APIs', 'Argentina'],
  authors: [{ name: 'Gustavo Baranda' }],
  openGraph: {
    title: 'Gustavo Baranda | Full Stack Developer',
    description: 'Transformo ideas en soluciones digitales con código y diseño.',
    url: 'http://localhost:3000', 
    images: [
      {
        url: '/image/opengraph.jpg', 
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
}

const themeScript = `(() => {
  try {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored ?? (prefersDark ? "dark" : "light");
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

