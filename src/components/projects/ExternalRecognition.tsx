"use client";

import { ExternalLink, GitCommitHorizontal } from "lucide-react";
import { XERJ_RECOGNITION } from "@/config/recognition";
import { useI18n } from "@/i18n/LocaleProvider";

export default function ExternalRecognition() {
  const { dictionary } = useI18n();

  return (
    <aside
      aria-labelledby="external-recognition-title"
      className="rounded-[0.35rem] border border-soft surface-card p-4 sm:p-5 shadow-sm"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
          {dictionary.recognition.eyebrow}
        </p>
        <h3 id="external-recognition-title" className="mt-2 text-lg sm:text-xl font-bold text-foreground">
          {dictionary.recognition.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {dictionary.recognition.description}
        </p>
        <p className="mt-3 text-xs text-muted">
          {dictionary.recognition.status}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
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
