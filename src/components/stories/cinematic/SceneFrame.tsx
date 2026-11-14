"use client";

import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import type { EchoMedia } from "@/types/echo";
import dimensions from "@/data/echoes/media-dimensions.json";

/**
 * A frame in the presentation.
 *
 * Every plate reserves its space from the recorded pixel size of the file, so
 * the page never reflows under the reader while photographs are still
 * arriving. A frame that fails to load degrades to a captioned paper panel
 * rather than a broken image.
 */

const dimensionMap = dimensions as Record<string, { w: number; h: number }>;

export function mediaDimensions(src: string): { w: number; h: number } | undefined {
  return dimensionMap[src];
}

export function Frame({
  media,
  className = "",
  imgClassName = "",
  sizes = "(min-width: 1200px) 50vw, 100vw",
  priority = false,
  ratio,
  fill = false,
  objectPosition,
}: {
  media: EchoMedia;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Optional crop, e.g. "16 / 9". Defaults to the file's own ratio. */
  ratio?: string;
  /** Fill the positioned parent instead of reserving its own height. */
  fill?: boolean;
  objectPosition?: string;
}) {
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setState("loading");
  }, [media.src]);

  // A cached frame can finish decoding before React attaches the load
  // handler, so the element is asked directly whether it is already there.
  useEffect(() => {
    const image = imgRef.current;
    if (!image) return;
    if (image.complete) {
      setState(image.naturalWidth > 0 ? "ready" : "failed");
    }
  }, [media.src]);

  const dims = mediaDimensions(media.src);
  // A frame is never allowed to become a sliver or a tower: the natural
  // ratio is clamped into a range that reads as a composed plate.
  const natural = dims ? dims.w / dims.h : 1.6;
  const clamped = Math.min(1.85, Math.max(0.78, natural));

  return (
    <div
      className={`cine-frame ${fill ? "cine-frame--fill" : ""} ${className}`}
      style={
        fill
          ? undefined
          : ratio
            ? { aspectRatio: ratio }
            : dims
              ? { aspectRatio: `${clamped}` }
              : undefined
      }
      data-state={state}
    >
      <img
        ref={imgRef}
        src={media.src}
        alt={media.alt ? (typeof media.alt === "string" ? media.alt : media.alt.en) : ""}
        width={dims?.w}
        height={dims?.h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        className={`cine-frame__img ${imgClassName}`}
        style={objectPosition ? { objectPosition } : undefined}
        onLoad={() => setState("ready")}
        onError={() => setState("failed")}
      />
      {state === "loading" ? (
        <span className="cine-frame__shimmer" aria-hidden="true" />
      ) : null}
      {state === "failed" ? (
        <span className="cine-frame__fallback" aria-hidden="true">
          <ImageOff className="h-5 w-5" />
          <span>Frame unavailable</span>
        </span>
      ) : null}
    </div>
  );
}
