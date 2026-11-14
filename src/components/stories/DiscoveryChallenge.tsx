"use client";

import { useState } from "react";
import { HelpCircle, Wrench } from "lucide-react";
import type { EchoChallenge } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import { useEcho } from "@/lib/echo/provider";

/**
 * "What would you do?"
 *
 * A short decision scenario taken from the real engineering constraints the
 * mission designers faced. The answer is never graded as right or wrong —
 * the panel explains what actually happened and why.
 */
export function DiscoveryChallenge({
  challenge,
  locale,
}: {
  challenge: EchoChallenge;
  locale: Locale;
}) {
  const { say } = useEcho();
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <section
      aria-label={t(locale, "echo.challenge")}
      className="echo-card overflow-hidden rounded-2xl"
    >
      <div className="bg-gradient-to-br from-[#2b1f6b] to-[#0f0b28] px-5 py-5 text-white sm:px-6">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#c9bfff]">
          <Wrench aria-hidden="true" className="h-4 w-4" />
          {t(locale, "echo.challenge")}
        </h3>
        <p className="mt-2 text-lg font-semibold leading-snug">
          {pick(locale, challenge.prompt)}
        </p>
      </div>

      <div className="p-5 sm:p-6">
        <ul className="space-y-2">
          {challenge.options.map((option) => {
            const selected = choice === option.id;
            const correct = option.id === challenge.correctOptionId;
            return (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => {
                    setChoice(option.id);
                    say(
                      correct
                        ? {
                            en: "Good call — here is what really happened.",
                            ar: "اختيار جيد — إليك ما حدث فعلاً.",
                          }
                        : {
                            en: "Interesting thought. Here is what the mission team actually did.",
                            ar: "فكرة مثيرة للاهتمام. إليك ما فعله فريق المهمة فعلاً.",
                          },
                      "hint",
                      correct ? "celebrating" : "thinking",
                      9000
                    );
                  }}
                  aria-pressed={selected}
                  className={`w-full rounded-2xl border px-4 py-3 text-start text-sm transition-colors ${
                    selected
                      ? correct
                        ? "border-[#12a89b] bg-[#12a89b]/12 text-[#0b6b60]"
                        : "border-[#e08a2c] bg-[#e08a2c]/12 text-[#8a4f0c]"
                      : "border-[#1a1338]/12 bg-white text-[#4a4266] hover:border-[#6d4aff]/50 hover:text-[#1a1338]"
                  }`}
                >
                  {pick(locale, option.label)}
                </button>
              </li>
            );
          })}
        </ul>

        {choice ? (
          <div className="mt-4 rounded-2xl border border-[#1a1338]/10 bg-[#f6f1e6] p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#1a1338]">
              <HelpCircle aria-hidden="true" className="h-4 w-4 text-[#5b3fe0]" />
              {t(locale, "echo.reveal")}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#4a4266]">
              {pick(locale, challenge.reality)}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
