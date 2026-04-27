"use client";

import { useMemo, useState } from "react";
import { EventDetail } from "@/components/EventDetail";
import { EventList } from "@/components/EventList";
import { events } from "@/lib/events";

export default function Home() {
  const [selectedId, setSelectedId] = useState(events[0].id);
  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedId) ?? events[0],
    [selectedId],
  );

  return (
    <div className="flex min-h-screen bg-white text-slate-950">
      <EventList events={events} selectedId={selectedId} onSelect={setSelectedId} />
      <EventDetail event={selectedEvent} />
    </div>
  );
}
