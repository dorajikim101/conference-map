"use client";

import type { EventData } from "@/lib/events";
import { Badge } from "./ui/badge";
import {
  Star,
  Diamond,
  ThumbsUp,
  AlertTriangle,
  Target,
} from "lucide-react";
import { SideEventChart, BudgetPieChart, KpiGrid } from "./EventCharts";

interface EventDetailProps {
  event: EventData;
}

const summaryCards = [
  {
    key: "features" as const,
    title: "이 행사의 특징",
    icon: Star,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    key: "difference" as const,
    title: "다른 행사와 다른 점",
    icon: Diamond,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    key: "pros" as const,
    title: "장점",
    icon: ThumbsUp,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    key: "risks" as const,
    title: "유의할 점",
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    key: "expectations" as const,
    title: "기대 포인트",
    icon: Target,
    color: "text-blue-500",
    bg: "bg-sky-50",
  },
];

export function EventDetail({ event }: EventDetailProps) {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="info" className="text-xs">선택 이벤트</Badge>
        <Badge className="bg-blue-500 text-white border-transparent text-xs font-semibold">
          {event.name}
        </Badge>
        {event.status === "cancelled" && (
          <Badge variant="destructive" className="text-xs">취소됨</Badge>
        )}
      </div>

      {/* Summary title */}
      <h2 className="text-lg font-bold text-slate-900">한눈에 보는 핵심 포인트</h2>

      {/* 5 Summary cards */}
      <div className="grid grid-cols-1 gap-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          const items = event.summary[card.key];
          return (
            <div key={card.key} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <Icon size={14} className={card.color} />
                </div>
                <h4 className="text-sm font-semibold text-slate-900">{card.title}</h4>
              </div>
              <ul className="space-y-1 pl-1">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        <SideEventChart data={event.sideEventTrend} />
        <BudgetPieChart data={event.budget} total={event.cost.total} />
        <KpiGrid data={event.kpis} />
      </div>
    </div>
  );
}
