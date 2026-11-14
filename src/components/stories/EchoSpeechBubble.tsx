"use client";

import { Bot, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import type { EchoMessage } from "@/lib/echo/provider";

/**
 * ECHO's speech bubble.
 *
 * The bubble is a live region so a screen reader hears a new line when
 * ECHO changes what it is saying, and the speaker is always labelled so the
 * visitor knows the line is from the companion and not from the record.
 */
export function EchoSpeechBubble({
  message,
  locale,
  fallback,
}: {
  message: EchoMessage | null;
  locale: Locale;
  fallback: string;
}) {
  const text = message ? pick(locale, message.text) : fallback;

  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="absolute -top-2 start-6 h-4 w-4 rotate-45 rounded-sm bg-white"
      />
      <div className="rounded-2xl rounded-ss-sm border border-[#1a1338]/10 bg-white px-4 py-3 shadow-[0_18px_40px_-26px_rgba(26,19,56,0.6)]">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
          {message?.source === "hint" ? (
            <Sparkles aria-hidden="true" className="h-3 w-3" />
          ) : (
            <Bot aria-hidden="true" className="h-3 w-3" />
          )}
          ECHO
        </p>
        <p
          className="mt-1.5 text-[15px] leading-relaxed text-[#1a1338]"
          aria-live="polite"
          aria-atomic="true"
        >
          {text}
        </p>
      </div>
      <p className="mt-2 px-1 text-[11px] leading-relaxed text-[#6b6484]">
        {t(locale, "echo.disclaimer")}
      </p>
    </div>
  );
}
