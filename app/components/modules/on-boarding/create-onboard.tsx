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
          title="สร้างฝ่ายขาย (Sale)"
          backpath="/on-boarding/create"
          buttons={[
            <GlobalButton
              variant="outline"
              label={
                <>
                  <Settings /> การตั้งค่า
                </>
              }
              key="create-button"
              type="submit"
              // loading={isSubmitting}
              // form="users"
            />,
            <GlobalButton
              label={
                <>
                  <Save /> บันทึก
                </>
              }
              key="create-button"
              type="submit"
              // loading={isSubmitting}
              // form="users"
            />,
          ]}
        />
      </div>
    </>
  );
}
