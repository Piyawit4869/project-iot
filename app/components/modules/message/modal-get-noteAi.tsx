import * as React from "react";

import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";
import { Card } from "~/components/ui/card";
import { useGetSummaryAINote } from "~/api/client/customer/useCustomer";
import { StreamingText } from "./streaming-text";

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
  customerId?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function GetNoteFormAI({ customerId, open, setOpen }: Props) {
  //TODO
  // const { data } = useGetSummaryAINote(customerId);
  // console.log({ customerId, data });

  const data = "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg w-full  max-h-[95vh] min-w-[35%] overflow-auto  rounded-lg">
        <DialogTitle>สรุปโน้ตจาก AI</DialogTitle>

        <Card className="w-full h-full min-h-[20vh] flex items-center justify-center">
          <div className="flex flex-row flex-wrap justify-center">
            <StreamingText
              text={
                data
                  ? data
                  : " ฟีเจอร์นี้อยู่ระหว่างการพัฒนา โปรดรอการอัปเดตเร็ว ๆ นี้"
              }
              speed={40}
            />
            {/* ) : (
                <span className="pl-4 text-[#71717A] text-center">
                  ฟีเจอร์นี้อยู่ระหว่างการพัฒนา โปรดรอการอัปเดตเร็ว ๆ นี้
                </span>
              )} */}
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
