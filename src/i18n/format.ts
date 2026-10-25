import { DEFAULT_LOCALE, type Locale } from "./config";

export type YearMonth = `${number}-${number}`;
export type NormalizedDate = `${number}` | YearMonth;

const YEAR_MONTH_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

export function yearMonthToDate(value: YearMonth): Date {
  const match = YEAR_MONTH_PATTERN.exec(value);
  if (!match) throw new RangeError(`Invalid year-month value: ${value}`);
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
}

export function formatMonthYear(
  value: YearMonth,
  locale: Locale = DEFAULT_LOCALE,
): string {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(yearMonthToDate(value));
}

export function periodEndDate(endDate: YearMonth | null): Date {
  return endDate === null ? new Date(Date.UTC(9999, 0, 1)) : yearMonthToDate(endDate);
}

export function formatDuration(
  startDate: YearMonth,
  endDate: YearMonth | null,
  locale: Locale = DEFAULT_LOCALE,
  now: Date = new Date(),
): string {
  const start = yearMonthToDate(startDate);
  const end = endDate
    ? yearMonthToDate(endDate)
    : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const totalMonths =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    start.getUTCMonth() +
    1;

  if (totalMonths <= 0) return "";

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const number = new Intl.NumberFormat(locale);
  const spanish = locale === "es-AR";
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${number.format(years)} ${spanish ? (years === 1 ? "año" : "años") : years === 1 ? "year" : "years"}`);
  }
  if (months > 0) {
    parts.push(`${number.format(months)} ${spanish ? (months === 1 ? "mes" : "meses") : months === 1 ? "month" : "months"}`);
  }

  return parts.join(" ");
}
