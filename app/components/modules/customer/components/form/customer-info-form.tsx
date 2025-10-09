import { Checkbox } from "@radix-ui/react-checkbox";
import { DatePicker } from "~/components/shared/date-picker";
import { onlyNumber } from "~/components/shared/global-format";
import ImageUpload from "~/components/shared/image-upload";
import { RequiredLabel } from "~/components/shared/required-design";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  customerStatus,
  customerType,
  gender,
  prefix,
} from "~/initData/customer-initData";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";

export const FormCustomerInfoCard: React.FC<CustomerFormCreateProps> = ({
  form,
  loading = false,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2 justify-between">
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
        <CardContent className="space-y-4">
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

          <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="profile.firstName"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel required>ชื่อ</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกชื่อจริงของลูกค้า เช่น สมชาย"
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
              name={"profile.nickName"}
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>ชื่อเล่น</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกชื่อเล่นของลูกค้า"
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
                  <RequiredLabel>อายุ</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      type="number"
                      placeholder="กรอกอายุลูกค้า เช่น 25"
                      onChange={onlyNumber(field)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 py-4 md:grid-cols-2 gap-7">
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
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="profile.taxId"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>เลขประจำตัวผู้เสียภาษี</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกเลขประจำตัวผู้เสียภาษี 13 หลัก"
                      onChange={onlyNumber(field)}
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
                    value={field.value || ""}
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
              name="profile.phone"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>เบอร์โทรศัพท์</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกเบอร์โทรศัพท์ เช่น 0912345678"
                      onChange={onlyNumber(field)}
                    />
                  </FormControl>
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
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>สถานะบัญชี</RequiredLabel>
                  <FormControl className="w-full">
                    <Select
                      value={field.value || ""}
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
          </div>
        </CardContent>
      )}
    </Card>
  );
};
