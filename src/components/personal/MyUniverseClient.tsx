"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  Download,
  FolderPlus,
  Heart,
  History,
  RotateCcw,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { usePersonal } from "@/lib/use-personal";
import { allArtifacts } from "@/data/artifacts";
import { simulations } from "@/data/simulations";
import { ROVER_BUILDER_ID } from "@/lib/achievements";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

const artifactMap = new Map(allArtifacts.map((artifact) => [artifact.id, artifact]));

function simulationLabel(id: string): string {
  if (id === ROVER_BUILDER_ID) return "Rover builder";
  return simulations.find((simulation) => simulation.id === id)?.title ?? id;
}

export function MyUniverseClient() {
  const personal = usePersonal();
  const { state } = personal;
  const [collectionName, setCollectionName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const favorites = useMemo(
    () => state.favorites.map((id) => artifactMap.get(id)).filter(Boolean),
    [state.favorites]
  );
  const recent = useMemo(
    () => state.recent.map((entry) => ({ entry, artifact: artifactMap.get(entry.id) })).filter((row) => row.artifact),
    [state.recent]
  );

  function addCollection() {
    if (!collectionName.trim()) return;
    personal.makeCollection(collectionName, state.favorites);
    setCollectionName("");
    setMessage("Collection created with your current favourites.");
  }

  function download() {
    const blob = new Blob([personal.exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "graverse-my-universe.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function importFile(file: File) {
    const text = await file.text();
    const result = personal.importJson(text);
    setMessage(result.ok ? "Personal data imported." : result.error ?? "Import failed.");
  }

  return (
    <div className="container-content py-10">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        <p className="text-xs leading-relaxed text-text-muted">
          {personal.mode === "local"
            ? "Saved in this browser's local storage."
            : personal.mode === "memory"
              ? "Local storage is unavailable. Changes will disappear when this tab closes."
              : "Loading your saved records…"}        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={download} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-text-secondary hover:text-white">
            <Download aria-hidden="true" className="h-3.5 w-3.5" />
            Export
          </button>
          <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-text-secondary hover:text-white">
            <Upload aria-hidden="true" className="h-3.5 w-3.5" />
            Import
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            tabIndex={-1}
            aria-label="Import personal data file"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void importFile(file);
              event.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (!confirmReset) {
                setConfirmReset(true);
                return;
              }
              personal.reset();
              setConfirmReset(false);
              setMessage("Personal data reset.");
            }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs",
              confirmReset
                ? "border-danger/40 bg-danger/10 text-[#FFB3B8]"
                : "border-white/15 text-text-secondary hover:text-white"
            )}
          >
            <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
            {confirmReset ? "Confirm reset" : "Reset"}
          </button>
        </div>
      </div>

      {message ? (
        <p role="status" className="mt-3 rounded-xl border border-accent/25 bg-accent/10 px-3 py-2 text-sm text-accent-bright">
          {message}
        </p>
      ) : null}

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Favourites", value: state.favorites.length, icon: Heart },
          { label: "Collections", value: state.collections.length, icon: FolderPlus },
          { label: "Recently viewed", value: state.recent.length, icon: History },
          { label: "Simulations", value: Object.keys(state.simulations).length, icon: Download },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-text-muted">
                <Icon aria-hidden="true" className="h-3 w-3" />
                {stat.label}
              </dt>
              <dd className="mt-1 font-mono text-2xl tabular-nums text-brand-cyan">{stat.value}</dd>
            </div>
          );
        })}
      </dl>

      <section className="mt-10" aria-labelledby="favorites-heading">
        <h2 id="favorites-heading" className="text-lg font-semibold text-text-primary">
          Favourites
        </h2>
        {favorites.length === 0 ? (
          <p className="mt-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-text-secondary">
            No favourites yet. Open an artifact and choose “Save to favourites”.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((artifact) => (
              <div key={artifact!.id} className="relative">
                <ArtifactCard artifact={artifact!} />
                <button
                  type="button"
                  onClick={() => personal.favorite(artifact!.id)}
                  aria-label={`Remove ${artifact!.name} from favourites`}
                  className="absolute end-3 top-3 z-30 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 backdrop-blur hover:text-white"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12" aria-labelledby="collections-heading">
        <h2 id="collections-heading" className="text-lg font-semibold text-text-primary">
          Collections
        </h2>
        <form
          className="mt-3 flex flex-col gap-2 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            addCollection();
          }}
        >
          <label htmlFor="collection-name" className="sr-only">
            New collection name
          </label>
          <input
            id="collection-name"
            value={collectionName}
            onChange={(event) => setCollectionName(event.target.value)}
            maxLength={80}
            placeholder="Name a collection, for example “Landing hardware”"
            className="h-10 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent/50 focus:outline-none"
          />
          <button type="submit" className="btn-primary inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold">
            <FolderPlus aria-hidden="true" className="h-4 w-4" />
            Create
          </button>
        </form>
        <p className="mt-1.5 text-xs text-text-muted">
          A new collection starts with your current favourites. You can remove items below.
        </p>

        {state.collections.length === 0 ? (
          <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-text-secondary">
            No collections yet.
          </p>
        ) : (
          <ul className="mt-4 grid gap-4 lg:grid-cols-2">
            {state.collections.map((collection) => (
              <li key={collection.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-text-primary">{collection.name}</h3>
                    <p className="mt-0.5 text-xs text-text-muted">
                      {collection.artifactIds.length} records · created {formatDate(collection.createdAt.slice(0, 10))}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => personal.removeCollection(collection.id)}
                    aria-label={`Delete collection ${collection.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-text-muted hover:text-[#FFB3B8]"
                  >
                    <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                </div>
                {collection.artifactIds.length === 0 ? (
                  <p className="mt-3 text-xs text-text-muted">This collection is empty.</p>
                ) : (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {collection.artifactIds.map((id) => {
                      const artifact = artifactMap.get(id);
                      if (!artifact) return null;
                      return (
                        <li key={id} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] py-1 ps-2.5 pe-1 text-xs text-text-secondary">
                          <Link href={`/museum/${id}`} className="hover:text-white">
                            {artifact.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => personal.toggleItem(collection.id, id)}
                            aria-label={`Remove ${artifact.name} from ${collection.name}`}
                            className="inline-flex h-5 w-5 items-center justify-center rounded-full hover:text-white"
                          >
                            <X aria-hidden="true" className="h-3 w-3" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {state.favorites.filter((id) => !collection.artifactIds.includes(id)).length > 0 ? (
                  <div className="mt-3">
                    <label htmlFor={`add-${collection.id}`} className="text-[10px] uppercase tracking-[0.14em] text-text-muted">
                      Add a favourite
                    </label>
                    <select
                      id={`add-${collection.id}`}
                      defaultValue=""
                      onChange={(event) => {
                        if (event.target.value) personal.toggleItem(collection.id, event.target.value);
                        event.target.value = "";
                      }}
                      className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#07111f] px-3 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
                    >
                      <option value="">Choose a favourite…</option>
                      {state.favorites
                        .filter((id) => !collection.artifactIds.includes(id))
                        .map((id) => {
                          const artifact = artifactMap.get(id);
                          return artifact ? (
                            <option key={id} value={id}>
                              {artifact.name}
                            </option>
                          ) : null;
                        })}
                    </select>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="recent-heading">
          <h2 id="recent-heading" className="text-lg font-semibold text-text-primary">
            Recently viewed
          </h2>
          {recent.length === 0 ? (
            <p className="mt-2 text-sm text-text-secondary">No artifact pages opened yet.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {recent.map(({ entry, artifact }) => (
                <li key={entry.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <Link href={`/museum/${entry.id}`} className="text-sm font-medium text-text-primary hover:text-accent-bright">
                    {artifact!.name}
                  </Link>
                  <span className="text-xs text-text-muted">{formatDate(entry.viewedAt.slice(0, 10))}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="simulations-heading">
          <h2 id="simulations-heading" className="text-lg font-semibold text-text-primary">
            Simulations explored
          </h2>
          {Object.keys(state.simulations).length === 0 ? (
            <p className="mt-2 text-sm text-text-secondary">
              No simulations completed yet.{" "}
              <Link href="/simulations" className="text-accent-bright hover:text-white">
                Open the lab
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {Object.entries(state.simulations).map(([id, record]) => (
                <li key={id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <span className="text-sm font-medium text-text-primary">{simulationLabel(id)}</span>
                  <span className="text-xs text-text-muted">
                    {typeof record.score === "number" ? `${record.score}/100 · ` : ""}
                    {formatDate(record.completedAt.slice(0, 10))}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
