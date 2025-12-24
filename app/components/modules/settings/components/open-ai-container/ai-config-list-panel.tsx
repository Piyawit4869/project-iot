"use client";

import * as React from "react";
import { useRouteLoaderData, useSearchParams } from "react-router";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { useGetConnectionAiByBranch } from "~/api/client/settings";
import { Separator } from "~/components/ui/separator";
import { CardContent } from "~/components/ui/card";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";

type AiConfigItem = {
  id: string;
  name: string;
  openAssistantId?: string;
  active?: boolean;
};

export function AiConfigListPanel() {
  const { me } = useRouteLoaderData("root") as any;
  const branchId = (me?.branchId ?? "") as string;

  const [sp, setSp] = useSearchParams();
  const selectedId = sp.get("id") ?? "";

  const [q, setQ] = React.useState("");

  const { data, isLoading } = useGetConnectionAiByBranch(branchId);

  const items: AiConfigItem[] = React.useMemo(() => {
    const arr = Array.isArray(data) ? data : [];
    return arr
      .map((x: any) => ({
        id: String(x?.id ?? ""),
        name: String(x?.name ?? ""),
        // openAssistantId: x?.openAssistantId ? String(x.openAssistantId) : "",
        active: Boolean(x?.active),
      }))
      .filter((x) => x.id && x.name);
  }, [data]);

  React.useEffect(() => {
    if (selectedId) return;
    if (items.length === 0) return;

    const first = items.find((x) => x.active) ?? items[0];

    const next = new URLSearchParams(sp);
    next.set("id", first.id);
    setSp(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, selectedId]);

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((x) =>
      `${x.name} ${x.openAssistantId ?? ""}`.toLowerCase().includes(s)
    );
  }, [items, q]);

  const onSelect = (id: string) => {
    const next = new URLSearchParams(sp);
    next.set("id", id);
    setSp(next);
  };

  return (
    <div className="h-full bg-background overflow-hidden flex flex-col p-3">
      {/* <div className="p-3 border-b"> */}
        {/* <div className="font-semibold">รายการ Assistant</div>
        <div className="text-xs text-muted-foreground">
          เลือก config เพื่อแก้ไข
        </div> */}

        <Input
          className="mt-2"
          placeholder="ค้นหา name / assistantId..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      {/* </div> */}

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
            <CardContent className="space-y-4 mt-2">
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </CardContent>
        ) : filtered.length === 0 ? (
          <div className="p-3 text-sm text-muted-foreground text-center">
            <Separator className="mb-2"/>
            ไม่พบข้อมูล
            <Separator className="mt-2"/>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filtered.map((it) => {
              const active = it.id === selectedId;

              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => onSelect(it.id)}
                  className={cn(
                    "w-full text-left rounded-md border p-3 hover:bg-muted transition",
                    active && "border-primary bg-muted"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium truncate">{it.name}</div>
                    {it.active ? (
                      <span className="text-[11px] px-2 py-0.5 rounded-full border">
                        active
                      </span>
                    ) : null}
                  </div>

                  <div className="text-xs text-muted-foreground truncate">
                    {/* {it.openAssistantId || it.id} */}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
