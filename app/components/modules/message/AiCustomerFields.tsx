// AiCustomerFields.tsx
import * as React from "react";

import { formatDateAndTime } from "~/components/shared/global-format";
import type { CustomerRequestResponse } from "../customer/types/customer";

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
  defaultOpen?: FieldKey[];
  data: CustomerRequestResponse;
};

const statusTh: Record<string, string> = {
  newly_registered: "ลงทะเบียนใหม่",
  active: "ใช้งานอยู่",
  loyal_customer: "ลูกค้าภักดี",
  at_risk: "เสี่ยง",
  churned: "ยกเลิก",
};

const displayStatus = (s: CustomerStatusValue | null) =>
  s ? statusTh[s] ?? s : "-";

const displayConsent = (b: boolean | null) =>
  b === null ? "-" : b ? "ยินยอม" : "ไม่ยินยอม";

export function AiCustomerFields({
  // title = "ข้อมูลลูกค้าประเมินผ่าน AI",
  value,
  defaultValue,
  onChange,
  defaultOpen,
  data,
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
    //   <div>สถานะลูกค้า : {data.customerStatus ?? "-"}</div>
    //   <div>อุปนิสัย : {data.personality ?? "-"}</div>
    //   <span>อุปนิสัย : {data.personality ?? "-"}</span>
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
      <div>
        สรุปคำขอ : <span className="font-semibold">{data?.summary || "-"}</span>
      </div>

      <div>
        ชื่อลูกค้าผู้ติดต่อ (ชื่อผู้ติดต่อ) :{" "}
        <span className="font-semibold">{data?.customerName ?? "-"}</span>
      </div>

      <div>
        เบอร์โทร :{" "}
        <span className="font-semibold">{data?.contactNumber ?? "-"}</span>
      </div>

      <div>
        อีเมลล์ : <span className="font-semibold">{data?.email ?? "-"}</span>
      </div>
      <div>
        วันที่อยากใช้ของ (วันนัดสำคัญ) :{" "}
        <span className="font-semibold">
          {formatDateAndTime(data?.eventKeyDate)}
        </span>
      </div>

      <div>
        ใช้ในงานอะไร (กิจกรรม) :{" "}
        <span className="font-semibold">{data?.activityType ?? "-"}</span>
      </div>

      <div>
        สถานะลูกค้า :{" "}
        <span className="font-semibold">
          {displayStatus(data?.customerStatus)}
        </span>
      </div>
      <div>
        ยินยอมข้อมูลส่วนบุคคล :{" "}
        <span className="font-semibold">
          {displayConsent(data?.consentPii)}
        </span>
      </div>
      <div>
        เลขผู้เสียภาษี :{" "}
        <span className="font-semibold">{data?.taxId ?? "-"}</span>
      </div>
      <div>
        ลักษณะการคุยของลูกค้า (อุปนิสัย) :{" "}
        <span className="font-semibold">{data?.personality ?? "-"}</span>
      </div>
      {/* <div>วันเตรียมงาน : {formatDateAndTime(data.eventSetupDate)}</div>
      <div>สร้างเมื่อ : {formatDateAndTime(data.createdAt)}</div>
      <div>แก้ไขเมื่อ : {formatDateAndTime(data.updatedAt)}</div> */}

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
