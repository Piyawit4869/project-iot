import type { ReactElement } from "react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePicker } from "./date-picker";
import { Textarea } from "../ui/textarea";
import { SignatureDocument } from "../modules/order/components/signature";
import { ImageUp } from "lucide-react";
import { formatDateFull } from "./global-format";

interface GlobalFormFieldProps {
  control: any;
  name: string;
  label: string | ReactElement;
  disabledItem?: any;
  disabled?: any;
  defaultValueLabel?: any;
  type?:
    | "input"
    | "number"
    | "file"
    | "select"
    | "date"
    | "textArea"
    | "signature"
    | "custom";
  placeholder?: any;
  options?: { label: string; value: string }[];
  view?: string; // true = view mode
  customeOnValue?: any;
  heightTextRow?: any;
  customControl?: any;
  iconFront?: ReactElement;
  iconBack?: ReactElement;
}

export function GlobalFormField({
  control,
  // ref,
  name,
  label,
  defaultValueLabel,
  customeOnValue,
  type = "input",
  placeholder,
  options = [],
  disabled,
  disabledItem,
  iconFront,
  iconBack,
  heightTextRow = 2,
  view = "create",
  customControl,
}: GlobalFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>
            {iconFront} {label} {iconBack}
          </FormLabel>

          {/*   VIEW MODE  */}

          {view === "view" ? (
            <div className="text-sm w-full">
              {type === "date"
                ? formatDateFull(field.value)
                : field.value || "-"}{" "}
            </div>
          ) : (
            <FormControl>
              <div>
                {/* Input / Number */}
                {(type === "input" || type === "number") && (
                  <Input
                    {...field}
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={field.value ?? ""}
                    className="w-full"
                  />
                )}

                {type === "textArea" && (
                  <Textarea
                    placeholder="ระบุหมายเหตุ..."
                    value={field.value || ""}
                    className="w-full"
                    rows={heightTextRow}
                    disabled={disabled}
                  />
                )}

                {type === "file" && (
                  <Input
                    type="file"
                    className="w-full"
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={(e) =>
                      field.onChange(e.target.files?.[0] || null)
                    }
                  />
                )}

                {type === "date" && (
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                )}

                {type === "select" && (
                  <Select
                    onValueChange={field.onChange || customeOnValue}
                    defaultValue={field.value || defaultValueLabel}
                  >
                    <SelectTrigger className="w-full" disabled={disabled}>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>

                    <SelectContent>
                      {options.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          disabled={disabledItem ? disabledItem(opt) : false}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {type === "signature" && (
                  <div className="flex gap-4 items-center">
                    <SignatureDocument
                      value={field.value}
                      onChange={(v) => field.onChange(v)}
                    />
                    <button
                      type="button"
                      // onClick={() =>
                      //   document.getElementById(`${name}-file`)?.click()
                      // }
                      className="flex items-center gap-2 hover:text-gray-800 cursor-pointer"
                    >
                      <ImageUp className="h-5 w-5" />
                    </button>
                    <input
                      id={`${name}-file`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] || null)
                      }
                    />
                  </div>
                )}

                {type === "custom" && customControl(field)}
              </div>
            </FormControl>
          )}
        </FormItem>
      )}
    />
  );
}
