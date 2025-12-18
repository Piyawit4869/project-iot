"use client";

import { TabControl } from "~/components/shared/tab-control";
import { Plus } from "lucide-react";
import { DataTable } from "~/components/shared/data-table";
import { usePaginate } from "~/api/client/user";
import { OnboardFilterFields } from "~/types/onboard/filter";
import { Button } from "~/components/ui/button";
import React from "react";
import { useOnboardColumns } from "../components/Management/columns";
import CreateTempletDialog from "../components/Management/modaldialog";

export default function OnBoardingManagementIndex() {
  const paginate = usePaginate;
  const columns = useOnboardColumns();
  const [openTemplate, setTemplatePoOpen] = React.useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col w-full space-y-4 p-8 dark:bg-background">
        <TabControl
          title="จัดการหลักสูตร On-Boarding"
          backpath="/on-boarding"
          buttons={[
            <Button
              onClick={() => setTemplatePoOpen(true)}
              key="create-button"
              className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">&nbsp;สร้าง</span>
            </Button>,
          ]}
        />
        <CreateTempletDialog
          openTemplate={openTemplate}
          setOpen={setTemplatePoOpen}
        />
        <DataTable
          // queryFunction={(res) =>
          //   paginate({
          //     pageIndex: res.pageIndex,
          //     limit: res.pageSize,
          //   } as any)
          // }
          data={[]}
          columns={columns}
          customerFilterFields={OnboardFilterFields}
          // isCustomLoading={isLoading}
        />
      </div>
    </>
  );
}
