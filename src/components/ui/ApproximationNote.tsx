import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/cn";
import { t, type Locale } from "@/lib/i18n";

export function ApproximationNote({
  children,
  className,
  locale = "en",
}: {
  children: React.ReactNode;
  className?: string;
  locale?: Locale;
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-xl border border-violet-400/25 bg-violet-400/[0.07] p-3 text-xs leading-relaxed text-text-secondary",
        className
      )}
    >
      <FlaskConical
        aria-hidden="true"
        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300"
      />
      <span>
        <span className="font-semibold text-violet-200">
          {t(locale, "common.approximation")}.{" "}
        </span>
        {children}
      </span>
    </p>
  );
}
