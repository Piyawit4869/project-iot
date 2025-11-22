"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { PenLine, Trash } from "lucide-react";
import { Link } from "react-router";
import { DataTable } from "~/components/shared/data-table";
import GlobalButton from "~/components/shared/global-button";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import { Button } from "~/components/ui/button";

export const metadata: any = {
  title: "Tasks Projects",
  description: "A task and issue tracker built using Tanstack Table.",
};

interface Task {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "done";
  dueDate: string;
}

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "ชื่อตำแหน่ง",
    cell: (info) => (
      <span className="flex text-sm text-muted-foreground">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: (info) => {
      const status = info.getValue() as string;
      return (
        <span>
          <GlobalStatusBadge value={status} />
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "คำอธิบาย",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "",
    header: "การดำเนินการ",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Link to={`/organization/permission-control/${info.row.original.id}`}>
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
    ),
  },
];

export const PermissionControl = () => {
  return (
    <div className="flex flex-col w-full space-y-8">
      {/* <DataTable queryFunction={usePaginate} columns={columns} /> */}
    </div>
  );
};
