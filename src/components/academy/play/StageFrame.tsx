"use client";

import type { ReactNode } from "react";
import { useWebGL } from "./use-webgl";

/**
 * Frame around a lazy 3D toy. The canvas is decorative; every game action lives
 * in real HTML controls outside this frame.
 */
export function StageFrame({
  children,
  fallback,
  label,
  height = "tall",
}: {
  children: ReactNode;
  fallback: ReactNode;
  label: string;
  height?: "tall" | "short";
}) {
  const support = useWebGL();

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-[#152238]/10 bg-[linear-gradient(160deg,#0b1b33_0%,#102749_55%,#1b1740_100%)] shadow-[0_24px_60px_-32px_rgba(21,34,56,0.65)]">
      <div
        className={`relative w-full ${
          height === "tall" ? "h-[320px] sm:h-[420px]" : "h-[260px] sm:h-[340px]"
        }`}
      >
        {support === "yes" ? (
          children
        ) : support === "no" ? (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm leading-relaxed text-[#C7D2E4]">
            {fallback}
          </div>
        ) : (
          <p className="flex h-full items-center justify-center text-xs font-medium uppercase tracking-[0.16em] text-[#9FB2CC]">
            3D view loading…
          </p>
        )}
      </div>
      <p className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#D7E2F2]">
        {label}
      </p>
    </div>
  );
}
