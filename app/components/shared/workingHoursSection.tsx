import React from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { UseFormReturn } from "react-hook-form";

//To FIX
export type DayKey =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type WorkingHours = {
  open: string;
  close: string;
};

export type WorkingHoursFormValue = Record<
  DayKey,
  {
    open?: string;
    close?: string;
  }
>;
export type WorkingHoursRecord = Record<DayKey, WorkingHours>;

type WorkingHoursInput = Partial<Record<DayKey, Partial<WorkingHours>>>;

const DAY_LABEL: Record<DayKey, string> = {
  Monday: "วันจันทร์",
  Tuesday: "วันอังคาร",
  Wednesday: "วันพุธ",
  Thursday: "วันพฤหัสบดี",
  Friday: "วันศุกร์",
  Saturday: "วันเสาร์",
  Sunday: "วันอาทิตย์",
};

export const createEmptyWorkingHours = (): WorkingHoursRecord => ({
  Monday: { open: "", close: "" },
  Tuesday: { open: "", close: "" },
  Wednesday: { open: "", close: "" },
  Thursday: { open: "", close: "" },
  Friday: { open: "", close: "" },
  Saturday: { open: "", close: "" },
  Sunday: { open: "", close: "" },
});

function normalizeHours(input?: WorkingHoursInput): WorkingHoursRecord {
  const base = createEmptyWorkingHours();
  if (!input) return base;

  (Object.keys(base) as DayKey[]).forEach((k) => {
    base[k] = {
      open: input[k]?.open ?? "",
      close: input[k]?.close ?? "",
    };
  });

  return base;
}

function parseTimeRange(range: string): { start: string; end: string } {
  if (!range) return { start: "09:00", end: "18:00" };
  const cleaned = range.replace("น.", "").trim();
  const parts = cleaned.split("-");
  if (parts.length !== 2) return { start: "09:00", end: "18:00" };
  const start = (parts[0] ?? "").trim();
  const end = (parts[1] ?? "").trim();
  return { start, end };
}

type WorkingHoursSectionProps = {
  value?: WorkingHoursInput;
  onChange?: (next: WorkingHoursInput) => void;
  form: UseFormReturn<any>;
  defaultValue?: WorkingHoursInput;
  title?: string;
  subTitle?: string;
};

export default function WorkingHoursSection({
  value,
  form,
  defaultValue,
  onChange,
  // title = "เวลาการทำงาน",
  subTitle = "เปิดใช้งานการตั้งค่า",
}: WorkingHoursSectionProps) {
  const isControlled = typeof value !== "undefined";

  const [internal, setInternal] = React.useState<WorkingHoursRecord>(
    normalizeHours(defaultValue)
  );

  const hours = React.useMemo(() => {
    return isControlled ? normalizeHours(value) : internal;
  }, [isControlled, value, internal]);

  const [open, setOpen] = React.useState(false);
  const [selectedDays, setSelectedDays] = React.useState<DayKey[]>([]);
  const [startTime, setStartTime] = React.useState("09:00");
  const [endTime, setEndTime] = React.useState("18:00");

  const openModal = (days: DayKey[]) => {
    const first = days[0];
    if (first) {
      setStartTime(hours[first].open || "09:00");
      setEndTime(hours[first].close || "18:00");
    }
    setSelectedDays(days);
    setOpen(true);
  };

  const confirmTime = () => {
    setInternal((prev) => {
      const next = { ...prev };
      selectedDays.forEach((day) => {
        next[day] = { open: startTime, close: endTime };
      });
      onChange?.(next);
      return next;
    });
    setOpen(false);
  };

  return (
    <div className="gap-4 mb-6">
      <div className="grid gap-2 w-[50%]">
        {(Object.keys(DAY_LABEL) as DayKey[]).map((day) => (
          <div key={day} className="rounded-xl p-3 bg-card">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{DAY_LABEL[day]}</span>
              <button
                type="button"
                onClick={() => openModal([day])}
                className="flex items-center gap-2 text-sm"
              >
                {hours[day].open && hours[day].close
                  ? `${hours[day].open} - ${hours[day].close}`
                  : "ตั้งเวลา"}
                <Pencil className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-5">
        <Button
          type="button"
          variant="outline"
          onClick={() => openModal(Object.keys(DAY_LABEL) as DayKey[])}
        >
          แก้ไขทั้งหมด
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            openModal(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])
          }
        >
          แก้ไขจันทร์ - ศุกร์
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => openModal(["Saturday", "Sunday"])}
        >
          แก้ไขเสาร์ - อาทิตย์
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ตั้งเวลา </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-2">
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <span>ถึง</span>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              ยกเลิก
            </Button>
            <Button onClick={confirmTime}>ยืนยัน</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
