import { useState, useCallback, useMemo } from "react";
import { FileDown, FileUp, Plus } from "lucide-react";
import { useSidebar } from "~/components/ui/sidebar";
import GlobalButton from "~/components/shared/global-button";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import { useCustomerColumns } from "./components/columns";
import { customerFilterFields } from "./utils/filter";
import { TabIndexTable } from "./utils/tab-index-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import { DataTable } from "~/components/shared/data-table";
import {
  useAllCustomerSummary,
  useCustomerPaginate,
} from "~/api/client/customer/useCustomer";
import { TabControl } from "~/components/shared/tab-control";
import { parseDateRangeParam, pickSearchParams } from "./utils/search-params";

export default function Customer() {
  const { data: categories, isLoading } = useAllCustomerSummary();
  const { isMobile } = useSidebar();
  const customerPaginate = useCustomerPaginate;

  const navigate = useNavigate();
  const location = useLocation();
  const [sp, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState("all");
  const [tableKey, setTableKey] = useState(0);

  const columns = useCustomerColumns();

  const filters = useMemo(
    () =>
      pickSearchParams(sp, [
        "name",
        "fullname",
        "customerPlatform",
        "priority",
        "tags",
        "customerType",
        "phone",
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

  const items = TabIndexTable(categories);

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

      <Tabs
        defaultValue="allCustomer"
        className={cn("block", isMobile && "hidden")}
      >
        <TabsList>
          <TabsTrigger
            value="allCustomer"
            className="hover:bg-border mb-3 relative px-4 py-2 !shadow-none !border-0 rounded-md after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black after:transition-all after:w-0 data-[state=active]:after:w-full"
          >
            ลูกค้าทั้งหมด
          </TabsTrigger>
          <TabsTrigger
            value="ordinary_person"
            className="hover:bg-border  mb-3  relative px-4 py-2 !shadow-none !border-0 rounded-md after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black after:transition-all after:w-0 data-[state=active]:after:w-full"
          >
            ลูกค้าบุคคลธรรมดา
          </TabsTrigger>
          <TabsTrigger
            value="juristic_person"
            className="hover:bg-border  mb-3  relative px-4 py-2 !shadow-none !border-0 rounded-md after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black after:transition-all after:w-0 data-[state=active]:after:w-full"
          >
            ลูกค้านิติบุคคล
          </TabsTrigger>
        </TabsList>

        <TabsContent value="allCustomer">
          <DataTable
            queryFunction={({ pageIndex, pageSize }) =>
              customerPaginate({
                pageIndex,
                pageSize,
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
              <Tabs defaultValue="all" onValueChange={handleChangeTab}>
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
            customerFilterFields={customerFilterFields}
            isCustomLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="ordinary_person">
          <DataTable
            queryFunction={({ pageIndex, pageSize }) =>
              customerPaginate({
                pageIndex,
                pageSize,
                status: status === "all" ? "" : status,
                customerType: "ordinary_person",
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
              <Tabs defaultValue="all" onValueChange={handleChangeTab}>
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
            customerFilterFields={customerFilterFields}
            isCustomLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="juristic_person">
          <DataTable
            queryFunction={({ pageIndex, pageSize }) =>
              customerPaginate({
                pageIndex,
                pageSize,
                status: status === "all" ? "" : status,
                limit: pageSize,
                customerType: "juristic_person",
                ...filters,
                createdFrom,
                createdTo,
                updatedFrom,
                updatedTo,
              } as any)
            }
            columns={columns}
            addOn={
              <Tabs defaultValue="all" onValueChange={handleChangeTab}>
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
            customerFilterFields={customerFilterFields}
            isCustomLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
