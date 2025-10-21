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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Card } from "~/components/ui/card";

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

export type AiFieldsState = Record<
  FieldKey,
  { checked: boolean; note: string; defaultValues: string }
>;

type Props = {
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function GetNoteFormAI({ data, open, setOpen }: Props) {
  return (
    <>
      {/* Dialog */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg w-full  max-h-[95vh] min-w-[35%] overflow-auto  rounded-lg">
          <DialogTitle>สรุปโน้ตจาก AI</DialogTitle>

          <Card className="w-full h-full min-h-[20vh] flex items-center justify-center">
            <div className="flex flex-row flex-wrap justify-center">
              <span className="pl-4 text-[#71717A] text-center">
                ฟีเจอร์นี้อยู่ระหว่างการพัฒนา โปรดรอการอัปเดตเร็ว ๆ นี้
              </span>
            </div>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}
