import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { MotionToggle } from "./MotionToggle";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-[#040a14]/85">
      <div className="brand-rule absolute inset-x-0 top-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
      >
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.12),transparent_66%)] blur-2xl" />
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(43,108,145,0.16),transparent_68%)] blur-2xl" />
      </div>
      <div className="container-content relative py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo idPrefix="footer" asLink showTagline />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              An interactive space heritage timeline and digital museum. Explore
              the hardware, missions and discoveries left across the Moon, Mars
              and beyond.
            </p>
            <div className="mt-4">
              <MotionToggle showLabel />
            </div>
          </div>

          <nav aria-label="Explorer links">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-teal" />
              Explorer
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/explorer"
                  className="text-text-secondary transition-colors hover:text-white"
                >
                  Interactive timeline
                </Link>
              </li>
              <li>
                <Link
                  href="/explorer?mode=destinations"
                  className="text-text-secondary transition-colors hover:text-white"
                >
                  By destination
                </Link>
              </li>
              <li>
                <Link
                  href="/explorer?mode=artifacts"
                  className="text-text-secondary transition-colors hover:text-white"
                >
                  By artifact type
                </Link>
              </li>
              <li>
                <Link
                  href="/explorer/solar-system"
                  className="text-text-secondary transition-colors hover:text-white"
                >
                  Solar system orrery
                </Link>
              </li>
              <li>
                <Link
                  href="/academy"
                  className="text-text-secondary transition-colors hover:text-white"
                >
                  Space Academy
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-text-secondary transition-colors hover:text-white"
                >
                  Search
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Museum links">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-violet">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-violet" />
              Collection
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/museum"
                  className="text-text-secondary transition-colors hover:text-white"
                >
                  The museum
                </Link>
              </li>
              <li>
                <Link
                  href="/museum/missions"
                  className="text-text-secondary transition-colors hover:text-white"
                >
                  Missions
                </Link>
              </li>
              <li>
                <Link
                  href="/museum/agencies"
                  className="text-text-secondary transition-colors hover:text-white"
                >
                  Space agencies
                </Link>
              </li>
              <li>
                <Link
                  href="/sources"
                  className="text-text-secondary transition-colors hover:text-white"
                >
                  Source registry
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-magenta">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-magenta" />
              About the data
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Facts are normalized from public NASA mission pages, NASA/NSSDCA
              technical records and NASA image records. Every artifact page
              lists its sources and access dates.
            </p>
            <Link
              href="/sources"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal hover:text-white"
            >
              Sources and methodology
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="brand-rule mt-10" />
        <div className="mt-6 flex flex-col gap-3 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            GRAVERSE — a NASA Space Apps Challenge project. Not an official NASA
            website.
          </p>
          <p>
            Imagery: NASA. Data verified against public NASA records on 10
            November 2026.
          </p>
        </div>
      </div>
    </footer>
  );
}
