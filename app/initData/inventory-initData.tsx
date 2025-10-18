import { type ReactNode } from "react";
import {
  FileText,
  CheckCircle2,
  Package,
  PackageX,
  RefreshCw,
  Ban,
  Lock,
  XCircle,
} from "lucide-react";
import type { FilterField } from "~/types/global";

export interface InventoryColumn {
  id: string;
  name: string;
  productCount: number;
  description: string;
  productCanSale: number;
  active: boolean;
  createdById: string | null;
  updatedBy: string | null;
  updatedById: string | null;
  deletedBy: string | null;
}

export const InventorysFilterFields: FilterField[] = [
  { id: "name", label: "ชื่อคลังสินค้า", kind: "text", showIn: "main" },
  // { id: "stockQty", label: "จำนวน", kind: "text" },
  {
    id: "status",
    label: "สถานะ",
    kind: "select",
    options: [
      { label: "กำลังใช้งาน", value: "active" },
      { label: "มีในสต็อก", value: "in_stock" },
      { label: "หมดสต็อก", value: "out_of_stock" },
      { label: "ที่รอการเติมสต็อก", value: "pending_restock" },
      { label: "ที่ยกเลิกการจำหน่าย", value: "discontinued" },
      { label: "ที่ถูกจองไว้แล้ว", value: "reserved" },
      { label: "หยุดใช้งาน", value: "inactive" },
    ],
    showOnlyMobile: true,
  },
];

type Inventorys = {
  active: number;
  inactive: number;
  in_stock: number;
  out_of_stock: number;
  pending_restock: number;
  discontinued: number;
  reserved: number;
};

export const TabIndexTableinventorys = (inventorys: Inventorys) => {
  const total =
    (inventorys?.active ?? 0) +
    (inventorys?.inactive ?? 0) +
    (inventorys?.in_stock ?? 0) +
    (inventorys?.out_of_stock ?? 0) +
    (inventorys?.pending_restock ?? 0) +
    (inventorys?.discontinued ?? 0) +
    (inventorys?.reserved ?? 0);

  const tabs = [
    {
      label: "ทั้งหมด",
      value: total,
      icon: <FileText className="w-4 h-4 " />,
      status: "all",
    },
    {
      label: "กำลังใช้งาน",
      value: inventorys?.active ?? 0,
      icon: <CheckCircle2 className="w-4 h-4 text-green-700" />,
      status: "active",
      color: "text-green-700",
    },
    {
      label: "ยกเลิกใช้งาน",
      value: inventorys?.inactive ?? 0,
      icon: <XCircle className="w-4 h-4 text-gray-500" />,
      status: "inactive",
      color: "text-gray-500",
    },
    {
      label: "มีในสต็อก",
      value: inventorys?.in_stock ?? 0,
      icon: <Package className="w-4 h-4 text-blue-500" />,
      status: "in_stock",
      color: "text-blue-500",
    },
    {
      label: "หมดสต็อก",
      value: inventorys?.out_of_stock ?? 0,
      icon: <PackageX className="w-4 h-4 text-red-500" />,
      status: "out_of_stock",
      color: "text-red-500",
    },
    {
      label: "ที่รอการเติมสต็อก",
      value: inventorys?.pending_restock ?? 0,
      icon: <RefreshCw className="w-4 h-4 text-indigo-500" />,
      status: "pending_restock",
      color: "text-indigo-500",
    },
    {
      label: "ที่ยกเลิกการจำหน่าย",
      value: inventorys?.discontinued ?? 0,
      icon: <Ban className="w-4 h-4 text-rose-600" />,
      status: "discontinued",
      color: "text-rose-600",
    },
    {
      label: "ที่ถูกจองไว้แล้ว",
      value: inventorys?.reserved ?? 0,
      icon: <Lock className="w-4 h-4 text-purple-600" />,
      status: "reserved",
      color: "text-purple-600",
    },
  ];

  return tabs;
};
