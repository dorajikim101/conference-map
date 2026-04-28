import { Activity, AlertTriangle, BarChart3, CalendarDays, CircleDollarSign, MapPin, Plane, TrendingUp } from "lucide-react";
import { ArchiveCard } from "@/components/ArchiveCard";
import { CompanySection } from "@/components/CompanySection";
import { CostTooltip } from "@/components/CostTooltip";
import { EventFeed } from "@/components/EventFeed";
import { SummaryPanel } from "@/components/SummaryPanel";
import { TierBadge } from "@/components/TierBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventData } from "@/lib/events";
import { currency, eventDateRange } from "@/lib/format";
import { cn } from "@/lib/utils";

const statusLabels: Record<EventData["status"], string> = {
  upcoming: "예정",
  live: "LIVE",
  completed: "완료",
  cancelled: "취소",
};

const statusVariants: Record<EventData["status"], "outline" | "success" | "secondary" | "destructive"> = {
  upcoming: "outline",
  live: "success",
  completed: "secondary",
  cancelled: "destructive",
};

export function EventDetail({ event }: { event: EventData }) {
  const maxBudget = Math.max(...event.budget.map((item) => item.value));
  const maxSideEvents = Math.max(...event.sideEventTrend.map((item) => item.value));

  return (
    <main className={cn("min-w-0 flex-1 bg-slate-50", event.status === "cancelled" && "bg-slate-100")}>
      <div className="flex h-screen min-h-0 flex-col">
        <header className={cn("border-b bg-white px-8 py-5", event.status === "live" && "border-emerald-200 bg-emerald-50/60")}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <TierBadge
                  tier={event.tier}
                  autoTier={event.autoTier}
                  score={event.tierScore}
                  reasons={event.tierReasons}
                />
                <Badge variant={statusVariants[event.status]}>{statusLabels[event.status]}</Badge>
                <Badge variant="outline">{event.days + 2}박 숙박</Badge>
                <Badge variant="info">ICN 출발</Badge>
              </div>
              <h2 className="text-2xl font-semibold tracking-normal text-slate-950">{event.name}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {event.city}, {event.country}
                  {event.venue ? ` / ${event.venue}` : ""}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {eventDateRange(event.date, event.endDate)}
                </span>
                {event.status === "live" ? (
                  <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                    <Activity className="h-4 w-4" aria-hidden="true" />
                    현재 진행 중
                  </span>
                ) : null}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg border bg-white px-4 py-3 shadow-sm">
                <p className="text-xs text-slate-500">총 예상 비용</p>
                <div className="mt-1">
                  <CostTooltip cost={event.cost} />
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-auto px-8 py-6">
          {event.status === "cancelled" ? (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-900">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold">이 행사는 취소되었습니다</p>
                  <p className="mt-1 text-sm leading-6">{event.cancelReason}</p>
                </div>
              </div>
            </div>
          ) : null}
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
            <SummaryPanel event={event} />
            <div className="space-y-5">
              <EventFeed event={event} />
              <ArchiveCard event={event} />
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  의사결정 지표
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-3">
                  {event.kpis.map((kpi) => (
                    <div key={kpi.label} className="rounded-md border bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">{kpi.label}</p>
                      <p className="mt-1 text-xl font-semibold text-slate-950">{kpi.value}</p>
                      <p className="mt-1 text-xs text-slate-500">{kpi.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                  <section>
                    <div className="mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-slate-950">사이드 이벤트 추이</h3>
                    </div>
                    <div className="space-y-3">
                      {event.sideEventTrend.map((item) => (
                        <div key={item.label} className="grid grid-cols-[44px_1fr_42px] items-center gap-3">
                          <span className="text-xs text-slate-500">{item.label}</span>
                          <div className="h-2 rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-slate-900"
                              style={{ width: `${(item.value / maxSideEvents) * 100}%` }}
                            />
                          </div>
                          <span className="text-right text-xs font-medium text-slate-700">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <div className="mb-3 flex items-center gap-2">
                      <CircleDollarSign className="h-4 w-4 text-slate-500" aria-hidden="true" />
                      <h3 className="text-sm font-semibold text-slate-950">예산 구성</h3>
                    </div>
                    <div className="space-y-3">
                      {event.budget.map((item) => (
                        <div key={item.label} className="grid grid-cols-[54px_1fr_68px] items-center gap-3">
                          <span className="text-xs text-slate-500">{item.label}</span>
                          <div className="h-2 rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-sky-500"
                              style={{ width: `${(item.value / maxBudget) * 100}%` }}
                            />
                          </div>
                          <span className="text-right text-xs font-medium text-slate-700">{currency(item.value)}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-slate-500" aria-hidden="true" />
                  추천 액션
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.actions.map((action, index) => (
                    <div key={action} className="flex gap-3 rounded-md border bg-white p-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-6 text-slate-700">{action}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-5">
            <CompanySection event={event} />
          </div>
        </div>
      </div>
    </main>
  );
}
