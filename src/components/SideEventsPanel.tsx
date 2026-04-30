"use client";

import { Calendar, MapPin, Users } from "lucide-react";

interface SideEventItem {
  name: string;
  host: string;
  date: string;
  desc: string;
}

interface SideEventsPanelProps {
  count: number;
  label: string;
  items: SideEventItem[];
}

export function SideEventsPanel({ count, label, items }: SideEventsPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900">{label}</h3>
          <span className="text-xs font-semibold bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">
            {count}개
          </span>
        </div>
      </div>

      {/* Event list */}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-slate-50 rounded-lg border border-slate-100 p-3 hover:bg-slate-100/80 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-xs font-semibold text-slate-900 truncate">{item.name}</h4>
                </div>
                <p className="text-[10px] text-slate-500 mb-1.5">{item.desc}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Users size={10} />
                    <span>{item.host}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <Calendar size={10} />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      {count > items.length && (
        <div className="mt-2 text-center">
          <span className="text-[10px] text-slate-400">
            외 {count - items.length}개 이벤트 더 있음
          </span>
        </div>
      )}
    </div>
  );
}
