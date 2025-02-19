// components/AttendanceSummaryCard.tsx
import React from 'react';
import CardComponent from '../common/card';
// Icon
// import * as Icons from 'lucide-react';

interface AttendanceSummaryCardProps {
  detail: any;
}

export default function AttendanceSummaryCard({
  detail,
}: AttendanceSummaryCardProps) {
  const [formData] = React.useState<any>(detail);

  const renderCard = (title: string, count: number, colorClass: string) => (
    <div className="flex-1">
      <CardComponent
        className={colorClass}
        customCard
        custom={
          <div className="p-4 bg-white grid grid-cols-2 flex justify-between">
            <div className="col-span-2">
              <div className="text-4xl font-extrabold text-center text-gray-900">
                {count}
              </div>
              <div className="text-xs font-extrabold text-center text-gray-600 mt-2">
                {title}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {renderCard(
          'เข้างาน',
          formData?.statistics?.totalWorkDays,
          'bg-white text-blue-500',
        )}
        {renderCard(
          'สาย',
          formData?.statistics?.lateArrivals,
          'bg-white text-orange-500',
        )}
        {renderCard(
          'ลา',
          formData?.statistics?.leaveEarly,
          'bg-white text-yellow-500',
        )}
        {renderCard(
          'ขาด',
          formData?.statistics?.absenteeism,
          'bg-white text-red-500',
        )}
      </div>
    </div>
  );
}
