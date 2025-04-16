"use client";

import React from "react";
import Link from "next/link";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Tabcontrol } from "@/components/shared/topsection";
import { CollapeTable, SubTable } from "@/components/shared/collape-table";
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
  children: {
    id: string;
    name: string;
    subValue: string;
  }[];
  nameEn: string;
  nameTh: string;
  taxId: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "nameEn",
    header: "Name (EN)",
    cell: (info) => (
      <Link href={`/super-admin/organization/${info.row.original.id}`}>
        <span className="hover:text-red-500">{info.getValue() as string}</span>
      </Link>
    ),
  },
  {
    accessorKey: "nameTh",
    header: "Name (TH)",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "taxId",
    header: "Tax Id",
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
    accessorKey: "contactName",
    header: "Contact Name",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "contactEmail",
    header: "Contact Email",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "contactPhone",
    header: "Contact Phone",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "code",
    header: "Code Organization",
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: (info) => (
      <Link href={`/super-admin/organization/${info.row.original.id}`}>
        <Button className="text-sm">Edit</Button>
      </Link>
    ),
  },
];

export const Organization = () => {
  return (
    <div className="items-center justify-between space-y-2">
      <Tabcontrol
        title="Organization"
        buttons={[
          <Link href={`/super-admin/organization/create`} key={"create button"}>
            <Button key={"create button"}>Create</Button>
          </Link>,
        ]}
      />
      <CollapeTable
        queryFunction={usePaginate}
        columns={columns}
        renderSubComponent={(row) => (
          <SubTable
            data={row.original.children ?? []}
            columns={[
              {
                accessorKey: "name",
                header: "ชื่อ",
              },
              { accessorKey: "subValue", header: "Sub Value" },
            ]}
          />
        )}
      />
    </div>
  );
};
