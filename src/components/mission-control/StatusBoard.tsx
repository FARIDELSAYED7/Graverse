"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CommunicationBadge } from "@/components/ui/CommunicationBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { CommunicationStatus } from "@/lib/mission-control";
import type { HardwareStatus, MissionStatus } from "@/types/artifact";
import { cn } from "@/lib/cn";

export interface BoardRow {
  id: string;
  name: string;
  missionName: string;
  destination: string;
  destinationGroup: string;
  missionStatus: MissionStatus;
  hardwareStatus: HardwareStatus;
  communication: CommunicationStatus;
  freshnessLabel: string;
  lastVerified: string;
}

const communicationFilters: Array<{ id: "all" | CommunicationStatus; label: string }> = [
  { id: "all", label: "All links" },
  { id: "communicating", label: "Communicating" },
  { id: "lost-contact", label: "Lost contact" },
  { id: "not-applicable", label: "Not applicable" },
  { id: "unknown", label: "Unknown" },
];

const destinationFilters = [
  { id: "all", label: "All destinations" },
  { id: "moon", label: "Moon" },
  { id: "mars", label: "Mars" },
  { id: "deep-space", label: "Deep space" },
];

export function StatusBoard({ rows }: { rows: BoardRow[] }) {
  const [query, setQuery] = useState("");
  const [communication, setCommunication] = useState<"all" | CommunicationStatus>("all");
  const [destination, setDestination] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (communication !== "all" && row.communication !== communication) return false;
      if (destination !== "all" && row.destinationGroup !== destination) return false;
      if (!q) return true;
      return [row.name, row.missionName, row.destination, row.hardwareStatus]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [rows, query, communication, destination]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <label htmlFor="status-search" className="sr-only">
              Search the status board
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            />
            <input
              id="status-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search hardware or mission"
              className="h-10 w-full rounded-full border border-white/10 bg-white/[0.04] ps-9 pe-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
            />
          </div>
          <p className="text-xs text-text-muted" aria-live="polite">
            Showing {filtered.length} of {rows.length} records
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by communication status">
          {communicationFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setCommunication(filter.id)}
              aria-pressed={communication === filter.id}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                communication === filter.id
                  ? "border-accent/50 bg-accent/15 text-white"
                  : "border-white/10 bg-white/[0.03] text-text-secondary hover:border-white/25 hover:text-white"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by destination">
          {destinationFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setDestination(filter.id)}
              aria-pressed={destination === filter.id}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                destination === filter.id
                  ? "border-brand-violet/50 bg-brand-violet/15 text-white"
                  : "border-white/10 bg-white/[0.03] text-text-secondary hover:border-white/25 hover:text-white"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-sm text-text-secondary">
          No record matches these filters. Clear a filter to see the full board.
        </p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full border-collapse text-start text-sm">
            <caption className="sr-only">
              Artifact status board with mission, hardware and derived communication status
            </caption>
            <thead className="bg-white/[0.04] text-[10px] uppercase tracking-[0.14em] text-text-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Hardware</th>
                <th scope="col" className="hidden px-4 py-3 font-medium md:table-cell">Mission status</th>
                <th scope="col" className="hidden px-4 py-3 font-medium lg:table-cell">Hardware status</th>
                <th scope="col" className="px-4 py-3 font-medium">Communication</th>
                <th scope="col" className="hidden px-4 py-3 font-medium xl:table-cell">Record checked</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-t border-white/[0.06] align-top">
                  <td className="px-4 py-3">
                    <Link
                      href={`/museum/${row.id}`}
                      className="font-medium text-text-primary hover:text-accent-bright"
                    >
                      {row.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-text-muted">
                      {row.destination} · {row.missionName}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1 md:hidden">
                      <StatusBadge kind="mission" status={row.missionStatus} compact />
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <StatusBadge kind="mission" status={row.missionStatus} compact />
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <StatusBadge kind="hardware" status={row.hardwareStatus} compact />
                  </td>
                  <td className="px-4 py-3">
                    <CommunicationBadge status={row.communication} compact />
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-text-muted xl:table-cell">
                    <span className="font-mono tabular-nums">{row.lastVerified}</span>
                    <br />
                    {row.freshnessLabel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
