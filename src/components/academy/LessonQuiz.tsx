"use client";

import { useId, useState } from "react";
import { CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import type { Lesson } from "@/types/academy";
import { useProgress } from "@/lib/use-progress";

export function LessonQuiz({ lesson }: { lesson: Lesson }) {
  const { state, mode, markLesson } = useProgress();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const formId = useId();
  const previous = state.lessons[lesson.id];
  const score = lesson.quiz.reduce(
    (total, question, index) =>
      answers[index] === question.correctIndex ? total + 1 : total,
    0
  );
  const allAnswered = lesson.quiz.every((_, index) => answers[index] !== undefined);

  function submit() {
    setSubmitted(true);
    markLesson(
      lesson.id,
      score,
      lesson.quiz.length,
      `badge-lesson-${lesson.id}`
    );
  }

  function retry() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section
      id="quiz"
      aria-labelledby={`${formId}-heading`}
      className="academy-card scroll-mt-24 rounded-2xl p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#B4532A]">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
            Knowledge check
          </p>
          <h2
            id={`${formId}-heading`}
            className="mt-1 text-xl font-semibold text-[#152238]"
          >
            {lesson.quiz.length} quick questions
          </h2>
        </div>
        {previous ? (
          <p className="rounded-full bg-[#14B8A6]/12 px-3 py-1 text-xs font-medium text-[#0F766E]">
            Saved: {previous.score}/{previous.total}
          </p>
        ) : null}
      </div>

      <form
        className="mt-5 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (allAnswered) submit();
        }}
      >
        {lesson.quiz.map((question, questionIndex) => {
          const chosen = answers[questionIndex];
          const correct = chosen === question.correctIndex;
          const groupName = `${formId}-q-${questionIndex}`;
          return (
            <fieldset key={question.prompt} className="rounded-xl border border-[#152238]/10 p-4">
              <legend className="px-1 text-sm font-semibold text-[#152238]">
                {questionIndex + 1}. {question.prompt}
              </legend>
              <div className="mt-3 grid gap-2">
                {question.options.map((option, optionIndex) => {
                  const selected = chosen === optionIndex;
                  return (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                        submitted
                          ? optionIndex === question.correctIndex
                            ? "border-[#0F766E]/40 bg-[#14B8A6]/12 text-[#0F4F49]"
                            : selected
                              ? "border-[#B91C1C]/30 bg-[#FEE2E2] text-[#7F1D1D]"
                              : "border-[#152238]/10 text-[#374151]"
                          : selected
                            ? "border-[#152238]/40 bg-[#152238]/5 text-[#152238]"
                            : "border-[#152238]/10 text-[#374151] hover:border-[#152238]/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name={groupName}
                        value={optionIndex}
                        checked={selected}
                        disabled={submitted}
                        onChange={() =>
                          setAnswers((current) => ({
                            ...current,
                            [questionIndex]: optionIndex,
                          }))
                        }
                        className="mt-0.5 h-4 w-4 accent-[#152238]"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
              {submitted ? (
                <p
                  className={`mt-3 rounded-lg px-3 py-2 text-xs leading-relaxed ${
                    correct
                      ? "bg-[#14B8A6]/10 text-[#0F4F49]"
                      : "bg-[#FFF1EA] text-[#7C2D12]"
                  }`}
                >
                  {correct ? "Correct. " : "Not quite. "}
                  {question.explanation}
                </p>
              ) : null}
            </fieldset>
          );
        })}

        <div className="flex flex-wrap items-center gap-3">
          {!submitted ? (
            <button
              type="submit"
              disabled={!allAnswered}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#152238] px-5 text-sm font-semibold text-[#FFF7EA] transition-colors hover:bg-[#24344f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Check my answers
            </button>
          ) : (
            <button
              type="button"
              onClick={retry}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#152238]/20 px-5 text-sm font-semibold text-[#152238] hover:bg-[#152238]/5"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Try again
            </button>
          )}
          {submitted ? (
            <p
              role="status"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#152238]"
            >
              <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#0F766E]" />
              You scored {score} of {lesson.quiz.length}. Progress saved{" "}
              {mode === "local" ? "on this device" : "for this session"}.
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
