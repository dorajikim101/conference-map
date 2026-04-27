"use client";

import { Building2, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { EventData } from "@/lib/events";
import { cn } from "@/lib/utils";

export function CompanySection({ event }: { event: EventData }) {
  const [open, setOpen] = useState<string[]>([event.companies[0]?.name ?? ""]);

  function toggle(name: string) {
    setOpen((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
  }

  return (
    <Card className="min-h-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-slate-500" aria-hidden="true" />
            Companies and People
          </CardTitle>
          <span className="text-xs font-medium text-slate-500">{event.companies.length} candidates</span>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 rounded-md border">
          <div className="divide-y">
            {event.companies.map((company) => {
              const expanded = open.includes(company.name);
              return (
                <div key={company.name} className="bg-white">
                  <button
                    type="button"
                    onClick={() => toggle(company.name)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50"
                  >
                    {expanded ? (
                      <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-slate-950">{company.name}</p>
                        {company.isNew ? <Badge variant="success">NEW</Badge> : null}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {company.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[11px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="hidden text-sm text-slate-500 xl:block">{company.role}</p>
                  </button>
                  <div className={cn("px-11 pb-0 transition-all", expanded ? "pb-4" : "hidden")}>
                    <div className="rounded-md bg-slate-50 p-3">
                      <p className="text-xs font-medium uppercase tracking-normal text-slate-500">People</p>
                      <p className="mt-1 text-sm text-slate-700">{company.people.join(", ")}</p>
                      <p className="mt-2 text-sm text-slate-600">{company.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
