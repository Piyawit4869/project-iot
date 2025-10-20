import React from "react";
import { FormTextRow } from "~/components/shared/formTextRow";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";

export const ViewCustomerContact: React.FC<CustomerFormCreateProps> = ({
  form,
  loading = false,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="text-base font-bold">ข้อมูลเพิ่มเติม</CardTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormTextRow
              control={form.control}
              name="organizationDetails.businessName"
              label="ชื่อบริษัท"
            />
            <FormTextRow
              control={form.control}
              name="organizationDetails.branchCode"
              label="รหัสสาขา"
            />

            <FormTextRow
              control={form.control}
              name="organizationDetails.fromType"
              label="ประเภทธุรกิจ"
            />
            <FormTextRow
              control={form.control}
              name="organizationDetails.orgType"
              label="ประเภทสำนักงาน/บริษัท"
            />

            {/* <FormTextRow
              control={form.control}
              name="profile.country"
              label="ประเทศ"
            /> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormTextRow
              control={form.control}
              name="organizationDetails.businessPhone"
              label="เบอร์โทรสำนักงาน/บริษัท"
              type="phone"
            />

            <FormTextRow
              control={form.control}
              name="organizationDetails.businessFax"
              label="เบอร์โทรสาร"
              type="phone"
            />

            <FormTextRow
              control={form.control}
              name="organizationDetails.businessEmail"
              label="อีเมล"
              canCopy={true}
            />
            <FormTextRow
              control={form.control}
              name="organizationDetails.importantDate"
              label="วันสำคัญของสำนักงาน/บริษัท"
              type="dateFull"
            />

            <FormTextRow
              control={form.control}
              name="organizationDetails.openingDate"
              label="วันก่อตั้งของสำนักงาน/บริษัท"
              type="dateFull"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <FormTextRow
              control={form.control}
              name="organizationDetails.websiteUrl"
              label="เว็บไซต์"
              canCopy={true}
            />

            <FormTextRow
              control={form.control}
              name="organizationDetails.note"
              label="โน้ต"
            />
            <FormTextRow
              control={form.control}
              name="organizationDetails.descriptions"
              label="รายละเอียด"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
};
