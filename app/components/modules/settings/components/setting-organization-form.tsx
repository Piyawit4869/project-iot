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

interface SettingOrganizationFormProps {
  form: UseFormReturn<OrganizationFormValues>;
  editable?: boolean;
  isLoading?: boolean;
}

export const SettingOrganizationForm: React.FC<SettingOrganizationFormProps> = (
  props
) => {
  const { form, isLoading } = props;

  const [statusSearchTerm, setStatusSearchTerm] = React.useState<string>("");
  const [typeSearchTerm, setTypeSearchTerm] = React.useState<string>("");
  const [debouncedStatusSearch] = React.useState<string>("");
  const [debouncedTypeSearch] = React.useState<string>("");

  const statusOptions: OptionStatus = [
    { label: "ลงทะเบียนใหม่", value: "newly_registered" },
    { label: "ใช้งานอยู่", value: "active" },
    { label: "ลูกค้าประจำ", value: "loyal_customer" },
    { label: "มีความเสี่ยง", value: "at_risk" },
    { label: "ยกเลิกใช้งาน", value: "churned" },
  ] as const;

  const typeOptions: typeof statusOptions = [
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonLoading
                      key={i}
                      className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-4 gap-7">
                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>โลโก้องค์กร</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || ""}
                          onChange={field.onChange}
                          className="object-contain"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-7 mt-3">
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

                  <FormField
                    control={form.control}
                    name="descriptionsTh"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>คำอธิบาย (ไทย)</FormLabel>
                        <FormControl>
                          <Input placeholder="กรอกคำอธิบาย (ไทย)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="descriptionsEn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>คำอธิบาย (อังกฤษ)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="กรอกคำอธิบาย (อังกฤษ)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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

                  <div className="flex items-center space-x-4 p-3 ">
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
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* <hr className="mt-8" /> */}

          <div className="gap-4 mb-6">
            <div className="mb-5">
              <h2 className="text-xl font-bold">ข้อมูลการลงทะเบียน</h2>
            </div>
            <div className="flex-4 gap-7">
              {isLoading ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <SkeletonLoading
                        key={i}
                        className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-7">
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
                    <FormField
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
                    />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonLoading
                      key={i}
                      className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-4 gap-7">
                <div className="grid grid-cols-2 gap-7">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonLoading
                      key={i}
                      className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-4 gap-7">
                <div className="grid grid-cols-2 gap-7">
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
              <h2 className="text-xl font-bold">ข้อมูลติดต่อ</h2>
            </div>
            {isLoading ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonLoading
                      key={i}
                      className={`h-7 ${i % 4 < 2 ? "w-30" : ""}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-4 gap-7">
                <div className="grid grid-cols-2 gap-7">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อผู้ติดต่อ</FormLabel>
                        <FormControl>
                          <Input placeholder="กรอกชื่อผู้ติดต่อ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>อีเมลผู้ติดต่อ</FormLabel>
                        <FormControl>
                          <Input placeholder="กรอกอีเมลผู้ติดต่อ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>เบอร์โทรผู้ติดต่อ</FormLabel>
                        <FormControl>
                          <Input placeholder="กรอกเบอร์โทรศัพท์" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactLine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ไอดีไลน์ผู้ติดต่อ</FormLabel>
                        <FormControl>
                          <Input placeholder="กรอกไอดีไลน์" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactFacebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>เฟสบุ๊คผู้ติดต่อ</FormLabel>
                        <FormControl>
                          <Input placeholder="กรอกเฟสบุ๊ค" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactWhatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp ผู้ติดต่อ</FormLabel>
                        <FormControl>
                          <Input placeholder="กรอกWhatsApp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactWebsite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>เว็บไซต์ผู้ติดต่อ</FormLabel>
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
                    name="contactNote"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>หมายเหตุเพิ่มเติม</FormLabel>
                        <FormControl>
                          <Input placeholder="หมายเหตุ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
