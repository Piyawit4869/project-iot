import CardComponent from '@/components/common/card';
import { Skeleton } from '@nextui-org/react';
import React from 'react';

export default function SkeletonUser() {
  return (
    <div className="flex space-x-4 mt-6">
      <div className="flex-1">
        <CardComponent
          customCard
          custom={
            // <div className="max-w-[300px] w-full flex items-center gap-3 p-8">
            //   <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            //     <div className="font-bold text-headFon mt-10 w-[100px] h-[100px]">
            //       <Skeleton className="rounded-md w-100 h-100" />
            //     </div>
            //   </div>
            //   <div className="flex gap-4 mt-6">
            //     <div className="w-full flex">
            //       <Skeleton className="h-3 w-200 rounded-lg" />
            //     </div>
            //   </div>

            //   <div className="w-full flex gap-4 mt-6 ">
            //     <Skeleton />
            //   </div>
            //   <div className="w-full flex gap-4 mt-6 ">
            //     <Skeleton />
            //   </div>
            // </div>

            <div className="w-full items-center gap-3 p-8">
              <div>
                <h1 className="text-2xl font-bold">ข้อมูลผู้ใช้</h1>
              </div>
              <div className="mt-10">
                <p>รูปภาพผู้ใช้งาน</p>
                <Skeleton className="flex rounded-md w-[100px] h-[100px] mt-4" />
              </div>
              <div className="flex gap-4">
                <div className="w-full flex flex-col gap-2 mt-10">
                  <Skeleton className="h-5 w-full rounded-md" />
                </div>
                <div className="w-full flex flex-col gap-2 mt-10">
                  <Skeleton className="h-5 w-full rounded-md" />
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
