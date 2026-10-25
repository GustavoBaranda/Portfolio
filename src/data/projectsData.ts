import { esARDictionary } from "@/i18n/dictionaries/es-AR";
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
}

const defaultDictionary = esARDictionary;

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  { id: "all", label: defaultDictionary.projects.categories.all },
  { id: "full-stack", label: defaultDictionary.projects.categories["full-stack"] },
  { id: "apis", label: defaultDictionary.projects.categories.apis },
  { id: "opensource", label: defaultDictionary.projects.categories.opensource },
];

export const PROJECTS: ProjectItem[] = PROJECT_FACTS.map((fact) => {
  const content = defaultDictionary.projects.entries[
    fact.id as keyof typeof defaultDictionary.projects.entries
  ];
  return {
    ...fact,
    tags: resolvePortfolioTerms(fact.tags, defaultDictionary.terms),
    ...content,
    mediaLabel: content.mediaLabel || undefined,
    dateSort: fact.sortDate ?? "9999-99",
  };
});
