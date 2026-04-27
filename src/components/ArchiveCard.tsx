import { Archive, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventData } from "@/lib/events";

export function ArchiveCard({ event }: { event: EventData }) {
  const stats = [
    ["Attendees", event.archive.attendees],
    ["Side events", event.archive.sideEvents.toString()],
    ["Sponsors", event.archive.sponsors.toString()],
    ["Media", event.archive.media.toString()],
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Archive className="h-4 w-4 text-slate-500" aria-hidden="true" />
          {event.archive.year} Archive
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-md border bg-slate-50 p-3">
              <p className="text-xs text-slate-500">{label}</p>
              <p className="mt-1 text-lg font-semibold text-slate-950">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-5 text-slate-600">{event.archive.note}</p>
        <Button variant="outline" size="sm" className="mt-4 w-full">
          Archive view
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  );
}
