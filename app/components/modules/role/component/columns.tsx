import { GlobalImage } from "~/components/shared/global-image";
import { Eye, Trash } from "lucide-react";
import { useMemo } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

import type { UserColumn } from "~/types/user/type-user";
import { statusMap } from "~/types/user/init-data";
import {
  formatDateAndTime,
  formatDateTH,
  formatPhoneNumber,
} from "~/components/shared/global-format";
import GlobalButton from "~/components/shared/global-button";

export const useRolesColumns = (): ColumnDef<UserColumn>[] => {
  const columns = useMemo<ColumnDef<UserColumn>[]>(
    () => [
      {
        accessorKey: "name",
        header: "ชื่อ",
        cell: (info) => {
          const id = info.row.original.id;

          return (
            <span className="text-blue-400 hover:text-blue-300 hover:underline">
              <Link to={`/roles/${id}`}>
                {(info.getValue() as string) || "-"}
              </Link>
            </span>
          );
        },
      },
      {
        accessorKey: "description",
        header: "รายละเอียด",
        cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
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
        cell: (info) => {
          const id = info.row.original.id;

          return (
            <div className="flex items-center gap-2">
              <Link to={`/roles/${id}`}>
                <Button
                  type="button"
                  className="h-9 w-9 p-0 bg-[#737373] hover:bg-[#5E5E5E]"
                  aria-label="ดูรายละเอียดตำแหน่ง"
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

export const useUserColumns = (
  opts: {
    onView?: (userId: string) => void;
    onRemove?: (userId: string) => void;
  } = {}
): ColumnDef<UserColumn>[] => {
  const { onView, onRemove } = opts;

  const columns = useMemo<ColumnDef<UserColumn>[]>(
    () => [
      {
        accessorKey: "profile.imageUrl",
        header: "รูปภาพ",
        cell: (info) => {
          const url = info.getValue() as string;
          const userName = info.row.original?.userName;
          console.log(
            "row.profile.imageUrl =",
            info.row.original?.profile?.imageUrl
          );

          return (
            <GlobalImage
              src={url}
              alt="user-image"
              width={60}
              height={60}
              className="rounded-xl w-[60px] h-[60px] object-cover object-center"
              fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${userName}`}
            />
          );
        },
      },
      {
        accessorKey: "profile",
        header: "ชื่อ",
        cell: (info) => {
          const id = info.row.original.id;
          const nickName = info.row.original.profile?.nickName
            ? `( ${info.row.original.profile?.nickName} )`
            : "";

          const fullName = `${info.row.original.profile?.prefix || ""} ${
            info.row.original.profile?.firstName || ""
          } ${info.row.original.profile?.lastName || ""} ${nickName || ""}`.trim();

          return (
            <span className="text-blue-400 hover:text-blue-300 hover:underline">
              <Link to={`/users/${id}`}>{fullName || "-"}</Link>
            </span>
          );
        },
      },
      {
        accessorKey: "userName",
        header: "User Name",
        cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
      },
      {
        accessorKey: "email",
        header: "อีเมล",
        minSize: 600,
        cell: (info) => (
          <span className="text-muted-foreground">
            {(info.getValue() as string) || "-"}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "สถานะ",
        cell: (info) => {
          const status = info.getValue() as string;

          const current = statusMap[status] || {
            label: status || "-",
            icon: null,
            className: "",
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
        accessorKey: "phone",
        header: "เบอร์โทรศัพท์",
        enableSorting: false,
        cell: (info) => {
          const phone = info.row.original.profile?.phone as string;
          return <span>{phone ? formatPhoneNumber(phone) : "-"}</span>;
        },
      },
      {
        accessorKey: "departmentName",
        header: "แผนก",
        cell: (info) => <span>{(info.getValue() as string) || "-"}</span>,
      },
      {
        accessorKey: "gender",
        header: "เพศ",
        cell: (info) => {
          const genderMap: Record<string, string> = {
            male: "ชาย",
            female: "หญิง",
            not_specified: "ไม่ระบุ",
          };
          const value = info.row.original.profile?.gender as string;
          return <span>{genderMap[value] ?? "-"}</span>;
        },
      },
      {
        accessorKey: "birthDate",
        header: "วัน / เดือน / ปีเกิด",
        cell: (info) => {
          const value = info.row.original.profile?.birthDate as string;
          return <span>{formatDateTH(value)}</span>;
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
        cell: (info) => {
          const id = info.row.original.id;
          return (
            // <div className="flex items-center gap-2 w-full">
            //   <Link to={`/users/${id}`}>
            //     <Button
            //       className="w-full p-0 bg-[#737373] hover:bg-[#5E5E5E]"
            //       aria-label="แก้ไข"
            //       title="แก้ไข"
            //     >
            //       <Eye className=" text-white" />
            //     </Button>
            //   </Link>

            <div className="w-auto">
              <Link to={`/users/${id}`}>
                <GlobalButton
                  label=""
                  icon={<Eye className="w-4 h-4 text-white" />}
                  onClick={() => {}}
                  className="h-10 w-10 p-0 bg-[#737373] text-white hover:bg-[#E8594B] hover:text-white transition-colors"
                  aria-label="ลบ"
                  disabled
                />
              </Link>
            </div>
            // </div>
          );
        },
      },
      {
        id: "remove",
        header: "ลบพนักงาน",
        cell: (info) => {
          const userId = info.row.original.id;

          return (
            <div className="w-auto">
              <GlobalButton
                label=""
                icon={<Trash className="w-4 h-4 text-white" />}
                onClick={() => onRemove?.(userId)}
                className="h-10 w-10 p-0 bg-[#FF7062] text-white hover:bg-[#E8594B] hover:text-white transition-colors"
                aria-label="ลบออกจากตำแหน่ง"
                disabled={!onRemove}
                type="button"
              />
            </div>
          );
        },
      },
    ],
    [onView, onRemove]
  );

  return columns;
};
