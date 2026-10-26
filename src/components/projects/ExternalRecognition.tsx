"use client";

import { BadgeCheck, ExternalLink, GitCommitHorizontal } from "lucide-react";
import { XERJ_RECOGNITION } from "@/config/recognition";
import { useI18n } from "@/i18n/LocaleProvider";

export default function ExternalRecognition() {
  const { dictionary } = useI18n();

  return (
    <aside
      aria-labelledby="external-recognition-title"
      className="rounded-[0.35rem] border border-soft surface-card p-4 sm:p-6 shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            {dictionary.recognition.eyebrow}
          </p>
          <h3 id="external-recognition-title" className="mt-2 text-lg sm:text-xl font-bold text-foreground">
            {dictionary.recognition.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {dictionary.recognition.description}
          </p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-foreground">{dictionary.recognition.contributionLabel}</dt>
              <dd className="mt-1 text-muted">{dictionary.recognition.contribution}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">{dictionary.recognition.statusLabel}</dt>
              <dd className="mt-1 text-muted">{dictionary.recognition.status}</dd>
            </div>
          </dl>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
          <a
            href={XERJ_RECOGNITION.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {dictionary.recognition.sourceLink}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={XERJ_RECOGNITION.selectedCommitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <GitCommitHorizontal className="h-4 w-4" aria-hidden="true" />
            {dictionary.recognition.commitLink}
          </a>
        </div>
      </div>
    </aside>
  );
}
