"use client";

import { Metadata } from "next";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/shared/data-table";
import { usePaginate } from "@/actions/products/client/useGetProducts";
import React from "react";
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
    accessorKey: "name",
    header: "Name",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "unitPrice",
    header: "Price",
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
    accessorKey: "description",
    header: "Description",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: (info) => (
      <Link href={`/organization/products/${info.row.original.id}`}>
        <Button className="text-sm">Edit</Button>
      </Link>
    ),
  },
];

export const Products = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div>
        <Control
          title="Products and Services"
          buttons={[
            <Link href={"/organization/products/create"} key={"create button"}>
              <Button key={"create button"}>Create Products</Button>
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
