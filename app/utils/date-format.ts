import buddhistEra from "dayjs/plugin/buddhistEra";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "dayjs/locale/th";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);
dayjs.extend(buddhistEra);
dayjs.extend(localizedFormat);

export const DateISOToDisplayDate = (iso: string): string => {
  if (!iso) return "";

  return dayjs(iso)
    .tz("Asia/Bangkok")
    .locale("th")
    .format("DD/MM/BBBB HH:mm น.");
};

export const DateISOToDisplayDateWithNoTime = (iso: string): string => {
  if (!iso) return "";

  return dayjs(iso).tz("Asia/Bangkok").locale("th").format("DD/MM/BBBB");
};

export const DateTimeStampChatDisplay = (timestamp: string | Date): string => {
  if (!timestamp) {
    return "";
  }
  const time = dayjs(timestamp);

  if (time.isToday()) {
    return time.format("HH:mm");
  }

  if (time.isYesterday()) {
    return "เมื่อวาน";
  }

  return time.format("DD MMM YYYY");
};
