"use client";

import { useEffect, useState } from "react";

export type WebGLSupport = "checking" | "yes" | "no";

/** Detects WebGL once on the client, without starting a canvas. */
export function useWebGL(): WebGLSupport {
  const [support, setSupport] = useState<WebGLSupport>("checking");

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const ok = Boolean(
        canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl")
      );
      setSupport(ok ? "yes" : "no");
    } catch {
      setSupport("no");
    }
  }, []);

  return support;
}
