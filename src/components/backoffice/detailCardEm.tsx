import React from 'react';
import Image from 'next/image';
//component
import CardComponent from '../common/card';
// icon
import * as Icons from 'lucide-react';

interface UserDashboardCardProps {
  userData: {
    prefix?: String;
    statistics: {
      totalWorkDays?: Number;
      lateArrivals?: Number;
      leaveEarly?: Number;
      absenteeism?: Number;
    };
    dailyStreak: {
      dailyStreak?: any;
    };
    user: {
      userName?: String;
      emId?: String;
      email?: String;
      role?: any;
    };
  };
}

const renderCard = (
  Icon: React.ReactNode,
  count: number,
  title: string,
  colorClass: string,
) => (
  <div className="flex-1">
    <CardComponent
      className={colorClass}
      customCard
      custom={
        <div className="p-4 bg-white grid grid-cols-3 flex justify-between">
          <div className="flex items-start justify-start">
            <div className="bg-gray-100 p-3 rounded-full">{Icon}</div>
          </div>
          <div className="col-span-2">
            <div className="text-xl font-extrabold text-gray-900">
              {count} วัน
            </div>
            <div className="text-xs font-bold text-gray-600 mt-2">{title}</div>
          </div>
        </div>
      }
    />
  </div>
);

const UserDashboardCard: React.FC<UserDashboardCardProps> = ({ userData }) => {
  return (
    <div className="bg-white rounded-xl shadow p-8 mt-8">
      <div className="flex items-center space-x-8 gap-4 mb-8">
        <div>
          <Image
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xls"
            src="/logo.png"
            alt="image user"
            width={100}
            height={100}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {userData?.user?.userName || 'N/A'}
          </h1>
          <div className="grid grid-cols-8 gap-6">
            <p>
              EmId : <span>{userData?.user?.emId || 'N/A'}</span>
            </p>
            <p className="col-span-2">
              <span>Email : {userData?.user?.email || 'N/A'}</span>
            </p>
            <p>
              <span>Role : {userData?.user?.role || 'N/A'}</span>
            </p>
            <p className="col-span-2">
              <span>Work Information : {userData?.prefix || 'N/A'}</span>
            </p>
            <p>
              <span>Streak : {userData?.dailyStreak?.dailyStreak || 0}</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderCard(
            <Icons.UsersRound />,
            31,
            'เข้างานทั้งหมด',
            'bg-white text-blue-500',
          )}
          {renderCard(
            <Icons.UsersRound />,
            1,
            'เข้างานสายทั้งหมด',
            'bg-white text-blue-500',
          )}
          {renderCard(
            <Icons.UsersRound />,
            2,
            'ออกก่อนเวลาทั้งหมด',
            'bg-white text-blue-500',
          )}
          {renderCard(
            <Icons.UsersRound />,
            3,
            'ขาดทั้งหมด',
            'bg-white text-blue-500',
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardCard;
