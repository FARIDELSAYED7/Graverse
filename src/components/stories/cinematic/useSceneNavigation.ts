"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CinematicScene } from "@/lib/echo/cinematic";

/**
 * The single scroll controller for a cinematic story.
 *
 * There is exactly one source of truth for "where am I": the reading line.
 * A scene is active when its top edge has passed a line a little below the
 * header, which behaves the same for a slide that fits the screen and for a
 * scene that is three screens tall.
 *
 * Programmatic navigation computes an exact pixel target from the scene's
 * own box rather than trusting `scrollIntoView`, and the lock is released
 * the moment the reader takes over, so a manual scroll never fights the
 * controls.
 */

const READING_LINE = 0.3;

/**
 * The breathing room between the sticky header and a scene that has just
 * been navigated to. The same value backs the CSS `scroll-margin-top` on
 * `.scene` (see `cine.css`, `--cine-scroll-gap`), so the Previous / Next
 * console, the scrubber ticks and the in-page anchor links all land the
 * target section at exactly the same position.
 */
const SCROLL_GAP = 8;

interface Lock {
  index: number;
  targetTop: number;
  reached: boolean;
  until: number;
}

function headerOffset(): number {
  if (typeof document === "undefined") return 72;
  const header = document.querySelector<HTMLElement>("body > header");
  if (!header) return 72;
  // A sticky header is part of the document flow, so its height is exactly
  // the amount of scene that would otherwise sit underneath it. The gap
  // matches `--cine-scroll-gap` in cine.css: one value, two mechanisms.
  return Math.round(header.getBoundingClientRect().height) + SCROLL_GAP;
}

/**
 * Publishes the real header height so the slides can be sized and offset
 * against it in CSS instead of guessing.
 */
function publishHeaderHeight() {
  if (typeof document === "undefined") return;
  const header = document.querySelector<HTMLElement>("body > header");
  if (!header) return;
  const height = Math.round(header.getBoundingClientRect().height);
  if (height > 0) {
    document.documentElement.style.setProperty("--cine-header-h", `${height}px`);
  }
}

export function useSceneNavigation(
  scenes: CinematicScene[],
  options: { onEnter?: (index: number) => void; reduced?: boolean } = {}
) {
  const [active, setActive] = useState(0);
  const nodesRef = useRef<HTMLElement[]>([]);
  const lockRef = useRef<Lock | null>(null);
  const frameRef = useRef(0);
  const rootRef = useRef<HTMLElement | null>(null);
  const onEnter = options.onEnter;
  const reduced = options.reduced ?? false;

  const collect = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const found = root.querySelectorAll<HTMLElement>("[data-scene]");
    nodesRef.current = Array.from(found);
  }, []);

  const measure = useCallback(() => {
    const nodes = nodesRef.current;
    if (!nodes.length) return 0;
    const line = headerOffset() + window.innerHeight * READING_LINE;
    let current = 0;
    for (let index = 0; index < nodes.length; index += 1) {
      const node = nodes[index];
      if (!node) continue;
      if (node.getBoundingClientRect().top <= line) current = index;
    }
    // At the very bottom of the document the last scene is always the one
    // being read, even if its top edge has not reached the line yet.
    const doc = document.documentElement;
    if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) {
      current = nodes.length - 1;
    }
    return current;
  }, []);

  const apply = useCallback(
    (index: number, smooth: boolean) => {
      const node = nodesRef.current[index];
      if (!node) return;
      const top = Math.max(
        0,
        Math.round(node.getBoundingClientRect().top + window.scrollY - headerOffset())
      );
      lockRef.current = {
        index,
        targetTop: top,
        reached: false,
        until: Date.now() + 9000,
      };
      setActive(index);
      window.scrollTo({
        top,
        behavior: smooth && !reduced ? "smooth" : "instant",
      });
    },
    [reduced]
  );

  const go = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(scenes.length - 1, index));
      apply(next, true);
    },
    [apply, scenes.length]
  );

  const next = useCallback(() => go(active + 1), [active, go]);
  const previous = useCallback(() => go(active - 1), [active, go]);

  /* -------------------------------------------------- active scene tracking */
  useEffect(() => {
    const schedule = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        const lock = lockRef.current;
        if (lock) {
          const distance = Math.abs(window.scrollY - lock.targetTop);
          if (distance <= 4) {
            lock.reached = true;
            return;
          }
          if (lock.reached) {
            // The reader moved away from the slide we sent them to.
            lockRef.current = null;
          } else {
            return;
          }
        }
        const index = measure();
        setActive((current) => (current === index ? current : index));
      });
    };

    const onScroll = () => schedule();
    const release = () => {
      if (!lockRef.current) return;
      lockRef.current = null;
      schedule();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    window.addEventListener("keydown", release);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [measure]);

  /* --------------------------------------- keep a parked slide exactly parked */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    const observer = new ResizeObserver(() => {
      collect();
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const lock = lockRef.current;
        if (!lock || !lock.reached) return;
        if (Date.now() > lock.until) {
          lockRef.current = null;
          return;
        }
        const node = nodesRef.current[lock.index];
        if (!node) return;
        const top = Math.max(
          0,
          Math.round(node.getBoundingClientRect().top + window.scrollY - headerOffset())
        );
        if (Math.abs(top - lock.targetTop) > 2) {
          lock.targetTop = top;
          window.scrollTo({ top, behavior: "instant" });
        }
      });
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [collect]);

  /* ------------------------------------------------------- chapter progress */
  useEffect(() => {
    const scene = scenes[active];
    if (!scene) return;
    if (scene.chapterId) onEnter?.(active);
  }, [active, onEnter, scenes]);

  /* -------------------------------------------- start of the story, always */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    publishHeaderHeight();
    collect();
    const hash = window.location.hash.replace(/^#/, "");
    const target = hash ? scenes.findIndex((scene) => `cine-${scene.id}` === hash) : -1;
    if (target >= 0) {
      window.requestAnimationFrame(() => apply(target, false));
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    // Only on mount: the reader chooses where to go from then on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* --------------------------------------------------- the header can move */
  useEffect(() => {
    const onResize = () => publishHeaderHeight();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scene = scenes[active];

  return useMemo(
    () => ({ active, scene, go, next, previous, rootRef }),
    [active, scene, go, next, previous]
  );
}
