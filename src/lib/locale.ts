import { cookies } from "next/headers";
import { LOCALE_COOKIE, localeMeta, type Locale } from "@/lib/i18n";

export { LOCALE_COOKIE };

/**
 * Reads the interface locale from a cookie on the server. The default is
 * English; no browser language sniffing is used, so the choice is explicit.
 */
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return value === "ar" ? "ar" : "en";
}

export function localeAttributes(locale: Locale) {
  const meta = localeMeta[locale];
  return { lang: meta.htmlLang, dir: meta.dir };
}
