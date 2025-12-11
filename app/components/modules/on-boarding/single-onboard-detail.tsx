"use client";

import { TabControl } from "~/components/shared/tab-control";
import { Plus } from "lucide-react";
import { DataTable } from "~/components/shared/data-table";
import { usePaginate } from "~/api/client/user";
import { useOnboardColumns } from "../on-boarding/components/columns";
import { OnboardFilterFields } from "~/types/onboard/filter";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export default function SingleOnboardDetail() {
  const paginate = usePaginate;
  const columns = useOnboardColumns();

  return (
    <>
      <div className="flex flex-col space-y-3 p-8">
        <TabControl
          title="จัดการหลักสูตร On-Boarding"
          buttons={[
            <Link to={`/on-boarding/single`} key="create-link">
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
