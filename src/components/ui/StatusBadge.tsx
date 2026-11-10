import { CircleDot, Radio, type LucideIcon } from "lucide-react";
import {
  hardwareStatusLabels,
  hardwareStatusTone,
  missionStatusLabels,
  missionStatusTone,
  statusToneClasses,
  type StatusTone,
} from "@/lib/status";
import type { HardwareStatus, MissionStatus } from "@/types/artifact";
import { cn } from "@/lib/cn";

type StatusBadgeProps = {
  compact?: boolean;
  className?: string;
} & (
  | { kind: "mission"; status: MissionStatus }
  | { kind: "hardware"; status: HardwareStatus }
);

export function StatusBadge(props: StatusBadgeProps) {
  const { kind, compact = false, className } = props;

  let label: string;
  let tone: StatusTone;
  let Icon: LucideIcon;

  if (props.kind === "mission") {
    label = missionStatusLabels[props.status];
    tone = missionStatusTone(props.status);
    Icon = CircleDot;
  } else {
    label = hardwareStatusLabels[props.status];
    tone = hardwareStatusTone(props.status);
    Icon = Radio;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        compact ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        statusToneClasses(tone),
        className
      )}
    >
      <Icon aria-hidden="true" className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      <span className="opacity-70">
        {kind === "mission" ? "Mission" : "Hardware"}:
      </span>
      <span>{label}</span>
    </span>
  );
}
