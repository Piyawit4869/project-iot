import React, { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import { GlobalFormField } from "~/components/shared/global-formField";
import { RequiredLabel } from "~/components/shared/required-design";
// import { GlobalFormField } from "~/components/shared/global-form";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import WorkingHoursSection from "~/components/shared/workingHoursSection";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { SettingSchema, type SettingSchemaValues } from "~/schemas/settings";
import { getRequiredPaths } from "~/utils/form-adapter";

interface SettingFormProps {
  form: UseFormReturn<any>;
  organization?: any;
  isEditing: boolean;
  isCreate?: boolean;
  isLoading?: boolean;
}

export const SettingForm: React.FC<SettingFormProps> = (props) => {
  const { form, organization, isCreate, isEditing, isLoading } = props;

  const checkFields = React.useMemo(
    () => new Set(getRequiredPaths(SettingSchema as any)),
    []
  );

  useEffect(() => {
    const s: unknown =
      (organization as { setting?: unknown } | undefined)?.setting ?? undefined;
    if (!s || typeof s !== "object") return;

    const setting = s as {
      theme?: string | null;
      textDisplay?: string | null;
      defaultLanguage?: string | null;
      active?: boolean | null;
      openDays?: unknown;
    };

    form.reset({
      theme: setting.theme ?? "",
      textDisplay: setting.textDisplay ?? "",
      defaultLanguage: setting.defaultLanguage ?? "",
      active: setting.active ?? true,
    } as SettingSchemaValues);
  }, [organization, form]);

  return (
    <div className="flex flex-col w-full space-y-8 px-8 py-4">
      <Form {...form}>
        <div className="gap-4 mb-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold">ทั่วไป</h2>
          </div>
          {isLoading ? (
            <div className="space-y-4 ">
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GlobalFormField
                  control={form.control}
                  name="theme"
                  label="ธีม"
                  placeholder="เลือกธีมของระบบ"
                  type="select"
                  options={[
                    { label: "สว่าง", value: "light" },
                    { label: "มืด", value: "dark" },
                  ]}
                  view={isEditing ? "edit" : "view"}
                  required={isEditing ? true : false}
                />

                {/* <GlobalFormField
                  control={form.control}
                  name="theme"
                  label="ธีม"
                  type="select"
                  checkFields={checkFields}
                  placeholder="สว่าง"
                  disable={!isEditing}
                  selectOptions={[
                    { label: "สว่าง", value: "light" },
                    { label: "มืด", value: "dark" },
                  ]}
                /> */}
                <GlobalFormField
                  control={form.control}
                  name="textDisplay"
                  label="ขนาดข้อความ"
                  placeholder="เลือกขนาดข้อความของระบบ"
                  type="select"
                  options={[
                    { label: "เล็กที่สุด", value: "extraSmall" },
                    { label: "เล็ก", value: "small" },
                    { label: "ปกติ", value: "normal" },
                    { label: "ใหญ่", value: "large" },
                    { label: "ใหญ่ที่สุด", value: "extraLarge" },
                  ]}
                  view={isEditing ? "edit" : "view"}
                  required={isEditing ? true : false}
                />
                {/* <GlobalFormField
                  control={form.control}
                  name="textDisplay"
                  label="ขนาดข้อความ"
                  type="select"
                  checkFields={checkFields}
                  placeholder="xs (12px)"
                  disable={!isEditing}
                  // disable={pointer-events-none opacity-60 select-none}
                   
                /> */}

                <GlobalFormField
                  control={form.control}
                  name="defaultLanguage"
                  label="ภาษาตั้งต้น"
                  placeholder="เลือกภาษาตั้งต้นของระบบ"
                  type="select"
                  options={[
                    { label: "ไทย", value: "TH" },
                    { label: "อังกฤษ", value: "EN" },
                    // { label: "JP", value: "JP" },
                  ]}
                  view={isEditing ? "edit" : "view"}
                  required={isEditing ? true : false}
                />
                {/* <GlobalFormField
                  control={form.control}
                  name="defaultLanguage"
                  label="ภาษาตั้งต้น"
                  type="select"
                  checkFields={checkFields}
                  placeholder="ไทย, อังกฤษ"
                  disable={!isEditing}
                  selectOptions={[
                    { label: "ไทย", value: "TH" },
                    { label: "อังกฤษ", value: "EN" },
                    // { label: "JP", value: "JP" },
                  ]}
                /> */}
                {/* <FormField
              control={form.control}
              name={"active" as FieldPath<SettingSchemaValues>}
              render={({ field }) => (
                <FormItem className="flex items-center mt-2">
                  <FormLabel>เปิดใช้งานการตั้งค่า</FormLabel>
                  <FormControl className="ml-4">
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}
              </div>
              <div className="mt-5">
                <FormField
                  control={form.control}
                  name={isCreate ? "setting.openDays" : "openDays"}
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel required>
                        <div>
                          <h2 className="text-xl font-bold mb-4">
                            เวลาการทำงาน
                          </h2>
                          <span className="flex mb-2">
                            เปิดใช้งานการตั้งค่า
                          </span>
                        </div>

                        <FormMessage />
                      </RequiredLabel>
                      <FormControl className="ml-4">
                        <WorkingHoursSection
                          form={form}
                          value={field.value}
                          onChange={field.onChange}
                          isEdit={isEditing}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
        </div>
      </Form>
    </div>
  );
};
