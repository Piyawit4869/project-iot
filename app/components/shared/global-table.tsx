import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { formatForNumber } from "./global-format";

interface TablePaginationProps<TData> {
  table: Table<TData>;
  data?: number; // total items
  pageParamKey?: string; // default: "page"
  sizeParamKey?: string; // default: "size"
}

export function TablePagination<TData>({
  table,
  data,
  pageParamKey = "page",
  sizeParamKey = "limit",
}: TablePaginationProps<TData>) {
  const navigate = useNavigate();

  const location = useLocation();
  const pathname = location.pathname;

  const [sp] = useSearchParams();
  const params = useParams();
  const id = params?.id as string;

  // --- helpers ------------------------------------------------------
  const updateUrl = (pageIndex0: number, pageSize: number) => {
    const next = new URLSearchParams(id?.toString() ?? "");
    next.set(pageParamKey, String(pageIndex0 + 1)); // 1-based in URL
    next.set(sizeParamKey, String(pageSize));
    navigate(`${pathname}?${next.toString()}`, { preventScrollReset: true });
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setPageIndex = (i: number) => {
    const size = table.getState().pagination.pageSize;
    table.setPageIndex(i);
    updateUrl(i, size);
  };

  const setPageSize = (s: number) => {
    // when size changes, reset to first page for consistency
    table.setPageSize(s);
    table.setPageIndex(0);
    updateUrl(0, s);
  };

  // --- initialize from URL once ------------------------------------
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const pageFromUrl = Number(sp.get(pageParamKey));
    const sizeFromUrl = Number(sp.get(sizeParamKey));

    const current = table.getState().pagination;

    const pageIndex0 =
      Number.isFinite(pageFromUrl) && pageFromUrl > 0
        ? pageFromUrl - 1
        : current.pageIndex;

    const pageSize =
      Number.isFinite(sizeFromUrl) && sizeFromUrl > 0
        ? sizeFromUrl
        : current.pageSize;

    // Apply without writing back to URL on first mount
    if (pageSize !== current.pageSize) table.setPageSize(pageSize);
    if (pageIndex0 !== current.pageIndex) table.setPageIndex(pageIndex0);
  }, [sp, pageParamKey, sizeParamKey, table]);

  // --- derived values -----------------------------------------------
  const totalItems = data ?? table.getFilteredRowModel().rows.length;
  const { pageIndex, pageSize } = table.getState().pagination;
  const canPrev = table.getCanPreviousPage();
  const canNext = table.getCanNextPage();
  const pageCount = table.getPageCount();

  return (
    <div className="flex flex-col gap-4 items-start justify-between px-2 md:flex-col lg:flex-row lg:items-center">
      <div className="text-sm text-muted-foreground whitespace-nowrap break-words max-w-full">
        {table.getFilteredRowModel().rows.length} รายการ จากทั้งหมด{" "}
        {formatForNumber(totalItems)} รายการ
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">จำนวน</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 50, 100].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center text-sm font-medium">
          หน้า {pageIndex + 1} จาก {pageCount}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            className="h-8 w-8 p-0 hidden sm:flex"
            onClick={() => setPageIndex(0)}
            disabled={!canPrev}
          >
            {/* <span className="sr-only">Go to first page</span> */}
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={!canPrev}
          >
            {/* <span className="sr-only">Go to previous page</span> */}
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={!canNext}
          >
            {/* <span className="sr-only">Go to next page</span> */}
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 hidden sm:flex"
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={!canNext}
          >
            {/* <span className="sr-only">Go to last page</span> */}
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
