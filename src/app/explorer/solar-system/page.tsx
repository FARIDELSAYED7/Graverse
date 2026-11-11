import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { OrbitMap } from "@/components/explorer/OrbitMap";
import { Orrery3D } from "@/components/explorer/Orrery3D";
import { majorMoons, planets } from "@/data/space/bodies";
import { deepSkyObjects } from "@/data/space/deep-sky";

export const metadata: Metadata = {
  title: "Solar system orrery",
  description:
    "A schematic, interactive map of the solar system with links to source-linked destination records. Includes a real-time 3D orrery and a fully accessible 2D alternative.",
};

export default function SolarSystemPage() {
  return (
    <div className="container-content pb-16 pt-8 sm:pt-10">
      <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
        <Link href="/explorer" className="hover:text-white">
          Explorer
        </Link>
        <span aria-hidden="true" className="px-1.5">
          /
        </span>
        <span className="text-text-secondary">Solar system</span>
      </nav>

      <header className="mt-5 max-w-3xl">
        <p className="eyebrow">Explorer · Destinations</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          A schematic of our neighbourhood
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
          Eight planets, five dwarf planets and hundreds of moons orbit one
          ordinary star. This map compresses distance so every world fits on
          screen. It is an index, not a scale model.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section
          aria-labelledby="orrery-3d-heading"
          className="rounded-2xl border border-white/10 bg-bg-elevated/50 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2
              id="orrery-3d-heading"
              className="text-sm font-semibold text-text-primary"
            >
              Live 3D orrery
            </h2>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-text-muted">
              Decorative
            </span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
            Drag to rotate, scroll to zoom. Animation pauses when reduced motion
            is requested. All navigation is available in the 2D map.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-[#040a14]">
            <Orrery3D />
          </div>
        </section>

        <section
          aria-labelledby="orrery-facts-heading"
          className="rounded-2xl border border-white/10 bg-bg-elevated/50 p-4 sm:p-5"
        >
          <h2
            id="orrery-facts-heading"
            className="flex items-center gap-2 text-sm font-semibold text-text-primary"
          >
            <Sparkles aria-hidden="true" className="h-4 w-4 text-brand-cyan" />
            How to read this map
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-text-secondary">
            <li>
              <span className="font-medium text-text-primary">Distance is not linear.</span>{" "}
              Neptune is 30 AU from the Sun but sits only a little farther out
              than Saturn on this map.
            </li>
            <li>
              <span className="font-medium text-text-primary">Sizes are relative, not real.</span>{" "}
              Jupiter is shown larger than Mercury, but both are far larger
              relative to their orbits than drawn.
            </li>
            <li>
              <span className="font-medium text-text-primary">The 3D view is optional.</span>{" "}
              The SVG map below carries the same links and text, and works with
              keyboard, screen readers and no WebGL.
            </li>
          </ul>
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
              In this map
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              {planets.length} planets · {majorMoons.length} featured moons ·{" "}
              {deepSkyObjects.length} deep-sky records
            </p>
          </div>
        </section>
      </div>

      <section aria-labelledby="orrery-map-heading" className="mt-10">
        <h2
          id="orrery-map-heading"
          className="text-lg font-semibold tracking-tight text-text-primary"
        >
          Accessible 2D map
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm text-text-muted">
          Every planet links to a destination record built from NASA reference
          pages. Facts state whether they are confirmed, estimated or unknown.
        </p>
        <div className="mt-4">
          <OrbitMap />
        </div>
      </section>

      <section aria-labelledby="moons-heading" className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="moons-heading"
              className="text-lg font-semibold tracking-tight text-text-primary"
            >
              Featured moons
            </h2>
            <p className="mt-1.5 text-sm text-text-muted">
              Worlds in their own right, and destinations for several missions.
            </p>
          </div>
          <Link
            href="/explorer/bodies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright hover:text-white"
          >
            All destinations
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {majorMoons.map((moon) => (
            <li key={moon.id}>
              <Link
                href={`/explorer/bodies/${moon.id}`}
                className="group block h-full rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-brand-cyan/40 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: moon.accent }}
                  />
                  <p className="text-sm font-semibold text-text-primary">
                    {moon.name}
                  </p>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
                  {moon.tagline}
                </p>
                <p className="mt-2 text-[11px] text-text-muted">
                  {moon.moonCount.toLowerCase().startsWith("orbits")
                    ? "Moon of " + (moon.parentId ?? "a planet")
                    : moon.moonCount}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
