import { PenLine, Trash } from "lucide-react";
import { useMemo } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";

import type { UserColumn } from "~/types/user/type-user";

export const useOnboardColumns = (): ColumnDef<UserColumn>[] => {
  const columns = useMemo<ColumnDef<UserColumn>[]>(
    () => [
      {
        accessorKey: "ํtitle",
        header: "ชื่อหัวข้อ",
        // cell: (info) => {
        //   const id = info.row.original.id;

        //   return (
        //     <span className="text-blue-400 hover:text-blue-300 hover:underline">
        //       {(info.getValue() as string) || "-"}
        //     </span>
        //   );
        // },
      },
      {
        accessorKey: "answer",
        header: "จำนวนผู้ตอบ",
        // cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
      },
      {
        accessorKey: "createdBy",
        header: "ผู้สร้าง",
        // cell: (info) => {
        //   const id = info.row.original.createdById;
        //   const name = (info.getValue() as string) || "-";

        //   return id ? (
        //     <Link to={`/users/${id}`}>
        //       <span className="text-muted-foreground hover:text-blue-400 hover:underline">
        //         {name}
        //       </span>
        //     </Link>
        //   ) : (
        //     <span className="text-muted-foreground">{name}</span>
        //   );
        // },
      },
      {
        accessorKey: "createdAt",
        header: "วันที่สร้าง",
        enableSorting: true,
        // cell: (info) => (
        //   <span>{formatDateAndTime(info.getValue() as string)}</span>
        // ),
      },
      {
        accessorKey: "updatedAt",
        header: "แก้ไขล่าสุด",
        // cell: (info) => {
        //   const value = info.getValue() as string;
        //   return <span>{formatDateAndTime(value)}</span>;
        // },
      },
      {
        id: "actions",
        header: "การดำเนินการ",
        cell: (info) => {
          const id = info.row.original.id;

          return (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                className="h-9 w-9 p-0 bg-[#737373] hover:bg-[#5E5E5E]"
                // aria-label="ดูรายละเอียดตำแหน่ง"
                // title="ดูรายละเอียด"
              >
                <PenLine className="w-4 h-4 text-white" />
              </Button>
              <Button
                type="button"
                className="h-9 w-9 p-0 bg-[#910000] hover:bg-[#910000]"
                // aria-label="ดูรายละเอียดตำแหน่ง"
                // title="ดูรายละเอียด"
              >
                <Trash className="w-4 h-4 text-white" />
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  return columns;
};
