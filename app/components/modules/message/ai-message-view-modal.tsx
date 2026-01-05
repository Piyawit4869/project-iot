import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { AiCustomerFields } from "./AiCustomerFields";

type ChecklistDialogProps = {
  open: boolean;
  onClickBtn?: () => void;
  onOpenChange: (open: boolean) => void;
  customer: any;
  closeBtn?: boolean;
  noSyncBtn?: boolean;
};

export function AIMessageView({
  open,
  onOpenChange,
  customer,
  onClickBtn,
  closeBtn,
  noSyncBtn = false,
}: ChecklistDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full max-h-[95vh] min-w-[60%] overflow-auto p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>ข้อมูลลูกค้าผ่าน AI</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-2 overflow-y-auto">
          <AiCustomerFields
            data={customer}
            onClickBtn={onClickBtn}
            closeBtn={closeBtn}
            noSyncBtn={noSyncBtn}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
