// features/customer/table/useCustomerColumns.tsx
"use client";

import { PenLine, Trash } from "lucide-react";

import { toast } from "sonner";

// import rome from "@/public/images/rome.png";
import rome from "/assets/images/rome.png";

import lineLogo from "/assets/images/logoChannel/LINE_logo.webp";
import facebookLogo from "/assets/images/logoChannel/Facebook_Logo.png";
import tiktokLogo from "/assets/images/logoChannel/tiktok_logo.png";
import shopeeLogo from "/assets/images/logoChannel/Shopee_logo.png";
import igLogo from "/assets/images/logoChannel/Instagram_icon.png";
import { useQueryClient } from "@tanstack/react-query";
import { GlobalTagsBadge } from "~/components/shared/global-tags";
import type { CustomerType } from "../types/customer";
import type { ColumnDef } from "@tanstack/react-table";
import {
  formatDateAndTime,
  formatDateBirthDay,
  formatPhoneNumber,
} from "~/components/shared/global-format";
import { StarRating } from "~/components/shared/StarRating";

import { GlobalModal } from "~/components/shared/modal/modal";
import { GlobalImage } from "~/components/shared/global-image";
import { Link } from "react-router";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import { Button } from "~/components/ui/button";
import { useDeleteCustomer } from "~/api/client/customer/useCustomer";

const fullName = (c: CustomerType) =>
  c.profile?.name ||
  [c.profile?.firstName, c.profile?.lastName].filter(Boolean).join(" ") ||
  "-";

const channelMap: Record<string, { label: string; icon: any }> = {
  backoffice: { label: "Backoffice", icon: rome },
  line: { label: "LINE", icon: lineLogo },
  facebook: { label: "Facebook", icon: facebookLogo },
  tiktok: { label: "TikTok", icon: tiktokLogo },
  shopee: { label: "Shopee", icon: shopeeLogo },
  instagram: { label: "Instagram", icon: igLogo },
};
// const primaryContact = (c: CustomerType) =>
//   c.contacts?.find((x) => x.isPrimary) ?? c.contacts?.[0];

export const useCustomerColumns = (): ColumnDef<CustomerType>[] => {
  const qc = useQueryClient();
  const deleteCustomer = useDeleteCustomer();

  const onDelete = (id: string) => {
    GlobalModal.delete({
      title: "ยืนยันการลบข้อมูลลูกค้า",
      description: "คุณต้องการลบข้อมูลลูกค้านี้หรือไม่?",
      confirmText: "ลบ",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังลบข้อมูลลูกค้า...");
        try {
          await deleteCustomer.mutateAsync(id);
          toast.success("ลบข้อมูลลูกค้าเรียบร้อยแล้ว!", { id: toastId });
          qc.invalidateQueries({ queryKey: ["customer-paginate"] });
        } catch {
          toast.error("เกิดข้อผิดพลาดขณะลบข้อมูลลูกค้า", { id: toastId });
        }
      },
    });
  };

  return [
    {
      accessorKey: "profile.imageUrl",
      header: "รูปภาพ",
      enableSorting: false,
      cell: (info) => {
        const url = info.getValue() as string | undefined;
        const name = fullName(info.row.original);

        return (
          <GlobalImage
            src={url || ""}
            alt={name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-xl object-cover object-center"
          />
        );
      },
    },

    // Name (clickable)
    {
      accessorKey: "profile.name",
      id: "profile.name",
      header: "ชื่อ",
      enableSorting: true,
      cell: ({ row }) => {
        const name = fullName(row.original);
        return (
          <span className="text-blue-400 hover:text-blue-300 hover:underline">
            <Link to={`/customer/${row.original.id}`}>{name}</Link>
          </span>
        );
      },
    },

    {
      accessorKey: "profile",
      header: "ชื่อจริงลูกค้า",
      cell: (info) => {
        const nickName = info.row.original.profile?.nickName
          ? `( ${info.row.original.profile?.nickName} )`
          : "";

        const fullName = `${info.row.original.profile?.prefix || ""} ${
          info.row.original.profile?.firstName || ""
        } ${info.row.original.profile?.lastName || ""} ${
          nickName || ""
        }`.trim();

        return (
          <Link to={`/customer/${info.row.original.id}`}>
            <span className="text-sm text-muted-foreground hover:text-blue-400 hover:underline">
              {fullName || "-"}
            </span>
          </Link>
        );
      },
    },
    // Active (boolean)
    {
      accessorKey: "active",
      header: "เปิดใช้งาน",
      enableSorting: true,
      cell: (info) => {
        const active = info.getValue() as boolean;
        return (
          <span className="flex justify-center">
            <GlobalStatusBadge value={active} />
          </span>
        );
      },
    },

    // Codes
    {
      accessorKey: "customerCode",
      header: "Code",
      enableSorting: true,
      cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
    },

    // Status (badge)
    {
      accessorKey: "status",
      header: "สถานะ",
      enableSorting: true,
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
      accessorKey: "customerPlatform",
      header: "Channel",
      enableSorting: true,
      cell: (info) => {
        const url = info.getValue() as string;
        const channel = url && channelMap[url];

        return channel ? (
          <GlobalImage
            src={channel.icon}
            alt={channel.label}
            width={56}
            height={56}
            className="h-14 w-14 rounded-xl object-cover object-center pointer-events-none"
          />
        ) : (
          <GlobalImage
            src={""}
            alt={""}
            width={56}
            height={56}
            className="h-14 w-14 rounded-xl object-cover object-center pointer-events-none"
          />
        );
      },
    },

    // Priority & Progress
    {
      accessorKey: "priority",
      header: "ลำดับความสำคัญ",
      enableSorting: true,
      cell: (info) => {
        const v = info.getValue() as number | undefined;
        return (
          <div
            className="no-table-hover pointer-events-none select-none"
            aria-hidden="true"
          >
            <StarRating rating={v} interactive={false} />
          </div>
        );
      },
    },

    // Tags (badges)
    {
      accessorKey: "tags",
      header: "Tags",
      minSize: 300,
      enableSorting: false,
      cell: (info) => {
        const tags = (info.getValue() as { name: string }[]) ?? [];
        if (!tags.length) return <span>ไม่มีข้อมูล</span>;
        const maxShow = 3;
        return (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, maxShow).map((t) => (
              <GlobalTagsBadge key={t.name} value={t.name} />
            ))}

            {tags.length > maxShow && (
              <span
                className="flex items-center justify-center rounded-xl border border-gray-300
                     px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700"
              >
                +{tags.length - maxShow}
              </span>
            )}
          </div>
        );
      },
    },

    // Type / Platform
    {
      accessorKey: "customerType",
      header: "ประเภทลูกค้า",
      enableSorting: true,
      cell: (info) => {
        const customerType = info.getValue() as boolean;
        return (
          <span className="flex justify-center">
            <GlobalStatusBadge value={customerType} />
          </span>
        );
      },
    },

    // Phone (note: in your data, phone is under profile)
    {
      accessorKey: "profile.phone",
      id: "profile.phone",
      header: "เบอร์โทรศัพท์",
      enableSorting: false,
      cell: (info) => {
        const phone = info.getValue() as string | null | undefined;
        return <span>{phone ? formatPhoneNumber(phone) : "-"}</span>;
      },
    },

    {
      accessorKey: "profile.birthDate",
      id: "profile.birthDate",
      header: "วัน / เดือน / ปี เกิด",
      enableSorting: false,
      cell: (info) => {
        const birthDate = info.getValue() as string | null | undefined;
        return <span>{birthDate ? formatDateBirthDay(birthDate) : "-"}</span>;
      },
    },
    {
      accessorKey: "createdBy",
      header: "ผู้สร้าง",
      enableSorting: true,
      cell: (info) => {
        const tranData = info.getValue() as string;
        const displayText =
          tranData === "auto generated by line oa"
            ? "สร้างโดย Line OA"
            : tranData || "-";

        return <span>{displayText}</span>;
      },
    },

    {
      accessorKey: "createdAt",
      header: "วันที่สร้าง",
      enableSorting: true,
      cell: (info) => (
        <span>{formatDateAndTime(info.getValue() as string)}</span>
      ),
    },
    {
      accessorKey: "updatedBy",
      header: "ผู้ที่แก้ไข",
      cell: (info) => {
        const id = info.row.original.updatedById;
        const name = (info.getValue() as string) || "-";

        return id ? (
          <Link to={`/organization/user/${id}`}>
            <span className="text-sm text-muted-foreground hover:text-blue-400 hover:underline">
              {name}
            </span>
          </Link>
        ) : (
          <span className="text-sm text-muted-foreground">{name}</span>
        );
      },
    },

    {
      accessorKey: "updatedAt",
      header: "วันที่แก้ไข",
      enableSorting: true,
      cell: (info) => (
        <span>{formatDateAndTime(info.getValue() as string)}</span>
      ),
    },
    // Actions
    {
      id: "actions",
      header: "การดำเนินการ",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link to={`/customer/${row.original.id}`}>
            <Button
              className="h-9 w-9 p-0 bg-[#737373] hover:bg-[#5E5E5E]"
              aria-label="แก้ไข"
            >
              <PenLine className="w-4 h-4 text-white" />
            </Button>
          </Link>
          <Button
            className="h-9 w-9 p-0 bg-[#FF7062] hover:bg-[#E8594B]"
            aria-label="ลบ"
            onClick={() => onDelete(row.original.id)}
          >
            <Trash className="w-4 h-4 text-white" />
          </Button>
        </div>
      ),
    },
  ];
};
