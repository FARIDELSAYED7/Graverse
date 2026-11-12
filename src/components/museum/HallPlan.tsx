"use client";

import { useMemo } from "react";
import { accentFor } from "@/lib/gallery";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { GalleryItem } from "@/types/gallery";

type HallPlanProps = {
  items: GalleryItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  locale: Locale;
};

const PLAN_SIZE = 120;
const WALL_RADIUS = 50;
const RING_RADIUS = 39;
const VISITOR_RADIUS = 7.5;

/** Rounds to two decimals so the server and client render identical marks. */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * A plan of the rotunda drawn from the same angles as the WebGL room, so the
 * visitor always knows where they are standing and which bay is ahead.
 *
 * The plan is an accessible control: every bay is a real button, so the room
 * can be navigated without a pointer.
 */
export function HallPlan({
  items,
  selectedIndex,
  onSelect,
  locale,
}: HallPlanProps) {
  const count = Math.max(items.length, 1);

  const bays = useMemo(
    () =>
      items.map((item, index) => {
        const angle = (index / count) * Math.PI * 2;
        return {
          id: item.id,
          name: item.name,
          accent: accentFor(item.destinationGroup),
          angle,
          x: round(PLAN_SIZE / 2 + Math.sin(angle) * RING_RADIUS),
          y: round(PLAN_SIZE / 2 + Math.cos(angle) * RING_RADIUS),
        };
      }),
    [items, count]
  );

  const selected = bays[selectedIndex];

  // The visitor stands on the opposite side of the room from the selected bay,
  // exactly where the camera is placed in the WebGL scene.
  const visitor = selected
    ? {
        x: round(PLAN_SIZE / 2 - Math.sin(selected.angle) * VISITOR_RADIUS),
        y: round(PLAN_SIZE / 2 - Math.cos(selected.angle) * VISITOR_RADIUS),
      }
    : { x: PLAN_SIZE / 2, y: PLAN_SIZE / 2 };

  const wedgeAngle = round(
    (Math.atan2(selected.y - visitor.y, selected.x - visitor.x) * 180) / Math.PI
  );

  return (
    <div className="hall-plan">
      <p className="sr-only">
        {t(locale, "gallery.plan")}. {t(locale, "gallery.planHint")}
      </p>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${PLAN_SIZE} ${PLAN_SIZE}`}
        className="hall-plan__drawing"
      >
        <defs>
          <radialGradient id="hall-plan-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(94,234,212,0.22)" />
            <stop offset="70%" stopColor="rgba(43,108,145,0.06)" />
            <stop offset="100%" stopColor="rgba(4,10,22,0)" />
          </radialGradient>
        </defs>

        <circle cx={PLAN_SIZE / 2} cy={PLAN_SIZE / 2} r={WALL_RADIUS} fill="url(#hall-plan-core)" />
        <circle
          cx={PLAN_SIZE / 2}
          cy={PLAN_SIZE / 2}
          r={WALL_RADIUS}
          fill="none"
          stroke="rgba(148,190,224,0.32)"
          strokeWidth="1.2"
        />
        <circle
          cx={PLAN_SIZE / 2}
          cy={PLAN_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="rgba(148,190,224,0.2)"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />

        {bays.map((bay) => (
          <circle
            key={`ring-${bay.id}`}
            cx={bay.x}
            cy={bay.y}
            r={bay.id === selected?.id ? 4.6 : 2.2}
            fill="none"
            stroke={bay.accent}
            strokeOpacity={bay.id === selected?.id ? 0.9 : 0.32}
            strokeWidth="1"
          />
        ))}

        {selected ? (
          <g transform={`translate(${visitor.x} ${visitor.y}) rotate(${wedgeAngle})`}>
            <path d="M 0 0 L 13 -4.5 L 13 4.5 Z" fill="rgba(255,255,255,0.82)" />
          </g>
        ) : null}
      </svg>

      <ul className="hall-plan__bays">
        {bays.map((bay, index) => {
          const active = index === selectedIndex;
          return (
            <li key={bay.id}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-pressed={active}
                aria-label={`${t(locale, "gallery.bay")} ${index + 1}: ${bay.name}`}
                className="hall-plan__bay"
                style={{
                  left: `${round((bay.x / PLAN_SIZE) * 10000) / 100}%`,
                  top: `${round((bay.y / PLAN_SIZE) * 10000) / 100}%`,
                  backgroundColor: bay.accent,
                }}
              >
                <span className="sr-only">{bay.name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <span className="hall-plan__label">
        {t(locale, "gallery.bay")}{" "}
        <span className="font-mono tabular-nums">
          {selectedIndex + 1}/{count}
        </span>
      </span>
    </div>
  );
}
