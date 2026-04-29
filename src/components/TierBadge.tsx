"use client";

import type { EventData } from "@/lib/events";

export function TierBadge({ tier }: { tier: EventData["tier"] }) {
  const config: Record<string, { bg: string; text: string; border: string }> = {
    S: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    A: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    B: { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
  };
  const c = config[tier] ?? config.B;

  return (
    <span className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold border ${c.bg} ${c.text} ${c.border}`}>
      {tier}
    </span>
  );
}
