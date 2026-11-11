"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Star,
  Trophy,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { JuniorQuizQuestion } from "@/types/kids";

type JuniorQuizProps = {
  questions: JuniorQuizQuestion[];
};

export function JuniorQuiz({ questions }: JuniorQuizProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const promptId = useId();
  const promptRef = useRef<HTMLHeadingElement>(null);
  const completionRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (complete) {
      completionRef.current?.focus();
      return;
    }
    if (index > 0) promptRef.current?.focus();
  }, [index, complete]);

  if (!questions.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-text-secondary">
        The quiz is not available in this build.
      </div>
    );
  }

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const chosenCorrect = answered && selected === question.correctIndex;
  const progress = Math.round(
    ((index + (answered ? 1 : 0)) / questions.length) * 100
  );

  function choose(optionIndex: number) {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === question.correctIndex) {
      setScore((current) => current + 1);
    }
  }

  function next() {
    if (!answered) return;
    if (isLast) {
      setComplete(true);
      return;
    }
    setIndex((current) => current + 1);
    setSelected(null);
    setAnswered(false);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setComplete(false);
  }

  if (complete) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-brand-violet/25 bg-[linear-gradient(145deg,rgba(15,37,66,0.9),rgba(14,18,44,0.96)_58%,rgba(6,16,31,0.96))] p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.18),transparent_68%)]"
        />
        <div className="relative text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-brand-amber/30 bg-brand-amber/10 text-brand-amber shadow-[0_0_30px_-8px_rgba(251,191,36,0.5)]">
            <Trophy aria-hidden="true" className="h-8 w-8" />
          </span>
          <p className="eyebrow mt-4">Mission complete</p>
          <h3
            ref={completionRef}
            tabIndex={-1}
            className="mt-2 text-2xl font-semibold tracking-tight text-white focus-visible:outline-none sm:text-3xl"
          >
            You scored {score} out of {questions.length}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
            {score === questions.length
              ? "Perfect score. You matched every machine to its mission."
              : score >= 3
                ? "Strong work. You know your rovers, probes and landing sites."
                : "Good start. Review the six machines below, then try again."}
          </p>

          <div
            className="mt-5 flex items-center justify-center gap-1.5"
            aria-hidden="true"
          >
            {questions.map((question, starIndex) => (
              <Star
                key={question.id}
                className={cn(
                  "h-6 w-6",
                  starIndex < score
                    ? "fill-brand-amber text-brand-amber"
                    : "text-white/20"
                )}
              />
            ))}
          </div>
          <p className="sr-only">
            {score} of {questions.length} stars earned.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={restart}
              className="btn-primary inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Play again
            </button>
            <Link
              href="#meet"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-text-primary transition-colors hover:border-accent/50 hover:bg-white/5"
            >
              Review the machines
            </Link>
            <Link
              href="/museum"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-text-primary transition-colors hover:border-accent/50 hover:bg-white/5"
            >
              Open the full museum
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-bg-elevated/80 p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.18),transparent_68%)]"
      />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-violet">
            Question {index + 1} of {questions.length}
          </p>
          <p className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-text-secondary">
            Score{" "}
            <span className="font-mono tabular-nums text-brand-amber">
              {score}
            </span>
          </p>
        </div>

        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-teal via-brand-violet to-brand-magenta transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h3
          ref={promptRef}
          id={`${promptId}-prompt`}
          tabIndex={-1}
          className="mt-5 text-balance text-xl font-semibold leading-snug text-white focus-visible:outline-none sm:text-2xl"
        >
          {question.prompt}
        </h3>

        <div
          role="group"
          aria-labelledby={`${promptId}-prompt`}
          className="mt-5 grid gap-2"
        >
          {question.options.map((option, optionIndex) => {
            const isCorrectOption = optionIndex === question.correctIndex;
            const isSelected = optionIndex === selected;
            return (
              <button
                key={option}
                type="button"
                onClick={() => choose(optionIndex)}
                aria-pressed={isSelected}
                aria-disabled={answered}
                data-quiz-option
                data-correct={isCorrectOption}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-start text-sm font-medium transition-colors",
                  !answered &&
                    "border-white/12 bg-white/[0.03] text-text-primary hover:border-accent/50 hover:bg-white/[0.06]",
                  answered &&
                    isCorrectOption &&
                    "border-success/50 bg-success/10 text-[#B9F7DC]",
                  answered &&
                    isSelected &&
                    !isCorrectOption &&
                    "border-danger/50 bg-danger/10 text-[#FFC4C8]",
                  answered &&
                    !isCorrectOption &&
                    !isSelected &&
                    "border-white/10 bg-white/[0.02] text-text-muted",
                  answered && "cursor-default"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border font-mono text-xs",
                    !answered && "border-white/15 bg-white/[0.04] text-text-secondary",
                    answered && isCorrectOption && "border-success/40 bg-success/15",
                    answered && isSelected && !isCorrectOption && "border-danger/40 bg-danger/15",
                    answered &&
                      !isCorrectOption &&
                      !isSelected &&
                      "border-white/10 text-text-muted"
                  )}
                >
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span className="flex-1">{option}</span>
                {answered && isCorrectOption ? (
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-success"
                  />
                ) : null}
                {answered && isSelected && !isCorrectOption ? (
                  <XCircle
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-danger"
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-4 min-h-[4.5rem]"
        >
          {answered ? (
            <div
              className={cn(
                "rounded-xl border p-3.5 text-sm leading-relaxed",
                chosenCorrect
                  ? "border-success/30 bg-success/[0.07]"
                  : "border-warning/30 bg-warning/[0.07]"
              )}
            >
              <p
                className={cn(
                  "flex items-center gap-1.5 font-semibold",
                  chosenCorrect ? "text-[#8CF0C4]" : "text-[#FFD79A]"
                )}
              >
                {chosenCorrect ? (
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <XCircle aria-hidden="true" className="h-4 w-4" />
                )}
                {chosenCorrect ? "Correct." : "Not quite."}
              </p>
              <p className="mt-1 text-text-secondary">
                {question.explanation}
              </p>
              <Link
                href={question.artifactHref}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-bright hover:text-white"
              >
                Open the full record for {question.artifactName}
                <ArrowRight aria-hidden="true" className="h-3 w-3" />
              </Link>
            </div>
          ) : (
            <p className="text-sm text-text-muted">
              Choose one answer to see the explanation.
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            {answered ? "Explanation from the artifact record." : "No timer. Take your time."}
          </p>
          <button
            type="button"
            onClick={next}
            disabled={!answered}
            className="btn-primary inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLast ? "See my score" : "Next question"}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
