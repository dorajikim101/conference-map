"use client";

import { ChevronDown, Search, X } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex h-[66px] items-center gap-4 border-b border-slate-200 bg-white px-5">
      <div className="relative min-w-[420px] flex-1">
        <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="이벤트, 도시, 주제, 프로젝트 검색..."
          className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-[13px] text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/10"
        />
        <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
      </div>

      <div className="flex items-center gap-3">
        <FilterDropdown label="기간" value="향후 6개월" />
        <FilterDropdown label="지역" value="전체" />
        <FilterDropdown label="카테고리" value="전체" />
        <button className="flex h-12 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-[13px] font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-50">
          <X size={13} className="text-slate-400" />
          필터 초기화
        </button>
      </div>

      <div className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-[14px] font-bold text-slate-950">
        AK
      </div>
    </header>
  );
}

function FilterDropdown({ label, value }: { label: string; value: string }) {
  return (
    <button className="flex h-12 min-w-[120px] items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-left shadow-sm transition-colors hover:bg-slate-50">
      <span>
        <span className="block text-[10px] font-semibold leading-3 text-slate-400">{label}</span>
        <span className="block text-[12px] font-bold leading-5 text-slate-900">{value}</span>
      </span>
      <ChevronDown size={15} className="text-slate-400" />
    </button>
  );
}
