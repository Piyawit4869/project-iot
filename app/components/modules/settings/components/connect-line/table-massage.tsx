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
import { useLineMassagePaginate } from "~/api/client/settings";
import { LineMassageColumns } from "./columns-massage";
import { Link } from "react-router";

type MassageFilter = "all" | "starred" | "draft" | "published";

interface TableMassageProps {
  onCreate?: () => void;
  onEdit?: (id: string) => void;
  onSearch?: (q: string) => void;
  onFilterChange?: (f: MassageFilter) => void;
  defaultFilter?: MassageFilter;
}

export default function TableMassage({
  onCreate,
  onEdit,
  onSearch,
  onFilterChange,
  defaultFilter = "all",
}: TableMassageProps) {
  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState<MassageFilter>(defaultFilter);

  React.useEffect(() => {
    onFilterChange?.(filter);
  }, [filter]);

  const Paginate = useLineMassagePaginate;
  const columns = LineMassageColumns();

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">ข้อความตอบกลับ</h1>
          <p className="text-sm text-muted-foreground">
            คุณสามารถค้นหาและจัดการข้อความตอบกลับที่ใช้งานบ่อย
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
