"use client";

import { useEffect, useState } from "react";
import type { EchoAnimationState } from "@/lib/echo/provider";

/**
 * A hand-drawn SVG of ECHO used when WebGL is unavailable.
 *
 * It is not a screenshot of the 3D model: it is a separate, simpler
 * illustration so the companion is never missing, and it still reacts to the
 * current animation state through CSS.
 */
export function EchoFallback({
  state,
  className,
}: {
  state: EchoAnimationState;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const eyeScale = state === "thinking" ? 0.7 : state === "listening" ? 1.15 : 1;
  const mouthWidth = state === "celebrating" ? 34 : state === "talking" ? 26 : 20;
  const tilt = state === "thinking" ? -10 : state === "listening" ? 6 : 0;

  return (
    <svg
      viewBox="0 0 220 240"
      role="img"
      aria-label="ECHO, the GRAVERSE space story companion"
      className={className}
      style={{
        transform: `rotate(${mounted ? tilt : 0}deg)`,
        transition: "transform 420ms ease",
      }}
    >
      <defs>
        <linearGradient id="echo-shell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d9d3c6" />
        </linearGradient>
        <linearGradient id="echo-visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2159" />
          <stop offset="100%" stopColor="#14102c" />
        </linearGradient>
        <linearGradient id="echo-ring" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#35e0c8" />
          <stop offset="55%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#8f7bff" />
        </linearGradient>
      </defs>

      <ellipse cx="110" cy="222" rx="62" ry="10" fill="#1a1338" opacity="0.18" />

      <rect x="48" y="196" width="124" height="12" rx="6" fill="url(#echo-ring)" opacity="0.85" />
      <path d="M62 196 L70 160 L150 160 L158 196 Z" fill="url(#echo-shell)" stroke="#b9b0a0" strokeWidth="2" />
      <circle cx="110" cy="176" r="9" fill="#35e0c8" opacity="0.9" />

      <g>
        <rect x="78" y="116" width="12" height="46" rx="6" fill="#aeb8cc" />
        <rect x="44" y="118" width="26" height="12" rx="6" fill="#aeb8cc" />
        <rect x="150" y="118" width="26" height="12" rx="6" fill="#aeb8cc" />
        <rect x="34" y="126" width="12" height="34" rx="6" fill="#f3efe6" stroke="#b9b0a0" strokeWidth="1.5" />
        <rect x="174" y="126" width="12" height="34" rx="6" fill="#f3efe6" stroke="#b9b0a0" strokeWidth="1.5" />
      </g>

      <rect x="66" y="24" width="88" height="78" rx="24" fill="url(#echo-shell)" stroke="#b9b0a0" strokeWidth="2" />
      <rect x="78" y="38" width="64" height="42" rx="16" fill="url(#echo-visor)" />

      <g
        style={{
          transition: "transform 300ms ease",
          transform: `scaleY(${eyeScale})`,
          transformOrigin: "110px 58px",
        }}
      >
        <circle cx="96" cy="58" r="8" fill="#7dd3fc" />
        <circle cx="124" cy="58" r="8" fill="#7dd3fc" />
      </g>

      <rect
        x={110 - mouthWidth / 2}
        y="84"
        width={mouthWidth}
        height="7"
        rx="3.5"
        fill="#35e0c8"
      />

      <rect x="22" y="44" width="12" height="28" rx="6" fill="#aeb8cc" />
      <rect x="186" y="44" width="12" height="28" rx="6" fill="#aeb8cc" />

      <line x1="110" y1="24" x2="110" y2="8" stroke="#aeb8cc" strokeWidth="3" strokeLinecap="round" />
      <circle cx="110" cy="6" r="6" fill="#8f7bff" />
    </svg>
  );
}
