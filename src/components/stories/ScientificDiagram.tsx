"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import type { EchoDiagram } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";

/**
 * Scientific diagrams.
 *
 * Every diagram is drawn by GRAVERSE as an SVG, so it stays crisp, works in
 * both writing directions and can carry clickable markers that are real
 * HTML buttons — keyboard reachable, and announced by screen readers.
 *
 * The drawings are teaching diagrams of the real hardware, not NASA
 * photographs, and the panel says so.
 */
export function ScientificDiagram({
  diagram,
  locale,
  accent = "#6d4aff",
}: {
  diagram: EchoDiagram;
  locale: Locale;
  accent?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = diagram.points.find((point) => point.id === activeId) ?? null;

  return (
    <figure className="echo-card overflow-hidden rounded-2xl">
      <div className="border-b border-[#1a1338]/10 bg-white/60 px-5 py-4">
        <figcaption>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
            {t(locale, "echo.diagram")}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-[#1a1338]">
            {pick(locale, diagram.title)}
          </h3>
          <p className="mt-1 text-sm text-[#4a4266]">{pick(locale, diagram.intro)}</p>
        </figcaption>
      </div>

      <div className="relative bg-[#f6f1e6]">
        <svg
          viewBox={viewBoxFor(diagram.kind)}
          className="block h-auto w-full"
          role="img"
          aria-label={pick(locale, diagram.title)}
        >
          <defs>
            <linearGradient id="echo-panel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ece3d2" />
            </linearGradient>
            <linearGradient id="echo-metal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#cfd6e6" />
              <stop offset="100%" stopColor="#8f9bb5" />
            </linearGradient>
          </defs>

          {diagram.kind === "journey-map" ? (
            <JourneyArt accent={accent} />
          ) : diagram.kind === "rover-components" ? (
            <RoverArt />
          ) : diagram.kind === "small-rover-components" ? (
            <SmallRoverArt />
          ) : diagram.kind === "lander-components" ? (
            <LanderArt />
          ) : (
            <InstrumentArt />
          )}
        </svg>

        {diagram.points.map((point, index) => {
          const selected = activeId === point.id;
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => setActiveId(selected ? null : point.id)}
              aria-expanded={selected}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[11px] font-bold shadow-md transition-transform ${
                  selected
                    ? "scale-110 border-white text-white"
                    : "border-white text-[#1a1338]"
                }`}
                style={{ backgroundColor: selected ? accent : "#ffffff" }}
              >
                {index + 1}
              </span>
              <span className="sr-only">{pick(locale, point.label)}</span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-[#1a1338]/10 bg-white/70 px-5 py-4">
        {active ? (
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-[#1a1338]">
              <Info aria-hidden="true" className="h-4 w-4 text-[#5b3fe0]" />
              {pick(locale, active.label)}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#4a4266]">
              {pick(locale, active.detail)}
            </p>
          </div>
        ) : (
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#4a4266]">
            {diagram.points.map((point, index) => (
              <li key={point.id} className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-white text-[10px] font-bold text-[#1a1338] shadow-sm"
                >
                  {index + 1}
                </span>
                {pick(locale, point.label)}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[11px] text-[#6b6484]">
          {t(locale, "echo.kind.illustration")} · GRAVERSE
        </p>
      </div>
    </figure>
  );
}

/* ----------------------------------------------------------------- artwork */

/** A tight view box for each drawing, so the panel is not mostly empty. */
function viewBoxFor(kind: EchoDiagram["kind"]): string {
  switch (kind) {
    case "small-rover-components":
      return "12 24 76 50";
    case "instrument-components":
      return "14 30 72 52";
    case "lander-components":
      return "6 4 88 82";
    case "rover-components":
      return "6 12 88 80";
    case "journey-map":
    default:
      return "0 0 100 100";
  }
}

function JourneyArt({ accent }: { accent: string }) {
  return (
    <g>
      <rect x="0" y="0" width="100" height="100" fill="#120e2c" />
      <circle cx="50" cy="50" r="9" fill="#f7c948" opacity="0.9" />
      <circle cx="50" cy="50" r="15" fill="#f7c948" opacity="0.18" />
      {[
        [8, 12],
        [20, 30],
        [72, 14],
        [88, 40],
        [30, 74],
        [66, 82],
        [12, 54],
        [92, 76],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.9" fill="#ffffff" opacity="0.8" />
      ))}
      <path
        d="M12 58 Q 48 12 84 32"
        fill="none"
        stroke={accent}
        strokeWidth="1.6"
        strokeDasharray="3 2"
      />
      <circle cx="12" cy="58" r="4.2" fill="#4aa3f0" />
      <circle cx="12" cy="58" r="6.6" fill="none" stroke="#4aa3f0" strokeWidth="0.6" opacity="0.6" />
      <circle cx="84" cy="32" r="3.4" fill="#ef6f8e" />
      <circle cx="84" cy="32" r="5.6" fill="none" stroke="#ef6f8e" strokeWidth="0.6" opacity="0.6" />
      <path
        d="M50 41 l-2.4 5.4h4.8z"
        fill="#ffffff"
        transform="translate(-14,4)"
      />
    </g>
  );
}

function RoverArt() {
  return (
    <g>
      <rect x="0" y="0" width="100" height="100" fill="#f6f1e6" />
      <ellipse cx="50" cy="84" rx="34" ry="5" fill="#1a1338" opacity="0.08" />
      {/* solar wings */}
      <rect x="12" y="40" width="28" height="12" rx="2" fill="url(#echo-metal)" stroke="#5b6479" strokeWidth="0.5" />
      <rect x="60" y="40" width="28" height="12" rx="2" fill="url(#echo-metal)" stroke="#5b6479" strokeWidth="0.5" />
      {[16, 22, 28, 34, 62, 68, 74, 80].map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="52" stroke="#6b7691" strokeWidth="0.35" />
      ))}
      {/* body */}
      <rect x="34" y="34" width="32" height="26" rx="5" fill="url(#echo-panel)" stroke="#b9ae97" strokeWidth="0.6" />
      <rect x="39" y="39" width="22" height="8" rx="3" fill="#2b1f6b" opacity="0.85" />
      {/* mast */}
      <rect x="48" y="24" width="3" height="11" rx="1.5" fill="#7c8699" />
      <rect x="42" y="18" width="15" height="7" rx="3" fill="url(#echo-panel)" stroke="#b9ae97" strokeWidth="0.6" />
      <circle cx="49.5" cy="21.5" r="1.4" fill="#12a89b" />
      {/* arm */}
      <path d="M66 54 q 8 6 12 12" fill="none" stroke="#7c8699" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="78" cy="66" r="2.4" fill="#8f9bb5" />
      {/* wheels */}
      {[38, 50, 62].map((x) => (
        <g key={x}>
          <circle cx={x} cy="66" r="6" fill="#3c4460" />
          <circle cx={x} cy="66" r="2.4" fill="#9aa4bb" />
        </g>
      ))}
    </g>
  );
}

/**
 * A small six-wheeled rover with a flat solar lid — the Sojourner shape.
 */
function SmallRoverArt() {
  return (
    <g>
      <rect x="0" y="0" width="100" height="100" fill="#f6f1e6" />
      <ellipse cx="50" cy="78" rx="28" ry="4.5" fill="#1a1338" opacity="0.08" />
      {/* Body */}
      <rect x="30" y="46" width="40" height="16" rx="3" fill="url(#echo-panel)" stroke="#b9ae97" strokeWidth="0.6" />
      {/* Solar lid */}
      <rect x="31" y="42" width="38" height="5" rx="1.5" fill="#2b3a6b" stroke="#1a1338" strokeWidth="0.4" />
      {[34, 38, 42, 46, 50, 54, 58, 62, 66].map((x) => (
        <line key={x} x1={x} y1="42.5" x2={x} y2="46.5" stroke="#7dd3fc" strokeWidth="0.35" />
      ))}
      {/* Camera pair */}
      <rect x="31" y="48" width="7" height="7" rx="2" fill="url(#echo-metal)" stroke="#5b6479" strokeWidth="0.5" />
      <circle cx="34.5" cy="51.5" r="1.6" fill="#12a89b" />
      {/* Spectrometer */}
      <rect x="60" y="49" width="8" height="6" rx="1.5" fill="url(#echo-metal)" stroke="#5b6479" strokeWidth="0.5" />
      {/* Antenna */}
      <path d="M68 46 L72 32" stroke="#7c8699" strokeWidth="1" />
      <circle cx="72.5" cy="30" r="2" fill="#6d4aff" />
      {/* Wheels */}
      {[34, 50, 66].map((x) => (
        <g key={x}>
          <circle cx={x} cy="66" r="5.2" fill="#3c4460" />
          <circle cx={x} cy="66" r="2" fill="#9aa4bb" />
        </g>
      ))}
      {/* Rocker bar */}
      <path d="M34 62 L50 58 L66 62" fill="none" stroke="#8f9bb5" strokeWidth="1.1" />
    </g>
  );
}

function LanderArt() {
  return (
    <g>
      <rect x="0" y="0" width="100" height="100" fill="#f6f1e6" />
      <ellipse cx="50" cy="86" rx="32" ry="5" fill="#1a1338" opacity="0.08" />
      {/* ascent stage */}
      <path d="M38 40 L62 40 L58 22 L42 22 Z" fill="url(#echo-panel)" stroke="#b9ae97" strokeWidth="0.6" />
      <rect x="44" y="28" width="12" height="7" rx="2" fill="#2b1f6b" opacity="0.85" />
      <rect x="49" y="12" width="2" height="10" fill="#7c8699" />
      <circle cx="50" cy="11" r="2.4" fill="#6d4aff" />
      {/* descent stage */}
      <path d="M30 42 L70 42 L66 60 L34 60 Z" fill="url(#echo-metal)" stroke="#5b6479" strokeWidth="0.6" />
      <path d="M36 46 L64 46 L62 54 L38 54 Z" fill="#e8c46a" opacity="0.8" />
      {/* legs */}
      {[34, 66].map((x) => (
        <g key={x}>
          <path d={`M${x} 56 L${x < 50 ? 20 : 80} 80`} fill="none" stroke="#7c8699" strokeWidth="1.4" />
          <path d={`M${x} 56 L${x < 50 ? 30 : 70} 78`} fill="none" stroke="#7c8699" strokeWidth="1" />
          <ellipse cx={x < 50 ? 20 : 80} cy="80" rx="4" ry="1.6" fill="#5b6479" />
        </g>
      ))}
      <rect x="42" y="62" width="16" height="9" rx="2" fill="#3c4460" />
    </g>
  );
}

function InstrumentArt() {
  return (
    <g>
      <rect x="0" y="0" width="100" height="100" fill="#f6f1e6" />
      <ellipse cx="50" cy="84" rx="30" ry="4.5" fill="#1a1338" opacity="0.08" />
      {/* retroreflector panel */}
      <rect x="22" y="44" width="34" height="24" rx="3" fill="url(#echo-panel)" stroke="#b9ae97" strokeWidth="0.6" />
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 8 }).map((__, column) => (
          <circle
            key={`${row}-${column}`}
            cx={26 + column * 4}
            cy={48 + row * 3.4}
            r="1.3"
            fill="#8f9bb5"
          />
        ))
      )}
      {/* seismometer */}
      <rect x="62" y="40" width="20" height="16" rx="3" fill="url(#echo-metal)" stroke="#5b6479" strokeWidth="0.6" />
      <rect x="66" y="44" width="12" height="4" rx="2" fill="#2b1f6b" opacity="0.85" />
      <path d="M66 56 L66 62 L80 62" fill="none" stroke="#7c8699" strokeWidth="1.3" />
      {/* solar foil */}
      <path d="M24 74 q 12 -8 26 0 q -12 8 -26 0 Z" fill="#e8c46a" stroke="#b9ae97" strokeWidth="0.5" />
      <line x1="24" y1="74" x2="24" y2="68" stroke="#7c8699" strokeWidth="1.1" />
    </g>
  );
}
