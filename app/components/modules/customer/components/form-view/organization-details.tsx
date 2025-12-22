import { PenLine, Save, X } from "lucide-react";
import React from "react";
import { FormTextRow } from "~/components/shared/formTextRow";
import { GlobalFormField } from "~/components/shared/global-formField";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { customerType, organizationType } from "~/initData/customer-initData";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";
import { EditActionButtons } from "../edit-action-buttons";

export const OrganizationDetails: React.FC<CustomerFormCreateProps> = ({
  form,
  loading = false,
  onClick,
  disabled,
  mode = "view",
  onEditForm,
  onCancel,
}) => {
  const isEdit = mode === "view" ? false : true;

  return (
    <Card>
      <CardHeader className=" gap-0">
        <div className="flex gap-2">
          <div className="flex  flex-col">
            <CardTitle className="text-base font-bold mt-2">
              ข้อมูลเพิ่มเติม
            </CardTitle>
          </div>

          {loading ? (
            <div className="flex ml-auto">
              <SkeletonLoading className="w-10 h-10" />
            </div>
          ) : (
            <EditActionButtons
              isEdit={isEdit}
              disabled={disabled}
              onSave={onClick}
              onEdit={() => {
                onEditForm?.("organization_detail");
              }}
              onCancel={() => {
                onCancel?.("organization_detail");
              }}
            />
          )}
        </div>
      </CardHeader>

      {loading ? (
        <CardContent className="space-y-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <SkeletonLoading
                key={i}
                className={`h-6 ${i % 4 < 2 ? "w-30" : ""}`}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonLoading key={i} className={`h-6 w-100`} />
            ))}
          </div>
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <GlobalFormField
              control={form.control}
              name="organizationDetails.businessName"
              label="ชื่อบริษัท"
              placeholder="กรอกชื่อบริษัท เช่น บริษัท ทำได้ไม่ จำกัด"
              type="input"
              view={isEdit ? "edit" : "view"}
            />

            <GlobalFormField
              control={form.control}
              name="organizationDetails.branchCode"
              label="รหัสสาขา"
              type="input"
              view={isEdit ? "edit" : "view"}
            />

            <GlobalFormField
              control={form.control}
              name="organizationDetails.fromType"
              label="ประเภทธุรกิจ"
              type="select"
              placeholder="เลือกประเภทธุรกิจ เช่น บุคคลธรรมดา"
              options={customerType}
              view={isEdit ? "edit" : "view"}
            />

            <GlobalFormField
              control={form.control}
              name="organizationDetails.orgType"
              label="ประเภทสำนักงาน/บริษัท"
              type="select"
              placeholder="เลือกประเภทสำนักงาน/บริษัท เช่น ร้านค้า"
              options={organizationType}
              view={isEdit ? "edit" : "view"}
            />

            {/* {getOrgType === "others" && (
            <GlobalFormField
              control={form.control}
              name="organizationDetails.orgTypeOther"
              label="โปรดกรอกประเภทบริษัท"
              type="input"
              required
            />
          )} */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <GlobalFormField
              control={form.control}
              name="organizationDetails.businessPhone"
              label="เบอร์โทรสำนักงาน/บริษัท (ตัวเลขเท่านั้น)"
              type="numberBox"
              placeholder="กรอกเบอร์โทรสำนักงาน/บริษัท"
              view={isEdit ? "edit" : "view"}
            />

            <GlobalFormField
              control={form.control}
              name="organizationDetails.businessFax"
              label="เบอร์โทรสาร (ตัวเลขเท่านั้น)"
              type="numberBox"
              placeholder="กรอกเบอร์โทรสาร"
              view={isEdit ? "edit" : "view"}
            />

            <GlobalFormField
              control={form.control}
              name="organizationDetails.businessEmail"
              label="อีเมล"
              type="input"
              placeholder="กรอกอีเมลบริษัท เช่น organization@gmail.com"
              view={isEdit ? "edit" : "view"}
            />

            <GlobalFormField
              control={form.control}
              name="organizationDetails.importantDate"
              label="วันสำคัญของสำนักงาน/บริษัท"
              type="date"
              view={isEdit ? "edit" : "view"}
            />

            <GlobalFormField
              control={form.control}
              name="organizationDetails.openingDate"
              label="วันก่อตั้งของสำนักงาน/บริษัท"
              type="date"
              view={isEdit ? "edit" : "view"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-7">
            <GlobalFormField
              control={form.control}
              name="organizationDetails.websiteUrl"
              label="เว็บไซต์"
              type="input"
              canCopy={true}
              placeholder="กรอกเว็บไซต์ของบริษัท เช่น https://somchaitrading.co.th"
              view={isEdit ? "edit" : "view"}
            />

            <GlobalFormField
              control={form.control}
              name="organizationDetails.note"
              label="โน้ต"
              type="textArea"
              placeholder="กรอกโน้ตสำหรับบริษัท เช่น Company registered in Bangkok"
              view={isEdit ? "edit" : "view"}
            />

            <GlobalFormField
              control={form.control}
              name="organizationDetails.descriptions"
              label="รายละเอียด"
              type="textArea"
              placeholder="ใส่รายละเอียดบริษัท เช่น Importer and distributor"
              view={isEdit ? "edit" : "view"}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
};
