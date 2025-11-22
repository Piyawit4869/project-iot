import { PenLine, Trash } from "lucide-react";
import GlobalButton from "~/components/shared/global-button";
import { useMemo } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { Link, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";

import type { UserColumn } from "~/types/user/type-user";

type OnDeleteFn = (id: string) => void;

export const LineMassageColumns = (
  onDelete: OnDeleteFn
): ColumnDef<UserColumn>[] => {
  const [sp] = useSearchParams();

  const columns = useMemo<ColumnDef<UserColumn>[]>(
    () => [
      {
        accessorKey: "name",
        header: "ชื่อ",
        cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
      },
      {
        accessorKey: "content.messages.text",
        header: "ข้อความ",

        cell: (info) => (
          <span className="text-sm text-muted-foreground">
            {(info.getValue() as string) || "-"}
          </span>
        ),
      },
      {
        accessorKey: "description",
        header: "รายละเอียด",

        cell: (info) => (
          <span className="text-sm text-muted-foreground">
            {(info.getValue() as string) || "-"}
          </span>
        ),
      },

      {
        id: "actions",
        header: "การดำเนินการ",
        cell: (info) => {
          const subId = info.row.original.id;
          const id = sp.get("id") ?? "";

          const tabFromUrl = sp.get("tab") ?? "config-line";

          return (
            <div className="flex items-center gap-2">
              <Link
                to={`/setting-organization/third-party/line?id=${id}&tab=${tabFromUrl}&view=edit&subId=${subId}`}>
                <Button
                  className="h-9 w-9 p-0 bg-[#737373] hover:bg-[#5E5E5E]"
                  aria-label="แก้ไข"
                  title="แก้ไข">
                  <PenLine className="w-4 h-4 text-white" />
                </Button>
              </Link>

              <div className="w-9">
                <GlobalButton
                  label=""
                  icon={<Trash className="w-4 h-4 text-white" />}
                  onClick={() => onDelete(subId)}
                  className="h-10 w-10 p-0 bg-[#FF7062] text-white hover:bg-[#E8594B] hover:text-white transition-colors"
                  aria-label="ลบ"
                />
              </div>
            </div>
          );
        },
      },
    ],
    [sp, onDelete]
  );

  return columns;
};
