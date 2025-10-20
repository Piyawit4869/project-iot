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
  onClickBtn?: () => void;
  onOpenChange: (open: boolean) => void;
  customer: any;
  closeBtn?: boolean;
};

export function AIMessageView({
  open,
  onOpenChange,
  customer,
  onClickBtn,
  closeBtn,
}: ChecklistDialogProps) {
  const [, setFields] = React.useState<AiFieldsState>();

  // const { customer: currentCustomer } = useChatRoom(); // !! old for render privider

  // const { data, isLoading } = useGetAiNote(currentCustomer?.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full max-h-[95vh] min-w-[35%] overflow-auto p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>ข้อมูลลูกค้าผ่าน AI</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-2 overflow-y-auto">
          {/* {isLoading ? ( // !! old for render loading
            <div className="flex justify-center">
              <SkeletonLoading className="w-[440px] h-[390px] " />
            </div>
          ) : (
            <AiCustomerFields
              defaultOpen={["customerStatus", "businessType", "customerName"]}
              onChange={setFields}
              data={customer}
            />
          )} */}

          <AiCustomerFields
            defaultOpen={["customerStatus", "businessType", "customerName"]}
            onChange={setFields}
            data={customer}
            onClickBtn={onClickBtn}
            closeBtn={closeBtn}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
