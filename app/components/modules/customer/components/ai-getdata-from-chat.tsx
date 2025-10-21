// AiCustomerFields.tsx
import * as React from "react";

import { formatDateAndTime } from "~/components/shared/global-format";

import GlobalButton from "~/components/shared/global-button";
import {
  CalendarDays,
  FileText,
  icons,
  Link,
  Mail,
  MessageSquare,
  Navigation,
  Package,
  Phone,
  ShieldCheck,
  Smile,
  Ticket,
  User,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router";
import type { CustomerRequestResponse } from "../types/customer";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type FieldKey =
  | "customerStatus"
  | "businessType"
  | "customerName"
  | "citizenId"
  | "businessPhone"
  | "businessEmail"
  | "importantDate"
  | "incorporationDate"
  | "accountOwnerName";

type Field = {
  key: FieldKey;
  label: string;
  placeholder?: string;
  checked?: boolean;
  defaultValues?: string;
};

const FIELDS: Field[] = [
  {
    key: "customerStatus",
    label: "สถานะลูกค้า",
    placeholder: "เช่น ลูกค้าเก่า / ลูกค้าใหม่",
    defaultValues: "ลูกค้าเก่า",
  },
  {
    key: "businessType",
    label: "ประเภทธุรกิจ/กิจการ",
    placeholder: "เช่น ค้าปลีก อาหารและเครื่องดื่ม",
    checked: true,
    defaultValues: "ค้าปลีก",
  },
  {
    key: "customerName",
    label: "ชื่อลูกค้า",
    placeholder: "ชื่อ-นามสกุล หรือชื่อกิจการ",
    checked: true,
    defaultValues: "นามสกุล",
  },
  {
    key: "citizenId",
    label: "เลขประจำตัวประชาชน",
    placeholder: "xxxxxxxxxxxxx",
  },
  {
    key: "businessPhone",
    label: "หมายเลขโทรศัพท์กิจการ",
    placeholder: "0x-xxx-xxxx",
  },
  {
    key: "businessEmail",
    label: "อีเมลกิจการ",
    placeholder: "name@company.com",
  },
  {
    key: "importantDate",
    label: "วันสำคัญของกิจการ",
    placeholder: "เช่น ครบรอบเปิดร้าน 15 มิ.ย.",
  },
  {
    key: "incorporationDate",
    label: "วันก่อตั้งของกิจการ",
    placeholder: "YYYY-MM-DD",
  },
  {
    key: "accountOwnerName",
    label: "ชื่อเจ้าของบัญชี",
    placeholder: "ชื่อ-นามสกุล",
  },
];

export type AiFieldsState = Record<
  FieldKey,
  { checked: boolean; note: string; defaultValues: string }
>;

type CustomerStatusValue =
  | "newly_registered"
  | "active"
  | "loyal_customer"
  | "at_risk"
  | "churned";

type Props = {
  title?: string;
  value?: AiFieldsState;
  defaultValue?: AiFieldsState;
  onChange?: (v: AiFieldsState) => void;
  onClickBtn?: () => void;
  defaultOpen?: FieldKey[];
  data: CustomerRequestResponse;
  closeBtn?: boolean;
};

const statusTh: Record<string, string> = {
  newly_registered: "ลงทะเบียนใหม่",
  active: "ใช้งานอยู่",
  loyal_customer: "ลูกค้าภักดี",
  at_risk: "เสี่ยง",
  churned: "ยกเลิก",
};

const displayStatus = (s: CustomerStatusValue | null) =>
  s ? statusTh[s] ?? s : "ยังไม่มีข้อมูล";

const displayConsent = (b: boolean | null) =>
  b === null ? "ยังไม่มีข้อมูล" : b ? "ยินยอม" : "ไม่ยินยอม";

export function AiGetDataFromChat({
  closeBtn,
  value,
  defaultValue,
  onChange,
  defaultOpen,
  data,
  onClickBtn,
}: Props) {
  const emptyState = (checkedKeys: FieldKey[] = []): AiFieldsState =>
    FIELDS.reduce((acc, f) => {
      acc[f.key] = {
        checked: checkedKeys.includes(f.key),
        note: "",
        defaultValues: "",
      };
      return acc;
    }, {} as AiFieldsState);

  const [state, setState] = React.useState<AiFieldsState>(
    value ?? defaultValue ?? emptyState(defaultOpen)
  );

  const infoItems = [
    { label: "สรุปคำขอ", value: data?.summary, icon: <MessageSquare /> },
    {
      label: "ชื่อลูกค้าผู้ติดต่อ (ชื่อผู้ติดต่อ)",
      value: data?.customerName,
      icon: <User />,
    },
    {
      label: "เบอร์โทรศัพท์ผู้ติดต่อ",
      value: data?.contactNumber,
      icon: <Phone />,
    },
    { label: "อีเมลผู้ติดต่อ", value: data?.email, icon: <Mail /> },
    {
      label: "วันที่อยากใช้ของ (วันนัดสำคัญ)",
      value: formatDateAndTime(data?.eventKeyDate),
      icon: <CalendarDays />,
    },
    {
      label: "ใช้ในงานอะไร (กิจกรรม)",
      value: data?.activityType,
      icon: <Ticket />,
    },
    {
      label: "สถานะลูกค้า",
      value: displayStatus(data?.customerStatus),
      icon: <UserCheck />,
    },
    {
      label: "ยินยอมข้อมูลส่วนบุคคล",
      value: displayConsent(data?.consentPii),
      icon: <ShieldCheck />,
    },
    { label: "เลขผู้เสียภาษี", value: data?.taxId, icon: <FileText /> },
    {
      label: "ลักษณะการคุยของลูกค้า (อุปนิสัย)",
      value: data?.personality,
      icon: <Smile />,
    },
  ];

  React.useEffect(() => {
    if (value) setState(value);
  }, [value]);

  React.useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);

  // const setChecked = (key: FieldKey, checked: boolean) => {
  //   setState((prev) => ({ ...prev, [key]: { ...prev[key], checked } }));
  //   setOpen((prev) =>
  //     checked
  //       ? Array.from(new Set<FieldKey>([...prev, key]))
  //       : prev.filter((k) => k !== key)
  //   );
  // };

  // const setNote = (key: FieldKey, note: string) => {
  //   setState((prev) => ({ ...prev, [key]: { ...prev[key], note } }));
  // };

  return (
    <Card>
      <CardHeader>
        <div className="flex  items-center ">
          <CardTitle className="text-base font-bold">ข้อมูลจาก AI</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3  ">
          <div className="space-y-2">
            {infoItems.map((item, index) => (
              <div key={index} className="flex flex-row flex-wrap gap-1 pb-1">
                <span className="flex mr-2 w-4 h-4">{item.icon}</span>
                <span className="font-bold">{item.label} :</span>
                <span className="pl-4 text-[#71717A]">
                  {item.value || "ยังไม่มีข้อมูล"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
