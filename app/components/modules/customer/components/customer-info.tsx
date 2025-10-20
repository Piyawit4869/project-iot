import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { RequiredLabel } from "~/components/shared/required-design";
import ImageUpload from "~/components/shared/image-upload";
import {
  customerStatus,
  customerType,
  gender,
  organizationType,
  prefix,
} from "~/initData/customer-initData";
import { DatePicker } from "~/components/shared/date-picker";
import { onlyNumber } from "~/components/shared/global-format";

export const CustomerInfoCard: React.FC<CustomerFormCreateProps> = ({
  form,
  loading = false,
}) => {
  // const getOrgType = form.watch("organizationDetails.orgType");

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="text-base font-bold">ข้อมูลลูกค้า</CardTitle>
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
        <div className="space-y-4 px-6">
          {/* Activity Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="profile.imageUrl"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>รูปลูกค้า</RequiredLabel>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>สถานะบัญชี</RequiredLabel>
                  <FormControl className="w-full">
                    <Select
                      {...field}
                      onValueChange={(v) => {
                        field.onChange(v);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือกสถานะบัญชีผู้ติดต่อ เช่น ลงทะเบียนใหม่" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {customerStatus.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
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
              name="active"
              render={({ field }) => (
                <FormItem className="py-2 w-25 items-center flex flex-col">
                  <RequiredLabel>เปิดใช้งาน</RequiredLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="profile.prefix"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>คำนำหน้า</RequiredLabel>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger className="w-full shadow-none">
                        <SelectValue placeholder="เลือกคำนำหน้า" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {prefix.map((item) => {
                        return (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <FormField
              control={form.control}
              name="profile.firstName"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ชื่อจริง (ภาษาอังกฤษ)</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      {...field}
                      placeholder="กรอกชื่อจริงของลูกค้า เช่น Somchai"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.lastName"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>นามสกุล (ภาษาอังกฤษ)</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      {...field}
                      placeholder="กรอกนามสกุลของลูกค้า เช่น Maisuk"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="profile.firstName"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel required>
                    ชื่อ <FormMessage />
                  </RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกชื่อจริงของลูกค้า เช่น สมชาย"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.lastName"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>นามสกุล</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกนามสกุลของลูกค้า เช่น หมายสุข "
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.nickName"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ชื่อเล่น</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกชื่อเล่นของลูกค้า เช่น หนุ่ม"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.gender"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>เพศ</RequiredLabel>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger className="w-full shadow-none">
                        <SelectValue placeholder="เลือกเพศของลูกค้า" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {gender.map((item) => {
                        return (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.birthDate"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>วัน/เดือน/ปี เกิด</RequiredLabel>
                  <FormControl className="w-full">
                    <DatePicker
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profile.age"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>อายุ (ตัวเลขเท่านั้น)</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      type="number"
                      placeholder="กรอกอายุลูกค้า เช่น 25"
                      onChange={onlyNumber(field)}
                      maxLength={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consentPii"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-full">
                    <div className="flex items-center gap-3">
                      <Checkbox id="agree" />
                      <Label {...field} htmlFor="agree">
                        การอนุญาตให้เก็บข้อมูลความลับ
                      </Label>
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.taxId"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>
                    เลขประจำตัวผู้เสียภาษี (ตัวเลขเท่านั้น)
                  </RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกเลขประจำตัวผู้เสียภาษี 13 หลัก"
                      onChange={onlyNumber(field)}
                      maxLength={13}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerType"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ประเภทผู้ติดต่อ</RequiredLabel>
                  <Select
                    {...field}
                    onValueChange={(v) => {
                      field.onChange(v);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกประเภทผู้ติดต่อ เช่น บุคคลธรรมดา" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {customerType.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.position"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ตำแหน่ง</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกตำแหน่งของลูกค้า เช่น แผนกบัญชี"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"code"}
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>รหัสลูกค้า</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      {...field}
                      placeholder="กรอกรหัสลูกค้า เช่น CUT-001"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profile.phone"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>เบอร์โทรศัพท์ (ตัวเลขเท่านั้น)</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกเบอร์โทรศัพท์ เช่น 0912345678"
                      onChange={onlyNumber(field)}
                      maxLength={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profile.lineName"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ไอดีไลน์</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกไอดีไลน์ เช่น jupiter-123"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.faceBookName"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ชื่อ Facebook</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกชื่อ facebook เช่น สมชาย หมายสุข"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ------------------------------------------------------------------------ */}
          <div className="flex gap-2 mt-4">
            <CardTitle className="text-base font-bold">
              ข้อมูลเพิ่มเติม
            </CardTitle>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="organizationDetails.businessName"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ชื่อบริษัท</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกชื่อบริษัท เช่น บริษัท ทำได้ไม่ จำกัด"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organizationDetails.fromType"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ประเภทธุรกิจ</RequiredLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl className="w-full">
                      <SelectTrigger className="w-full shadow-none">
                        <SelectValue placeholder="เลือกประเภทธุรกิจ เช่น บุคคลธรรมดา" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {customerType.map((item) => {
                        return (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organizationDetails.branchCode"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>รหัสสาขา</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกรหัสสาขา เช่น 0001"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profile.country"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ประเทศ</RequiredLabel>
                  <FormControl className="w-full text-gray-500 text-sm">
                    <span {...field}>{/* {field.value  } */}ไทย</span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="organizationDetails.businessPhone"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>
                    เบอร์โทรสำนักงาน/บริษัท (ตัวเลขเท่านั้น)
                  </RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกเบอร์โทรสำนักงาน/บริษัท เช่น 0421234567"
                      onChange={onlyNumber(field)}
                      maxLength={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationDetails.businessFax"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>เบอร์โทรสาร (ตัวเลขเท่านั้น)</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกเบอร์โทรสาร เช่น 0123456789"
                      onChange={onlyNumber(field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationDetails.businessEmail"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>อีเมล</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกอีเมลบริษัท เช่น organization@gmail.com"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationDetails.importantDate"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>วันสำคัญของสำนักงาน/บริษัท</RequiredLabel>
                  <FormControl className="w-full">
                    <DatePicker
                      value={field.value ?? undefined}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationDetails.openingDate"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>วันก่อตั้งของสำนักงาน/บริษัท</RequiredLabel>
                  <FormControl className="w-full">
                    <DatePicker
                      value={field.value ?? undefined}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationDetails.orgType"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ประเภทสำนักงาน/บริษัท</RequiredLabel>
                  <FormControl className="w-full">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl className="w-full">
                        <SelectTrigger className="w-full shadow-none">
                          <SelectValue placeholder="เลือกประเภทสำนักงาน/บริษัท เช่น ร้านค้า" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {organizationType.map((item) => {
                          return (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div></div>
            {/* {getOrgType === "others" && (
              <FormField
                control={form.control}
                name="organizationDetails.orgTypeOther"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel>ประเภทสำนักงาน/บริษัท</RequiredLabel>
                    <FormControl className="w-full">
                      <Input
                        value={field.value || ""}
                        placeholder=""
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )} */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="organizationDetails.websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>เว็บไซต์</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      placeholder="กรอกเว็บไซต์ของบริษัท เช่น https://somchaitrading.co.th"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organizationDetails.note"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>โน้ต</RequiredLabel>
                  <FormControl className="w-full">
                    <Textarea
                      value={field.value ?? ""}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      rows={4}
                      placeholder="กรอกโน้ตสำหรับบริษัท เช่น Company registered in Bangkok"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organizationDetails.descriptions"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>รายละเอียด</RequiredLabel>
                  <FormControl className="w-full">
                    <Textarea
                      value={field.value ?? ""}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      rows={4}
                      placeholder="ใส่รายละเอียดบริษัท เช่น Importer and distributor"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )}
    </Card>
  );
};
