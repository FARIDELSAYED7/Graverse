import {
  Orbit,
  PackageOpen,
  Plane,
  Radar,
  Satellite,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { DestinationGroup, HardwareType } from "@/types/artifact";

const accents: Record<DestinationGroup, string> = {
  moon: "#8fc7ff",
  mars: "#ff9d7a",
  "deep-space": "#c3a6ff",
};

const hardwareIcons: Record<HardwareType, LucideIcon> = {
  rover: Truck,
  lander: PackageOpen,
  orbiter: Orbit,
  probe: Satellite,
  instrument: Radar,
  "surface-equipment": Wrench,
  aircraft: Plane,
};

const sizeClasses = {
  xs: "h-8 w-8",
  sm: "h-11 w-11",
  md: "h-16 w-16",
  lg: "h-20 w-20 sm:h-24 sm:w-24",
} as const;

const iconSizes = {
  xs: "h-2.5 w-2.5",
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
} as const;

type RobotAvatarProps = {
  destinationGroup: DestinationGroup;
  hardwareType: HardwareType;
  size?: keyof typeof sizeClasses;
  className?: string;
};

/**
 * Decorative robot face for the scripted guide. The artifact name and type
 * are always present as text next to it, so the SVG is hidden from assistive
 * technology. The slow float and blink stop under reduced motion.
 */
export function RobotAvatar({
  destinationGroup,
  hardwareType,
  size = "md",
  className,
}: RobotAvatarProps) {
  const accent = accents[destinationGroup];
  const Icon = hardwareIcons[hardwareType];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        sizeClasses[size],
        className
      )}
      style={{ color: accent }}
    >
      <svg
        viewBox="0 0 120 132"
        className="robot-avatar h-full w-full drop-shadow-[0_8px_24px_rgba(67,185,255,0.25)]"
        fill="none"
      >
        <line
          x1="60"
          y1="26"
          x2="60"
          y2="14"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle
          cx="60"
          cy="11"
          r="5.5"
          fill="currentColor"
          className="robot-antenna"
        />
        <rect
          x="16"
          y="28"
          width="88"
          height="72"
          rx="24"
          fill="#08172D"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="3"
        />
        <rect
          x="25"
          y="41"
          width="70"
          height="44"
          rx="16"
          fill="#040D1D"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
        <rect
          x="37"
          y="55"
          width="16"
          height="13"
          rx="6"
          fill="currentColor"
          className="robot-eye"
        />
        <rect
          x="67"
          y="55"
          width="16"
          height="13"
          rx="6"
          fill="currentColor"
          className="robot-eye"
        />
        <path
          d="M47 81 Q60 89 73 81"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
        <rect
          x="4"
          y="52"
          width="10"
          height="24"
          rx="5"
          fill="currentColor"
          opacity="0.55"
        />
        <rect
          x="106"
          y="52"
          width="10"
          height="24"
          rx="5"
          fill="currentColor"
          opacity="0.55"
        />
        <rect
          x="49"
          y="103"
          width="22"
          height="7"
          rx="3.5"
          fill="currentColor"
          opacity="0.45"
        />
      </svg>
      <span
        className={cn(
          "absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full border border-white/15 bg-bg-elevated text-white/85",
          size === "xs" || size === "sm" ? "h-4 w-4" : "h-6 w-6"
        )}
      >
        <Icon className={iconSizes[size]} />
      </span>
    </span>
  );
}
