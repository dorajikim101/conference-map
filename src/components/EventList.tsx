"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import type { EventData } from "@/lib/events";
import { getEventLiveStatus } from "@/lib/events";
import { Calendar, CheckCircle2, ChevronUp, ChevronDown, MapPin } from "lucide-react";

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

function getCityGroupColor(city: string): string {
  const colors: Record<string, string> = {
    "Seoul": "border-l-rose-400", "Istanbul": "border-l-teal-400",
    "Toronto": "border-l-indigo-400", "Rotkreuz": "border-l-red-400",
    "Milan": "border-l-green-400", "Berlin": "border-l-gray-400",
    "Rio de Janeiro": "border-l-lime-400", "Bali": "border-l-cyan-400",
    "Rome": "border-l-amber-400", "Ho Chi Minh City": "border-l-orange-400",
    "Kyoto": "border-l-pink-400", "Paris": "border-l-violet-400",
    "Amsterdam": "border-l-orange-400", "Denver": "border-l-emerald-400",
    "New York": "border-l-blue-400", "Shanghai": "border-l-red-400",
  };
  return colors[city] || "border-l-slate-300";
}



/* ─── S 카드 (기존 크기 유지) ─── */
function SCard({
  event, isSelected, isCancelled, isCompleted, isNextEvent, isPast, opacity, onSelect,
}: {
  event: EventData; isSelected: boolean; isCancelled: boolean; isCompleted: boolean;
  isNextEvent: boolean; isPast: boolean; opacity: string; onSelect: () => void;
}) {
  return (
    <div className={`${opacity} transition-opacity duration-200`}>
      <button
        onClick={onSelect}
        className={`relative flex w-full gap-2 rounded-xl border bg-white p-2 text-left transition-all ${
          isSelected
            ? "border-blue-500 shadow-[0_0_0_1px_rgba(37,99,235,0.45)]"
            : "border-slate-200 hover:border-blue-200 hover:shadow-sm"
        } ${isCancelled ? "opacity-60" : ""} ${isNextEvent && !isPast ? "ring-1 ring-blue-200" : ""}`}
      >
        <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-lg">
          {event.imageUrl ? (
            <img src={event.imageUrl} alt={event.city}
              className={`h-full w-full object-cover ${isCancelled ? "grayscale" : ""} ${isCompleted ? "grayscale opacity-70" : ""}`}
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${event.gradient}`} />
          )}
          {event.isDomestic && (
            <span className="absolute -left-0.5 -top-0.5 inline-flex items-center rounded bg-rose-500 px-0.5 py-px text-[5px] font-bold text-white leading-none drop-shadow-sm">국내</span>
          )}
        </div>

        <div className="min-w-0 flex-1 pt-0">
          <div className="flex items-start justify-between gap-0.5">
            <h3 className={`line-clamp-2 text-[10px] font-bold leading-tight ${isCompleted ? "text-slate-500" : "text-slate-950"}`}>
              {event.name}
            </h3>
            {isSelected && <CheckCircle2 size={12} className="shrink-0 fill-blue-600 text-white" />}
          </div>
          <div className="mt-0.5 space-y-px">
            <p className="flex items-center gap-0.5 truncate text-[8px] font-medium text-slate-400">
              <MapPin size={8} className="shrink-0" />{event.city}, {event.country}
            </p>
            <p className="flex items-center gap-0.5 truncate text-[8px] font-medium text-slate-400">
              <Calendar size={8} className="shrink-0" />{formatDate(event)} ({event.days}일)
            </p>
          </div>
          <div className="mt-0.5 flex items-center gap-1">
            <span className="text-[10px] font-black text-slate-800">${event.cost.total.toLocaleString()}</span>
            {event.status === "completed" && (
              <span className="rounded-full bg-slate-200 px-1 py-px text-[7px] font-bold text-slate-500">종료</span>
            )}
          </div>
        </div>

        {getEventLiveStatus(event) && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-emerald-500 px-1 py-px text-[7px] font-bold text-white animate-pulse">🔴 LIVE</span>
        )}
        {event.status === "cancelled" && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-red-500 px-1 py-px text-[7px] font-bold text-white">취소</span>
        )}
      </button>
    </div>
  );
}

/* ─── A 카드 (2/3 크기) ─── */
function ACard({
  event, isSelected, isCancelled, isCompleted, isPast, opacity, onSelect,
}: {
  event: EventData; isSelected: boolean; isCancelled: boolean; isCompleted: boolean;
  isPast: boolean; opacity: string; onSelect: () => void;
}) {
  return (
    <div className={`${opacity} transition-opacity duration-200`}>
      <button
        onClick={onSelect}
        className={`relative flex w-full gap-1.5 rounded-lg border bg-white p-1.5 text-left transition-all ${
          isSelected
            ? "border-blue-500 shadow-[0_0_0_1px_rgba(37,99,235,0.45)]"
            : "border-slate-200 hover:border-blue-200 hover:shadow-sm"
        } ${isCancelled ? "opacity-60" : ""}`}
      >
        <div className="relative h-[44px] w-[44px] shrink-0 overflow-hidden rounded">
          {event.imageUrl ? (
            <img src={event.imageUrl} alt={event.city}
              className={`h-full w-full object-cover ${isCancelled ? "grayscale" : ""} ${isCompleted ? "grayscale opacity-70" : ""}`}
            />
          ) : (
            <div className={`h-full w-full bg-gradient-to-br ${event.gradient}`} />
          )}
          {event.isDomestic && (
            <span className="absolute -left-0.5 -top-0.5 inline-flex items-center rounded bg-rose-500 px-0.5 py-px text-[5px] font-bold text-white leading-none drop-shadow-sm">국내</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-0.5">
            <h3 className={`line-clamp-1 text-[9px] font-bold leading-tight ${isCompleted ? "text-slate-500" : "text-slate-950"}`}>
              {event.name}
            </h3>
            {isSelected && <CheckCircle2 size={10} className="shrink-0 fill-blue-600 text-white" />}
          </div>
          <div className="mt-px space-y-px">
            <p className="flex items-center gap-0.5 truncate text-[7px] font-medium text-slate-400">
              <MapPin size={7} className="shrink-0" />{event.city}, {event.country}
            </p>
            <p className="flex items-center gap-0.5 truncate text-[7px] font-medium text-slate-400">
              <Calendar size={7} className="shrink-0" />{formatDate(event)} ({event.days}일)
            </p>
          </div>
          <div className="mt-px flex items-center gap-1">
            <span className="text-[9px] font-black text-slate-800">${event.cost.total.toLocaleString()}</span>
            {event.status === "completed" && (
              <span className="rounded-full bg-slate-200 px-0.5 py-px text-[6px] font-bold text-slate-500">종료</span>
            )}
          </div>
        </div>

        {getEventLiveStatus(event) && (
          <span className="absolute right-1 top-1 rounded-full bg-emerald-500 px-0.5 py-px text-[6px] font-bold text-white animate-pulse">🔴 LIVE</span>
        )}
        {event.status === "cancelled" && (
          <span className="absolute right-1 top-1 rounded-full bg-red-500 px-0.5 py-px text-[6px] font-bold text-white">취소</span>
        )}
      </button>
    </div>
  );
}

/* ─── B 카드 (1/3 크기) ─── */
function BCard({
  event, isSelected, isCancelled, isCompleted, isPast, onSelect,
}: {
  event: EventData; isSelected: boolean; isCancelled: boolean; isCompleted: boolean;
  isPast: boolean; onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative flex w-full gap-1 rounded border bg-white p-1 text-left transition-all ${
        isSelected
          ? "border-blue-500 shadow-[0_0_0_1px_rgba(37,99,235,0.45)]"
          : "border-slate-200 hover:border-blue-200 hover:shadow-sm"
      } ${isCancelled ? "opacity-60" : ""} ${isPast ? "opacity-70" : ""} border-l-3 ${getCityGroupColor(event.city)}`}
    >
      <div className="relative h-[28px] w-[28px] shrink-0 overflow-hidden rounded">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.city}
            className={`h-full w-full object-cover ${isCancelled ? "grayscale" : ""} ${isCompleted ? "grayscale opacity-70" : ""}`}
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${event.gradient}`} />
        )}

      </div>

      <div className="min-w-0 flex-1">
        <h3 className={`line-clamp-1 text-[7px] font-bold leading-tight ${isCompleted ? "text-slate-500" : "text-slate-950"}`}>
          {event.name}
        </h3>
        <p className="flex items-center gap-0.5 truncate text-[6px] font-medium text-slate-400 mt-px">
          <MapPin size={5} className="shrink-0" />{event.city} · {formatDate(event)}
        </p>
        <div className="mt-px flex items-center gap-1">
          <span className="text-[7px] font-black text-slate-700">${event.cost.total.toLocaleString()}</span>
        </div>
      </div>

      {getEventLiveStatus(event) && (
        <span className="absolute right-0.5 top-0.5 rounded-full bg-emerald-500 px-0.5 py-px text-[5px] font-bold text-white animate-pulse">🔴</span>
      )}
      {event.status === "cancelled" && (
        <span className="absolute right-0.5 top-0.5 rounded-full bg-red-500 px-0.5 py-px text-[5px] font-bold text-white">취소</span>
      )}
    </button>
  );
}

/* ─── 미니 카드 (뷰포트 밖 A/B용) ─── */
function MiniCard({ event, onSelect }: { event: EventData; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="flex items-center gap-1 rounded border border-slate-100 bg-white/80 px-1 py-0.5 text-left transition-all hover:bg-white hover:border-slate-300 w-full"
    >
      <div className="h-[14px] w-[14px] shrink-0 overflow-hidden rounded-sm">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${event.gradient}`} />
        )}
      </div>
      <span className="truncate text-[6px] font-medium text-slate-500">{event.name}</span>
    </button>
  );
}

/* ─── 메인 EventList ─── */
export function EventList({ events, selectedId, onSelect }: EventListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const sEvents = useMemo(
    () => events.filter(e => e.tier === "S").sort((a, b) => a.date.localeCompare(b.date)),
    [events]
  );
  const aEvents = useMemo(
    () => events.filter(e => e.tier === "A").sort((a, b) => a.date.localeCompare(b.date)),
    [events]
  );
  const bEvents = useMemo(
    () => events.filter(e => e.tier === "B").sort((a, b) => a.date.localeCompare(b.date)),
    [events]
  );
  const abEvents = useMemo(
    () => [...aEvents, ...bEvents].sort((a, b) => a.date.localeCompare(b.date)),
    [aEvents, bEvents]
  );

  const allEvents = useMemo(() => [...sEvents, ...abEvents], [sEvents, abEvents]);
  const globalStart = useMemo(() => {
    const dates = allEvents.map(e => e.date).filter(Boolean);
    return dates.length > 0 ? dates.reduce((a, b) => a < b ? a : b) : "2026-01-01";
  }, [allEvents]);

  const sCardHeight = 90;
  const aCardHeight = 68;
  const bCardHeight = 44;
  const miniCardHeight = 22;
  const gap = 4;
  const startDate = new Date(globalStart + "T00:00:00Z");

  function dateToDay(dateStr: string): number {
    const d = new Date(dateStr + "T00:00:00Z");
    return (d.getTime() - startDate.getTime()) / 86400000;
  }

  // ═══════════════════════════════════════════════════
  // 핵심: 공통 선형 날짜축
  // - 다른 라인(S vs A/B)의 행사는 날짜 차이만큼만 Y가 달라짐
  //   예: 2일 차이 = 16px 차이 → 한 번에 갈 수 있는 일정인지 보임
  // - 같은 라인 안에서만 카드 겹침 방지를 적용
  // ═══════════════════════════════════════════════════
  const pixelsPerDay = 8;

  function dateToLinearY(dateStr: string): number {
    return dateToDay(dateStr) * pixelsPerDay;
  }

  function layoutColumn(
    evts: EventData[],
    getHeight: (event: EventData) => number,
    minGap = gap,
  ): { y: number; event: EventData; cardH: number }[] {
    const result: { y: number; event: EventData; cardH: number }[] = [];
    let lastBottom = -Infinity;

    for (const evt of evts) {
      const cardH = getHeight(evt);
      const baseY = dateToLinearY(evt.date);
      const y = Math.max(baseY, lastBottom + minGap);
      lastBottom = y + cardH;
      result.push({ y, event: evt, cardH });
    }
    return result;
  }

  // S열: 공통 선형 날짜축 + S열 내부 겹침 방지
  const sPositions = useMemo(
    () => layoutColumn(sEvents, () => sCardHeight),
    [sEvents, globalStart],
  );

  // 왼쪽 S 라인이 실제로 펼쳐진 날짜 스케일을 기준으로
  // 오른쪽 A/B와 월마커/TODAY도 같은 기간대에 맞춘다.
  function dateToTimelineY(dateStr: string): number {
    const day = dateToDay(dateStr);
    const points = sPositions.map((p) => ({ day: dateToDay(p.event.date), y: p.y }));

    if (points.length === 0) return dateToLinearY(dateStr);
    if (day <= points[0].day) {
      return points[0].y - (points[0].day - day) * pixelsPerDay;
    }

    const last = points[points.length - 1];
    if (day >= last.day) {
      return last.y + (day - last.day) * pixelsPerDay;
    }

    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (day >= a.day && day <= b.day) {
        const span = b.day - a.day || 1;
        const t = (day - a.day) / span;
        return a.y + t * (b.y - a.y);
      }
    }

    return dateToLinearY(dateStr);
  }

  // 뷰포트 안에 있는 A/B 카드 추적
  const [visibleABIds, setVisibleABIds] = useState<Set<string>>(new Set());
  const abRefMap = useRef<Map<string, HTMLDivElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        setVisibleABIds(prev => {
          const next = new Set(prev);
          for (const entry of entries) {
            const id = entry.target.getAttribute("data-ab-id");
            if (id) {
              if (entry.isIntersecting) next.add(id);
              else next.delete(id);
            }
          }
          return next;
        });
      },
      {
        root: scrollRef.current,
        rootMargin: "150px 0px 150px 0px",
        threshold: 0,
      }
    );

    for (const [, el] of abRefMap.current) {
      observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [abEvents]);

  const abRefCallback = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      abRefMap.current.set(id, el);
      observerRef.current?.observe(el);
    } else {
      const old = abRefMap.current.get(id);
      if (old) observerRef.current?.unobserve(old);
      abRefMap.current.delete(id);
    }
  }, []);

  // A/B 포지션: 절대 날짜 위치 기반 + 열 내부 겹침 방지
  const abFinalPositions = useMemo(() => {
    // visible 구간 확장 (±1 인접 카드)
    const expandedSet = new Set<string>();
    abEvents.forEach((evt, idx) => {
      if (visibleABIds.has(evt.id)) {
        expandedSet.add(evt.id);
        if (idx > 0) expandedSet.add(abEvents[idx - 1].id);
        if (idx < abEvents.length - 1) expandedSet.add(abEvents[idx + 1].id);
      }
    });

    const result: { y: number; event: EventData; expanded: boolean; cardH: number }[] = [];
    let lastBottom = -Infinity;

    for (const evt of abEvents) {
      const isExpanded = expandedSet.has(evt.id);
      const baseY = dateToTimelineY(evt.date); // S 라인 기준 공통 날짜 위치
      const fullCardH = evt.tier === "B" ? bCardHeight : aCardHeight;
      const cardH = isExpanded ? fullCardH : miniCardHeight;

      const y = Math.max(baseY, lastBottom + (isExpanded ? gap : 2));
      lastBottom = y + cardH;

      result.push({ y, event: evt, expanded: isExpanded, cardH });
    }

    return result;
  }, [abEvents, visibleABIds, globalStart]);

  // 전체 높이
  const totalHeight = useMemo(() => {
    const sMax = sPositions.length > 0 ? sPositions[sPositions.length - 1].y + sCardHeight + 100 : 0;
    const abMax = abFinalPositions.length > 0
      ? abFinalPositions[abFinalPositions.length - 1].y + abFinalPositions[abFinalPositions.length - 1].cardH + 100
      : 0;
    // 마지막 이벤트 이후 여유
    const lastS = sPositions[sPositions.length - 1];
    const lastAB = abFinalPositions[abFinalPositions.length - 1];
    const tailMax = Math.max(
      lastS ? lastS.y + sCardHeight + 300 : 0,
      lastAB ? lastAB.y + lastAB.cardH + 300 : 0,
    );
    return Math.max(sMax, abMax, tailMax);
  }, [sPositions, abFinalPositions]);

  // 월 마커 (S열 Y스케일 기준)
  const monthMarkers = useMemo(() => {
    const markers: { month: string; y: number }[] = [];
    const globalEnd = allEvents.reduce((max, e) => {
      const d = e.endDate || e.date;
      return d > max ? d : max;
    }, "2026-01-01");
    const start = new Date(globalStart + "T00:00:00Z");
    const end = new Date(globalEnd + "T23:59:59Z");
    let current = new Date(start.getFullYear(), start.getMonth(), 1);
    while (current <= end) {
      markers.push({ month: current.toISOString().slice(0, 7), y: dateToTimelineY(current.toISOString().slice(0, 10)) });
      current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    }
    return markers;
  }, [globalStart, allEvents]);

  const today = new Date().toISOString().slice(0, 10); // 실제 오늘 날짜
  const todayY = dateToTimelineY(today);
  const nextEventIndex = useMemo(() => {
    const idx = sPositions.findIndex(p => p.event.date >= today && p.event.status !== "cancelled");
    return idx >= 0 ? idx : 0;
  }, [sPositions, today]);

  const [focusedIndex, setFocusedIndex] = useState(nextEventIndex);
  const lastScrolledSelectedId = useRef<string | null>(null);

  // 이벤트 선택 시에만 해당 이벤트 위치로 스크롤
  useEffect(() => {
    if (!scrollRef.current || !selectedId) return;
    if (lastScrolledSelectedId.current === selectedId) return;
    lastScrolledSelectedId.current = selectedId;
    // S열에서 찾기
    const sIdx = sPositions.findIndex(p => p.event.id === selectedId);
    if (sIdx >= 0) {
      const pos = sPositions[sIdx];
      scrollRef.current.scrollTo({ top: Math.max(0, pos.y - 30), behavior: "smooth" });
      setFocusedIndex(sIdx);
      return;
    }
    // A/B열에서 찾기
    const abIdx = abFinalPositions.findIndex(p => p.event.id === selectedId);
    if (abIdx >= 0) {
      const pos = abFinalPositions[abIdx];
      scrollRef.current.scrollTo({ top: Math.max(0, pos.y - 30), behavior: "smooth" });
    }
  }, [selectedId, sPositions, abFinalPositions]);

  useEffect(() => {
    if (sPositions.length === 0) return;
    const pos = sPositions[nextEventIndex];
    if (!pos) return;
    const timer = setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = Math.max(0, pos.y - 60);
    }, 100);
    return () => clearTimeout(timer);
  }, [nextEventIndex, sPositions]);

  function handleScroll() {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const containerTop = container.getBoundingClientRect().top + 60;
    let closest = focusedIndex;
    let closestDist = Infinity;
    const cards = container.querySelectorAll("[data-s-idx]");
    cards.forEach((card, idx) => {
      const dist = Math.abs(card.getBoundingClientRect().top - containerTop);
      if (dist < closestDist) { closestDist = dist; closest = idx; }
    });
    if (closest !== focusedIndex) setFocusedIndex(closest);
  }

  function scrollToSIndex(idx: number) {
    const pos = sPositions[idx];
    if (!pos || !scrollRef.current) return;
    scrollRef.current.scrollTo({ top: Math.max(0, pos.y - 60), behavior: "smooth" });
  }
  function handleScrollUp() { const n = Math.max(0, focusedIndex - 1); setFocusedIndex(n); scrollToSIndex(n); }
  function handleScrollDown() { const n = Math.min(sPositions.length - 1, focusedIndex + 1); setFocusedIndex(n); scrollToSIndex(n); }

  const hiddenPastCount = focusedIndex;
  const hiddenFutureCount = sPositions.length - focusedIndex - 1;

  return (
    <aside className="flex w-[540px] shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* 헤더 */}
      <div className="flex items-end justify-between px-4 pt-3 pb-2">
        <div>
          <h2 className="text-[15px] font-black tracking-[-0.01em] text-slate-950">이벤트 타임라인</h2>
          <p className="mt-0.5 text-[9px] font-medium text-slate-400">{sEvents.length} S · {aEvents.length} A · {bEvents.length} B</p>
        </div>
        <div className="flex gap-0.5">
          <button onClick={handleScrollUp} disabled={focusedIndex <= 0}
            className="flex flex-col items-center rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 disabled:opacity-30 disabled:cursor-default">
            <ChevronUp size={14} strokeWidth={2.5} />
            {hiddenPastCount > 0 && <span className="text-[7px] font-bold">{hiddenPastCount}</span>}
          </button>
          <button onClick={handleScrollDown} disabled={focusedIndex >= sPositions.length - 1}
            className="flex flex-col items-center rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 disabled:opacity-30 disabled:cursor-default">
            {hiddenFutureCount > 0 && <span className="text-[7px] font-bold">{hiddenFutureCount}</span>}
            <ChevronDown size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 열 헤더 */}
      <div className="flex border-b border-slate-100">
        <div className="px-2 py-1 border-r border-slate-100 bg-slate-50/50" style={{ width: "50%" }}>
          <span className="inline-flex h-4 items-center rounded bg-gradient-to-r from-amber-200 to-amber-100 px-1.5 text-[9px] font-bold text-amber-800">S</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-slate-50/50" style={{ width: "50%" }}>
          <span className="inline-flex h-4 items-center rounded bg-gradient-to-r from-sky-200 to-sky-100 px-1.5 text-[9px] font-bold text-sky-800">A</span>
          <span className="text-[7px] text-slate-400">/</span>
          <span className="inline-flex h-4 items-center rounded bg-slate-100 px-1.5 text-[9px] font-bold text-slate-500">B</span>
        </div>
      </div>

      {/* 스크롤 컨테이너 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex" style={{ height: totalHeight }}>
          {/* ─── S 열 (왼쪽 50%) ─── */}
          <div className="relative border-r border-slate-100" style={{ width: "50%" }}>
            {monthMarkers.map(m => (
              <div key={"s-"+m.month} className="absolute left-0 right-0 flex items-center gap-1" style={{ top: m.y }}>
                <span className="text-[8px] font-bold text-slate-300 uppercase pl-2">{m.month.replace("-", "년 ")}월</span>
                <div className="h-px flex-1 bg-slate-100 mr-2" />
              </div>
            ))}
          {/* 오늘 날짜 빨간 줄 */}
          <div className="absolute left-0 right-0 z-10" style={{ top: todayY }}>
            <div className="flex items-center gap-1">
              <span className="shrink-0 rounded bg-red-500 px-1 py-px text-[6px] font-bold text-white">TODAY</span>
              <div className="h-px flex-1 bg-red-400" />
            </div>
          </div>
          {sPositions.map((pos, idx) => {
              const event = pos.event;
              const isSelected = event.id === selectedId;
              const isCancelled = event.status === "cancelled";
              const isCompleted = event.status === "completed";
              const isNextEvent = idx === nextEventIndex;
              const isPast = event.date < today || isCompleted;
              const distance = Math.abs(idx - focusedIndex);

              let opacity = "opacity-100";
              if (idx < focusedIndex) {
                if (distance >= 4) opacity = "opacity-30";
                else if (distance >= 3) opacity = "opacity-50";
                else if (distance >= 2) opacity = "opacity-70";
                else if (distance >= 1) opacity = "opacity-85";
              } else if (idx > focusedIndex) {
                if (idx === sPositions.length - 1) opacity = "opacity-55";
              }

              return (
                <div key={event.id} data-s-idx={idx}
                  className="absolute left-2 right-2" style={{ top: pos.y }}>
                  <SCard
                    event={event} isSelected={isSelected} isCancelled={isCancelled}
                    isCompleted={isCompleted} isNextEvent={isNextEvent} isPast={isPast}
                    opacity={opacity} onSelect={() => onSelect(event.id)}
                  />
                </div>
              );
            })}
          </div>

          {/* ─── A/B 열 (오른쪽 50%) — 볼록렌즈 ─── */}
          <div className="relative" style={{ width: "50%" }}>
            {monthMarkers.map(m => (
              <div key={"ab-"+m.month} className="absolute left-0 right-0 h-px bg-slate-100" style={{ top: m.y }} />
            ))}
          {/* 오늘 날짜 빨간 줄 */}
          <div className="absolute left-0 right-0 h-px bg-red-400 z-10" style={{ top: todayY }} />
          {abFinalPositions.map((pos) => {
              const event = pos.event;
              const isSelected = event.id === selectedId;
              const isCancelled = event.status === "cancelled";
              const isCompleted = event.status === "completed";
              const isPast = event.date < today || isCompleted;

              return (
                <div
                  key={event.id}
                  ref={(el) => abRefCallback(event.id, el)}
                  data-ab-id={event.id}
                  className="absolute left-1.5 right-1.5 transition-all duration-300 ease-out"
                  style={{ top: pos.y }}
                >
                  {pos.expanded ? (
                    event.tier === "B" ? (
                      <BCard
                        event={event} isSelected={isSelected} isCancelled={isCancelled}
                        isCompleted={isCompleted} isPast={isPast}
                        onSelect={() => onSelect(event.id)}
                      />
                    ) : (
                      <ACard
                        event={event} isSelected={isSelected} isCancelled={isCancelled}
                        isCompleted={isCompleted} isPast={isPast}
                        opacity={isCancelled ? "opacity-60" : isCompleted ? "opacity-70" : "opacity-100"}
                        onSelect={() => onSelect(event.id)}
                      />
                    )
                  ) : (
                    <MiniCard event={event} onSelect={() => onSelect(event.id)} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
