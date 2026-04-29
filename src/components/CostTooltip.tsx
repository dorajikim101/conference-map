"use client";

import type { EventData } from "@/lib/events";
// CostTooltip is no longer used in the new UI
export function CostTooltip({ cost }: { cost: EventData["cost"] }) {
  return null;
}
