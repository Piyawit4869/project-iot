import { cn } from "~/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function RadioCardGroup({
  options,
  value,
  onChange,
  className,
  columns = 3, // จำนวนคอลัมน์ปรับได้
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
  columns?: number;
}) {
  return (
    <div>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className={cn(`grid gap-3 grid-cols-${columns}`, className)}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            htmlFor={opt.value}
            className={cn(
              "min-w-20 flex items-center gap-3 p-3 border rounded-xl cursor-pointer shadow-sm bg-white",
              "transition-all hover:shadow-md flex-wrap",
              value === opt.value && "border-black shadow-md"
            )}
          >
            <RadioGroupItem id={opt.value} value={opt.value} />
            <span className="text-sm flex  ">{opt.label}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
