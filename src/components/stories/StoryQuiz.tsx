"use client";

import { useState } from "react";
import { CheckCircle2, Lightbulb, RotateCcw } from "lucide-react";
import type { EchoQuizQuestion } from "@/types/echo";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { pick } from "@/lib/echo/localized";
import { useEcho } from "@/lib/echo/provider";

/**
 * The chapter quick check.
 *
 * Two to four questions with immediate feedback. A wrong answer is never
 * punished: the explanation appears and the question can be tried again, so
 * the quiz stays a learning moment rather than a gate.
 */
export function StoryQuiz({
  questions,
  locale,
}: {
  questions: EchoQuizQuestion[];
  locale: Locale;
}) {
  const { recordQuiz, say } = useEcho();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  function answer(question: EchoQuizQuestion, optionId: string) {
    const correct = optionId === question.correctOptionId;
    setAnswers((current) => ({ ...current, [question.id]: optionId }));
    recordQuiz(question.id, correct);
    say(
      correct
        ? {
            en: "That is exactly right. Well spotted.",
            ar: "هذا صحيح تماماً. أحسنت الملاحظة.",
          }
        : {
            en: "Not quite — look again at the explanation below.",
            ar: "ليس تماماً — أعد قراءة الشرح بالأسفل.",
          },
      correct ? "correct" : "incorrect",
      correct ? "celebrating" : "thinking",
      7000
    );
  }

  return (
    <section
      aria-label={t(locale, "echo.quiz")}
      className="echo-card rounded-2xl p-5 sm:p-6"
    >
      <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#5b3fe0]">
        <Lightbulb aria-hidden="true" className="h-4 w-4" />
        {t(locale, "echo.quiz")}
      </h3>

      <ol className="mt-5 space-y-6">
        {questions.map((question, questionIndex) => {
          const answerId = answers[question.id];
          const answered = answerId !== undefined;
          const correct = answerId === question.correctOptionId;
          return (
            <li key={question.id}>
              <p className="text-base font-semibold leading-snug text-[#1a1338]">
                <span className="me-2 text-[#5b3fe0]">
                  {questionIndex + 1}.
                </span>
                {pick(locale, question.prompt)}
              </p>

              <ul className="mt-3 space-y-2">
                {question.options.map((option) => {
                  const selected = answerId === option.id;
                  const isCorrectOption =
                    option.id === question.correctOptionId;
                  const showCorrect = answered && isCorrectOption;
                  const showWrong = selected && !correct;
                  return (
                    <li key={option.id}>
                      <button
                        type="button"
                        onClick={() => answer(question, option.id)}
                        disabled={answered && correct}
                        className={`flex w-full items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-start text-sm transition-colors ${
                          showCorrect
                            ? "border-[#12a89b] bg-[#12a89b]/12 text-[#0b6b60]"
                            : showWrong
                              ? "border-[#ef6f8e] bg-[#ef6f8e]/12 text-[#a8325a]"
                              : "border-[#1a1338]/12 bg-white text-[#4a4266] hover:border-[#6d4aff]/50 hover:text-[#1a1338]"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            showCorrect
                              ? "border-[#12a89b] bg-[#12a89b] text-white"
                              : showWrong
                                ? "border-[#ef6f8e] bg-[#ef6f8e] text-white"
                                : "border-[#1a1338]/25"
                          }`}
                        >
                          {showCorrect ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : showWrong ? (
                            <span aria-hidden="true">×</span>
                          ) : null}
                        </span>
                        {pick(locale, option.label)}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {answered ? (
                <div
                  className={`mt-3 rounded-2xl p-4 ${
                    correct
                      ? "bg-[#12a89b]/10"
                      : "bg-[#ef6f8e]/10"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#1a1338]">
                    {correct
                      ? t(locale, "echo.quizCorrect")
                      : t(locale, "echo.quizIncorrect")}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#4a4266]">
                    {pick(locale, question.explanation)}
                  </p>
                  {!correct ? (
                    <button
                      type="button"
                      onClick={() =>
                        setAnswers((current) => {
                          const next = { ...current };
                          delete next[question.id];
                          return next;
                        })
                      }
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#1a1338]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#4a4266]"
                    >
                      <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                      {t(locale, "echo.tryAgain")}
                    </button>
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
