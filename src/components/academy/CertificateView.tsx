"use client";

import { useMemo, useState } from "react";
import { Award, Printer, ShieldCheck } from "lucide-react";
import { achievementSummary } from "@/lib/achievements";
import { lessons } from "@/data/lessons";
import { journeys } from "@/data/journeys";
import { usePersonal } from "@/lib/use-personal";
import { useProgress } from "@/lib/use-progress";

function formatDate(value: string | undefined): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function CertificateView() {
  const progress = useProgress();
  const personal = usePersonal();
  const [name, setName] = useState("");

  const summary = useMemo(
    () =>
      achievementSummary({
        progress: progress.state,
        personal: personal.state,
      }),
    [progress.state, personal.state]
  );

  const lessonsCompleted = Object.keys(progress.state.lessons).length;
  const journeysCompleted = Object.values(progress.state.journeys).filter(
    (journey) => journey.completedAt
  ).length;
  const eligible = lessonsCompleted > 0 || journeysCompleted > 0;

  return (
    <div className="space-y-5">
      <div className="academy-card rounded-2xl p-5">
        <label htmlFor="certificate-name" className="text-sm font-semibold text-[#14213B]">
          Name on the record (optional)
        </label>
        <p className="mt-1 text-xs leading-relaxed text-[#5F6B83]">
          Typed here only. It is not saved, sent anywhere or added to storage.
        </p>
        <input
          id="certificate-name"
          type="text"
          value={name}
          maxLength={60}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="mt-2 w-full max-w-sm rounded-xl border border-[#14213B]/20 bg-white px-3 py-2 text-sm text-[#14213B] outline-none focus:border-[#14213B] focus:ring-2 focus:ring-[#14213B]/20"
        />
      </div>

      {eligible ? (
        <div className="overflow-hidden rounded-3xl border-2 border-[#14213B]/20 bg-[#FFFDF7] p-6 sm:p-10">
          <div className="border border-[#14213B]/15 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9C4321]">
                  GRAVERSE Space Academy
                </p>
                <p className="mt-1 text-xs text-[#5F6B83]">Personal learning record</p>
              </div>
              <Award aria-hidden="true" className="h-10 w-10 text-[#9C4321]" />
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.18em] text-[#5F6B83]">
              This record belongs to
            </p>
            <p className="mt-1 min-h-[2.5rem] text-2xl font-semibold text-[#14213B] sm:text-3xl">
              {name.trim() || "A GRAVERSE learner"}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              {[
                { label: "Lessons", value: `${lessonsCompleted}/${lessons.length}` },
                { label: "Journeys", value: `${journeysCompleted}/${journeys.length}` },
                { label: "Achievements", value: `${summary.unlocked}/${summary.total}` },
                {
                  label: "Record updated",
                  value: formatDate(progress.state.updatedAt),
                },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-[#5F6B83]">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 font-mono text-sm text-[#14213B]">{item.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 border-t border-[#14213B]/10 pt-4 text-[11px] leading-relaxed text-[#5F6B83]">
              This is a self-issued record of locally stored activity. It is not an
              accredited qualification, and GRAVERSE is not affiliated with NASA. It
              cannot be verified by anyone else.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#14213B]/10 bg-white p-5">
          <p className="text-sm font-semibold text-[#14213B]">Nothing to certify yet</p>
          <p className="mt-1 text-sm leading-relaxed text-[#5F6B83]">
            Complete a lesson quiz or a guided journey, then come back. The record is
            built from the progress already saved in this browser.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="/academy/lessons"
              className="inline-flex h-10 items-center rounded-full bg-[#14213B] px-4 text-xs font-semibold text-[#FFF8EC]"
            >
              Browse lessons
            </a>
            <a
              href="/academy/journeys"
              className="inline-flex h-10 items-center rounded-full border border-[#14213B]/20 px-4 text-xs font-semibold text-[#14213B]"
            >
              Start a journey
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          disabled={!eligible}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-[#14213B] px-4 text-xs font-semibold text-[#FFF8EC] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Printer aria-hidden="true" className="h-4 w-4" />
          Print or save as PDF
        </button>
        <span className="inline-flex items-center gap-1.5 text-xs text-[#5F6B83]">
          <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 text-[#0F766E]" />
          Built only from data already on this device
        </span>
      </div>
    </div>
  );
}
