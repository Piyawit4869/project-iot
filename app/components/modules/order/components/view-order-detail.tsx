"use client";

import {
  Coins,
  CreditCard,
  Percent,
  Receipt,
  ShoppingCart,
} from "lucide-react";
import { formatDateFull } from "~/components/shared/global-format";
import { Card } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { currencyType } from "~/initData/order-initData";

type OrderFormEditProps = {
  order: any;
};

const InfoItem = ({
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

export const ViewOrderDetail = ({ order }: OrderFormEditProps) => {
  const dataOrder = order;
  const customerData = dataOrder?.customer?.profile;

  const totalAvailable = dataOrder.orderDetails.products.reduce(
    (sum: number, p: any) => sum + (p.quantity || 0),
    0
  );
  return (
    <>
      <h3 className="font-semibold text-xl">ข้อมูลออเดอร์</h3>
      {/* <div className="grid grid-cols-1 gap-3 mt-3">
        <FormTextRow
          control={form.control}
          name="suppliers"
          label="ซัพพลายเออร์"
        />
      </div> */}

      <div className="grid grid-cols-2 gap-3  mt-6">
        <InfoItem label="เลขที่ออเดอร์" value={dataOrder?.docNo || "-"} />
        <InfoItem label="ชื่อออเดอร์" value={dataOrder?.docName || "-"} />

        <InfoItem
          label="วันที่สั่งซื้อออเดอร์"
          value={
            dataOrder?.startDate ? formatDateFull(dataOrder.startDate) : "-"
          }
        />
        <InfoItem
          label="วันที่หมดอายุ"
          value={
            dataOrder?.expireDate ? formatDateFull(dataOrder.expireDate) : "-"
          }
        />
      </div>
      <Card className="w-full p-6 mt-4">
        <div className="flex flex-row">
          <h1 className="font-semibold">ข้อมูลลูกค้า</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <InfoItem
            label="เลขประจำตัวผู้เสียภาษี"
            value={customerData?.taxId || "-"}
          />

          <InfoItem
            label="ประเภทลูกค้า"
            value={customerData?.customerType || "-"}
          />
          <InfoItem label="อีเมล" value={customerData?.email || "-"} />
          <InfoItem label="เบอร์โทรศัพท์" value={customerData?.phone || "-"} />
          <InfoItem label="ที่อยู่" value={customerData?.address || "-"} />
          <InfoItem
            label="รหัสไปรษณีย์"
            value={customerData?.postalCode || "-"}
          />
        </div>
      </Card>
      <h1 className="font-semibold my-6">การชำระเงิน</h1>
      <Card className="p-4 space-y-4 w-full">
        <h3 className="font-semibold text-lg">สรุปราคาสินค้า</h3>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-gray-500" />
            <span>จำนวนสินค้า :</span>
          </div>
          <span>{totalAvailable || 0} ชิ้น</span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-gray-500" />
            <span>ราคารวมสินค้า :</span>
          </div>
          <span>{dataOrder?.subTotal || 0} บาท</span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-gray-500" />
            <span>ภาษีมูลค่าเพิ่ม :</span>
          </div>
          <span>{dataOrder?.vat || 0}</span>
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
          <span>{dataOrder?.net || 0} บาท</span>
        </div>

        {/* <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <ReceiptText className="w-4 h-4 text-gray-500" />
            <span>ภาษีหัก ณ ที่จ่าย:</span>
          </div>
          <span>{dataOrder?.wht || 0} บาท</span>
        </div> */}
        {/* 
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-gray-500" />
            <span>ยอดรวมสุทธิ (ยังไม่รวม VAT):</span>
          </div>
          <span>{dataOrder?.total || 0} บาท</span>
        </div> */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-gray-500" />
            <span>ส่วนลด:</span>
          </div>
          <span>{dataOrder?.discount || 0}</span>
        </div>

        <div className="flex justify-between font-bold text-green-700 dark:text-green-400 text-lg border-t pt-2">
          <div className="flex items-center gap-2">
            <span>ยอดรวมสุทธิ :</span>
          </div>
          <span>{dataOrder?.grandTotal || 0} ฿</span>
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 mt-5">
        <Select
          value={
            currencyType?.some((item) => item.value === dataOrder?.currency)
              ? dataOrder?.currency
              : "THB"
          }
        >
          <SelectTrigger className="w-full pointer-events-none">
            <SelectValue placeholder="เลือกสกุลเงิน" />
          </SelectTrigger>
          <SelectContent>
            {currencyType?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.icon} {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-5">
        <Textarea
          readOnly
          value={dataOrder?.note || ""}
          className="cursor-default pointer-events-none"
        />
      </div>
    </>
  );
};
