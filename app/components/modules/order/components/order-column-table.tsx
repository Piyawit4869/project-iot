import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DragHandle } from "~/components/shared/data-table-drag";
import { GlobalImage } from "~/components/shared/global-image";

interface OrderColumn {
  id: string;
  name: string;
  sku: string;
  imageUrl?: string;
  description: string;
  price: number;
}

export const useOrderColumnTable = (): ColumnDef<OrderColumn>[] => {
  const columns = useMemo<ColumnDef<OrderColumn>[]>(
    () => [
      {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
      },
      {
        accessorKey: "imageUrl",
        header: "รูปภาพ",
        cell: (info) => {
          const url = info.getValue() as string;
          const name = info.row.original?.name;

          return (
            <GlobalImage
              src={url}
              alt={name}
              width={60}
              height={60}
              className="rounded-xl object-contain object-center"
              fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${name}`}
            />
          );
        },
      },
      {
        accessorKey: "sku",
        header: "รหัสผลิตภัณฑ์",
        cell: (info) => (
          <div className="max-w-[120px] px-2">
            <span className="block truncate whitespace-nowrap overflow-hidden text-sm text-muted-foreground">
              {info.getValue() as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "ชื่อผลิตภัณฑ์",
        cell: (info) => (
          <div className="max-w-[160px] px-2">
            <span className="block truncate whitespace-nowrap overflow-hidden">
              {info.getValue() as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: "คำอธิบาย",
        cell: (info) => (
          <div className="max-w-[160px] px-2">
            <span className="block truncate whitespace-nowrap overflow-hidden text-sm text-muted-foreground">
              {info.getValue() as string}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "price",
        header: "ราคา",
        cell: (info) => {
          const price = info.getValue() as number;
          return <span className="font-medium">{price} ฿</span>;
        },
      },
    ],
    []
  );

  return columns;
};
