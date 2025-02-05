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
import { Card, CardContent } from '@/components/ui/card';

interface ChartData {
  date: string;
  percentage: number;
}

const dataDaily: ChartData[] = [
  { date: '01 สค', percentage: 60 },
  { date: '02 สค', percentage: 70 },
  { date: '03 สค', percentage: 65 },
  { date: '04 สค', percentage: 85 },
  { date: '07 สค', percentage: 91 },
  { date: '09 สค', percentage: 75 },
  { date: '11 สค', percentage: 80 },
  { date: '14 สค', percentage: 72 },
  { date: '16 สค', percentage: 68 },
];

const ChartComponent: React.FC = () => {
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Simulated data views (extend as needed)
  const getData = () => {
    switch (view) {
      case 'weekly':
        return dataDaily.slice(0, 5); // Example subset
      case 'monthly':
        return dataDaily; // Example full data for monthly
      default:
        return dataDaily;
    }
  };

  return (
    <Card className="p-4">
      <CardContent>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-3 mt-8">
            <span className="text-xl font-semibold text-center mb-4">
              กราฟแสดงอัตราการเข้าร่วมงาน
            </span>
          </div>
          <div className="col-span-3 mt-8">
            <div className="flex justify-center space-x-2 mb-4">
              <Button
                className="text-#4f46e5"
                variant={view === 'daily' ? 'default' : 'outline'}
                onClick={() => setView('daily')}
              >
                รายวัน
              </Button>
              <Button
                className="text-#4f46e5"
                variant={view === 'weekly' ? 'default' : 'outline'}
                onClick={() => setView('weekly')}
              >
                รายสัปดาห์
              </Button>
              <Button
                className="text-#4f46e5"
                variant={view === 'monthly' ? 'default' : 'outline'}
                onClick={() => setView('monthly')}
              >
                รายเดือน
              </Button>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={getData()}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#00a57c"
              strokeWidth={3}
              dot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
