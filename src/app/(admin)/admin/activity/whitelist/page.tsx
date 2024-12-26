'use client';

import React from 'react';
import { TopSection } from '@/components/common/topSection';
import NextTable from '@/components/common/nextTable';
import Scaffold from '@/components/common/scaffold';
import { useRouter } from 'next/navigation';
import { Input, Select, SelectItem } from '@nextui-org/react';

export default function WhitelistPage() {
  const router = useRouter();

  const handleRowClick = (row: any) => {
    router.push(`whitelist/${row.id}`); // Redirect to a dynamic route
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection title={'ไวท์ลิสต์'} />
          {/* Filter Bar */}
          <div className="bg-white shadow rounded-lg  mb-4 mt-4">
            <div className="flex flex-wrap gap-4">
              {/* Search Bar */}
              <Input
                className="flex-1 p-2 text-headFont"
                labelPlacement="outside"
                size="lg"
                name="name"
                placeholder="ค้นหาชื่อสถานที่"
              />

              {/* status Filter */}

              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                name="status"
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
                label="เลือกสถานะ"
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
            tabFieldName={'status'}
          />
        </div>
      }
    />
  );
}

const initialData = [
  {
    id: 1,
    name: 'สมชาย ประเสริฐ',
    status: 'wait',
    date: '2024-01-12',
    address: 'กรุงเทพมหานคร',
    ip: '192.168.1.10',
    browser: 'Chrome',
    os: 'Windows',
  },
  {
    id: 2,
    name: 'อารยา สุขุมวิทย์',
    status: 'pending',
    date: '2024-02-15',
    address: 'เชียงใหม่',
    ip: '192.168.1.15',
    browser: 'Firefox',
    os: 'macOS',
  },
  {
    id: 3,
    name: 'ลลิษา มโนบาล',
    status: 'approval',
    date: '2024-03-10',
    address: 'ภูเก็ต',
    ip: '172.16.0.20',
    browser: 'Safari',
    os: 'iOS',
  },
  {
    id: 4,
    name: 'ธนิตา สมบูรณ์',
    status: 'rejected',
    date: '2024-04-22',
    address: 'ขอนแก่น',
    ip: '10.0.0.5',
    browser: 'Edge',
    os: 'Linux',
  },
  {
    id: 5,
    name: 'พลอย พนิดา',
    status: 'wait',
    date: '2024-05-18',
    address: 'ชลบุรี',
    ip: '203.113.0.1',
    browser: 'Chrome',
    os: 'Android',
  },
  {
    id: 6,
    name: 'ชัยวัฒน์ อุดม',
    status: 'approval',
    date: '2024-06-05',
    address: 'ระยอง',
    ip: '10.10.10.20',
    browser: 'Firefox',
    os: 'Windows',
  },
  {
    id: 7,
    name: 'อนันต์ ดี',
    status: 'rejected',
    date: '2024-07-09',
    address: 'นครราชสีมา',
    ip: '172.16.100.25',
    browser: 'Edge',
    os: 'Linux',
  },
  {
    id: 8,
    name: 'มาลี ใจ',
    status: 'wait',
    date: '2024-08-14',
    address: 'สุราษฎร์ธานี',
    ip: '10.1.1.50',
    browser: 'Safari',
    os: 'iOS',
  },
  {
    id: 9,
    name: 'รัชนี สมชาย',
    status: 'pending',
    date: '2024-09-20',
    address: 'พิษณุโลก',
    ip: '192.168.0.100',
    browser: 'Chrome',
    os: 'macOS',
  },
  {
    id: 10,
    name: 'กิตติพงษ์ รัตนา',
    status: 'approval',
    date: '2024-10-30',
    address: 'หาดใหญ่',
    ip: '203.0.113.1',
    browser: 'Firefox',
    os: 'Android',
  },
  {
    id: 11,
    name: 'สุนันต์ ประดิษฐ์',
    status: 'rejected',
    date: '2024-11-05',
    address: 'ชลบุรี',
    ip: '198.51.100.5',
    browser: 'Chrome',
    os: 'Windows',
  },
  {
    id: 12,
    name: 'พรชัย วิวัฒน์',
    status: 'wait',
    date: '2024-12-11',
    address: 'เชียงใหม่',
    ip: '10.10.1.10',
    browser: 'Edge',
    os: 'Linux',
  },
  {
    id: 13,
    name: 'วิชัย กมล',
    status: 'pending',
    date: '2024-11-15',
    address: 'ขอนแก่น',
    ip: '192.168.5.25',
    browser: 'Safari',
    os: 'iOS',
  },
  {
    id: 14,
    name: 'โสภณ เทพ',
    status: 'approval',
    date: '2024-12-20',
    address: 'ภูเก็ต',
    ip: '172.16.50.50',
    browser: 'Firefox',
    os: 'macOS',
  },
  {
    id: 15,
    name: 'นิรันดร์ กัญญา',
    status: 'rejected',
    date: '2024-12-25',
    address: 'กรุงเทพมหานคร',
    ip: '203.113.100.1',
    browser: 'Chrome',
    os: 'Android',
  },
];

const columns = [
  { title: 'ลำดับ', dataIndex: 'id', align: 'center' },
  { title: 'ชื่อจริง-นามสกุล', dataIndex: 'name' },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    render: (text: string) => <span>{handlestatus(text)}</span>,
  },
  { title: 'วันที่เข้าใช้งาน', dataIndex: 'date', align: 'center' },
  { title: 'สถานที่', dataIndex: 'address', align: 'center' },
  { title: 'IP', dataIndex: 'ip', align: 'center' },
  { title: 'Browser', dataIndex: 'browser', align: 'center' },
  { title: 'ระบบปฎิบัติการ', dataIndex: 'os', align: 'center' },
];

const tabs: any = [
  { label: 'All', value: 'all' },
  { label: 'รอตรวจสอบ', value: 'wait' },
  { label: 'กำลังส่งข้อมูล', value: 'pending' },
  { label: 'อนุมัติ', value: 'approval' },
  { label: 'ไม่อนุมัติ', value: 'rejected' },
];

const handlestatus = (status: string): string => {
  switch (status) {
    case 'wait':
      return 'รอตรวจสอบ';

    case 'pending':
      return 'กำลังส่งข้อมูล';

    case 'approval':
      return 'อนุมัติ';

    case 'rejected':
      return 'ไม่อนุมัติ';

    default:
      return 'สถานะผิดพลาด'; // Return text for unrecognized categories
  }
};
