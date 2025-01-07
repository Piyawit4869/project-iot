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
import React from 'react';
import Scaffold from '@/components/common/scaffold';
import CardComponent from '@/components/common/card';
import { TablePagination } from '@/components/common/tablePagination';

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

const initialData = [
  {
    id: 1,
    name: 'เงินเดือน',
    category: 'รายรับ',
    amount: '฿50,000',
    status: 'สำเร็จ',
  },
  {
    id: 2,
    name: 'โบนัส',
    category: 'รายรับ',
    amount: '฿20,000',
    status: 'สำเร็จ',
  },
  {
    id: 3,
    name: 'ค่าเช่า',
    category: 'รายจ่าย',
    amount: '฿15,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 4,
    name: 'ค่าอาหาร',
    category: 'รายจ่าย',
    amount: '฿12,000',
    status: 'สำเร็จ',
  },
  {
    id: 5,
    name: 'ค่าเดินทาง',
    category: 'รายจ่าย',
    amount: '฿8,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 6,
    name: 'ดอกเบี้ยเงินฝาก',
    category: 'รายรับ',
    amount: '฿5,000',
    status: 'รอดำเนินการ',
  },
];

const columns = [
  { title: 'รายการที่', dataIndex: 'id' },
  { title: 'ชื่อ', dataIndex: 'name' },
  { title: 'ประเภท', dataIndex: 'category' },
  { title: 'จำนวนเงิน', dataIndex: 'amount' },
  { title: 'สถานะ', dataIndex: 'status' },
];

export default function AccountSummaryPage() {
  const [page, setPage] = React.useState(1);
  const [themeColor, setThemeColor] = React.useState({}) as any;
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]) as any;
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [meta, setMeta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  /* Connect API Accounting Analysis Fetch data from the API
  const fetchStatement = async () => {
    setLoading(true);
    try {
      // const {} = filters;
      const { items: fetchedItems, meta: fetchedMeta } = await  API Analysis ({
        page,
        limit: rowsPerPage,
        // ...(name && { name }),
        // ...(docNo && { docNo }),
      });
      setItems(fetchedItems);
      setMeta(fetchedMeta);
    } catch (error) {
      console.error('Error fetching notations:', error);
    } finally {
      setLoading(false);
    }
  };
  */

  /* ดึงข้อมูล API Fetch data whenever filters, page, or rowsPerPage change
  React.useEffect(() => {
      API Accounting();
    }, [page, rowsPerPage]);
  */

  React.useEffect(() => {
    const getCssVariable = (variableName: string) => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(variableName)
        .trim();
    };

    setThemeColor({
      primary: getCssVariable('--primary'),
      secondary: getCssVariable('--secondary'),
      accent1: getCssVariable('--accent1'),
      accent2: getCssVariable('--accent2'),
      accent3: getCssVariable('--accent3'),
    }); // Fetch and set the color after mount
  }, []);

  // Mock Thai Data
  const barData = {
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม'],
    datasets: [
      {
        label: 'รายรับ (บาท)',
        data: [50000, 45000, 48000, 55000, 52000],
        backgroundColor: themeColor.secondary,
        borderColor: themeColor.secondary,
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
        borderColor: themeColor.accent1,
        backgroundColor: themeColor.accent1,
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
          themeColor.secondary,
          themeColor.accent1,
          themeColor.accent2,
          themeColor.accent3,
        ],
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection title={'สรุปผลการเงิน'} />
          <div className="flex space-x-4 mt-8">
            {/* Income */}
            <div className="flex-1">
              <CardComponent
                className={'bg-secondary'}
                customCard
                custom={
                  <div className="text-center">
                    <div className="text-sm text-white">รายรับรวม</div>
                    <div className="text-2xl font-bold text-white">
                      ฿120,000
                    </div>
                    <div className="text-xs text-white mt-1">เดือนปัจจุบัน</div>
                  </div>
                }
              />
            </div>

            {/* Expenses */}
            <div className="flex-1">
              <CardComponent
                className={'bg-accent1'}
                customCard
                custom={
                  <div className="text-center">
                    <div className="text-sm text-white">ค่าใช้จ่ายรวม</div>
                    <div className="text-2xl font-bold text-white">฿80,000</div>
                    <div className="text-xs text-white mt-1">เดือนปัจจุบัน</div>
                  </div>
                }
              />
            </div>

            {/* Net Profit */}
            <div className="flex-1">
              <CardComponent
                className={'bg-accent2'}
                customCard
                custom={
                  <div className="text-center">
                    <div className="text-sm text-white">กำไรสุทธิ</div>
                    <div className="text-2xl font-bold text-white">฿40,000</div>
                    <div className="text-xs text-white mt-1">เดือนปัจจุบัน</div>
                  </div>
                }
              />
            </div>

            {/* Pending Transactions */}
            <div className="flex-1">
              <CardComponent
                className={'bg-accent3'}
                customCard
                custom={
                  <div className="text-center">
                    <div className="text-sm text-secondaryFont">
                      รายการรอดำเนินการ
                    </div>
                    <div className="text-2xl font-bold text-secondaryFont">
                      5 รายการ
                    </div>
                    <div className="text-xs text-secondaryFont mt-1">
                      ตรวจสอบทันที
                    </div>
                  </div>
                }
              />
            </div>
          </div>
          {/* First row with 16:8 layout */}
          <div className="flex flex-row space-x-4 mt-8">
            <CardComponent
              className={'basis-2/3'}
              customCard
              custom={
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-headFont">
                    รายรับรายเดือน
                  </h3>
                  <Bar data={barData} options={{ responsive: true }} />
                </div>
              }
            />
            <CardComponent
              className={'basis-1/3'}
              customCard
              custom={
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-headFont">
                    รายจ่ายรายสัปดาห์
                  </h3>
                  <Line data={lineData} options={{ responsive: true }} />
                  <h3 className="text-lg font-semibold mb-4 mt-6 text-headFont">
                    ข้อมูลรายรับ
                  </h3>
                  <Bar
                    data={{
                      labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม'],
                      datasets: [
                        {
                          label: 'รายรับรวม (บาท)',
                          data: [100000, 90000, 110000],
                          backgroundColor: themeColor.accent2,
                          borderColor: 'rgba(0, 0, 0, 1)',
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{ responsive: true }}
                  />
                </div>
              }
            />
          </div>
          {/* Second row with 8:8:8 layout */}
          <div className="flex space-x-4 mt-8">
            <CardComponent
              className={'flex-1'}
              customCard
              custom={
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-headFont">
                    หมวดหมู่ค่าใช้จ่าย
                  </h3>
                  <Pie data={pieData} options={{ responsive: true }} />
                </div>
              }
            />
            <CardComponent
              className={'flex-1'}
              customCard
              custom={
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-headFont">
                    แนวโน้มรายจ่าย
                  </h3>
                  <Line
                    data={{
                      labels: ['เดือนที่ 1', 'เดือนที่ 2', 'เดือนที่ 3'],
                      datasets: [
                        {
                          label: 'ค่าใช้จ่ายรายเดือน (บาท)',
                          data: [45000, 47000, 46000],
                          borderColor: themeColor.accent2,
                          backgroundColor: themeColor.accent2,
                          tension: 0.4,
                        },
                      ],
                    }}
                    options={{ responsive: true }}
                  />
                </div>
              }
            />
            <CardComponent
              className={'flex-1  p-6 flex items-center justify-center'}
              customCard
              custom={
                <div className="">
                  <button className="flex items-center px-6 py-3 bg-secondary text-white font-semibold text-sm rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300">
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
              }
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="spinner"></div>
            </div>
          ) : (
            <TablePagination
              initialRows={initialData}
              initialMeta={meta}
              rowsPerPage={rowsPerPage}
              columns={columns}
              onPageChange={(newPage) => setPage(newPage)}
              onRowsPerPageChange={(newRowsPerPage) =>
                setRowsPerPage(newRowsPerPage)
              }
            />
          )}
        </div>
      }
    />
  );
}
