import { Hourglass, User } from "lucide-react";
import { FormTextRow } from "~/components/shared/formTextRow";
import { GlobalImage } from "~/components/shared/global-image";
import { RequiredLabel } from "~/components/shared/required-design";
import { Card } from "~/components/ui/card";
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
import { Separator } from "~/components/ui/separator";

export const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <div className="flex flex-col w-full">
    <span>{label}</span>
    <span className="mt-2 text-sm text-[#71717A]">{value ?? "-"}</span>
  </div>
);

export function CustomerSection({
  mode = "create",
  form,
  viewDataCustomer,
  customerData,
  isLoading,
  search,
  setSearch,
  customerDetail,
}: {
  mode: "create" | "view";
  form?: any;
  viewDataCustomer?: any;
  customerData?: any;
  isLoading?: boolean;
  search?: string;
  setSearch?: (v: string) => void;
  customerDetail?: (id: string) => void;
}) {
  const isView = mode === "view";

  return (
    <>
      {/* --------------------- CREATE MODE --------------------- */}
      {!isView && (
        <Card className="w-full p-4.5">
          <h3 className="font-semibold text-xl">ข้อมูลลูกค้า</h3>

          {/* SELECT ลูกค้า */}
          <div className="grid grid-cols-1 gap-3 mt-1">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel required>
                    เลือกลูกค้า <FormMessage />
                  </RequiredLabel>
                  <FormControl>
                    <Select
                      {...field}
                      disabled={isLoading}
                      onValueChange={(val) => {
                        field.onChange(val);
                        customerDetail?.(val);
                      }}
                    >
                      <SelectTrigger className="w-full h-12 py-6">
                        <SelectValue
                          placeholder={
                            isLoading ? (
                              <>
                                <Hourglass /> กำลังโหลดรายชื่อลูกค้า
                              </>
                            ) : (
                              <>
                                <User /> เลือกลูกค้า
                              </>
                            )
                          }
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {/* SEARCH BOX */}
                        <div className="p-2">
                          <input
                            type="input"
                            placeholder="ค้นหาลูกค้าด้วยชื่อ"
                            value={search}
                            onChange={(e) => setSearch?.(e.target.value)}
                            className="w-full px-2 py-2 border rounded"
                          />
                          <Separator className="my-3" />
                        </div>

                        {customerData && customerData.length > 0 ? (
                          customerData.map((item: any) => {
                            const fullName =
                              [
                                item.profile?.prefix,
                                item.profile?.firstName,
                                item.profile?.lastName,
                              ]
                                .filter(Boolean)
                                .join(" ") || item.profile?.name;

                            return (
                              <SelectItem key={item.id} value={item.id}>
                                <div className="flex items-center gap-3">
                                  <GlobalImage
                                    src={item?.profile?.imageUrl || ""}
                                    fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${fullName}`}
                                    className="w-10 h-10 rounded-full"
                                  />
                                  <div className="flex flex-col items-start">
                                    <span>{fullName}</span>
                                    <span className="text-gray-500 text-sm">
                                      ไอดีไลน์: {item.profile?.lineName || "-"}
                                    </span>
                                  </div>
                                </div>
                              </SelectItem>
                            );
                          })
                        ) : (
                          <div className="px-4 py-5 text-center text-gray-500">
                            ไม่พบลูกค้า กรุณาลองใหม่อีกครั้ง
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* FIELDS */}
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormTextRow
              name="customer.companyName"
              label="ชื่อบริษัท"
              control={form.control}
            />
            <FormTextRow
              name="customer.customerType"
              label="ประเภทผู้ติดต่อ"
              control={form.control}
            />
            <FormTextRow
              name="customer.taxID"
              label="เลขประจำตัวผู้เสียภาษี"
              control={form.control}
            />
            <FormTextRow
              name="customer.contactName"
              label="ผู้ติดต่อ (Contact Person)"
              control={form.control}
            />
            <FormTextRow
              name="customer.address"
              label="ที่อยู่"
              control={form.control}
            />
            <FormTextRow
              name="customer.postalCode"
              label="รหัสไปรษณีย์"
              control={form.control}
            />
            <FormTextRow
              name="customer.email"
              label="อีเมล"
              control={form.control}
            />
            <FormTextRow
              name="customer.phone"
              label="เบอร์โทรศัพท์"
              control={form.control}
            />
          </div>
        </Card>
      )}

      {/* --------------------- VIEW MODE --------------------- */}
      {isView && (
        <Card className="w-full p-6">
          <h1 className="font-semibold text-lg mb-3">ข้อมูลลูกค้า</h1>

          {/* PROFILE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-4">
              <GlobalImage
                src={
                  customerData?.imageUrl ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${customerData?.firstName}`
                }
                className="w-13 h-13 rounded-lg"
              />
              <InfoItem
                label="ชื่อลูกค้า"
                value={
                  customerData
                    ? `${customerData.prefix ?? ""} ${
                        customerData.firstName ?? ""
                      } ${customerData.lastName ?? ""}`.trim()
                    : "-"
                }
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <InfoItem
              label="เลขประจำตัวผู้เสียภาษี"
              value={customerData?.taxId || "-"}
            />
            <InfoItem
              label="ประเภทลูกค้า"
              value={customerData?.customerType || "-"}
            />
            <InfoItem label="อีเมล" value={customerData?.email || "-"} />
            <InfoItem
              label="เบอร์โทรศัพท์"
              value={customerData?.phone || "-"}
            />
            <InfoItem label="ที่อยู่" value={customerData?.address || "-"} />
            <InfoItem
              label="รหัสไปรษณีย์"
              value={customerData?.postalCode || "-"}
            />
          </div>
        </Card>
      )}
    </>
  );
}
