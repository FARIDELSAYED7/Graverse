import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { deepSkyObjects } from "@/data/space/deep-sky";

export const metadata: Metadata = {
  title: "Deep sky — nebulae, galaxies and remnants",
  description:
    "A curated, source-linked set of deep-sky objects used as context for NASA missions. Distances and classifications carry evidence labels.",
};

export default function DeepSkyIndexPage() {
  return (
    <div className="container-content pb-16 pt-8 sm:pt-10">
      <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
        <Link href="/explorer" className="hover:text-white">
          Explorer
        </Link>
        <span aria-hidden="true" className="px-1.5">
          /
        </span>
        <Link href="/explorer/bodies" className="hover:text-white">
          Destinations
        </Link>
        <span aria-hidden="true" className="px-1.5">
          /
        </span>
        <span className="text-text-secondary">Deep sky</span>
      </nav>

      <header className="mt-5 max-w-3xl">
        <p className="eyebrow">Explorer · Reference</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Beyond the solar system
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
          Spacecraft do not only visit planets. These objects are the targets of
          observatories and the context for missions that look back at our own
          galaxy. The set is deliberately small: each record is checked against
          a NASA reference page.
        </p>
      </header>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {deepSkyObjects.map((object) => (
          <li key={object.id}>
            <Link
              href={`/explorer/deep-sky/${object.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-brand-cyan/40 hover:bg-white/[0.04]"
            >
              <div
                aria-hidden="true"
                className={`h-24 bg-gradient-to-br ${object.gradient}`}
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 30%, ${object.accent}55, transparent 60%)`,
                }}
              />
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  {object.kindLabel} · {object.constellation}
                </p>
                <p className="mt-1 text-sm font-semibold text-text-primary">
                  {object.name}
                </p>
                <p className="mt-1 flex-1 text-xs leading-relaxed text-text-secondary">
                  {object.summary}
                </p>
                <span className="mt-3 flex items-center justify-between text-[11px] text-text-muted">
                  {object.catalogName}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
