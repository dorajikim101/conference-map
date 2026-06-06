"use client";

import { useRef, useState } from "react";
import type { EventData } from "@/lib/events";
import { Building2, CalendarDays, Handshake, Users } from "lucide-react";

const CITY_AIRPORT: Record<string, string> = {
  "Las Vegas": "LAS",
  "Dubai": "DXB",
  "Miami": "MIA",
  "Abu Dhabi": "AUH",
  "Rotkreuz": "ZRH",
  "Istanbul": "IST",
  "Toronto": "YYZ",
  "Hong Kong": "HKG",
  "Bangkok": "BKK",
  "Tokyo": "HND",
  "Milan": "MXP",
  "Prague": "PRG",
  "Berlin": "BER",
  "Amsterdam": "AMS",
  "Kyoto": "KIX",
  "Rio de Janeiro": "GIG",
  "Bali": "DPS",
  "Rome": "FCO",
  "Singapore": "SIN",
  "Mumbai": "BOM",
  "Ho Chi Minh City": "SGN",
  "Paris": "CDG",
  "Barcelona": "BCN",
  "London": "LHR",
  "Cannes": "NCE",
  "Sydney": "SYD",
};

const BUDGET_COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#F472B6", "#94A3B8"];

function buildFlightUrl(event: EventData): string | null {
  if (event.isDomestic) return null;
  const dest = CITY_AIRPORT[event.city];
  if (!dest) return null;
  // 출발: 행사 시작 2일 전, 귀국: 행사 종료 다음 날
  const startDate = new Date(event.date);
  startDate.setDate(startDate.getDate() - 2);
  const depDate = startDate.toISOString().slice(0, 10);
  const endDate = event.endDate || event.date;
  const retDate = new Date(endDate);
  retDate.setDate(retDate.getDate() + 1);
  const retDateStr = retDate.toISOString().slice(0, 10);
  return `https://www.google.com/travel/flights?q=flights+from+ICN+to+${dest}+on+${depDate}+through+${retDateStr}&curr=KRW`;
}

export function SideEventChart({ data }: { data: EventData["sideEventTrend"] }) {
  const latestValue = data[data.length - 1]?.value ?? 0;
  const prevValue = data.length >= 2 ? data[data.length - 2].value : latestValue;
  const growthRate = prevValue > 0 ? (((latestValue - prevValue) / prevValue) * 100).toFixed(0) : "0";
  const max = Math.max(...data.map((item) => item.value), 1);

  const chartW = 280;
  const chartH = 96;
  const padX = 30;
  const padTop = 24;
  const padBottom = 18;
  const innerW = chartW - padX * 2;
  const innerH = chartH - padTop - padBottom;

  const points = data.map((item, i) => ({
    x: padX + (data.length > 1 ? (i / (data.length - 1)) * innerW : innerW / 2),
    y: padTop + innerH - (item.value / max) * innerH,
    ...item,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padTop + innerH} L ${points[0].x} ${padTop + innerH} Z`;

  return (
    <div className="h-[190px] rounded-lg border border-slate-200 bg-white p-3">
      <h4 className="mb-1 text-[13px] font-black text-blue-700">사이드 이벤트 성장 추이</h4>
      <div className="flex h-[104px] items-center justify-center">
        <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`} className="h-[96px] w-auto overflow-visible">
          {/* grid lines */}
          {[0.25, 0.5, 0.75].map((ratio) => (
            <line
              key={ratio}
              x1={padX}
              y1={padTop + innerH * (1 - ratio)}
              x2={chartW - padX}
              y2={padTop + innerH * (1 - ratio)}
              stroke="#e2e8f0"
              strokeWidth={0.5}
              strokeDasharray="3 3"
            />
          ))}
          {/* baseline */}
          <line x1={padX} y1={padTop + innerH} x2={chartW - padX} y2={padTop + innerH} stroke="#cbd5e1" strokeWidth={0.5} />
          {/* area fill */}
          <path d={areaPath} fill="url(#areaGrad)" opacity={0.15} />
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* line */}
          <path d={linePath} fill="none" stroke="#3B82F6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          {/* dots + labels */}
          {points.map((p) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r={3.5} fill="#3B82F6" stroke="#fff" strokeWidth={1.5} />
              <text x={p.x} y={p.y - 6} textAnchor="middle" className="text-[10px]" fill="#334155" fontWeight={700}>{p.value}</text>
              <text x={p.x} y={padTop + innerH + 14} textAnchor="middle" className="text-[10px]" fill="#64748b" fontWeight={600}>{p.label}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-0 flex items-end gap-2">
        <span className="text-[20px] font-black text-emerald-600">▲ {growthRate}%</span>
        <span className="pb-1 text-[11px] font-semibold text-slate-500">전년 대비 성장률</span>
      </div>
    </div>
  );
}

export function BudgetPieChart({ data, total, event }: { data: EventData["budget"]; total: number; event: EventData }) {
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
                <div className="flex items-center gap-1 truncate">
                  <span className="truncate font-semibold text-slate-600">{item.label}</span>
                  {item.label === "항공권" && !event.isDomestic && (() => {
                    const url = buildFlightUrl(event);
                    if (!url) return null;
                    return (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded text-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Google Flights에서 항공편 검색"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3">
                          <path d="M6 3h7v7M13 3L3 13" />
                        </svg>
                      </a>
                    );
                  })()}
                </div>
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
