"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { EventData } from "@/lib/events";

const BUDGET_COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"];

export function SideEventChart({ data }: { data: EventData["sideEventTrend"] }) {
  const latestValue = data[data.length - 1]?.value ?? 0;
  const prevValue = data.length >= 2 ? data[data.length - 2].value : latestValue;
  const growthRate = prevValue > 0 ? (((latestValue - prevValue) / prevValue) * 100).toFixed(0) : "0";

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-slate-900">사이드 이벤트 성장 추이</h4>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          YoY +{growthRate}%
        </span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
            formatter={((value: number | string) => [`${value}개`, "사이드 이벤트"]) as never}
          />
          <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#areaGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BudgetPieChart({ data, total }: { data: EventData["budget"]; total: number }) {
  const formattedTotal = `$${total.toLocaleString()}`;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <h4 className="text-sm font-semibold text-slate-900 mb-3">예산 비중</h4>
      <div className="flex items-center gap-4">
        <div className="relative" style={{ width: 140, height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                dataKey="value"
                stroke="none"
                paddingAngle={2}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={BUDGET_COLORS[index % BUDGET_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
                formatter={((value: number | string) => [`$${Number(value).toLocaleString()}`, ""]) as never}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-slate-400">총비용</span>
            <span className="text-sm font-bold text-slate-900">{formattedTotal}</span>
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          {data.map((item, index) => (
            <div key={item.label} className="flex items-center gap-2 text-xs">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: BUDGET_COLORS[index % BUDGET_COLORS.length] }}
              />
              <span className="text-slate-500 flex-1">{item.label}</span>
              <span className="font-medium text-slate-700">${item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function KpiGrid({ data }: { data: EventData["kpis"] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <h4 className="text-sm font-semibold text-slate-900 mb-3">핵심 KPI 요약</h4>
      <div className="grid grid-cols-2 gap-2.5">
        {data.map((kpi, i) => (
          <div key={i} className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1">{kpi.label}</div>
            <div className="text-base font-bold text-slate-900">{kpi.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{kpi.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
