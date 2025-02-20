import React from 'react';
import Image from 'next/image';
// Component
import CardComponent from '../common/card';
// Icon
import * as Icons from 'lucide-react';

interface UserDashboardCardProps {
  detail: any;
}

export default function UserDashboardCard({ detail }: UserDashboardCardProps) {
  const [formData] = React.useState<any>(detail);

  const renderCard = (
    title: string,
    count: number,
    colorClass: string,
    Icon: React.ReactNode,
  ) => (
    <div className="w-full">
      <CardComponent
        className={colorClass}
        customCard
        custom={
          <div className="grid lg:grid-cols-3 md:grid-cols-3 max-sm:grid-cols-3">
            <div className="p-4 bg-white flex lg:items-center justify-start md:items-center justify-center max-sm:items-center justify-center lg:col-span-2 md:col-span-2 max-sm:col-span-2">
              <div>
                <div className="mt-2 lg:text-4xl md:text-4xl max-sm:text-2xl font-extrabold text-gray-900  flex lg:items-center justify-start md:items-center justify-center max-sm:items-center justify-center ">
                  {count}
                </div>
                <div className="mt-2 lg:text-sm md:text-sm max-sm:text-xs font-extrabold text-gray-600">
                  {title}
                </div>
              </div>
            </div>
            <div className="p-4 flex lg:items-center justify-end md:items-center justify-center max-sm:items-center justify-center">
              <div className=" bg-gray-100 p-3 rounded-full">{Icon}</div>
            </div>
          </div>
        }
      />
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow p-6 sm:p-8 mt-6 sm:mt-8">
      {/* User Information */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="flex justify-center sm:block">
          <Image
            className="rounded-xl w-50 h-50 "
            src={
              formData?.dailyStreak?.user?.profile?.photoUrl ||
              '/images/default-profile.png'
            }
            alt="User profile photo"
            width={150}
            height={150}
          />
        </div>
        <div className="w-full">
          <h1 className="text-lg max-sm:text-lg md:text-2xl font-bold mb-2">
            <strong>ชื่อ: </strong>
            <span className="text-accent1">
              {formData?.dailyStreak?.user?.userName || '-'}
            </span>
          </h1>
          <div className="grid max-sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-2 gap-4 text-sm md:text-sm max-sm:text-xs  mb-4">
            <p>
              <strong>รหัสพนักงาน: </strong>
              <span className="text-accent1">
                {formData?.dailyStreak?.user?.emId || '-'}
              </span>
            </p>
            <p>
              <strong>อีเมล: </strong>
              <span className="text-accent1">
                {formData?.dailyStreak?.user?.email || '-'}
              </span>
            </p>
            <p>
              <strong>ตำแหน่ง: </strong>
              <span className="text-accent1">
                {formData?.dailyStreak?.user?.employeeRole?.name || '-'}
              </span>
            </p>
            <p>
              <strong>ข้อมูลการทำงาน: </strong>
              <span className="text-accent1">{formData?.prefix || '-'}</span>
            </p>
            <p>
              <strong>ทำงานต่อเนื่อง: </strong>
              <span className="text-accent1">
                {formData?.dailyStreak?.dailyStreak || 0}
              </span>
              วัน
            </p>
          </div>
        </div>
      </div>

      {/* Card Statistics */}
      <div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 max-sm:grid-cols-2 lg:gap-8 md:gap-6 max-sm:gap-4">
          {renderCard(
            'เข้าทั้งหมด',
            formData?.statistics?.totalWorkDays,
            'bg-white text-blue-500',
            <Icons.UserRoundCheck />,
          )}
          {renderCard(
            'สายทั้งหมด',
            formData?.statistics?.lateArrivals,
            'bg-white text-orange-500',
            <Icons.ClockAlert />,
          )}
          {renderCard(
            'ลาทั้งหมด',
            formData?.statistics?.leaveEarly,
            'bg-white text-yellow-500',
            <Icons.LogOut />,
          )}
          {renderCard(
            'ขาดทั้งหมด',
            formData?.statistics?.absenteeism,
            'bg-white text-red-500',
            <Icons.UserRoundX />,
          )}
        </div>
      </div>
    </div>
  );
}
