import {
  FileText,
  FileSignature,
  Truck,
  ShoppingCart,
  Receipt,
  CircleDollarSign,
  Coins,
  Euro,
} from "lucide-react";
import type { OrderFormValues } from "~/schemas/order/order";

export const initialOrderFormData: OrderFormValues = {
  active: false,
  branchId: "",
  suppliers: "",
  arrivalDate: "",
  orderDate: "",
  shipping: "",
  startDate: new Date().toISOString(),
  expireDate: new Date().toISOString(),
  note: "",
  trackingNo: "",
  refCode: "",
  docName: "",
  docNo: "",
  notationType: "",
  discount: 0,
  vat: 0,
  wht: 0,
  total: 0,
  grandTotal: 0,
  net: 0,
  subTotal: 0,
  orderType: "quotation" as const,
  currency: "THB" as const,
  customerId: "",
  customer: {
    id: "",
    // firstName: "",
    // lastName: "",
    // taxID: "",
    // customerType: "",
    // email: "",
    // phone: "",
    // address: "",
    // postalCode: "",
  },
  orderDetail: {
    products: [
      {
        id: "",
        name: "",
        quantity: 0,
        sku: "",
        matType: "",
        status: "",
        price: 0,
        salePrice: 0,
        costPrice: 0,
        discountPrice: 0,
        vatPrice: 0,
        active: true,
      },
    ],
  },
};

const initData = {
  initialOrderFormData,
};

export const notationType = [
  { label: "ใบเสนอราคา", value: "quotation", icon: <FileSignature /> },
  { label: "ใบคำสั่งซื้อ", value: "purchase_order", icon: <ShoppingCart /> },
  { label: "ใบแจ้งหนี้", value: "invoice", icon: <FileText /> },
  { label: "ใบเสร็จ", value: "receipt", icon: <Receipt /> },
  { label: "ใบส่งสินค้า", value: "delivery_order", icon: <Truck /> },
];

export const currencyType = [
  { label: "THB - บาท", value: "THB", icon: <Coins /> },
  { label: "USD - ดอลลาร์", value: "USD", icon: <CircleDollarSign /> },
  { label: "EUR - ยูโร", value: "EUR", icon: <Euro /> },
];

export default initData;
