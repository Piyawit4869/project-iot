'use client';

import React from 'react';
import { TopSection } from '@/components/common/topSection';
import NextTable from '@/components/common/nextTable';
import Scaffold from '@/components/common/scaffold';
import { useRouter } from 'next/navigation';
import { Input, Select, SelectItem } from '@nextui-org/react';

export default function Config_attendanceIndexPage() {
  const router = useRouter();

  const handleRowClick = (row: any) => {
    router.push(`config_attendance/${row.id}`); // Redirect to a dynamic route
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection title={'การตั้งค่าการทำงานของพนักงาน'} />
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
            </div>
          </div>
          {/* Table */}
          <NextTable
            rows={initialData}
            columns={columns}
            tabs={tabs}
            rowClickHandler={handleRowClick}
            tabFieldName={'role'}
          />
        </div>
      }
    />
  );
}

const initialData = [
  {
    id: 1,
    name: 'พรชัย วิวัฒน์',
    role: 'frontend',
    in: '11:04',
    break: '13:55',
    out: '15:52',
    info: '',
  },
  {
    id: 2,
    name: 'อารยา สุขุมวิทย์',
    role: 'backend',
    in: '10:57',
    break: '18:13',
    out: '07:34',
    info: '',
  },
  {
    id: 3,
    name: 'สมชาย ประเสริฐ',
    role: 'frontend',
    in: '11:42',
    break: '11:26',
    out: '16:51',
    info: '',
  },
  {
    id: 4,
    name: 'อารยา สุขุมวิทย์',
    role: 'frontend',
    in: '12:28',
    break: '11:17',
    out: '18:48',
    info: '',
  },
  {
    id: 5,
    name: 'กิตติพงษ์ รัตนา',
    role: 'backend',
    in: '12:10',
    break: '15:31',
    out: '15:09',
    info: '',
  },
  {
    id: 6,
    name: 'ชัยวัฒน์ อุดม',
    role: 'frontend',
    in: '12:48',
    break: '12:57',
    out: '11:13',
    info: '',
  },
  {
    id: 7,
    name: 'ลลิษา มโนบาล',
    role: 'frontend',
    in: '08:09',
    break: '06:12',
    out: '12:04',
    info: '',
  },
  {
    id: 8,
    name: 'รัชนี สมชาย',
    role: 'frontend',
    in: '16:19',
    break: '16:12',
    out: '15:54',
    info: '',
  },
  {
    id: 9,
    name: 'ชัยวัฒน์ อุดม',
    role: 'mobile',
    in: '10:09',
    break: '06:15',
    out: '16:58',
    info: '',
  },
  {
    id: 10,
    name: 'มาลี ใจ',
    role: 'mobile',
    in: '17:05',
    break: '12:24',
    out: '18:19',
    info: '',
  },
  {
    id: 11,
    name: 'ลลิษา มโนบาล',
    role: 'backend',
    in: '12:02',
    break: '15:18',
    out: '18:46',
    info: '',
  },
  {
    id: 12,
    name: 'อารยา สุขุมวิทย์',
    role: 'backend',
    in: '18:58',
    break: '09:49',
    out: '17:24',
    info: '',
  },
  {
    id: 13,
    name: 'อารยา สุขุมวิทย์',
    role: 'backend',
    in: '10:31',
    break: '18:57',
    out: '07:32',
    info: '',
  },
  {
    id: 14,
    name: 'พรชัย วิวัฒน์',
    role: 'mobile',
    in: '15:03',
    break: '17:44',
    out: '14:03',
    info: '',
  },
  {
    id: 15,
    name: 'พลอย พนิดา',
    role: 'frontend',
    in: '14:24',
    break: '15:58',
    out: '12:53',
    info: '',
  },
];

const columns = [
  { title: 'ลำดับ', dataIndex: 'id', align: 'center' },
  { title: 'ชื่อจริง-นามสกุล', dataIndex: 'name' },
  {
    title: 'ตำแหน่ง',
    dataIndex: 'role',
    render: (text: string) => <span>{handlerole(text)}</span>,
  },
  { title: 'เข้างาน', dataIndex: 'in', align: 'center' },
  { title: 'พักเบรก', dataIndex: 'break', align: 'center' },
  { title: 'ออก', dataIndex: 'out', align: 'center' },
  { title: '', dataIndex: 'info', align: 'center' },
];

const tabs: any = [
  { label: 'All', value: 'all' },
  { label: 'frontend', value: 'frontend' },
  { label: 'backend', value: 'backend' },
  { label: 'mobile', value: 'mobile' },
];

const handlerole = (role: string): string => {
  switch (role) {
    case 'frontend':
      return 'frontend';

    case 'backend':
      return 'backend';

    case 'mobile':
      return 'mobile';

    default:
      return 'ตำแหน่งไม่ถูกต้อง'; // Return text for unrecognized categories
  }
};
