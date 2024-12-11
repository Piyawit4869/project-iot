import React from 'react';
import { TopSection } from '@/components/common/topSection';
import NextTable from '@/components/common/nextTable';
import Scaffold from '@/components/common/scaffold';

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

  const tabs = [
    { title: 'ทั้งหมด', value: 'all' },
    { title: 'รายได้จากการขาย', value: 'sale' },
    { title: 'รายได้จากการให้บริการ', value: 'service' },
    { title: 'รายได้ดอกเบี้ย', value: 'interest' },
    { title: 'รายได้จากการลงทุน', value: 'yield' },
    { title: 'รายได้อื่นๆ', value: 'other' },
  ];

  return (
    <Scaffold
      child={
        <div>
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
          <NextTable rows={initialData} columns={columns} tabs={tabs} />
        </div>
      }
    />
  );
}
