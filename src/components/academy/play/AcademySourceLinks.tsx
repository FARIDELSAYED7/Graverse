import { ExternalLink } from "lucide-react";
import { getSources, sourceTypeLabels } from "@/data/sources";
import { formatDate } from "@/lib/format";

/**
 * Source links on the light Academy surface. The shared `SourceList` is styled
 * for the dark museum pages, so the playground uses this light variant.
 */
export function AcademySourceLinks({
  ids,
  title = "Sources for the real records",
}: {
  ids: string[];
  title?: string;
}) {
  const records = getSources(ids);
  if (records.length === 0) {
    return null;
  }

  return (
    <div className="academy-card rounded-2xl p-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9C4321]">
        {title}
      </h2>
      <ol className="mt-3 space-y-2">
        {records.map((source) => (
          <li
            key={source.id}
            className="rounded-xl border border-[#14213B]/10 bg-white/70 p-3"
          >
            <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#5F6B83]">
              <span className="font-mono">{source.id}</span>
              <span aria-hidden="true">·</span>
              <span>{sourceTypeLabels[source.type]}</span>
              <span aria-hidden="true">·</span>
              <span>Accessed {formatDate(source.accessedAt)}</span>
            </div>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1.5 inline-flex items-start gap-1.5 text-sm font-medium text-[#0F4F49] underline-offset-4 hover:underline"
            >
              {source.organization} — {source.title}
              <ExternalLink aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            </a>
            {source.notes ? (
              <p className="mt-1 text-xs leading-relaxed text-[#5A6472]">
                {source.notes}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-[11px] leading-relaxed text-[#5F6B83]">
        These citations belong to the real lesson and museum records. The game
        itself adds no new mission facts.
      </p>
    </div>
  );
}
