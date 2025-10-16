"use client";

import React from "react";

import { Plus, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
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

type MassageFilter = "all" | "starred" | "draft" | "published";

interface LineMassagePageProps {
  total?: number; // จำนวนทั้งหมด เช่น 47
  onCreate?: () => void; // กดปุ่ม + สร้างใหม่
  onSearch?: (q: string) => void;
  onFilterChange?: (f: MassageFilter) => void;
  defaultFilter?: MassageFilter;
  /** คุณจะยัดตารางของคุณเองลงมาใน children ได้เลย */
  children?: React.ReactNode;
}

export default function LineMassagePageShell({
  total = 0,
  onCreate,
  onSearch,
  onFilterChange,
  defaultFilter = "all",
  children,
}: LineMassagePageProps) {
  const [q, setQ] = React.useState("");
  const [filter, setFilter] = React.useState<MassageFilter>(defaultFilter);

  React.useEffect(() => {
    onFilterChange?.(filter);
  }, [filter]);

  const Paginate = useLineMassagePaginate;
  const columns = LineMassageColumns();

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">ข้อความตอบกลับ</h1>
        <p className="text-sm text-muted-foreground">
          คุณสามารถค้นหาและจัดการข้อความตอบกลับที่ใช้งานบ่อย
          เพื่อความรวดเร็วในการตอบกลับลูกค้า
        </p>
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
          <div className="relative w-full md:w-[280px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch?.(q.trim());
              }}
              placeholder="ใส่ชื่อข้อความตอบกลับ"
              className="pl-8"
              aria-label="ค้นหาข้อความตอบกลับ"
            />
          </div>
          <Button
            onClick={() => onSearch?.(q.trim())}
            variant="default"
            type="button"
            className="whitespace-nowrap"
          >
            ค้นหา
          </Button>

          <Button
            onClick={() => {}}
            type="button"
            className="ml-1 whitespace-nowrap"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            สร้างใหม่
          </Button>
        </div>
      </div>

      <div className="rounded-xl ">
        <DataTable
          queryFunction={({ pageIndex, pageSize }) =>
            Paginate({
              pageIndex,
              pageSize,
              limit: pageSize,
            })
          }
          columns={columns}
        />
      </div>
    </div>
  );
}
