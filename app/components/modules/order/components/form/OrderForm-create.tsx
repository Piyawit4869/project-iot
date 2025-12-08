"use client";

import { Hourglass, ImageUp, RefreshCcw, User } from "lucide-react";
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
import { calculateTotals, useDebounce } from "../order-function";
import { useCustomerPaginate } from "~/api/client/customer/useCustomer";
import { ListProduct } from "../product-select";
import { OrderProvider } from "~/hooks/order/order";
import { SignatureDocument } from "../signature";
import { formatNumber } from "~/components/shared/global-format";
import type { ProductType } from "~/schemas/order/order";
import { statusOptions } from "~/initData/product-init-data";
import { GlobalFormField } from "~/components/shared/global-formField";

import { CustomerSection } from "../customerSection";
import { cn } from "~/lib/utils";

export const OrderForm: React.FC<OrderFormProps> = ({
  form,
  Price,
  order,
  isEdit,
  viewMode,
  products,
  setProductsSelected,
  onChangeProducts,
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

  const productDetails = order?.orderDetails?.products;
  const orderCustomer = order?.customer as any;
  const customerProfile = orderCustomer?.profile as any;

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
  const discount = form.watch("discount") ?? 0;
  const startDate = form.watch("startDate");
  const expireDate = form.watch("expireDate");

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

  const { totalVat, totalPrice } = calculateTotals(products ?? []);

  const discountPrice = (products ?? [])?.reduce(
    (sum, p) => sum + (p.discountPrice ?? 0),
    0
  );

  const appliedDiscount =
    discount > 0 && discountPrice > 0
      ? Number(discount) + Number(discountPrice) // มีทั้งคู่ → รวม
      : discount > 0
        ? Number(discount) // มีแค่ discount
        : discountPrice > 0
          ? Number(discountPrice) // มีแค่ discountPrice
          : 0; // ไม่มีเลย

  // 2) ยอดสุทธิหลังหักส่วนลด
  const resultTotal = (products ?? []).reduce((sum, p) => sum + p.quantity, 0);

  let view = "create"; // ค่า default

  if (viewMode && !isEdit) {
    view = "view";
  }

  const finalPrice = totalPrice - appliedDiscount;

  return (
    <div
      className={cn(
        "flex flex-col gap-6 p-8 bg-card text-card-foreground rounded-xl border shadow-sm", // ใช้ทุกกรณี
        !viewMode ||
          (isEdit &&
            "p-6 bg-card text-card-foreground rounded-xl border shadow-sm")
      )}
    >
      <h3 className="font-semibold text-xl">ข้อมูลออเดอร์</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlobalFormField
          control={form.control}
          name="docName"
          label="ชื่อออเดอร์"
          type="input"
          view={view}
          placeholder="กรอกชื่อออเดอร์"
        />

        <GlobalFormField
          control={form.control}
          name="company"
          label="บริษัท (Company)"
          type="select"
          view={view}
          placeholder="เลือกประเภทเอกสาร"
          options={notationType}
        />

        <GlobalFormField
          control={form.control}
          name="notationType"
          label="ประเภทเอกสาร"
          type="select"
          view={view}
          defaultValueLabel="quotation"
          placeholder="เลือกประเภทเอกสาร"
          options={notationType}
          disabledItem={(item: any) => item.value !== "quotation"}
        />

        <div className="col-span-3">
          <GlobalFormField
            control={form.control}
            name="saler"
            label="ผู้ขาย"
            type="select"
            view={view}
            defaultValueLabel="quotation"
            placeholder="เลือกผู้ขาย"
            options={[]}
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
        <GlobalFormField
          control={form.control}
          name="startDate"
          label="วันที่สั่งซื้อออเดอร์"
          type="date"
          view={view}
          placeholder="เลือกวันที่"
          options={[]}
          disabled={(d: any) => {
            const dd = new Date(d);
            dd.setHours(0, 0, 0, 0);
            return dd > endDay;
          }}
        />
        <GlobalFormField
          control={form.control}
          name="expireDate"
          label="วันที่หมดอายุ"
          type="date"
          placeholder="เลือกวันที่"
          view={view}
          disabled={(d: any) => {
            const dd = new Date(d);
            dd.setHours(0, 0, 0, 0);
            return dd < startDay;
          }}
        />

        <div className="col-span-2">
          <GlobalFormField
            control={form.control}
            name="docNo"
            label="หมายเลขเอกสาร"
            type="input"
            view={view}
            placeholder="กรอกชื่อออเดอร์"
            iconBack={
              <RefreshCcw className="mt-0.5 w-3.5 h-3.5 hover:text-gray-500" />
            }
          />
        </div>
      </div>

      <CustomerSection
        mode={viewMode ? "view" : "create"}
        form={form}
        customerData={viewMode ? customerProfile : customerData}
        isLoading={isLoading}
        search={search}
        setSearch={setSearch}
        customerDetail={customerDetail}
      />

      <hr />

      <h1 className="font-semibold text-xl">รายการสินค้า</h1>
      <OrderProvider>
        <ListProduct
          isEdit={isEdit}
          products={products ?? []}
          onChangeProducts={(items) => {
            setProductsSelected?.(items);
            onChangeProducts?.(items);
          }}
          productDetails={productDetails as any}
        />
      </OrderProvider>

      <hr />
      <h1 className="font-semibold text-xl">ส่วนลด</h1>
      <div className="grid grid-cols-2 gap-4">
        <GlobalFormField
          control={form.control}
          name="discount"
          view={view}
          label="ส่วนลด"
          type="input"
          placeholder="0"
        />

        <GlobalFormField
          control={form.control}
          name="discountType"
          view={view}
          label="ประเภทเหตุผลส่วนลด"
          type="select"
          placeholder="เลือกเหตุผลส่วนลด"
          options={statusOptions}
        />

        {/* <GlobalFormField
          control={form.control}
          name="discountCode"
          label="โค้ดส่วนลด"
          type="input"
          placeholder="SALE2026"
          options={statusOptions}
        /> */}
      </div>
      <GlobalFormField
        control={form.control}
        name="discountNote"
        label="หมายเหตุ"
        view={view}
        type="textArea"
        placeholder="ระบุหมายเหตุ..."
        options={statusOptions}
      />

      <GlobalFormField
        control={form.control}
        name="discountStep"
        label="ส่วนลดขั้นบันได"
        view={"view"}
        placeholder="ระบุหมายเหตุ..."
        options={statusOptions}
      />

      <hr />
      {/* -----------------------  Summary ----------------------- */}
      <div className="p-4 mt-3 w-full rounded-2xl bg-gray-50 shadow-inner">
        <h3 className="font-semibold text-lg mb-4">ราคาส่วนลด</h3>

        <div className="flex justify-between mb-3">
          <span>ราคาเดิม :</span>
          <span>{resultTotal || 0} ชิ้น</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>ส่วนลด :</span>
          <span>{discountPrice || 0} บาท</span>
        </div>
        <div className="flex justify-between mb-3">
          <span>ส่วนลดเพิ่มเติม :</span>
          <span>{discount || 0} บาท</span>
        </div>

        <div className="flex justify-between font-bold text-lg mb-3">
          <span>ราคาหลังหักส่วนลด :</span>
          <span>{formatNumber(finalPrice)} บาท</span>
        </div>
      </div>
      <hr />

      <h1 className="font-semibold text-xl">การชำระเงินและเงื่อนไข</h1>
      <div className="grid grid-cols-2 gap-4">
        <GlobalFormField
          view={view}
          control={form.control}
          name="vat"
          label="ภาษีมูลค่าเพิ่ม"
          type="input"
          placeholder="0"
          options={statusOptions}
        />

        <GlobalFormField
          view={view}
          control={form.control}
          name="wht"
          label="ภาษีมูลหัก ณ ที่จ่าย"
          type="input"
          placeholder="0"
          options={statusOptions}
        />

        <GlobalFormField
          view={view}
          control={form.control}
          name="credit"
          label="จำนวนวันเครดิต (วัน)"
          type="number"
          placeholder="30 วัน"
          options={statusOptions}
        />

        <GlobalFormField
          view={view}
          control={form.control}
          name="currency"
          label="สกุลเงิน"
          type="number"
          placeholder="THB"
          options={currencyType}
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
      </div>
      <GlobalFormField
        view={view}
        control={form.control}
        name="note"
        label="หมายเหตุ"
        type="textArea"
        placeholder="ระบุหมายเหตุ..."
      />
      <hr />
      {/* -----------------------  Summary ----------------------- */}
      <div className="p-4 mt-3 w-full rounded-2xl bg-gray-50 shadow-inner">
        <h3 className="font-semibold text-lg mb-4">สรุปราคาสินค้า</h3>

        <div className="flex justify-between mb-3">
          <span>จำนวนสินค้า :</span>
          <span>{resultTotal} ชิ้น</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>ราคารวมสินค้า :</span>
          <span>{formatNumber(Price)} บาท</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>ส่วนลด :</span>
          <span>
            {discount ? (
              discount > 0 && discountPrice > 0 ? (
                //  แสดงแค่ผลรวม
                <>{appliedDiscount}</>
              ) : discount > 0 ? (
                // discount
                <>{discount}</>
              ) : discountPrice > 0 ? (
                //  discountPrice
                <>{discountPrice}</>
              ) : (
                <>0</>
              )
            ) : (
              <>0</>
            )}{" "}
            บาท
          </span>
        </div>

        <div className="flex justify-between mb-3">
          <span>ภาษีมูลค่าเพิ่ม :</span>
          <span>{formatNumber(totalVat)} บาท</span>
        </div>

        <div className="flex justify-between font-bold text-lg mb-3">
          <span>ยอดรวม :</span>
          <span>{formatNumber(finalPrice)} บาท</span>
        </div>
      </div>
      <hr />

      <h1 className="font-semibold text-xl">ส่วนเซ็นเอกสาร</h1>

      {viewMode && isEdit ? (
        <>
          <GlobalFormField
            view={view}
            control={form.control}
            name="seal"
            label="ตราประทับ"
            type="file"
            placeholder="เลือกไฟล์ ตราประทับ..."
          />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h1 className="font-semibold text-xl">ผู้จัดทำ</h1>
              <GlobalFormField
                view={view}
                control={form.control}
                name="makeSign"
                label={<span className="py-1">อัพโหลดลายเซ็นต์</span>}
                type="signature"
              />{" "}
            </div>
            <div>
              <h1 className="font-semibold text-xl">อนุมัติโดย</h1>
              <GlobalFormField
                view={view}
                control={form.control}
                name="approvedSign"
                label={<span className="py-1">อัพโหลดลายเซ็นต์</span>}
                type="signature"
              />
            </div>

            <GlobalFormField
              view={view}
              control={form.control}
              name="makeByName"
              label="ชื่อ"
              type="input"
              placeholder="กรอกชื่อ"
            />
            <GlobalFormField
              view={view}
              control={form.control}
              name="approvedByName"
              label="ชื่อ"
              type="input"
              placeholder="กรอกชื่อ"
            />

            <GlobalFormField
              view={view}
              control={form.control}
              name="makeByPosition"
              label="ตำแหน่ง"
              type="input"
              placeholder="กรอกตำแหน่ง"
            />
            <GlobalFormField
              view={view}
              control={form.control}
              name="approvedByPosition"
              label="ตำแหน่ง"
              type="input"
              placeholder="กรอกตำแหน่ง"
            />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h1 className="font-semibold text-xl">ตราประทับ</h1>
            <GlobalFormField
              view={view}
              control={form.control}
              name="seal"
              label=""
              type="signature"
            />{" "}
          </div>
          <div>
            <h1 className="font-semibold text-xl">ผู้จัดทำ</h1>
            <GlobalFormField
              view={view}
              control={form.control}
              name="makeSign"
              label=""
              type="signature"
            />{" "}
          </div>
          <div>
            <h1 className="font-semibold text-xl">อนุมัติโดย</h1>
            <GlobalFormField
              view={view}
              control={form.control}
              name="approvedSign"
              label=""
              type="signature"
            />
          </div>
        </div>
      )}
    </div>
  );
};
