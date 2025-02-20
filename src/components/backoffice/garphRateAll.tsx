import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ChartData {
  date: string;
  percentage: number;
}

const dataDaily: ChartData[] = [
  { date: '01 กพ', percentage: 81 },
  { date: '02 กพ', percentage: 96 },
  { date: '03 กพ', percentage: 81 },
  { date: '04 กพ', percentage: 50 },
  { date: '05 กพ', percentage: 75 },
  { date: '06 กพ', percentage: 67 },
  { date: '07 กพ', percentage: 81 },
  { date: '08 กพ', percentage: 68 },
  { date: '09 กพ', percentage: 77 },
  { date: '10 กพ', percentage: 85 },
  { date: '11 กพ', percentage: 53 },
  { date: '12 กพ', percentage: 95 },
  { date: '13 กพ', percentage: 87 },
  { date: '14 กพ', percentage: 73 },
  { date: '15 กพ', percentage: 63 },
  { date: '16 กพ', percentage: 74 },
  { date: '17 กพ', percentage: 84 },
  { date: '18 กพ', percentage: 66 },
  { date: '19 กพ', percentage: 85 },
  { date: '20 กพ', percentage: 83 },
  { date: '21 กพ', percentage: 66 },
  { date: '22 กพ', percentage: 57 },
  { date: '23 กพ', percentage: 82 },
  { date: '24 กพ', percentage: 84 },
  { date: '25 กพ', percentage: 83 },
  { date: '26 กพ', percentage: 66 },
  { date: '27 กพ', percentage: 71 },
  { date: '28 กพ', percentage: 97 },
  { date: '29 กพ', percentage: 82 },
];

// Function to group data by week
const groupDataByWeek = (data: ChartData[]) => {
  const grouped: ChartData[] = [];
  for (let i = 0; i < data.length; i += 7) {
    const weekData = data.slice(i, i + 7);
    const average = Math.round(
      weekData.reduce((sum, item) => sum + item.percentage, 0) /
        weekData.length,
    );
    grouped.push({
      date: `สัปดาห์ที่ ${Math.floor(i / 7) + 1}`,
      percentage: average,
    });
  }
  return grouped;
};

// Function to group data by month (if applicable)
const groupDataByMonth = (data: ChartData[]) => {
  return [
    {
      date: 'กุมภาพันธ์',
      percentage: Math.round(
        data.reduce((sum, item) => sum + item.percentage, 0) / data.length,
      ),
    },
  ];
};

const ChartComponent: React.FC = () => {
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const getData = () => {
    switch (view) {
      case 'weekly':
        return groupDataByWeek(dataDaily);
      case 'monthly':
        return groupDataByMonth(dataDaily);
      default:
        return dataDaily;
    }
  };

  return (
    <Card>
      <div className="px-6 pb-4">
        <div className="grid grid-cols-6 gap-4">
          <div className="lg:col-span-3 md:col-span-3 max-sm:col-span-4  mt-8">
            <span className="text-xl font-semibold text-center mb-4 xl:text-lg lg:text-sm md:text-sm max-sm:text-sm">
              กราฟแสดงสถิติการเข้าร่วมงาน
            </span>
          </div>
          <div className="lg:col-span-3 md:col-span-3 max-sm:col-span-2 mt-8">
            <div className="flex justify-end px-2 mb-4 ">
              <div className="grid lg:grid-cols-3 md:grid-cols-3 max-sm:grid-cols-3  gap-4">
                <Button
                  className="text-#4f46e5 max-sm:col-span-3"
                  size={'sm'}
                  variant={view === 'daily' ? 'default' : 'outline'}
                  onClick={() => setView('daily')}
                >
                  รายวัน
                </Button>
                <Button
                  className="text-#4f46e5 max-sm:col-span-3"
                  size={'sm'}
                  variant={view === 'weekly' ? 'default' : 'outline'}
                  onClick={() => setView('weekly')}
                >
                  รายสัปดาห์
                </Button>
                <Button
                  className="text-#4f46e5 max-sm:col-span-3"
                  size={'sm'}
                  variant={view === 'monthly' ? 'default' : 'outline'}
                  onClick={() => setView('monthly')}
                >
                  รายเดือน
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h5 className="lg:text-sm md:text-sm max-sm:text-xs pl-6">
              ค่าเฉลี่ยการเข้างาน
            </h5>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={getData()}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid stroke="#eeeeee" strokeDasharray="9 0" />
              <XAxis dataKey="date" className="text-sm" />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                className="text-sm"
              />
              <Tooltip formatter={(value) => `${value}%`} />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default ChartComponent;
