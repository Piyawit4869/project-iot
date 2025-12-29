import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import { customerStatus } from "~/initData/customer-initData";

import type { CreateOrganizationFormCreateProps } from "../../create-organization";
import { GlobalFormField } from "~/components/shared/global-formField";

export const OrganizationContactCard: React.FC<
  CreateOrganizationFormCreateProps
> = ({ form, isLoading = false, isEdit }) => {
  return (
    <>
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
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <GlobalFormField
              control={form.control}
              name="contactName"
              label="ชื่อผู้ติดต่อ"
              placeholder="เช่น นายสมชาย ใจดี"
              type="input"
              view={isEdit ? "edit" : "view"}
            />

            <GlobalFormField
              control={form.control}
              name="contactEmail"
              label="อีเมลผู้ติดต่อ"
              placeholder="เช่น example@email.com"
              type="input"
              view={isEdit ? "edit" : "view"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlobalFormField
              control={form.control}
              name="contactPhone"
              label="เบอร์โทรผู้ติดต่อ"
              placeholder="เช่น 0812345678"
              type="number-box"
              view={isEdit ? "edit" : "view"}
            />
            <GlobalFormField
              control={form.control}
              name="contactLine"
              label="Line ผู้ติดต่อ"
              placeholder="เช่น line id หรือเบอร์โทร"
              type="input"
              view={isEdit ? "edit" : "view"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlobalFormField
              control={form.control}
              name="contactFacebook"
              label="Facebook ผู้ติดต่อ"
              placeholder="เช่น facebook.com/yourpage หรือชื่อโปรไฟล์"
              type="input"
              view={isEdit ? "edit" : "view"}
            />
            <GlobalFormField
              control={form.control}
              name="contactWhatsapp"
              label="Whatsapp ผู้ติดต่อ"
              placeholder="เช่น +66812345678"
              type="input"
              view={isEdit ? "edit" : "view"}
            />
            <GlobalFormField
              control={form.control}
              name="contactWebsite"
              label="เว็บไซต์ผู้ติดต่อ"
              placeholder="เช่น https://www.example.com"
              type="input"
              canCopy
              view={isEdit ? "edit" : "view"}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlobalFormField
              control={form.control}
              name="contactNote"
              label="หมายเหตุ"
              placeholder="ข้อมูลเพิ่มเติมเกี่ยวกับผู้ติดต่อ (ถ้ามี)"
              type="textArea"
              view={isEdit ? "edit" : "view"}
            />
          </div>
        </div>
      )}
    </>
  );
};
