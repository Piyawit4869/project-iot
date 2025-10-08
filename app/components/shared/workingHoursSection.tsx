import React from "react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

type DayWithTime = {
  days: DayKey[];
  time?: string;
};

export type WorkingHours = {
  time: string;
};

export type WorkingHoursRecord = Record<DayKey, WorkingHours>;

type WorkingHoursInput = Partial<Record<DayKey, Partial<WorkingHours>>>;

const DAY_LABEL: Record<DayKey, string> = {
  mon: "วันจันทร์",
  tue: "วันอังคาร",
  wed: "วันพุธ",
  thu: "วันพฤหัสบดี",
  fri: "วันศุกร์",
  sat: "วันเสาร์",
  sun: "วันอาทิตย์",
};

export const createEmptyWorkingHours = (): WorkingHoursRecord => ({
  mon: { time: "" },
  tue: { time: "" },
  wed: { time: "" },
  thu: { time: "" },
  fri: { time: "" },
  sat: { time: "" },
  sun: { time: "" },
});

function normalizeHours(input?: WorkingHoursInput): WorkingHoursRecord {
  const base = createEmptyWorkingHours();
  if (!input) return base;

  (Object.keys(base) as DayKey[]).forEach((k) => {
    const day = input[k];
    if (day) {
      base[k] = {
        time: day.time ?? base[k].time,
      };
    }
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
  value?: WorkingHoursInput; // controlled mode
  onChange?: (next: WorkingHoursRecord) => void;
  defaultValue?: WorkingHoursInput; // uncontrolled mode
  title?: string;
};

export default function WorkingHoursSection({
  value,
  defaultValue,
  title = "เวลาการทำงาน",
}: WorkingHoursSectionProps) {
  const isControlled = typeof value !== "undefined";

  const [internal, setInternal] = React.useState<WorkingHoursRecord>(
    normalizeHours(defaultValue)
  );

  const hours: WorkingHoursRecord = React.useMemo(() => {
    return isControlled ? normalizeHours(value) : internal;
  }, [isControlled, value, internal]);

  const [open, setOpen] = React.useState(false);
  const [selectedDays, setSelectedDays] = React.useState<DayWithTime | null>(
    null
  );
  const [startTime, setStartTime] = React.useState<string>("09:00");
  const [endTime, setEndTime] = React.useState<string>("18:00");

  const openModal = (day: DayKey) => {
    const { start, end } = parseTimeRange(hours[day]?.time ?? "");
    setSelectedDays({ days: [day], time: `${start} - ${end}` });
    setStartTime(start);
    setEndTime(end);
    setOpen(true);
  };

  const openModalForMulity = (days: DayKey[]) => {
    const firstDay = days[0];
    if (!firstDay) return;
    const { start, end } = parseTimeRange(hours[firstDay]?.time ?? "");
    setSelectedDays({ days, time: `${start} - ${end}` });
    setStartTime(start);
    setEndTime(end);
    setOpen(true);
  };

  const confirmTime = () => {
    if (!selectedDays) return;
    const timeSelect = `${startTime} - ${endTime} น.`;

    setInternal((prev) => {
      const next = { ...prev };
      selectedDays.days.forEach((day) => {
        next[day] = { ...next[day], time: timeSelect };
      });
      return next;
    });

    setSelectedDays({ ...selectedDays, time: timeSelect });
    setOpen(false);
  };

  return (
    <div className="gap-4 mb-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-row-1 md:grid-row-2 w-[50%] gap-2">
        {(Object.keys(DAY_LABEL) as DayKey[]).map((key) => {
          const day = internal[key];
          return (
            <div key={key} className="rounded-xl p-3 bg-card ">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{DAY_LABEL[key]}</span>
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer select-none">
                  <span className="text-sm">
                    {day?.time ? day.time : "ตั้งเวลา (กดเพื่อเลือก)"}
                  </span>
                  <Pencil className="h-4 w-4" onClick={() => openModal(key)} />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-row gap-5 mt-5 w-[100%]">
        <button
          type="button"
          onClick={() => openModalForMulity(Object.keys(DAY_LABEL) as DayKey[])}
          className="flex items-center justify-start gap-2 rounded-md border px-3 py-2 text-left hover:bg-gray-100"
        >
          แก้ไขทั้งหมด
        </button>
        <button
          type="button"
          onClick={() =>
            openModalForMulity(["mon", "tue", "wed", "thu", "fri"])
          }
          className="flex items-center justify-start gap-2 rounded-md border px-3 py-2 text-left hover:bg-gray-100"
        >
          แก้ไขจันทร์ - ศุกร์
        </button>
        <button
          type="button"
          onClick={() => openModalForMulity(["sat", "sun"])}
          className="flex items-center justify-start gap-2 rounded-md border px-3 py-2 text-left hover:bg-gray-100"
        >
          แก้ไขเสาร์ - อาทิตย์
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[92vw] sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>
              ตั้งเวลา
              {selectedDays
                ? selectedDays.days.length === 7
                  ? "ทั้งหมด"
                  : selectedDays.days.length > 1
                    ? `${DAY_LABEL[selectedDays.days[0] ?? "mon"]} - ${
                        DAY_LABEL[
                          selectedDays.days[selectedDays.days.length - 1] ??
                            "mon"
                        ]
                      }`
                    : DAY_LABEL[selectedDays.days[0] ?? "mon"]
                : ""}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-[130px]"
              />
              <span className="text-sm">ถึง</span>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-[130px]"
              />
            </div>
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
