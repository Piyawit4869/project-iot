"use client";

import { TabControl } from "~/components/shared/tab-control";
import { Plus } from "lucide-react";
import GlobalButton from "~/components/shared/global-button";

export default function OnboardUserDepartment() {
  return (
    <div className="flex flex-col space-y-3 p-8">
      <TabControl
        title="แผนก {department}"
        backpath="/on-boarding/team"
        buttons={[
          <GlobalButton
            label={
              <>
                <Plus /> เพิ่มพนักงาน
              </>
            }
          />,
        ]}
      />
    </div>
  );
}
