import { ClaimBadge } from "@/components/ui/ClaimBadge";
import type { BodyFact } from "@/types/space";

/**
 * Facts always carry their evidence level. A confirmed or estimated value must
 * name a source; an unknown value says so rather than showing a guessed number.
 */
export function FactGrid({ facts }: { facts: BodyFact[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {facts.map((fact) => (
        <div
          key={`${fact.label}-${fact.value}`}
          className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5"
        >
          <dt className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
              {fact.label}
            </span>
            <ClaimBadge claim={fact.claim} compact />
          </dt>
          <dd className="mt-1.5 text-sm font-medium leading-relaxed text-text-primary">
            {fact.value}
          </dd>
          {fact.sourceIds?.length ? (
            <dd className="mt-1.5 font-mono text-[10px] text-text-muted">
              {fact.sourceIds.join(" · ")}
            </dd>
          ) : fact.claim === "unknown" ? (
            <dd className="mt-1.5 text-[10px] text-text-muted">
              No source establishes this value.
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
