import React, { useCallback, useMemo, useState } from "react";

import { DataTable } from "~/components/shared/data-table";
import { TabControl } from "~/components/shared/tab-control";
import { Button } from "~/components/ui/button";
import { FileDown, FileUp, Plus } from "lucide-react";

import GlobalButton from "~/components/shared/global-button";
import { cn } from "~/lib/utils";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { useSidebar } from "~/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  InventorysFilterFields,
  TabIndexTableinventorys,
} from "~/initData/inventory-initData";
import {
  useAllInventorysSummary,
  usePaginate,
} from "~/api/client/inventories/useInventoryQuery";
import { useInventoryColumnTable } from "./no-data/inventory-column-table";
import {
  parseDateRangeParam,
  pickSearchParams,
} from "../customer/utils/search-params";

export const InventoryIndexContainer = () => {
  const { data: categories, isLoading } = useAllInventorysSummary();

  const { isMobile } = useSidebar();
  const columns = useInventoryColumnTable();
  const navigate = useNavigate();
  const location = useLocation();
  const [sp, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState("all");
  const [tableKey, setTableKey] = useState(0);

  const filters = useMemo(
    () =>
      pickSearchParams(sp, [
        "name",
        "productCount",
        "productCanSale",
        "createdBy",
        "updatedBy",
      ]),
    [sp]
  );

  const created = parseDateRangeParam(sp, "createdAt") ?? {};
  const updated = parseDateRangeParam(sp, "updatedAt") ?? {};
  const createdFrom = created.fromDate;
  const createdTo = created.toDate;
  const updatedFrom = updated.fromDate;
  const updatedTo = updated.toDate;

  const items = TabIndexTableinventorys(categories);

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

  const paginate = usePaginate;

  return (
    <div className="flex flex-col w-full space-y-4 p-8 dark:bg-background">
      <TabControl
        title="คลังสินค้า"
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
            // className=" bg-blue-300 text-black hover:bg-blue-500 hover:text-white  px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
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
            // className=" bg-yellow-300 text-black hover:bg-yellow-500 hover:text-white px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
          />,
          <Link to={"/inventory/create"} key="create-link">
            <Button
              key="create-button"
              className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">&nbsp;สร้าง</span>
            </Button>
          </Link>,
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
            createdFrom,
            createdTo,
            updatedFrom,
            updatedTo,
          })
        }
        columns={columns}
        addOn={
          <Tabs
            value={status}
            onValueChange={handleChangeTab}
            className={cn("block ", isMobile && "hidden")}
          >
            <TabsList>
              {items &&
                items.length > 0 &&
                items.map((c) => (
                  <TabsTrigger
                    key={c.label}
                    value={c.status}
                    className="hover:bg-border relative px-2 py-2 !shadow-none !border-0 rounded-md after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black after:transition-all after:w-0 data-[state=active]:after:w-full"
                  >
                    {c.icon} {c.label} ({c.value})
                  </TabsTrigger>
                ))}
            </TabsList>
          </Tabs>
        }
        customerFilterFields={InventorysFilterFields}
        isCustomLoading={isLoading}
      />
    </div>
  );
};
