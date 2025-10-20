import React from "react";
import { cn } from "~/lib/utils";
import { CheckCircle } from "lucide-react";

interface TagLabelProps {
  label: string;
  icon?: React.ReactNode;
  color?: "blue" | "green" | "red" | "gray" | "orange";
  className?: string;
}

export const TagLabel: React.FC<TagLabelProps> = ({
  label,
  icon = <CheckCircle className="mr-1.5 h-[14px] w-[14px]" />,
  color = "blue",
  className,
}) => {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-700",
    orange: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-1.5 py-1 pt-1.5 rounded-full shrink-0 align-middle",
        colorMap[color],
        className
      )}
    >
      {icon}
      {label}
    </span>
  );
};
