import { GlobalImage } from "~/components/shared/global-image";

import { Eye, PenLine, Trash } from "lucide-react";
import { useMemo } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import type { UserColumn } from "~/types/user/type-user";
import { statusMap } from "~/types/user/init-data";
import {
  formatDateAndTime,
  formatDateTH,
  formatPhoneNumber,
} from "~/components/shared/global-format";

export const useUserColumns = (): ColumnDef<UserColumn>[] => {
  const columns = useMemo<ColumnDef<UserColumn>[]>(
    () => [
      {
        accessorKey: "name",
        header: "ชื่อ",
        cell: (info) => {
          const id = info.row.original.id;

          return (
            <span className="text-blue-400 hover:text-blue-300 hover:underline">
              <Link to={`/users/${id}`}>
                {/* <span className=" text-muted-foreground hover:text-blue-400 hover:underline"> */}
                {(info.getValue() as string) || "-"}
              </Link>
            </span>
          );
        },
      },
      {
        accessorKey: "description",
        header: "รายละเอียด",
        cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
      },
      {
        accessorKey: "createdAt",
        header: "วันที่สร้าง",
        enableSorting: true,
        cell: (info) => (
          <span>{formatDateAndTime(info.getValue() as string)}</span>
        ),
      },
      {
        accessorKey: "createdBy",
        header: "ผู้สร้าง",
        cell: (info) => {
          const id = info.row.original.createdById;
          const name = (info.getValue() as string) || "-";

          return id ? (
            <Link to={`/users/${id}`}>
              <span className="text-muted-foreground hover:text-blue-400 hover:underline">
                {name}
              </span>
            </Link>
          ) : (
            <span className="text-muted-foreground">{name}</span>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: "วันที่แก้ไข",
        cell: (info) => {
          const value = info.getValue() as string;
          return <span className="">{formatDateAndTime(value)}</span>;
        },
      },
      {
        accessorKey: "updatedBy",
        header: "ผู้ที่แก้ไข",
        cell: (info) => {
          const id = info.row.original.updatedById;
          const name = (info.getValue() as string) || "-";

          return id ? (
            <Link to={`/users/${id}`}>
              <span className="text-muted-foreground hover:text-blue-400 hover:underline">
                {name}
              </span>
            </Link>
          ) : (
            <span className="text-muted-foreground">{name}</span>
          );
        },
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
                  <Eye className="w-4 h-4 text-white" />
                </Button>
              </Link>

              {/* <div className="w-9">
                <GlobalButton
                  label=""
                  icon={<Trash className="w-4 h-4 text-white" />}
                  onClick={() => {}}
                  className="h-10 w-10 p-0 bg-[#FF7062] text-white hover:bg-[#E8594B] hover:text-white transition-colors"
                  aria-label="ลบ"
                  disabled
                />
              </div> */}
            </div>
          );
        },
      },
    ],
    []
  );

  return columns;
};
