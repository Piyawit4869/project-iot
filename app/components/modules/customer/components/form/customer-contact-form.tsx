import { DatePicker } from "~/components/shared/date-picker";
import { FormTextRow } from "~/components/shared/formTextRow";
import { onlyNumber } from "~/components/shared/global-format";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { customerType, organizationType } from "~/initData/customer-initData";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";

export const FormCustomerContact: React.FC<CustomerFormCreateProps> = ({
  form,
  loading = false,
}) => {
  // const getOrgType = form.watch("organizationDetails.orgType");
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
        <div className="space-y-4 px-6">
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

            <FormField
              control={form.control}
              name="organizationDetails.fromType"
              rules={{ required: true }}
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
                    <RequiredLabel>โปรดกรอกประเภทบริษัท</RequiredLabel>
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
                      placeholder="กรอกเบอร์โทรสำนักงาน/บริษัท"
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
              name={"organizationDetails.businessFax"}
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel>เบอร์โทรสาร (ตัวเลขเท่านั้น)</RequiredLabel>
                  <FormControl className="w-full">
                    <Input
                      value={field.value || ""}
                      placeholder="กรอกเบอร์โทรสาร"
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
