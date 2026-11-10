"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SpaceScene = dynamic(() => import("./SpaceScene"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * Decorative, lazily loaded WebGL layer. It is kept out of the initial bundle,
 * never receives pointer events or focus, and stays absent when the browser
 * cannot create a WebGL context.
 */
export function SpaceCanvas() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supportsWebGL()) return;
    const timer = window.setTimeout(() => setReady(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-80"
    >
      {ready ? <SpaceScene /> : null}
    </div>
  );
}
