"use client";

import { CheckCircle, ArrowRight, Lightbulb } from "lucide-react";

export function RecommendedActions({ actions }: { actions: string[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-slate-900">추천 액션</h4>
        <button className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1">
          전체 액션 보기 <ArrowRight size={12} />
        </button>
      </div>
      <div className="space-y-2">
        {actions.map((action, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="mt-0.5">
              <Lightbulb size={14} className="text-blue-500" />
            </div>
            <span className="text-sm text-slate-700 leading-snug">{action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
