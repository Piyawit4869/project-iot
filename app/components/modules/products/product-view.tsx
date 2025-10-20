"use client";

import React from "react";
import { Package } from "lucide-react";
import { CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { InfoRow } from "~/components/shared/InfoRow";
import { GlobalImage } from "~/components/shared/global-image";

export type Unit = "kilogram" | "pound" | "gram" | "ounce";
export type MatType = "material" | "non_material";
export type GlobalProductStatus =
  | "active"
  | "inactive"
  | "out_of_season"
  | "discontinued"
  | "coming_soon";

export interface ProductViewValues {
  id?: string;
  active?: boolean;
  name?: string;
  sku?: string;
  status?: GlobalProductStatus | string;
  description?: string;
  imageUrls?: string[];
  salePrice?: number;
  compareAtPrice?: number;
  costPrice?: number;
  profitAmount?: number;
  profitPercent?: number;
  availableForSale?: number;
  weight?: number;
  unit?: Unit;
  matType?: MatType;
  productCategory?: string;
  tags?: string[];
}

const statusOptions: ReadonlyArray<{
  label: string;
  value: GlobalProductStatus;
}> = [
  { label: "สั่งขายได้", value: "active" },
  { label: "ปิดการขาย", value: "inactive" },
  { label: "นอกฤดูกาล", value: "out_of_season" },
  { label: "ยุติจำหน่าย", value: "discontinued" },
  { label: "เร็ว ๆ นี้", value: "coming_soon" },
];

const unitOptions: ReadonlyArray<{ label: string; value: Unit }> = [
  { label: "กิโลกรัม", value: "kilogram" },
  { label: "ปอนด์", value: "pound" },
  { label: "กรัม", value: "gram" },
  { label: "ออนซ์", value: "ounce" },
];

const matTypeOptions: ReadonlyArray<{ label: string; value: MatType }> = [
  { label: "มีสต็อก (วัตถุ)", value: "material" },
  { label: "ไม่มีสต็อก (บริการ/ดิจิทัล)", value: "non_material" },
];

function getLabel<T extends { label: string; value: string }>(
  value?: string,
  options: ReadonlyArray<T> = []
) {
  if (!value) return "-";
  return options.find((o) => o.value === value)?.label ?? value;
}

const fTHB = (n?: number) =>
  typeof n === "number"
    ? new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(n)
    : "-";

function calcProfit(sale?: number, cost?: number) {
  if (typeof sale !== "number" || typeof cost !== "number") {
    return {
      amount: undefined as number | undefined,
      percent: undefined as number | undefined,
    };
  }
  const amount = sale - cost;
  const percent = sale > 0 ? (amount / sale) * 100 : 0;
  return { amount, percent };
}

export interface ProductProfileViewProps {
  data?: ProductViewValues;
  loading?: boolean;
}

export const Productview: React.FC<ProductProfileViewProps> = ({
  data,
  loading,
}) => {
  const d = data ?? {};
  const images = d.imageUrls ?? [];

  const derived = calcProfit(
    d.profitAmount != null ? d.salePrice : d.salePrice,
    d.costPrice
  );
  const profitAmount = d.profitAmount ?? derived.amount;
  const profitPercent = d.profitPercent ?? derived.percent;

  return (
    <div className="grid grid-cols-[70%_29%] gap-4">
      <div className="bg-card rounded-xl border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Package className="h-5 w-5" />
              ข้อมูลสินค้า
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {images.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {images.slice(0, 6).map((src) => (
                <GlobalImage
                  key={src}
                  src={src}
                  alt="product"
                  className="h-28 w-28 object-cover rounded-md border"
                />
              ))}
            </div>
          ) : (
            <div className="h-28 w-28 rounded-md border bg-muted flex items-center justify-center text-sm text-muted-foreground">
              ไม่มีรูป
            </div>
          )}

          <Separator />

          <div className="grid grid-cols-2 gap-5">
            <InfoRow label="ชื่อ" value={d.name ?? "-"} />
            <InfoRow label="รหัสสินค้า" value={d.sku ?? "-"} />

            <InfoRow
              label="สถานะ"
              value={getLabel(d.status as string, statusOptions)}
            />
            <InfoRow
              label="การใช้งาน"
              value={d.active ? "เปิดใช้งาน" : "ปิดใช้งาน"}
            />

            <InfoRow label="ราคา" value={fTHB(d.salePrice)} />
            <InfoRow label="ราคาเปรียบเทียบ" value={fTHB(d.compareAtPrice)} />

            <InfoRow label="ต้นทุนต่อรายการ" value={fTHB(d.costPrice)} />
            <InfoRow
              label="กำไร"
              value={
                typeof profitAmount === "number" ? `${fTHB(profitAmount)}` : "-"
              }
            />
            <InfoRow
              label="อัตรากำไร(%)"
              value={
                typeof profitPercent === "number"
                  ? `${profitPercent.toFixed(2)}%`
                  : "-"
              }
            />
            <InfoRow
              label="คงเหลือสำหรับขาย"
              value={
                typeof d.availableForSale === "number"
                  ? String(d.availableForSale)
                  : "-"
              }
            />

            <InfoRow
              label="น้ำหนัก"
              value={typeof d.weight === "number" ? String(d.weight) : "-"}
            />
            <InfoRow
              label="หน่วย"
              value={getLabel(d.unit as string, unitOptions)}
            />

            <InfoRow
              label="ประเภท"
              value={getLabel(d.matType as string, matTypeOptions)}
            />
            <InfoRow label="หมวดหมู่" value={d.productCategory ?? "-"} />
          </div>

          <div className="mt-4">
            <div className="text-sm font-medium mb-1">คำอธิบาย</div>
            {d.description ? (
              <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {d.description}
              </p>
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </div>
        </CardContent>
      </div>

      <div className="bg-card rounded-xl border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            การจัดระเบียบสินค้า
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="text-sm font-medium mb-2">แท็กสินค้า</div>
            {d.tags && d.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 max-w-full">
                {d.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="rounded-xl">
                    {t}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="text-sm font-medium">หมวดหมู่</div>
            {d.productCategory ? (
              <div className="inline-flex items-center gap-2">
                <GlobalImage
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                    d.productCategory
                  )}`}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{d.productCategory}</span>
              </div>
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default Productview;
