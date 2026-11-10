"use client";

import { useEffect, useState } from "react";

/** Tracks the OS preference and the site-level toggle. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => {
      const override = document.documentElement.dataset.motion;
      if (override === "reduced") return true;
      if (override === "full") return false;
      return media.matches;
    };
    setReduced(read());
    const onChange = () => setReduced(read());
    media.addEventListener("change", onChange);
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    return () => {
      media.removeEventListener("change", onChange);
      observer.disconnect();
    };
  }, []);

  return reduced;
}
