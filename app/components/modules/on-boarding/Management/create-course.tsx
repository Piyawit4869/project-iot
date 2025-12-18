"use client";

import { TabControl } from "~/components/shared/tab-control";
import { Plus } from "lucide-react";
import { DataTable } from "~/components/shared/data-table";
import { usePaginate } from "~/api/client/user";
import { useOnboardColumns } from "../components/Management/columns";
import { OnboardFilterFields } from "~/types/onboard/filter";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

type CreateCouseProps = {
  isCreate?: boolean;
};

export default function CreateCouse({ isCreate = true }: CreateCouseProps) {
  const paginate = usePaginate;
  const columns = useOnboardColumns();

  return (
    <>
      <div className="flex flex-col space-y-3 p-8">
        <TabControl
          title="จัดการหลักสูตร On-Boarding"
          buttons={[
            isCreate && (
              <Link to={`/on-boarding/create`} key="create-link">
                <Button className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">&nbsp;สร้าง</span>
                </Button>
              </Link>
            ),
          ].filter(Boolean)}
        />

        <DataTable
          data={[]}
          columns={columns}
          customerFilterFields={OnboardFilterFields}
        />
      </div>
    </>
  );
}
