import React from 'react';
import * as Icons from 'lucide-react';
import CardComponent from '../common/card';

interface EmAttendanceCardProps {
  users: any[];
}

const EmAttendanceCard: React.FC<EmAttendanceCardProps> = ({ users }) => {
  const totalEmployees = users.length || 10;
  const checkedInCount =
    users.filter((user) => user.status === 'active').length || 4;
  const lateCount = users.filter((user) => user.status === 'late').length || 2;
  const onLeaveCount =
    users.filter((user) => user.status === 'on_leave').length || 2;
  const checkedOutCount =
    users.filter((user) => user.status === 'checked_out').length || 1;
  const notCheckedInCount =
    totalEmployees -
    checkedInCount -
    lateCount -
    onLeaveCount -
    checkedOutCount;

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
    <div>
      <div className="flex space-x-8 mt-8">
        {renderCard(
          'พนักงานทั้งหมด',
          totalEmployees,
          'bg-white text-blue-500',
          <Icons.UsersRound />,
        )}
        {renderCard(
          'เข้างานแล้ว',
          checkedInCount,
          'bg-white text-accent1',
          <Icons.UserRoundCheck />,
        )}
        {renderCard(
          'ยังไม่เข้างาน',
          notCheckedInCount,
          'bg-white text-red-500',
          <Icons.UserRoundMinus />,
        )}
      </div>
      <div className="flex space-x-8 mt-8">
        {renderCard(
          'เข้างานสาย',
          lateCount,
          'bg-white text-orange-500',
          <Icons.ClockAlert />,
        )}
        {renderCard(
          'ลาป่วย/ลากิจ',
          onLeaveCount,
          'bg-white text-accent3',
          <Icons.Moon />,
        )}
        {renderCard(
          'เลิกงานแล้ว',
          checkedOutCount,
          'bg-white text-red-500',
          <Icons.LogOut />,
        )}
      </div>
    </div>
  );
};

export default EmAttendanceCard;
