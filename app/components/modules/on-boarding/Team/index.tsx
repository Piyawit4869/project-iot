"use client";

import { Eye, Save } from "lucide-react";
import { Link } from "react-router";
import GlobalButton from "~/components/shared/global-button";
import { TabControl } from "~/components/shared/tab-control";

export default function OnBoardingTeamIndex() {
  return (
    <>
      <div className="flex flex-col w-full space-y-4 p-8 dark:bg-background">
        <TabControl title="รู้จักทีมและเพื่อนร่วมงาน" backpath="/on-boarding" />
        <div className="flex pt-7 ml-20 w-30">
          <Link to="single">
            <GlobalButton
              className="ml-5"
              label={
                <>
                  <Eye /> ดูรายชื่อพนักงาน
                </>
              }
              key="create-button"
              type="submit"
              // loading={isSubmitting}
              // form="users"w
            />
          </Link>
        </div>
      </div>
    </>
  );
}
