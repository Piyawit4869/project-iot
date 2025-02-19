import { Skeleton } from '@nextui-org/react';
import React from 'react';

const SkeletonTimeline = () => {
  return (
    <div className="py-4 px-6">
      <h2 className="text-lg font-semibold mb-4">กิจกรรม</h2>
      <div className="flex">
        <Skeleton className="rounded-full w-4 h-4" />
        <div className="w-full flex flex-col mt-1 ml-2">
          <Skeleton className="rounded-md w-1/5 h-5" />
          <Skeleton className="mt-2 rounded-md w-3/5 h-5" />
        </div>
      </div>

      <div className="flex mt-5">
        <Skeleton className="rounded-full w-4 h-4" />
        <div className="w-full flex flex-col mt-1 ml-2">
          <Skeleton className="rounded-md w-1/5 h-5" />
          <Skeleton className="mt-2 rounded-md w-3/5 h-5" />
        </div>
      </div>

      <div className="flex mt-5">
        <Skeleton className="rounded-full w-4 h-4" />
        <div className="w-full flex flex-col mt-1 ml-2">
          <Skeleton className="rounded-md w-1/5 h-5" />
          <Skeleton className="mt-2 rounded-md w-3/5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonTimeline;
