import React from 'react';
import { Table } from '@/components/common/table';
import { TopSection } from '@/components/common/topSection';

export default function ExpensesPage() {
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
    { Header: 'รายการที่', accessor: 'id' },
    { Header: 'ชื่อ', accessor: 'name' },
    { Header: 'ประเภท', accessor: 'category' },
    { Header: 'จำนวนเงิน', accessor: 'amount' },
    { Header: 'สถานะ', accessor: 'status' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <TopSection title={'รายจ่าย'} />

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
        <Table data={initialData} columns={columns} />
      </div>
    </div>
  );
}
