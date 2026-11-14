import type { EchoFact } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";

/**
 * The mission fact panel.
 *
 * A definition list, because the content really is a set of labelled values.
 */
export function MissionFactPanel({
  facts,
  locale,
  title,
  note,
}: {
  facts: EchoFact[];
  locale: Locale;
  title?: string;
  /** Kept for callers; the panel now shares one neutral card treatment. */
  accent?: string;
  note?: string;
}) {
  if (facts.length === 0) return null;
  return (
    <div className="echo-card rounded-2xl p-5 sm:p-6">
      <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
        {title ?? t(locale, "echo.missionFacts")}
      </h3>
      <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={pick(locale, fact.label)}>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b6484]">
              {pick(locale, fact.label)}
            </dt>
            <dd className="mt-0.5 text-sm leading-relaxed text-[#1a1338]">
              {pick(locale, fact.value)}
            </dd>
          </div>
        ))}
      </dl>
      {note ? (
        <p className="mt-4 border-t border-[#1a1338]/10 pt-3 text-xs text-[#6b6484]">
          {note}
        </p>
      ) : null}
    </div>
  );
}
