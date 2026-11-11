import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** Stable prefix kept for callers; the mark is drawn with flat colours. */
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
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      data-brand-mark={idPrefix}
      className={cn("h-10 w-10 shrink-0", className)}
    >
      <rect
        x="1.25"
        y="1.25"
        width="45.5"
        height="45.5"
        rx="13"
        fill="#14213B"
        stroke="#5EEAD4"
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
          stroke="#5EEAD4"
          strokeWidth="1.4"
        />
        <circle cx="41.2" cy="24" r="1.9" fill="#F2B33D" />
      </g>

      {/* GRAVERSE orbital G. */}
      <path
        d="M32.4 15.7a11.1 11.1 0 1 0 0 16.6V25.4H25.6"
        fill="none"
        stroke="#FFF8EC"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Spark at the orbit's leading edge. */}
      <circle cx="36.4" cy="12.2" r="5.4" fill="#F2B33D" opacity="0.22" />
      <circle cx="36.4" cy="12.2" r="2.15" fill="#F2B33D" />
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
