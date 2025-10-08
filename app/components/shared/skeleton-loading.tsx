import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "~/lib/utils";

interface SkeletonLoadingProps {
  width?: string;
  height?: string;
  shape?: "rounded" | "line";
  className?: string;
}

export const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({
  width = "w-full",
  height = "h-4",
  shape = "line",
  className,
}) => {
  return (
    <Skeleton
      className={cn(
        width,
        height,
        shape === "rounded" ? "rounded-full" : "rounded-md",
        "bg-gray-200 dark:bg-gray-700 transition-colors duration-300",
        className
      )}
    />
  );
};
