// /chat/components/MessageGroupDate.tsx
import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";

dayjs.locale("th");

export default function MessageGroupDate({ date }: { date: string }) {
  const d = dayjs(date);
  const today = dayjs();
  const yesterday = dayjs().subtract(1, "day");

  let label = d.format("D MMMM YYYY");

  if (d.isSame(today, "day")) label = "วันนี้";
  else if (d.isSame(yesterday, "day")) label = "เมื่อวาน";

  return (
    <div className="flex justify-center my-4">
      <span className="text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
        {label}
      </span>
    </div>
  );
}
