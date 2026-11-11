"use client";

import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { useTransition } from "react";
import { LOCALE_COOKIE, localeMeta, t, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function LanguageToggle({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next: Locale = locale === "en" ? "ar" : "en";

  function switchLocale() {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={`${t(locale, "common.language")}: ${t(locale, next === "en" ? "common.english" : "common.arabic")}`}
      lang={localeMeta[next].htmlLang}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 text-xs font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-white disabled:opacity-60",
        className
      )}
      disabled={pending}
    >
      <Languages aria-hidden="true" className="h-3.5 w-3.5" />
      {localeMeta[next].nativeLabel}
    </button>
  );
}
