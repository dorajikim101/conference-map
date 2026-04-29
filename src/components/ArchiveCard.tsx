"use client";

import type { EventData } from "@/lib/events";
import { ArrowRight, Users, CalendarDays, Building2, Tv, FileText } from "lucide-react";

interface ArchiveCardProps {
  archive: EventData["archive"];
}

export function ArchiveCard({ archive }: ArchiveCardProps) {
  const stats = [
    { icon: Users, label: "참석자", value: archive.attendees },
    { icon: CalendarDays, label: "사이드 이벤트", value: String(archive.sideEvents) },
    { icon: Building2, label: "스폰서", value: String(archive.sponsors) },
    { icon: Tv, label: "미디어", value: String(archive.media) },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3">
      <h4 className="text-[11px] font-semibold text-slate-900 mb-2">
        아카이브 ({archive.year})
      </h4>

      <div className="grid grid-cols-2 gap-1.5 mb-2">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-1.5 bg-slate-50 rounded px-2 py-1.5">
              <Icon size={12} className="text-slate-400" />
              <div>
                <div className="text-[9px] text-slate-400">{stat.label}</div>
                <div className="text-[11px] font-semibold text-slate-800">{stat.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-1.5 mb-2">
        <FileText size={12} className="text-slate-400 mt-0.5 shrink-0" />
        <div>
          <div className="text-[9px] text-slate-400 mb-0.5">핵심 메모</div>
          <p className="text-[10px] text-slate-600 leading-relaxed">{archive.note}</p>
        </div>
      </div>

      <button className="text-[10px] text-blue-500 hover:text-blue-700 flex items-center gap-0.5">
        아카이브 보기 <ArrowRight size={10} />
      </button>
    </div>
  );
}
