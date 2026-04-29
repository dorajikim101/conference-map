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

export default function Home() {
  const [selectedId, setSelectedId] = useState(events[0].id);
  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedId) ?? events[0],
    [selectedId],
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main area (offset by sidebar width) */}
      <div className="flex-1 ml-[240px]">
        {/* Top bar */}
        <TopBar />

        {/* 3-column layout */}
        <div className="flex" style={{ height: "calc(100vh - 64px)" }}>
          {/* Left: Event list */}
          <EventList events={events} selectedId={selectedId} onSelect={setSelectedId} />

          {/* Center: Detail */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex">
              {/* Main detail area */}
              <div className="flex-1 min-w-0">
                <EventDetail event={selectedEvent} />

                {/* Company section (full-width below detail) */}
                <div className="px-5 pb-5">
                  <CompanySection companies={selectedEvent.companies} />
                </div>
              </div>

              {/* Right sidebar */}
              <div className="w-[360px] shrink-0 border-l border-slate-200 overflow-y-auto p-4 space-y-4 bg-white">
                <EventFeed feed={selectedEvent.feed} />
                <ArchiveCard archive={selectedEvent.archive} />
                <RecommendedActions actions={selectedEvent.actions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
