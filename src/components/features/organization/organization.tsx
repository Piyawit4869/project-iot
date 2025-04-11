"use client";

import React from "react";
import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Control } from "@/components/shared/topsection";
import { DataTable } from "@/components/shared/data-table";
import { usePaginate } from "@/actions/super-organization/client/useGetOrganizations";
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
    header: "Organization Id",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "nameTh",
    header: "Name (TH)",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "nameEn",
    header: "Name (EN)",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
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
    accessorKey: "",
    header: "Actions",
    cell: (info) => (
      <Link href={`/superadmin/organization/${info.row.original.id}`}>
        <Button className="text-sm">Edit</Button>
      </Link>
    ),
  },
];

export const Organization = () => {
  return (
    <>
      <div className="items-center justify-between space-y-2">
        <Control
          title="Organization"
          buttons={[
            <Link
              href={`/superadmin/organization/create`}
              key={"create button"}
            >
              <Button key={"create button"}>Create</Button>
            </Link>,
          ]}
        />
      </div>
      <DataTable queryFunction={usePaginate} columns={columns} />
    </>
  );
};
