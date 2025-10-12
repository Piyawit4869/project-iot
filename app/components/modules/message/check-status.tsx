"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button, Checkbox } from "@/components/ui";
import { CheckboxIndicator } from "@radix-ui/react-checkbox";
import { Progress } from "@radix-ui/react-progress";
import Link from "next/link";

type ChecklistItem = {
  key: string;
  label: string;
};

type ChecklistDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checklist: ChecklistItem[];
  data: Partial<Record<string, unknown>>; // your customer data object
};

export function ChecklistDialog({
  open,
  onOpenChange,
  checklist,
  data,
}: ChecklistDialogProps) {
  // Determine which fields are checked based on presence in data
  const checkedItems = React.useMemo(() => {
    const result: Record<string, boolean> = {};
    checklist.forEach(({ key }) => {
      // Check if data[key] exists and is not null/undefined/empty string
      const val = data[key];
      result[key] = val !== undefined && val !== null && val !== "";
    });
    return result;
  }, [checklist, data]);

  const total = checklist.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / total) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-full max-h-[70vh] overflow-auto p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="mb-2">รายการตรวจสอบข้อมูล</DialogTitle>
          <DialogDescription className="mb-4">
            กรุณาตรวจสอบความครบถ้วนของข้อมูลลูกค้า
          </DialogDescription>
          <Progress value={progressPercent} className="h-2 rounded" />
          <p className="text-sm mt-1 text-muted-foreground">
            {checkedCount} จาก {total} รายการสมบูรณ์ ({progressPercent}%)
          </p>
        </DialogHeader>

        <div className="flex flex-col space-y-2 mt-4 max-h-[50vh] overflow-y-auto">
          {checklist.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center gap-3 rounded-md px-4 py-2 bg-muted/20 dark:bg-muted/30 cursor-not-allowed select-none"
            >
              <Checkbox checked={checkedItems[key]} disabled>
                <CheckboxIndicator />
              </Checkbox>
              <label className="text-sm font-medium">{label}</label>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Link href={`/utotech/customer/${data.id}`}>
            <Button size={"sm"}>แก้ไขข้อมูลเพิ่มเติม</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
