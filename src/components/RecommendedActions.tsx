"use client";

import { ArrowRight, CalendarDays, Hotel, LockKeyhole, Plane } from "lucide-react";

const defaultActions = [
  { icon: Plane, title: "항공권 가격 알림 설정", detail: "가격 변동 시 알림을 받으세요" },
  { icon: Hotel, title: "숙소 조기 예약하기", detail: "주요 호텔 조기 예약 (최대 15% 절감)" },
  { icon: CalendarDays, title: "사이드 이벤트 등록", detail: "관심 이벤트 미리 등록" },
  { icon: LockKeyhole, title: "비자 및 입국 정보 확인", detail: "UAE 입국 규정 최신 확인" },
];

export function RecommendedActions({ actions }: { actions: string[] }) {
  const items = defaultActions.map((item, index) => ({
    ...item,
    title: actions[index] ?? item.title,
  }));

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-black text-slate-950">추천 액션</h3>
      </div>

      <div className="space-y-3">
        {items.map((action) => {
          const Icon = action.icon;
          return (
            <button key={action.title} className="flex w-full items-start gap-3 text-left">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600">
                <Icon size={16} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-black text-slate-900">{action.title}</span>
                <span className="mt-0.5 block text-[10px] leading-4 text-slate-500">{action.detail}</span>
              </span>
            </button>
          );
        })}
      </div>

      <button className="mx-auto mt-4 flex items-center gap-1 text-[12px] font-black text-blue-600 hover:text-blue-700">
        전체 액션 보기 <ArrowRight size={14} />
      </button>
    </section>
  );
}
