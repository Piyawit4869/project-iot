import { type ColumnDef } from "@tanstack/react-table";
import { PenLine } from "lucide-react";
import { Link } from "react-router";
import { usePaginateBranch } from "~/api/client/settings";
import { DataTable } from "~/components/shared/data-table";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";

import { TabControl } from "~/components/shared/tab-control";

import { Button } from "~/components/ui/button";
import { DateISOToDisplayDate } from "~/utils/date-format";

interface BranchPageProps {}

interface Task {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "done";
  dueDate: string;
}

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "logoUrl",
    header: "โลโก้",
    cell: (info) => {
      const url = info.getValue() as string;

      if (!url) return <span>No Image</span>;

      return (
        <img
          src={url}
          alt="item"
          width={60}
          height={60}
          className="rounded-xl"
        />
      );
    },
  },
  {
    accessorKey: "nameTh",
    header: "ชื่อสาขา",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {(info.getValue() as string) || "-"}
      </span>
    ),
  },
  {
    accessorKey: "taxId",
    header: "เลขประจำตัวผู้เสียภาษี",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {(info.getValue() as string) || "-"}
      </span>
    ),
  },
  {
    accessorKey: "domainName",
    header: "ชื่อโดเมน",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {(info.getValue() as string) || "-"}
      </span>
    ),
  },
  {
    accessorKey: "formType",
    header: "ประเภทฟอร์ม",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {(info.getValue() as string) || "-"}
      </span>
    ),
  },
  {
    accessorKey: "contactName",
    header: "ผู้ติดต่อ",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {(info.getValue() as string) || "-"}
      </span>
    ),
  },
  {
    accessorKey: "contactPhone",
    header: "เบอร์โทรผู้ติดต่อ",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {(info.getValue() as string) || "-"}
      </span>
    ),
  },
  {
    accessorKey: "branchStatus",
    header: "สถานะสาขา",
    cell: (info) => (
      <span className="text-sm text-muted-foreground">
        {(info.getValue() as string) || "-"}
      </span>
    ),
  },
  {
    accessorKey: "openingDate",
    header: "วันเปิดให้บริการ",
    cell: (info) => {
      const date = DateISOToDisplayDate(info.getValue() as string);
      return <span className="text-sm text-muted-foreground">{date}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "สถานะ",
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
    accessorKey: "",
    header: "องค์กร",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <div>
          {/* <Link to={`/setting-organization/branch/${id}`}>
            <Button
              className=" h-9 w-9 bg-[#737373] hover:bg-[#5E5E5E]"
              aria-label="แก้ไขสินค้า"
              title="แก้ไขสินค้า"
            >
              <PenLine className="w-4 h-4 text-white" />
            </Button>
          </Link> */}
          <div
            className="inline-flex items-center justify-center h-7 px-3 rounded-md bg-[#737373] text-white text-xs font-medium select-none"
            title="องค์กรในเครือ"
          >
            องค์กรในเครือ
          </div>
        </div>
      );
    },
  },
];

export const Branch: React.FC<BranchPageProps> = (props) => {
  return (
    <div className="flex flex-col w-full space-y-8">
      <TabControl title="สาขา" noneSticky={true} />
      {/* เปลี่ยน queryFunction  */}
      <DataTable
        queryFunction={usePaginateBranch}
        columns={columns}
        offFilter={true}
      />
    </div>
  );
};
