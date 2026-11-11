import { ExternalLink } from "lucide-react";
import { getSources, sourceTypeLabels } from "@/data/sources";
import { formatDate } from "@/lib/format";

export function SourceList({
  ids,
  title = "Sources",
  compact = false,
}: {
  ids: string[];
  title?: string;
  compact?: boolean;
}) {
  const records = getSources(ids);
  if (records.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-text-secondary">
        No source is recorded for this item.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
      <ol className={compact ? "mt-3 space-y-2" : "mt-4 space-y-3"}>
        {records.map((source) => (
          <li
            key={source.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
          >
            <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-text-muted">
              <span className="font-mono text-text-muted">{source.id}</span>
              <span aria-hidden="true">·</span>
              <span>{sourceTypeLabels[source.type]}</span>
              <span aria-hidden="true">·</span>
              <span>Accessed {formatDate(source.accessedAt)}</span>
            </div>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1.5 inline-flex items-start gap-1.5 text-sm font-medium text-accent-bright hover:text-white"
            >
              {source.organization} — {source.title}
              <ExternalLink aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            </a>
            {!compact && source.notes ? (
              <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                {source.notes}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
