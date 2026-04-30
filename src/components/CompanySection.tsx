"use client";

import { useState, useMemo } from "react";
import type { EventData } from "@/lib/events";
import { Search, Plus, User, Briefcase, Layers, Rocket } from "lucide-react";

interface CompanySectionProps {
  companies: EventData["companies"];
}

const tabs = ["전체", "L1", "VC", "미디어", "투자사", "TGE 전"];

const tagColors: Record<string, string> = {
  Bitcoin: "bg-orange-100 text-orange-700",
  Infra: "bg-slate-100 text-slate-700",
  Mining: "bg-amber-100 text-amber-700",
  Payments: "bg-blue-100 text-blue-700",
  Finance: "bg-emerald-100 text-emerald-700",
  Exchange: "bg-cyan-100 text-cyan-700",
  Sponsor: "bg-purple-100 text-purple-700",
  Gaming: "bg-pink-100 text-pink-700",
  Investor: "bg-indigo-100 text-indigo-700",
  VC: "bg-violet-100 text-violet-700",
  MENA: "bg-teal-100 text-teal-700",
  Compliance: "bg-red-100 text-red-700",
  Data: "bg-blue-100 text-blue-700",
  Institutional: "bg-sky-100 text-sky-700",
  Research: "bg-indigo-100 text-indigo-700",
  Stablecoin: "bg-emerald-100 text-emerald-700",
  DeFi: "bg-purple-100 text-purple-700",
  Protocol: "bg-blue-100 text-blue-700",
  Banking: "bg-green-100 text-green-700",
  Crypto: "bg-yellow-100 text-yellow-700",
  Custody: "bg-teal-100 text-teal-700",
  Regulator: "bg-red-100 text-red-700",
  "Abu Dhabi": "bg-amber-100 text-amber-700",
  Broker: "bg-cyan-100 text-cyan-700",
  "Asset Manager": "bg-emerald-100 text-emerald-700",
  "Sovereign Fund": "bg-indigo-100 text-indigo-700",
  L1: "bg-indigo-100 text-indigo-700",
  "Parallel EVM": "bg-indigo-100 text-indigo-700",
  Move: "bg-blue-100 text-blue-700",
  Trading: "bg-emerald-100 text-emerald-700",
  "Proof of Liquidity": "bg-purple-100 text-purple-700",
  "Modular DA": "bg-sky-100 text-sky-700",
};

export function CompanySection({ companies }: CompanySectionProps) {
  const [activeTab, setActiveTab] = useState("전체");
  const [search, setSearch] = useState("");

  const sortedAndFiltered = useMemo(() => {
    // L1 + TGE 안한 팀을 먼저 보여주는 정렬
    const sorted = [...companies].sort((a, b) => {
      const aL1 = a.layer === "L1" ? 0 : 1;
      const bL1 = b.layer === "L1" ? 0 : 1;
      if (aL1 !== bL1) return aL1 - bL1;
      const aTge = a.tgeDone === false ? 0 : 1;
      const bTge = b.tgeDone === false ? 0 : 1;
      if (aTge !== bTge) return aTge - bTge;
      return 0;
    });

    return sorted.filter((c) => {
      const matchesSearch =
        search === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      let matchesTab = true;
      if (activeTab === "L1") {
        matchesTab = c.layer === "L1";
      } else if (activeTab === "TGE 전") {
        matchesTab = c.tgeDone === false;
      } else {
        matchesTab =
          activeTab === "전체" ||
          c.tags.some((t) => t.toLowerCase().includes(activeTab.toLowerCase()));
      }
      return matchesSearch && matchesTab;
    });
  }, [companies, search, activeTab]);

  return (
    <section className="min-h-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[15px] font-black text-slate-950">관심 기업 / 만날 사람</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600">
            <Layers size={10} />
            L1 우선 정렬
          </div>
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">
            <Rocket size={10} />
            TGE 전
          </div>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`h-6 rounded-md px-3 text-[11px] font-bold transition-colors ${
              activeTab === tab
                ? tab === "L1"
                  ? "bg-indigo-500 text-white"
                  : tab === "TGE 전"
                  ? "bg-amber-500 text-white"
                  : "bg-blue-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
        </div>
        <div className="flex items-center gap-2">
        <div className="relative w-[260px]">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="기업 또는 인물 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-[12px] outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>
        <button className="flex h-8 items-center gap-1 rounded-lg border border-blue-100 bg-white px-3 text-[12px] font-bold text-blue-600 transition-colors hover:bg-blue-50">
          <Plus size={14} />
          관심 추가
        </button>
        </div>
      </div>

      <div className="max-h-[210px] overflow-y-auto rounded-lg border border-slate-200">
        <table className="w-full">
          <thead>
            <tr className="sticky top-0 z-[1] bg-slate-50">
              <th className="px-3 py-2 text-left text-[11px] font-bold text-slate-500">기업명</th>
              <th className="px-3 py-2 text-left text-[11px] font-bold text-slate-500">분류</th>
              <th className="px-3 py-2 text-left text-[11px] font-bold text-slate-500">주요 인물</th>
              <th className="px-3 py-2 text-left text-[11px] font-bold text-slate-500">역할</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFiltered.map((company) => (
              <tr
                key={company.name}
                className={`border-t border-slate-100 hover:bg-slate-50/50 ${
                  company.layer === "L1" && company.tgeDone === false
                    ? "bg-amber-50/40"
                    : company.layer === "L1"
                    ? "bg-indigo-50/20"
                    : ""
                }`}
              >
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[12px] font-black text-slate-900">{company.name}</span>
                    {company.isNew && (
                      <span className="text-[10px] font-medium bg-blue-500 text-white px-1.5 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                    {company.layer === "L1" && (
                      <span className="text-[10px] font-medium bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Layers size={8} />
                        L1
                      </span>
                    )}
                    {company.tgeDone === false && (
                      <span className="text-[10px] font-medium bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Rocket size={8} />
                        TGE 전
                      </span>
                    )}
                  </div>
                  {company.tgeNote && (
                    <span className="mt-0.5 block truncate text-[9px] text-slate-400">{company.tgeNote}</span>
                  )}
                </td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap gap-1">
                    {company.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                          tagColors[tag] || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2">
                  <div className="space-y-0.5">
                    {company.people.map((person, i) => (
                      <div key={i} className="flex items-center gap-1 text-[11px] text-slate-600">
                        <User size={10} className="text-slate-400" />
                        {person}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Briefcase size={10} className="text-slate-400" />
                    {company.role}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sortedAndFiltered.length === 0 && (
          <div className="py-8 text-center text-sm text-slate-400">검색 결과가 없습니다</div>
        )}
      </div>
    </section>
  );
}
