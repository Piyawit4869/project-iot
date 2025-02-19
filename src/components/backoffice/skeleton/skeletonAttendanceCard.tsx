import CardComponent from '@/components/common/card';
import { Skeleton } from '@nextui-org/react';
import React from 'react';

const renderCard = () => (
  <Skeleton className="rounded-2xl">
    <div className="flex-1">
      <CardComponent
        className=""
        customCard
        custom={
          <div className="w-[300px] h-[100px] p-4 bg-white grid grid-cols-3 flex justify-between">
            <div className="col-span-2 rounded-md">
              <div className="text-4xl rounded-md font-extrabold text-gray-900"></div>
              <div className="text-sm rounded-md font-extrabold text-gray-600 mt-2 "></div>
            </div>
            <div className="flex rounded-md items-start justify-end"></div>
          </div>
        }
      />
    </div>
  </Skeleton>
);

const SkeletonAttendanceCard = () => {
  return (
    // <Skeleton>
    <div className=" xl:size-lg xl:text-lg lg:size-sm lg:text-sm  md:size-xs md:text-xs sm:size-xs sm:text-xs ">
      <div className="flex mt-8 space-x-8">
        {renderCard()}
        {renderCard()}
        {renderCard()}
      </div>
      <div className="flex mt-8 space-x-8">
        {renderCard()}
        {renderCard()}
        {renderCard()}
      </div>
    </div>
    // </Skeleton>
  );
};

export default SkeletonAttendanceCard;
