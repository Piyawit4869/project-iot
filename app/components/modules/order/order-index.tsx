"use client";

import { FileDown, FileUp, Plus } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useAllOrderSummary } from "~/api/client/order/useGetOrder";
import { DataTable } from "~/components/shared/data-table";
import GlobalButton from "~/components/shared/global-button";
import { TabControl } from "~/components/shared/tab-control";
import { Button } from "~/components/ui/button";
import { useSidebar } from "~/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import { OrderFilterFields, TabIndexTableOrder } from "~/schemas/order/type";
import { useOrderViewModel } from "./viewmodels/useOrderViewModel";
import { useOrderColumns } from "./components/columns";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import React from "react";
import { pickSearchParams } from "../customer/utils/search-params";

export default function OrdersIndex() {
  const {
    orderPagination,
    actions: { onNavigateCreate },
  } = useOrderViewModel();
  const navigate = useNavigate();
  const location = useLocation();
  const [sp, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState("all");
  const [tableKey, setTableKey] = useState(0);

  const filters = useMemo(
    () =>
      pickSearchParams(sp, [
        "status",
        "docName",
        "docNo",
        "name",
        "profit",
        "total",
        "docStatus",
      ]),
    [sp]
  );

  const { data: Order, isLoading } = useAllOrderSummary();
  const { isMobile } = useSidebar();

  const items = TabIndexTableOrder(Order);

  const clearAllFilters = useCallback(() => {
    setSearchParams({});

    navigate(location.pathname, { replace: true });
  }, [setSearchParams, navigate, location.pathname]);

  const handleChangeTab = (val: string) => {
    const hadQuery = sp.toString().length > 0;
    setStatus(val);
    clearAllFilters();
    if (hadQuery) {
      setTableKey((k) => k + 1);
    }
  };

  const columns = useOrderColumns();
  const paginate = orderPagination;

  return (
    <div className="flex flex-col w-full space-y-8 p-8 md-fiex sm-flex  dark:bg-background">
      <TabControl
        title="ออเดอร์"
        buttons={[
          <GlobalButton
            label={
              <>
                <FileDown className="h-4 w-4" />
                <span className="hidden sm:inline">&nbsp;นำเข้าข้อมูล</span>
              </>
            }
            variant="outline"
            disabled
            key="import-button"
            // className="bg-blue-300 text-black hover:bg-blue-500 hover:text-white px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
          />,
          <GlobalButton
            label={
              <>
                <FileUp className="h-4 w-4" />
                <span className="hidden sm:inline">&nbsp;นำออกข้อมูล</span>
              </>
            }
            variant="outline"
            disabled
            key="export-button"
            // className="bg-yellow-300 text-black hover:bg-yellow-500 hover:text-white px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
          />,
          <Button
            key="create-button"
            onClick={onNavigateCreate}
            className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">&nbsp;สร้าง</span>
          </Button>,
        ]}
      />

      <DataTable
        key={tableKey}
        queryFunction={({ pageIndex, pageSize }) =>
          paginate({
            pageIndex,
            pageSize,
            status: status === "all" ? "" : status,
            limit: pageSize,
            ...filters,
          } as any)
        }
        columns={columns}
        addOn={
          <Tabs
            value={status}
            onValueChange={handleChangeTab}
            className={cn("block", isMobile && "hidden")}
          >
            <TabsList>
              {items.map((c) => (
                <TabsTrigger
                  key={c.label}
                  value={c.status}
                  className="hover:bg-border relative px-4 py-2 !shadow-none !border-0 rounded-md after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black after:transition-all after:w-0 data-[state=active]:after:w-full"
                >
                  {c.icon} {c.label} ({c.value})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        }
        customerFilterFields={OrderFilterFields}
        isCustomLoading={isLoading}
      />
    </div>
  );
}
