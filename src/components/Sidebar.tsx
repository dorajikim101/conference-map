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
    <aside className="w-[240px] min-h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-10">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-slate-100">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.9" />
            <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" fill="none" opacity="0.7" />
            <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" opacity="0.8" />
          </svg>
        </div>
        <span className="text-lg font-bold text-slate-900">1XP</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-blue-50 text-blue-600 border-l-[3px] border-blue-500 -ml-[3px] pl-[18px]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-3 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors">
          <Settings size={18} />
          설정
        </button>
      </div>
    </aside>
  );
}
