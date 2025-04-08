import React from "react";
import { Organization } from "@/components/features/organization";

const OrganizationContainer = () => {
  return (
    <div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Organization</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <Organization />
      </div>
    </div>
  );
};

export default OrganizationContainer;
