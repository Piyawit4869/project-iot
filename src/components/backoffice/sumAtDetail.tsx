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
    <div className="w-full">
      <CardComponent
        className={colorClass}
        customCard
        custom={
          <div className="grid lg:grid-cols-1 md:grid-cols-1 max-sm:grid-cols-1">
            <div className="p-4 bg-white flex lg:items-center justify-start md:items-center justify-center max-sm:items-center justify-center">
              <div>
                <div className="mt-2 lg:text-4xl md:text-4xl max-sm:text-2xl font-extrabold text-gray-900  flex lg:items-center justify-start md:items-center justify-center max-sm:items-center justify-center ">
                  {count}
                </div>
                <div className="mt-2 lg:text-sm md:text-sm max-sm:text-xs font-extrabold text-gray-600">
                  {title}
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );

  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 max-sm:grid-cols-2 lg:gap-8 md:gap-6 max-sm:gap-4">
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
