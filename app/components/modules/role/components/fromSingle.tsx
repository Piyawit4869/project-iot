import { Check, X } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { DatePicker } from "~/components/shared/date-picker";
import { GlobalFormField } from "~/components/shared/global-form";
import { GlobalImage } from "~/components/shared/global-image";
import ImageUpload from "~/components/shared/image-upload";
import { RequiredLabel } from "~/components/shared/required-design";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Button } from "~/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import type { RolesFormValues } from "~/schemas/roles/roles";
import { UsersFormSchema, type UsersFormValues } from "~/schemas/users/user";
import { getRequiredPaths } from "~/utils/form-adapter";

export interface RolesFormProps {
  form: UseFormReturn<RolesFormValues>;
  data?: Partial<UsersFormValues>;
  loading?: boolean;
}

export const FormRolesSingle: React.FC<RolesFormProps> = ({
  form,
  loading = false,
}) => {
  const checkFields = new Set(getRequiredPaths(UsersFormSchema as any));

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
            <div className="lg:col-span-2 flex flex-col gap-3">
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
        </CardContent>
      )}
    </>
  );
};

{
  /*
<Card className="p-4 h-full">
                {isLoading ? (
                  <CardContent className="space-y-4 ">
                    <SkeletonLoading />
                    <SkeletonLoading />
                    <SkeletonLoading />
                    <SkeletonLoading />
                  </CardContent>
                ) : (
                  <div>
                    <CardContent className="space-y-4">
                      <div className="mt-2 flex flex-col md:flex-row gap-5">
                        <div className="md:w-[35%] h-[50%] w-full">
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
                    <div className="md:w-[65%] w-full flex flex-col gap-5">
                      <Card className="p-2 py-8">
                        {/* <UserCompensation form={form} data={data} />
                        <ModalUser
                          users={[user]}
                          value={selectedUserIds}
                          onChange={setSelectedUserIds}
                        />
                      </Card>

                      <Card className="p-2 py-8">
                        {/* <UserCompensation form={form} data={data} />
                      </Card>
                    </div>
                  </div>
                )}
              </Card>  
*/
}
