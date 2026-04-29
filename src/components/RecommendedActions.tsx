"use client";

import { CheckCircle, ArrowRight, Lightbulb } from "lucide-react";

export function RecommendedActions({ actions }: { actions: string[] }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[11px] font-semibold text-slate-900">추천 액션</h4>
        <button className="text-[10px] text-blue-500 hover:text-blue-700 flex items-center gap-0.5">
          전체 보기 <ArrowRight size={10} />
        </button>
      </div>
      <div className="space-y-1.5">
        {actions.map((action, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="mt-0.5">
              <Lightbulb size={12} className="text-blue-500" />
            </div>
            <span className="text-[10px] text-slate-700 leading-snug">{action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
