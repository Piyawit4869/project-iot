import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";
import { Card } from "~/components/ui/card";

type InventoryFieldKey =
  | "totalStockValue"
  | "totalItems"
  | "inStockCount"
  | "capacityUsage"
  | "topSellingItems"
  | "topQuantityItems"
  | "lowStockItems"
  | "restockSuggestions"
  | "slowMovingItems"
  | "topCategories"
  | "monthlySalesValue"
  | "salesTrendPercent"
  | "fastestSoldItems";

export type AiInventoryFieldsState = Record<
  InventoryFieldKey,
  { checked: boolean; note: string; defaultValues: string }
>;

type Props = {
  data?: {
    id?: string;
    inventoryAiNote?: string | null;
    note?: string | null;
  };
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function GetNoteInventoryAI({ data, open, setOpen }: Props) {
  const note =
    (data?.inventoryAiNote && data.inventoryAiNote.trim()) ||
    (data?.note && data.note.trim()) ||
    "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg w-full max-h-[95vh] min-w-[35%] overflow-auto rounded-lg p-6">
        <DialogTitle>สรุปโน้ตคลังสินค้า (AI)</DialogTitle>

        <Card className="w-full h-full min-h-[20vh] p-4">
          {note ? (
            <div className="text-sm text-[#3f3f46] whitespace-pre-wrap leading-6">
              {note}
            </div>
          ) : (
            <div className="w-full h-full min-h-[16vh] flex items-center justify-center">
              <span className="text-[#71717A] text-center">
                {/* ยังไม่มีโน้ตสรุปจาก AI สำหรับคลังสินค้า */}
                ฟีเจอร์นี้อยู่ระหว่างการพัฒนา โปรดรอการอัปเดตเร็ว ๆ นี้
              </span>
            </div>
          )}
        </Card>
      </DialogContent>
    </Dialog>
  );
}
