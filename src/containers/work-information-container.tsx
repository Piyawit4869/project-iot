/** @format */

import React from "react";
import { WorkInformation } from "@/components/features/work-information";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const WorkInformationContainer = () => {
  return (
    <div className="flex flex-col gap-4">
      <WorkInformation />
    </div>
  );
};

export default WorkInformationContainer;
