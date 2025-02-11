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
import { Card, CardContent } from '@/components/ui/card';

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
      <CardContent>
        <p className="text-xl font-semibold text-start mt-8 mb-6 ">
          การเข้าทำงานรายสัปดาห์ของแต่ละแผนก
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={weeklyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
            <XAxis dataKey="department" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="attendance" fill="#00a57c" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyAttendanceChart;
