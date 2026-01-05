// /chat/components/MessageTimestamp.tsx
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";

dayjs.locale("th");

export default function MessageTimestamp({ time, align }: any) {
  return (
    <span
      className={`text-[10px] text-gray-500 dark:text-gray-400 mt-1 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {dayjs(time).format("HH:mm")}
    </span>
  );
}
