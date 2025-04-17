"use client";

import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { usePaginate } from "@/actions/role/client/useGetRole";
import { Tabcontrol } from "@/components/shared/topsection";
import { Button } from "@/components/ui/button";

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
    accessorKey: "name",
    header: "Name",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "",
    header: "Action",
    cell: (info) => (
      <Link href={`/organization/user/role/${info.row.original.id}`}>
        <Button className="text-sm">Edit</Button>
      </Link>
    ),
  },
];

export const Role = () => {
  return (
    <div className="flex-1 flex-col space-y-8 p-8">
      <Tabcontrol
        title="Role"
        buttons={[
          <Link href={"/organization/user/role/create"} key={"create button"}>
            <Button key={"create button"}>Create</Button>
          </Link>,
        ]}
      />
      <DataTable queryFunction={usePaginate} columns={columns} />
    </div>
  );
};
