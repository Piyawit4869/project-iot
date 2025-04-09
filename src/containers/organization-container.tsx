import React from "react";
import { Organization } from "@/components/features/organization";
import { Control } from "@/components/shared/topsection";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const OrganizationContainer = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="items-center justify-between space-y-2">
        <Control
          title="Organization"
          buttons={[
            <Link
              href={`/superadmin/organization/create`}
              key={"create button"}
            >
              <Button key={"create button"}>Create</Button>
            </Link>,
          ]}
        />
      </div>
      <Organization />
    </div>
  );
};

export default OrganizationContainer;
