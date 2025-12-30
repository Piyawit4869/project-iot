import { useRef } from "react";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";

export function InputNumberBox({
  value,
  onChange,
  groups = [13],
  format = "-",
  inputClass = "w-6 h-8 border rounded text-center",
  gap = "gap-1",
}: {
  value: string;
  onChange: (v: string) => void;
  groups?: number[];
  format?: string;
  inputClass?: string;
  gap?: string;
}) {
  const digits = value.split("");
  const totalLength = groups.reduce((a, b) => a + b, 0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (index: number, v: string) => {
    if (!/^[0-9]?$/.test(v)) return;

    const newValue = Array(totalLength).fill("");
    digits.forEach((d, i) => (newValue[i] = d));
    newValue[index] = v;

    onChange(newValue.join(""));

    if (v && index + 1 < totalLength) {
      requestAnimationFrame(() => {
        inputRefs.current[index + 1]?.focus();
      });
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const newValue = Array(totalLength).fill("");
        digits.forEach((d, i) => (newValue[i] = d));
        newValue[index] = "";

        onChange(newValue.join(""));
        return;
      }

      if (index > 0) {
        requestAnimationFrame(() => {
          inputRefs.current[index - 1]?.focus();
        });
      }
    }
  };

  let globalIndex = 0;

  return (
    <div className={cn("flex items-center", gap)}>
      {groups.map((groupLen, groupIdx) => (
        <div key={groupIdx} className="flex items-center gap-1">
          {Array.from({ length: groupLen }).map(() => {
            const idx = globalIndex++;

            return (
              <Input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                value={digits[idx] || ""}
                maxLength={1}
                inputMode="numeric"
                onChange={(e) => handleInput(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={cn("px-0 py-0", inputClass)}
              />
            );
          })}

          {groupIdx < groups.length - 1 && (
            <span className="mx-0.5 text-muted-foreground">{format}</span>
          )}
        </div>
      ))}
    </div>
  );
}
