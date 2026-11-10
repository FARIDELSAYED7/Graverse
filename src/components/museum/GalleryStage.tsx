"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { GalleryItem } from "@/types/gallery";

const GalleryCanvas = dynamic(() => import("./GalleryCanvas"), {
  ssr: false,
  loading: () => null,
});

class CanvasBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

type GalleryStageProps = {
  items: GalleryItem[];
  selected: GalleryItem;
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export function GalleryStage({
  items,
  selected,
  selectedIndex,
  onSelect,
}: GalleryStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgl(canUseWebGL());
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const ready = inView && webgl === true;
  const unavailable = webgl === false;

  const poster = (
    <div className="relative flex h-full items-center justify-center overflow-hidden p-6 sm:p-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_36%,rgba(67,185,255,0.2),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[18%] left-1/2 h-24 w-[72%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(67,185,255,0.18),transparent_68%)] blur-2xl"
      />
      <div className="relative w-[min(64%,250px)]">
        <div className="gallery-poster-frame relative overflow-hidden rounded-xl border border-white/20 bg-bg-elevated">
          <div className="relative aspect-[4/5]">
            <Image
              src={selected.image}
              alt=""
              fill
              sizes="250px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040b17] via-transparent to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent-bright">
              {unavailable ? "Exhibit preview" : "Preparing the hall"}
            </p>
            <p className="mt-1 line-clamp-2 text-xs font-medium text-white">
              {selected.name}
            </p>
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] leading-relaxed text-text-muted">
          {unavailable
            ? "The 3D hall is not available in this browser. The exhibit list below remains fully usable."
            : "Loading the 3D exhibition hall as you approach it."}
        </p>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="gallery-stage relative h-full w-full">
      {ready ? (
        <CanvasBoundary fallback={poster}>
          <GalleryCanvas
            items={items}
            selectedIndex={selectedIndex}
            onSelect={onSelect}
          />
        </CanvasBoundary>
      ) : (
        poster
      )}
    </div>
  );
}
