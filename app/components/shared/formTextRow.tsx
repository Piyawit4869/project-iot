import {
  useWatch,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  formatDateFull,
  formatDateTH,
  formatNumber,
  formatPhoneNumber,
} from "../shared/global-format";
import {
  activeStatus,
  customerStatus,
  customerType,
  gender,
  organizationType,
  prefix,
} from "~/initData/customer-initData";
import React from "react";
import { copyTextToClipboard } from "~/lib/utils";
import { Link } from "lucide-react";
import {
  matTypeOptions,
  statusOptions,
  unitOptions,
} from "~/initData/product-init-data";
type FormTextRowProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: "text" | "phone" | "date" | "number" | "dateFull";
  canCopy?: boolean;
};

function getLabel(
  value: string,
  options: { label: string; value: string }[]
): string {
  return options.find((opt) => opt.value === value)?.label ?? value;
}

export function FormTextRow<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  canCopy,
}: FormTextRowProps<T>) {
  const value = useWatch({ control, name });

  const [copied, setCopied] = React.useState(false);

  const allOptions = [
    ...customerStatus,
    ...activeStatus,
    ...organizationType,
    ...customerType,
    ...gender,
    ...unitOptions,
    ...statusOptions,
    ...prefix,
    ...matTypeOptions,
  ];

  let displayValue: React.ReactNode;

  switch (type) {
    case "phone":
      displayValue = value ? formatPhoneNumber(value as string) : "-";
      break;
    case "date":
      displayValue = value ? formatDateTH(value as string | Date) : "-";
      break;
    case "number":
      displayValue = value != null ? formatNumber(value as number) : "0.00";
      break;
    case "dateFull":
      displayValue = value ? formatDateFull(value as string | Date) : "-";
      break;

    default:
      displayValue =
        typeof value === "string"
          ? getLabel(value, allOptions) || value || "-"
          : value ?? "-";
      break;
  }

  const handleCopy = async () => {
    const success = await copyTextToClipboard(displayValue as string);
    setCopied(success);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col w-full">
      {canCopy ? (
        <>
          <div className="flex flex-row gap-2 items-center">
            <span className="dark:text-[#ffffff]">{label}</span>
            <div className="flex flex-row gap-2">
              <Link
                size={16}
                className="cursor-pointer hover:text-blue-400"
                onClick={handleCopy}
              />
              <span className="text-[#b4b4c5] text-sm">
                {copied && "คัดลอกแล้ว"}
              </span>
            </div>
          </div>

          <span className="mt-2 text-sm text-[#71717A]  dark:text-[#b4b4c5]">
            {displayValue}
          </span>
        </>
      ) : (
        <>
          <span className="dark:text-[#ffffff]">{label}</span>
          <span className="mt-2 text-sm text-[#71717A]  dark:text-[#b4b4c5]">
            {displayValue}
          </span>
        </>
      )}
    </div>
  );
}
