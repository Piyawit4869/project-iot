"use client";

import type { UseQueryResult } from "@tanstack/react-query";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type Row,
  type SortingState,
} from "@tanstack/react-table";
import * as React from "react";
import { TablePagination } from "~/components/shared/global-table";
import { Checkbox } from "~/components/ui/checkbox";

type Permission = {
  id: string;
  nameTh: string;
  allowed: Record<string, boolean>;
};

type PermissionDataTableProps = {
  actions: string[];
  clickPermission: Permission[];
  queryFunction: (params: {
    pageIndex: number;
    pageSize: number;
    sorting: SortingState;
  }) => UseQueryResult<
    {
      items: Permission[];
      meta: { totalItems: number; totalPages: number };
    },
    unknown
  >;
  handleCheck: (menuId: string, action: string, checked: boolean) => void;
};

export function PermissionDataTable({
  actions,
  clickPermission,
  queryFunction,
  handleCheck,
}: PermissionDataTableProps) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [localPermissions, setLocalPermissions] = React.useState<Permission[]>(
    []
  );

  React.useEffect(() => {
    if (clickPermission) {
      setLocalPermissions(clickPermission);
    }
  }, [clickPermission]);

  const dataQuery = queryFunction({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sorting,
  });

  const totalItems = dataQuery?.data?.meta?.totalItems || 0;
  const currentData =
    localPermissions.length > 0
      ? localPermissions
      : dataQuery?.data?.items || [];

  // Toggle select all
  const handleToggleSelectAll = (checked: boolean) => {
    setLocalPermissions((prev) =>
      prev.map((menu) => ({
        ...menu,
        allowed: actions.reduce((acc, ac) => ({ ...acc, [ac]: checked }), {}),
      }))
    );
  };

  const handleCheckLocal = (
    menuId: string,
    action: string,
    checked: boolean
  ) => {
    setLocalPermissions((prev) =>
      prev.map((menu) =>
        menu.id === menuId
          ? { ...menu, allowed: { ...menu.allowed, [action]: checked } }
          : menu
      )
    );
    handleCheck(menuId, action, checked); // อัปเดต form
  };
  const table = useReactTable({
    data: currentData,
    columns: React.useMemo<ColumnDef<Permission>[]>(
      () => [
        {
          id: "select",
          header: () => {
            const allChecked = currentData.every((menu) =>
              actions.every((ac) => menu.allowed?.[ac])
            );
            return (
              <Checkbox
                checked={allChecked}
                onCheckedChange={(ck) => handleToggleSelectAll(!!ck)}
              />
            );
          },
          cell: ({ row }) => {
            const menu = row.original;
            const isRowAll = actions.every((ac) => menu.allowed?.[ac]);
            return (
              <Checkbox
                checked={isRowAll}
                onCheckedChange={(ck) =>
                  actions.forEach((ac) => handleCheckLocal(menu.id, ac, !!ck))
                }
              />
            );
          },
        },
        {
          id: "nameTh",
          header: "สิทธิ์การเข้าถึง",
          cell: ({ row }) => <span>{row.original.nameTh}</span>,
        },
        ...actions.map((ac) => ({
          id: ac,
          header: ac,
          cell: ({ row }: { row: Row<Permission> }) => {
            const menu = row.original;
            return (
              <Checkbox
                checked={menu.allowed?.[ac] ?? false}
                onCheckedChange={(ck) => handleCheckLocal(menu.id, ac, !!ck)}
              />
            );
          },
        })),
      ],
      [actions, currentData]
    ),
    state: { pagination, sorting },
    getCoreRowModel: getCoreRowModel(),
    pageCount: dataQuery?.data?.meta?.totalPages || 0,
    manualPagination: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto min-w-[700px]">
        <thead className="bg-black text-white sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-center w-12">
              <Checkbox
                checked={currentData.every((menu) =>
                  actions.every((ac) => menu.allowed[ac])
                )}
                onCheckedChange={(ck) => handleToggleSelectAll(!!ck)}
              />
            </th>
            <th className="px-4 py-3 text-left">สิทธิ์การเข้าถึง</th>
            {actions.map((ac) => (
              <th key={ac} className="px-4 py-3 text-center">
                {ac}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((menu) => {
            const isRowAll = actions.every((ac) => menu.allowed?.[ac]);
            const toggleRow = (checked: boolean) =>
              actions.forEach((ac) => handleCheckLocal(menu.id, ac, checked));
            return (
              <tr key={menu.id} className="border-t bg-background">
                <td className="text-center px-4 py-3">
                  <Checkbox checked={isRowAll} onCheckedChange={toggleRow} />
                </td>
                <td className="px-4 py-3 text-sm font-medium">{menu.nameTh}</td>
                {actions.map((ac) => (
                  <td key={ac} className="text-center px-4 py-3">
                    <Checkbox
                      checked={menu.allowed?.[ac] ?? false}
                      onCheckedChange={(ck) =>
                        handleCheckLocal(menu.id, ac, !!ck)
                      }
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <TablePagination table={table} data={totalItems} />
      </div>
    </div>
  );
}
