"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error in the browser console for debugging without
    // exposing internal details in the interface.
    console.error(error);
  }, [error]);

  return (
    <div className="container-content flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-danger/30 bg-danger/10 text-[#FFB3B8]">
        <AlertTriangle aria-hidden="true" className="h-6 w-6" />
      </span>
      <h1 className="mt-5 text-2xl font-semibold text-text-primary sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
        This page could not be loaded. The records themselves are unchanged; try
        again, or continue from the Explore page.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="btn-gradient inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold"
        >
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          Try again
        </button>
        <Link
          href="/explore"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-text-primary transition-colors hover:border-accent/50 hover:bg-white/5"
        >
          Back to Explore
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-6 font-mono text-[11px] text-text-muted">
          Reference: {error.digest}
        </p>
      ) : null}
    </div>
  );
}
