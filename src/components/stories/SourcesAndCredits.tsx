import { BookMarked } from "lucide-react";
import type { EchoMedia } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { SourceList } from "@/components/ui/SourceList";
import { ECHO_MEDIA_USAGE } from "@/data/echoes/media";
import { MediaAttribution } from "./MediaAttribution";
import { pick } from "@/lib/echo/localized";

/**
 * Sources & credits.
 *
 * The narrative sources (NASA mission pages and technical archives) sit
 * next to the media credits, so a reader can check a claim and check a
 * picture in the same place. The usage terms are stated once for the whole
 * story — the same sentence under every photograph is noise, not care.
 */
export function SourcesAndCredits({
  sourceIds,
  media,
  locale,
}: {
  sourceIds: string[];
  media: EchoMedia[];
  locale: Locale;
}) {
  return (
    <section aria-labelledby="echo-sources-heading" className="echo-card rounded-2xl p-5 sm:p-7">
      <h2
        id="echo-sources-heading"
        className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#5b3fe0]"
      >
        <BookMarked aria-hidden="true" className="h-4 w-4" />
        {t(locale, "echo.sources")}
      </h2>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-[#1a1338]">
            {locale === "ar" ? "نصوص وبيانات" : "Text and data"}
          </h3>
          <div className="mt-3">
            <SourceList
              ids={sourceIds}
              title={t(locale, "common.sources")}
              compact
              tone="light"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#1a1338]">
            {t(locale, "echo.photos")} &amp; {t(locale, "echo.videos")}
          </h3>
          <ul className="mt-3 space-y-2.5">
            {media.map((entry) => (
              <li key={entry.id}>
                <MediaAttribution media={entry} locale={locale} compact />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 border-t border-[#1a1338]/10 pt-4 text-[11px] leading-relaxed text-[#6b6484]">
        {t(locale, "echo.sourceNote")}{" "}
        {pick(locale, ECHO_MEDIA_USAGE)}
      </p>
    </section>
  );
}
