"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { MotionToggle } from "./MotionToggle";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/academy", label: "Academy" },
  { href: "/museum", label: "Museum" },
  { href: "/explorer", label: "Explorer" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/museum") {
    return pathname.startsWith("/museum");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const desktopSearchRef = useRef<HTMLInputElement>(null);
  const menuPanelId = useId();
  const mobileSearchId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#040a16]/80 backdrop-blur-xl">
      <div className="brand-rule pointer-events-none absolute inset-x-0 top-0" />
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Logo
          idPrefix="header"
          asLink
          markClassName="h-9 w-9"
          className="rounded-md focus-visible:outline-none"
        />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-white"
                        : "text-text-secondary hover:text-white"
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-brand-teal via-brand-violet to-brand-magenta"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <form
            action="/search"
            role="search"
            className="hidden items-center lg:flex"
          >
            <label htmlFor="header-search" className="sr-only">
              Search artifacts, missions, lessons and destinations
            </label>
            <div className="group relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted"
              />
              <input
                ref={desktopSearchRef}
                id="header-search"
                name="q"
                type="search"
                placeholder="Search everything"
                autoComplete="off"
                className="h-9 w-52 rounded-full border border-white/10 bg-white/[0.04] pl-8 pr-12 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <kbd
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-white/10 px-1 font-mono text-[10px] text-text-muted"
              >
                /
              </kbd>
            </div>
          </form>

          <MotionToggle className="hidden sm:inline-flex" />

          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-expanded={searchOpen}
            aria-controls={mobileSearchId}
            aria-label={searchOpen ? "Close search" : "Open search"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-colors hover:border-accent/40 hover:text-white lg:hidden"
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
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-secondary transition-colors hover:border-accent/40 hover:text-white lg:hidden"
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
        <div id={mobileSearchId} className="border-t border-white/10 lg:hidden">
          <form
            action="/search"
            role="search"
            className="container-content flex items-center gap-2 py-3"
          >
            <label htmlFor="mobile-search-row" className="sr-only">
              Search artifacts, missions and destinations
            </label>
            <div className="relative flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
              />
              <input
                id="mobile-search-row"
                name="q"
                type="search"
                autoFocus
                placeholder="Search artifacts, missions, destinations"
                className="h-10 w-full rounded-full border border-white/10 bg-white/[0.04] pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="btn-gradient h-10 rounded-full px-4 text-sm font-semibold"
            >
              Search
            </button>
          </form>
        </div>
      ) : null}

      {menuOpen ? (
        <div
          id={menuPanelId}
          className="border-t border-white/10 bg-[#050d1b]/98 lg:hidden"
        >
          <div className="container-content py-4">
            <nav aria-label="Mobile primary">
              <ul className="grid gap-1">
                {navItems.map((item, index) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium",
                          active
                            ? "bg-accent/10 text-white"
                            : "text-text-secondary hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {item.label}
                        {active ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-violet shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <form
              action="/search"
              role="search"
              className="mt-4 flex items-center gap-2"
            >
              <label htmlFor="mobile-search" className="sr-only">
                Search artifacts, missions, lessons and destinations
              </label>
              <div className="relative flex-1">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                />
                <input
                  id="mobile-search"
                  name="q"
                  type="search"
                  placeholder="Search artifacts"
                  className="h-10 w-full rounded-full border border-white/10 bg-white/[0.04] pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="btn-gradient h-10 rounded-full px-4 text-sm font-semibold"
              >
                Search
              </button>
            </form>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 px-3 py-2.5">
              <span className="text-xs text-text-secondary">
                Motion and animation
              </span>
              <MotionToggle showLabel />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
