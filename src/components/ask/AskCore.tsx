"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { AskCoreSlots } from "./AskCoreScene";

/**
 * The assistant's 3D stage.
 *
 * Responsibilities, in order of importance:
 *
 * 1. **Never block the page.** The scene is a separate chunk, loaded only
 *    after the first paint, and only when the browser can actually create a
 *    WebGL context.
 * 2. **One context.** A single canvas is projected into every slot with
 *    drei's `<View>`, so the launcher, the console header and the empty state
 *    cost one WebGL surface in total.
 * 3. **Stop when nobody is looking.** The render loop is suspended while the
 *    tab is hidden and while the visitor asked for reduced motion.
 * 4. **Always have a fallback.** A device without WebGL keeps the CSS core,
 *    which is drawn by `AskCoreFallback`.
 */

const AskCoreScene = dynamic(() => import("./AskCoreScene"), {
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

export function AskCoreStage({
  slots,
  thinking,
  active,
  onReady,
}: {
  slots: AskCoreSlots;
  thinking: boolean;
  /**
   * Whether the assistant is in use. The render loop only runs while the
   * console is open or the launcher is engaged, so a visitor reading the
   * museum never pays for an animation they are not watching.
   */
  active: boolean;
  onReady: (ready: boolean) => void;
}) {
  const reduced = useReducedMotion();
  const [supported, setSupported] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  /* ------------------------------------------------------- capability probe */

  useEffect(() => {
    let cancelled = false;
    // Probe after the first paint so the check never competes with hydration.
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      setSupported(supportsWebGL());
    }, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  /* ------------------------------------------------- lazy mount, after paint */

  useEffect(() => {
    if (supported !== true) return;
    const timer = window.setTimeout(() => setMounted(true), 900);
    return () => window.clearTimeout(timer);
  }, [supported]);

  /* ------------------------------------------- first frame before we reveal */

  useEffect(() => {
    if (!mounted) {
      setReady(false);
      return;
    }
    const timer = window.setTimeout(() => setReady(true), 350);
    return () => window.clearTimeout(timer);
  }, [mounted]);

  /* -------------------------------------------------------- tab visibility */

  useEffect(() => {
    const onChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  /* ------------------------------------------------------------- reporting */

  const report = useCallback(
    (value: boolean) => {
      onReady(value);
    },
    [onReady]
  );

  useEffect(() => {
    report(ready);
  }, [ready, report]);

  if (!supported) return null;

  const animate = mounted && active && pageVisible && !reduced;

  return (
    <AskCoreScene slots={slots} thinking={thinking} animate={animate} />
  );
}
