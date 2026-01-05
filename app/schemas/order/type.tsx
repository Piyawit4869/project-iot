import {
  FileText,
  Clock,
  // FileEdit,
  // Settings,
  // Wallet,
  // Truck,
  CheckCircle2,
  XCircle,
  // RotateCcw,
  // Undo2,
  // AlertTriangle,
} from "lucide-react";
import type { OrderFormValues } from "./order";
import type { UseFormReturn } from "react-hook-form";
import type { ReactNode } from "react";
import type { FilterField } from "~/types/global";

export type Customer = {
  id: string;
  name: string;
  prefix: string;
  firstName: string;
  lastName: string;
  nickName: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
};

export type OrderType = {
  id: string;
  docName: string;
  refNo: string;
  type:
    | "quotation"
    | "invoice"
    | "receipt"
    | "delivery_order"
    | "purchase_order";
  notationType:
    | "quotation"
    | "invoice"
    | "receipt"
    | "delivery_order"
    | "purchase_order";
  docStatus: "draft" | "approved" | "sent" | "cancelled";
  signatureDataUrl: string;
  stampUrl: string;
  customer: Customer;
  orderDetails?: {
    products: OrderItem[];
    createdAt: string;
  };
};

export type OrderItem = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
  active: boolean;
  showInThai: boolean;
  refNo: string;
  docNo: string;
  refCode: string;
  startDate: string;
  expireDate: string;
  code: string;
  note: string;
  discount: number;
  type:
    | "quotation"
    | "invoice"
    | "receipt"
    | "delivery_order"
    | "purchase_order";
  notationType:
    | "quotation"
    | "invoice"
    | "receipt"
    | "delivery_order"
    | "purchase_order";
  status: string;
  docStatus: string;
  docName: string;
  signatureUrl: string;
  vat: number;
  wht: number;
  isCustom: boolean;
  haveSignature: boolean;
  currency: "THB" | "USD" | "EUR";
};

export type ConfigureOrder = {
  templateName: string;
  width: string;
  height: string;
  margin: string;
  background: string;
  padding: string;
  border: string;
  zIndex: string;
  templateNotation: string;
};

export interface ProductColumn {
  id: string;
  name: string;
  sku: string;
  imageUrl?: string;
  description: string;
  salePrice: number;
  matType: string;
  status: string;
  discountPrice: number;
  vatPrice: number;
  wht: number;
  quantity: number;
  costPrice: number;
  active: boolean;
  updatedById: string;
  createdById: string;
}

export interface OrderFormProps {
  initialData?: OrderFormValues;
  form: UseFormReturn<OrderFormValues>;
  onSubmit?: (values: OrderFormValues) => void;
  customers?: any[];
  order?: OrderFormValues;
  Price?: number;
  totalVat?: number;
  totaldiscount?: number;
  totalPrice?: number;
  isLoading?: boolean;
  totalWht?: number;
  isEdit?: boolean;
  quantities?: ProductColumn[];
  products?: ProductColumn[];
  viewMode?: boolean;
  productsSelected?: ProductColumn[];
  setProductsSelected?: any;
  onChangeProducts?: (items: ProductColumn[]) => void;
}

export const OrderFilterFields: FilterField[] = [
  { id: "docNo", label: "เลขที่", kind: "text", showIn: "main" },
  // { id: "docName", label: "ชื่อออเดอร์", kind: "text", showIn: "main" },
  // { id: "name", label: "ชื่อลูกค้า", kind: "text", showIn: "main" },
  { id: "name", label: "ชื่อลูกค้า", kind: "text", showIn: "main" },
  // { id: "profit", label: "กำไรโดยประมาณ", kind: "number", showIn: "main" },

  {
    id: "createdAt",
    label: "วันที่ออกเอกสาร",
    kind: "date",
    showIn: "main",
  },
  // {
  //   id: "docStatus",
  //   label: "สถานะออเดอร์",
  //   kind: "select",
  //   showIn: "main",
  //   options: [
  //     { label: "", value: "" },
  //     { label: "", value: "" },
  //   ],
  // },
  {
    id: "status",
    label: "สถานะ",
    kind: "select",
    options: [
      { label: "ร่างคำสั่งซื้อ", value: "draft" },
      { label: "รอการยืนยัน", value: "pending" },
      { label: "กำลังดำเนินการ", value: "processing" },
      { label: "ชำระเงินแล้ว", value: "paid" },
      { label: "ระหว่างขนส่ง", value: "in_transit" },
      { label: "เสร็จสมบูรณ์", value: "completed" },
      { label: "ยกเลิก", value: "cancelled" },
      { label: "คืนเงิน", value: "refunded" },
      { label: "ส่งคืนสินค้า", value: "returned" },
      { label: "ล้มเหลว", value: "failed" },
    ],
    showOnlyMobile: true,
  },
];

type Order = {
  draft: number;
  pending: number;
  confirmed: number;
  processing: number;
  paid: number;
  partially_paid: number;
  shipped: number;
  in_transit: number;
  delivered: number;
  completed: number;
  cancelled: number;
  refunded: number;
  partially_refunded: number;
  returned: number;
  failed: number;
  on_hold: number;
};

export const TabIndexTableOrder = (Order: Order) => {
  const total =
    (Order?.draft ?? 0) +
    (Order?.pending ?? 0) +
    (Order?.processing ?? 0) +
    (Order?.paid ?? 0) +
    (Order?.in_transit ?? 0) +
    (Order?.completed ?? 0) +
    (Order?.cancelled ?? 0) +
    (Order?.refunded ?? 0) +
    (Order?.returned ?? 0) +
    (Order?.failed ?? 0);

  const tabs = [
    {
      label: "ทั้งหมด",
      value: total,
      icon: <FileText className="w-4 h-4" />,
      status: "all",
    },
    {
      label: "รอดำเนินการ",
      value: Order?.pending ?? 0,
      icon: <Clock className="w-4 h-4 text-yellow-500" />,
      status: "pending",
      color: "text-yellow-500",
    },
    // {
    //   label: "ร่างคำสั่งซื้อ",
    //   value: Order?.draft ?? 0,
    //   icon: <FileEdit className="w-4 h-4 text-blue-400" />,
    //   status: "draft",
    //   color: "text-blue-400",
    // },
    // {
    //   label: "กำลังดำเนินการ",
    //   value: Order?.processing ?? 0,
    //   icon: <Settings className="w-4 h-4 text-blue-500" />,
    //   status: "processing",
    //   color: "text-blue-500",
    // },
    // {
    //   label: "ชำระเงินแล้ว",
    //   value: Order?.paid ?? 0,
    //   icon: <Wallet className="w-4 h-4 text-green-600" />,
    //   status: "paid",
    //   color: "text-green-600",
    // },
    // {
    //   label: "ระหว่างขนส่ง",
    //   value: Order?.in_transit ?? 0,
    //   icon: <Truck className="w-4 h-4 text-indigo-500" />,
    //   status: "in_transit",
    //   color: "text-indigo-500",
    // },
    {
      label: "เสร็จสมบูรณ์",
      value: Order?.completed ?? 0,
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      status: "completed",
      color: "text-emerald-600",
    },
    {
      label: "ยกเลิก",
      value: Order?.cancelled ?? 0,
      icon: <XCircle className="w-4 h-4 text-red-500" />,
      status: "cancelled",
      color: "text-red-500",
    },
    // {
    //   label: "คืนเงิน",
    //   value: Order?.refunded ?? 0,
    //   icon: <RotateCcw className="w-4 h-4 text-orange-500" />,
    //   status: "refunded",
    //   color: "text-orange-500",
    // },
    // {
    //   label: "ส่งคืนสินค้า",
    //   value: Order?.returned ?? 0,
    //   icon: <Undo2 className="w-4 h-4 text-purple-500" />,
    //   status: "returned",
    //   color: "text-purple-500",
    // },
    // {
    //   label: "ล้มเหลว",
    //   value: Order?.failed ?? 0,
    //   icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
    //   status: "failed",
    //   color: "text-rose-600",
    // },
  ];

  return tabs;
};
