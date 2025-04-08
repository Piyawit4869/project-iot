"use client";

import { Metadata } from "next";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/shared/data-table"; // <- ให้แน่ใจว่ามี component นี้
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GlobalTabs from "@/components/shared/global-tab";

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

const tasks: Task[] = [
  {
    id: "1",
    title: "ออกแบบ UI หน้า Dashboard",
    status: "in-progress",
    dueDate: "2025-04-10",
  },
  {
    id: "2",
    title: "แก้บั๊กระบบสมัครสมาชิก",
    status: "pending",
    dueDate: "2025-04-05",
  },
  {
    id: "3",
    title: "ทดสอบระบบ API ใหม่",
    status: "done",
    dueDate: "2025-04-01",
  },
];

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
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
      <GlobalTabs
        defaultValue="overview"
        tabs={[
          {
            value: "overview",
            label: "Overview",
            content: <h1>Overview Content</h1>,
          },
          {
            value: "analytics",
            label: "Analytics",
            content: () => <div>Analytics Content (lazy)</div>,
          },
        ]}
      />

      <DataTable
        data={tasks}
        columns={columns}
        // filters={filters}
      />
    </>
  );
};
