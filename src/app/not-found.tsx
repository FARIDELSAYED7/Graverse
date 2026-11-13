import Link from "next/link";
import { ArrowRight, Compass, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-content flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="corner-frame panel relative w-full max-w-lg px-6 py-10 sm:px-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-brand-violet/40 bg-brand-violet/10 text-brand-violet shadow-[0_0_32px_-10px_rgba(167,139,250,0.7)]">
          <SearchX aria-hidden="true" className="h-6 w-6" />
        </span>
        <p className="meta-label mt-5 text-brand-violet">404 · Out of range</p>
        <h1 className="mt-2 text-2xl font-semibold text-text-primary sm:text-3xl">
          This record is not in the collection
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-text-secondary">
          The page or artifact you asked for does not exist. Every artifact in
          GRAVERSE is reachable from the Explore timeline or the museum
          collection.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/explorer"
            className="btn-primary inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold"
          >
            <Compass aria-hidden="true" className="h-4 w-4" />
            Explore the timeline
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            href="/museum"
            className="btn-secondary inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold"
          >
            Browse the museum
          </Link>
        </div>
      </div>
    </div>
  );
}
