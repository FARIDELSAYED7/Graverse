"use client";

import { useId, useRef, useState } from "react";
import { Download, Gamepad2, RotateCcw, ShieldCheck, Upload } from "lucide-react";
import { playGames } from "@/data/games";
import { useProgress } from "@/lib/use-progress";

export function ProgressDashboard() {
  const { state, mode, summary, reset, exportJson, importJson } = useProgress();
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(
    null
  );
  const [confirming, setConfirming] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  function download() {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "graverse-progress.json";
    link.click();
    URL.revokeObjectURL(url);
    setMessage({ tone: "ok", text: "Progress exported as graverse-progress.json." });
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;
    const text = await file.text();
    const result = importJson(text);
    setMessage(
      result.ok
        ? { tone: "ok", text: "Progress imported and saved." }
        : { tone: "error", text: result.error ?? "Import failed." }
    );
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Lessons completed", value: summary.lessons },
          { label: "Journeys started", value: summary.journeysStarted },
          { label: "Journeys finished", value: summary.journeysCompleted },
          { label: "Games played", value: summary.games },
          { label: "Badges earned", value: summary.badges },
        ].map((item) => (
          <div key={item.label} className="academy-card rounded-2xl p-4">
            <p className="font-mono text-3xl text-[#152238]">{item.value}</p>
            <p className="mt-1 text-xs font-medium text-[#5A6472]">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="academy-card rounded-2xl p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-[#152238]">
          <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#0F766E]" />
          Stored {mode === "local" ? "in this browser" : "for this session only"}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[#5A6472]">
          GRAVERSE does not use accounts, analytics or cloud sync. Progress stays in
          this browser&apos;s local storage. If storage is blocked, it lasts only for
          this session and the interface says so. No personal data is collected.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={download}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#152238] px-4 text-xs font-semibold text-[#FFF7EA] hover:bg-[#24344f]"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            Export progress
          </button>
          <label
            htmlFor={inputId}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[#152238]/20 px-4 text-xs font-semibold text-[#152238] hover:bg-[#152238]/5"
          >
            <Upload aria-hidden="true" className="h-4 w-4" />
            Import a file
          </label>
          <input
            ref={fileRef}
            id={inputId}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
          {!confirming ? (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#B91C1C]/25 px-4 text-xs font-semibold text-[#9F1239] hover:bg-[#FEE2E2]"
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Reset progress
            </button>
          ) : (
            <span className="inline-flex flex-wrap items-center gap-2 rounded-full bg-[#FEE2E2] px-2 py-1">
              <span className="text-xs font-medium text-[#7F1D1D]">
                Delete all saved progress?
              </span>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setConfirming(false);
                  setMessage({ tone: "ok", text: "Progress reset." });
                }}
                className="rounded-full bg-[#9F1239] px-3 py-1.5 text-xs font-semibold text-white"
              >
                Yes, reset
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#7F1D1D]"
              >
                Cancel
              </button>
            </span>
          )}
        </div>

        {message ? (
          <p
            role="status"
            className={`mt-3 rounded-lg px-3 py-2 text-xs font-medium ${
              message.tone === "ok"
                ? "bg-[#14B8A6]/10 text-[#0F4F49]"
                : "bg-[#FEE2E2] text-[#7F1D1D]"
            }`}
          >
            {message.text}
          </p>
        ) : null}
      </div>

      <div className="academy-card rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-[#152238]">Saved records</h2>
        {Object.keys(state.lessons).length === 0 &&
        Object.keys(state.journeys).length === 0 &&
        Object.keys(state.games).length === 0 ? (
          <p className="mt-2 text-sm text-[#5A6472]">
            Nothing saved yet. Finish a lesson quiz, mark a journey step done or
            play a playground game.
          </p>
        ) : (
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B4532A]">
                Lessons
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-[#374151]">
                {Object.entries(state.lessons).map(([id, entry]) => (
                  <li key={id} className="flex justify-between gap-2">
                    <span className="truncate font-mono text-xs">{id}</span>
                    <span className="shrink-0 text-xs">
                      {entry.score}/{entry.total}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B4532A]">
                Journeys
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-[#374151]">
                {Object.entries(state.journeys).map(([id, entry]) => (
                  <li key={id} className="flex justify-between gap-2">
                    <span className="truncate font-mono text-xs">{id}</span>
                    <span className="shrink-0 text-xs">
                      {entry.completedSteps.length} steps
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#B4532A]">
                <Gamepad2 aria-hidden="true" className="h-3.5 w-3.5" />
                Playground
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-[#374151]">
                {Object.entries(state.games).map(([id, entry]) => (
                  <li key={id} className="flex justify-between gap-2">
                    <span className="truncate text-xs">
                      {playGames.find((game) => game.id === id)?.title ?? id}
                    </span>
                    <span className="shrink-0 text-xs" aria-label={`${entry.stars} of 3 stars`}>
                      {entry.stars}/3 ★
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
