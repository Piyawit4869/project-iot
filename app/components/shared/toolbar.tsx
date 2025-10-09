"use client";

import { type Table } from "@tanstack/react-table";
import { Input } from "../ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <span>ค้นหาข้อมูล</span>
        <Input
          placeholder="ค้นหา..."
          value={table.getState().globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          // value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          // onChange={(event) =>
          //   table.getColumn("id")?.setFilterValue(event.target.value)
          // }
          className="bg-white h-8 w-[150px] lg:w-[250px]"
        />
      </div>
    </div>
  );
}
