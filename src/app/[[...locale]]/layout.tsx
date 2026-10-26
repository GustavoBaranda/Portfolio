import { Montserrat } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import MotionProvider from "@/components/common/MotionProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BackToTopButton from "@/components/common/BackToTopButton";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { HTML_LANG_BY_LOCALE, localeForNotFound } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createRootMetadata } from "@/config/site";
import { createPortfolioStructuredData, serializeJsonLd } from "@/lib/structured-data";
import type { ReactNode } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = createRootMetadata();

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

interface LocalizedRootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale?: string[] }>;
}

export default async function LocalizedRootLayout({
  children,
  params,
}: LocalizedRootLayoutProps) {
  const { locale: segments } = await params;
  const locale = localeForNotFound(segments);
  const dictionary = getDictionary(locale);
  const structuredData = createPortfolioStructuredData(locale);

  return (
    <html lang={HTML_LANG_BY_LOCALE[locale]} data-theme="light" suppressHydrationWarning>
      <head>
        <Script id="theme-toggle" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      </head>
      <body className={`${montserrat.className} antialiased`} suppressHydrationWarning>
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:rounded-[0.35rem] focus:bg-indigo-600 focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none">
            {dictionary.navigation.skipToContent}
          </a>
          <MotionProvider>
            <Header />
            <div className="site-shell">
              <main tabIndex={-1} id="main-content" className="flex-1 min-w-0 relative">
                <div className="mx-auto w-full max-w-7xl px-6 py-10">{children}</div>
              </main>
              <Footer />
              <BackToTopButton />
            </div>
          </MotionProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
