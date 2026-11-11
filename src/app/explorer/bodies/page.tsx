import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Orbit, Sparkles } from "lucide-react";
import { celestialBodies, majorMoons, planets } from "@/data/space/bodies";
import { deepSkyObjects } from "@/data/space/deep-sky";

export const metadata: Metadata = {
  title: "Destinations — planets, moons and deep sky",
  description:
    "Source-linked records for the Sun, planets, dwarf planets, major moons and deep-sky objects. Every fact states whether it is confirmed, estimated or unknown.",
};

const groups = [
  {
    id: "planets",
    title: "Planets",
    description: "The eight worlds that orbit the Sun.",
    entries: planets,
  },
  {
    id: "moons",
    title: "Featured moons",
    description:
      "Selected moons that are destinations in their own right or hosts to past and present missions.",
    entries: majorMoons,
  },
  {
    id: "dwarf-planets",
    title: "Dwarf planets and the Sun",
    description:
      "The star at the centre, and the dwarf planets represented in this record set.",
    entries: celestialBodies.filter(
      (body) => body.kind === "dwarf-planet" || body.kind === "star"
    ),
  },
];

export default function DestinationsPage() {
  return (
    <div className="container-content pb-16 pt-8 sm:pt-10">
      <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
        <Link href="/explorer" className="hover:text-white">
          Explorer
        </Link>
        <span aria-hidden="true" className="px-1.5">
          /
        </span>
        <span className="text-text-secondary">Destinations</span>
      </nav>

      <header className="mt-5 max-w-3xl">
        <p className="eyebrow">Explorer · Reference</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          Destinations and deep sky
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
          Worlds in the solar system plus a small, deliberately curated set of
          deep-sky objects. These records give context for the hardware in the
          museum. Numbers carry an evidence label; missing values are shown as
          unknown rather than filled in.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/explorer/solar-system"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-brand-cyan/40 hover:text-white"
          >
            <Orbit aria-hidden="true" className="h-3.5 w-3.5 text-brand-cyan" />
            Open the solar system orrery
          </Link>
          <Link
            href="/explorer/deep-sky"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-brand-cyan/40 hover:text-white"
          >
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-brand-cyan" />
            Deep-sky records
          </Link>
        </div>
      </header>

      {groups.map((group) => (
        <section
          key={group.id}
          aria-labelledby={`${group.id}-heading`}
          className="mt-10"
        >
          <h2
            id={`${group.id}-heading`}
            className="text-lg font-semibold tracking-tight text-text-primary"
          >
            {group.title}
          </h2>
          <p className="mt-1.5 text-sm text-text-muted">{group.description}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.entries.map((body) => (
              <li key={body.id}>
                <Link
                  href={`/explorer/bodies/${body.id}`}
                  className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-brand-cyan/40 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: body.accent }}
                    />
                    <p className="text-sm font-semibold text-text-primary">
                      {body.name}
                    </p>
                  </div>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-text-secondary">
                    {body.tagline}
                  </p>
                  <span className="mt-3 flex items-center justify-between text-[11px] text-text-muted">
                    {body.relatedArtifactIds.length
                      ? `${body.relatedArtifactIds.length} artifact record${
                          body.relatedArtifactIds.length === 1 ? "" : "s"
                        }`
                      : "Reference record"}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section aria-labelledby="deep-sky-heading" className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="deep-sky-heading"
              className="text-lg font-semibold tracking-tight text-text-primary"
            >
              Beyond the solar system
            </h2>
            <p className="mt-1.5 text-sm text-text-muted">
              {deepSkyObjects.length} curated nebulae, galaxies and remnants.
            </p>
          </div>
          <Link
            href="/explorer/deep-sky"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright hover:text-white"
          >
            All deep-sky records
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {deepSkyObjects.map((object) => (
            <li key={object.id}>
              <Link
                href={`/explorer/deep-sky/${object.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-brand-cyan/40 hover:text-white"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: object.accent }}
                />
                {object.name}
                <span className="text-text-muted">{object.catalogName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
