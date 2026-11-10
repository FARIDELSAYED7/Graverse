import type { DatePrecision } from "@/types/artifact";

/**
 * Date helpers. Every date in the dataset is stored as an ISO string with a
 * precision flag so the UI never invents a day that the source did not state.
 */

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parse(iso: string): Date | null {
  const value = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(value.getTime()) ? null : value;
}

export function formatDate(
  iso: string,
  precision: DatePrecision = "day"
): string {
  const date = parse(iso);
  if (!date) return "Date not documented";
  const day = date.getUTCDate();
  const month = MONTHS[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  if (precision === "year") return `${year}`;
  if (precision === "month") return `${month} ${year}`;
  return `${day} ${month} ${year}`;
}

export function formatShortDate(
  iso: string,
  precision: DatePrecision = "day"
): string {
  const date = parse(iso);
  if (!date) return "Unknown";
  const month = MONTHS[date.getUTCMonth()].slice(0, 3);
  const year = date.getUTCFullYear();
  if (precision === "year") return `${year}`;
  if (precision === "month") return `${month} ${year}`;
  return `${date.getUTCDate()} ${month} ${year}`;
}

export function formatYear(iso?: string): string {
  if (!iso) return "Unknown";
  const date = parse(iso);
  return date ? `${date.getUTCFullYear()}` : "Unknown";
}

export function formatDateRange(start?: string, end?: string): string {
  if (!start && !end) return "Dates not documented";
  if (start && !end) return `From ${formatShortDate(start)}`;
  if (!start && end) return `Until ${formatShortDate(end)}`;
  return `${formatShortDate(start!)} – ${formatShortDate(end!)}`;
}

export function decadeOf(iso: string): string {
  const year = Number(iso.slice(0, 4));
  return `${Math.floor(year / 10) * 10}s`;
}

export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`
): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
