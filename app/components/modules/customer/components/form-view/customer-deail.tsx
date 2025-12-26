import { PenLine, Save, X } from "lucide-react";
import React from "react";
import { useParams, useSearchParams } from "react-router";
import { useCustomer } from "~/api/client/customer/useCustomer";
import { FormTextRow } from "~/components/shared/formTextRow";
import { GlobalFormField } from "~/components/shared/global-formField";
import { GlobalImage } from "~/components/shared/global-image";
import { RadioCardGroup } from "~/components/shared/global-radio-card";
import { InputNumberBox } from "~/components/shared/input-number-box";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { FormField, FormItem } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { customerType, gender, prefix } from "~/initData/customer-initData";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";
import { EditActionButtons } from "../edit-action-buttons";
import { is } from "date-fns/locale";

export const CustomerDeail: React.FC<CustomerFormCreateProps> = ({
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
          <div className="flex gap-2">
            <CardTitle className="text-base font-bold">ข้อมูลลูกค้า</CardTitle>
          </div>
          {loading ? (
            <div className="flex ml-auto">
              <SkeletonLoading className="w-10 h-10" />
            </div>
          ) : (
            <EditActionButtons
              isEdit={isEdit}
              disabled={disabled}
              form={form}
              onSave={onClick}
              onEdit={() => {
                onEditForm?.("customer_detail");
              }}
              onCancel={() => {
                onCancel?.("customer_detail");
              }}
            />
          )}
        </div>
      </CardHeader>

      {loading ? (
        <CardContent className="space-y-4 ">
          <div className="flex flex-col gap-2">
            <SkeletonLoading className="w-20 h-4  " />
            <SkeletonLoading className="w-30 h-30  " />
          </div>
          <div className="flex flex-col gap-2">
            <SkeletonLoading className="w-20 h-4  " />
            <SkeletonLoading className="w-40 h-10  " />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonLoading
                key={i}
                className={`h-6 ${i % 4 < 2 ? "w-30" : ""}`}
              />
            ))}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <SkeletonLoading className="w-5 h-5  " />
            <SkeletonLoading className="w-80 h-7  " />
          </div>
          <div className="flex flex-row gap-2">
            {Array.from({ length: 13 }).map((_, i) => (
              <SkeletonLoading key={i} className={`h-10 w-8`} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonLoading
                key={i}
                className={`h-6 ${i % 4 < 2 ? "w-30" : ""}`}
              />
            ))}
          </div>
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          <div className="md:grid-cols-2 gap-6 flex">
            <GlobalFormField
              control={form.control}
              name="profile.imageUrl"
              label="รูปลูกค้า"
              type="image"
              view={isEdit ? "edit" : "view"}
            />
          </div>
          <div className="grid grid-cols-1 lg:g gap-6 pt-4">
            <GlobalFormField
              control={form.control}
              name="profile.prefix"
              label="คำนำหน้า"
              type="custom"
              view={isEdit ? "edit" : "view"}
              customControl={(field: any) => {
                return (
                  <RadioCardGroup
                    options={prefix}
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                );
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlobalFormField
              control={form.control}
              name="profile.firstName"
              label="ชื่อ"
              type="input"
              view={isEdit ? "edit" : "view"}
              placeholder="กรอกชื่อจริงของลูกค้า เช่น สมชาย"
            />

            <GlobalFormField
              control={form.control}
              name="profile.lastName"
              label="นามสกุล"
              type="input"
              view={isEdit ? "edit" : "view"}
              placeholder="กรอกนามสกุลของลูกค้า เช่น หมายสุข "
            />

            <GlobalFormField
              control={form.control}
              name="profile.nickName"
              label="ชื่อเล่น"
              type="input"
              view={isEdit ? "edit" : "view"}
              placeholder="กรอกชื่อเล่นของลูกค้า เช่น หนุ่ม"
            />

            {/* <FormTextRow
              control={form.control}
              name="profile.firstNameTh"
              label="ชื่อจริง (ภาษาไทย)"
            />
            <FormTextRow
              control={form.control}
              name="profile.lastNameTh"
              label="นามสกุล (ภาษาไทย)"
            /> */}

            <GlobalFormField
              control={form.control}
              name="profile.gender"
              label="เพศ"
              type="select-radio-card"
              view={isEdit ? "edit" : "view"}
              placeholder="เลือกเพศของลูกค้า"
              options={gender}
            />

            <GlobalFormField
              control={form.control}
              name="profile.birthDate"
              label="วัน/เดือน/ปี เกิด"
              type="date"
              view={isEdit ? "edit" : "view"}
              placeholder="เลือกวันเกิด"
            />

            <GlobalFormField
              control={form.control}
              name="profile.age"
              label="อายุ (ตัวเลขเท่านั้น)"
              type="number"
              view={isEdit ? "edit" : "view"}
              placeholder="กรอกอายุลูกค้า เช่น 25"
            />

            <GlobalFormField
              control={form.control}
              name="profile.nickName"
              label="ชื่อเล่น"
              type="input"
              view={isEdit ? "edit" : "view"}
              placeholder="กรอกชื่อเล่นของลูกค้า เช่น หนุ่ม"
            />
          </div>
          <div className="grid grid-cols-1 py-4 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="consentPii"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-full">
                    <div className="flex items-center gap-3 pointer-events-none">
                      <Checkbox id="agree" />
                      <Label {...field} htmlFor="agree">
                        การอนุญาตให้เก็บข้อมูลความลับ
                      </Label>
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-2">
            <GlobalFormField
              control={form.control}
              name="profile.taxId"
              label="เลขประจำตัวผู้เสียภาษี"
              type="number-box"
              groups={[1, 4, 5, 2, 1]}
              format="-"
              view={isEdit ? "edit" : "view"}
            />

            <GlobalFormField
              control={form.control}
              name="profile.phone"
              label="เบอร์โทรศัพท์ (ตัวเลขเท่านั้น)"
              type="number-box"
              view={isEdit ? "edit" : "view"}
              placeholder="กรอกเบอร์โทรศัพท์ เช่น 0912345678"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            <GlobalFormField
              control={form.control}
              name="customerType"
              label="ประเภทผู้ติดต่อ"
              type="select"
              view={isEdit ? "edit" : "view"}
              placeholder="เลือกประเภทผู้ติดต่อ เช่น บุคคลธรรมดา"
              options={customerType}
            />

            <GlobalFormField
              control={form.control}
              name="profile.position"
              label="ตำแหน่ง"
              type="input"
              view={isEdit ? "edit" : "view"}
              placeholder="กรอกตำแหน่งของลูกค้า เช่น แผนกบัญชี"
            />

            <GlobalFormField
              control={form.control}
              name="code"
              label="รหัสลูกค้า"
              type="input"
              view={isEdit ? "edit" : "view"}
              placeholder="กรอกรหัสลูกค้า เช่น CUT-001"
            />

            <GlobalFormField
              control={form.control}
              name="profile.lineName"
              label="ไอดีไลน์"
              type="number"
              view={isEdit ? "edit" : "view"}
              placeholder="กรอกไอดีไลน์ เช่น jupiter-123"
            />
            <GlobalFormField
              control={form.control}
              name="profile.faceBookName"
              label="ชื่อ Facebook"
              type="number"
              view={isEdit ? "edit" : "view"}
              placeholder="กรอกชื่อ facebook เช่น สมชาย หมายสุข"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
};
