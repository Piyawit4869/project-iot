import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Card } from '@/components/ui/card';

interface WeeklyData {
  department: string;
  attendance: number;
}

const weeklyData: WeeklyData[] = [
  { department: 'Marketing', attendance: 40 },
  { department: 'Front-End', attendance: 65 },
  { department: 'HR', attendance: 86 },
  { department: 'Back-End', attendance: 70 },
  { department: 'Mobile', attendance: 50 },
];

const WeeklyAttendanceChart: React.FC = () => {
  return (
    <Card>
      <div className="px-6 pb-4">
        <p className="font-semibold text-start mt-8 mb-6 lg:text-sm md:text-sm max-sm:text-sm">
          การเข้าทำงานของแต่ละแผนก
        </p>
        <div>
          <h5 className="lg:text-sm md:text-sm max-sm:text-xs pl-6">
            ค่าเฉลี่ยการเข้างาน
          </h5>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={weeklyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid stroke="#eeeeee" strokeDasharray="9 0" />
            <XAxis dataKey="department" tick={{ fontSize: 12 }} />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              className="lg:text-sm md:text-sm max-sm:text-xs"
            />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="attendance" fill="#00a57c" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default WeeklyAttendanceChart;
