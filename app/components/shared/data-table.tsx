"use client";

import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnSizingState,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { TablePagination } from "./global-table";
import { type UseQueryResult } from "@tanstack/react-query";
import { SkeletonLoading } from "./skeleton-loading";
import { FileSearch } from "lucide-react";
import { SortableHeader } from "./sort-table-header";
import { DynamicFilterBar } from "./dynamic-filter-bar";
import { ColumnResizer } from "./column-resizer";
import { useSidebar } from "../ui/sidebar";
import { cn } from "~/lib/utils";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  offSearch?: boolean;
  offFilter?: boolean;
  addOn?: React.ReactNode;
  queryFunction?: (params: {
    pageIndex: number;
    pageSize: number;
    sorting: any;
  }) => void;
  data?: TData[];
  customerFilterFields?: any;
  isCustomLoading?: boolean;
  showAdvancedButton?: boolean;
  offPaginate?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  queryFunction,
  // offSearch,
  // offFilter,
  offPaginate,
  addOn,
  data: propData,
  customerFilterFields,
  isCustomLoading,
  showAdvancedButton,
}: DataTableProps<TData, TValue>) {
  const { isMobile, state } = useSidebar();

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const dataQuery = queryFunction
    ? (queryFunction({
        pageIndex: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        sorting,
      }) as unknown as UseQueryResult<
        | {
            res?: TData[];
            items?: TData[];
            meta?: { totalPages?: number; totalItems?: number };
          }
        | TData[],
        unknown
      >)
    : null;

  const { data, isLoading } = dataQuery ?? { data: propData, isLoading: false };

  const rows: TData[] = React.useMemo(() => {
    if (propData) return propData;
    if (Array.isArray(data)) return data as TData[];
    if (Array.isArray((data as any)?.items))
      return (data as any).items as TData[];
    if (Array.isArray((data as any)?.res)) return (data as any).res as TData[];
    return [];
  }, [data, propData]);

  const meta = (data as any)?.meta;
  const pageCount =
    typeof meta?.totalPages === "number" ? meta.totalPages : undefined;
  const manualPagination = Boolean(queryFunction);
  const totalItems =
    typeof meta?.totalItems === "number" ? meta.totalItems : rows.length;

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [colSizing, setColSizing] = React.useState<ColumnSizingState>({});

  const [isLoadingState, setIsLoadingState] = React.useState<boolean>(true);

  const isServer = Boolean(queryFunction);

  const table = useReactTable({
    data: rows,
    pageCount,
    manualPagination,
    columns,
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnSizing: colSizing,
    },
    enableRowSelection: true,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    ...(isServer ? {} : { getFilteredRowModel: getFilteredRowModel() }),
    ...(isServer ? {} : { getPaginationRowModel: getPaginationRowModel() }),
    ...(isServer ? {} : { getSortedRowModel: getSortedRowModel() }),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onColumnSizingChange: setColSizing,
  });

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoadingState(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-4">
      {/* <div className="flex flex-row gap-3">
        {!offSearch && <DataTableToolbar table={table} />}
        {!offFilter && (
          <>
            <span className="min-w-50">
              <MultiSelect
                options={customerStatus.map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
                placeholder="สถานะลูกค้า"
                selected={
                  (table.getColumn("status")?.getFilterValue() as string[]) ||
                  []
                }
                onChange={(values) =>
                  table.getColumn("status")?.setFilterValue(values)
                }
              />
            </span>
            <span className="min-w-50 flex flex-row items-center  gap-8 rounded-md px-4 py-2 bg-muted/20 dark:bg-muted/30   select-none">
              {activeStatus.map(({ label, value }) => (
                <div key={value}>
                  <Checkbox>
                    <CheckboxIndicator />
                  </Checkbox>
                  <label className="text-sm font-medium ml-2">{label}</label>
                </div>
              ))}
            </span>
          </>
        )}
      </div> */}
      {customerFilterFields && (
        <DynamicFilterBar
          table={table}
          fields={customerFilterFields}
          showAdvanced={showAdvancedButton}
        />
      )}

      {addOn && <div>{addOn}</div>}

      {isLoading || isLoadingState || isCustomLoading ? (
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
        <div
          className={cn(
            "rounded-md border overflow-x-auto max-w-[calc(100vw-320px)] ",
            isMobile && "max-w-[calc(100vw-60px)]",
            state === "collapsed" && "max-w-[calc(100vw-120px)]",
          )}
          // className={cn(
          //   "rounded-md border overflow-x-auto w-full" // Ensure full width
          // )}
        >
          <Table
            className="bg-white w-full table-auto dark:bg-card"
            // style={{ width: table.getTotalSize() }}
          >
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          width: header.getSize(),
                          position: "relative",
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : header.column.id === "actions" ||
                              header.column.id === "imageUrl" ||
                              header.column.id === "profile.imageUrl"
                            ? flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )
                            : flexRender(
                                <SortableHeader column={header.column} />,
                                header.getContext(),
                              )}

                        <ColumnResizer header={header} />
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className="text-sm sm:text-base text-muted-foreground max-w-[300px] truncate"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
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

      {!offPaginate && <TablePagination table={table} data={totalItems} />}
    </div>
  );
}
