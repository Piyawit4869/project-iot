import { useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import { Link } from "react-router";
import {
  formatDateAndTime,
  formatDateTH,
  formatNumber,
} from "~/components/shared/global-format";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import { GlobalModal } from "~/components/shared/modal/modal";
import { Button } from "~/components/ui/button";
import type { NotationType } from "~/schemas/notation/type";

export const useNotationColumns = (): ColumnDef<NotationType>[] => {
  const qc = useQueryClient();
  //   const deleteNotations = useDeleteNotation();

  const onDelete = (id: string) => {
    GlobalModal.delete({
      title: "ยืนยันการลบข้อมูลเอกสาร",
      description: "คุณต้องการลบข้อมูลเอกสารนี้หรือไม่?",
      confirmText: "ลบ",
      cancelText: "ยกเลิก",
      //   onConfirm: async () => {
      //     const toastId = toast.loading("กำลังลบข้อมูลลูกค้า...");
      //     try {
      //       await deleteNotations.mutateAsync(id);
      //       toast.success("ลบออเดอร์เรียบร้อยแล้ว !", { id: toastId });
      //       qc.invalidateQueries({ queryKey: ["paginate"] });
      //     } catch {
      //       toast.error("เกิดข้อผิดพลาดขณะลบออเดอร์", { id: toastId });
      //     }
      //   },
    });
  };

  return [
    {
      accessorKey: "docNo",
      header: "เลขที่",
      cell: ({ getValue, row }) => {
        const docNo = getValue() as string;
        return (
          <span className="text-blue-400 hover:text-blue-300 hover:underline">
            <Link to={""}>{docNo ?? "-"}</Link>
            {/* <Link to={`/orders/${row.original.id}`}>{docNo ?? "-"}</Link> */}
          </span>
        );
      },
    },
    {
      accessorKey: "name",
      header: "บริษัทผู้รับ",
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
          // <span className="text-blue-400 hover:text-blue-300 hover:underline">
          <span className="hover:text-blue-400 hover:underline">
            <Link to={`/customer/${customer.id}`}>
              {fullName || customer.name || "-"}
            </Link>
          </span>
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
      accessorKey: "type",
      header: "ประเภทเอกสาร",
      cell: (info) => {
        const price = info.getValue() as number;
        return (
          <span className="font-medium">฿ {formatNumber(price ?? 0.0)} </span>
        );
      },
    },
    {
      accessorKey: "notationDetails.createdAt",
      header: "วันที่ออกเอกสาร",
      accessorFn: (row: NotationType) => row.notationDetails?.createdAt,
      cell: (info) => {
        const date = info.getValue() as string;
        return <span>{formatDateAndTime(date)}</span>;
      },
    },
    {
      accessorKey: "notationDetails.createdAt",
      header: "วันที่หมดอายุเอกสาร",
      accessorFn: (row: NotationType) => row.notationDetails?.createdAt,
      cell: (info) => {
        const date = info.getValue() as string;
        return <span>{formatDateAndTime(date)}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "รหัสอ้างอิง",
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
            <a href={`/notation/${row.original.id}`}>
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
