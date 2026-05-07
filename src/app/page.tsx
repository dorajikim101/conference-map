"use client";

import { useMemo, useState } from "react";
import { events } from "@/lib/events";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { EventList } from "@/components/EventList";
import { EventDetail } from "@/components/EventDetail";
import { EventFeed } from "@/components/EventFeed";
import { ArchiveCard } from "@/components/ArchiveCard";
import { RecommendedActions } from "@/components/RecommendedActions";
import { CompanySection } from "@/components/CompanySection";
import { SideEventsPanel } from "@/components/SideEventsPanel";

// 오늘 날짜 이후 첫 non-cancelled 이벤트
const today = "2026-05-04";
const nextEvent = events.find((e) => e.date >= today && e.status !== "cancelled");
const initialId = nextEvent?.id ?? events[0].id;

export default function Home() {
  const [selectedId, setSelectedId] = useState(initialId);
  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedId) ?? events[0],
    [selectedId],
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#fbfcfe] text-slate-900">
      <Sidebar />

      <div className="ml-[240px] flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar />

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <EventList events={events} selectedId={selectedId} onSelect={setSelectedId} />

          <main className="min-w-0 flex-1 overflow-hidden">
            <div className="grid h-full grid-cols-[minmax(620px,1fr)_300px] gap-2 p-2 pl-3">
              <div className="flex min-w-0 flex-col gap-2 overflow-y-auto">
                <EventDetail event={selectedEvent} />

                <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_280px] gap-2 overflow-hidden">
                  <CompanySection companies={selectedEvent.companies} />
                  <SideEventsPanel
                    count={selectedEvent.sideEvents.count}
                    label={selectedEvent.sideEvents.label}
                    items={selectedEvent.sideEvents.items}
                  />
                </div>
              </div>

              <aside className="min-h-0 space-y-2 overflow-y-auto">
                <EventFeed feed={selectedEvent.feed} />
                <ArchiveCard archive={selectedEvent.archive} />
                <RecommendedActions actions={selectedEvent.actions} />
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
