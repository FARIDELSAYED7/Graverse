import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { MotionToggle } from "./MotionToggle";
import { t, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
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
              {t(locale, "footer.description")}
            </p>
            <div className="mt-4">
              <MotionToggle showLabel />
            </div>
          </div>

          <nav aria-label={t(locale, "footer.explorer")}>
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-teal" />
              {t(locale, "footer.explorer")}
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/explorer" className="text-text-secondary transition-colors hover:text-white">
                  {t(locale, "home.exploreTimeline")}
                </Link>
              </li>
              <li>
                <Link href="/explorer?mode=destinations" className="text-text-secondary transition-colors hover:text-white">
                  {t(locale, "footer.byDestination")}
                </Link>
              </li>
              <li>
                <Link href="/explorer/solar-system" className="text-text-secondary transition-colors hover:text-white">
                  {t(locale, "footer.orrery")}
                </Link>
              </li>
              <li>
                <Link href="/mission-control" className="text-text-secondary transition-colors hover:text-white">
                  {t(locale, "nav.missionControl")}
                </Link>
              </li>
              <li>
                <Link href="/simulations" className="text-text-secondary transition-colors hover:text-white">
                  {t(locale, "nav.simulations")}
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-text-secondary transition-colors hover:text-white">
                  {t(locale, "common.search")}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t(locale, "footer.collection")}>
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-violet">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-violet" />
              {t(locale, "footer.collection")}
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/museum" className="text-text-secondary transition-colors hover:text-white">
                  {t(locale, "nav.museum")}
                </Link>
              </li>
              <li>
                <Link href="/museum/missions" className="text-text-secondary transition-colors hover:text-white">
                  {t(locale, "footer.missions")}
                </Link>
              </li>
              <li>
                <Link href="/engineering" className="text-text-secondary transition-colors hover:text-white">
                  {t(locale, "nav.engineering")}
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-text-secondary transition-colors hover:text-white">
                  {t(locale, "nav.stories")}
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-text-secondary transition-colors hover:text-white">
                  {t(locale, "nav.compare")}
                </Link>
              </li>
              <li>
                <Link href="/my-universe" className="text-text-secondary transition-colors hover:text-white">
                  {t(locale, "nav.myUniverse")}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-magenta">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-magenta" />
              {t(locale, "footer.aboutData")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {t(locale, "footer.dataNote")}
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/research"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal hover:text-white"
              >
                {t(locale, "nav.research")}
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/sources"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal hover:text-white"
              >
                {t(locale, "common.sources")}
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="brand-rule mt-10" />
        <div className="mt-6 flex flex-col gap-3 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t(locale, "footer.notNasa")}</p>
          <p>{t(locale, "footer.imagery")}</p>
          <p>{t(locale, "footer.madeFor")}</p>
        </div>
      </div>
    </footer>
  );
}
