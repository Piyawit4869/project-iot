import React from "react";
import { type UseFormReturn } from "react-hook-form";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Form } from "~/components/ui/form";
import type { OrganizationFormValues } from "~/schemas/settings";
import { GlobalFormField } from "~/components/shared/global-formField";
import {
  customerStatus,
  customerType,
  organizationType,
} from "~/initData/customer-initData";
import {
  formatPhoneNumber,
  formatTaxId,
} from "~/components/shared/global-format";

interface SettingOrganizationFormProps {
  form: UseFormReturn<OrganizationFormValues>;
  editable?: boolean;
  isLoading?: boolean;
}

export const SettingOrganizationForm: React.FC<SettingOrganizationFormProps> = (
  props
) => {
  const { form, isLoading, editable } = props;

  return (
    <Form {...form}>
      <div className="flex flex-col w-full space-y-8 px-8 py-4">
        <div id="SettingOrganization" className="space-y-4">
          <div className="gap-5 mb-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">รายละเอียดเกี่ยวกับองค์กร</h2>
            </div>
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonLoading
                      key={i}
                      className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-4  ">
                {/* Activity Name */}{" "}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                  <GlobalFormField
                    control={form.control}
                    name="logoUrl"
                    label="โลโก้"
                    type="image"
                    view={editable ? "edit" : "view"}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="active"
                    label="เปิดใช้งาน"
                    type="switch"
                    view={editable ? "edit" : "view"}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5 mt-3">
                  <GlobalFormField
                    control={form.control}
                    name="code"
                    label="รหัสสาขา"
                    placeholder="กรอกชื่อสาขาภาษาไทย เช่น สาขาสามร้อยสิบห้าโปรดักชั่น"
                    type="input"
                    view={editable ? "edit" : "view"}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5 mt-3">
                  {/* <GlobalFormField
                    control={form.control}
                    name="isMain"
                    label="สาขาหลัก"
                    labelCheckbox="กำหนดสาขานี้เป็นสาขาหลักขององค์กร"
                    type="checkbox"
                  /> */}
                  <GlobalFormField
                    control={form.control}
                    name="nameTh"
                    label="ชื่อสาขา (ไทย)"
                    placeholder="กรอกชื่อสาขาภาษาไทย เช่น สาขาสามร้อยสิบห้าโปรดักชั่น"
                    type="input"
                    view={editable ? "edit" : "view"}
                    required={editable ? true : false}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="nameEn"
                    label="ชื่อสาขา (อังกฤษ)"
                    placeholder="กรอกชื่อสาขาภาษาอังกฤษ เช่น Samroi Sipha Production Branch"
                    type="input"
                    view={editable ? "edit" : "view"}
                    required={editable ? true : false}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="descriptionsTh"
                    label="คำอธิบายสาขา (ภาษาไทย)"
                    placeholder="กรอกคำอธิบายภาษาไทย เช่น สาขาหลักขององค์กร"
                    type="textArea"
                    view={editable ? "edit" : "view"}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="descriptionsEn"
                    label="คำอธิบายสาขา (ภาษาอังกฤษ)"
                    placeholder="กรอกคำอธิบายอังกฤษ เช่น Main branch of the organization"
                    type="textArea"
                    view={editable ? "edit" : "view"}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="openingDate"
                    label="วันที่เปิดให้บริการ"
                    placeholder="กรอกคำอธิบายอังกฤษ เช่น Main branch of the organization"
                    type="date"
                    view={editable ? "edit" : "view"}
                  />

                  {/* <div className="flex items-center space-x-4 p-3 ">
                    <FormField
                      control={form.control}
                      name="active"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-end space-x-2 mt-2">
                            <FormLabel className="text-sm font-normal">
                              สถานะองค์กร
                            </FormLabel>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-primary"
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> */}
                </div>
              </div>
            )}
          </div>

          {/* <hr className="mt-8" /> */}

          <div className="gap-5 mb-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">ข้อมูลการลงทะเบียน</h2>
            </div>
            <div className="flex-4 gap-5">
              {isLoading ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <SkeletonLoading
                        key={i}
                        className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-5">
                  <GlobalFormField
                    control={form.control}
                    name="orgType"
                    label="รูปแบบองค์กร"
                    placeholder="เลือกประเภทรูปแบบองค์กร"
                    type="select"
                    options={organizationType}
                    view={editable ? "edit" : "view"}
                    required={editable ? true : false}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="taxId"
                    label="เลขประจำผู้เสียภาษี"
                    type="number-box"
                    groups={[1, 4, 5, 2, 1]}
                    format="-"
                    formatter={formatTaxId}
                    view={editable ? "edit" : "view"}
                    required={editable ? true : false}
                  />

                  <div className="flex items-center space-x-4  ">
                    <GlobalFormField
                      control={form.control}
                      name="registerVat"
                      label="ภาษีมูลค่าเพิ่ม"
                      labelCheckbox="สาขามีการจดภาษีมูลค่าเพิ่ม"
                      type="checkbox"
                      view={editable ? "edit" : "view"}
                    />

                    {/* <FormField
                      control={form.control}
                      name="registerVat"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-end space-x-2">
                            <FormLabel className="text-sm font-normal">
                              ลงทะเบียนสำหรับ VAT
                            </FormLabel>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-primary"
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="gap-5 mb-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">ประเภทและสถานะ</h2>
            </div>
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonLoading
                      key={i}
                      className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-4 gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <GlobalFormField
                    control={form.control}
                    name="fromType"
                    label="ประเภทธุรกิจ"
                    placeholder="เลือกประเภทธุรกิจ"
                    type="select"
                    options={customerType}
                    view={editable ? "edit" : "view"}
                    required={editable ? true : false}
                  />
                  <GlobalFormField
                    control={form.control}
                    name="status"
                    label="สถานะองค์กร"
                    placeholder="เลือกสถานะองค์กร"
                    type="select"
                    options={customerStatus}
                    view={editable ? "edit" : "view"}
                    required={editable ? true : false}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="gap-5 mb-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">เว็บไซต์</h2>
            </div>
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonLoading
                      key={i}
                      className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-4 gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <GlobalFormField
                    control={form.control}
                    name="websiteUrl"
                    label="ลิงก์เว็บไซต์"
                    placeholder="เช่น https://example.com"
                    type="input"
                    canCopy
                    options={customerStatus}
                    view={editable ? "edit" : "view"}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="domainName"
                    label="ชื่อโดเมน"
                    placeholder="เช่น utotech.co.th"
                    type="input"
                    canCopy
                    view={editable ? "edit" : "view"}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="gap-5 mb-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">ผู้ติดต่อ</h2>
            </div>
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonLoading
                      key={i}
                      className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
                  <GlobalFormField
                    control={form.control}
                    name="contactName"
                    label="ชื่อผู้ติดต่อ"
                    placeholder="เช่น นายสมชาย ใจดี"
                    type="input"
                    view={editable ? "edit" : "view"}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="contactEmail"
                    label="อีเมลผู้ติดต่อ"
                    placeholder="เช่น example@email.com"
                    type="input"
                    canCopy
                    view={editable ? "edit" : "view"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <GlobalFormField
                    control={form.control}
                    name="contactPhone"
                    label="เบอร์โทรผู้ติดต่อ"
                    placeholder="เช่น 0812345678"
                    type="number-box"
                    formatter={formatPhoneNumber}
                    view={editable ? "edit" : "view"}
                  />
                  <GlobalFormField
                    control={form.control}
                    name="contactLine"
                    label="Line ผู้ติดต่อ"
                    placeholder="เช่น line id หรือเบอร์โทร"
                    type="input"
                    view={editable ? "edit" : "view"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <GlobalFormField
                    control={form.control}
                    name="contactFacebook"
                    label="Facebook ผู้ติดต่อ"
                    placeholder="เช่น facebook.com/yourpage หรือชื่อโปรไฟล์"
                    type="input"
                    view={editable ? "edit" : "view"}
                  />
                  <GlobalFormField
                    control={form.control}
                    name="contactWhatsapp"
                    label="Whatsapp ผู้ติดต่อ"
                    placeholder="เช่น +66812345678"
                    type="input"
                    view={editable ? "edit" : "view"}
                  />
                  <GlobalFormField
                    control={form.control}
                    name="contactWebsite"
                    label="เว็บไซต์ผู้ติดต่อ"
                    placeholder="เช่น https://www.example.com"
                    type="input"
                    canCopy
                    view={editable ? "edit" : "view"}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <GlobalFormField
                    control={form.control}
                    name="contactNote"
                    label="หมายเหตุ"
                    placeholder="ข้อมูลเพิ่มเติมเกี่ยวกับผู้ติดต่อ (ถ้ามี)"
                    type="textArea"
                    view={editable ? "edit" : "view"}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};
