import dayjs from "dayjs";
import "dayjs/locale/th";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.locale("th");

export const formatNumber = (
  value: number | null | undefined,
  options?: Intl.NumberFormatOptions
) => {
  if (value == null) return "0.00";
  return value.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });
};

export const formatForNumber = (
  value: number | null | undefined,
  options?: Intl.NumberFormatOptions
) => {
  if (value == null) return "0.00";
  return value.toLocaleString("th-TH");
};
export const formatDateTH = (
  date: string | Date | null | undefined
): string => {
  if (!date) return "-";
  const d = dayjs(date);
  const thaiYear = d.year() + 543;
  return `${d.format("DD/MMM/")}${thaiYear} `;
};

export const formatDateBirthDay = (date?: string | Date | null): string => {
  if (!date) return "-";
  const d = dayjs(date);
  const thaiYear = d.year() + 543;
  return `${d.format("DD/MM/")}${thaiYear} `;
};

export const formatDateFull = (date?: string | Date | null): string => {
  if (!date) return "-";
  const d = dayjs(date);
  const thaiYear = d.year() + 543;
  return `${d.format("DD MMMM ")}/${thaiYear} `;
};
export const formatDateAndTime = (date?: string | Date | null): string => {
  if (!date) return "-";
  const d = dayjs(date);
  const thaiYear = d.year() + 543;
  return `${d.format("DD/MM")}/${thaiYear} ${d.format("HH:mm")} น.`;
};

export function formatPhoneNumber(phone?: string) {
  const digits = phone?.replace(/\D/g, "");
  if (digits?.length === 9 || 10) {
    return `${digits?.slice(0, 3)}-${digits?.slice(3, 6)}-${digits?.slice(6)}`;
  }

  return phone;
}

export const onlyNumber =
  (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    field.onChange(numericValue);
  };

export const inputPhoneNumber = (value: string) => {
  const numeric = value.replace(/\D/g, "");

  if (numeric.length <= 2) return numeric;
  if (numeric.length <= 6) return numeric.slice(0, 2) + "-" + numeric.slice(2);
  return (
    numeric.slice(0, 2) + "-" + numeric.slice(2, 6) + "-" + numeric.slice(6, 10)
  );
};
