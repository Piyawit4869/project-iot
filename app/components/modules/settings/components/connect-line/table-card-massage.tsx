"use client";

import React, { useEffect } from "react";
import { MessageCircle, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/shared/data-table";
import { useLineCardContentPaginate } from "~/api/client/settings";
import { LineMassageColumns } from "./columns-massage";
import { Link, useNavigate } from "react-router";
import { ApiConfig } from "~/api/config";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type MassageFilter = "" | "all" | "product" | "person" | "place" | "image";

interface TableMassageProps {
  onCreate?: () => void;
  onEdit?: (id: string) => void;
  onSearch?: (q: string) => void;
  onDelete?: () => void;
  onFilterChange?: (f: MassageFilter) => void;
  defaultFilter?: MassageFilter;
}

export default function TableCardMassage({
  onCreate,
  onEdit,
  onSearch,
  onDelete,
  onFilterChange,
  defaultFilter = "all",
}: TableMassageProps) {
  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState<string>(defaultFilter);
  const queryClient = useQueryClient();
  const Paginate = useLineCardContentPaginate;

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("กำลังดำเนินการ...");
    try {
      await ApiConfig.delete(`/thirdparty/line/contents/${id}`);
      toast.success("ลบการ์ดเมสเสจสำเร็จ", {
        id: toastId,
        duration: 2000,
        position: "bottom-right",
      });
      queryClient.invalidateQueries({
        queryKey: ["customer-paginate"],
      });
    } catch (error) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "เกิดข้อผิดพลาดขณะลบการ์ดเมสเสจ";
      toast.error(message, {
        id: toastId,
        duration: 2500,
        position: "bottom-right",
      });
    }
  };
  const columns = LineMassageColumns(handleDelete);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["customer-paginate"],
    });
  }, [filter]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">การ์ดเมสเสจ</h1>
          <p className="text-sm text-muted-foreground">
            คุณสามารถค้นหาและจัดการการ์ดเมสเสจที่ใช้งานบ่อย
            เพื่อความรวดเร็วในการตอบกลับลูกค้า
          </p>
        </div>

        <Link to="/message" key="link">
          <Button
            key="button"
            variant="outline"
            className="flex items-center gap-2 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">กลับไปที่แชท</span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={(v: MassageFilter) => {}}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="ทั้งหมด" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="product">สินค้า</SelectItem>
              <SelectItem value="place">สถานที่</SelectItem>
              <SelectItem value="person">บุคคล</SelectItem>
              <SelectItem value="image">รูปภาพ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full md:w-auto items-center gap-2">
          <Button
            onClick={onCreate}
            type="button"
            className="ml-1 whitespace-nowrap">
            <Plus className="mr-1.5 h-4 w-4" />
            สร้างใหม่
          </Button>
        </div>
      </div>

      <div className="rounded-xl">
        <DataTable
          queryFunction={({ pageIndex, pageSize }) =>
            Paginate({
              pageIndex,
              pageSize,
              limit: pageSize,
              filter: { category: filter },
            })
          }
          columns={columns}
        />
      </div>
    </div>
  );
}
