"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeftRight, GitCompareArrows } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CommunicationBadge } from "@/components/ui/CommunicationBadge";
import { allArtifacts, getArtifactById } from "@/data/artifacts";
import { deriveCommunicationStatus } from "@/lib/mission-control";
import { formatDate } from "@/lib/format";
import type { Artifact } from "@/types/artifact";

function valueOrUnknown(value: string | undefined | null): string {
  return value && value.trim() ? value : "Not documented";
}

function dateOrUnknown(value: string | undefined): string {
  return value ? formatDate(value) : "Not documented";
}

const rows: Array<{ label: string; render: (artifact: Artifact) => React.ReactNode }> = [
  { label: "Destination", render: (artifact) => artifact.destination },
  { label: "Mission", render: (artifact) => artifact.missionName },
  { label: "Programme", render: (artifact) => valueOrUnknown(artifact.programName) },
  { label: "Hardware type", render: (artifact) => artifact.hardwareType.replace(/-/g, " ") },
  { label: "Mission status", render: (artifact) => <StatusBadge kind="mission" status={artifact.missionStatus} compact /> },
  { label: "Hardware status", render: (artifact) => <StatusBadge kind="hardware" status={artifact.hardwareStatus} compact /> },
  { label: "Communication status (derived)", render: (artifact) => <CommunicationBadge status={deriveCommunicationStatus(artifact)} compact /> },
  { label: "Location", render: (artifact) => `${artifact.location.body} · ${artifact.location.locationName}` },
  { label: "Location precision", render: (artifact) => artifact.location.precision },
  { label: "Launch", render: (artifact) => dateOrUnknown(artifact.launchDate) },
  { label: "Arrival / deployment", render: (artifact) => dateOrUnknown(artifact.arrivalDate) },
  { label: "Mission end", render: (artifact) => dateOrUnknown(artifact.missionEndDate) },
  { label: "Last contact", render: (artifact) => dateOrUnknown(artifact.lastContactDate) },
  { label: "Last verified", render: (artifact) => artifact.lastVerified },
  { label: "Fate", render: (artifact) => artifact.fate },
  { label: "Scientific purpose", render: (artifact) => artifact.scientificPurpose },
  { label: "Recorded sources", render: (artifact) => `${artifact.sourceIds.length} source records` },
];

export function CompareClient() {
  const params = useSearchParams();
  const initialA = params.get("a") ?? "apollo-11-lm-descent-stage";
  const initialB = params.get("b") ?? "perseverance";
  const [aId, setAId] = useState(getArtifactById(initialA) ? initialA : "apollo-11-lm-descent-stage");
  const [bId, setBId] = useState(getArtifactById(initialB) ? initialB : "perseverance");
  const a = useMemo(() => getArtifactById(aId), [aId]);
  const b = useMemo(() => getArtifactById(bId), [bId]);

  return (
    <div className="container-content py-10">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { value: aId, set: setAId, label: "First record" },
          { value: bId, set: setBId, label: "Second record" },
        ].map((control) => (
          <label key={control.label} className="block text-sm">
            <span className="font-medium text-text-primary">{control.label}</span>
            <select
              value={control.value}
              onChange={(event) => control.set(event.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-white/10 bg-[#07111f] px-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
            >
              {allArtifacts.map((artifact) => (
                <option key={artifact.id} value={artifact.id}>
                  {artifact.name} — {artifact.destination}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            const previousA = aId;
            setAId(bId);
            setBId(previousA);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-text-secondary hover:text-white"
        >
          <ArrowLeftRight aria-hidden="true" className="h-3.5 w-3.5" />
          Swap sides
        </button>
        {a && b ? (
          <Link
            href={`/compare?a=${a.id}&b=${b.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-text-secondary hover:text-white"
          >
            <GitCompareArrows aria-hidden="true" className="h-3.5 w-3.5" />
            Shareable link
          </Link>
        ) : null}
      </div>

      {a && b ? (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[720px] border-collapse text-start text-sm">
            <caption className="sr-only">
              Side-by-side comparison of {a.name} and {b.name}. Unknown values stay unknown.
            </caption>
            <thead className="bg-white/[0.04]">
              <tr>
                <th scope="col" className="w-44 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
                  Field
                </th>
                <th scope="col" className="px-4 py-3 text-base font-semibold text-text-primary">
                  <Link href={`/museum/${a.id}`} className="hover:text-accent-bright">
                    {a.name}
                  </Link>
                </th>
                <th scope="col" className="px-4 py-3 text-base font-semibold text-text-primary">
                  <Link href={`/museum/${b.id}`} className="hover:text-accent-bright">
                    {b.name}
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-white/[0.06] align-top">
                  <th scope="row" className="px-4 py-3 text-xs font-medium text-text-muted">
                    {row.label}
                  </th>
                  <td className="px-4 py-3 text-text-secondary">{row.render(a)}</td>
                  <td className="px-4 py-3 text-text-secondary">{row.render(b)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-text-secondary">
          Choose two artifact records to compare.
        </p>
      )}

      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-text-muted">
        Comparison shows only what the records document. “Not documented” means no
        source in the record establishes the value; it does not mean the value is
        unimportant or unknowable. Communication status is derived from the
        recorded hardware status and is not a live signal measurement.
      </p>
    </div>
  );
}
