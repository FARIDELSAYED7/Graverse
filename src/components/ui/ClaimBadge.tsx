import { BadgeCheck, CircleHelp, FlaskConical, Sigma } from "lucide-react";
import { claimTypeDescriptions, claimTypeLabels } from "@/lib/provenance";
import type { ClaimType } from "@/types/provenance";
import { cn } from "@/lib/cn";

const tone: Record<ClaimType, string> = {
  confirmed: "border-emerald-400/35 bg-emerald-400/10 text-emerald-200",
  estimated: "border-amber-400/35 bg-amber-400/10 text-amber-200",
  simulated: "border-violet-400/35 bg-violet-400/10 text-violet-200",
  unknown: "border-white/20 bg-white/5 text-text-secondary",
};

const icons = {
  confirmed: BadgeCheck,
  estimated: Sigma,
  simulated: FlaskConical,
  unknown: CircleHelp,
} as const;

export function ClaimBadge({
  claim,
  compact = false,
  className,
}: {
  claim: ClaimType;
  compact?: boolean;
  className?: string;
}) {
  const Icon = icons[claim];
  return (
    <span
      title={claimTypeDescriptions[claim]}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        tone[claim],
        className
      )}
    >
      <Icon aria-hidden="true" className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {claimTypeLabels[claim]}
    </span>
  );
}

export function ClaimLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("grid list-none gap-2 p-0 sm:grid-cols-2", className)}>
      {(Object.keys(claimTypeLabels) as ClaimType[]).map((claim) => (
        <li
          key={claim}
          className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3"
        >
          <ClaimBadge claim={claim} compact />
          <span className="text-xs leading-relaxed text-text-secondary">
            {claimTypeDescriptions[claim]}
          </span>
        </li>
      ))}
    </ul>
  );
}
