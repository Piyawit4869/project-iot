"use client";

import { TabControl } from "~/components/shared/tab-control";
import { Plus, Save, Settings } from "lucide-react";
import { DataTable } from "~/components/shared/data-table";
import { usePaginate } from "~/api/client/user";
import { useOnboardColumns } from "../on-boarding/components/columns";
import { OnboardFilterFields } from "~/types/onboard/filter";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import GlobalButton from "~/components/shared/global-button";

export default function OnboardIndex() {
  const paginate = usePaginate;
  const columns = useOnboardColumns();

  return (
    <>
      <div className="flex flex-col space-y-3 p-8">
        <TabControl
          title="ฝ่ายขาย (Sale)"
          backpath="/on-boarding/content-create"
          buttons={[
            <Link to={`/On-boarding/single`} key="create-link">
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
