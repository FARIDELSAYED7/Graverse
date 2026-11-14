"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { EchoFallback } from "./EchoFallback";
import type { EchoAnimationState } from "@/lib/echo/provider";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const EchoScene = dynamic(() => import("./EchoScene"), {
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
 * The 3D companion.
 *
 * The Three.js scene is loaded on the client only, after the page has
 * settled, and is replaced by a drawn fallback when the browser cannot
 * create a WebGL context. Reduced-motion preferences stop the loop from
 * running continuously.
 */
export function EchoCanvas({
  state,
  className,
  pointTarget,
  interactive = false,
}: {
  state: EchoAnimationState;
  className?: string;
  pointTarget?: [number, number, number];
  interactive?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const [support, setSupport] = useState<"checking" | "yes" | "no">("checking");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSupport(supportsWebGL() ? "yes" : "no");
  }, []);

  useEffect(() => {
    if (support !== "yes") return;
    const timer = window.setTimeout(() => setReady(true), 60);
    return () => window.clearTimeout(timer);
  }, [support]);

  if (support === "no") {
    return (
      <div className={className}>
        <EchoFallback state={state} className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className={className}>
      {ready ? (
        <EchoScene
          state={state}
          reducedMotion={reducedMotion}
          pointTarget={pointTarget}
        />
      ) : (
        <div
          className="h-full w-full animate-pulse rounded-full bg-white/10"
          aria-hidden="true"
        />
      )}
      {interactive ? null : null}
    </div>
  );
}
