"use client";

import { Award, BookOpenCheck, Route, Sparkles } from "lucide-react";
import { useProgress } from "@/lib/use-progress";

export function ProgressSnapshot() {
  const { summary, mode } = useProgress();
  const items = [
    { label: "Lessons", value: summary.lessons, icon: BookOpenCheck },
    { label: "Journey steps", value: summary.steps, icon: Route },
    { label: "Badges", value: summary.badges, icon: Award },
  ];
  return (
    <div className="mt-4">
      <dl className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl bg-[#152238]/5 p-3">
            <item.icon aria-hidden="true" className="h-4 w-4 text-[#152238]/50" />
            <dd className="mt-2 font-mono text-2xl leading-none text-[#152238]">
              {item.value}
            </dd>
            <dt className="mt-1 text-[10px] font-medium text-[#5A6472]">{item.label}</dt>
          </div>
        ))}
      </dl>
      <p className="mt-2 flex items-center gap-1.5 text-[10px] text-[#6B7280]">
        <Sparkles aria-hidden="true" className="h-3 w-3" />
        {mode === "local"
          ? "Local progress active"
          : mode === "memory"
            ? "Session-only progress (storage blocked)"
            : "Reading saved progress…"}
      </p>
    </div>
  );
}
