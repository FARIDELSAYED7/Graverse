import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** Unique prefix for SVG gradient ids so multiple logos can share a page. */
  idPrefix: string;
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
  /** Wrap the logo in a link to the home page. */
  asLink?: boolean;
};

function Mark({
  idPrefix,
  className,
}: {
  idPrefix: string;
  className?: string;
}) {
  const orbit = `${idPrefix}-orbit`;
  const glyph = `${idPrefix}-glyph`;
  const tile = `${idPrefix}-tile`;
  const glow = `${idPrefix}-glow`;

  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className={cn("h-10 w-10 shrink-0", className)}
    >
      <defs>
        <linearGradient
          id={orbit}
          x1="5"
          y1="4"
          x2="43"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5EEAD4" />
          <stop offset="0.28" stopColor="#67E8F9" />
          <stop offset="0.55" stopColor="#A78BFA" />
          <stop offset="0.8" stopColor="#F472D0" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient
          id={glyph}
          x1="13"
          y1="12"
          x2="35"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#A5E8FF" />
          <stop offset="1" stopColor="#C4B5FD" />
        </linearGradient>
        <radialGradient id={tile} cx="0.26" cy="0.16" r="1">
          <stop stopColor="#1A3A66" />
          <stop offset="0.5" stopColor="#0A1730" />
          <stop offset="1" stopColor="#050B18" />
        </radialGradient>
        <radialGradient id={glow} cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#FBBF24" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FBBF24" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect
        x="1.25"
        y="1.25"
        width="45.5"
        height="45.5"
        rx="13"
        fill={`url(#${tile})`}
        stroke={`url(#${orbit})`}
        strokeWidth="1.5"
      />

      {/* Orbital path behind the monogram. */}
      <g transform="rotate(-26 24 24)" opacity="0.85">
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="7.1"
          fill="none"
          stroke={`url(#${orbit})`}
          strokeWidth="1.4"
        />
        <circle cx="41.2" cy="24" r="1.9" fill="#FBBF24" />
      </g>

      {/* GRAVERSE orbital G. */}
      <path
        d="M32.4 15.7a11.1 11.1 0 1 0 0 16.6V25.4H25.6"
        fill="none"
        stroke={`url(#${glyph})`}
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Spark at the orbit's leading edge. */}
      <circle cx="36.4" cy="12.2" r="5.4" fill={`url(#${glow})`} />
      <circle cx="36.4" cy="12.2" r="2.15" fill="#FBBF24" />
    </svg>
  );
}

function Wordmark({
  idPrefix,
  markClassName,
  showTagline,
}: {
  idPrefix: string;
  markClassName?: string;
  showTagline?: boolean;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <Mark idPrefix={idPrefix} className={markClassName} />
      <span className="flex flex-col">
        <span className="logo-wordmark">GRAVERSE</span>
        {showTagline ? (
          <span className="logo-tagline">Space heritage archive</span>
        ) : null}
      </span>
    </span>
  );
}

export function Logo({
  idPrefix,
  className,
  markClassName,
  showTagline = false,
  asLink = false,
}: LogoProps) {
  const content = (
    <Wordmark
      idPrefix={idPrefix}
      markClassName={markClassName}
      showTagline={showTagline}
    />
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className={cn("group inline-flex rounded-xl", className)}
      >
        {content}
        <span className="sr-only"> — home</span>
      </Link>
    );
  }

  return <span className={cn("inline-flex", className)}>{content}</span>;
}
