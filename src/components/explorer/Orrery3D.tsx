"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const OrreryScene = dynamic(() => import("./OrreryScene"), {
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
 * Lazily loaded 3D orrery. It stays out of the initial bundle and is absent
 * when WebGL is unavailable. The 2D map on the same page carries all of the
 * meaning and navigation.
 */
export function Orrery3D() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!supportsWebGL()) {
      setFailed(true);
      return;
    }
    const timer = window.setTimeout(() => setReady(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  if (failed) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-sm text-text-muted">
        This browser cannot start WebGL. Use the schematic map below — it
        contains the same destinations and links.
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[22rem] w-full" aria-hidden="true">
      {ready ? (
        <OrreryScene />
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-text-muted">
          Loading the orrery…
        </div>
      )}
      <p className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-text-muted">
        Schematic — not to scale
      </p>
    </div>
  );
}
