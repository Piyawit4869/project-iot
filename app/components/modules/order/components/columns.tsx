import { useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import { useDeleteOrder } from "~/api/client/order/useGetOrder";
import { formatDateTH, formatNumber } from "~/components/shared/global-format";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import { GlobalModal } from "~/components/shared/modal/modal";
import { Button } from "~/components/ui/button";
import type { OrderType } from "~/schemas/order/type";
// import { useOrderViewModel } from "../viewmodels/useOrderViewModel";
export const useOrderColumns = (): ColumnDef<OrderType>[] => {
  const qc = useQueryClient();
  const deleteOrders = useDeleteOrder();

  const onDelete = (id: string) => {
    GlobalModal.delete({
      title: "ยืนยันการลบข้อมูลออเดอร์",
      description: "คุณต้องการลบข้อมูลออเดอร์นี้หรือไม่?",
      confirmText: "ลบ",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังลบข้อมูลลูกค้า...");
        try {
          await deleteOrders.mutateAsync(id);
          toast.success("ลบออเดอร์เรียบร้อยแล้ว !", { id: toastId });
          qc.invalidateQueries({ queryKey: ["paginate"] });
        } catch {
          toast.error("เกิดข้อผิดพลาดขณะลบออเดอร์", { id: toastId });
        }
      },
    });
  };

  return [
    {
      accessorKey: "docName",
      header: "ชื่อออเดอร์",
      cell: ({ getValue, row }) => {
        const name = getValue() as string;
        return (
          <Link to={`/orders/${row.original.id}`}>
            <span className="text-sm text-muted-foreground hover:text-blue-400 hover:underline">
              {name ?? "-"}
            </span>
          </Link>
        );
      },
    },
    {
      accessorKey: "customer.name",
      header: "ชื่อลูกค้า",
      cell: ({ row }) => {
        const customer = row.original.customer ?? {};

        const fullName = [
          customer?.prefix || null,
          customer?.firstName || null,
          customer?.lastName || null,
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <span className="hover:text-blue-400 hover:underline">
            <Link to={`/customer/${customer.id}`}>
              {fullName || customer.name || "-"}
            </Link>
          </span>
        );
      },
    },

    {
      accessorKey: "orderDetails.createdAt",
      header: "วันที่สั่งซื้อ",
      cell: (info) => {
        const date = info.getValue() as string;
        return <span>{formatDateTH(date)}</span>;
      },
    },
    {
      id: "productCount",
      header: "จำนวนสินค้า",
      accessorFn: (row: OrderType) => row.orderDetails?.products?.length ?? 0,
      cell: ({ getValue }) => <span>{`${getValue()} รายการ`}</span>,
    },

    {
      accessorKey: "status",
      header: "สถานะการชำระเงิน",
      cell: (info) => {
        const status = info.getValue() as string;
        return (
          <span className="flex justify-center">
            <GlobalStatusBadge value={status} />
          </span>
        );
      },
    },
    {
      accessorKey: "profit",
      header: "กำไรโดยประมาณ",
      cell: (info) => {
        const price = info.getValue() as number;
        return (
          <span className="font-medium">฿ {formatNumber(price ?? 0.0)} </span>
        );
      },
    },
    {
      accessorKey: "total",
      header: "ยอดรวม",
      cell: (info) => {
        const price = info.getValue() as number;
        return (
          <span className="font-medium">฿ {formatNumber(price ?? 0.0)} </span>
        );
      },
    },
    {
      accessorKey: "docStatus",
      header: "สถานะออเดอร์",
      cell: (info) => {
        const status = info.getValue() as string;
        return (
          <span className="flex justify-center">
            <GlobalStatusBadge value={status} />
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "การดำเนินการ",
      cell: ({ row }) => {
        return (
          <>
            <a href={`/orders/${row.original.id}`}>
              <Button className="text-sm bg-[#737373] mr-2">
                <Eye />
              </Button>
            </a>
            <Button
              className="text-sm bg-[#FF7062]"
              onClick={() => onDelete(row.original.id)}
            >
              <Trash />
            </Button>
          </>
        );
      },
    },
  ];
};

//   {
//     accessorKey: "docName",
//     header: "ชื่อออเดอร์",
//   },
//   {
//     accessorKey: "refNo",
//     header: "เลขที่อ้างอิง",
//   },
//   {
//     accessorKey: "type",
//     header: "ประเภท",
//     cell: (info) => {
//       const type = info.getValue();
//       return (
//         <span>
//           {type === "quotation"
//             ? "ใบเสนอราคา"
//             : type === "invoice"
//               ? "ใบแจ้งหนี้"
//               : "ใบเสร็จ"}
//         </span>
//       );
//     },
//   },
//   {
//     accessorKey: "docStatus",
//     header: "สถานะ",
//   },
//   {
//     accessorKey: "customer.name",
//     header: "ลูกค้า",
//   },
//   {
//     id: "actions",
//     header: "การดำเนินการ",
//     cell: ({ row }) => (
//       <>
//         <a href={`/organization/orders/${row.original.id}`}>
//           <Button className="text-sm bg-[#737373] mr-2">
//             <PenLine />
//           </Button>
//         </a>
//         <a href={`/organization/orders/${row.original.id}`}>
//           <Button className="text-sm bg-[#FF7062]">
//             <Trash />
//           </Button>
//         </a>
//       </>
//     ),
//   },
// ];
