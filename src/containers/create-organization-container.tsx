import React from "react";
import { CreateOrganization } from "@/components/features/organization";
import { Control } from "@/components/shared/topsection";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CreateOrganizationContainer = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="items-center justify-between space-y-2">
        <Control
          backpath={"/superadmin/organization"}
          title="CreateOrganization"
          buttons={[
            <Link
              href={`/superadmin/organization/create`}
              key={"create button"}
            >
              <div className="space-x-2">
                <Button key={"save button"}>Save</Button>
                <Button key={"cancel button"}>Cancel</Button>
              </div>
            </Link>,
          ]}
        />
      </div>
      <CreateOrganization />
    </div>
  );
};

export default CreateOrganizationContainer;
