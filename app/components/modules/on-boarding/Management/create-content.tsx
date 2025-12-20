"use client";

import { TabControl } from "~/components/shared/tab-control";
import { Plus, Save, Settings } from "lucide-react";
import { DataTable } from "~/components/shared/data-table";
import { usePaginate } from "~/api/client/user";
import { useOnboardColumns } from "../components/Management/columns";
import { OnboardFilterFields } from "~/types/onboard/filter";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import SettingScoreDialog from "../components/Management/setting-score-dialog";
import React from "react";

export default function OnBoardingManagementCreate() {
  const paginate = usePaginate;
  const columns = useOnboardColumns();
  const [openSetting, setSettingPoOpen] = React.useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col space-y-3 p-8">
        <TabControl
          title="ฝ่ายขาย (Sale)"
          backpath="/on-boarding/management"
          buttons={[
            <Button
              variant="outline"
              onClick={() => setSettingPoOpen(true)}
              className="px-2 py-1 mr-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">&nbsp;การตั้งค่า</span>
            </Button>,
            <Link to={`/on-boarding/management/single`} key="create-link">
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
        <SettingScoreDialog
          openSetting={openSetting}
          setOpen={setSettingPoOpen}
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
