"use client";

import {
  Home,
  CalendarDays,
  Archive,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "홈", active: false },
  { icon: CalendarDays, label: "이벤트", active: true },
  { icon: Archive, label: "아카이브", active: false },
  { icon: Users, label: "관심기업", active: false },
  { icon: BarChart3, label: "분석", active: false },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-10 flex min-h-screen w-[240px] flex-col border-r border-slate-200 bg-white">
      <div className="flex h-[66px] items-center gap-2.5 px-7">
        <div className="flex h-10 w-10 items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 44 44" fill="none">
            <path d="M22 3.5 38 12.8v18.4L22 40.5 6 31.2V12.8L22 3.5Z" stroke="#0EA5E9" strokeWidth="3" />
            <path d="M22 4v36M6.8 13 22 21.8 37.2 13M6.8 31 22 21.8 37.2 31" stroke="#0EA5E9" strokeWidth="2.2" />
          </svg>
        </div>
        <span className="text-[30px] font-black tracking-tight text-black">1XP</span>
      </div>

      <nav className="flex-1 space-y-2 px-3 pt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`relative flex h-12 w-full items-center gap-4 rounded-xl px-5 text-[14px] font-semibold transition-colors ${
                item.active
                  ? "bg-blue-50 text-blue-600 before:absolute before:-left-3 before:top-2 before:h-8 before:w-[3px] before:rounded-r-full before:bg-blue-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={21} strokeWidth={1.8} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 pb-8">
        <button className="flex h-12 w-full items-center gap-4 rounded-xl px-5 text-[14px] font-semibold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
          <Settings size={21} strokeWidth={1.8} />
          설정
        </button>
      </div>
    </aside>
  );
}
