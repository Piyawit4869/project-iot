import {
  FileText,
  ShoppingBag,
  Power,
  CloudOff,
  Factory,
  Clock,
} from "lucide-react";
import type { FilterField } from "~/types/global";

export type ProductFormValues = {
  // ด้านบนสุด
  active: boolean;

  // พื้นฐานสินค้า
  name: string;
  sku: string;
  status: string; // "available" | "unavailable" | "draft"
  description: string;

  // รูปภาพ
  imageUrls: string[];

  // จัดหมวดหมู่
  productCategory: string; // "pen" | "fan" | "bag" | ...

  // การกำหนดราคา
  price: number; // ราคา (ขาย)
  quantity: number; // ราคาเปรียบเทียบ (จาก UI เดิมใช้คำนี้)
  discountPrice: number; // ต้นทุนต่อรายการ
  profitAmount: number; // กำไร (เดิมคุณใช้ชื่อ vatPrice ช่องที่ 2)
  profitPercent: number; // อัตรากำไร (%)

  // ภาษี/การแสดงราคา
  vat: number; // อัตรา VAT (%)
  priceDisplayType: "include_vat" | "exclude_vat";

  // คลัง/สต็อก
  stockQty: number; // จำนวนคงคลัง

  // จัดส่ง
  weight: number; // น้ำหนัก
  unit: string; // "kilogram" | "gram" | "piece"

  // ด้านขวา (SEO/การเผยแพร่/จัดระเบียบ)
  pageTitle: string; // ชื่อหน้าเพจ
  shortDescription: string; // คำอธิบายโดยย่อ
  urlPath: string; // product/...
  publishStatus: string; // ใช้ร่วมกับ statusOptions เช่น "available"
  matType: string; // ใช้ร่วมกับ matTypeOptions

  // Tags
  tags: string[];
};

export const ProductsFilterFields: FilterField[] = [
  { id: "name", label: "ชื่อสินค้า", kind: "text" },
  { id: "sku", label: "รหัสสินค้า", kind: "text" },
  {
    id: "status",
    label: "สถานะ",
    kind: "select",
    options: [
      { label: "สินค้าที่เปิดขาย", value: "active" },
      { label: "สินค้าที่ไม่เปิดขาย", value: "inactive" },
      { label: "สินค้าที่อยู่นอกฤดูกาล", value: "out_of_season" },
      { label: "สินค้าที่หยุดผลิตหรือขาย", value: "discontinued" },
      { label: "สินค้าที่จะวางจำหน่ายในอนาคต", value: "coming_soon" },
    ],
    showOnlyMobile: true,
  },
];

type Products = {
  active: number;
  inactive: number;
  out_of_season: number;
  discontinued: number;
  coming_soon: number;
};

export const TabIndexTableProducts = (products: Products) => {
  const total =
    (products?.active ?? 0) +
    (products?.inactive ?? 0) +
    (products?.out_of_season ?? 0) +
    (products?.discontinued ?? 0) +
    (products?.coming_soon ?? 0);

  const tabs = [
    {
      label: "ทั้งหมด",
      value: total,
      icon: <FileText className="w-4 h-4" />,
      status: "all",
    },
    {
      label: "เปิดขาย",
      value: products?.active ?? 0,
      icon: <ShoppingBag className="w-4 h-4 text-green-600" />,
      status: "active",
      color: "text-green-600",
    },
    {
      label: "ไม่เปิดขาย",
      value: products?.inactive ?? 0,
      icon: <Power className="w-4 h-4 text-gray-500" />,
      status: "inactive",
      color: "text-gray-500",
    },
    {
      label: "นอกฤดูกาล",
      value: products?.out_of_season ?? 0,
      icon: <CloudOff className="w-4 h-4 text-blue-500" />,
      status: "out_of_season",
      color: "text-blue-500",
    },
    {
      label: "หยุดผลิต",
      value: products?.discontinued ?? 0,
      icon: <Factory className="w-4 h-4 text-red-500" />,
      status: "discontinued",
      color: "text-red-500",
    },
    {
      label: "จะวางจำหน่ายในอนาคต",
      value: products?.coming_soon ?? 0,
      icon: <Clock className="w-4 h-4 text-purple-600" />,
      status: "coming_soon",
      color: "text-purple-600",
    },
  ];

  return tabs;
};

export const mockProductDefaultValues: ProductFormValues = {
  active: true,

  name: "แก้วเก็บความเย็น รุ่น FrostX 500ml",
  sku: "FX-500-ICEBLU",
  status: "available",
  description:
    "แก้วเก็บความเย็นสุญญากาศ 2 ชั้น ฝาปิดแน่น เก็บความเย็นได้นานถึง 12 ชั่วโมง เหมาะสำหรับพกพา",

  imageUrls: [
    "https://picsum.photos/id/1011/600/600",
    "https://picsum.photos/id/1012/600/600",
    "https://picsum.photos/id/1013/600/600",
  ],

  productCategory: "tumbler",

  price: 390, // ราคาขาย
  quantity: 420, // ราคาเปรียบเทียบ (เช่น ราคาเดิม)
  discountPrice: 220, // ต้นทุนต่อรายการ
  profitAmount: 170, // กำไร = 390 - 220
  profitPercent: 43.6, // (170/390)*100 ประมาณ 43.6%

  vat: 7, // 7%
  priceDisplayType: "include_vat",

  stockQty: 120,

  weight: 0.45,
  unit: "kilogram",

  pageTitle: "FrostX 500ml — แก้วเก็บความเย็น",
  shortDescription: "แก้วสุญญากาศ เก็บเย็น 12 ชม. ฝาปิดแน่น ไม่รั่วซึม",
  urlPath: "product/frostx-500ml",
  publishStatus: "available",
  matType: "finished_goods",

  tags: ["แก้วเก็บความเย็น", "เก็บเย็น", "500ml", "พกพา"],
};
