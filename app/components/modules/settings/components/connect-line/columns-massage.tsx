import { GlobalImage } from "~/components/shared/global-image";

import { PenLine, Trash } from "lucide-react";
import GlobalButton from "~/components/shared/global-button";
import { useMemo } from "react";
import { formatDateBirthDay } from "~/components/shared/global-format";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import type { UserColumn } from "~/types/user/type-user";
import { statusMap } from "~/types/user/init-data";

export const LineMassageColumns = (): ColumnDef<UserColumn>[] => {
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
          const id = info.row.original.id;
          return (
            <div className="flex items-center gap-2">
              <Link to={`/users/${id}`}>
                <Button
                  className="h-9 w-9 p-0 bg-[#737373] hover:bg-[#5E5E5E]"
                  aria-label="แก้ไข"
                  title="แก้ไข"
                >
                  <PenLine className="w-4 h-4 text-white" />
                </Button>
              </Link>

              <div className="w-9">
                <GlobalButton
                  label=""
                  icon={<Trash className="w-4 h-4 text-white" />}
                  onClick={() => {}}
                  className="h-10 w-10 p-0 bg-[#FF7062] text-white hover:bg-[#E8594B] hover:text-white transition-colors"
                  aria-label="ลบ"
                  disabled
                />
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  return columns;
};
