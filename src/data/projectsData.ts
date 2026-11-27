import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { NormalizedDate } from "@/i18n/format";
import {
  PROJECT_FACTS,
  resolvePortfolioTerms,
  type ProjectCategoryId,
  type ProjectStatus,
} from "./portfolioFacts";

export interface ProjectCategory {
  id: "all" | ProjectCategoryId;
  label: string;
}

export interface ProjectItem {
  id: string;
  priority: number;
  title: string;
  category: ProjectCategoryId;
  categoryLabel: string;
  company: string;
  period: string;
  dateSort: string;
  startDate: NormalizedDate | null;
  endDate: NormalizedDate | null;
  status: ProjectStatus;
  challenge: string;
  solution: string;
  image: string | null;
  mediaLabel?: string;
  imagePresentation: "interface" | "wide-logo" | "square-logo";
  tags: string[];
  featured: boolean;
  githubUrl: string | null;
  demoUrl: string | null;
  packageUrl: string | null;
  documentationUrl: string | null;
  imageAlt?: string;
  demoLabel?: string;
}

export function getProjectCategories(locale: Locale = DEFAULT_LOCALE): ProjectCategory[] {
  const dictionary = getDictionary(locale);
  return [
    { id: "all", label: dictionary.projects.categories.all },
    { id: "full-stack", label: dictionary.projects.categories["full-stack"] },
    { id: "apis", label: dictionary.projects.categories.apis },
    { id: "opensource", label: dictionary.projects.categories.opensource },
  ];
}

export function getProjects(locale: Locale = DEFAULT_LOCALE): ProjectItem[] {
  const dictionary = getDictionary(locale);
  return PROJECT_FACTS.map((fact) => {
  const content = dictionary.projects.entries[
    fact.id as keyof typeof dictionary.projects.entries
  ];
  const localizedDemoUrl = "localizedDemoUrl" in fact
    ? fact.localizedDemoUrl[locale]
    : undefined;
  const packageUrl = "packageUrl" in fact ? fact.packageUrl : null;
  const documentationUrl = "documentationUrl" in fact
    ? fact.documentationUrl[locale] ?? null
    : null;
  return {
    ...fact,
    demoUrl: localizedDemoUrl ?? fact.demoUrl,
    packageUrl,
    documentationUrl,
    tags: resolvePortfolioTerms(fact.tags, dictionary.terms),
    ...content,
    imageAlt: "imageAlt" in content ? content.imageAlt : undefined,
    demoLabel: "demoLabel" in content ? content.demoLabel : undefined,
    mediaLabel: content.mediaLabel || undefined,
    dateSort: fact.sortDate ?? "9999-99",
  };
  });
}

export const PROJECT_CATEGORIES: ProjectCategory[] = getProjectCategories();
export const PROJECTS: ProjectItem[] = getProjects();
