import { Archive, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventData } from "@/lib/events";
import { cn } from "@/lib/utils";

export function ArchiveCard({ event }: { event: EventData }) {
  const stats = [
    ["참석자", event.archive.attendees],
    ["사이드 이벤트", event.archive.sideEvents.toString()],
    ["스폰서", event.archive.sponsors.toString()],
    ["미디어", event.archive.media.toString()],
  ];

  return (
    <Card className={cn(event.status === "cancelled" && "border-slate-200 bg-slate-100 text-slate-500")}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Archive className="h-4 w-4 text-slate-500" aria-hidden="true" />
          {event.archive.year}년 아카이브
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {stats.map(([label, value]) => (
            <div key={label} className={cn("rounded-md border bg-slate-50 p-3", event.status === "cancelled" && "bg-slate-200/60")}>
              <p className="text-xs text-slate-500">{label}</p>
              <p className={cn("mt-1 text-lg font-semibold text-slate-950", event.status === "cancelled" && "text-slate-600")}>{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-5 text-slate-600">{event.archive.note}</p>
        <Button variant="outline" size="sm" className="mt-4 w-full">
          아카이브 보기
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  );
}
