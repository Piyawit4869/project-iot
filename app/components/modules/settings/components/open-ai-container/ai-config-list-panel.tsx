import * as React from "react";
import { useRouteLoaderData, useSearchParams } from "react-router";
import { Plus } from "lucide-react";

import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { useGetConnectionAiByOrgGroup } from "~/api/client/settings";
import { Separator } from "~/components/ui/separator";
import { CardContent } from "~/components/ui/card";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Button } from "~/components/ui/button";
import ModalCreateConfig from "./modal-create-config";

type AiConfigItem = {
  id: string;
  name: string;
  openAssistantId?: string;
  active?: boolean;
};

interface AiConfigListPanelProps {
  data: any;
  isLoading: boolean;
  refetch: () => void;
}

export function AiConfigListPanel({
  data,
  isLoading,
  refetch,
}: AiConfigListPanelProps) {
  const { user } = useRouteLoaderData("root") as any;
  // const branchId = (user?.branchId ?? "") as string;

  const [sp, setSp] = useSearchParams();
  const selectedId = sp.get("id") ?? "";

  const [q, setQ] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [isFinish, setIsFinish] = React.useState(false);
  // const { data, isLoading, refetch } = useGetConnectionAiByBranch(branchId);

  console.log({ data });

  const items: AiConfigItem[] = React.useMemo(() => {
    const arr = Array.isArray(data) ? data : [];
    return arr
      .map((x: any) => ({
        id: String(x?.id ?? ""),
        name: String(x?.name ?? ""),
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
  React.useEffect(() => {
    if (isFinish) {
      refetch();
    }
  }, [isFinish, refetch]);

  return (
    <div className="h-full bg-background overflow-hidden flex flex-col p-3">
      <Input
        className="mt-2"
        placeholder="ค้นหา name / assistantId..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <CardContent className="space-y-4 mt-2">
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
          </CardContent>
        ) : filtered.length === 0 ? (
          <div className="p-3 text-sm text-muted-foreground text-center">
            <Separator className="mb-2" />
            ไม่พบข้อมูล
            <Separator className="mt-2" />
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
                    "w-full text-left rounded-md border p-3 cursor-pointer hover:bg-muted transition",
                    active && "border-primary bg-muted"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium truncate">{it.name}</div>
                    {it.active && (
                      <span
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full
                   bg-green-100 text-green-700 border border-green-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                        เปิดใช้งาน
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
        <div className="flex justify-end p-2">
          <Button
            variant="secondary"
            className="border-1 bg-white"
            onClick={() => setOpen(true)}
          >
            <Plus />
          </Button>
        </div>
        <ModalCreateConfig
          openWeb={open}
          setOpen={setOpen}
          setIsFinish={setIsFinish}
        />
      </div>
    </div>
  );
}
