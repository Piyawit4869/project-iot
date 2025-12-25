"use client";

import React, { useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { DatePicker } from "~/components/shared/date-picker";
import ImageUpload from "~/components/shared/image-upload";
import { InputNumberBox } from "~/components/shared/input-number-box";

import { RequiredLabel } from "~/components/shared/required-design";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Card } from "~/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import type { OrganizationFormValues } from "~/schemas/settings";
import type { OptionStatus } from "~/types/settings";
import { OrganizationContactCard } from "./create-organization/organization-contact-card";
import { GlobalFormField } from "~/components/shared/global-formField";
import { customerType } from "~/initData/customer-initData";

interface SettingOrganizationFormProps {
  form: UseFormReturn<OrganizationFormValues>;
  editable?: boolean;
  isLoading?: boolean;
}

export const statusOptions: OptionStatus = [
  { label: "ลงทะเบียนใหม่", value: "newly_registered" },
  { label: "ใช้งานอยู่", value: "active" },
  { label: "ลูกค้าประจำ", value: "loyal_customer" },
  { label: "มีความเสี่ยง", value: "at_risk" },
  { label: "ยกเลิกใช้งาน", value: "churned" },
] as const;

export const typeOptions: typeof statusOptions = [
  { label: "บุคคลธรรมดา", value: "taxpayer" },
  { label: "ห้างหุ้นส่วนสามัญ", value: "ordinary_partnership" },
  { label: "ร้านค้า", value: "shop" },
  { label: "คณะบุคคล", value: "body_of_person" },
  { label: "บริษัทจำกัด", value: "company_limited" },
  { label: "บริษัทมหาชนจำกัด", value: "public_company_limited" },
  { label: "ห้างหุ้นส่วนจำกัด", value: "limited_partnership" },
  { label: "มูลนิธิ", value: "foundation" },
  { label: "สมาคม", value: "association" },
  { label: "กิจการร่วมค้า", value: "joint_venture" },
  { label: "อื่น ๆ", value: "others" },
] as const;

export const SettingOrganizationForm: React.FC<SettingOrganizationFormProps> = (
  props
) => {
  const { form, isLoading } = props;

  const [statusSearchTerm, setStatusSearchTerm] = React.useState<string>("");
  const [typeSearchTerm, setTypeSearchTerm] = React.useState<string>("");
  const [debouncedStatusSearch] = React.useState<string>("");
  const [debouncedTypeSearch] = React.useState<string>("");

  const fromTypeOptions: typeof statusOptions = [
    { label: "บุคคลธรรมดา", value: "ordinary_person" },
    { label: "นิติบุคคล", value: "juristic_person" },
  ];

  const filteredStatusOptions = statusOptions.filter((o) =>
    o.label.toLowerCase().includes(debouncedStatusSearch.toLowerCase())
  );
  const filteredTypeOptions = typeOptions.filter((o) =>
    o.label.toLowerCase().includes(debouncedTypeSearch.toLowerCase())
  );

  return (
    <Form {...form}>
      <div className="flex flex-col w-full space-y-8 px-8 py-4">
        <div id="SettingOrganization" className="space-y-4">
          <div className="gap-4 mb-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">รายละเอียดเกี่ยวกับองค์กร</h2>
            </div>
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <GlobalFormField
                    control={form.control}
                    name="logoUrl"
                    label="โลโก้ของสาขา"
                    type="image"
                  />

                  <GlobalFormField
                    control={form.control}
                    name="active"
                    label="เปิดใช้งาน"
                    type="switch"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
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
                  <FormField
                    control={form.control}
                    name="nameTh"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel required>ชื่อ (ไทย)</RequiredLabel>
                        <FormControl>
                          <Input placeholder="กรอกชื่อ (ไทย)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nameEn"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel required>ชื่อ (อังกฤษ)</RequiredLabel>
                        <FormControl>
                          <Input placeholder="กรอกชื่อ (อังกฤษ)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
                    name="fromType"
                    label="ประเภทสาขา"
                    placeholder="เลือกประเภทสาขา"
                    options={customerType}
                    type="select"
                    required
                  />
                  <FormField
                    control={form.control}
                    name="openingDate"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel required>
                          วันที่เปิดให้บริการ
                        </RequiredLabel>
                        <FormControl>
                          <DatePicker
                            value={field.value ?? ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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

          <div className="gap-4 mb-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">ข้อมูลการลงทะเบียน</h2>
            </div>
            <div className="flex-4 gap-4">
              {isLoading ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <SkeletonLoading
                        key={i}
                        className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fromType"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <RequiredLabel required>รูปการลงทะเบียน</RequiredLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="เลือกประเภทธุรกิจ" />
                            </SelectTrigger>
                            <SelectContent>
                              {fromTypeOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>หมายเลขประจำตัว</FormLabel>
                        <FormControl>
                          <InputNumberBox
                            value={field.value || ""}
                            onChange={field.onChange}
                            groups={[1, 4, 5, 2, 1]}
                            format="-"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center space-x-4 p-3">
                    <GlobalFormField
                      control={form.control}
                      name="registerVat"
                      label="ภาษีมูลค่าเพิ่ม"
                      labelCheckbox="สาขามีการจดภาษีมูลค่าเพิ่ม"
                      type="checkbox"
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

          <div className="gap-4 mb-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">ประเภทและสถานะ</h2>
            </div>
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonLoading
                      key={i}
                      className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-4 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="min-w-[300px]">
                        <FormLabel>สถานะขององค์กร</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="เลือกสถานะองค์กร" />
                            </SelectTrigger>
                            <SelectContent>
                              <Input
                                placeholder="Search สถานะ"
                                value={statusSearchTerm}
                                onChange={(e) =>
                                  setStatusSearchTerm(e.target.value)
                                }
                                className="mb-2"
                              />
                              {filteredStatusOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="branchType"
                    render={({ field }) => (
                      <FormItem className="min-w-[300px]">
                        <FormLabel>ประเภทธุรกิจ</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="เลือกประเภทองค์กร" />
                            </SelectTrigger>
                            <SelectContent>
                              <Input
                                placeholder="Search ประเภท"
                                value={typeSearchTerm}
                                onChange={(e) =>
                                  setTypeSearchTerm(e.target.value)
                                }
                                className="mb-2"
                              />
                              {filteredTypeOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="gap-4 mb-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">เว็บไซต์</h2>
            </div>
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonLoading
                      key={i}
                      className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-4 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ลิงก์เว็บไซต์</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://utotech.co.th"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="domainName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อโดเมน</FormLabel>
                        <FormControl>
                          <Input placeholder="utotech.co.th" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="gap-4 mb-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">ผู้ติดต่อ</h2>
            </div>
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                  <GlobalFormField
                    control={form.control}
                    name="contactName"
                    label="ชื่อผู้ติดต่อ"
                    placeholder="เช่น นายสมชาย ใจดี"
                    type="input"
                    //  view={isEdit ? "edit" : "view"}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="contactEmail"
                    label="อีเมลผู้ติดต่อ"
                    placeholder="เช่น example@email.com"
                    type="input"
                    //  view={isEdit ? "edit" : "view"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <GlobalFormField
                    control={form.control}
                    name="contactPhone"
                    label="เบอร์โทรผู้ติดต่อ"
                    placeholder="เช่น 0812345678"
                    type="number-box"
                    //  view={isEdit ? "edit" : "view"}
                  />
                  <GlobalFormField
                    control={form.control}
                    name="contactLine"
                    label="Line ผู้ติดต่อ"
                    placeholder="เช่น line id หรือเบอร์โทร"
                    type="input"
                    //  view={isEdit ? "edit" : "view"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <GlobalFormField
                    control={form.control}
                    name="contactFacebook"
                    label="Facebook ผู้ติดต่อ"
                    placeholder="เช่น facebook.com/yourpage หรือชื่อโปรไฟล์"
                    type="input"
                    //  view={isEdit ? "edit" : "view"}
                  />
                  <GlobalFormField
                    control={form.control}
                    name="contactWhatsapp"
                    label="Whatsapp ผู้ติดต่อ"
                    placeholder="เช่น +66812345678"
                    type="input"
                    //  view={isEdit ? "edit" : "view"}
                  />
                  <GlobalFormField
                    control={form.control}
                    name="contactWebsite"
                    label="เว็บไซต์ผู้ติดต่อ"
                    placeholder="เช่น https://www.example.com"
                    type="input"
                    canCopy
                    //  view={isEdit ? "edit" : "view"}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <GlobalFormField
                    control={form.control}
                    name="contactNote"
                    label="หมายเหตุ"
                    placeholder="ข้อมูลเพิ่มเติมเกี่ยวกับผู้ติดต่อ (ถ้ามี)"
                    type="textArea"
                    //  view={isEdit ? "edit" : "view"}
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
