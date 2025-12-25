import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import {
  customerStatus,
  customerType,
  organizationType,
} from "~/initData/customer-initData";

import type { CreateOrganizationFormCreateProps } from "../../create-organization";
import { GlobalFormField } from "~/components/shared/global-formField";
import { typeOptions } from "../setting-organization-form";
import { Checkbox } from "~/components/ui/checkbox";

export const OrganizationDetailCard: React.FC<
  CreateOrganizationFormCreateProps
> = ({ form, isLoading = false }) => {
  const [hasTaxId, setHasTaxId] = React.useState(false);

  return (
    <Card>
      {/* <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="text-base font-bold">ข้อมูลลูกค้า</CardTitle>
        </div>
      </CardHeader> */}

      {isLoading ? (
        <CardContent className="space-y-4 ">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <div className="space-y-4 px-6">
          {/* Activity Name */}{" "}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <GlobalFormField
              control={form.control}
              name="logoUrl"
              label="โลโก้ของสาขา"
              type="image"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlobalFormField
              control={form.control}
              name="active"
              label="เปิดใช้งาน"
              type="switch"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlobalFormField
              control={form.control}
              name="code"
              label="รหัสสาขา"
              placeholder="กรอกชื่อสาขาภาษาไทย เช่น สาขาสามร้อยสิบห้าโปรดักชั่น"
              type="input"
            />
            <GlobalFormField
              control={form.control}
              name="isMain"
              label="สาขาหลัก"
              labelCheckbox="กำหนดสาขานี้เป็นสาขาหลักขององค์กร"
              type="checkbox"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlobalFormField
              control={form.control}
              name="nameTh"
              label="ชื่อสาขา (ไทย)"
              placeholder="กรอกชื่อสาขาภาษาไทย เช่น สาขาสามร้อยสิบห้าโปรดักชั่น"
              type="input"
              required
            />
            <GlobalFormField
              control={form.control}
              name="nameEn"
              label="ชื่อสาขา (อังกฤษ)"
              placeholder="กรอกชื่อสาขาภาษาอังกฤษ เช่น Samroi Sipha Production Branch"
              type="input"
            />
            <GlobalFormField
              control={form.control}
              name="descriptionsTh"
              label="คำอธิบายสาขา (ภาษาไทย)"
              placeholder="กรอกคำอธิบายภาษาไทย เช่น สาขาหลักขององค์กร"
              type="textArea"
            />
            <GlobalFormField
              control={form.control}
              name="descriptionsEn"
              label="คำอธิบายสาขา (ภาษาอังกฤษ)"
              placeholder="กรอกคำอธิบายอังกฤษ เช่น Main branch of the organization"
              type="textArea"
            />

            <GlobalFormField
              control={form.control}
              name="taxId"
              label="เลขประจำผู้เสียภาษี"
              type="number-box"
              groups={[1, 4, 5, 2, 1]}
              format="-"
              required
            />

            <GlobalFormField
              control={form.control}
              name="openingDate"
              label="วันที่เปิดให้บริการ"
              type="date"
            />

            {/* <div className="flex items-center gap-2">
              <Checkbox
                checked={hasTaxId}
                onCheckedChange={(checked) => setHasTaxId(!!checked)}
              />
              <label className="text-sm font-normal leading-none cursor-pointer">
                มีการจดเลขประจำตัวผู้เสียภาษี
              </label>
            </div>

            {hasTaxId ? (
              <GlobalFormField
                control={form.control}
                name="taxId"
                label="เลขประจำผู้เสียภาษี"
                type="number-box"
                groups={[1, 4, 5, 2, 1]}
                format="-"
              />
            ) : (
              <GlobalFormField
                control={form.control}
                name="taxId"
                label="รหัสประจำสาขาของผู้เสียภาษี"
                type="number-box"
                groups={[4]}
                format="-"
              />
            )} */}

            <GlobalFormField
              control={form.control}
              name="websiteUrl"
              label="เว็บไซต์สาขา"
              canCopy
              placeholder="เช่น https://example.com"
              type="input"
            />
            <GlobalFormField
              control={form.control}
              name="branchType"
              label="ลักษณะสาขา"
              placeholder="เลือกลักษณะสาขา"
              options={organizationType}
              type="select"
              required
            />
            <GlobalFormField
              control={form.control}
              name="fromType"
              label="ประเภทสาขา"
              placeholder="เลือกประเภทสาขา"
              options={customerType}
              type="select"
              required
            />

            <GlobalFormField
              control={form.control}
              name="status"
              label="สถานะสาขา"
              placeholder="เลือกสถานะสาขา"
              options={customerStatus}
              type="select"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
            <GlobalFormField
              control={form.control}
              name="registerVat"
              label="ภาษีมูลค่าเพิ่ม"
              labelCheckbox="สาขามีการจดภาษีมูลค่าเพิ่ม"
              type="checkbox"
            />
          </div>
        </div>
      )}
    </Card>
  );
};
