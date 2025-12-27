import React from "react";
import type { UseFormReturn } from "react-hook-form";
// import { GlobalFormField } from "~/components/shared/global-form";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Form } from "~/components/ui/form";
import { addressSchema, type AddressSchemaValues } from "~/schemas/settings";
import { getRequiredPaths } from "~/utils/form-adapter";
import { GlobalFormField } from "~/components/shared/global-formField";

interface SettingAddressFormProps {
  form: UseFormReturn<AddressSchemaValues>;
  isLoading: boolean;
  editable?: boolean;
}

export const SettingAddressForm: React.FC<SettingAddressFormProps> = (
  props
) => {
  const { form, isLoading, editable } = props;

  // const checkFields = new Set(getRequiredPaths(addressSchema as any));
  return (
    <Form {...form}>
      <div className="flex flex-col w-full space-y-8 px-8 py-4">
        {/* <TabControl
        title="ที่อยู่ติดต่อ"
        buttons={[
          <Link
            className="pointer-events-none"
            href={"/organization/user/create"}
            key={"create button"}
          >
            <Button disabled key={"create button"}>
              สร้าง
            </Button>
          </Link>,
        ]}
      /> */}

        <div className="space-y-4">
          <div className="mb-5">
            <h2 className="text-xl font-bold">ที่อยู่ติดต่อ</h2>
          </div>
          {isLoading ? (
            <div className="space-y-4 ">
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <GlobalFormField
                control={form.control}
                name="name"
                label="ชื่อสถานที่ตั้ง"
                type="input"
                placeholder="กรอกชื่อสถานที่ เช่น ตึกกิ่งทอง"
                view={editable ? "edit" : "view"}
                required={editable}
              />

              <GlobalFormField
                control={form.control}
                name="building"
                label="ชื่อตึก/อาคาร"
                type="input"
                placeholder="กรอกชื่อตึกของสาขา เช่น สาขา A"
                view={editable ? "edit" : "view"}
              />

              <GlobalFormField
                control={form.control}
                name="roomNo"
                label="ห้องหมายเลข"
                placeholder="กรอกห้อง เช่น ห้อง 315"
                type="input"
                view={editable ? "edit" : "view"}
              />

              <GlobalFormField
                control={form.control}
                name="floorNo"
                label="ชั้นที่อยู่"
                placeholder="กรอกชั้น เช่น ชั้น 3"
                type="input"
                view={editable ? "edit" : "view"}
              />

              <GlobalFormField
                control={form.control}
                name="houseNo"
                label="เลขที่บ้าน"
                type="input"
                placeholder="กรอกบ้านเลขที่ เช่น 31/5"
                view={editable ? "edit" : "view"}
                required={editable}
              />

              <GlobalFormField
                control={form.control}
                name="village"
                label="ชื่อหมู่บ้าน"
                type="input"
                placeholder="กรอกชื่อหมู่บ้าน เช่น หมู่บ้านสามร้อยสิบห้า"
                view={editable ? "edit" : "view"}
              />

              <GlobalFormField
                control={form.control}
                name="villageNo"
                label="หมู่ที่"
                type="input"
                placeholder="กรอกหมู่ เช่น 13"
                view={editable ? "edit" : "view"}
              />

              <GlobalFormField
                control={form.control}
                name="alley"
                label="ซอย"
                type="input"
                placeholder="กรอกซอย เช่น 48"
                view={editable ? "edit" : "view"}
              />

              <GlobalFormField
                control={form.control}
                name="road"
                label="ถนน"
                type="input"
                placeholder="กรอกถนน เช่น พหลโยธิน"
                view={editable ? "edit" : "view"}
              />

              <GlobalFormField
                control={form.control}
                name="subDistrict"
                label="ตำบล/แขวง"
                type="input"
                placeholder="กรอกตำบล/แขวง เช่น แขวงบางกะปิ"
                view={editable ? "edit" : "view"}
                required={editable}
              />

              <GlobalFormField
                control={form.control}
                name="city"
                label="เขต/อำเภอ/เมือง"
                type="input"
                placeholder="กรอกเขต/อำเภอ/เมือง เช่น เขตห้วยขวาง"
                view={editable ? "edit" : "view"}
                required={editable}
              />

              <GlobalFormField
                control={form.control}
                name="province"
                label="จังหวัด"
                type="input"
                placeholder="กรอกจังหวัด เช่น กรุงเทพมหานคร"
                view={editable ? "edit" : "view"}
                required={editable}
              />

              <GlobalFormField
                control={form.control}
                name="postalCode"
                label="รหัสไปรษณีย์"
                placeholder="กรอกรหัสไปรษณีย์ เช่น 10310"
                type="number-box"
                groups={[5]}
                view={editable ? "edit" : "view"}
                required={editable}
              />

              <GlobalFormField
                control={form.control}
                name="nation"
                label="ประเทศ"
                type="input"
                placeholder="กรอกประเทศ เช่น ประเทศไทย"
                view="view"
              />

              <GlobalFormField
                control={form.control}
                name="note"
                label="หมายเหตุ"
                type="textArea"
                placeholder="กรอกหมายเหตุสาขา"
                view={editable ? "edit" : "view"}
              />
            </div>
          )}
        </div>
      </div>
    </Form>
  );
};
