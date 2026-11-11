import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { planets } from "@/data/space/bodies";

/**
 * Accessible schematic of the solar system.
 *
 * This is the primary, non-WebGL view. It is an SVG with real links, plus a
 * plain list for screen readers and keyboard users. Spacing is schematic and
 * labelled as such in the heading.
 */
export function OrbitMap() {
  const size = 720;
  const center = size / 2;
  const scale = 8.4;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(67,185,255,0.08),rgba(5,11,24,0.7))] p-3">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          aria-labelledby="orbit-map-title orbit-map-desc"
          className="h-auto w-full"
        >
          <title id="orbit-map-title">Schematic map of the solar system</title>
          <desc id="orbit-map-desc">
            The Sun at the centre, with the orbits of the eight planets and
            Pluto drawn as concentric circles. Distances are compressed and not
            to scale. Each planet is a link to its destination record.
          </desc>

          <defs>
            <radialGradient id="map-sun-glow">
              <stop offset="0%" stopColor="#FFE7A3" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFC93C" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={center} cy={center} r={46} fill="url(#map-sun-glow)" />

          {planets.map((planet) =>
            planet.orbit ? (
              <circle
                key={`orbit-${planet.id}`}
                cx={center}
                cy={center}
                r={planet.orbit.visualRadius * scale}
                fill="none"
                stroke={planet.orbit.color}
                strokeOpacity={0.3}
                strokeWidth={1}
              />
            ) : null
          )}

          <circle cx={center} cy={center} r={11} fill="#FFC93C" />
          <text
            x={center}
            y={center + 30}
            textAnchor="middle"
            className="fill-[#FFE7A3] text-[11px]"
          >
            Sun
          </text>

          {planets.map((planet, index) => {
            if (!planet.orbit) return null;
            const radius = planet.orbit.visualRadius * scale;
            const angle = (index / Math.max(planets.length - 1, 1)) * Math.PI * 1.7;
            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;
            const dot = Math.max(planet.orbit.visualSize * 4.2, 3.4);
            return (
              <a
                key={planet.id}
                href={`/explorer/bodies/${planet.id}`}
                aria-label={`${planet.name} — open destination record`}
                className="group"
              >
                <title>{planet.name}</title>
                <circle
                  cx={x}
                  cy={y}
                  r={dot + 8}
                  fill="transparent"
                  className="transition-opacity group-hover:opacity-100"
                />
                <circle cx={x} cy={y} r={dot} fill={planet.orbit.color} />
                <text
                  x={x}
                  y={y - dot - 6}
                  textAnchor="middle"
                  className="fill-white/70 text-[11px] transition-colors group-hover:fill-white group-focus:fill-white"
                >
                  {planet.name}
                </text>
              </a>
            );
          })}
        </svg>
      </div>

      <nav aria-label="Solar system destinations" className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
          Destinations
        </p>
        <ul className="mt-3 space-y-1.5">
          {planets.map((planet) => (
            <li key={planet.id}>
              <Link
                href={`/explorer/bodies/${planet.id}`}
                className="group flex items-center justify-between gap-2 rounded-lg border border-transparent px-2.5 py-2 text-sm text-text-secondary transition-colors hover:border-white/10 hover:bg-white/[0.03] hover:text-white"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: planet.orbit?.color ?? planet.accent }}
                  />
                  <span className="truncate">{planet.name}</span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 text-text-muted transition-colors group-hover:text-white"
                />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs leading-relaxed text-text-muted">
          Orbit spacing and planet sizes are compressed so every world fits on
          one screen. They do not represent true scale.
        </p>
      </nav>
    </div>
  );
}
