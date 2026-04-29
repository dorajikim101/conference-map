"use client";

import { useState } from "react";
import type { EventData } from "@/lib/events";
import { Search, Plus, User, Briefcase } from "lucide-react";

interface CompanySectionProps {
  companies: EventData["companies"];
}

const tabs = ["전체", "VC", "미디어", "투자사"];

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
};

export function CompanySection({ companies }: CompanySectionProps) {
  const [activeTab, setActiveTab] = useState("전체");
  const [search, setSearch] = useState("");

  const filtered = companies.filter((c) => {
    const matchesSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesTab =
      activeTab === "전체" ||
      c.tags.some((t) => t.toLowerCase().includes(activeTab.toLowerCase()));
    return matchesSearch && matchesTab;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-900">관심 기업 / 만날 사람</h3>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search + Add */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="기업명 또는 태그 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8 pl-8 pr-3 rounded-lg border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
          />
        </div>
        <button className="flex items-center gap-1 px-3 h-8 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors">
          <Plus size={14} />
          관심 추가
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left text-xs font-medium text-slate-500 px-3 py-2.5">기업명</th>
              <th className="text-left text-xs font-medium text-slate-500 px-3 py-2.5">분류</th>
              <th className="text-left text-xs font-medium text-slate-500 px-3 py-2.5">주요 인물</th>
              <th className="text-left text-xs font-medium text-slate-500 px-3 py-2.5">역할</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((company) => (
              <tr key={company.name} className="border-t border-slate-100 hover:bg-slate-50/50">
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{company.name}</span>
                    {company.isNew && (
                      <span className="text-[10px] font-medium bg-blue-500 text-white px-1.5 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2.5">
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
                <td className="px-3 py-2.5">
                  <div className="space-y-0.5">
                    {company.people.map((person, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs text-slate-600">
                        <User size={10} className="text-slate-400" />
                        {person}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Briefcase size={10} className="text-slate-400" />
                    {company.role}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm text-slate-400">검색 결과가 없습니다</div>
        )}
      </div>
    </div>
  );
}
