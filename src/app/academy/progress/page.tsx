import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProgressDashboard } from "@/components/academy/ProgressDashboard";

export const metadata: Metadata = {
  title: "Your progress",
  description:
    "View, export, import or reset your locally stored GRAVERSE Academy progress. No account and no cloud sync.",
};

export default function ProgressPage() {
  return (
    <div className="container-content max-w-5xl pb-16 pt-10">
      <Link
        href="/academy"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        Space Academy
      </Link>
      <div className="mt-4 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
          Local progress
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#14213B] sm:text-4xl">
          Your learning record
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#46536B] sm:text-base">
          Saved in this browser. You can export, import or reset it.
        </p>
      </div>
      <div className="mt-6">
        <ProgressDashboard />
      </div>
    </div>
  );
}
