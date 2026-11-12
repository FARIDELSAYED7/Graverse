"use client";

import { cn } from "@/lib/cn";

/**
 * The CSS counterpart of the 3D astrolabe.
 *
 * It is drawn whenever the WebGL core is not available — an older browser, a
 * blocked context or a device that refuses to give us a GPU — and it is also
 * what the visitor sees for the moment before the 3D core finishes its first
 * frame. The same palette and the same silhouette keep the identity
 * continuous.
 *
 * It is deliberately a flat, honest mark: a lit sphere inside a thin orbital
 * ring with a slow sweep, rather than a bad imitation of the 3D object.
 */
export function AskCoreFallback({
  className,
  thinking = false,
}: {
  className?: string;
  thinking?: boolean;
}) {
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden rounded-full", className)}
      aria-hidden="true"
      data-thinking={thinking ? "true" : undefined}
    >
      {/* The ambient glow. */}
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(242,179,61,0.30)_0%,rgba(94,234,212,0.12)_45%,transparent_72%)]" />

      {/* The orbital ring. */}
      <span className="absolute inset-[7%] rounded-full border border-[#7dd3fc]/40" />

      {/* The sweep: an arc turning around the ring. */}
      <span className="absolute inset-[12%] animate-[ask-spin_9s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(125,211,252,0.6)_45deg,transparent_130deg)]" />

      {/* The lit sphere. */}
      <span className="absolute inset-[26%] rounded-full bg-[radial-gradient(circle_at_34%_28%,#fff8e6_0%,#f8d79a_24%,#f2b33d_58%,#7d4a13_100%)] shadow-[0_0_16px_rgba(242,179,61,0.55)]" />

      {/* The shadowed limb. */}
      <span className="absolute inset-[26%] rounded-full bg-[radial-gradient(circle_at_74%_76%,rgba(6,13,25,0.5)_0%,transparent_56%)]" />
    </div>
  );
}
