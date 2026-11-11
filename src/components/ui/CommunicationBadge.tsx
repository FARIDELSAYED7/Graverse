import { Radio, Signal, SignalZero } from "lucide-react";
import {
  communicationStatusLabels,
  communicationStatusTone,
  type CommunicationStatus,
} from "@/lib/mission-control";
import { statusToneClasses } from "@/lib/status";
import { cn } from "@/lib/cn";
import { t, type Locale } from "@/lib/i18n";

const icons = {
  communicating: Signal,
  "lost-contact": SignalZero,
  intermittent: Radio,
  "not-applicable": Radio,
  unknown: Radio,
} as const;

export function CommunicationBadge({
  status,
  compact = false,
  className,
  locale = "en",
}: {
  status: CommunicationStatus;
  compact?: boolean;
  className?: string;
  locale?: Locale;
}) {
  const Icon = icons[status];
  return (
    <span
      dir="auto"
      title={`${t(locale, "common.derived")} — ${t(locale, "common.derivedNote")}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        compact ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        statusToneClasses(communicationStatusTone[status]),
        className
      )}
    >
      <Icon aria-hidden="true" className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      <span className="opacity-70">
        Communication:
      </span>
      <span>{communicationStatusLabels[status]}</span>
    </span>
  );
}
