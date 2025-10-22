import { type ColumnDef } from "@tanstack/react-table";
import { TabControl } from "~/components/shared/tab-control";
import { DataTable } from "~/components/shared/data-table";
import { formatDateAndTime } from "~/components/shared/global-format";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import type { LogEntry } from "~/types/login-log";
import { useLoginLogPaginate } from "~/api/client/login-log/useGetLoginLog";
import { ActivityFilterFields } from "./filter";
import { useMemo } from "react";
import {
  parseDateRangeParam,
  pickSearchParams,
} from "~/components/modules/customer/utils/search-params";
import { useSearchParams } from "react-router";

const columns: ColumnDef<LogEntry>[] = [
  {
    accessorKey: "metadata.name",
    header: "ชื่อ",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {(info.getValue() as string) ?? "-"}
      </span>
    ),
  },
  {
    accessorKey: "metadata.email",
    header: "อีเมล",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {(info.getValue() as string) ?? "-"}
      </span>
    ),
  },
  // {
  //   accessorKey: "event",
  //   header: "Event",
  //   cell: (info) => (
  //     <span className="text-sm text-muted-foreground">
  //       {(info.getValue() as string) ?? "-"}
  //     </span>
  //   ),
  // },
  {
    accessorKey: "event",
    header: "Event",
    cell: (info) => {
      const value = (info.getValue() as string) ?? "-";

      // ตรวจสอบข้อความ
      let displayText = value;
      if (value.toLowerCase().includes("in")) {
        if (value.toLowerCase().includes("out")) {
          displayText = "Sign Out";
        } else {
          displayText = "Sign In";
        }
      }

      return (
        <span className="text-sm text-muted-foreground">{displayText}</span>
      );
    },
  },

  {
    accessorKey: "metadata.role.status",
    header: "สถานะ",
    enableSorting: true,
    cell: (info) => {
      const status = info.getValue() as string;
      return <GlobalStatusBadge value={status} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "วันที่เข้าสู่ระบบ",
    enableSorting: true,
    cell: (info) => (
      <span>{formatDateAndTime((info.getValue() as string) ?? "-")}</span>
    ),
  },
  {
    accessorKey: "metadata.location",
    header: "สถานที่",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {(info.getValue() as string) ?? "-"}
      </span>
    ),
  },
  {
    accessorKey: "metadata.ip",
    header: "IP",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {(info.getValue() as string) ?? "-"}
      </span>
    ),
  },

  {
    accessorKey: "metadata.os",
    header: "ระบบปฏิบัติการ",
    cell: (info) => {
      const value = info.getValue();

      if (value && typeof value === "object" && !Array.isArray(value)) {
        const os = value as {
          name?: string;
          version?: string;
          platform?: string;
        };
        const label = [os.name, os.version, os.platform]
          .filter(Boolean)
          .join(" ");
        return (
          <span className="text-sm text-muted-foreground">{label || "-"}</span>
        );
      }

      if (Array.isArray(value)) {
        return (
          <div className="flex flex-wrap gap-1">
            {value.map((item, idx) => {
              if (typeof item === "string") {
                return (
                  <span key={idx} className="text-sm text-muted-foreground">
                    {item}
                  </span>
                );
              }
              if (item && typeof item === "object") {
                const os = item as {
                  name?: string;
                  version?: string;
                  platform?: string;
                };
                const label = [os.name, os.version, os.platform]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <span key={idx} className="text-sm text-muted-foreground">
                    {label ?? "-"}
                  </span>
                );
              }
              return (
                <span key={idx} className="text-sm text-muted-foreground">
                  {String(item)}
                </span>
              );
            })}
          </div>
        );
      }

      return (
        <span className="text-sm text-muted-foreground">
          {(value as string) ?? "-"}
        </span>
      );
    },
  },

  {
    accessorKey: "metadata.browser",
    header: "บราวเซอร์",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {(info.getValue() as string) ?? "-"}
      </span>
    ),
  },
];

export default function Loginlog() {
  const paginate = useLoginLogPaginate;
  const [sp] = useSearchParams();
  const filters = useMemo(
    () =>
      pickSearchParams(sp, [
        "name",
        "email",
        "event",
        "createdFrom",
        "createdTo",
      ]),
    [sp]
  );
  const created = parseDateRangeParam(sp, "createdAt") ?? {};
  const createdFrom = created.fromDate;
  const createdTo = created.toDate;
  return (
    <div className="flex flex-col w-full space-y-8 p-8">
      <TabControl title="ประวัติการเข้าสู่ระบบ" buttons={[]} />
      <DataTable
        queryFunction={({ pageIndex, pageSize }) =>
          paginate({
            pageIndex,
            pageSize,
            ...filters,
            createdFrom,
            createdTo,
          } as any)
        }
        columns={columns}
        customerFilterFields={ActivityFilterFields}
      />
    </div>
  );
}
