import React from 'react';
import { TopSection } from '@/components/common/topSection';
import NextTable from '@/components/common/nextTable';

export default function RevenuePage() {
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <TopSection title={'รายรับ'} />

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
        <NextTable rows={initialData} columns={columns} />
      </div>
    </div>
  );
}
