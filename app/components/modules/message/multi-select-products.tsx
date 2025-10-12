import React, { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "~/lib/utils";

type Option = { value: string; label: string };

type MultiSelectSimpleProps = {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
};

export function MultiSelectOnModal({
  options,
  selected,
  onChange,
  placeholder = "เลือก...",
}: MultiSelectSimpleProps) {
  const [open, setOpen] = useState(false);

  const toggleValue = (value: string | undefined) => {
    if (!value) return;

    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };
  return (
    <div className="relative w-full">
      <button
        type="button"
        className="w-full text-left font-normal flex justify-between items-center border rounded px-3 py-2"
        onClick={() => setOpen(!open)}
      >
        {selected.length > 0
          ? options
              .filter((o) => selected.includes(o.value))
              .map((o) => o.label)
              .join(", ")
          : placeholder}

        {open ? (
          <ChevronUp className="ml-2 h-4 w-4 opacity-70" />
        ) : (
          <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
        )}
      </button>

      {open && (
        <div className="absolute z-[9999] w-full max-h-60 overflow-auto bg-white dark:bg-gray-800 rounded-md border mt-1 shadow-lg">
          {options.length === 0 && (
            <div className="p-3 text-center text-sm text-gray-500">
              ไม่พบข้อมูล
            </div>
          )}

          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                `cursor-pointer select-none px-4 py-2 flex items-center gap-2 hover:bg-gray-100 hover:text-black ${
                  selected.includes(option.value) && "dark:text-black"
                }`,
                selected.includes(option.value) && "bg-blue-100"
              )}
              onClick={() => toggleValue(option.value)}
            >
              <div
                className={cn(
                  "w-4 h-4 border rounded-sm flex items-center justify-center",
                  selected.includes(option.value)
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300"
                )}
              >
                {selected.includes(option.value) && (
                  <Check className="w-3 h-3" />
                )}
              </div>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
