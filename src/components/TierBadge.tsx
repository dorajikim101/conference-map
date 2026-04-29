"use client";

import type { EventData } from "@/lib/events";

const tierConfig: Record<string, {
  bg: string;
  text: string;
  border: string;
  shadow: string;
  glow: string;
}> = {
  S: {
    bg: "bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500",
    text: "text-yellow-900",
    border: "border-yellow-400/50",
    shadow: "shadow-[0_0_12px_rgba(234,179,8,0.4)]",
    glow: "",
  },
  A: {
    bg: "bg-gradient-to-br from-gray-200 via-slate-300 to-gray-400",
    text: "text-slate-800",
    border: "border-slate-300/50",
    shadow: "shadow-[0_0_10px_rgba(148,163,184,0.35)]",
    glow: "",
  },
  B: {
    bg: "bg-gradient-to-br from-orange-300 via-amber-600 to-orange-700",
    text: "text-orange-950",
    border: "border-amber-500/50",
    shadow: "shadow-[0_0_8px_rgba(217,119,6,0.3)]",
    glow: "",
  },
};

export function TierBadge({ tier }: { tier: EventData["tier"] }) {
  const c = tierConfig[tier] ?? tierConfig.B;

  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black border-2 ${c.bg} ${c.text} ${c.border} ${c.shadow} select-none`}
      style={{ textShadow: "0 1px 2px rgba(255,255,255,0.5)" }}
    >
      {tier}
    </span>
  );
}
