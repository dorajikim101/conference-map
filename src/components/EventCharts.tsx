"use client";

import { useRef, useState } from "react";
import type { EventData } from "@/lib/events";
import { Building2, CalendarDays, Handshake, Users } from "lucide-react";

const BUDGET_COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#F472B6", "#94A3B8"];

export function SideEventChart({ data }: { data: EventData["sideEventTrend"] }) {
  const latestValue = data[data.length - 1]?.value ?? 0;
  const prevValue = data.length >= 2 ? data[data.length - 2].value : latestValue;
  const growthRate = prevValue > 0 ? (((latestValue - prevValue) / prevValue) * 100).toFixed(0) : "0";
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="h-[190px] rounded-lg border border-slate-200 bg-white p-3">
      <h4 className="mb-2 text-[13px] font-black text-blue-700">사이드 이벤트 성장 추이</h4>
      <div className="flex h-[108px] items-end gap-3 border-b border-slate-100 px-2">
        {data.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center justify-end gap-1">
            <span className="text-[10px] font-bold text-slate-700">{item.value}</span>
            <div
              className="w-full max-w-[28px] rounded-t-md bg-blue-500"
              style={{ height: `${Math.max((item.value / max) * 74, 12)}px` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-around text-[10px] font-semibold text-slate-500">
        {data.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
      <div className="mt-1 flex items-end gap-2">
        <span className="text-[20px] font-black text-emerald-600">▲ {growthRate}%</span>
        <span className="pb-1 text-[11px] font-semibold text-slate-500">전년 대비 예상 성장률</span>
      </div>
    </div>
  );
}

export function BudgetPieChart({ data, total }: { data: EventData["budget"]; total: number }) {
  const sum = data.reduce((acc, item) => acc + item.value, 0);
  let cursor = 0;
  const segments = data.map((item, index) => {
    const start = cursor;
    const end = cursor + (item.value / sum) * 100;
    cursor = end;
    const color = BUDGET_COLORS[index % BUDGET_COLORS.length];
    const percent = sum > 0 ? Math.round((item.value / sum) * 100) : 0;
    return { label: item.label, value: item.value, percent, color, start, end };
  });
  const stops = segments.map((s) => `${s.color} ${s.start}% ${s.end}%`).join(", ");

  // Tooltip state
  const [hovered, setHovered] = useState<number | null>(null);
  const pieRef = useRef<HTMLDivElement>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handlePieMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pieRef.current) return;
    const rect = pieRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = e.clientX - rect.left - cx;
    const dy = e.clientY - rect.top - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const outerR = cx;
    const innerR = 31;
    if (dist < innerR || dist > outerR) {
      setHovered(null);
      return;
    }
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    const hoveredIdx = segments.findIndex((s) => angle >= s.start && angle < s.end);
    setHovered(hoveredIdx >= 0 ? hoveredIdx : null);
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="h-[190px] rounded-lg border border-slate-200 bg-white p-3">
      <h4 className="mb-2 text-[13px] font-black text-blue-700">예산 비중 (USD)</h4>
      <div className="flex h-[138px] items-center gap-3">
        <div className="relative">
          <div
            ref={pieRef}
            className="relative h-[112px] w-[112px] shrink-0 rounded-full"
            style={{ background: `conic-gradient(${stops})`, cursor: "pointer" }}
            onMouseMove={handlePieMove}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="absolute inset-[31px] flex flex-col items-center justify-center rounded-full bg-white">
              <span className="text-[12px] font-black text-slate-900">${total.toLocaleString()}</span>
              <span className="text-[9px] font-semibold text-slate-400">총 비용</span>
            </div>
          </div>
          {hovered !== null && (
            <div
              className="pointer-events-none absolute z-10 rounded-lg border border-slate-200 bg-slate-900 px-2.5 py-1.5 text-white shadow-lg"
              style={{
                left: Math.min(tooltipPos.x, 80),
                bottom: 120,
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
              }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: segments[hovered].color }}
                />
                <span className="text-[11px] font-bold">{segments[hovered].label}</span>
              </div>
              <div className="mt-0.5 text-[12px] font-black">
                ${segments[hovered].value.toLocaleString()} ({segments[hovered].percent}%)
              </div>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          {data.map((item, index) => {
            const percent = sum > 0 ? Math.round((item.value / sum) * 100) : 0;
            return (
              <div
                key={item.label}
                className={`grid grid-cols-[8px_1fr_auto] items-center gap-1.5 rounded px-1 py-0.5 text-[10px] transition-colors ${hovered === index ? "bg-blue-50" : ""}`}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BUDGET_COLORS[index % BUDGET_COLORS.length] }} />
                <span className="truncate font-semibold text-slate-600">{item.label}</span>
                <span className="font-bold text-slate-700">{percent}% (${item.value.toLocaleString()})</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function KpiGrid({ data, event }: { data: EventData["kpis"]; event: EventData }) {
  const kpis = [
    { icon: Users, label: "예상 참석자", value: event.archive.attendees, detail: data[1]?.detail ?? "YoY" },
    { icon: CalendarDays, label: "사이드 이벤트", value: `${event.sideEvents.count}건`, detail: "+11% YoY" },
    { icon: Building2, label: "스폰서", value: `${event.archive.sponsors}+`, detail: data[0]?.value ?? "높음" },
    { icon: Handshake, label: "미팅 수", value: `${event.companies.length * 7}+`, detail: "타겟 기업" },
  ];

  return (
    <div className="h-[190px] rounded-lg border border-slate-200 bg-white p-3">
      <h4 className="mb-2 text-[13px] font-black text-blue-700">핵심 KPI 요약</h4>
      <div className="grid h-[138px] grid-cols-2 gap-2">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="rounded-lg border border-slate-200 bg-white p-2">
              <div className="mb-1 flex items-center gap-1.5">
                <Icon size={14} className="text-blue-500" />
                <span className="text-[10px] font-semibold text-slate-500">{kpi.label}</span>
              </div>
              <div className="text-[15px] font-black leading-tight text-slate-950">{kpi.value}</div>
              <div className="mt-1 text-[10px] font-bold text-emerald-600">▲ {kpi.detail}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
