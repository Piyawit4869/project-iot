import { EditIcon, Save, X } from "lucide-react";
import React from "react";
import GlobalButton from "~/components/shared/global-button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";

type ChecklistDialogProps = {
  form: any;
  open: boolean;
  onConfirm: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
};

export function InstructionEditModal({
  form,
  open,
  onOpenChange,
  onConfirm,
  onClose,
}: ChecklistDialogProps) {
  const [input, setInput] = React.useState(
    form.getValues("systemInstructions")
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full max-h-[95vh] min-w-[60%] overflow-auto p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>คำแนะนำระบบ</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-2 overflow-y-auto">
          <Textarea
            placeholder="Style, tone, context, etc."
            className="min-h-[70vh] bg-white dark:bg-background"
            value={input ?? ""}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <DialogFooter className="flex w-full flex-end mt-6 flex-row">
          <div className="flex w-1/2 justify-end gap-4">
            <GlobalButton
              variant="outline"
              label={
                <span className="flex items-center justify-center gap-2 -translate-x-1">
                  <X />
                  ปิด
                </span>
              }
              width="25%"
              onClick={onClose}
            />
            <GlobalButton
              label={
                <span className="flex items-center justify-center gap-2 -translate-x-1">
                  <Save />
                  บันทึก
                </span>
              }
              type="submit"
              width="25%"
              onClick={() => onConfirm(input)}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
