"use client";

import React from "react";
import { Metadata } from "next";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { usePaginate } from "@/actions/user/client/useGetUsers";
import { Control } from "@/components/shared/topsection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    header: "Id",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "userName",
    header: "User Name",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {info.getValue() as string}
      </span>
    ),
  },
];

export const Users = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div>
        <Control
          title="Users"
          buttons={[
            <Link href={"/organization/user/create"} key={"create button"}>
              <Button key={"create button"}>Create</Button>
            </Link>,
          ]}
        />
      </div>
      <div>
        <DataTable queryFunction={usePaginate} columns={columns} />
      </div>
    </div>
  );
};
