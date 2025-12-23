import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { GlobalFormField } from "~/components/shared/global-form";
import { Form } from "~/components/ui/form";
import { addressSchema, type AddressSchemaValues } from "~/schemas/settings";
import { getRequiredPaths } from "~/utils/form-adapter";

interface SettingAddressFormProps {
  form: UseFormReturn<AddressSchemaValues>;
  // isLoading: boolean;
}

export const SettingAddressForm: React.FC<SettingAddressFormProps> = (
  props
) => {
  const { form } = props;

  const checkFields = new Set(getRequiredPaths(addressSchema as any));
  return (
    <Form {...form}>
      <div className="flex flex-col w-full space-y-8 p-8">
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

          <div className="grid grid-cols-2 gap-4 mt-2">
            <GlobalFormField
              control={form.control}
              name="name"
              label="ชื่อสถานที่ตั้ง"
              type="input"
              checkFields={checkFields}
              placeholder="Address Name"
            />

            <GlobalFormField
              control={form.control}
              name="building"
              label="ชื่ออาคาร"
              type="input"
              checkFields={checkFields}
              placeholder="Building 1"
            />

            <GlobalFormField
              control={form.control}
              name="village"
              label="ชื่อหมู่บ้าน"
              type="input"
              checkFields={checkFields}
              placeholder="Green Village"
            />

            {/* <GlobalFormField
              control={form.control}
              name="roomNo"
              label="หมายเลขห้อง"
              type="input"
              checkFields={checkFields}
              placeholder="101"
            />

            <GlobalFormField
              control={form.control}
              name="floorNo"
              label="หมายเลขชั้น"
              type="input"
              checkFields={checkFields}
              placeholder="1"
            /> */}

            <GlobalFormField
              control={form.control}
              name="houseNo"
              label="เลขที่บ้าน"
              type="input"
              checkFields={checkFields}
              placeholder="5"
            />

            <GlobalFormField
              control={form.control}
              name="villageNo"
              label="หมู่ที่"
              type="input"
              checkFields={checkFields}
              placeholder="2"
            />

            <GlobalFormField
              control={form.control}
              name="alley"
              label="ซอย"
              type="input"
              checkFields={checkFields}
              placeholder="Alleyway"
            />

            <GlobalFormField
              control={form.control}
              name="road"
              label="ถนน"
              type="input"
              checkFields={checkFields}
              placeholder="Road 51"
            />

            <GlobalFormField
              control={form.control}
              name="nation"
              label="ประเทศ"
              type="input"
              checkFields={checkFields}
              placeholder="Country"
            />

            <GlobalFormField
              control={form.control}
              name="subDistrict"
              label="ตำบล"
              type="input"
              checkFields={checkFields}
              placeholder="Taling Chan"
            />

            <GlobalFormField
              control={form.control}
              name="city"
              label="อำเภอ"
              type="input"
              checkFields={checkFields}
              placeholder="Taling Chan"
            />

            <GlobalFormField
              control={form.control}
              name="province"
              label="จังหวัด"
              type="input"
              checkFields={checkFields}
              placeholder="Bangkok"
            />

            <GlobalFormField
              control={form.control}
              name="postalCode"
              label="รหัสไปรษณีย์"
              type="input"
              checkFields={checkFields}
              placeholder="10170"
            />

            <GlobalFormField
              control={form.control}
              name="note"
              label="หมายเหตุ"
              type="input"
              checkFields={checkFields}
              placeholder="note here"
            />

            {/* <GlobalFormField
              control={formAddrass.control}
              name="isMain"
              label="เป็นรายการหลัก"
              type="switch"
              checkFields={checkFields}
            /> */}
          </div>
        </div>
      </div>
    </Form>
  );
};
