// AiInventoryView.tsx
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  AiInventoryFields,
  type AiInventoryFieldsState,
} from "./AiCustomerFields";

type InventorySummaryData = {
  id?: string;
  totalStockValue?: string;
  totalItems?: string;
  inStockCount?: string;
  capacityUsage?: string;
  topSellingItems?: string;
  topQuantityItems?: string;
  lowStockItems?: string;
  restockSuggestions?: string;
  slowMovingItems?: string;
  topCategories?: string;
  monthlySalesValue?: string;
  salesTrendPercent?: string;
  fastestSoldItems?: string;
};

type ChecklistDialogProps = {
  open: boolean;
  onClickBtn?: () => void;
  onOpenChange: (open: boolean) => void;
  inventory: InventorySummaryData;
  closeBtn?: boolean;
};

export function AiInventoryView({
  open,
  onOpenChange,
  inventory,
  onClickBtn,
  closeBtn,
}: ChecklistDialogProps) {
  const [, setFields] = React.useState<AiInventoryFieldsState>();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full max-h-[95vh] min-w-[35%] overflow-auto p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>สรุปคลังสินค้า AI</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-2 overflow-y-auto">
          <AiInventoryFields
            defaultOpen={["totalStockValue", "totalItems", "inStockCount"]}
            onChange={setFields}
            data={inventory}
            onClickBtn={onClickBtn}
            closeBtn={closeBtn}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
