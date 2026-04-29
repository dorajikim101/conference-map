"use client";

import type { EventData } from "@/lib/events";
import { TierBadge } from "./TierBadge";
import { CheckCircle, MapPin, Calendar, DollarSign } from "lucide-react";

interface EventListProps {
  events: EventData[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function EventList({ events, selectedId, onSelect }: EventListProps) {
  return (
    <div className="w-[320px] shrink-0 border-r border-slate-200 bg-slate-50/50 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-bold text-slate-900 mb-3">다가오는 주요 이벤트</h2>
        <div className="space-y-3">
          {events.map((event) => {
            const isSelected = event.id === selectedId;
            return (
              <button
                key={event.id}
                onClick={() => onSelect(event.id)}
                className={`w-full text-left rounded-xl overflow-hidden transition-all ${
                  isSelected
                    ? "ring-2 ring-blue-500 shadow-md"
                    : "bg-white border border-slate-200 hover:shadow-sm"
                }`}
              >
                {/* Gradient header */}
                <div className={`relative h-20 bg-gradient-to-r ${event.gradient}`}>
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle size={20} className="text-blue-500 fill-white" />
                    </div>
                  )}
                  <div className="absolute bottom-2 left-3">
                    <TierBadge tier={event.tier} />
                  </div>
                  {event.status === "cancelled" && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                      취소
                    </div>
                  )}
                  {event.status === "live" && (
                    <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-3">
                  <div className="font-semibold text-sm text-slate-900 mb-1.5 leading-tight">
                    {event.name}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                    <MapPin size={12} />
                    {event.city}, {event.country}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-1.5">
                    <Calendar size={12} />
                    {event.date}{event.endDate ? ` ~ ${event.endDate}` : ""} ({event.days}일)
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-700">
                    <DollarSign size={12} className="text-slate-400" />
                    예상 ${event.cost.total.toLocaleString()}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button className="w-full mt-4 py-2 text-center text-sm text-blue-500 hover:text-blue-700 font-medium flex items-center justify-center gap-1">
          전체 이벤트 보기 <span>→</span>
        </button>
      </div>
    </div>
  );
}
