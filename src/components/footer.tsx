import Link from "next/link";
import Image from "next/image";
import SocialLinks from "@/components/common/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-soft surface-glass backdrop-blur rounded-t-xl mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo & Copyright */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 transition-opacity hover:opacity-90 cursor-pointer"
            aria-label="Ir al inicio"
          >
            <Image
              src="/images/logo.svg"
              alt="Logo Gustavo Baranda"
              width={26}
              height={26}
              className="w-6 h-6 sm:w-6.5 sm:h-6.5 object-contain transition-transform group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <span className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors leading-none">
              Gustavo Baranda
            </span>
          </Link>
          <span className="text-slate-400 dark:text-slate-500 text-xs opacity-60 leading-none">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 leading-none">&copy; {year}</span>
        </div>

        {/* Redes */}
        <SocialLinks className="flex items-center gap-4" />
      </div>
    </footer>
  );
}
