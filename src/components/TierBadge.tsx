"use client";

import type { EventData } from "@/lib/events";

const tierConfig: Record<EventData["tier"], string> = {
  S: "bg-blue-600 text-white",
  A: "bg-slate-700 text-white",
  B: "bg-amber-500 text-white",
};

export function TierBadge({ tier }: { tier: EventData["tier"] }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold ${tierConfig[tier]}`}>
      {tier} Tier
    </span>
  );
}
