export const MOON_PHASES = [
  "New Moon",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full Moon",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent",
] as const;

/**
 * Schematic "what you see from Earth" disk.
 *
 * The lit region is drawn from the phase angle with an outer semicircle and an
 * elliptical terminator. It is a teaching diagram, not a photograph.
 */
export function MoonPhaseDisk({
  phase,
  size = 120,
  label,
}: {
  phase: number;
  size?: number;
  label?: string;
}) {
  const index = ((phase % 8) + 8) % 8;
  const t = index / 8;
  const angle = t * Math.PI * 2;
  const radius = 50;
  const rx = radius * Math.abs(Math.cos(angle));

  let outerSweep = 1;
  let innerSweep = 0;
  if (t < 0.5) {
    outerSweep = 1;
    innerSweep = t < 0.25 ? 0 : 1;
  } else {
    outerSweep = 0;
    innerSweep = t < 0.75 ? 0 : 1;
  }

  const litPath = `M 60 ${60 - radius} A ${radius} ${radius} 0 0 ${outerSweep} 60 ${
    60 + radius
  } A ${rx.toFixed(2)} ${radius} 0 0 ${innerSweep} 60 ${60 - radius} Z`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label={label ?? `Schematic Moon phase: ${MOON_PHASES[index]}`}
      className="drop-shadow-[0_10px_20px_rgba(21,34,56,0.18)]"
    >
      <defs>
        <radialGradient id="moon-surface" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#FFFDF2" />
          <stop offset="100%" stopColor="#E8DFC0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="52" fill="none" stroke="#152238" strokeOpacity="0.12" />
      <circle cx="60" cy="60" r="50" fill="#26324A" />
      <path d={litPath} fill="url(#moon-surface)" />
      <g fill="#B8AD8E" opacity="0.45">
        <circle cx="45" cy="44" r="7" />
        <circle cx="72" cy="65" r="5" />
        <circle cx="52" cy="78" r="3.5" />
        <circle cx="79" cy="40" r="3" />
      </g>
    </svg>
  );
}
