import type {
  CustomerStatusOption,
  CustomerTypeOption,
} from "~/schemas/customer/customer";

export const cards = [
  {
    label: "ลูกค้าทั้งหมด",
    value: 0,
    icon: "🌱", // Use emoji or Lucide icon name
    active: true,
  },
  {
    label: "ลูกค้าเป้าหมาย",
    value: 0,
    icon: "🌾",
  },
  {
    label: "ลูกค้าใหม่",
    value: 0,
    icon: "🌿",
  },
  {
    label: "ลูกค้าประจำ",
    value: 0,
    icon: "🌳",
  },
  {
    label: "ลูกค้าห่างหาย",
    value: 0,
    icon: "🥀",
  },
];

export const organizationType = [
  { label: "ผู้เสียภาษี", value: "taxpayer" },
  { label: "ห้างหุ้นส่วนสามัญ", value: "ordinary_partnership" },
  { label: "ร้านค้า", value: "shop" },
  { label: "บุคคลธรรมดา", value: "body_of_person" },
  { label: "อื่น ๆ ", value: "others" },
];

export const customerStatus: CustomerStatusOption[] = [
  { label: "ลงทะเบียนใหม่", value: "newly_registered" },
  { label: "ใช้งานอยู่", value: "active" },
  { label: "ลูกค้าประจำ", value: "loyal_customer" },
  { label: "มีความเสี่ยง", value: "at_risk" },
  { label: "ยกเลิกใช้งาน", value: "churned" },
];

export const activeStatus: CustomerStatusOption[] = [
  { label: "ใช้งานอยู่", value: "active" },
  { label: "ยกเลิกใช้งาน", value: "churned" },
];

export const customerType: CustomerTypeOption[] = [
  { label: "บุคคลธรรมดา", value: "ordinary_person" },
  { label: "นิติบุคคล", value: "juristic_person" },
];

export const forMockData = [
  { label: "ข้อมูล 1 ", value: "data_1" },
  { label: "ข้อมูล 2", value: "data_2" },
  { label: "ข้อมูล 3", value: "data_3" },
  { label: "ข้อมูล 4", value: "data_4" },
  { label: "ข้อมูล 5", value: "data_5" },
];

export const prefix = [
  { value: "นาย", label: "นาย" },
  { value: "นาง", label: "นาง" },
  { value: "นางสาว", label: "นางสาว" },
];

export const aiModel = [
  { value: "gpt-4", label: "gpt-4" },
  { value: "gpt-4-turbo", label: "gpt-4-turbo" },
  { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
];

export const gender = [
  { label: "ชาย", value: "male" },
  { label: "หญิง", value: "female" },
  { label: "ไม่ระบุ", value: "not_specified" },
];
