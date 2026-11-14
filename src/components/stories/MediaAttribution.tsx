import { ExternalLink } from "lucide-react";
import type { EchoMedia } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";

/**
 * The attribution record for one media asset.
 *
 * Every asset shows where it came from, who made it, what its usage status
 * is and when the record was verified. The distinction between a NASA
 * photograph and a GRAVERSE reconstruction is always on screen.
 *
 * In compact form — beside a plate — it is one quiet line: caption, credit
 * and the link to the original record. The full form belongs to the sources
 * section, where the usage terms and verification date are stated once per
 * asset instead of under every image.
 */
export function MediaAttribution({
  media,
  locale,
  compact = false,
}: {
  media: EchoMedia;
  locale: Locale;
  compact?: boolean;
}) {
  const kindLabel = t(locale, `echo.kind.${media.kind}`);

  if (compact) {
    return (
      <p className="text-[11px] leading-relaxed text-[#6b6484]">
        <span className="font-bold uppercase tracking-[0.12em] text-[#5b3fe0]">
          {kindLabel}
        </span>
        {media.nasaId ? (
          <span className="font-mono"> · {media.nasaId}</span>
        ) : null}
        {" · "}
        {pick(locale, media.caption)}
        {" — "}
        {media.credit}
        {" · "}
        <a
          href={media.sourceUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="font-semibold text-[#5b3fe0] hover:underline"
        >
          {t(locale, "echo.mediaSource")}
        </a>
      </p>
    );
  }

  return (
    <div className="rounded-2xl border border-[#1a1338]/10 bg-white p-3">
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#5b3fe0]">
        <span>{kindLabel}</span>
        {media.nasaId ? (
          <>
            <span aria-hidden="true">·</span>
            <span className="font-mono font-normal text-[#6b6484]">
              {media.nasaId}
            </span>
          </>
        ) : null}
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-[#4a4266]">
        {pick(locale, media.caption)}
      </p>
      <dl className="mt-2 space-y-1 text-[11px] text-[#6b6484]">
        <div className="flex gap-1.5">
          <dt className="font-semibold">{t(locale, "echo.mediaCredit")}:</dt>
          <dd>{media.credit}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-semibold">{t(locale, "echo.mediaUsage")}:</dt>
          <dd className="flex-1">{pick(locale, media.usage)}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-semibold">{t(locale, "echo.mediaAccessed")}:</dt>
          <dd>{media.accessedAt}</dd>
        </div>
      </dl>
      <a
        href={media.sourceUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#5b3fe0] hover:underline"
      >
        {t(locale, "echo.mediaSource")}
        <ExternalLink aria-hidden="true" className="h-3 w-3" />
      </a>
    </div>
  );
}
