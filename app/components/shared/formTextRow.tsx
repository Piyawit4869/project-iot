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
type FormTextRowProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: "text" | "phone" | "date" | "number" | "dateFull";
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
}: FormTextRowProps<T>) {
  const value = useWatch({ control, name });

  const allOptions = [
    ...customerStatus,
    ...activeStatus,
    ...organizationType,
    ...customerType,
    ...gender,
    ...prefix,
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

  return (
    <div className="flex flex-col w-full">
      <span className="dark:text-[#ffffff]">{label}</span>
      <span className="mt-2 text-sm text-[#71717A]  dark:text-[#b4b4c5]">
        {displayValue}
      </span>
    </div>
  );
}
