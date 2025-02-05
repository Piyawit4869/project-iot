import React from 'react';
import {
  getEmployeeSummary,
  EmployeeSummary,
} from '@/pages/api/services/apiService';
import * as Icons from 'lucide-react';

const EmployeeWidget: React.FC = () => {
  const [summary, setSummary] = React.useState<EmployeeSummary | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getEmployeeSummary();
        setSummary(data);
      } catch (error) {
        console.error('Failed to fetch employee summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return;
  }

  if (!summary) {
    return <div>Error loading employee data</div>;
  }

  const renderCard = (
    title: string,
    value: number,
    styleClass: string,
    icon: React.ReactNode,
  ) => (
    <div className={`p-4 rounded-lg shadow-md ${styleClass}`}>
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex space-x-5">
        {renderCard(
          'พนักงานทั้งหมด',
          summary.totalEmployees,
          'bg-white text-blue-500',
          <Icons.UsersRound />,
        )}
        {renderCard(
          'เข้างานแล้ว',
          summary.checkedIn,
          'bg-white text-accent1',
          <Icons.UserRoundCheck />,
        )}
        {renderCard(
          'ยังไม่เข้างาน',
          summary.notCheckedIn,
          'bg-white text-red-500',
          <Icons.UserRoundMinus />,
        )}
      </div>
      <div className="flex space-x-4">
        {renderCard(
          'เข้างานสาย',
          summary.lateCheckIn,
          'bg-white text-orange-500',
          <Icons.ClockAlert />,
        )}
        {renderCard(
          'ลาป่วย/ลากิจ',
          summary.onLeave,
          'bg-white text-accent3',
          <Icons.Moon />,
        )}
        {renderCard(
          'เลิกงานแล้ว',
          summary.checkedOut,
          'bg-white text-red-500',
          <Icons.LogOut />,
        )}
      </div>
    </div>
  );
};

export default EmployeeWidget;
