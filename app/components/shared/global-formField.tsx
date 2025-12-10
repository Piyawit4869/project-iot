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
import { Copy, ImageUp } from "lucide-react";
import { formatDateFull } from "./global-format";
import ImageUpload from "./image-upload";
import { GlobalImage } from "./global-image";
import { copyTextToClipboard } from "~/lib/utils";
import React from "react";

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
    | "custom"
    | "image";
  placeholder?: any;
  options?: { label: string; value: string }[];
  view?: string; // true = view mode
  customeOnValue?: any;
  heightTextRow?: any;
  customControl?: any;
  iconFront?: ReactElement;
  widthImage?: number;
  heightImage?: number;
  iconBack?: ReactElement;
  canCopy?: boolean;
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
  widthImage = 140,
  heightImage = 140,
  view = "create",
  customControl,
  canCopy,
}: GlobalFormFieldProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (value: string) => {
    const success = await copyTextToClipboard(value || "");
    setCopied(success);
    setTimeout(() => setCopied(false), 1500);
  };

  const renderView = (field: any) => {
    if (type === "input") {
      return (
        <span className="text-muted-foreground">{field.value || "-"}</span>
      );
    }

    if (type === "select") {
      return (
        <span className="text-muted-foreground">
          {options.find((opt) => opt.value === field.value)?.label || "-"}
        </span>
      );
    }

    if (type === "date") {
      return field.value ? formatDateFull(field.value) : "-";
    }

    if (type === "image") {
      return (
        <GlobalImage
          src={field.value}
          width={widthImage}
          height={heightImage}
          className="rounded-xl object-contain object-center"
          fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${field.value}`}
        />
      );
    }

    return <span className="text-muted-foreground">{field.value || "-"}</span>;
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

      case "textArea":
        return (
          <Textarea
            placeholder="ระบุหมายเหตุ..."
            className="w-full"
            rows={heightTextRow}
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
            width={widthImage}
            height={heightImage}
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
            onValueChange={field.onChange}
            defaultValue={field.value}
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
            {iconFront} {label} {iconBack}
            {type === "input" && canCopy ? (
              <button
                type="button"
                onClick={() => handleCopy(field.value)}
                className="text-gray-400 hover:text-gray-600 transition"
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
