import { useState } from "react";

import { DataTable } from "~/components/shared/data-table";
import { TabControl } from "~/components/shared/tab-control";
import { Button } from "~/components/ui/button";
import { FileDown, FileUp, Plus } from "lucide-react";

import GlobalButton from "~/components/shared/global-button";
import { cn } from "~/lib/utils";
import { Link, useSearchParams } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useSidebar } from "~/components/ui/sidebar";
import { useProductColumnTable } from "./product-column-table";
import {
  ProductsFilterFields,
  TabIndexTableProducts,
} from "~/initData/product-init-data";
import {
  useAllProductsSummary,
  useProductPaginate,
} from "~/api/client/products/useGetProducts";
import React from "react";
import {
  parseDateRangeParam,
  pickSearchParams,
} from "../customer/utils/search-params";

export const ProductIndexContainer = () => {
  const { data: categories, isLoading } = useAllProductsSummary();
  const columns = useProductColumnTable();

  const { isMobile } = useSidebar();

  const [status, setStatus] = useState("all");
  const [sp] = useSearchParams();
  const filters = React.useMemo(
    () =>
      pickSearchParams(sp, [
        "sku",
        "name",
        "barcode",
        "available",
        "availableForSale",
        "matType",
        "salePrice",
        "vatPrice",
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

  const items = TabIndexTableProducts(categories);
  const handleChangeTab = (values: any) => {
    setStatus(values);
  };

  const paginate = useProductPaginate;

  return (
    <div className="flex flex-col w-full space-y-4 p-8 dark:bg-background">
      <TabControl
        title="สินค้า"
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
          <Link to="/products/create" key="create-link">
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
        queryFunction={({ pageIndex, pageSize, sorting = [] }) =>
          paginate({
            pageIndex,
            pageSize,
            sorting,
            status: status === "all" ? "" : status,
            limit: pageSize,
            ...filters,
            createdFrom,
            createdTo,
            updatedFrom,
            updatedTo,
          } as any)
        }
        columns={columns}
        addOn={
          <Tabs
            defaultValue="all"
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
        customerFilterFields={ProductsFilterFields}
        isCustomLoading={isLoading}
      />
    </div>
  );
};
