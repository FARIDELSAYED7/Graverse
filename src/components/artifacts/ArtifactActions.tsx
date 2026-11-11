"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GitCompareArrows, Heart, Library } from "lucide-react";
import { usePersonal } from "@/lib/use-personal";
import { cn } from "@/lib/cn";

interface ArtifactActionsProps {
  artifactId: string;
  artifactName: string;
  compareId: string;
}

export function ArtifactActions({
  artifactId,
  artifactName,
  compareId,
}: ArtifactActionsProps) {
  const personal = usePersonal();
  const { view } = personal;
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    view(artifactId);
  }, [artifactId, view]);

  const saved = personal.isFavorite(artifactId);

  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            personal.favorite(artifactId);
            setAnnouncement(
              saved
                ? `${artifactName} removed from favourites.`
                : `${artifactName} saved to favourites.`
            );
          }}
          aria-pressed={saved}
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
            saved
              ? "border-brand-magenta/50 bg-brand-magenta/15 text-white"
              : "border-white/15 text-text-secondary hover:border-white/30 hover:text-white"
          )}
        >
          <Heart
            aria-hidden="true"
            className={cn("h-4 w-4", saved && "fill-current text-brand-magenta")}
          />
          {saved ? "Saved to favourites" : "Save to favourites"}
        </button>
        <Link
          href={`/compare?a=${artifactId}&b=${compareId}`}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium text-text-secondary transition-colors hover:border-white/30 hover:text-white"
        >
          <GitCompareArrows aria-hidden="true" className="h-4 w-4" />
          Compare this record
        </Link>
        <Link
          href="/my-universe"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium text-text-secondary transition-colors hover:border-white/30 hover:text-white"
        >
          <Library aria-hidden="true" className="h-4 w-4" />
          My Universe
        </Link>
      </div>
      <p className="mt-2 text-xs text-text-muted">
        {personal.mode === "local"
          ? "Favourites and recent views are stored only in this browser."
          : personal.mode === "loading"
            ? "Loading your local collection…"
            : "Storage is blocked, so this is saved for the session only."}
      </p>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
