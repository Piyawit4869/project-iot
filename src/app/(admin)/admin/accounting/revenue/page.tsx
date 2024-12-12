'use client';

import React from 'react';
import { TopSection } from '@/components/common/topSection';
import NextTable from '@/components/common/nextTable';
import Scaffold from '@/components/common/scaffold';
import { useRouter } from 'next/navigation';
import { Input, Select, SelectItem } from '@nextui-org/react';

export default function RevenuePage() {
  const router = useRouter();

  const handleRowClick = (row: any) => {
    router.push(`revenue/${row.id}`); // Redirect to a dynamic route
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection title={'รายได้'} />
          {/* Filter Bar */}
          <div className="bg-white shadow rounded-lg  mb-4 mt-4">
            <div className="flex flex-wrap gap-4">
              {/* Search Bar */}
              <Input
                className="flex-1 p-2 text-headFont"
                labelPlacement="outside"
                size="lg"
                name="name"
                placeholder="ค้นหาชื่อ"
              />

              {/* Category Filter */}

              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                name="category"
                label="เลือกประเภท"
              >
                <SelectItem className="text-headFont" key={'option1'}>
                  ทุกประเภท
                </SelectItem>
                <SelectItem className="text-headFont" key={'option2'}>
                  รายได้
                </SelectItem>
                <SelectItem className="text-headFont" key={'option3'}>
                  รายจ่าย
                </SelectItem>
              </Select>

              {/* Status Filter */}

              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                name="status"
                label="เลือกประเภท"
              >
                <SelectItem className="text-headFont" key={'option1'}>
                  ทุกสถานะ
                </SelectItem>
                <SelectItem className="text-headFont" key={'option2'}>
                  สำเร็จ
                </SelectItem>
                <SelectItem className="text-headFont" key={'option3'}>
                  รอดำเนินการ
                </SelectItem>
              </Select>
            </div>
          </div>
          {/* Table */}
          <NextTable
            rows={initialData}
            columns={columns}
            tabs={tabs}
            rowClickHandler={handleRowClick}
            tabFieldName={'category'}
          />
        </div>
      }
    />
  );
}

const initialData = [
  {
    id: 1,
    name: 'รายได้จากขาย Product A เดือนธันวาคม',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿50,000',
    status: 'สำเร็จ',
  },
  {
    id: 2,
    name: 'รายได้จากการติดตั้ง Product A เดือนธันวาคม',
    category: 'service', // Matches "รายได้จากการให้บริการ"
    amount: '฿2,000',
    status: 'สำเร็จ',
  },
  {
    id: 3,
    name: 'ดอกเบี้ยเงินฝาก',
    category: 'interest', // Matches "รายได้ดอกเบี้ย"
    amount: '฿5,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 4,
    name: 'รายได้จากหุ้น',
    category: 'yield', // Matches "รายได้จากการลงทุน"
    amount: '฿7,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 5,
    name: 'รายได้จากค่าเช่าอาคาร เดือนมกราคม',
    category: 'other', // Matches "รายได้อื่นๆ"
    amount: '฿15,000',
    status: 'สำเร็จ',
  },
  {
    id: 6,
    name: 'รายได้จากขาย Product B เดือนมกราคม',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿40,000',
    status: 'สำเร็จ',
  },
  {
    id: 7,
    name: 'รายได้จากการซ่อมแซมเครื่องจักร',
    category: 'service', // Matches "รายได้จากการให้บริการ"
    amount: '฿8,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 8,
    name: 'เงินปันผลจากหุ้น',
    category: 'yield', // Matches "รายได้จากการลงทุน"
    amount: '฿12,000',
    status: 'สำเร็จ',
  },
  {
    id: 9,
    name: 'รายได้จากการขายวัสดุเหลือใช้',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿3,000',
    status: 'สำเร็จ',
  },
  {
    id: 10,
    name: 'รายได้จากให้เช่าอุปกรณ์',
    category: 'other', // Matches "รายได้อื่นๆ"
    amount: '฿5,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 11,
    name: 'รายได้จากดอกเบี้ยเงินกู้',
    category: 'interest', // Matches "รายได้ดอกเบี้ย"
    amount: '฿10,000',
    status: 'สำเร็จ',
  },
  {
    id: 12,
    name: 'รายได้จากการขายลิขสิทธิ์',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿20,000',
    status: 'สำเร็จ',
  },
  {
    id: 13,
    name: 'รายได้จากการบริการหลังการขาย',
    category: 'service', // Matches "รายได้จากการให้บริการ"
    amount: '฿6,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 14,
    name: 'รายได้จากค่าเช่าที่ดิน',
    category: 'other', // Matches "รายได้อื่นๆ"
    amount: '฿25,000',
    status: 'สำเร็จ',
  },
  {
    id: 15,
    name: 'รายได้จากการขาย Product C เดือนกุมภาพันธ์',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿55,000',
    status: 'สำเร็จ',
  },
];

const columns = [
  { title: 'รายการที่', dataIndex: 'id', align: 'center' },
  { title: 'ชื่อ', dataIndex: 'name' },
  {
    title: 'ประเภทรายได้',
    dataIndex: 'category',
    render: (text: string) => <span>{handleCategory(text)}</span>,
  },
  { title: 'จำนวนเงิน', dataIndex: 'amount', align: 'center' },
  { title: 'สถานะ', dataIndex: 'status', align: 'center' },
];

const tabs: any = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'รายได้จากการขาย', value: 'sale' },
  { label: 'รายได้จากการให้บริการ', value: 'service' },
  { label: 'รายได้ดอกเบี้ย', value: 'interest' },
  { label: 'รายได้จากการลงทุน', value: 'yield' },
  { label: 'รายได้อื่นๆ', value: 'other' },
];

const handleCategory = (category: string): string => {
  switch (category) {
    case 'sale':
      return 'รายได้จากการขาย';

    case 'service':
      return 'รายได้จากการให้บริการ';

    case 'interest':
      return 'รายได้ดอกเบี้ย';

    case 'yield':
      return 'รายได้จากการลงทุน';

    case 'other':
      return 'รายได้อื่นๆ';

    default:
      return 'หมวดหมู่ไม่ถูกต้อง'; // Return text for unrecognized categories
  }
};
