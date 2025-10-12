import React from "react";

interface CustomerInfoSkeletonProps {
  noteLine?: number;
}

export const CustomerInfoSkeleton: React.FC<CustomerInfoSkeletonProps> = (
  props
) => {
  const { noteLine = 3 } = props;

  return (
    <div className="flex flex-col w-full h-[calc(100vh-50px)] border-l border-r overflow-auto bg-white dark:bg-background justify-between">
      <React.Fragment>
        <div className="flex flex-col h-full gap-4 px-4 mt-5">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse" />

            <div className="flex flex-col gap-2">
              <div className="w-32 h-6 bg-gray-300 rounded animate-pulse" />

              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>

          <div className="items-center gap-4 mb-3">
            <div className="w-32 h-6 bg-gray-300 rounded animate-pulse mb-4" />
            <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse" />
          </div>

          <div className="items-center gap-4 mb-3">
            <div className="w-32 h-6 bg-gray-300 rounded animate-pulse mb-4" />
            <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse" />
          </div>

          <div className="flex gap-6 mb-0">
            <div className="w-24 h-8 bg-gray-300 rounded-xl animate-pulse" />

            <div className="w-24 h-8 bg-gray-300 rounded-xl animate-pulse" />

            <div className="w-24 h-8 bg-gray-300 rounded-xl animate-pulse" />
          </div>

          <div className="flex items-center gap-3 justify-between mb-1">
            <div className="w-40 h-4 bg-gray-300 rounded animate-pulse" />{" "}
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />{" "}
          </div>

          {Array.from({ length: noteLine }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 mb-2">
              <div className="h-20 bg-gray-300 rounded animate-pulse" />{" "}
            </div>
          ))}
        </div>
      </React.Fragment>
    </div>
  );
};
