"use client";

import { useEffect, useState } from "react";
import { Accessibility, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

type MotionToggleProps = {
  className?: string;
  showLabel?: boolean;
};

/**
 * Site-level motion preference. The system preference is always respected by
 * CSS; this control lets a visitor opt out even when the OS preference is on.
 */
export function MotionToggle({ className, showLabel = false }: MotionToggleProps) {
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem("graverse-motion");
      if (stored === "reduced") {
        setReduced(true);
        document.documentElement.dataset.motion = "reduced";
      } else if (stored === "full") {
        setReduced(false);
        document.documentElement.dataset.motion = "full";
      } else {
        setReduced(
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        );
      }
    } catch {
      // localStorage may be unavailable; the CSS media query still applies.
    }
  }, []);

  function toggle() {
    const next = !reduced;
    setReduced(next);
    try {
      window.localStorage.setItem("graverse-motion", next ? "reduced" : "full");
    } catch {
      // Ignore storage failures.
    }
    document.documentElement.dataset.motion = next ? "reduced" : "full";
  }

  const Icon = reduced ? Accessibility : Sparkles;
  const label = reduced ? "Enable interface motion" : "Reduce interface motion";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={reduced}
      title={label}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary",
        showLabel ? "px-3 py-2 text-xs" : "h-9 w-9 justify-center",
        className
      )}
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
      <span className={showLabel ? "" : "sr-only"}>
        {mounted ? label : "Motion preference"}
      </span>
    </button>
  );
}
