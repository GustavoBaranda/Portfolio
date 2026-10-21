import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import MotionProvider from '@/components/common/MotionProvider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ReactNode } from 'react';
import { createRootMetadata } from '@/config/site';
import { createPortfolioStructuredData, serializeJsonLd } from '@/lib/structured-data';

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = createRootMetadata();
const structuredData = createPortfolioStructuredData();

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
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      </head>
      <body
        className={`${montserrat.className} antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:rounded-[0.35rem] focus:bg-indigo-600 focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none"
        >
          Saltar al contenido principal
        </a>
        <MotionProvider>
          <Header />
          <div className="site-shell">
            <main tabIndex={-1} id="main-content" className="flex-1 min-w-0 relative">
              <div className="mx-auto w-full max-w-7xl px-6 py-10">{children}</div>
            </main>
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
