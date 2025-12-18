"use client";

import { TabControl } from "~/components/shared/tab-control";
import { Save } from "lucide-react";
import GlobalButton from "~/components/shared/global-button";

export default function OnboardSetting() {
  return (
    <div className="flex flex-col space-y-3 p-8">
      <TabControl
        title="ตั้งค่า On-Boarding"
        backpath="/on-boarding"
        buttons={[
          <GlobalButton
            label={
              <>
                <Save /> บันทึก
              </>
            }
          />,
        ]}
      />
    </div>
  );
}
