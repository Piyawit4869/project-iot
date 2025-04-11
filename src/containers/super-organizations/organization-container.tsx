import React from "react";
import { Organization } from "@/components/features/organization";
const OrganizationContainer = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <Organization />
    </div>
  );
};

export default OrganizationContainer;
