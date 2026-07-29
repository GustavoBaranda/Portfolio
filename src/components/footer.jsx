import SocialLinks from "@/components/common/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-soft surface-glass backdrop-blur rounded-t-xl mt-auto">
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-8 sm:pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs sm:text-sm text-muted-link text-center">
          &copy; {year} — Gustavo Baranda
        </div>
        <SocialLinks className="flex items-center gap-4" />
      </div>
    </footer>
  );
}
