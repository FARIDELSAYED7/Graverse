"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { MotionToggle } from "./MotionToggle";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/cn";
import { t, type Locale } from "@/lib/i18n";

const primaryNav = [
  { href: "/", label: "nav.home" },
  { href: "/museum", label: "nav.museum" },
  { href: "/explorer", label: "nav.explorer" },
  { href: "/academy", label: "nav.academy" },
  { href: "/simulations", label: "nav.simulations" },
  { href: "/mission-control", label: "nav.missionControl" },
  { href: "/stories", label: "nav.stories" },
] as const;

const moreNav = [
  { href: "/engineering", label: "nav.engineering" },
  { href: "/research", label: "nav.research" },
  { href: "/compare", label: "nav.compare" },
  { href: "/my-universe", label: "nav.myUniverse" },
  { href: "/about", label: "nav.about" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/museum") return pathname.startsWith("/museum");
  return pathname === href || pathname.startsWith(`${href}/`);
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040a16]/80 backdrop-blur-xl">
      <div className="brand-rule pointer-events-none absolute inset-x-0 top-0" />
      <div className="container-content flex h-16 items-center justify-between gap-3">
        <Logo
          idPrefix="header"
          asLink
          markClassName="h-9 w-9"
          className="shrink-0 rounded-md focus-visible:outline-none"
        />

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
                        className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-brand-teal"
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
                  "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors",
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
                  className="absolute end-0 top-full mt-2 w-52 rounded-2xl border border-white/10 bg-[#07111f]/98 p-1.5 shadow-2xl backdrop-blur-xl"
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
          className="border-t border-white/10 bg-[#050d1b]/98 xl:hidden"
        >
          <div className="container-content py-4">
            <nav aria-label={t(locale, "nav.mobilePrimary")}>
              <ul className="grid gap-1">
                {[...primaryNav, ...moreNav].map((item, index) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-2.5 text-base font-medium",
                          active
                            ? "bg-accent/10 text-white"
                            : "text-text-secondary hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {t(locale, item.label)}
                        {active ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-violet shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
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
    </header>
  );
}
