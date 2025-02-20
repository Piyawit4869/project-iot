// components/WorkingTimeSummary.tsx
import React from 'react';

interface WorkingTimeSummaryProps {
  time: any;
}

export default function WorkingTimeSummary({ time }: WorkingTimeSummaryProps) {
  const [formData] = React.useState<any>(time);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 max-sm:grid-cols-2 items-center py-2 gap-2 md:gap-6 max-sm:gap-4">
        <div>
          <h3 className="text-base lg:text-xl md:text-lg max-sm:text-sm font-bold">
            รวมเวลาการทำงานทั้งหมด :
          </h3>
          <p className="text-xs text-gray-500">เวลาทำงานรวมทั้งหมด</p>
        </div>
        <span className="text-3xl lg:text-3xl md:text-2xl max-sm:text-2xl text-center md:text-right max-sm:text-right">
          {formData?.workHours?.total || 0} ชั่วโมง
        </span>
      </div>

      <div className="h-[2px] bg-gray-200 my-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 max-sm:grid-cols-2 items-center py-2 gap-2 md:gap-6 max-sm:gap-4">
        <div>
          <h3 className="text-base lg:text-xl md:text-lg max-sm:text-sm font-bold">
            รวมเวลาทำงานวันนี้ :
          </h3>
          <p className="text-xs text-gray-500">เวลาทำงานวันนี้</p>
        </div>
        <span className="text-3xl lg:text-3xl md:text-2xl max-sm:text-2xl text-center md:text-right max-sm:text-right">
          {formData?.workHours?.today || 0} ชั่วโมง
        </span>
      </div>
    </div>
  );
}
