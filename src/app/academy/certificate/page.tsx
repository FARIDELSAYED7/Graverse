import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ScrollText } from "lucide-react";
import { CertificateView } from "@/components/academy/CertificateView";

export const metadata: Metadata = {
  title: "Learning record — Space Academy",
  description:
    "A self-issued, printable record of the lessons, journeys and achievements saved in this browser. Not an accredited qualification.",
};

export default function CertificatePage() {
  return (
    <div className="container-content max-w-4xl pb-16 pt-10">
      <Link
        href="/academy"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14213B] underline-offset-4 hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
        Space Academy
      </Link>
      <div className="mt-4 max-w-2xl">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9C4321]">
          <ScrollText aria-hidden="true" className="h-3.5 w-3.5" />
          Certificate
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#14213B] sm:text-4xl">
          Your learning record
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#46536B] sm:text-base">
          A printable summary of what you have finished. It is honest about what it
          is: a self-issued record, not an accredited certificate.
        </p>
      </div>
      <div className="mt-6">
        <CertificateView />
      </div>
    </div>
  );
}
