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
    <div className="w-[280px] shrink-0 border-r border-slate-200 bg-slate-50/50 overflow-y-auto">
      <div className="p-3">
        <h2 className="text-xs font-bold text-slate-900 mb-2">다가오는 주요 이벤트</h2>
        <div className="space-y-2">
          {events.map((event) => {
            const isSelected = event.id === selectedId;
            const isCancelled = event.status === "cancelled";
            return (
              <button
                key={event.id}
                onClick={() => onSelect(event.id)}
                className={`w-full text-left rounded-lg overflow-hidden transition-all ${
                  isSelected
                    ? "ring-2 ring-blue-500 shadow-md"
                    : "bg-white border border-slate-200 hover:shadow-sm"
                } ${isCancelled ? "opacity-60" : ""}`}
              >
                {/* City photo */}
                {event.imageUrl ? (
                  <div className="relative h-24 w-full overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.city}
                      className={`w-full h-full object-cover ${isCancelled ? "grayscale" : ""}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Tier badge overlaid on photo */}
                    <div className="absolute top-2 left-2">
                      <TierBadge tier={event.tier} />
                    </div>
                    {/* Status badges */}
                    {event.status === "cancelled" && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold shadow">
                        취소
                      </div>
                    )}
                    {event.status === "live" && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold shadow flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        LIVE
                      </div>
                    )}
                    {/* City name at bottom of photo */}
                    <div className="absolute bottom-1.5 left-2.5 text-white text-[11px] font-bold drop-shadow-md">
                      {event.city}
                    </div>
                  </div>
                ) : (
                  /* Fallback gradient header */
                  <div className={`relative h-20 bg-gradient-to-r ${event.gradient}`}>
                    <div className="absolute top-2 left-2">
                      <TierBadge tier={event.tier} />
                    </div>
                    {event.status === "cancelled" && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                        취소
                      </div>
                    )}
                    {event.status === "live" && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        LIVE
                      </div>
                    )}
                  </div>
                )}

                {/* Card body - compact */}
                <div className="p-2.5">
                  <div className="font-semibold text-xs text-slate-900 mb-1 leading-tight">
                    {event.name}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-0.5">
                    <MapPin size={10} />
                    {event.city}, {event.country}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-1">
                    <Calendar size={10} />
                    {event.date.slice(5)}{event.endDate ? ` ~ ${event.endDate.slice(5)}` : ""} ({event.days}일)
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-medium text-slate-700">
                    <DollarSign size={10} className="text-slate-400" />
                    예상 ${event.cost.total.toLocaleString()}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button className="w-full mt-3 py-1.5 text-center text-[11px] text-blue-500 hover:text-blue-700 font-medium flex items-center justify-center gap-1">
          전체 이벤트 보기 <span>→</span>
        </button>
      </div>
    </div>
  );
}
