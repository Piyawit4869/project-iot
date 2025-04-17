"use client";

import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { usePaginate } from "@/actions/products/client/useGetProducts";
import { Tabcontrol } from "@/components/shared/topsection";
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
    accessorKey: "imageUrl",
    header: "Image",
    cell: (info) => {
      const url = info.getValue() as string;

      if (!url) return <span>No Image</span>;

      return (
        <Image
          src={url}
          alt="item"
          width={80}
          height={80}
          className="rounded-xl"
        />
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {info.getValue() as string}
      </span>
    ),
  },
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
    accessorKey: "price",
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
        <Tabcontrol
          title="Products and Services"
          buttons={[
            <Link href={"/organization/products/create"} key={"create button"}>
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
