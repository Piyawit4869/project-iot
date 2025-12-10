import { useEffect } from "react";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";

export function InputNumberBox({
  value,
  onChange,
  length = 13,
  inputClass = "w-7.5 h-9 border rounded text-center",
  gap = "gap-1",
}: {
  value: string;
  onChange: (v: string) => void;
  length?: number;
  inputClass?: string;
  gap?: string;
}) {
  const digits = value?.split("") || [];

  const handleInput = (index: number, v: string) => {
    if (!/^[0-9]?$/.test(v)) return;

    const newValue = digits.slice();
    newValue[index] = v;

    const combined = newValue.join("");
    onChange(combined);

    const next = document.getElementById(`digit-${index + 1}`);
    if (v && next) next.focus();
  };

  const handleKeyDown = (index: number, e: any) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      const prev = document.getElementById(`digit-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  return (
    <div className={`flex ${gap}`}>
      {Array.from({ length }).map((_, idx) => (
        <Input
          key={idx}
          id={`digit-${idx}`}
          value={digits[idx] || ""}
          maxLength={1}
          onChange={(e) => handleInput(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className={cn("px-0 py-0", inputClass)}
        />
      ))}
    </div>
  );
}
