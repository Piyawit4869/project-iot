"use client";

import { Hourglass, User } from "lucide-react";
import React from "react";
import { DatePicker } from "~/components/shared/date-picker";
import { FormTextRow } from "~/components/shared/formTextRow";
import { GlobalImage } from "~/components/shared/global-image";
import { RequiredLabel } from "~/components/shared/required-design";
import { Card } from "~/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { currencyType, notationType } from "~/initData/order-initData";
import type { OrderFormProps } from "~/schemas/order/type";
import { useDebounce } from "../order-function";
import { useCustomerPaginate } from "~/api/client/customer/useCustomer";
import { ListProduct } from "../product-list";
import { OrderProvider } from "~/hooks/order/order";
import { SignatureDocument } from "../signature";
// import SignatureDocument from "../signature";
// import { ListProduct } from "../product-list";

// import { CustomerType } from "@/app/(backoffice)/[organization]/customer/_modules/types/customer";

export const OrderForm: React.FC<OrderFormProps> = ({
  form,
  Price,
  quantities,
  totalVat,
}) => {
  const customerPaginate = useCustomerPaginate;
  const [search, setSearch] = React.useState("");

  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } = customerPaginate({
    pageIndex: 1,
    pageSize: 20,
    name: debouncedSearch,
  });

  const customerData = data?.items;

  const customerDetail = (customerId: string) => {
    const singleCustomer = customerData?.find((c: any) => c.id === customerId);

    if (!singleCustomer) return;

    form.setValue("branchId", singleCustomer.branchId);
    form.setValue("customer.id", singleCustomer.id);
    form.setValue("customer.taxID", singleCustomer.profile.taxId ?? "");
    form.setValue("customer.customerType", singleCustomer.customerType ?? "");
    form.setValue("customer.email", singleCustomer.email ?? "");
    form.setValue("customer.phone", singleCustomer.profile.phone ?? "");
    form.setValue("customer.address", singleCustomer.profile.address ?? "");
    form.setValue(
      "customer.postalCode",
      singleCustomer.profile.postalCode ?? ""
    );
  };
  // const vat = form.watch("vat");
  const discount = form.watch("discount");
  const startDate = form.watch("startDate");
  const expireDate = form.watch("expireDate");

  // const wht = form.watch("wht");
  // const totalNoVat = (Price ?? 0) - (discount ?? 0) - (wht ?? 0);
  const totalAddVat = (Price ?? 0) + (totalVat ?? 0) - (discount ?? 0);

  const startDay = React.useMemo(() => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);

    return d;
  }, [startDate]);

  const endDay = React.useMemo(() => {
    const d = new Date(expireDate);
    d.setDate(d.getDate() - 1);
    d.setHours(0, 0, 0, 0);

    return d;
  }, [expireDate]);

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-xl">ข้อมูลออเดอร์</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* <FormField
          control={form.control}
          name="docNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เลขที่ออเดอร์</FormLabel>
              <FormControl>
                <Input placeholder="12345" {...field} />
              </FormControl>
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="docName"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel required>
                ชื่อออเดอร์ <FormMessage />
              </RequiredLabel>
              <FormControl>
                <Input placeholder="กรอกชื่อออเดอร์" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>บริษัท (Company)</FormLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue="quotation"
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกประเภทเอกสาร" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {notationType.map((item) => (
                    <SelectItem
                      disabled={item.value !== "quotation"}
                      key={item.value}
                      value={item.value}
                    >
                      {item.icon}
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ประเภทเอกสาร</FormLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue="quotation"
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกประเภทเอกสาร" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {notationType.map((item) => (
                    <SelectItem
                      disabled={item.value !== "quotation"}
                      key={item.value}
                      value={item.value}
                    >
                      {item.icon}
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="suppliers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ผู้ขาย</FormLabel>
                <Select
                  {...field}
                  value={field.value ?? undefined}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกผู้ขาย" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* {notationType.map((item) => (
                      <SelectItem
                        disabled={item.value !== "quotation"}
                        key={item.value}
                        value={item.value}
                      >
                        {item.icon}
                        {item.label}
                      </SelectItem>
                    ))} */}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        {/* <FormField
          control={form.control}
          name="suppliers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ซัพพลายเออร์</FormLabel>
              <Select {...field} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="เลือกซัพพลายเออร์" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {forMockData.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        /> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="startDate"
          // name="orderDate"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel required>
                วันที่สั่งซื้อออเดอร์ <FormMessage />
              </RequiredLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={(d) => {
                    const dd = new Date(d);
                    dd.setHours(0, 0, 0, 0);
                    return dd > endDay;
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expireDate"
          render={({ field }) => (
            <FormItem>
              <RequiredLabel required>
                วันที่หมดอายุ <FormMessage />
              </RequiredLabel>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={(d) => {
                    const dd = new Date(d);
                    dd.setHours(0, 0, 0, 0);
                    return dd < startDay;
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="docNo"
            render={({ field }) => (
              <FormItem>
                <RequiredLabel required>
                  หมายเลขเอกสาร <FormMessage />
                </RequiredLabel>
                <FormControl>
                  <Input placeholder="กรอกชื่อออเดอร์" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <Card className="w-full p-4.5">
        <h3 className="font-semibold text-xl">ข้อมูลลูกค้า</h3>
        <div className="grid grid-cols-1 gap-3 mt-1">
          <FormField
            control={form.control}
            name="customerId"
            render={({ field }) => {
              return (
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
                        customerDetail(val);
                      }}
                    >
                      <SelectTrigger className="w-full h-12 py-6">
                        <SelectValue
                          placeholder={
                            isLoading ? (
                              <>
                                <Hourglass />
                                กำลังโหลดรายชื่อลูกค้า
                              </>
                            ) : (
                              <>
                                <User />
                                เลือกลูกค้า
                              </>
                            )
                          }
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <div className="p-2">
                          <input
                            type="text"
                            placeholder="ค้นหาลูกค้าด้วยชื่อ"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
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
                                <div className="flex items-center gap-3 w-full p-0.5">
                                  <GlobalImage
                                    src={item?.profile?.imageUrl || ""}
                                    fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${
                                      fullName || ""
                                    }`}
                                    className="w-10 h-10 rounded-full"
                                  />
                                  <div className="flex flex-col items-start ">
                                    <span>{fullName}</span>
                                    <span className="text-gray-500 text-sm">
                                      {item?.profile?.lineName
                                        ? `ไอดีไลน์ : ${item.profile.lineName}`
                                        : "ไอดีไลน์ : -"}
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
              );
            }}
          />
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormTextRow
            control={form.control}
            name="customer.companyName"
            label="ชื่อบริษัท"
          />
          <FormTextRow
            control={form.control}
            name="customer.customerType"
            label="ประเภทผู้ติดต่อ"
          />
          <FormTextRow
            control={form.control}
            name="customer.taxID"
            label="เลขประจำตัวผู้เสียภาษี"
          />
          <FormTextRow
            control={form.control}
            name="customer.taxID"
            label="ผู้ติดต่อ (Contact Person)"
          />
          <FormTextRow
            control={form.control}
            name="customer.address"
            label="ที่อยู่"
          />
          <FormTextRow
            control={form.control}
            name="customer.postalCode"
            label="รหัสไปรษณีย์"
          />
          <FormTextRow
            control={form.control}
            name="customer.email"
            label="อีเมล"
          />
          <FormTextRow
            control={form.control}
            name="customer.phone"
            label="เบอร์โทรศัพท์"
          />
        </div>
      </Card>

      <hr />

      <h1 className="font-semibold text-xl">รายการสินค้า</h1>
      <OrderProvider>
        <ListProduct customerId={""} />
      </OrderProvider>

      <hr />

      <h1 className="font-semibold text-xl">การชำระเงินและเงื่อนไข</h1>
      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ภาษีมูลค่าเพิ่ม</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} value={field.value ?? ""} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ภาษีมูลหัก ณ ที่จ่าย</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} value={field.value ?? ""} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>จำนวนวันเครดิต (วัน)</FormLabel>
              <FormControl>
                <Input
                  placeholder="30 วัน"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>สกุลเงิน</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue="THB"
              >
                <FormControl>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="เลือกสกุลเงิน" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currencyType?.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.icon} {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ส่วนลด</FormLabel>
              <FormControl>
                <Input
                  placeholder="กรอกส่วนลด"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>หมายเหตุ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="ระบุหมายเหตุ..."
                  value={field.value || ""}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <h1 className="font-semibold text-xl">ส่วนเซ็นเอกสาร</h1>
      <FormField
        control={form.control}
        name="note"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>ตราประทับ</FormLabel>
            <FormControl>
              <Input
                type="file"
                placeholder="เลือกไฟล์ ตราประทับ"
                value={field.value || ""}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h1 className="font-semibold text-xl">ผู้จัดทำ</h1>
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>อัพโหลดลายเซ็นต์</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="เลือกไฟล์ ตราประทับ"
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div>
          <h1 className="font-semibold text-xl">อนุมัติโดย</h1>

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="mt-3">
                {/* <FormLabel>อัพโหลดลายเซ็นต์</FormLabel> */}
                <FormControl>
                  <div>
                    <Input
                      type="file"
                      placeholder="เลือกไฟล์ ตราประทับ"
                      value={field.value || ""}
                      className="hidden"
                    />
                    <SignatureDocument />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อ</FormLabel>
              <FormControl>
                <Input placeholder="กรอกชื่อ" value={field.value || ""} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อ</FormLabel>
              <FormControl>
                <Input placeholder="กรอกชื่อ" value={field.value || ""} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ตำแหน่ง</FormLabel>
              <FormControl>
                <Input placeholder="กรอกตำแหน่ง" value={field.value || ""} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ตำแหน่ง</FormLabel>
              <FormControl>
                <Input placeholder="กรอกตำแหน่ง" value={field.value || ""} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>วันที่</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>วันที่</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
};
