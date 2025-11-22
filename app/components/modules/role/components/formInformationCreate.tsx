import React from "react";
import type { UseFormReturn } from "react-hook-form";

import { GlobalFormField } from "~/components/shared/global-form";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { RolesFormSchema, type RolesFormValues } from "~/schemas/roles/roles";
import { getRequiredPaths } from "~/utils/form-adapter";

export interface RolesFormProps {
  form: UseFormReturn<RolesFormValues>;
  data?: Partial<RolesFormValues>;
  loading?: boolean;
}

export const RoleCreate: React.FC<RolesFormProps> = ({
  form,
  data,
  loading = false,
}) => {
  const checkFields = new Set(getRequiredPaths(RolesFormSchema as any));

  return (
    <>
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="text-base font-bold">ข้อมูลตำแหน่ง</CardTitle>
        </div>
      </CardHeader>

      {loading ? (
        <CardContent className="space-y-4 ">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          <div className=" w-full">
            <div className="lg:col-span-1 flex flex-col gap-3">
              <div className=" grid grid-cols-1 md:grid-cols-1 gap-5">
                <GlobalFormField
                  control={form.control}
                  name="name"
                  label="ชื่อตำแหน่ง"
                  type="input"
                  checkFields={checkFields}
                  placeholder="กรอกชื่อตำแหน่ง"
                />
                <GlobalFormField
                  control={form.control}
                  name="description"
                  label="รายละเอียด"
                  type="textarea"
                  checkFields={checkFields}
                  placeholder="กรอกรายละเอียด"
                />
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </>
  );
};
