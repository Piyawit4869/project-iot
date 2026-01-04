"use client";

import React from "react";
import { MessageCircle, Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/shared/data-table";
import {
  useDeleteQuickReply,
  useLineCreateReplyMessage,
  useLineMassagePaginate,
  useQuickReplyMessagePaginate,
} from "~/api/client/settings";

import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "sonner";
import { ApiConfig } from "~/api/config";
import { useQueryClient } from "@tanstack/react-query";
import { LineMassageColumns } from "../connect-line/columns-massage";
import { GlobalModal } from "~/components/shared/modal/modal";

type MassageFilter = "all" | "starred" | "draft" | "published";

interface TableMassageProps {
  onCreate?: () => void;
  onEdit?: (id: string) => void;
  onSearch?: (q: string) => void;
  onFilterChange?: (f: MassageFilter) => void;
  defaultFilter?: MassageFilter;
}

export default function QuickReplayMassageTable({
  onCreate,
  onEdit,
  onSearch,
  onFilterChange,
  defaultFilter = "all",
}: TableMassageProps) {
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const subId = searchParams.get("subId") ?? "";

  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState<MassageFilter>(defaultFilter);

  const { mutate: deleteQuickReply } = useDeleteQuickReply();

  const onDelete = () => {
    GlobalModal.delete({
      title: "ยืนยันการข้อความอัตโนมัติใช่หรือไม่",
      description: "คุณต้องการลบข้อความอัตโนมัติใช่หรือไม่?",
      confirmText: "ลบ",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังข้อความอัตโนมัติ...", {
          position: "bottom-right",
        });
        deleteQuickReply(subId, {
          onSuccess: () => {
            toast.success("ลบข้อความอัตโนมัติเรียบร้อยแล้ว !", {
              id: toastId,

              duration: 2500,
              position: "bottom-right",
            });
            // navigate(`/customer`);
          },
          onError: () => {
            toast.error("ไม่สามารถลบข้อความอัตโนมัติ", {
              id: toastId,
              // description: message,
              duration: 3000,
              position: "bottom-right",
            });
          },
        });
      },
    });
  };

  React.useEffect(() => {
    onFilterChange?.(filter);
  }, [filter]);

  const Paginate = useQuickReplyMessagePaginate;
  const columns = LineMassageColumns(onDelete);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">ข้อความอัตโนมัติ</h1>
          <p className="text-sm text-muted-foreground">
            คุณสามารถค้นหาและจัดการข้อความอัตโนมัติที่ใช้งานบ่อย
            เพื่อความรวดเร็วในการตอบกลับลูกค้า
          </p>
        </div>

        <Link to="/message" key="link">
          <Button
            key="button"
            variant="outline"
            className="flex items-center gap-2 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">กลับไปที่แชท</span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Select
            value={filter}
            onValueChange={(v: MassageFilter) => setFilter(v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="ทั้งหมด" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="starred">เฉพาะติดดาว</SelectItem>
              <SelectItem value="draft">แบบร่าง</SelectItem>
              <SelectItem value="published">เผยแพร่</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full md:w-auto items-center gap-2">
          {/* <div className="relative w-full md:w-[280px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch?.(q.trim())}
              placeholder="ใส่ชื่อข้อความตอบกลับ"
              className="pl-8"
              aria-label="ค้นหาข้อความตอบกลับ"
            />
          </div>
          <Button
            onClick={() => onSearch?.(q.trim())}
            type="button"
            className="whitespace-nowrap"
          >
            ค้นหา
          </Button> */}

          <Button
            onClick={onCreate}
            type="button"
            className="ml-1 whitespace-nowrap"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            สร้างใหม่
          </Button>
        </div>
      </div>

      <div className="rounded-xl">
        <DataTable
          queryFunction={({ pageIndex, pageSize }) =>
            Paginate({ pageIndex, pageSize, limit: pageSize })
          }
          columns={columns}
        />
      </div>
    </div>
  );
}
