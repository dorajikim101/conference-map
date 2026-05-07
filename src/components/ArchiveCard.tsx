"use client";

import type { EventData } from "@/lib/events";
import { ArrowRight, Building2, CalendarDays, Tv, Users } from "lucide-react";

interface ArchiveCardProps {
  archive: EventData["archive"];
}

export function ArchiveCard({ archive }: ArchiveCardProps) {
  const stats = [
    { icon: Users, label: "참석자", value: archive.attendees },
    { icon: CalendarDays, label: "사이드 이벤트", value: `${archive.sideEvents}건` },
    { icon: Building2, label: "스폰서", value: `${archive.sponsors}+` },
    { icon: Tv, label: "주요 미디어", value: `${archive.media}건` },
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-[15px] font-black text-slate-950">지난 아카이브 ({archive.year})</h3>
      <h4 className="mt-4 text-[14px] font-black text-blue-600">{archive.eventTitle}</h4>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="text-center">
              <Icon size={18} className="mx-auto mb-2 text-blue-500" />
              <div className="text-[9px] font-semibold leading-3 text-slate-500">{stat.label}</div>
              <div className="mt-1 whitespace-nowrap text-[14px] font-black text-slate-950">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <h5 className="text-[12px] font-black text-blue-600">핵심 메모</h5>
        <ul className="mt-3 space-y-2 text-[11px] leading-5 text-slate-600">
          {archive.notes.map((note, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
              {note}
            </li>
          ))}
        </ul>
      </div>

      <button className="mx-auto mt-5 flex items-center gap-1 text-[13px] font-black text-blue-600 hover:text-blue-700">
        아카이브 보기 <ArrowRight size={15} />
      </button>
    </section>
  );
}
