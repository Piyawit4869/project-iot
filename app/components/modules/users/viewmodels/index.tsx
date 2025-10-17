"use client";

import React, { useState } from "react";

import { DataTable } from "~/components/shared/data-table";

import { Button } from "~/components/ui/button";
import { FileDown, FileUp, Plus } from "lucide-react";

import GlobalButton from "~/components/shared/global-button";
import { cn } from "~/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useSidebar } from "~/components/ui/sidebar";
import { useUserColumns } from "../component/columns";
import { useAllUserSummary, usePaginate } from "~/api/client/user";
import { Link } from "react-router";
import { TabControl } from "~/components/shared/tab-control";
import { TabIndexTableUser, UserFilterFields } from "~/types/user/init-data";

export default function Users() {
  const { data: user, isLoading } = useAllUserSummary();
  const Paginate = usePaginate;

  const columns = useUserColumns();
  const { isMobile } = useSidebar();
  const [status, setStatus] = useState("all");

  const items = TabIndexTableUser(user);
  const handleChangeTab = (values: any) => {
    setStatus(values);
  };
  return (
    <div className="flex flex-col w-full space-y-8 p-8 dark:bg-background">
      <TabControl
        title="พนักงาน"
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
          <Link to={`/users/create`} key="create-link">
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
          Paginate({
            pageIndex,
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
        customerFilterFields={UserFilterFields}
        isCustomLoading={isLoading}
      />
    </div>
  );
}
