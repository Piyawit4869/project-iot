"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { FileSearch, CheckIcon } from "lucide-react";

import { TablePagination } from "./global-table";
import { SkeletonLoading } from "./skeleton-loading";
import { DataTableToolbar } from "./toolbar";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { cn } from "~/lib/utils";
import type { UseQueryResult } from "@tanstack/react-query";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 size-4 shrink-0 rounded-[4px] border shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current transition-none">
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

const FormSchema = z.object({
  selectedIds: z.array(z.string()).min(1, "กรุณาเลือกอย่างน้อย 1 รายการ"),
});

interface DataTableProps<
  TData extends Record<string, unknown>,
  TKey extends keyof TData & string = keyof TData & string
> {
  columns: ColumnDef<TData>[];
  queryFunction: (params: {
    pageIndex: number;
    pageSize: number;
  }) => UseQueryResult<{
    items: TData[];
    meta: { totalPages: number; totalItems: number };
  }>;
  rowIdKey: TKey;
}

export function TableCheckBox<
  TData extends Record<string, unknown>,
  TKey extends keyof TData & string = keyof TData & string
>({ columns, queryFunction, rowIdKey }: DataTableProps<TData, TKey>) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQuery = queryFunction({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  const { data, isLoading } = dataQuery;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedIds: [],
    },
  });

  const table = useReactTable({
    data: data?.items ?? [],
    columns: [
      {
        id: "select",
        header: () => <div className="text-center">เลือก</div>,
        cell: ({ row }) => {
          const id = String(row.original[rowIdKey]);
          return (
            <Controller
              control={form.control}
              name="selectedIds"
              render={({ field }) => (
                <Checkbox
                  checked={field.value.includes(id)}
                  onCheckedChange={(checked) => {
                    const newValue = checked
                      ? [...field.value, id]
                      : field.value.filter((i) => i !== id);
                    field.onChange(newValue);
                  }}
                  aria-label="เลือกแถว"
                />
              )}
            />
          );
        },
        enableSorting: false,
        enableHiding: false,
      },
      ...columns,
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: data?.meta?.totalPages ?? 0,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    toast.success("ส่งรายการเรียบร้อย", {
      description: (
        <pre className="bg-neutral-900 text-white p-4 mt-2 rounded-md text-sm">
          {JSON.stringify(values, null, 2)}
        </pre>
      ),
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <DataTableToolbar table={table} />

      {isLoading ? (
        <div className="flex flex-col h-full w-full items-center justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <SkeletonLoading
              key={i}
              width="w-full"
              height="h-15"
              shape="line"
            />
          ))}
        </div>
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table className="w-full table-auto min-w-[600px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="h-24">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <FileSearch className="w-8 h-8" />
                      <span>ไม่พบข้อมูล</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <TablePagination table={table} data={data?.meta?.totalItems ?? 0} />
      <Button type="submit">ส่งรายการที่เลือก</Button>
    </form>
  );
}
