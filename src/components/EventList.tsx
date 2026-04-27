"use client";

import { CalendarDays, MapPin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CostTooltip } from "@/components/CostTooltip";
import { TierBadge } from "@/components/TierBadge";
import type { EventData } from "@/lib/events";
import { cn } from "@/lib/utils";

export function EventList({
  events,
  selectedId,
  onSelect,
}: {
  events: EventData[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside className="flex h-screen min-h-0 w-[360px] shrink-0 flex-col border-r bg-white">
      <div className="border-b px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">
            1XP
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">Conference Map</p>
            <p className="text-xs text-slate-500">Upcoming crypto events</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-950">Upcoming</h1>
            <p className="text-sm text-slate-500">Decision queue</p>
          </div>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
            {events.length} events
          </span>
        </div>
      </div>
      <ScrollArea className="min-h-0 flex-1 px-4 pb-5">
        <div className="space-y-3 pr-2">
          {events.map((event) => {
            const selected = event.id === selectedId;
            return (
              <button
                type="button"
                key={event.id}
                onClick={() => onSelect(event.id)}
                className={cn(
                  "relative w-full rounded-lg border bg-white p-3 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md",
                  selected && "border-slate-950 bg-slate-50 shadow-md",
                )}
              >
                <TierBadge
                  tier={event.tier}
                  autoTier={event.autoTier}
                  score={event.tierScore}
                  reasons={event.tierReasons}
                  className="absolute -left-1 -top-2"
                />
                <div className="flex gap-3">
                  <div className={cn("h-20 w-20 shrink-0 rounded-md bg-linear-to-br", event.gradient)}>
                    <div className="flex h-full items-end p-2">
                      <span className="rounded bg-white/80 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700">
                        {event.city.slice(0, 3).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <p className="truncate text-sm font-semibold text-slate-950">{event.name}</p>
                    <div className="mt-2 space-y-1.5 text-xs text-slate-500">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {event.city}, {event.country}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                        {event.date}
                      </p>
                    </div>
                    <div className="mt-3">
                      <CostTooltip cost={event.cost} />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
