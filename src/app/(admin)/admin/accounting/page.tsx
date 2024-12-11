'use client';

import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { TopSection } from '@/components/common/topSection';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
);

// Mock Thai Data
const barData = {
  labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม'],
  datasets: [
    {
      label: 'รายรับ (บาท)',
      data: [50000, 45000, 48000, 55000, 52000],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const lineData = {
  labels: ['สัปดาห์ที่ 1', 'สัปดาห์ที่ 2', 'สัปดาห์ที่ 3', 'สัปดาห์ที่ 4'],
  datasets: [
    {
      label: 'รายจ่าย (บาท)',
      data: [20000, 25000, 22000, 24000],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4,
    },
  ],
};

const pieData = {
  labels: ['ค่าเช่า', 'ค่าน้ำ-ค่าไฟ', 'ค่าอาหาร', 'ค่าเดินทาง'],
  datasets: [
    {
      label: 'หมวดหมู่ค่าใช้จ่าย',
      data: [15000, 5000, 12000, 3000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ],
      borderColor: 'rgba(255, 255, 255, 1)',
      borderWidth: 1,
    },
  ],
};

export default function AccountSummaryPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <TopSection title={'สรุปผลการเงิน'} />

        {/* First row with 16:8 layout */}
        <div className="flex space-x-4 mt-8">
          <div className="flex-1 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">รายรับรายเดือน</h3>
            <Bar data={barData} options={{ responsive: true }} />
          </div>

          <div className="flex-2 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">รายจ่ายรายสัปดาห์</h3>
            <Line data={lineData} options={{ responsive: true }} />

            <h3 className="text-lg font-semibold mb-4 mt-6">ข้อมูลรายรับ</h3>
            <Bar
              data={{
                labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม'],
                datasets: [
                  {
                    label: 'รายรับรวม (บาท)',
                    data: [100000, 90000, 110000],
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          </div>
        </div>

        {/* Second row with 8:8:8 layout */}
        <div className="flex space-x-4 mt-8">
          <div className="flex-1 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">หมวดหมู่ค่าใช้จ่าย</h3>
            <Pie data={pieData} options={{ responsive: true }} />
          </div>
          <div className="flex-1 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">แนวโน้มรายจ่าย</h3>
            <Line
              data={{
                labels: ['เดือนที่ 1', 'เดือนที่ 2', 'เดือนที่ 3'],
                datasets: [
                  {
                    label: 'ค่าใช้จ่ายรายเดือน (บาท)',
                    data: [45000, 47000, 46000],
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    tension: 0.4,
                  },
                ],
              }}
              options={{ responsive: true }}
            />
          </div>
          <div className="flex-1 bg-white shadow rounded-lg p-6 flex items-center justify-center">
            <button className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              เพิ่ม Widget
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
