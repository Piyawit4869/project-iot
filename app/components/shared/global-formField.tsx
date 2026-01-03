import type { ReactElement } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
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
import { Copy, ImageUp } from "lucide-react";
import { formatDateFull } from "./global-format";
import ImageUpload from "./image-upload";
import { GlobalImage } from "./global-image";
import { copyTextToClipboard } from "~/lib/utils";
import React from "react";
import { InputNumberBox } from "./input-number-box";
import { RadioCardGroup } from "./global-radio-card";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";

interface GlobalFormFieldProps {
  control: any;
  name: string;
  label: string | ReactElement;
  disabledItem?: any;
  disabled?: any;
  groups?: number[];
  format?: string;
  defaultValueLabel?: any;
  type?:
    | "input"
    | "select-radio-card"
    | "number"
    | "number-box"
    | "file"
    | "select"
    | "date"
    | "textArea"
    | "signature"
    | "custom"
    | "image"
    | "switch"
    | "checkbox";
  placeholder?: any;
  options?: { label: string; value: string }[];
  view?: string; // true = view mode
  columns?: number;
  required?: boolean;
  customeOnValue?: any;
  heightTextRow?: any;
  customControl?: any;
  iconFront?: ReactElement;
  widthImage?: number;
  heightImage?: number;
  iconBack?: ReactElement;
  canCopy?: boolean;
  formatter?: (value: string) => string;
  labelCheckbox?: string;
}

export function GlobalFormField({
  control,
  // ref,
  name,
  label,
  groups = [3, 3, 4],
  format = "-",
  type = "input",
  placeholder,
  options = [],
  disabled,
  required,
  disabledItem,
  formatter,
  iconFront,
  iconBack,
  heightTextRow = 2,
  widthImage = 120,
  heightImage = 120,
  view = "create",
  columns,
  customControl,
  labelCheckbox,
  canCopy,
}: GlobalFormFieldProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (value: string) => {
    const success = await copyTextToClipboard(value || "");
    setCopied(success);
    setTimeout(() => setCopied(false), 1500);
  };

  const renderView = (field: any) => {
    switch (type) {
      case "input":
      case "number-box":
        return (
          <span className="text-muted-foreground">
            {formatter ? formatter(field.value) || "-" : field.value || "-"}
          </span>
        );

      case "select":
      case "select-radio-card":
        return (
          <span className="text-muted-foreground">
            {options.find((opt) => opt.value === field.value)?.label || "-"}
          </span>
        );

      case "switch":
        return (
          <Switch
            checked={!!field.value}
            onCheckedChange={field.onChange}
            disabled
          />
        );

      case "date":
        return (
          <span className="text-muted-foreground">
            {field.value ? formatDateFull(field.value) : "-"}
          </span>
        );

      case "image":
        return (
          <GlobalImage
            src={field.value}
            width={widthImage || 110}
            height={heightImage || 110}
            className="object-cover rounded-md object-center"
          />
        );

      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled
              id={name}
            />
            <label
              htmlFor={name}
              className="text-sm font-normal text-muted-foreground leading-none"
            >
              {labelCheckbox}
            </label>
          </div>
        );

      default:
        return (
          <span className="text-muted-foreground">{field.value || "-"}</span>
        );
    }
  };

  const renderEdit = (field: any) => {
    switch (type) {
      case "input":
      case "number":
        return (
          <Input
            {...field}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            value={field.value ?? ""}
            className="w-full"
          />
        );

      case "number-box":
        return (
          <InputNumberBox
            value={field.value || ""}
            onChange={field.onChange}
            groups={groups}
            format={format}
          />
        );

      case "switch":
        return (
          <Switch
            checked={field.value || ""}
            onCheckedChange={field.onChange}
            defaultChecked
          />
        );

      case "textArea":
        return (
          <Textarea
            placeholder={placeholder}
            className="w-full"
            rows={heightTextRow}
            onChange={field.onChange}
            disabled={disabled}
            value={field.value || ""}
          />
        );

      case "file":
        return (
          <Input
            type="file"
            className="w-full"
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => field.onChange(e.target.files?.[0] || null)}
          />
        );

      case "image":
        return (
          <ImageUpload
            value={field.value || ""}
            onChange={field.onChange}
            width={widthImage || 110}
            height={heightImage || 110}
          />
        );

      case "date":
        return (
          <DatePicker
            value={field.value}
            onChange={field.onChange}
            disabled={disabled}
          />
        );

      case "select":
        return (
          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "select-radio-card":
        return (
          <RadioCardGroup
            options={options}
            value={field.value || ""}
            onChange={field.onChange}
            columns={columns}
          />
        );

      case "checkbox":
        return (
          <div className="flex items-center gap-2 ">
            <Checkbox
              checked={!!field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              id={name}
            />
            <label
              htmlFor={name}
              className="text-sm font-normal leading-none cursor-pointer "
            >
              {labelCheckbox}
            </label>
          </div>
        );

      case "custom":
        return customControl(field);

      default:
        return null;
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>
            {iconFront}{" "}
            <span>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </span>
            <FormMessage />
            {iconBack}
            {type === "input" && canCopy ? (
              <button
                type="button"
                onClick={() => handleCopy(field.value)}
                className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
              >
                {copied ? (
                  <span className="text-[#b4b4c5] text-xs">คัดลอกแล้ว</span>
                ) : (
                  <Copy size={16} />
                )}
              </button>
            ) : null}
          </FormLabel>

          {/*   VIEW MODE  */}
          {view === "view" ? (
            <div className="text-sm w-full flex items-center">
              {renderView(field)}
            </div>
          ) : (
            <FormControl>{renderEdit(field)}</FormControl>
          )}
        </FormItem>
      )}
    />
  );
}
