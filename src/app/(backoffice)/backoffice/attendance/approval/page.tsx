'use client';

import React from 'react';
import { TopSection } from '@/components/common/topSection';
import NextTable from '@/components/common/nextTable';
import Scaffold from '@/components/common/scaffold';

export default function WhitelistPage() {
  // const router = useRouter();

  return (
    <Scaffold
      child={
        <div> 
          <TopSection title={'การลางาน หรือ การขออนุมัติ'} />
          <div className="bg-white shadow rounded-2xl  mb-4 mt-4"></div>
          {/* Filter Bar 
          
            <div className="flex flex-wrap gap-4">
              <Input
                className="flex-1 p-2 text-headFont"
                labelPlacement="outside"
                size="lg"
                name="name"
                placeholder="ค้นหาชื่อ"
              />
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
            </div>*/}
          {/* Table */}
          <NextTable
            rows={initialData}
            columns={columns}
            tabs={tabs}
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
    status: 'cancel',
    date: '2024-01-12',
    address: 'กรุงเทพมหานคร',
    ip: '192.168.1.10',
    browser: 'Chrome',
    resson: '-',
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
    status: 'approval',
    date: '2024-02-15',
    address: 'เชียงใหม่',
    ip: '192.168.1.15',
    browser: 'Firefox',
    resson: '-',
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
    status: 'approval',
    date: '2024-03-10',
    address: 'ภูเก็ต',
    ip: '172.16.0.20',
    browser: 'Safari',
    resson: '-',
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
    status: 'rejected',
    date: '2024-04-22',
    address: 'ขอนแก่น',
    ip: '10.0.0.5',
    browser: 'Edge',
    resson: '-',
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
    status: 'cancel',
    date: '2024-05-18',
    address: 'ชลบุรี',
    ip: '203.113.0.1',
    browser: 'Chrome',
    resson: '-',
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
    status: 'approval',
    date: '2024-06-05',
    address: 'ระยอง',
    ip: '10.10.10.20',
    browser: 'Firefox',
    resson: '-',
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
    status: 'rejected',
    date: '2024-07-09',
    address: 'นครราชสีมา',
    ip: '172.16.100.25',
    browser: 'Edge',
    resson: '-',
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
    status: 'cancel',
    date: '2024-08-14',
    address: 'สุราษฎร์ธานี',
    ip: '10.1.1.50',
    browser: 'Safari',
    resson: '-',
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
    status: 'approval',
    date: '2024-09-20',
    address: 'พิษณุโลก',
    ip: '192.168.0.100',
    browser: 'Chrome',
    resson: '-',
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
    status: 'approval',
    date: '2024-10-30',
    address: 'หาดใหญ่',
    ip: '203.0.113.1',
    browser: 'Firefox',
    resson: '-',
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
    status: 'rejected',
    date: '2024-11-05',
    address: 'ชลบุรี',
    ip: '198.51.100.5',
    browser: 'Chrome',
    resson: '-',
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
    status: 'cancel',
    date: '2024-12-11',
    address: 'เชียงใหม่',
    ip: '10.10.1.10',
    browser: 'Edge',
    resson: '-',
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
    status: 'approval',
    date: '2024-11-15',
    address: 'ขอนแก่น',
    ip: '192.168.5.25',
    browser: 'Safari',
    resson: '-',
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
    status: 'approval',
    date: '2024-12-20',
    address: 'ภูเก็ต',
    ip: '172.16.50.50',
    browser: 'Firefox',
    resson: '-',
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
    status: 'rejected',
    date: '2024-12-25',
    address: 'กรุงเทพมหานคร',
    ip: '203.113.100.1',
    browser: 'Chrome',
    resson: '-',
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
];

const columns = [
  { title: 'ลำดับ', dataIndex: 'id', align: 'center' },
  { title: 'ชื่อจริง-นามสกุล', dataIndex: 'name' },
  { title: 'เหตุผล', dataIndex: 'resson', align: 'center' },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    render: (text: string) => <span>{handlestatus(text)}</span>,
  },

  { title: 'approve', dataIndex: 'approve', align: 'center' },
];

const tabs: any = [
  { label: 'All', value: 'all' },
  { label: 'ยกเลิก', value: 'cancel' },
  { label: 'อนุมัติ', value: 'approval' },
  { label: 'ไม่อนุมัติ', value: 'rejected' },
];

const handlestatus = (status: string): string => {
  switch (status) {

    case 'cancel':
      return 'ยกเลิก';

    case 'approval':
      return 'อนุมัติ';

    case 'rejected':
      return 'ไม่อนุมัติ';

    default:
      return 'สถานะผิดพลาด'; // Return text for unrecognized categories
  }
};
