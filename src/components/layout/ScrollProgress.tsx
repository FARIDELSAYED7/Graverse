"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-linked progress rail that sits along the bottom edge of the header.
 * It is purely decorative: transform-only updates on a rAF-throttled passive
 * listener, and it renders nothing when reduced motion is requested.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (document.documentElement.dataset.motion === "reduced") {
      return;
    }

    let frame = 0;
    let latest = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(latest / max, 1) : 0;
      element.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      latest = window.scrollY;
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="scroll-progress" />
  );
}
