"use client";

import Link from "next/link";
import { Check, Circle, Sparkles } from "lucide-react";
import type { Journey } from "@/types/academy";
import { useProgress } from "@/lib/use-progress";

const kindLabel: Record<Journey["steps"][number]["kind"], string> = {
  lesson: "Lesson",
  artifact: "Museum record",
  body: "Destination",
  article: "Article",
  challenge: "Challenge",
};

export function JourneySteps({ journey }: { journey: Journey }) {
  const { state, mode, completeStep } = useProgress();
  const progress = state.journeys[journey.id];
  const completed = progress?.completedSteps ?? [];
  const allStepIds = journey.steps.map((step) => step.id);
  const percent = Math.round((completed.length / journey.steps.length) * 100);

  return (
    <section aria-labelledby="journey-steps-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="journey-steps-heading" className="text-xl font-semibold text-[#152238]">
            The route
          </h2>
          <p className="mt-1 text-sm text-[#5A6472]">
            {completed.length} of {journey.steps.length} steps complete. Progress is
            stored {mode === "local" ? "on this device" : "for this session"}.
          </p>
        </div>
        <span className="rounded-full bg-[#152238]/5 px-3 py-1 font-mono text-sm text-[#152238]">
          {percent}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Journey progress"
        className="mt-3 h-2 overflow-hidden rounded-full bg-[#152238]/10"
      >
        <div
          className="h-full rounded-full transition-[width]"
          style={{ width: `${percent}%`, background: journey.accent }}
        />
      </div>

      <ol className="mt-5 space-y-3">
        {journey.steps.map((step, index) => {
          const done = completed.includes(step.id);
          return (
            <li
              key={step.id}
              className="academy-card flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center"
            >
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  done
                    ? "bg-[#14B8A6] text-white"
                    : "bg-[#152238]/8 text-[#152238]"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B4532A]">
                    {kindLabel[step.kind]}
                  </span>
                  {done ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
                      <Check className="h-3 w-3" /> Done
                    </span>
                  ) : null}
                </div>
                <Link
                  href={step.href}
                  className="mt-0.5 block text-base font-semibold text-[#152238] underline-offset-4 hover:underline"
                >
                  {step.title}
                </Link>
                <p className="mt-0.5 text-sm leading-relaxed text-[#5A6472]">
                  {step.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  completeStep(journey.id, step.id, allStepIds, journey.badge.id)
                }
                disabled={done}
                aria-pressed={done}
                className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-colors ${
                  done
                    ? "cursor-default bg-[#14B8A6]/12 text-[#0F766E]"
                    : "border border-[#152238]/20 text-[#152238] hover:bg-[#152238] hover:text-[#FFF7EA]"
                }`}
              >
                {done ? (
                  <>
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle aria-hidden="true" className="h-3.5 w-3.5" />
                    Mark step done
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {progress?.completedAt ? (
        <p
          role="status"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FFC93C]/20 px-4 py-2 text-sm font-semibold text-[#7C4A03]"
        >
          <Sparkles aria-hidden="true" className="h-4 w-4" />
          Journey complete. Badge “{journey.badge.name}” added to your progress.
        </p>
      ) : null}
    </section>
  );
}
