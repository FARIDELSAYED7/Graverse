import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CircleDot,
  Radio,
  ShieldCheck,
  Signal,
  SignalZero,
} from "lucide-react";
import { StatusBoard } from "@/components/mission-control/StatusBoard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SourceList } from "@/components/ui/SourceList";
import { missionControlSummary, statusBoard } from "@/lib/mission-control";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Mission Control — mission, hardware and communication status",
  description:
    "A source-linked status board that keeps mission status, hardware status and derived communication status separate. Not live telemetry.",
};

const summaryCards = [
  { key: "total", label: "Artifact records", tone: "text-brand-cyan" },
  { key: "operating", label: "Recorded operating", tone: "text-emerald-300" },
  { key: "inactive", label: "Recorded inactive", tone: "text-text-secondary" },
  { key: "communicating", label: "Derived communicating", tone: "text-emerald-300" },
  { key: "lostContact", label: "Derived lost contact", tone: "text-amber-300" },
  { key: "notApplicable", label: "No independent link", tone: "text-text-secondary" },
] as const;

export default function MissionControlPage() {
  const locale = getLocale();
  const summary = missionControlSummary();
  const rows = statusBoard().map((row) => ({
    id: row.artifact.id,
    name: row.artifact.name,
    missionName: row.artifact.missionName,
    destination: row.artifact.destination,
    destinationGroup: row.artifact.destinationGroup,
    missionStatus: row.artifact.missionStatus,
    hardwareStatus: row.artifact.hardwareStatus,
    communication: row.communication,
    freshnessLabel: row.freshness.label,
    lastVerified: row.artifact.lastVerified,
  }));

  const sourceIds = Array.from(
    new Set(statusBoard().flatMap((row) => row.artifact.sourceIds))
  );

  return (
    <div className="pb-16">
      <section className="border-b border-white/10">
        <div className="container-content py-12 sm:py-16">
          <p className="eyebrow flex items-center gap-2">
            <Activity aria-hidden="true" className="h-3.5 w-3.5" />
            {t(locale, "sections.missionControl.eyebrow")}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            {t(locale, "sections.missionControl.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            {t(locale, "sections.missionControl.description")}
          </p>
          <p className="mt-4 inline-flex items-start gap-2 rounded-xl border border-warning/25 bg-warning/[0.07] px-3 py-2 text-xs leading-relaxed text-[#FFD79A]">
            <ShieldCheck aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            This is a snapshot of recorded status, last checked on{" "}
            {summary.lastVerified}. It is not a live telemetry feed.
          </p>
        </div>
      </section>

      <section className="container-content pt-10" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">
          Status summary
        </h2>
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {summaryCards.map((card) => (
            <div
              key={card.key}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <dt className="text-[10px] uppercase tracking-[0.14em] text-text-muted">
                {card.label}
              </dt>
              <dd className={`mt-1 font-mono text-2xl tabular-nums ${card.tone}`}>
                {summary[card.key]}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-content pt-12" aria-labelledby="three-questions">
        <SectionHeading
          eyebrow="Read the board correctly"
          title="Three independent questions"
          description="A mission can be complete while its hardware still operates. Hardware can lose contact without being destroyed. Passive equipment can remain useful without a transmitter."
        />
        <div className="mt-6 grid gap-3 md:grid-cols-3" id="three-questions">
          {[
            {
              icon: CircleDot,
              title: "Mission status",
              body: "Was the mission planned, ongoing, completed, ended, lost or unknown? This describes the mission, not the physical object.",
            },
            {
              icon: Radio,
              title: "Hardware status",
              body: "What does the record say about the object itself: operating, inactive, no longer communicating, impacted, destroyed, still traveling or unknown?",
            },
            {
              icon: Signal,
              title: "Communication status",
              body: "Is a link established? GRAVERSE derives this label from the recorded hardware status. It is a derived label, not a new source claim.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <Icon aria-hidden="true" className="h-5 w-5 text-accent-bright" />
                <h3 className="mt-3 text-base font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-content pt-12" aria-labelledby="board-heading">
        <SectionHeading
          eyebrow="Full board"
          title="Every record, three statuses"
          description="Filter by derived communication state or destination. Open a record to read the original source wording."
          action={
            <Link
              href="/research#status"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-white"
            >
              How status is separated
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          }
        />
        <div className="mt-6">
          <StatusBoard rows={rows} />
        </div>
      </section>

      <section className="container-content pt-12" aria-labelledby="comms-notes">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h2 id="comms-notes" className="flex items-center gap-2 text-base font-semibold text-text-primary">
              <SignalZero aria-hidden="true" className="h-4 w-4 text-amber-300" />
              Loss of contact is not destruction
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Several records describe hardware that stopped communicating. The
              collection does not convert that into a claim that the object was
              destroyed. Where a deliberate impact is documented, the record says
              so explicitly.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold text-text-primary">
              <Signal aria-hidden="true" className="h-4 w-4 text-emerald-300" />
              Passive instruments
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              The Apollo lunar retroreflectors do not transmit. They return a
              laser pulse sent from Earth, which is why the board marks their
              communication state as not applicable rather than “communicating”.
            </p>
          </div>
        </div>
      </section>

      <section className="container-content pt-12">
        <SourceList ids={sourceIds} title="Sources behind the status board" compact />
      </section>
    </div>
  );
}
