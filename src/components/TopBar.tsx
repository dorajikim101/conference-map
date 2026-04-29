"use client";

import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 gap-4">
      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="이벤트, 도시, 주제, 프로젝트 검색..."
          className="w-full h-9 pl-9 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <FilterDropdown label="기간" value="향후 6개월" />
        <FilterDropdown label="지역" value="전체" />
        <FilterDropdown label="카테고리" value="전체" />
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
          <X size={14} />
          필터 초기화
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-slate-200" />

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
        AK
      </div>
    </header>
  );
}

function FilterDropdown({ label, value }: { label: string; value: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
      <span className="text-slate-400 text-xs">{label}:</span>
      <span className="font-medium text-slate-700">{value}</span>
      <ChevronDown size={14} className="text-slate-400" />
    </button>
  );
}
