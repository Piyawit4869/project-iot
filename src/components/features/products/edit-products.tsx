"use client";

import React from "react";
import { Control } from "@/components/shared/topsection";
import { Button } from "@/components/ui/button";

export const EditProducts = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div>
        <Control
          title="Edit Products"
          backpath="/organization/products"
          buttons={[<Button key={"create button"}>Save</Button>]}
        />
      </div>
      <div>
        <h1>Edit Products</h1>
      </div>
    </div>
  );
};
