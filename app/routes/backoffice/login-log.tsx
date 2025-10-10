import { type ColumnDef } from "@tanstack/react-table";
import { TabControl } from "~/components/shared/tab-control";
import { DataTable } from "~/components/shared/data-table";
import { formatDateAndTime } from "~/components/shared/global-format";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import type { LogEntry } from "~/types/login-log";
import { useLoginLogPaginate } from "~/api/client/login-log/useGetLoginLog";

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
    header: "วันที่สร้าง",
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
  return (
    <div className="flex flex-col w-full space-y-8 p-8">
      <TabControl title="ประวัติการเข้าสู่ระบบ" buttons={[]} />
      <DataTable queryFunction={paginate} columns={columns} />
    </div>
  );
}
