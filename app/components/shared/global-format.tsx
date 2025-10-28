import dayjs from "dayjs";
import "dayjs/locale/th";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import buddhistEra from "dayjs/plugin/buddhistEra";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(customParseFormat);
dayjs.locale("th");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);
dayjs.extend(buddhistEra);
dayjs.extend(localizedFormat);

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

export const formatDateTH = (date?: string | Date | null): string => {
  if (!date) return "";

  return dayjs(date).tz("Asia/Bangkok").locale("th").format("DD/MM/BBBB");
};

export const formatDateFull = (date?: string | Date | null): string => {
  if (!date) return "";

  return dayjs(date).tz("Asia/Bangkok").locale("th").format("DD MMMM BBBB");
};
export const formatDateAndTime = (date?: string | Date | null): string => {
  if (!date) return "";

  return dayjs(date)
    .tz("Asia/Bangkok")
    .locale("th")
    .format("DD/MM/BBBB HH:mm น.");
};

export function formatPhoneNumber(phone?: string) {
  const digits = phone?.replace(/\D/g, "");
  if (digits?.length === 9 || digits?.length === 10) {
    return `${digits?.slice(0, 3)}-${digits?.slice(3, 6)}-${digits?.slice(6)}`;
  }

  return phone;
}

export const formatDateHHMM = (date: string | Date | null): string => {
  if (!date) return "";

  return dayjs(date).format("DD MMM YYYY, HH:mm");
};

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
