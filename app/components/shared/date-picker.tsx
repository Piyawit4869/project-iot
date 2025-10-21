import { CalendarIcon } from "lucide-react";
import { format, formatISO } from "date-fns";
import { th } from "date-fns/locale";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { toSafeDate } from "~/utils/date-format";

interface DatePickerProps {
  value?: string | Date;
  onChange?: (date: string | undefined) => void;
  placeholder?: string;
}

export function DatePicker({ value, onChange, placeholder }: DatePickerProps) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedDate = toSafeDate(value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShow(false);
      }
    }
    if (show) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  return (
    <div className="relative w-full" ref={ref}>
      <Button
        type="button"
        variant="outline"
        className="w-full pl-3 text-left font-normal"
        onClick={() => setShow((prev) => !prev)}
      >
        {selectedDate ? (
          format(selectedDate, "PPP", { locale: th })
        ) : (
          <span className="text-gray-500">{placeholder ?? "เลือกวันที่"}</span>
        )}
        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>

      {show && (
        <div className="absolute z-[9999] bg-white mt-2 shadow-md rounded-md">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              onChange?.(
                date ? formatISO(date, { representation: "date" }) : undefined
              );

              setShow(false);
            }}
            className="rounded-md border shadow-sm"
            captionLayout="dropdown"
          />
        </div>
      )}
    </div>
  );
}
