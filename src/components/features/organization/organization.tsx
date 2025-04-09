"use client";

import { Metadata } from "next";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/shared/data-table";
import { usePaginate } from "@/actions/user/client/useGetUsers";

export const metadata: Metadata = {
  title: "Tasks",
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
    accessorKey: "id",
    header: "ชื่องาน",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: (info) => {
      const status = info.getValue() as string;
      const color =
        status === "done"
          ? "text-green-600"
          : status === "in-progress"
            ? "text-yellow-600"
            : "text-gray-500";
      return <span className={`font-medium ${color}`}>{status}</span>;
    },
  },
  {
    accessorKey: "dueDate",
    header: "กำหนดส่ง",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {info.getValue() as string}
      </span>
    ),
  },
];

export const Organization = () => {
  return (
    <>
      <DataTable queryFunction={usePaginate} columns={columns} />
    </>
  );
};
