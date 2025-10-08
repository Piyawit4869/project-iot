import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { CircleX, CircleAlert, Info, CircleCheck } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useModalStore } from "./modal-controller";

export function GlobalModalStatic() {
  const {
    open,
    title,
    description,
    type,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    hide,
    loading,
    setLoading,
  } = useModalStore();

  const iconMap = {
    delete: <CircleX className="text-red-500 w-10 h-10" />,
    warning: <CircleAlert className="text-yellow-500 w-10 h-10" />,
    info: <Info className="text-blue-500 w-10 h-10" />,
    success: <CircleCheck className="text-blue-500 w-10 h-10" />,
  } as any;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm?.();
      hide();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={hide}>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center gap-2">
          {type && iconMap[type]}
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter className="flex justify-center gap-4 mt-6 flex-row">
          <Button
            onClick={onCancel || hide}
            type="button"
            className="w-1/2 max-w-[222px] bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          >
            {cancelText || "ยกเลิก"}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            type="button"
            className="w-1/2 max-w-[222px]"
          >
            {confirmText || "ยืนยัน"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
