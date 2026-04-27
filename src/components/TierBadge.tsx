"use client";

import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { EventData } from "@/lib/events";

const tierStyles = {
  S: "border-slate-900 bg-slate-950 text-white",
  A: "border-sky-200 bg-sky-50 text-sky-800",
  B: "border-amber-200 bg-amber-50 text-amber-800",
};

export function TierBadge({
  tier,
  autoTier,
  score,
  reasons,
  className,
}: {
  tier: EventData["tier"];
  autoTier: EventData["autoTier"];
  score: number;
  reasons: string[];
  className?: string;
}) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={cn("shadow-sm", tierStyles[tier], className)}>
            Tier {tier}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="font-medium">Final Tier {tier}</span>
              <span className="text-xs text-slate-500">Auto {autoTier} / {score}</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-600">
              {reasons.map((reason) => (
                <li key={reason}>- {reason}</li>
              ))}
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
