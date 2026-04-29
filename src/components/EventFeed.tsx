"use client";

import type { EventData } from "@/lib/events";
import { ArrowRight } from "lucide-react";

interface EventFeedProps {
  feed: EventData["feed"];
}

const feedTypeColors: Record<string, string> = {
  "라이브": "bg-red-100 text-red-700",
  "연사": "bg-purple-100 text-purple-700",
  "운영": "bg-blue-100 text-blue-700",
  "공지": "bg-amber-100 text-amber-700",
  "안전": "bg-red-100 text-red-700",
  "비용": "bg-emerald-100 text-emerald-700",
  "사이드 이벤트": "bg-cyan-100 text-cyan-700",
  "참가자": "bg-indigo-100 text-indigo-700",
  "여행": "bg-teal-100 text-teal-700",
  "아젠다": "bg-violet-100 text-violet-700",
};

export function EventFeed({ feed }: EventFeedProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-slate-900">실시간 이벤트 피드</h4>
        <button className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1">
          더 보기 <ArrowRight size={12} />
        </button>
      </div>
      <div className="space-y-2.5">
        {feed.map((item, i) => {
          const colorClass = feedTypeColors[item.type] || "bg-slate-100 text-slate-600";
          return (
            <div key={i} className="flex items-start gap-2.5">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${colorClass}`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-snug">{item.label}</p>
                <span className="text-xs text-slate-400">{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
