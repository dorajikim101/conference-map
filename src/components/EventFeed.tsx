import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventData } from "@/lib/events";

export function EventFeed({ event }: { event: EventData }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-slate-500" aria-hidden="true" />
          Event Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {event.feed.map((item) => (
          <div key={`${item.label}-${item.time}`} className="rounded-md border p-3">
            <div className="mb-2 flex items-center justify-between gap-3">
              <Badge variant="outline" className="text-[11px]">
                {item.type}
              </Badge>
              <span className="text-xs text-slate-400">{item.time}</span>
            </div>
            <p className="text-sm font-medium leading-5 text-slate-800">{item.label}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
