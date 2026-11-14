import type { Locale } from "@/lib/i18n";
import type { Localized, LocalizedList } from "@/types/echo";

/**
 * Picks the right language out of a bilingual field.
 *
 * The ECHOES content is authored in both languages at the data layer, so
 * there is no runtime translation and no missing-string fallback beyond the
 * shared `t()` helper.
 */
export function pick(locale: Locale, value: Localized): string {
  return locale === "ar" ? value.ar : value.en;
}

export function pickList(locale: Locale, value: LocalizedList): string[] {
  return locale === "ar" ? value.ar : value.en;
}

/** Replaces `{token}` placeholders in an interface string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, token) =>
    token in values ? String(values[token]) : match
  );
}
