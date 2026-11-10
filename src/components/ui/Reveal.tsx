"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealState = "idle" | "pending" | "visible";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger the transition for grids and stacked sections. */
  delay?: number;
};

/**
 * Scroll-triggered fade/rise.
 *
 * The content is visible in the server-rendered page. The hidden state is only
 * added after hydration, so a no-JS visitor never loses content. Elements that
 * are already on screen are marked visible in the same effect pass.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("idle");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setState("visible");
      return;
    }

    setState("pending");

    const inView =
      element.getBoundingClientRect().top <
      (window.innerHeight || document.documentElement.clientHeight);

    if (inView) {
      setState("visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState("visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
