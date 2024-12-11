'use client';

import React from 'react';
import { TopSection } from '@/components/common/topSection';
import NextTable from '@/components/common/nextTable';
import { useRouter } from 'next/navigation';
import Scaffold from '@/components/common/scaffold';

export default function StatementPage() {
  const router = useRouter();
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

  const handleRowClick = (row: any) => {
    router.push(`statement/${row.id}`); // Redirect to a dynamic route
  };

  return (
    <Scaffold
      child={
        <div>
          {' '}
          <TopSection title={'รายรับและรายจ่าย'} />
          {/* Filter Bar */}
          <div className="bg-white shadow rounded-lg p-4 mb-6">
            <div className="flex flex-wrap gap-4">
              {/* Search Bar */}
              <input
                type="text"
                name="search"
                placeholder="ค้นหา..."
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />

              {/* Category Filter */}
              <select
                name="category"
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              >
                <option value="">ทุกประเภท</option>
                <option value="รายรับ">รายรับ</option>
                <option value="รายจ่าย">รายจ่าย</option>
              </select>

              {/* Status Filter */}
              <select
                name="status"
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              >
                <option value="">ทุกสถานะ</option>
                <option value="สำเร็จ">สำเร็จ</option>
                <option value="รอดำเนินการ">รอดำเนินการ</option>
              </select>
            </div>
          </div>
          {/* Table */}
          <NextTable
            rows={initialData}
            columns={columns}
            rowClickHandler={handleRowClick}
          />
        </div>
      }
    />
  );
}
