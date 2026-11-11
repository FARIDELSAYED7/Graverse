"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  Bot,
  BookOpen,
  Gamepad2,
  Home,
  Route,
} from "lucide-react";

const links = [
  { href: "/academy", label: "Overview", icon: Home },
  { href: "/academy/journeys", label: "Journeys", icon: Route },
  { href: "/academy/lessons", label: "Lessons", icon: BookOpen },
  { href: "/academy/play", label: "Playground", icon: Gamepad2 },
  { href: "/academy/robot-lab", label: "Robot lab", icon: Bot },
  { href: "/academy/progress", label: "Progress", icon: Award },
] as const;

export function AcademyNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Academy sections"
      className="border-b border-[#14213B]/10 bg-white/60"
    >
      <div className="container-content no-scrollbar flex gap-1 overflow-x-auto py-2">
        {links.map((link) => {
          const active =
            link.href === "/academy"
              ? pathname === "/academy"
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "bg-[#14213B] text-[#FFF8EC]"
                  : "text-[#46536B] hover:bg-[#14213B]/5 hover:text-[#14213B]"
              }`}
            >
              <Icon aria-hidden="true" className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
