'use client';

import React from 'react';
import { TopSection } from '@/components/common/topSection';
import NextTable from '@/components/common/nextTable';
import Scaffold from '@/components/common/scaffold';
import { useRouter } from 'next/navigation';
import { Input, Select, SelectItem } from '@nextui-org/react';

export default function WhitelistPage() {
  const router = useRouter();


  return (
    <Scaffold
      child={
        <div>
          <TopSection title={'ไม่อยู่ในไวท์ลิสต์'} />
          {/* Filter Bar */}
          <div className="bg-white shadow rounded-2xl  mb-4 mt-4">
            <div className="flex flex-wrap gap-4">
              {/* Search Bar */}
              <Input
                className="flex-1 p-2 text-headFont"
                labelPlacement="outside"
                size="lg"
                name="name"
                placeholder="ค้นหาชื่อ"
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
            // tabs={tabs}
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
    date: '2024-01-12',
    address: 'กรุงเทพมหานคร',
    ip: '192.168.1.10',
    browser: 'Chrome',
    os: 'Windows',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 2,
    name: 'อารยา สุขุมวิทย์',
    date: '2024-02-15',
    address: 'เชียงใหม่',
    ip: '192.168.1.15',
    browser: 'Firefox',
    os: 'macOS',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 3,
    name: 'ลลิษา มโนบาล',
    date: '2024-03-10',
    address: 'ภูเก็ต',
    ip: '172.16.0.20',
    browser: 'Safari',
    os: 'iOS',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 4,
    name: 'ธนิตา สมบูรณ์',
    date: '2024-04-22',
    address: 'ขอนแก่น',
    ip: '10.0.0.5',
    browser: 'Edge',
    os: 'Linux',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 5,
    name: 'พลอย พนิดา',
    date: '2024-05-18',
    address: 'ชลบุรี',
    ip: '203.113.0.1',
    browser: 'Chrome',
    os: 'Android',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 6,
    name: 'ชัยวัฒน์ อุดม',
    date: '2024-06-05',
    address: 'ระยอง',
    ip: '10.10.10.20',
    browser: 'Firefox',
    os: 'Windows',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 7,
    name: 'อนันต์ ดี',
    date: '2024-07-09',
    address: 'นครราชสีมา',
    ip: '172.16.100.25',
    browser: 'Edge',
    os: 'Linux',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 8,
    name: 'มาลี ใจ',
    date: '2024-08-14',
    address: 'สุราษฎร์ธานี',
    ip: '10.1.1.50',
    browser: 'Safari',
    os: 'iOS',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 9,
    name: 'รัชนี สมชาย',
    date: '2024-09-20',
    address: 'พิษณุโลก',
    ip: '192.168.0.100',
    browser: 'Chrome',
    os: 'macOS',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 10,
    name: 'กิตติพงษ์ รัตนา',
    date: '2024-10-30',
    address: 'หาดใหญ่',
    ip: '203.0.113.1',
    browser: 'Firefox',
    os: 'Android',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 11,
    name: 'สุนันต์ ประดิษฐ์',
    date: '2024-11-05',
    address: 'ชลบุรี',
    ip: '198.51.100.5',
    browser: 'Chrome',
    os: 'Windows',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 12,
    name: 'พรชัย วิวัฒน์',
    date: '2024-12-11',
    address: 'เชียงใหม่',
    ip: '10.10.1.10',
    browser: 'Edge',
    os: 'Linux',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 13,
    name: 'วิชัย กมล',
    date: '2024-11-15',
    address: 'ขอนแก่น',
    ip: '192.168.5.25',
    browser: 'Safari',
    os: 'iOS',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 14,
    name: 'โสภณ เทพ',
    date: '2024-12-20',
    address: 'ภูเก็ต',
    ip: '172.16.50.50',
    browser: 'Firefox',
    os: 'macOS',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
  {
    id: 15,
    name: 'นิรันดร์ กัญญา',
    date: '2024-12-25',
    address: 'กรุงเทพมหานคร',
    ip: '203.113.100.1',
    browser: 'Chrome',
    os: 'Android',
    approve: (
      <a href="">
        <button className="bg-accent1 rounded w-[80px] h-[30px] text-white gap-5">
          อนุมัติ
        </button>{' '}
        <button className="bg-accent2 rounded w-[80px] h-[30px] text-white">
          ไม่อนุมัติ
        </button>
      </a>
    ),
  },
];

const columns = [
  { title: 'ลำดับ', dataIndex: 'id', align: 'center' },
  { title: 'ชื่อจริง-นามสกุล', dataIndex: 'name' },
  { title: 'วันที่เข้าใช้งาน', dataIndex: 'date', align: 'center' },
  { title: 'สถานที่', dataIndex: 'address', align: 'center' },
  { title: 'IP', dataIndex: 'ip', align: 'center' },
  { title: 'Browser', dataIndex: 'browser', align: 'center' },
  { title: 'ระบบปฎิบัติการ', dataIndex: 'os', align: 'center' },
  { title: 'approval', dataIndex: 'approve', align: 'center' },
];

// const tabs: any = [
//   { label: 'All', value: 'all' },
//   { label: 'รอตรวจสอบ', value: 'wait' },
//   { label: 'กำลังส่งข้อมูล', value: 'pending' },
//   { label: 'อนุมัติ', value: 'approval' },
//   { label: 'ไม่อนุมัติ', value: 'rejected' },
// ];

// const handlestatus = (status: string): string => {
//   switch (status) {
//     case 'wait':
//       return 'รอตรวจสอบ';

//     case 'pending':
//       return 'กำลังส่งข้อมูล';

//     case 'approval':
//       return 'อนุมัติ';

//     case 'rejected':
//       return 'ไม่อนุมัติ';

//     default:
//       return 'สถานะผิดพลาด'; // Return text for unrecognized categories
//   }
// };
