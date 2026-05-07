"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import type { EventData } from "@/lib/events";
import { getEventLiveStatus } from "@/lib/events";
import { TierBadge } from "./TierBadge";
import { Calendar, CheckCircle2, ChevronUp, ChevronDown, DollarSign, MapPin } from "lucide-react";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  // 이벤트를 날짜순 정렬 (이미 정렬됨)
  const sorted = useMemo(() => [...events].sort((a, b) => a.date.localeCompare(b.date)), [events]);

  // 현재 날짜 (2026-05-04 기준)
  const today = "2026-05-04";

  // "가장 가까운 다음 이벤트" 인덱스 찾기
  const nextEventIndex = useMemo(() => {
    const idx = sorted.findIndex((e) => e.date >= today && e.status !== "cancelled");
    return idx >= 0 ? idx : 0;
  }, [sorted, today]);

  const [focusedIndex, setFocusedIndex] = useState(nextEventIndex);

  // 초기 스크롤: 다음 이벤트가 리스트 최상단에 오도록
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToIndex(nextEventIndex, "auto");
    }, 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function scrollToIndex(idx: number, behavior: ScrollBehavior = "smooth") {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll("[data-event-idx]");
    const card = cards[idx] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior, block: "start" });
    }
  }

  function handleScrollUp() {
    const next = Math.max(0, focusedIndex - 1);
    setFocusedIndex(next);
    scrollToIndex(next);
  }

  function handleScrollDown() {
    const next = Math.min(sorted.length - 1, focusedIndex + 1);
    setFocusedIndex(next);
    scrollToIndex(next);
  }

  // 스크롤 시 현재 최상단에 가까운 이벤트 인덱스 트래킹
  function handleScroll() {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll("[data-event-idx]");
    const containerRect = container.getBoundingClientRect();
    const topY = containerRect.top;

    let closestIdx = focusedIndex;
    let closestDist = Infinity;

    cards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const dist = Math.abs(rect.top - topY);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = idx;
      }
    });

    if (closestIdx !== focusedIndex) {
      setFocusedIndex(closestIdx);
    }
  }

  // 위에 숨겨진 과거 이벤트 수
  const hiddenPastCount = focusedIndex;
  // 아래에 숨겨진 미래 이벤트 수
  const hiddenFutureCount = sorted.length - focusedIndex - 1;

  return (
    <aside className="flex w-[280px] shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="px-4 pt-5 pb-2">
        <h2 className="text-[19px] font-black tracking-[-0.01em] text-slate-950">이벤트 타임라인</h2>
        <p className="mt-1 text-[10px] font-medium text-slate-400">맨 위 = 다음 이벤트 · 위로 과거, 아래로 미래</p>
      </div>

      {/* 위쪽 화살표 + 숨겨진 수 */}
      <button
        onClick={handleScrollUp}
        disabled={focusedIndex <= 0}
        className="flex flex-col items-center gap-0.5 py-2 text-slate-400 transition hover:text-blue-600 disabled:opacity-30 disabled:cursor-default"
      >
        <ChevronUp size={20} strokeWidth={2.5} />
        {hiddenPastCount > 0 && (
          <span className="text-[10px] font-bold text-slate-400">
            지난 이벤트 {hiddenPastCount}개 ↑
          </span>
        )}
      </button>

      {/* 스크롤 영역 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 space-y-2 overflow-y-auto px-3 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {sorted.map((event, idx) => {
          const isSelected = event.id === selectedId;
          const isCancelled = event.status === "cancelled";
          const isCompleted = event.status === "completed";
          const isNextEvent = idx === nextEventIndex;
          const isPast = event.date < today || isCompleted;
          const distance = Math.abs(idx - focusedIndex);

          // 거리에 따른 연하게 표시 — 과거는 점진적, 미래는 마지막 항목만 힌트
          let opacity = "opacity-100";
          if (idx < focusedIndex) {
            // 과거 방향: 점진적 페이드
            if (distance >= 4) opacity = "opacity-30";
            else if (distance >= 3) opacity = "opacity-50";
            else if (distance >= 2) opacity = "opacity-70";
            else if (distance >= 1) opacity = "opacity-85";
          } else if (idx > focusedIndex) {
            // 미래 방향: 리스트 마지막 항목만 살짝 흐리게 ("더 아래 있어요" 힌트)
            if (idx === sorted.length - 1) opacity = "opacity-55";
          }

          return (
            <div
              key={event.id}
              data-event-idx={idx}
              className={`${opacity} transition-opacity duration-200`}
            >
              {/* 날짜 구분선 */}
              {(idx === 0 || event.date.slice(0, 7) !== sorted[idx - 1].date.slice(0, 7)) && (
                <div className="mb-1 flex items-center gap-2 pt-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">
                    {event.date.slice(0, 7).replace("-", "년 ")}월
                  </span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
              )}

              <button
                onClick={() => {
                  onSelect(event.id);
                  setFocusedIndex(idx);
                }}
                className={`relative flex w-full gap-2.5 rounded-xl border bg-white p-2.5 text-left transition-all ${
                  isSelected
                    ? "border-blue-500 shadow-[0_0_0_1px_rgba(37,99,235,0.45)]"
                    : "border-slate-200 hover:border-blue-200 hover:shadow-sm"
                } ${isCancelled ? "opacity-60" : ""} ${isNextEvent && !isPast ? "ring-1 ring-blue-200" : ""}`}
              >
                <div className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-lg">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.city}
                      className={`h-full w-full object-cover ${isCancelled ? "grayscale" : ""} ${isCompleted ? "grayscale opacity-70" : ""}`}
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${event.gradient}`} />
                  )}
                  <div className="absolute left-1 top-1 flex items-center gap-0.5">
                    <TierBadge tier={event.tier} />
                    {event.isDomestic && (
                      <span className="inline-flex items-center rounded-md bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                        국내
                      </span>
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className={`line-clamp-2 text-[12px] font-bold leading-snug ${isCompleted ? "text-slate-500" : "text-slate-950"}`}>
                      {event.name}
                    </h3>
                    {isSelected && <CheckCircle2 size={15} className="shrink-0 fill-blue-600 text-white" />}
                  </div>
                  <div className="mt-1.5 space-y-0.5">
                    <p className="flex items-center gap-1 truncate text-[9px] font-medium text-slate-400">
                      <MapPin size={10} className="shrink-0" />
                      {event.city}, {event.country}
                    </p>
                    <p className="flex items-center gap-1 truncate text-[9px] font-medium text-slate-400">
                      <Calendar size={10} className="shrink-0" />
                      {formatDate(event)} ({event.days}일)
                    </p>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-[9px] font-semibold text-slate-400">
                      <DollarSign size={9} />
                      <span className="text-[13px] font-black text-slate-800">${event.cost.total.toLocaleString()}</span>
                    </div>
                    {event.status === "completed" && (
                      <span className="rounded-full bg-slate-200 px-1.5 py-0.5 text-[8px] font-bold text-slate-500">
                        종료
                      </span>
                    )}
                  </div>
                </div>

                {getEventLiveStatus(event) && (
                  <span className="absolute right-2 top-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white animate-pulse">
                    🔴 LIVE
                  </span>
                )}
                {event.status === "cancelled" && (
                  <span className="absolute right-2 top-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                    취소
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* 아래쪽 화살표 + 숨겨진 수 */}
      <button
        onClick={handleScrollDown}
        disabled={focusedIndex >= sorted.length - 1}
        className="flex flex-col items-center gap-0.5 py-2 text-slate-400 transition hover:text-blue-600 disabled:opacity-30 disabled:cursor-default"
      >
        {hiddenFutureCount > 0 && (
          <span className="text-[10px] font-bold text-slate-400">
            다가오는 이벤트 {hiddenFutureCount}개 ↓
          </span>
        )}
        <ChevronDown size={20} strokeWidth={2.5} />
      </button>
    </aside>
  );
}
