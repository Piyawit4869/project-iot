"use client";

import React from "react";

export type InfoRowProps = {
  label: React.ReactNode;
  value?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  direction?: "row" | "col";
  // รับอะไรก็ได้เหมือนตัวอย่าง แล้วผู้ใช้จะจัดรูปแบบเอง
  format?: (v: any) => React.ReactNode;
};

export const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value = "-",
  className,
  labelClassName,
  valueClassName,
  direction = "col",
  format,
}) => {
  const isRow = direction === "row";

  const displayValue =
    format?.(value) ??
    (value === null || value === undefined || value === "" ? "-" : value);

  return (
    <div
      className={`${isRow ? "flex items-start gap-3" : "flex flex-col"} ${
        className ?? ""
      }`}
    >
      <div
        className={`text-base font-medium break-words ${labelClassName ?? ""} ${
          isRow ? "min-w-36 shrink-0" : ""
        }`}
      >
        {label}
      </div>
      <div className={`text-sm text-muted-foreground ${valueClassName ?? ""}`}>
        {displayValue}
      </div>
    </div>
  );
};
