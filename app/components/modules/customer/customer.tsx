import { useState } from "react";

import { FileDown, FileUp, Plus } from "lucide-react";

import { useSidebar } from "~/components/ui/sidebar";
import GlobalButton from "~/components/shared/global-button";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

import { useCustomerColumns } from "./components/columns";

import { customerFilterFields } from "./utils/filter";
import { TabIndexTable } from "./utils/tab-index-table";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import { DataTable } from "~/components/shared/data-table";
import {
  useAllCustomerSummary,
  useCustomerPaginate,
} from "~/api/client/customer/useCustomer";
import { TabControl } from "~/components/shared/tab-control";

export default function Customer() {
  const { data: categories, isLoading } = useAllCustomerSummary();
  const { isMobile } = useSidebar();
  const customerPaginate = useCustomerPaginate;

  const columns = useCustomerColumns();
  const [status, setStatus] = useState("all");

  const items = TabIndexTable(categories);

  const handleChangeTab = (values: any) => {
    setStatus(values);
  };

  return (
    <div className="flex flex-col w-full space-y-4 p-8 dark:bg-background">
      <TabControl
        title="ลูกค้า"
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
          />,
          <Link to="/customer/create" key="create-link">
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
        queryFunction={({ pageIndex, pageSize }) =>
          customerPaginate({
            pageIndex,
            pageSize,
            status: status === "all" ? "" : status,
            limit: pageSize,
          })
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
                  className="hover:bg-gray-200 relative px-4 py-2 !shadow-none !border-0 rounded-md after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black after:transition-all after:w-0 data-[state=active]:after:w-full"
                >
                  {c.icon} {c.label} ({c.value})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        }
        customerFilterFields={customerFilterFields}
        isCustomLoading={isLoading}
      />
    </div>
  );
}
