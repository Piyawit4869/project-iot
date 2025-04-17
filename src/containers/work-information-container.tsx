import React from "react";
import { WorkInformation } from "@/components/features/work-information";

const WorkInformationContainer = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Work Information
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
      </div>
      <WorkInformation />
    </div>
  );
};

export default WorkInformationContainer;
