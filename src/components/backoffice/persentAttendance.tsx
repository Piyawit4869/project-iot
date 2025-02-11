// components/EnhancedAttendanceRateChart.tsx
import React from 'react';

interface MonthlyRate {
  month: string;
  rate: number;
}

interface EnhancedAttendanceRateChartProps {
  yearRate: number;
  monthlyRates: MonthlyRate[];
}

const EnhancedAttendanceRateChart: React.FC<
  EnhancedAttendanceRateChartProps
> = ({ yearRate, monthlyRates }) => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance Rate</h1>
          <p className="text-sm text-gray-500">This Year</p>
        </div>
        <span className="text-4xl font-bold text-gray-800">{yearRate}%</span>
      </div>
      <div className="h-[2px] bg-gray-800 mb-10"></div>

      <div className="relative flex items-center justify-between mb-10">
        <span className="absolute top-1/2 left-0 right-0 h-[3px] bg-black" />

        {/* Monthly Cards with Nodes */}
        {monthlyRates.map((rate, index) => (
          <div
            key={index}
            className="relative z-10 flex flex-col items-center space-y-2"
          >
            {/* Node on Timeline */}
            <div className="w-6 h-6 bg-white border-4 border-black rounded-full"></div>
            {/* Card */}
            <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <p className="text-sm font-medium text-gray-700">
                {rate.month}
                <span className="text-lg font-bold text-gray-900 m-1">
                  {rate.rate}%
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedAttendanceRateChart;
