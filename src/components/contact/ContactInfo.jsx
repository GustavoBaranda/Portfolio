import { Mail, MapPin, CheckCircle, Github, Linkedin } from "lucide-react";
import SocialLinks from "@/components/common/SocialLinks";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Availability Status Badge */}
      <div className="surface-glass border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          Disponible para proyectos & nuevas oportunidades
        </span>
      </div>

      {/* Info Cards */}
      <div className="space-y-4">
        <a
          href="mailto:baranda.gustavo@gmail.com"
          className="group flex items-center gap-4 surface-card border border-soft p-5 rounded-2xl transition hover:border-indigo-500/40"
        >
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Correo Electrónico
            </p>
            <p className="text-base font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              baranda.gustavo@gmail.com
            </p>
          </div>
        </a>

        <div className="flex items-center gap-4 surface-card border border-soft p-5 rounded-2xl">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Ubicación
            </p>
            <p className="text-base font-bold text-foreground">
              Buenos Aires, Argentina
            </p>
          </div>
        </div>
      </div>

      {/* Social Links Container */}
      <div className="surface-card border border-soft p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
          Conéctate en Redes
        </h3>
        <SocialLinks className="flex items-center gap-4" iconSize={22} />
      </div>
    </div>
  );
}
