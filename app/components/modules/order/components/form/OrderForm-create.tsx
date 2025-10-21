"use client";

import {
  Coins,
  CreditCard,
  Hourglass,
  Percent,
  Receipt,
  ShoppingCart,
  User,
} from "lucide-react";
import React from "react";
import { DatePicker } from "~/components/shared/date-picker";
import { FormTextRow } from "~/components/shared/formTextRow";
import { formatNumber } from "~/components/shared/global-format";
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

// import { CustomerType } from "@/app/(backoffice)/[organization]/customer/_modules/types/customer";

export const OrderForm: React.FC<OrderFormProps> = ({
  form,
  customers,
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
  // const wht = form.watch("wht");
  // const totalNoVat = (Price ?? 0) - (discount ?? 0) - (wht ?? 0);
  const totalAddVat = (Price ?? 0) + (totalVat ?? 0) - (discount ?? 0);
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-xl">ข้อมูลออเดอร์</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <DatePicker value={field.value} onChange={field.onChange} />
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
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <Card className="w-full p-4.5">
        <h3 className="font-semibold text-xl mb-3">การชำระเงิน</h3>
        <div className="grid grid-cols-1 gap-3 mt-3">
          <FormField
            control={form.control}
            name="customerId"
            render={({ field }) => {
              return (
                <FormItem>
                  <RequiredLabel required>
                    เลือกข้อมูลลูกค้า <FormMessage />
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
            name="customer.taxID"
            label="เลขประจำตัวผู้เสียภาษี"
          />
          <FormTextRow
            control={form.control}
            name="customer.customerType"
            label="ประเภทผู้ติดต่อ"
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
        </div>
      </Card>

      <h1 className="font-semibold text-xl">การชำระเงิน</h1>

      <div className="grid grid-cols-1 gap-4">
        <FormField
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
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เลือกสกุลเงิน</FormLabel>
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
      </div>

      <Card className="p-4 w-full">
        <h3 className="font-semibold text-lg">สรุปราคาสินค้า</h3>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-gray-500" />
            <span>จำนวนสินค้า :</span>
          </div>
          <span>
            {(quantities || []).reduce((sum, q) => sum + q.quantity, 0)} ชิ้น
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-gray-500" />
            <span>ราคารวมสินค้า :</span>
          </div>
          <span>{formatNumber(Price)} บาท</span>
        </div>

        {/* <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <ReceiptText className="w-4 h-4 text-gray-500" />
            <span>ภาษีหัก ณ ที่จ่าย:</span>
          </div>
          <span>{wht} บาท</span>
        </div> */}

        {/* <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-gray-500" />
            <span>ยอดรวมสุทธิ (ยังไม่รวม VAT):</span>
          </div>
          <span>{totalNoVat} บาท</span>
        </div> */}

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-gray-500" />
            <span>ภาษีมูลค่าเพิ่ม : </span>
          </div>
          <span>
            <span>{formatNumber(totalVat)} บาท</span>
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gray-500" />
            <span>
              <span className="inline sm:hidden">ยอดชำระทั้งหมด : </span>
              <span className="hidden sm:inline">
                ยอดชำระทั้งหมด (รวม VAT/ค่าธรรมเนียม) :
              </span>
            </span>
          </div>
          <span>{formatNumber((Price ?? 0) + (totalVat ?? 0))} บาท</span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-gray-500" />
            <span>ส่วนลด : </span>
          </div>
          <span>{formatNumber(discount)} บาท</span>
        </div>
        <div className="flex justify-between font-bold text-green-700 dark:text-green-400 text-lg border-t pt-2">
          <div className="flex items-center gap-2">
            <span>ยอดรวมสุทธิ : </span>
          </div>
          <span>{formatNumber(totalAddVat)} บาท</span>
        </div>
      </Card>

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
    </Card>
  );
};
