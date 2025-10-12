import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { AiCustomerFields, type AiFieldsState } from "./AiCustomerFields";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { useChatRoom } from "~/providers/chat/useChatRoom";
import { useGetAiNote } from "~/api/client/customer/useCustomer";

type ChecklistDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AIMessageView({ open, onOpenChange }: ChecklistDialogProps) {
  const [, setFields] = React.useState<AiFieldsState>();

  const { customer: currentCustomer } = useChatRoom();

  console.log({ currentCustomer });
  const { data, isLoading } = useGetAiNote(currentCustomer?.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full max-h-[70vh] overflow-auto p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>ข้อมูลลูกค้าผ่าน AI</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-2 mt-4 max-h-[50vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center">
              <SkeletonLoading className="w-[440px] h-[390px] " />
            </div>
          ) : (
            <AiCustomerFields
              defaultOpen={["customerStatus", "businessType", "customerName"]}
              onChange={setFields}
              data={data?.customerData}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
