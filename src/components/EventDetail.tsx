"use client";

import type { EventData } from "@/lib/events";
import { Badge } from "./ui/badge";
import {
  Star,
  Diamond,
  ThumbsUp,
  AlertTriangle,
  Target,
  ExternalLink,
} from "lucide-react";
import { SideEventChart, BudgetPieChart, KpiGrid } from "./EventCharts";

interface EventDetailProps {
  event: EventData;
}

const summaryCards = [
  {
    key: "features" as const,
    title: "행사 특징",
    icon: Star,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    key: "difference" as const,
    title: "차별점",
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
    title: "유의점",
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
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="info" className="text-[10px]">선택 이벤트</Badge>
        <Badge className="bg-blue-500 text-white border-transparent text-[10px] font-semibold">
          {event.name}
        </Badge>
        {event.status === "cancelled" && (
          <Badge variant="destructive" className="text-[10px]">취소됨</Badge>
        )}
        {event.status === "live" && (
          <Badge className="bg-emerald-500 text-white border-transparent text-[10px] font-semibold animate-pulse">
            ● LIVE
          </Badge>
        )}
      </div>

      {/* Summary title */}
      <h2 className="text-sm font-bold text-slate-900">한눈에 보는 핵심 포인트</h2>

      {/* 5 Summary cards — 3 on top, 2 on bottom */}
      <div className="grid grid-cols-3 gap-2">
        {summaryCards.slice(0, 3).map((card) => {
          const Icon = card.icon;
          const items = event.summary[card.key].slice(0, 2);
          return (
            <div key={card.key} className="bg-white rounded-lg border border-slate-200 p-2.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className={`w-5 h-5 rounded ${card.bg} flex items-center justify-center`}>
                  <Icon size={11} className={card.color} />
                </div>
                <h4 className="text-[11px] font-semibold text-slate-900">{card.title}</h4>
              </div>
              <ul className="space-y-0.5">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[10px] text-slate-600 leading-tight">
                    <span className="mt-1 w-0.5 h-0.5 rounded-full bg-slate-300 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {/* Bottom row: 2 cards + Luma link card */}
        {summaryCards.slice(3, 5).map((card) => {
          const Icon = card.icon;
          const items = event.summary[card.key].slice(0, 2);
          return (
            <div key={card.key} className="bg-white rounded-lg border border-slate-200 p-2.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className={`w-5 h-5 rounded ${card.bg} flex items-center justify-center`}>
                  <Icon size={11} className={card.color} />
                </div>
                <h4 className="text-[11px] font-semibold text-slate-900">{card.title}</h4>
              </div>
              <ul className="space-y-0.5">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[10px] text-slate-600 leading-tight">
                    <span className="mt-1 w-0.5 h-0.5 rounded-full bg-slate-300 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        {/* Side Event Luma Link */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center">
              <ExternalLink size={11} className="text-blue-500" />
            </div>
            <h4 className="text-[11px] font-semibold text-slate-900">사이드 이벤트</h4>
          </div>
          {event.sideEventUrl ? (
            <a
              href={event.sideEventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 hover:text-blue-800 bg-white px-2 py-1.5 rounded-md border border-blue-200 hover:border-blue-400 transition-colors"
            >
              <ExternalLink size={10} />
              Luma에서 사이드 이벤트 보기
            </a>
          ) : (
            <span className="text-[10px] text-slate-400">소규모 행사 — 링크 없음</span>
          )}
        </div>
      </div>

      {/* Cancel reason */}
      {event.cancelReason && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 text-[11px] text-red-700">
          ⚠️ {event.cancelReason}
        </div>
      )}

      {/* Charts row — compact */}
      <div className="grid grid-cols-3 gap-2">
        <SideEventChart data={event.sideEventTrend} />
        <BudgetPieChart data={event.budget} total={event.cost.total} />
        <KpiGrid data={event.kpis} />
      </div>
    </div>
  );
}
