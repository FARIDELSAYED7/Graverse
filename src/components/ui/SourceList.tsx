import { ExternalLink } from "lucide-react";
import { getSources, sourceTypeLabels } from "@/data/sources";
import { formatDate } from "@/lib/format";

/**
 * A list of verified source records.
 *
 * The default tone matches the dark archive surface. On the light ECHOES
 * paper surface pass `tone="light"` so the links keep their contrast.
 */
export function SourceList({
  ids,
  title = "Sources",
  compact = false,
  tone = "dark",
}: {
  ids: string[];
  title?: string;
  compact?: boolean;
  tone?: "dark" | "light";
}) {
  const records = getSources(ids);
  const light = tone === "light";
  if (records.length === 0) {
    return (
      <div
        className={`rounded-xl border p-4 text-sm ${
          light
            ? "border-[#1a1338]/10 bg-[#f6f1e6]/70 text-[#4a4266]"
            : "border-white/10 bg-white/[0.03] text-text-secondary"
        }`}
      >
        No source is recorded for this item.
      </div>
    );
  }

  return (
    <div>
      <h2
        className={`text-sm font-semibold ${
          light ? "text-[#1a1338]" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
      <ol className={compact ? "mt-3 space-y-2" : "mt-4 space-y-3"}>
        {records.map((source) => (
          <li
            key={source.id}
            className={`rounded-xl border p-3 ${
              light
                ? "border-[#1a1338]/10 bg-[#f6f1e6]/70"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div
              className={`flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] ${
                light ? "text-[#6b6484]" : "text-text-muted"
              }`}
            >
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
              className={`mt-1.5 inline-flex items-start gap-1.5 text-sm font-medium hover:underline ${
                light ? "text-[#5b3fe0] hover:text-[#4a30c4]" : "text-accent-bright hover:text-white"
              }`}
            >
              {source.organization} — {source.title}
              <ExternalLink aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            </a>
            {!compact && source.notes ? (
              <p
                className={`mt-1 text-xs leading-relaxed ${
                  light ? "text-[#4a4266]" : "text-text-secondary"
                }`}
              >
                {source.notes}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
