import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import type { CreateOrganizationFormCreateProps } from "../../create-organization";
import { GlobalFormField } from "~/components/shared/global-formField";
import { typeOptions } from "../setting-organization-form";

export const OrganizationAddressCard: React.FC<
  CreateOrganizationFormCreateProps
> = ({ form, loading = false }) => {
  return (
    <Card>
      {/* <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="text-base font-bold">ข้อมูลลูกค้า</CardTitle>
        </div>
      </CardHeader> */}

      {loading ? (
        <CardContent className="space-y-4 ">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <div className="space-y-4 px-6">
          {/* Activity Name */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlobalFormField
              control={form.control}
              name="address.name"
              label="ชื่อสถานที่"
              placeholder="กรอกชื่อสถานที่ เช่น ตึกกิ่งทอง"
              type="input"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlobalFormField
              control={form.control}
              name="address.building"
              label="ชื่อตึก/อาคาร"
              placeholder="กรอกชื่อตึกของสาขา เช่น สาขา A"
              type="input"
            />
            <GlobalFormField
              control={form.control}
              name="address.roomNo"
              label="ห้องหมายเลข"
              placeholder="กรอกห้อง เช่น ห้อง 315"
              type="input"
            />
            <GlobalFormField
              control={form.control}
              name="address.floorNo"
              label="ชั้นที่อยู่"
              placeholder="กรอกชั้น เช่น ชั้น 3"
              type="input"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
            <GlobalFormField
              control={form.control}
              name="address.village"
              label="ชื่อหมู่บ้าน"
              placeholder="กรอกชื่อหมู่บ้าน เช่น หมู่บ้านสามร้อยสิบห้า"
              type="input"
            />

            <GlobalFormField
              control={form.control}
              name="address.villageNo"
              label="หมู่ที่"
              placeholder="กรอกหมู่ เช่น หมู่ 13"
              type="number"
            />

            <GlobalFormField
              control={form.control}
              name="address.houseNo"
              label="บ้านเลขที่"
              placeholder="กรอกบ้านเลขที่ เช่น บ้านเลขที่ 31/5"
              type="input"
            />

            <GlobalFormField
              control={form.control}
              name="address.alley"
              label="ซอย"
              placeholder="กรอกซอย เช่น ซอย 48"
              type="input"
            />

            <GlobalFormField
              control={form.control}
              name="address.road"
              label="ถนน"
              placeholder="กรอกถนน เช่น ซอย 48"
              type="input"
            />

            <GlobalFormField
              control={form.control}
              name="address.subDistrict"
              label="ตำบล/แขวง"
              placeholder="กรอกตำบล/แขวง เช่น แขวงบางกะปิ"
              type="input"
            />

            <GlobalFormField
              control={form.control}
              name="address.city"
              label="เขต/เมือง"
              placeholder="กรอกเขต/เมือง เช่น เขตห้่วยขวาง"
              type="input"
            />

            <GlobalFormField
              control={form.control}
              name="address.province"
              label="จังหวัด"
              placeholder="กรอกจังหวัด เช่น กรุงเทพมหานคร"
              type="input"
            />
            <GlobalFormField
              control={form.control}
              name="address.postalCode"
              label="รหัสไปรณีย์"
              placeholder="กรอกรหัสไปรณีย์ เช่น 10310"
              type="number-box"
              groups={[5]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
            <GlobalFormField
              control={form.control}
              name="note"
              label="หมายเหตุ"
              placeholder="กรอกหมายเหตุสาขา "
              type="textArea"
            />
          </div>
        </div>
      )}
    </Card>
  );
};
