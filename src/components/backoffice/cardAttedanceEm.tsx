import React from 'react';
import * as Icons from 'lucide-react';
import CardComponent from '../common/card';

interface UserProps {
  id: number;
  name: string;
  status:
    | 'totalClockedIn'
    | 'totalLateIn'
    | 'totalNotClockedIn'
    | 'totalClockedOut'
    | 'totalonLeave';
}

interface EmAttendanceCardProps {
  users?: UserProps[];
}

const EmAttendanceCard: React.FC<EmAttendanceCardProps> = ({ users = [] }) => {
  const validUsers = Array.isArray(users) ? users : [];
  const totalEmployees = validUsers.length;

  const attendanceStats = React.useMemo(() => {
    const counts: Record<
      | 'totalClockedIn'
      | 'totalLateIn'
      | 'totalNotClockedIn'
      | 'totalClockedOut'
      | 'totalonLeave',
      number
    > = {
      totalClockedIn: 0,
      totalLateIn: 0,
      totalNotClockedIn: 0,
      totalClockedOut: 0,
      totalonLeave: 0,
    };

    validUsers.forEach((user) => {
      counts[user.status]++;
    });

    return {
      checkedInCount: counts.totalClockedIn,
      lateCount: counts.totalLateIn,
      onLeaveCount: counts.totalonLeave,
      checkedOutCount: counts.totalClockedOut,
      notCheckedInCount: counts.totalNotClockedIn,
    };
  }, [validUsers, totalEmployees]);

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
          attendanceStats.checkedInCount,
          'bg-white text-green-500',
          <Icons.UserRoundCheck />,
        )}
        {renderCard(
          'ยังไม่เข้างาน',
          attendanceStats.notCheckedInCount,
          'bg-white text-gray-500',
          <Icons.UserRoundMinus />,
        )}
      </div>
      <div className="flex space-x-8 mt-8">
        {renderCard(
          'เข้างานสาย',
          attendanceStats.lateCount,
          'bg-white text-orange-500',
          <Icons.ClockAlert />,
        )}
        {renderCard(
          'ลางาน',
          attendanceStats.onLeaveCount,
          'bg-white text-yellow-500',
          <Icons.Moon />,
        )}
        {renderCard(
          'เลิกงานแล้ว',
          attendanceStats.checkedOutCount,
          'bg-white text-red-500',
          <Icons.LogOut />,
        )}
      </div>
    </div>
  );
};

export default EmAttendanceCard;
