import React from 'react';
import Image from 'next/image';
// Component
import CardComponent from '../common/card';
// Icon
import * as Icons from 'lucide-react';

interface UserDashboardCardProps {
  data: any;
}

export default function UserDashboardCard({ data }: UserDashboardCardProps) {
  const [formData, setFormData] = React.useState<any>(data);

  React.useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  console.log('formData', formData);

  const renderCard = (
    title: string,
    count: number,
    colorClass: string,
    Icon: React.ReactNode,
  ) => (
    <div className="flex-1">
      <CardComponent
        className={colorClass}
        customCard
        custom={
          <div className="p-4 bg-white grid grid-cols-3 flex justify-between">
            <div className="col-span-2">
              <div className="text-4xl font-extrabold text-gray-900">
                {count}
              </div>
              <div className="text-sm font-extrabold text-gray-600 mt-2">
                {title}
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="bg-gray-100 p-3 rounded-full">{Icon}</div>
            </div>
          </div>
        }
      />
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow p-8 mt-8">
      {/* Header Section */}
      <div className="flex items-center space-x-8 gap-8 mb-8">
        <div className="rounded-full">
          <Image
            className="rounded-xl"
            src={
              formData?.dailyStreak?.user?.profile?.photoUrl ||
              '/images/default-profile.png'
            }
            alt="User profile photo"
            width={100}
            height={100}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {formData?.dailyStreak?.user?.userName || '-'}
          </h1>
          <div className="grid grid-cols-10 gap-8">
            <p className="col-span-2">
              รหัสพนักงาน:{' '}
              <span>{formData?.dailyStreak?.user?.emId || '-'}</span>
            </p>
            <p className="col-span-2">
              <span>อีเมล: {formData?.dailyStreak?.user?.email || '-'}</span>
            </p>
            <p className="col-span-2">
              <span>
                ตำแหน่ง:
                {formData?.dailyStreak?.user?.employeeRole?.name || '-'}
              </span>
            </p>
            <p className="col-span-2">
              <span>ข้อมูลการทำงาน: {formData?.prefix || '-'}</span>
            </p>
            <p className="col-span-2">
              <span>
                ทำงานต่อเนื่อง: {formData?.dailyStreak?.dailyStreak || 0} วัน
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Card Statistics */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {renderCard(
            'เข้างานทั้งหมด',
            formData?.statistics?.totalWorkDays,
            'bg-white text-blue-500',
            <Icons.UserRoundCheck />,
          )}
          {renderCard(
            'เข้างานสายทั้งหมด',
            formData?.statistics?.lateArrivals,
            'bg-white text-orange-500',
            <Icons.ClockAlert />,
          )}
          {renderCard(
            'ออกก่อนเวลาทั้งหมด',
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
