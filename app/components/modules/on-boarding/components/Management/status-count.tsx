import { Card, CardTitle } from "~/components/ui/card";
import React from "react";
import type { StatusCardProps } from "~/schemas/on-boarding/onboard";

export const StatusCount: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  valueColor,
}) => {
  return (
    <Card className="p-10 w-full text-gray-500">
      <CardTitle>{title}</CardTitle>
      <div className="flex items-center justify-between w-full">
        <span
          className={`text-4xl font-semibold ${valueColor ?? "text-black"}`}
        >
          {value}
        </span>
        {icon}
      </div>
    </Card>
  );
};
