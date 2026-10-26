import { notFound } from "next/navigation";
import PortfolioPage from "@/components/PortfolioPage";
import { localeFromSegments } from "@/i18n/config";
import { createHomeMetadata } from "@/config/site";
import type { Metadata } from "next";

interface LocalizedPageProps {
  params: Promise<{ locale?: string[] }>;
}

export function generateStaticParams() {
  return [{ locale: [] }, { locale: ["en"] }];
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const locale = localeFromSegments((await params).locale);
  return locale ? createHomeMetadata(locale) : {};
}

export default async function LocalizedPage({ params }: LocalizedPageProps) {
  const locale = localeFromSegments((await params).locale);
  if (!locale) notFound();
  return <PortfolioPage locale={locale} />;
}
