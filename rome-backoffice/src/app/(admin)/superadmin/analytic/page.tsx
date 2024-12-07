'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function IndexPage() {
  // Mockup data for analytics
  const [data] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Users Gained',
        data: [500, 1000, 750, 1250, 1500, 2000],
        backgroundColor: '#3b82f6', // Tailwind's blue-600
      },
      {
        label: 'Revenue ($)',
        data: [2000, 3000, 4000, 5000, 6000, 7000],
        backgroundColor: '#10b981', // Tailwind's green-500
      },
    ],
  });

  const tableData = [
    { id: 1, metric: 'Total Users', value: 5000 },
    { id: 2, metric: 'Monthly Revenue', value: '$25,000' },
    { id: 3, metric: 'New Signups', value: 300 },
    { id: 4, metric: 'Bounce Rate', value: '20%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Analytics Dashboard
        </h1>

        {/* Chart Section */}
        <div className="bg-white shadow-md rounded-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            User Growth and Revenue
          </h2>
          <div className="h-80">
            <Bar
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Key Metrics
          </h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border text-gray-700">
                    {row.metric}
                  </td>
                  <td className="px-6 py-4 border text-gray-700">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
