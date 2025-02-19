// components/WorkingTimeSummary.tsx
import React from 'react';

interface WorkingTimeSummaryProps {
  time: any;
}
export default function WorkingTimeSummary({ time }: WorkingTimeSummaryProps) {
  const [formData] = React.useState<any>(time);



  return (
    <div>
      <div className="grid grid-cols-2 py-2">
        <div>
          <h3 className="text-lg font-bold">เวลาทำงานรวมทั้งหมด :</h3>
          <p className="text-xs text-gray-600">เวลาทำงานรวมทั้งหมด</p>
        </div>
        <span className="text-2xl flex justify-end">
          {formData?.workHours?.total} ชั่วโมง
        </span>
      </div>
      <div className="h-[2px] bg-gray-800 my-8"></div>
      <div className="grid grid-cols-2 py-2">
        <div>
          <h3 className="text-lg font-bold">เวลาทำงานวันนี้ :</h3>
          <p className="text-xs text-gray-600">เวลาทำงานวันนี้</p>
        </div>
        <span className="text-2xl flex justify-end">
          {formData?.workHours?.today} ชั่วโมง
        </span>
      </div>
    </div>
  );
}
