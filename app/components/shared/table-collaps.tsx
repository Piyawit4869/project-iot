"use client";

import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  ColumnDef,
  Row,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { UseQueryResult } from "@tanstack/react-query";
import { SkeletonLoading } from "./skeleton-loading";

interface CollapeTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  queryFunction: (params: { pageIndex: number; pageSize: number }) => void;
  renderSubComponent?: (row: Row<TData>) => React.ReactNode;
}

interface SubTableProps<T> {
  data: T[];
  columns: { accessorKey: keyof T; header: string }[];
  renderSubComponent?: (row: Row<T>) => React.ReactNode;
}

export function TableCollaps<TData, TValue>({
  columns,
  queryFunction,
  renderSubComponent,
}: CollapeTableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQuery = queryFunction({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  }) as unknown as UseQueryResult<
    { items: TData[]; meta: { totalPages: number; totalItems: number } },
    unknown
  >;

  const { data, isLoading } = dataQuery;

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [expandedRowId, setExpandedRowId] = React.useState<string | null>(null);

  const defaultData = React.useMemo(() => [], []);

  const table = useReactTable({
    data: data?.items ?? defaultData,
    pageCount: data?.meta?.totalPages,
    manualPagination: true,
    columns,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded: expandedRowId ? { [expandedRowId]: true } : {},
    },
    enableRowSelection: true,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableExpanding: !!renderSubComponent,
    getRowCanExpand: () => !!renderSubComponent,
  });

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex flex-col h-full w-full items-center justify-center gap-2">
          <SkeletonLoading width="w-full" height="h-10" shape="line" />
          <SkeletonLoading width="w-full" height="h-10" shape="line" />
          <SkeletonLoading width="w-full" height="h-10" shape="line" />
          <SkeletonLoading width="w-full" height="h-10" shape="line" />
          <SkeletonLoading width="w-full" height="h-10" shape="line" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableHead className="w-[40px]" />
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow data-state={row.getIsSelected() && "selected"}>
                      <TableCell className="w-[40px]">
                        {renderSubComponent && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedRowId((prev) =>
                                prev === row.id ? null : row.id
                              );
                            }}
                            className="flex items-center"
                          >
                            {row.getIsExpanded() ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </TableCell>

                      {row.getVisibleCells().map((cell, index) => (
                        <TableCell key={`${cell.id}-${index}`}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>

                    {row.getIsExpanded() && renderSubComponent && (
                      <TableRow>
                        <TableCell colSpan={columns.length + 1}>
                          {renderSubComponent(row)}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export function SubTable<T>({
  data,
  columns,
  renderSubComponent,
}: SubTableProps<T>) {
  const [expanded, setExpanded] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    getCoreRowModel: getCoreRowModel(),
    onExpandedChange: setExpanded,
    enableExpanding: !!renderSubComponent,
    getRowCanExpand: () => !!renderSubComponent,
  });

  return (
    <div className="border rounded-md bg-muted/30 p-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {columns.map((col, index) => (
                <TableHead key={`head-${String(col.accessorKey)}-${index}`}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <TableRow>
                <TableCell className="w-[40px]">
                  <button
                    onClick={() => row.toggleExpanded()}
                    className="flex items-center"
                  >
                    {row.getIsExpanded() ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                </TableCell>

                {row.getVisibleCells().map((cell, index) => (
                  <TableCell key={`${cell.id}-${index}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>

              {row.getIsExpanded() && renderSubComponent && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1}>
                    {renderSubComponent(row)}
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
