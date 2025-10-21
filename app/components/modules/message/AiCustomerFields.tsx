// AiCustomerFields.tsx
import * as React from "react";

import { formatDateAndTime } from "~/components/shared/global-format";
import type { CustomerRequestResponse } from "../customer/types/customer";
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

export function AiCustomerFields({
  // title = "ข้อมูลลูกค้าประเมินผ่าน AI",
  closeBtn,
  value,
  defaultValue,
  onChange,
  defaultOpen,
  data,
  onClickBtn,
}: Props) {
  const navigate = useNavigate();

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
    // <div className="space-y-3 my-2">
    //   <div>สถานะลูกค้า : {data.customerStatus ?? "ยังไม่มีข้อมูล"}</div>
    //   <div>อุปนิสัย : {data.personality ?? "ยังไม่มีข้อมูล"}</div>
    //   <span>อุปนิสัย : {data.personality ?? "ยังไม่มีข้อมูล"}</span>
    //   <Accordion
    //     type="multiple"
    //     value={open}
    //     onValueChange={(v) => {
    //       const keys = v as FieldKey[];

    //       const newlyOpened = keys.filter(
    //         (k) => !open.includes(k) && !state[k].checked
    //       );

    //       if (newlyOpened.length) {
    //         setState((prev) => {
    //           const next = { ...prev };
    //           newlyOpened.forEach((k) => {
    //             next[k] = { ...next[k], checked: true };
    //           });
    //           return next;
    //         });
    //       }

    //       setOpen(keys);
    //     }}
    //     className="w-full"
    //   >
    //     {FIELDS.map((f) => {
    //       const s = state[f.key];
    //       const preview =
    //         s.note.trim().length > 0 ? s.note.trim().slice(0, 50) : undefined;

    //       return (
    //         <AccordionItem
    //           key={f.key}
    //           value={f.key}
    //           className="border rounded-lg mb-2"
    //         >
    //           <AccordionTrigger className="px-3 py-2 hover:no-underline gap-3">
    //             <div className="flex items-center gap-3 w-full">
    //               <Checkbox
    //                 checked={s.checked}
    //                 onCheckedChange={(c) => setChecked(f.key, Boolean(c))}
    //                 onClick={(e) => e.stopPropagation()}
    //               />
    //               <div className="flex-1 text-left">
    //                 <div className="font-medium">{f.label}</div>
    //                 {preview && (
    //                   <div className="text-xs text-muted-foreground line-clamp-1">
    //                     {preview}
    //                   </div>
    //                 )}
    //               </div>
    //             </div>
    //           </AccordionTrigger>
    //           <AccordionContent className="px-3 pb-3 pt-0">
    //             <div className="space-y-2">
    //               <Label
    //                 htmlFor={`${f.key}-note`}
    //                 className="text-xs text-muted-foreground"
    //               >
    //                 ค่า/บันทึกของฟิลด์นี้
    //               </Label>
    //               <Textarea
    //                 id={`${f.key}-note`}
    //                 placeholder={f.placeholder}
    //                 value={s.note || s.defaultValues}
    //                 onChange={(e) => setNote(f.key, e.target.value)}
    //                 className="min-h-[72px] resize-y"
    //               />
    //             </div>
    //           </AccordionContent>
    //         </AccordionItem>
    //       );
    //     })}
    //   </Accordion>
    // </div>
    <div className="space-y-3 my-2">
      <div className="space-y-2">
        {infoItems.map((item, index) => (
          <div key={index} className="flex flex-row flex-wrap ">
            <span className="flex mr-2 w-4 h-4">{item.icon}</span>
            <span className="font-bold">{item.label} :</span>
            <span className="pl-4 text-[#71717A]">
              {item.value || "ยังไม่มีข้อมูล"}
            </span>
          </div>
        ))}
      </div>

      {/* <div>วันเตรียมงาน : {formatDateAndTime(data.eventSetupDate)}</div>
      <div>สร้างเมื่อ : {formatDateAndTime(data.createdAt)}</div>
      <div>แก้ไขเมื่อ : {formatDateAndTime(data.updatedAt)}</div> */}

      <div className="flex justify-between items-center gap-2 mt-5 min-w-0">
        <GlobalButton
          key="sync-ai"
          type="button"
          onClick={() => onClickBtn?.()}
          variant="secondary"
          className="flex-1  bg-[#2e498d] text-white hover:bg-[#142a60] hover:text-white px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
          icon={<Link />}
          label={<span className="hidden sm:inline">Sync ข้อมูล AI</span>}
        />
        {closeBtn ?? (
          <GlobalButton
            key="navigate-customer-details"
            type="button"
            onClick={() => {
              navigate(`/customer/${data.id}`);
            }}
            variant="secondary"
            className="flex-1  bg-[#34cf16] text-white hover:bg-[#142a60] hover:text-white px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
            icon={<Navigation />}
            label={
              <span className="hidden sm:inline">ไปยังหน้ารายละเอียด</span>
            }
          />
        )}
      </div>

      {/* <div className="text-xs text-muted-foreground mt-4">
        <div>
          Customer ID :{" "}
          <span className="font-mono break-all">{data.customerId}</span>
        </div>
        <div>
          Branch ID :{" "}
          <span className="font-mono break-all">{data.branchId}</span>
        </div>
        <div>
          Record ID : <span className="font-mono break-all">{data.id}</span>
        </div>
      </div> */}
    </div>
  );
}
