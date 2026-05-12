"use client";

import { Calendar, ExternalLink, Users } from "lucide-react";

interface SideEventItem {
  name: string;
  host: string;
  date: string;
  desc: string;
  url?: string;
}

interface SideEventsPanelProps {
  count: number;
  label: string;
  items: SideEventItem[];
  sourceUrl?: string;
}

export function SideEventsPanel({ count, label, items, sourceUrl }: SideEventsPanelProps) {
  return (
    <section className="min-h-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[15px] font-black text-slate-950">{label}</h3>
        <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-black text-blue-600">{count}개</span>
      </div>

      <div className="max-h-[250px] space-y-2 overflow-y-auto pr-1">
        {items.map((item) => (
          <article key={`${item.name}-${item.date}`} className="rounded-lg border border-slate-200 bg-slate-50/60 p-2.5">
            <h4 className="truncate text-[12px] font-black text-slate-900">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-600 hover:underline transition-colors">
                  {item.name}
                  <ExternalLink size={9} className="shrink-0 text-blue-400" />
                </a>
              ) : (
                item.name
              )}
            </h4>
            <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-500">{item.desc}</p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                <Users size={10} />
                <span className="truncate">{item.host}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                <Calendar size={10} />
                <span>{item.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {count > items.length && (
        <div className="mt-2 text-center text-[10px] font-semibold text-slate-400">외 {count - items.length}개 이벤트 더 있음</div>
      )}

      {sourceUrl && (
        <div className="mt-2 text-center">
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-500 hover:text-blue-700 hover:underline transition-colors">
            📍 전체 사이드 이벤트 보기 <ExternalLink size={9} />
          </a>
        </div>
      )}
    </section>
  );
}
