import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Eye, Globe, Mail, Phone } from "lucide-react";

import { Button } from "~/components/ui/button";
import { GlobalImage } from "~/components/shared/global-image";
import { Link } from "react-router";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import {
  formatDateAndTime,
  formatDateTH,
  formatPhoneNumber,
  formatTaxId,
} from "~/components/shared/global-format";

export type OrganizationColumn = {
  id: string;
  logoUrl?: string | null;

  code?: string | null;
  nameTh?: string | null;
  nameEn?: string | null;

  active?: boolean | null;
  status?: string | null;

  fromType?: "ordinary_person" | "juristic_person" | string | null;
  taxId?: string | null;
  orgType?: string | null;
  openingDate?: string | null;

  registerVat?: boolean | null;

  websiteUrl?: string | null;
  domainName?: string | null;

  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;

  createdAt?: string | null;
  createdBy?: string | null;
  createdById?: string | null;

  updatedAt?: string | null;
  updatedBy?: string | null;
  updatedById?: string | null;
};

const orgTypeLabel: Record<string, string> = {
  company_limited: "บริษัทจำกัด",
  public_company_limited: "บริษัทมหาชนจำกัด",
  partnership: "ห้างหุ้นส่วน",
  foundation: "มูลนิธิ",
  association: "สมาคม",
  taxpayer: "บุคคลธรรมดา",
};

const fromTypeLabel: Record<string, string> = {
  ordinary_person: "บุคคลธรรมดา",
  juristic_person: "นิติบุคคล",
};

const statusMap: Record<
  string,
  { label: string; className: string; icon?: React.ReactNode }
> = {
  active: {
    label: "ใช้งาน",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  inactive: {
    label: "ไม่ใช้งาน",
    className: "bg-slate-50 text-slate-700 border-slate-200",
  },
  pending: {
    label: "รอดำเนินการ",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  newly_registered: {
    label: "ลงทะเบียนใหม่",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

export const useOrganizationColumns = (): ColumnDef<OrganizationColumn>[] => {
  const columns = useMemo<ColumnDef<OrganizationColumn>[]>(
    () => [
      {
        accessorKey: "logoUrl",
        header: "โลโก้",
        cell: (info) => {
          const url = info.getValue() as string | null | undefined;

          return (
            <GlobalImage
              src={url || ""}
              alt="org-logo"
              width={60}
              height={60}
              className="rounded-xl object-cover object-center"
            />
          );
        },
      },
      {
        accessorKey: "nameTh",
        header: "ชื่อองค์กร",
        cell: (info) => {
          const id = info.row.original.id;
          const th = info.row.original.nameTh?.trim() || "";
          const en = info.row.original.nameEn?.trim() || "";
          const text = th || en || "-";

          return (
            <span className="text-blue-400 hover:text-blue-300 hover:underline">
              <Link to={`?organizationId=${id}`}>{text}</Link>
            </span>
          );
        },
      },
      {
        accessorKey: "code",
        header: "รหัสองค์กร",
        cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
      },
      {
        accessorKey: "taxId",
        header: "เลขผู้เสียภาษี",
        cell: (info) => {
          const v = info.getValue() as string;
          return <span>{formatTaxId(v)}</span>;
        },
      },
      {
        accessorKey: "fromType",
        header: "ประเภท",
        cell: (info) => {
          const v = info.getValue() as string | null | undefined;
          return <span>{(v && fromTypeLabel[v]) || v || "-"}</span>;
        },
      },
      {
        accessorKey: "orgType",
        header: "รูปแบบองค์กร",
        cell: (info) => {
          const v = info.getValue() as string | null | undefined;
          return <span>{(v && orgTypeLabel[v]) || v || "-"}</span>;
        },
      },
      {
        accessorKey: "registerVat",
        header: "จดทะเบียนภาษีมูลค่าเพิ่ม (VAT)",
        cell: (info) => {
          const v = info.getValue() as boolean | null | undefined;
          return (
            <div className="flex justify-center">
              {" "}
              <span
                className={`inline-flex items-center justify-center rounded-xl border py-1 px-3 text-sm font-medium w-fit whitespace-nowrap ${
                  v
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                {v ? "จดทะเบียน" : "ไม่จดจดทะเบียน"}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "websiteUrl",
        header: "เว็บไซต์",
        cell: (info) => {
          const url = (info.getValue() as string) || "";
          if (!url) return <span className="text-muted-foreground">-</span>;

          return (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:underline"
            >
              <Globe className="w-4 h-4" />
              <span className="truncate max-w-[260px]">{url}</span>
            </a>
          );
        },
      },
      {
        accessorKey: "contactEmail",
        header: "อีเมลติดต่อ",
        cell: (info) => {
          const email = (info.getValue() as string) || "";
          return email ? (
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              {email}
            </span>
          ) : (
            <span className="text-muted-foreground">-</span>
          );
        },
      },
      {
        accessorKey: "contactPhone",
        header: "เบอร์ติดต่อ",
        enableSorting: false,
        cell: (info) => {
          const phone = (info.getValue() as string) || "";
          return phone ? (
            <span className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {formatPhoneNumber(phone)}
            </span>
          ) : (
            <span className="text-muted-foreground">-</span>
          );
        },
      },
      {
        accessorKey: "openingDate",
        header: "วันที่เปิดกิจการ",
        cell: (info) => {
          const value = info.getValue() as string | null | undefined;
          return <span>{value ? formatDateTH(value) : "-"}</span>;
        },
      },
      {
        accessorKey: "active",
        header: "การใช้งาน",
        cell: (info) => {
          const v = info.getValue() as boolean | null | undefined;
          return (
            <span>
              <GlobalStatusBadge value={v ?? false} />
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "สถานะ",
        cell: (info) => {
          const status = (info.getValue() as string) || "";
          const current = statusMap[status] || {
            label: status || "-",
            className: "bg-slate-50 text-slate-700 border-slate-200",
            icon: null,
          };

          return (
            <div className="mt-1">
              <span
                className={`inline-flex items-center justify-center rounded-xl border py-1 px-3 text-sm font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors ${current.className}`}
              >
                {current.icon && (
                  <span className="w-3 h-3 flex items-center justify-center">
                    {current.icon}
                  </span>
                )}
                {current.label}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "วันที่สร้าง",
        enableSorting: true,
        cell: (info) => (
          <span>{formatDateAndTime((info.getValue() as string) || "")}</span>
        ),
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
        cell: (info) => (
          <span>{formatDateAndTime((info.getValue() as string) || "")}</span>
        ),
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
        cell: (info) => {
          const id = info.row.original.id;
          return (
            <div className="flex items-center gap-2">
              <Link to={`?organizationId=${id}`}>
                <Button
                  className="h-9 w-9 p-0 bg-[#737373] hover:bg-[#5E5E5E]"
                  aria-label="ดูรายละเอียด"
                  title="ดูรายละเอียด"
                >
                  <Eye className="w-4 h-4 text-white" />
                </Button>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  return columns;
};
