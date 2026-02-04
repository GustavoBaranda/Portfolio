import { Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat'
});

export const metadata = {
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

const RootLayout = ({ children }) => {
  return (
    <html lang="es">
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

