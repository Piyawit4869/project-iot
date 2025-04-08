/** @format */

"use client";

import { Metadata } from "next";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/shared/data-table"; // <- ให้แน่ใจว่ามี component นี้

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

export const WorkInformation = () => {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>

      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Work Information
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>

        <DataTable
          data={tasks}
          columns={columns}
          // filters={filters}
        />
      </div>
    </>
  );
};
