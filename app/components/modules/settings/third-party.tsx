import type { ColumnDef } from "@tanstack/react-table";
import { Eye, PenLine } from "lucide-react";
import React from "react";
import { redirect, useNavigate } from "react-router";
import { usePaginateChatBot } from "~/api/client/settings";
import { DataTable } from "~/components/shared/data-table";
import { GlobalImage } from "~/components/shared/global-image";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import { TabControl } from "~/components/shared/tab-control";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import type { ThirdPartyTask } from "~/types/settings";
import { ConnectLineWizardModal } from "./components/connect-line/connect-line-wizard-modal";
import { ConnectAiWizardModal } from "./components/connect-open-ai/connect-open-ai-model";

interface ThirdPartyProps {}

function MessageQuotaBar({
  used,
  limit,
  softCap = 10000,
}: {
  used: number;
  limit?: number | null;
  softCap?: number;
}) {
  const pct = React.useMemo(() => {
    if (!limit || limit <= 0) return Math.min((used / softCap) * 100, 100);
    return Math.min((used / limit) * 100, 100);
  }, [used, limit, softCap]);

  const rightLabel =
    !limit || limit <= 0
      ? "ไม่จำกัด"
      : `${used.toLocaleString("th-TH")} / ${limit?.toLocaleString("th-TH")}`;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>ข้อความ</span>
        <span>{rightLabel}</span>
      </div>
      <Progress value={pct} className="h-2" />
    </div>
  );
}

function buildColumns(
  onEdit: (task: ThirdPartyTask) => void
): ColumnDef<ThirdPartyTask>[] {
  return [
    {
      accessorKey: "imageUrl",
      header: "ชื่อช่องทาง",
      cell: (info) => {
        const url = info.getValue() as string;
        const name = info.row.original?.oldAccountName;
        if (!url) return <span>No Image</span>;
        return (
          <GlobalImage
            src={url}
            alt={name}
            width={60}
            height={60}
            className="rounded-xl object-contain object-center"
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "ชื่อ",
      cell: (info) => <span>{info.getValue() as string}</span>,
    },
    {
      accessorKey: "isConnected",
      header: "การเชื่อมต่อ",
      cell: (info) => {
        const isConnected = info.getValue() as string;

        return (
          <span className="flex justify-center">
            <GlobalStatusBadge
              value={`third_party_isConnected_${isConnected}`}
            />
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "สถานะ",
      cell: (info) => {
        const status = info.getValue() as string;

        return (
          <span className="flex justify-center">
            <GlobalStatusBadge value={`third_party_${status}`} />
          </span>
        );
      },
    },
    {
      accessorKey: "originalName",
      header: "ชื่อบัญชีเดิม",
      cell: (info) => (
        <span className="text-sm text-muted-foreground">
          {info.getValue() as string}
        </span>
      ),
    },
    {
      id: "message-usage",
      header: "จำนวนข้อความ",
      cell: ({ row }) => {
        const { current, limit } = row.original;
        return (
          <MessageQuotaBar used={current ?? 0} limit={limit ?? "ไม่จำกัด"} />
        );
      },
    },
    {
      id: "actions",
      header: "การดำเนินการ",
      cell: ({ row }) => {
        const task = row.original;
        const status = row.original?.status;

        return (
          <div className="ml-7">
            <Button
              className=" h-9 w-9 bg-[#737373] hover:bg-[#5E5E5E]"
              type="button"
              onClick={() => onEdit(task)}
              disabled={status === "inactive"}
            >
              <Eye className="w-4 h-4 text-white" />
            </Button>
          </div>
        );
      },
    },
  ];
}

export const ThirdParty: React.FC<ThirdPartyProps> = (props) => {
  const navigate = useNavigate();

  const [openLine, setOpenLine] = React.useState<boolean>(false);
  const [openAi, setOpenAi] = React.useState<boolean>(false);

  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const handleEdit = React.useCallback(
    (task: ThirdPartyTask) => {
      setSelectedId(task.refId);

      const isLine = task.platform === "line";

      if (task?.isConnected) {
        navigate(
          isLine
            ? `/setting-organization/third-party/line/${task.refId}`
            : `/setting-organization/third-party/ai/${task.refId}`
        );
      } else {
        if (isLine) {
          setOpenLine(true);
        } else {
          setOpenAi(true);
        }
      }
    },
    [navigate]
  );

  const columns = React.useMemo(() => buildColumns(handleEdit), [handleEdit]);

  return (
    <div className="flex flex-col w-full space-y-8">
      <TabControl title="การเชื่อมต่อภายนอก" noneSticky={true} />
      <DataTable
        queryFunction={usePaginateChatBot}
        columns={columns}
        offFilter={true}
      />

      <ConnectLineWizardModal
        open={openLine}
        onOpenChange={setOpenLine}
        channelId={selectedId ?? undefined}
      />

      <ConnectAiWizardModal
        open={openAi}
        onOpenChange={setOpenAi}
        channelId={selectedId ?? undefined}
      />
    </div>
  );
};
