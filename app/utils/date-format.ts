import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/th";

dayjs.extend(utc);
dayjs.extend(timezone);

export const DateISOToDisplayDate = (iso: string): string => {
  if (!iso) return "";

  return dayjs(iso)
    .tz("Asia/Bangkok")
    .locale("th")
    .format("D MMM YYYY H.mm น.");
};
