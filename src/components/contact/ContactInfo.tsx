"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  GitPullRequest,
  Handshake,
  Mail,
  MapPin,
} from "lucide-react";
import { useI18n } from "@/i18n/LocaleProvider";

export default function ContactInfo() {
  const { dictionary } = useI18n();
  const professionalPaths = [
    { ...dictionary.contact.professionalPaths.employment, icon: BriefcaseBusiness },
    { ...dictionary.contact.professionalPaths.freelance, icon: Handshake },
    { ...dictionary.contact.professionalPaths.openSource, icon: GitPullRequest },
  ];

  return (
    <div className="min-w-0 w-full rounded-[0.35rem] border border-soft surface-card p-5 sm:p-8 shadow-sm flex flex-col justify-between h-full">
      <div className="min-w-0 flex flex-col gap-4 sm:gap-5">
        {/* Availability Badge */}
        <span className="inline-flex w-fit max-w-full items-center gap-2 rounded-[0.35rem] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"></span>
          <span className="min-w-0">{dictionary.contact.availability}</span>
        </span>

        {/* Title */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">{dictionary.contact.detailsTitle}</h3>
          <p className="mt-1 text-xs sm:text-sm text-muted leading-relaxed">
            {dictionary.contact.detailsDescription}
          </p>
        </div>

        <ul
          aria-label={dictionary.contact.professionalPathsLabel}
          className="grid grid-cols-1 gap-2"
        >
          {professionalPaths.map(({ title, description, icon: Icon }) => (
            <li key={title} className="flex min-w-0 items-start gap-3 rounded-[0.35rem] border border-soft p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.35rem] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <strong className="block text-xs sm:text-sm text-foreground">{title}</strong>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted">{description}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Contact List */}
        <div className="flex flex-col gap-3">
          {/* Correo */}
          <a
            href="mailto:baranda.gustavo@gmail.com"
            className="group flex items-center gap-3.5 rounded-[0.35rem] border border-soft p-3.5 sm:p-4 transition-colors hover:border-indigo-500/40 hover:bg-surface min-w-0"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.35rem] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Mail className="w-5 h-5" />
            </span>
            <span className="flex flex-col min-w-0 flex-1">
              <span className="text-[0.65rem] sm:text-xs font-bold tracking-wide text-muted uppercase">{dictionary.contact.emailLabel}</span>
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate">baranda.gustavo@gmail.com</span>
            </span>
            <ArrowUpRight className="ml-auto w-4 h-4 text-muted transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0" />
          </a>

          {/* Ubicación */}
          <div className="flex items-center gap-3.5 rounded-[0.35rem] border border-soft p-3.5 sm:p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.35rem] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <MapPin className="w-5 h-5" />
            </span>
            <span className="flex flex-col min-w-0 flex-1">
              <span className="text-[0.65rem] sm:text-xs font-bold tracking-wide text-muted uppercase">{dictionary.contact.locationLabel}</span>
              <span className="text-xs sm:text-sm font-semibold text-foreground">{dictionary.contact.location}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
