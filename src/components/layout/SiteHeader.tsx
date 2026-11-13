"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { MotionToggle } from "./MotionToggle";
import { LanguageToggle } from "./LanguageToggle";
import { ScrollProgress } from "./ScrollProgress";
import { cn } from "@/lib/cn";
import { t, type Locale } from "@/lib/i18n";

const primaryNav = [
  { href: "/", label: "nav.home" },
  { href: "/explorer", label: "nav.explorer" },
  { href: "/museum", label: "nav.museum" },
  { href: "/academy", label: "nav.academy" },
  { href: "/about", label: "nav.about" },
] as const;

const moreNav = [
  { href: "/mission-control", label: "nav.missionControl" },
  { href: "/engineering", label: "nav.engineering" },
  { href: "/stories", label: "nav.stories" },
  { href: "/research", label: "nav.research" },
  { href: "/simulations", label: "nav.simulations" },
  { href: "/my-universe", label: "nav.myUniverse" },
  { href: "/compare", label: "nav.compare" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/museum") return pathname.startsWith("/museum");
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Which part of GRAVERSE the visitor is in, for the route identity pill. */
function routeIdentity(pathname: string): Parameters<typeof t>[1] | null {
  if (pathname === "/") return "nav.home";
  if (pathname.startsWith("/academy")) return "nav.academy";
  if (pathname.startsWith("/museum")) return "nav.museum";
  if (pathname.startsWith("/explorer")) return "nav.explorer";
  const more = moreNav.find((item) => isActive(pathname, item.href));
  if (more) return more.label;
  if (pathname.startsWith("/about")) return "nav.about";
  return null;
}

export function SiteHeader({ locale = "en" }: { locale?: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const desktopSearchRef = useRef<HTMLInputElement>(null);
  const menuPanelId = useId();
  const morePanelId = useId();
  const mobileSearchId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setMoreOpen(false);
        return;
      }
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;
      if (event.key === "/" && !typing) {
        if (desktopSearchRef.current && desktopSearchRef.current.offsetParent) {
          event.preventDefault();
          desktopSearchRef.current.focus();
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (menuOpen) firstLinkRef.current?.focus();
  }, [menuOpen]);

  const moreActive = moreNav.some((item) => isActive(pathname, item.href));
  const routeLabel = routeIdentity(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#040a16]/75 backdrop-blur-xl">
      <div className="brand-rule pointer-events-none absolute inset-x-0 top-0" />
      <div className="container-content flex h-16 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Logo
            idPrefix="header"
            asLink
            markClassName="h-9 w-9"
            className="shrink-0 rounded-md focus-visible:outline-none"
          />
          {routeLabel ? (
            <span aria-hidden="true" className="route-pill hidden lg:inline-flex">
              <span className="route-pill__dot" />
              {t(locale, routeLabel)}
            </span>
          ) : null}
        </div>

        <nav aria-label={t(locale, "nav.primary")} className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors",
                      active ? "text-white" : "text-text-secondary hover:text-white"
                    )}
                  >
                    {t(locale, item.label)}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-brand-teal shadow-[0_0_10px_rgba(94,234,212,0.8)]"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
            <li className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                aria-expanded={moreOpen}
                aria-controls={morePanelId}
                className={cn(
                  "nav-more-trigger inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors",
                  moreActive || moreOpen
                    ? "text-white"
                    : "text-text-secondary hover:text-white"
                )}
              >
                {t(locale, "nav.more")}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    moreOpen && "rotate-180"
                  )}
                />
              </button>
              {moreOpen ? (
                <div
                  id={morePanelId}
                  className="nav-more-panel absolute end-0 top-full mt-2 w-52 rounded-2xl border border-white/10 bg-[#07111f]/98 p-1.5 shadow-2xl backdrop-blur-xl"
                >
                  <ul>
                    {moreNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={
                            isActive(pathname, item.href) ? "page" : undefined
                          }
                          className={cn(
                            "block rounded-xl px-3 py-2 text-sm",
                            isActive(pathname, item.href)
                              ? "bg-accent/10 text-white"
                              : "text-text-secondary hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {t(locale, item.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <form
            action="/search"
            role="search"
            className="hidden items-center xl:flex"
          >
            <label htmlFor="header-search" className="sr-only">
              {t(locale, "common.searchHint")}
            </label>
            <div className="group relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute start-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted"
              />
              <input
                ref={desktopSearchRef}
                id="header-search"
                name="q"
                type="search"
                placeholder={t(locale, "common.searchEverything")}
                autoComplete="off"
                className="h-9 w-44 rounded-full border border-white/10 bg-white/[0.04] ps-8 pe-11 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <kbd
                aria-hidden="true"
                className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 rounded border border-white/10 px-1 font-mono text-[10px] text-text-muted"
              >
                /
              </kbd>
            </div>
          </form>

          <LanguageToggle locale={locale} className="hidden sm:inline-flex" />
          <MotionToggle className="hidden sm:inline-flex" />

          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-expanded={searchOpen}
            aria-controls={mobileSearchId}
            aria-label={
              searchOpen
                ? t(locale, "nav.closeSearch")
                : t(locale, "nav.openSearch")
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-colors hover:border-accent/40 hover:text-white xl:hidden"
          >
            {searchOpen ? (
              <X aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Search aria-hidden="true" className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={menuPanelId}
            aria-label={
              menuOpen
                ? t(locale, "nav.closeMenu")
                : t(locale, "nav.openMenu")
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-colors hover:border-accent/40 hover:text-white xl:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Menu aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div id={mobileSearchId} className="border-t border-white/10 xl:hidden">
          <form
            action="/search"
            role="search"
            className="container-content flex items-center gap-2 py-3"
          >
            <label htmlFor="mobile-search-row" className="sr-only">
              {t(locale, "common.searchHint")}
            </label>
            <div className="relative flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
              />
              <input
                id="mobile-search-row"
                name="q"
                type="search"
                autoFocus
                placeholder={t(locale, "common.searchHint")}
                className="h-10 w-full rounded-full border border-white/10 bg-white/[0.04] ps-9 pe-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="btn-primary h-10 rounded-full px-4 text-sm font-semibold"
            >
              {t(locale, "common.search")}
            </button>
          </form>
        </div>
      ) : null}

      {menuOpen ? (
        <div
          id={menuPanelId}
          className="border-t border-white/10 bg-[#050d1b]/98 shadow-[0_32px_60px_-30px_rgba(0,0,0,0.9)] xl:hidden"
        >
          <div className="container-content py-4">
            <nav aria-label={t(locale, "nav.mobilePrimary")}>
              <p className="meta-label px-3 pb-2">
                {t(locale, "nav.primary")}
              </p>
              <ul className="grid grid-cols-2 gap-1">
                {primaryNav.map((item, index) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-base font-medium",
                          active
                            ? "bg-accent/10 text-white"
                            : "text-text-secondary hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {t(locale, item.label)}
                        {active ? (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal shadow-[0_0_10px_rgba(94,234,212,0.8)]"
                          />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <p className="meta-label px-3 pb-2 pt-4">
                {t(locale, "nav.more")}
              </p>
              <ul className="grid grid-cols-2 gap-1">
                {moreNav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-medium",
                          active
                            ? "bg-accent/10 text-white"
                            : "text-text-secondary hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {t(locale, item.label)}
                        {active ? (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-amber shadow-[0_0_10px_rgba(242,179,61,0.8)]"
                          />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 px-3 py-2.5">
              <span className="text-xs text-text-secondary">
                {t(locale, "common.language")}
              </span>
              <LanguageToggle locale={locale} />
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 px-3 py-2.5">
              <span className="text-xs text-text-secondary">
                {t(locale, "common.motion")}
              </span>
              <MotionToggle showLabel />
            </div>
          </div>
        </div>
      ) : null}

      <ScrollProgress />
    </header>
  );
}
