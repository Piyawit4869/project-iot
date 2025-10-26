import { useCallback, useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import GlobalButton from "~/components/shared/global-button";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";

import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { useDeleteInventory } from "~/api/client/inventories/useInventoryQuery";
import type { InventoryColumn } from "~/initData/inventory-initData";
import { formatDateAndTime } from "~/components/shared/global-format";

export const useInventoryColumnTable = (): ColumnDef<InventoryColumn>[] => {
  const navigate = useNavigate();
  const { mutate: deleteMutate } = useDeleteInventory();

  const handleDelete = useCallback(
    (row: InventoryColumn) => {
      GlobalModal.warning({
        title: "ลบสินค้า",
        description: `คุณต้องการลบสินค้านี้ใช่หรือไม่?ห)`,
        confirmText: "ยืนยัน",
        cancelText: "ยกเลิก",
        onConfirm: async () => {
          const toastId = toast.loading("กำลังลบสินค้า...");
          try {
            await new Promise<void>((resolve, reject) => {
              deleteMutate(row.id, {
                onSuccess: () => {
                  // router.refresh();
                  resolve();
                },
                onError: (err) => reject(err),
              });
            });
            toast.success("ลบสินค้าเรียบร้อยแล้ว!", { id: toastId });
          } catch (error) {
            console.error("Delete product error:", error);
            toast.error("เกิดข้อผิดพลาดขณะลบสินค้า", { id: toastId });
          }
        },
      });
    },
    [deleteMutate]
  );

  const columns = useMemo<ColumnDef<InventoryColumn>[]>(
    () => [
      {
        accessorKey: "name",
        header: "ชื่อคลังสินค้า",
        cell: (info) => {
          const id = info.row.original.id;
          const name = info.getValue() as string;

          return (
            <span className="text-blue-400 hover:text-blue-300 hover:underline">
              <Link to={`/inventory/${id}`}>
                {/* <span className="text-sm text-muted-foreground hover:text-blue-400 hover:underline"> */}
                {name}
              </Link>
            </span>
          );
        },
      },
      {
        accessorKey: "active",
        header: "เปิดใช้งาน",
        cell: (info) => {
          const active = info.getValue() as string;
          return (
            <span className="flex justify-center">
              <GlobalStatusBadge value={active} />
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "สถานะ",
        cell: (info) => {
          const active = info.getValue() as string;
          return (
            <span className="flex justify-center">
              <GlobalStatusBadge value={active} />
            </span>
          );
        },
      },

      {
        accessorKey: "productCount",
        header: "จำนวนสินค้า",
        cell: (info) => (
          <span className="flex justify-center">
            {(info.getValue() as string) || "-"}
          </span>
        ),
      },
      // {
      //   accessorKey: "productCanSale",
      //   header: "จำนวนสินค้าที่ขายได้",
      //   cell: (info) => (
      //     <span className="flex justify-center">
      //       {(info.getValue() as string) || "-"}
      //     </span>
      //   ),
      // },
      {
        accessorKey: "description",
        header: "คำอธิบาย",
        cell: (info) => (
          <span className="line-clamp-2 ">
            {(info.getValue() as string) || "-"}
          </span>
        ),
      },

      {
        accessorKey: "createdAt",
        header: "วันที่สร้าง",
        cell: (info) => {
          const value = info.getValue() as string;
          return <span>{formatDateAndTime(value)}</span>;
        },
      },
      {
        accessorKey: "createdBy",
        header: "ผู้สร้าง",
        cell: (info) => {
          const id = info.row.original.createdById;
          const name = (info.getValue() as string) || "-";

          return id ? (
            <Link to={`/users/${id}`}>
              <span className="text-muted-foreground hover:text-blue-400 hover:underline">
                {name}
              </span>
            </Link>
          ) : (
            <span className="text-muted-foreground">{name}</span>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: "วันที่แก้ไข",
        cell: (info) => {
          const value = info.getValue() as string;
          return <span>{formatDateAndTime(value)}</span>;
        },
      },
      {
        accessorKey: "updatedBy",
        header: "ผู้ที่แก้ไข",
        cell: (info) => {
          const id = info.row.original.updatedById;
          const name = (info.getValue() as string) || "-";

          return id ? (
            <Link to={`/users/${id}`}>
              <span className="text-muted-foreground hover:text-blue-400 hover:underline">
                {name}
              </span>
            </Link>
          ) : (
            <span className="text-muted-foreground">{name}</span>
          );
        },
      },
      {
        id: "actions",
        header: "การดำเนินการ",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Link to={`/inventory/${row.original.id}`}>
              <Button
                className="h-9 w-9 p-0 bg-[#737373] hover:bg-[#5E5E5E]"
                aria-label="แก้ไขสินค้า"
                title="แก้ไขสินค้า"
              >
                <Eye className="w-4 h-4 text-white" />
              </Button>
            </Link>

            {/* <div className="w-9">
              <GlobalButton
                label=""
                icon={<Trash className="w-4 h-4 text-white" />}
                onClick={() => handleDelete(row.original)}
                className="h-10 w-10 p-0 bg-[#FF7062] text-white hover:bg-[#E8594B] hover:text-white transition-colors"
                aria-label="ลบสินค้า"
              />
            </div> */}
          </div>
        ),
      },
    ],
    []
  );

  return columns;
};
