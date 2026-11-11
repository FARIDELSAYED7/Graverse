import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { ArtifactMedia } from "@/types/artifact";
import { cn } from "@/lib/cn";

type ArtifactVisualProps = {
  media?: ArtifactMedia;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Show the small "Illustration" marker when the media is an artist concept. */
  showLabel?: boolean;
  imageClassName?: string;
};

/**
 * Renders NASA imagery at a reserved aspect ratio. When the record has no
 * media it says so plainly instead of substituting an unrelated image.
 */
export function ArtifactVisual({
  media,
  className,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  showLabel = true,
  imageClassName,
}: ArtifactVisualProps) {
  if (!media) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_35%,rgba(67,185,255,0.14),transparent_65%)] px-6 text-center",
          className
        )}
      >
        <ImageOff aria-hidden="true" className="h-6 w-6 text-accent/70" />
        <p className="text-xs font-medium text-text-secondary">
          NASA image not available in the supplied records
        </p>
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover transition-transform duration-700 ease-out",
          imageClassName
        )}
      />
      {showLabel && media.isIllustration ? (
        <span className="absolute start-3 top-3 z-10 rounded-full border border-white/20 bg-black/65 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur">
          Illustration
        </span>
      ) : null}
    </div>
  );
}
