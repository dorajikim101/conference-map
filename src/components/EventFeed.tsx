"use client";

import type { EventData } from "@/lib/events";
import { ArrowRight } from "lucide-react";

interface EventFeedProps {
  feed: EventData["feed"];
}

const originalFeed = [
  {
    type: "Side Event",
    label: "Side Event 플랫폼 오픈되었습니다",
    detail: "70개 이상의 사이드 이벤트 등록이 시작되었습니다.",
    time: "2시간 전",
  },
  {
    type: "News",
    label: "Circle, Aptos Labs와 파트너십 체결",
    detail: "스테이블코인 확산 전략을 위한 전략적 파트너십입니다.",
    time: "5시간 전",
  },
  {
    type: "Speaker",
    label: "Vitalik Buterin 키노트 연설 확정",
    detail: "이더리움 공동창업자의 키노트 참여가 확정되었습니다.",
    time: "1일 전",
  },
  {
    type: "Update",
    label: "UAE 비자 규정 및 입국 안내 업데이트",
    detail: "최신 비자 및 입국 정보가 공지되었습니다.",
    time: "1일 전",
  },
  {
    type: "Venue",
    label: "두바이 월드트레이드센터 운영 정보 안내",
    detail: "행사장 교통 및 시설 안내가 업데이트되었습니다.",
    time: "2일 전",
  },
];

const feedTypeColors: Record<string, string> = {
  "Side Event": "bg-blue-50 text-blue-600",
  News: "bg-blue-50 text-blue-600",
  Speaker: "bg-blue-50 text-blue-600",
  Update: "bg-blue-50 text-blue-600",
  Venue: "bg-blue-50 text-blue-600",
};

export function EventFeed({ feed }: EventFeedProps) {
  const items = originalFeed.length ? originalFeed : feed.map((item) => ({ ...item, detail: "", type: item.type }));

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-black text-slate-950">실시간 이벤트 피드</h3>
        <button className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700">
          더 보기 <ArrowRight size={13} />
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const colorClass = feedTypeColors[item.type] || "bg-slate-100 text-slate-600";
          return (
            <div key={`${item.type}-${item.label}`} className="grid grid-cols-[8px_58px_1fr_auto] gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className={`h-5 rounded-md px-1.5 text-center text-[9px] font-bold leading-5 ${colorClass}`}>
                {item.type}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-bold leading-4 text-slate-900">{item.label}</p>
                <p className="mt-0.5 line-clamp-2 text-[10px] leading-4 text-slate-500">{item.detail}</p>
              </div>
              <span className="whitespace-nowrap text-[10px] font-medium text-slate-400">{item.time}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
