"use client";

import type { EventData } from "@/lib/events";

interface SummaryPanelProps {
  event: EventData;
}

export function SummaryPanel({ event }: SummaryPanelProps) {
  // This component is now integrated into EventDetail
  // Kept for backward compatibility
  return null;
}
