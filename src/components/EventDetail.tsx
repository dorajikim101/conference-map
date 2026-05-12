"use client";

import type { EventData } from "@/lib/events";
import { Badge } from "./ui/badge";
import { AlertTriangle, Diamond, ExternalLink, Globe, Star, Target, ThumbsUp } from "lucide-react";
import { BudgetPieChart, KpiGrid, SideEventChart } from "./EventCharts";

interface EventDetailProps {
  event: EventData;
}

const summaryCards = [
  { key: "features" as const, title: "이 행사의 특징", icon: Star, color: "text-blue-600", bg: "bg-blue-50" },
  { key: "difference" as const, title: "다른 행사와 다른 점", icon: Diamond, color: "text-violet-600", bg: "bg-violet-50" },
  { key: "pros" as const, title: "장점", icon: ThumbsUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  { key: "risks" as const, title: "유의할 점", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
  { key: "expectations" as const, title: "여기서 기대할 수 있는 것", icon: Target, color: "text-blue-600", bg: "bg-sky-50" },
];

export function EventDetail({ event }: EventDetailProps) {
  return (
    <section className="shrink-0 rounded-xl border border-slate-200 bg-white p-3">
      <div className="mb-3 flex items-center gap-2 flex-wrap">
        <Badge variant="secondary" className="h-6 rounded-md bg-slate-100 px-2 text-[10px] font-bold text-slate-700">
          선택 이벤트
        </Badge>
        <Badge className="h-6 rounded-md border border-slate-200 bg-white px-2 text-[10px] font-bold text-slate-800">
          {event.name}
        </Badge>
        {event.website && (
          <a
            href={event.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-6 items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 text-[10px] font-bold text-blue-600 hover:border-blue-400 hover:bg-blue-100 transition-colors"
          >
            <Globe size={11} />
            공식 웹사이트 <ExternalLink size={9} />
          </a>
        )}
        {event.status === "cancelled" && (
          <Badge variant="destructive" className="h-6 rounded-md px-2 text-[10px] font-bold">
            취소됨
          </Badge>
        )}
        {event.status === "live" && (
          <Badge className="h-6 rounded-md border-transparent bg-emerald-500 px-2 text-[10px] font-bold text-white">
            LIVE
          </Badge>
        )}
      </div>

      <h2 className="mb-3 text-[18px] font-black tracking-tight text-slate-950">한눈에 보는 핵심 포인트</h2>

      <div className="grid grid-cols-3 gap-2">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className="min-h-[92px] rounded-lg border border-slate-200 bg-white p-3">
              <div className="mb-2 flex items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-md ${card.bg}`}>
                  <Icon size={15} className={card.color} />
                </span>
                <h3 className={`text-[13px] font-black ${card.color}`}>{card.title}</h3>
              </div>
              <ul className="space-y-1">
                {event.summary[card.key].slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-1.5 text-[11px] leading-[1.45] text-slate-700">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="min-h-[92px] rounded-lg border border-blue-100 bg-blue-50/50 p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white">
              <ExternalLink size={15} className="text-blue-600" />
            </span>
            <h3 className="text-[13px] font-black text-blue-700">사이드 이벤트</h3>
          </div>
          <p className="mb-2 text-[11px] leading-snug text-slate-600">
            {event.sideEvents.count.toLocaleString()}개 {event.sideEvents.label} 후보를 확인하고 우선순위를 정리하세요.
          </p>
          {event.sideEventUrl ? (
            <a
              href={event.sideEventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 items-center gap-1.5 rounded-md border border-blue-200 bg-white px-2 text-[11px] font-bold text-blue-600 hover:border-blue-400"
            >
              {event.sideEventUrl.includes('luma.com') ? 'Luma' : '공식'} 보기 <ExternalLink size={11} />
            </a>
          ) : (
            <span className="text-[11px] font-semibold text-slate-400">링크 없음</span>
          )}
        </div>
      </div>

      {event.cancelReason && (
        <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-semibold text-red-700">
          {event.cancelReason}
        </div>
      )}

      <div className="mt-2 grid grid-cols-[1fr_1fr_1.05fr] gap-2">
        <SideEventChart data={event.sideEventTrend} />
        <BudgetPieChart data={event.budget} total={event.cost.total} />
        <KpiGrid data={event.kpis} event={event} />
      </div>
    </section>
  );
}
