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
  selectedBranchId?: string;
}

export const SettingOrganizationForm: React.FC<SettingOrganizationFormProps> = (
  props
) => {
  const { form, isLoading, editable, selectedBranchId } = props;
  const isBranch = Boolean(selectedBranchId);
  const labelForm = (branchLabel: string, orgLabel: string) =>
    isBranch ? branchLabel : orgLabel;

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
              <div className="space-y-4">
                {/* โลโก้ + สถานะ */}
                <div className="grid grid-cols-1 gap-5">
                  <GlobalFormField
                    control={form.control}
                    name="logoUrl"
                    label={labelForm("โลโก้สาขา", "โลโก้องค์กร")}
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

                {/* รหัส */}
                <div className="grid grid-cols-2 gap-5 mt-3">
                  <GlobalFormField
                    control={form.control}
                    name="code"
                    label={labelForm("รหัสสาขา", "รหัสองค์กร")}
                    placeholder={labelForm("กรอกรหัสสาขา", "กรอกรหัสองค์กร")}
                    type="input"
                    view={editable ? "edit" : "view"}
                  />
                </div>

                {/* ชื่อ + รายละเอียด */}
                <div className="grid grid-cols-2 gap-5 mt-3">
                  <GlobalFormField
                    control={form.control}
                    name="nameTh"
                    label={labelForm("ชื่อสาขา (ไทย)", "ชื่อองค์กร (ไทย)")}
                    placeholder={labelForm(
                      "กรอกชื่อสาขาภาษาไทย เช่น สาขาสามร้อยสิบห้าโปรดักชั่น",
                      "กรอกชื่อองค์กรภาษาไทย เช่น สามร้อยสิบห้าโปรดักชั่น"
                    )}
                    type="input"
                    view={editable ? "edit" : "view"}
                    required={editable}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="nameEn"
                    label={labelForm(
                      "ชื่อสาขา (อังกฤษ)",
                      "ชื่อองค์กร (อังกฤษ)"
                    )}
                    placeholder={labelForm(
                      "กรอกชื่อสาขาภาษาอังกฤษ  เช่น Samroi Sipha Production Branch",
                      "กรอกชื่อองค์กรภาษาอังกฤษ เช่น Samroi Sipha Production co."
                    )}
                    type="input"
                    view={editable ? "edit" : "view"}
                    required={editable}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="descriptionsTh"
                    label={labelForm(
                      "คำอธิบายสาขา (ภาษาไทย)",
                      "คำอธิบายองค์กร (ภาษาไทย)"
                    )}
                    placeholder={labelForm(
                      "กรอกคำอธิบายสาขา เช่น สาขาหลักขององค์กร",
                      "กรอกคำอธิบายองค์กร เช่น บริษัทดูแลเรื่องการจัดการชีวิต"
                    )}
                    type="textArea"
                    view={editable ? "edit" : "view"}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="descriptionsEn"
                    label={labelForm(
                      "คำอธิบายสาขา (ภาษาอังกฤษ)",
                      "คำอธิบายองค์กร (ภาษาอังกฤษ)"
                    )}
                    placeholder={labelForm(
                      "กรอกคำอธิบายสาขาอังกฤษ เช่น main branch of the organization",
                      "กรอกคำอธิบายองค์กรภาษาอังกฤษ เช่น life management company"
                    )}
                    type="textArea"
                    view={editable ? "edit" : "view"}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="openingDate"
                    label={labelForm(
                      "วันที่เปิดให้บริการสาขา",
                      "วันที่ก่อตั้งองค์กร"
                    )}
                    type="date"
                    view={editable ? "edit" : "view"}
                  />
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
                    label={labelForm("รูปแบบสาขา", "รูปแบบองค์กร")}
                    placeholder={labelForm(
                      "เลือกประเภทรูปแบบสาขา",
                      "เลือกประเภทรูปแบบองค์กร"
                    )}
                    type="select"
                    options={organizationType}
                    view={editable ? "edit" : "view"}
                    required={editable}
                  />

                  <GlobalFormField
                    control={form.control}
                    name="taxId"
                    label={labelForm(
                      "เลขประจำผู้เสียภาษีสาขา",
                      "เลขประจำผู้เสียภาษีองค์กร"
                    )}
                    type="number-box"
                    groups={[1, 4, 5, 2, 1]}
                    format="-"
                    formatter={formatTaxId}
                    view={editable ? "edit" : "view"}
                    required={editable}
                  />

                  <div className="flex items-center space-x-4">
                    <GlobalFormField
                      control={form.control}
                      name="registerVat"
                      label="ภาษีมูลค่าเพิ่ม"
                      labelCheckbox={labelForm(
                        "สาขามีการจดภาษีมูลค่าเพิ่ม",
                        "องค์กรมีการจดภาษีมูลค่าเพิ่ม"
                      )}
                      type="checkbox"
                      view={editable ? "edit" : "view"}
                    />
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
                    label={labelForm("สถานะสาขา", "สถานะองค์กร")}
                    placeholder={labelForm(
                      "เลือกสถานะสาขา",
                      "เลือกสถานะองค์กร"
                    )}
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
