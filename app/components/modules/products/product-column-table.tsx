import { useCallback } from "react";
import { Button } from "~/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";

import { GlobalImage } from "~/components/shared/global-image";
import { Eye, PenLine, Trash } from "lucide-react";

import GlobalButton from "~/components/shared/global-button";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";

import { formatDateBirthDay } from "~/components/shared/global-format";
import {
  Link,
  // useLocation,
  useNavigate,
} from "react-router";
import { useDeleteProduct } from "~/api/client/product/useProductQuery";
import type { ProductColumn } from "~/schemas/order/type";

export const useProductColumnTable = (): ColumnDef<ProductColumn>[] => {
  const navigate = useNavigate();
  // const location = useLocation();

  const { mutate: deleteMutate } = useDeleteProduct();

  const handleDelete = useCallback(
    (row: ProductColumn) => {
      GlobalModal.warning({
        title: "ลบสินค้า",
        description: `คุณต้องการลบสินค้านี้ใช่หรือไม่?`,
        confirmText: "ยืนยัน",
        cancelText: "ยกเลิก",
        onConfirm: async () => {
          const toastId = toast.loading("กำลังลบสินค้า...");
          try {
            await new Promise<void>((resolve, reject) => {
              deleteMutate(row.id, {
                onSuccess: () => {
                  navigate(location.pathname, { replace: true });

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
    [deleteMutate, navigate]
  );

  return [
    {
      accessorKey: "imageUrl",
      header: "รูปภาพ",
      cell: (info) => {
        const url = info.getValue() as string | undefined;
        const name = info.row.original?.name;

        return (
          <div className="w-[150px] h-[150px] relative ">
            <GlobalImage
              src={url || ""}
              alt={name}
              className="w-full h-full object-cover object-center rounded-xl"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "active",
      header: "การใช้งาน",
      cell: (info) => {
        const status = (info.getValue() as string) || "-";
        return <GlobalStatusBadge value={status} />;
      },
    },
    {
      accessorKey: "name",
      header: "ชื่อสินค้า",
      enableResizing: true,

      cell: (info) => {
        const id = info.row.original.id;
        const name = info.getValue() as string;

        return (
          <span className="text-blue-400 hover:text-blue-300 hover:underline">
            <Link to={`/products/${id}`}>
              {/* <span className="text-sm text-muted-foreground hover:text-blue-400 hover:underline"> */}
              {name}
            </Link>
          </span>
        );
      },
    },
    {
      accessorKey: "sku",
      header: "รหัสสินค้า",
      cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
    },
    {
      accessorKey: "barcode",
      header: "บาร์โค้ด",
      cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
    },
    {
      accessorKey: "status",
      header: "สถานะ",
      cell: (info) => {
        const status = info.getValue() as string;
        return (
          <span>
            <GlobalStatusBadge value={status} />
          </span>
        );
      },
    },
    {
      accessorKey: "description",
      header: "คำอธิบาย",
      cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
    },
    {
      accessorKey: "available",
      header: "จำนวนสินค้า",
      cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
    },
    {
      accessorKey: "availableForSale",
      header: "สินค้าที่สามารถขายได้",
      cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
    },
    {
      accessorKey: "matType",
      header: "ประเภทวัสดุ",
      cell: (info) => {
        const value = info.getValue() as string;
        return (
          <span>
            {value === "material"
              ? "วัสดุ"
              : value === "non_material"
              ? "ไม่ใช่วัสดุ"
              : "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "unit",
      header: "หน่วย",
      cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
    },
    {
      accessorKey: "salePrice",
      header: "ราคาขาย",
      cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
    },
    {
      accessorKey: "vatPrice",
      header: "ราคาพร้อมภาษี",
      cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "วันที่สร้าง",
      cell: (info) => {
        const value = info.getValue() as string;
        return <span>{formatDateBirthDay(value)}</span>;
      },
    },
    {
      accessorKey: "createdBy",
      header: "ผู้สร้าง",
      cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
    },
    {
      accessorKey: "updatedAt",
      header: "วันที่แก้ไข",
      cell: (info) => {
        const value = info.getValue() as string;
        return <span>{formatDateBirthDay(value)}</span>;
      },
    },
    {
      accessorKey: "updatedBy",
      header: "ผู้ที่แก้ไข",
      cell: (info) => {
        const id = info.row.original?.updatedById;
        const name = (info.getValue() as string) || "-";

        return id ? (
          <Link to={`/users/${id}`}>
            <span className=" text-muted-foreground hover:text-blue-400 hover:underline">
              {name}
            </span>
          </Link>
        ) : (
          <span className=" text-muted-foreground">{name}</span>
        );
      },
    },
    {
      id: "actions",
      header: "การดำเนินการ",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link to={`/products/${row.original.id}`}>
            <Button
              className="h-9 w-9 p-0 bg-[#737373] hover:bg-[#5E5E5E]"
              aria-label="แก้ไขสินค้า"
              title="แก้ไขสินค้า"
            >
              <Eye className="w-4 h-4 text-white" />
            </Button>
          </Link>

          <div className="w-9">
            <GlobalButton
              label=""
              icon={<Trash className="w-4 h-4 text-white" />}
              onClick={() => handleDelete(row.original)}
              className="h-10 w-10 p-0 bg-[#FF7062] text-white hover:bg-[#E8594B] hover:text-white transition-colors"
              aria-label="ลบสินค้า"
            />
          </div>
        </div>
      ),
    },
  ];
  // [handleDelete, router]
  // );

  // return columns;
};
