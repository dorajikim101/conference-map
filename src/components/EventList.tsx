"use client";

import type { EventData } from "@/lib/events";
import { TierBadge } from "./TierBadge";
import { Calendar, CheckCircle2, DollarSign, MapPin } from "lucide-react";

interface EventListProps {
  events: EventData[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function formatDate(event: EventData) {
  const start = event.date.replace("2026-", "").replace("-", ".");
  const end = event.endDate?.replace("2026-", "").replace("-", ".");
  return end ? `${start} - ${end}` : start;
}

export function EventList({ events, selectedId, onSelect }: EventListProps) {
  return (
    <aside className="w-[260px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-4 py-5">
      <h2 className="mb-4 text-[21px] font-black tracking-[-0.01em] text-slate-950">다가오는 주요 이벤트</h2>

      <div className="space-y-2.5">
        {events.map((event) => {
          const isSelected = event.id === selectedId;
          const isCancelled = event.status === "cancelled";

          return (
            <button
              key={event.id}
              onClick={() => onSelect(event.id)}
              className={`relative flex w-full gap-3 rounded-xl border bg-white p-3 text-left transition-all ${
                isSelected
                  ? "border-blue-500 shadow-[0_0_0_1px_rgba(37,99,235,0.45)]"
                  : "border-slate-200 hover:border-blue-200 hover:shadow-sm"
              } ${isCancelled ? "opacity-60" : ""}`}
            >
              <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-lg">
                {event.imageUrl ? (
                  <img
                    src={event.imageUrl}
                    alt={event.city}
                    className={`h-full w-full object-cover ${isCancelled ? "grayscale" : ""}`}
                  />
                ) : (
                  <div className={`h-full w-full bg-gradient-to-br ${event.gradient}`} />
                )}
                <div className="absolute left-1.5 top-1.5">
                  <TierBadge tier={event.tier} />
                </div>
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="line-clamp-2 text-[13px] font-bold leading-snug text-slate-950">{event.name}</h3>
                  {isSelected && <CheckCircle2 size={17} className="shrink-0 fill-blue-600 text-white" />}
                </div>
                <div className="mt-2 space-y-1">
                  <p className="flex items-center gap-1.5 truncate text-[10px] font-medium text-slate-500">
                    <MapPin size={11} className="shrink-0 text-slate-400" />
                    {event.city}, {event.country}
                  </p>
                  <p className="flex items-center gap-1.5 truncate text-[10px] font-medium text-slate-500">
                    <Calendar size={11} className="shrink-0 text-slate-400" />
                    {formatDate(event)} ({event.days}일)
                  </p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                    <DollarSign size={10} />
                    예상 비용
                  </div>
                  <div className="text-[16px] font-black leading-tight text-slate-900">
                    ${event.cost.total.toLocaleString()}
                  </div>
                </div>
              </div>

              {event.status === "live" && (
                <span className="absolute right-2 top-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  LIVE
                </span>
              )}
              {event.status === "cancelled" && (
                <span className="absolute right-2 top-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  취소
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button className="mt-3 flex h-9 w-full items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-blue-600 hover:bg-blue-50">
        전체 이벤트 보기 <span>→</span>
      </button>
    </aside>
  );
}
