import { CheckCircle2, CircleAlert, GitCompareArrows, Sparkles, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventData } from "@/lib/events";

const sections = [
  ["features", "특징", Sparkles],
  ["difference", "차별점", GitCompareArrows],
  ["pros", "장점", CheckCircle2],
  ["risks", "유의점", CircleAlert],
  ["expectations", "기대 포인트", Target],
] as const;

export function SummaryPanel({ event }: { event: EventData }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>핵심 요약</CardTitle>
        <p className="text-sm text-slate-500">출장 예산을 확정하기 전에 확인할 핵심 정보입니다.</p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-2">
          {sections.map(([key, title, Icon]) => (
            <section key={key} className="rounded-md border bg-white p-3">
              <div className="mb-2 flex items-center gap-2">
                <Icon className="h-4 w-4 text-slate-500" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
              </div>
              <ul className="space-y-1.5 text-sm leading-5 text-slate-600">
                {event.summary[key].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
