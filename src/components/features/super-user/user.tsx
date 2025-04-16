"use client";

import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { usePaginate } from "@/actions/user/client/useGetUsers";
import { Control } from "@/components/shared/topsection";
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
  {
    accessorKey: "",
    header: "Action",
    cell: (info) => (
      <Link href={`/organization/user/${info.row.original.id}`}>
        <Button className="text-sm">Edit</Button>
      </Link>
    ),
  },
];

export const Users = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <Control
        title="Users"
        buttons={[
          <Link href={"/super-admin/user/create"} key={"create button"}>
            <Button key={"create button"}>Create</Button>
          </Link>,
        ]}
      />
      <DataTable queryFunction={usePaginate} columns={columns} />
    </div>
  );
};
