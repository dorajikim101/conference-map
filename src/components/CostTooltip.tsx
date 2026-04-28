"use client";

import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { currency } from "@/lib/format";
import type { EventCost } from "@/lib/events";

const rows: Array<[keyof EventCost, string]> = [
  ["flight", "ICN 왕복 이코노미"],
  ["hotel", "행사장 인근 숙박"],
  ["transport", "현지 교통비"],
  ["meals", "식비 예상"],
  ["ticket", "메인 컨퍼런스 패스"],
];

export function CostTooltip({ cost }: { cost: EventCost }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md border bg-white px-2 py-1 text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-50"
          >
            {currency(cost.total)}
            <Info className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="w-72">
          <div className="space-y-2">
            <div>
              <div className="font-medium">예상 출장 비용</div>
              <div className="text-xs text-slate-500">ICN 출발, 이코노미 좌석, 행사장 인근 숙박 기준입니다.</div>
            </div>
            <div className="space-y-1">
              {rows.map(([key, label]) => (
                <div key={key} className="flex items-center justify-between gap-4 text-xs">
                  <span className="text-slate-600">{label}</span>
                  <span className="font-medium text-slate-950">{currency(Number(cost[key]))}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t pt-2 text-sm font-semibold">
              <span>합계</span>
              <span>{currency(cost.total)}</span>
            </div>
            {cost.note ? <p className="text-xs text-amber-700">{cost.note}</p> : null}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
