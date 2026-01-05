import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  ScrollText,
  FileCheck,
  BookText,
} from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { ReactNode } from "react";
import type { FilterField } from "~/types/global";
import type { NotationFormValues } from "./notation";

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

export type NotationType = {
  id: string;
  docName: string;
  refNo: string;
  type: "quotation" | "invoice" | "receipt";
  notationType: "quotation" | "invoice" | "receipt";
  docStatus: "quotation" | "invoice" | "receipt";
  signatureDataUrl: string;
  stampUrl: string;
  customer: Customer;
  products: NotationItem[];
  createdAt: string;
};

export type NotationItem = {
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
  type: "quotation" | "invoice" | "receipt";
  notationType: "quotation" | "invoice" | "receipt";
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

export type ConfigureNotation = {
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

export interface NotationFormProps {
  initialData?: NotationFormValues;
  form: UseFormReturn<NotationFormValues>;
  onSubmit?: (values: NotationFormValues) => void;
  customers?: any[];
  notation?: NotationFormValues;
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

export const NotationFilterFields: FilterField[] = [
  { id: "docNo", label: "เลขที่", kind: "text", showIn: "main" },
  // { id: "docName", label: "ชื่อออเดอร์", kind: "text", showIn: "main" },
  // { id: "name", label: "ชื่อลูกค้า", kind: "text", showIn: "main" },
  { id: "name", label: "บริษัทผู้รับ", kind: "text", showIn: "main" },
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
    id: "type",
    label: "ประเภท",
    kind: "select",
    options: [
      { label: "ใบเสนอราคา", value: "quotation" },
      { label: "ใบแจ้งหนี้", value: "invoice" },
      { label: "ใบเสร็จรับเงิน", value: "receipt" },
    ],
    showOnlyMobile: true,
  },
];

type Notation = {
  quotation: number;
  invoice: number;
  receipt: number;
};

export const TabIndexTableNotation = (Notation: Notation) => {
  const total =
    (Notation?.quotation ?? 0) +
    (Notation?.invoice ?? 0) +
    (Notation?.receipt ?? 0);

  const tabs = [
    {
      label: "ทั้งหมด",
      value: total,
      icon: <BookText className="w-4 h-4" />,
      status: "all",
    },
    {
      label: "ใบเสนอราคา",
      value: Notation?.quotation ?? 0,
      icon: <ScrollText className="w-4 h-4 text-yellow-500" />,
      status: "quotation",
      color: "text-yellow-500",
    },

    {
      label: "ใบแจ้งหนี้",
      value: Notation?.invoice ?? 0,
      icon: <FileText className="w-4 h-4 text-red-500" />,
      status: "invoice",
      color: "text-emerald-600",
    },
    {
      label: "ใบเสร็จรับเงิน",
      value: Notation?.receipt ?? 0,
      icon: <FileCheck className="w-4 h-4 text-emerald-600" />,
      status: "receipt",
      color: "text-red-500",
    },
  ];

  return tabs;
};
