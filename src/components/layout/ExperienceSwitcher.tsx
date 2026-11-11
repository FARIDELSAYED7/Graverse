import Link from "next/link";
import { ArrowUpRight, BookOpen, Compass, Telescope } from "lucide-react";
import { experiences, type ExperienceId } from "@/lib/experience";
import { cn } from "@/lib/cn";

const icons = {
  academy: BookOpen,
  museum: Telescope,
  explorer: Compass,
} as const;

export function ExperienceSwitcher({
  current,
  variant = "dark",
  className,
}: {
  current?: ExperienceId | "home";
  variant?: "dark" | "light";
  className?: string;
}) {
  return (
    <nav aria-label="Choose an experience" className={cn("grid gap-3 sm:grid-cols-3", className)}>
      {experiences.map((experience) => {
        const Icon = icons[experience.id];
        const active = current === experience.id;
        return (
          <Link
            key={experience.id}
            href={experience.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative overflow-hidden rounded-2xl border p-4 transition-transform hover:-translate-y-0.5",
              variant === "light"
                ? "border-[#152238]/12 bg-white/80 hover:border-[#152238]/30"
                : "border-white/10 bg-white/[0.04] hover:border-white/25"
            )}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-0.5 opacity-80"
              style={{ background: experience.accent }}
            />
            <span className="flex items-center gap-2">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: `${experience.accent}1f`, color: experience.accent }}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-[0.18em]",
                  variant === "light" ? "text-[#6B7280]" : "text-text-muted"
                )}
              >
                {experience.eyebrow}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className={cn(
                  "ml-auto h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                  variant === "light" ? "text-[#6B7280]" : "text-text-muted"
                )}
              />
            </span>
            <span
              className={cn(
                "mt-3 block text-lg font-semibold",
                variant === "light" ? "text-[#152238]" : "text-white"
              )}
            >
              {experience.name}
            </span>
            <span
              className={cn(
                "mt-1 block text-sm leading-relaxed",
                variant === "light" ? "text-[#4B5563]" : "text-text-secondary"
              )}
            >
              {experience.tagline}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
