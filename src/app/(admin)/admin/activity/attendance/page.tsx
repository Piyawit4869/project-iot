'use client';

import React, { useState } from 'react';
import { TopSection } from '@/components/common/topSection';
import NextTable from '@/components/common/nextTable';
import Scaffold from '@/components/common/scaffold';
import { useRouter } from 'next/navigation';
import { Input, Select, SelectItem } from '@nextui-org/react';
import CardComponent from '@/components/common/card';

// Define TypeScript types
interface EmployeeData {
  id: number;
  order: string;
  name: string;
  role: string;
  activity: string;
  in: string;
  break: string;
  out: string;
  summery: string;
  // note: string;
  // info: JSX.Element;
}

interface FilterOption {
  label: string;
  value: string;
}



const filterOptions: FilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'Frontend' },
  { label: 'Backend', value: 'Backend' },
  { label: 'Mobile', value: 'Mobile' },
];

// const roleMapper = (role: string): string => {
//   const mapping: Record<string, string> = {
//     frontend: 'Front-end',
//     backend: 'Back-end',
//     mobile: 'Mobile',
//   };

//   return mapping[role.toLowerCase()] || 'หมวดหมู่ไม่ถูกต้อง';
// };

export default function RevenuePage() {
  const router = useRouter();

  const [filteredData, setFilteredData] = useState<EmployeeData[]>(initialData);
  const [searchValue, setSearchValue] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const handleRowClick = (row: EmployeeData) => {
    router.push(`attendance/${row.id}`);
  };

  const filterData = () => {
    let filtered = initialData;

    if (selectedRole !== 'all') {
      filtered = filtered.filter((item) => item.role === selectedRole);
    }

    if (searchValue) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    filterData();
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    filterData();
  };

  const renderCard = (title: string, count: number, colorClass: string) => (
    <div className="flex-1">
      <CardComponent
        className={colorClass}
        customCard
        custom={
          <div className="text-center">
            <div className="text-sm text-white">{title}</div>
            <div className="text-2xl font-bold text-white">{count} คน</div>
            <div className="text-xs text-white mt-1">วันนี้</div>
          </div>
        }
      />
    </div>
  );

  return (
    <Scaffold
      child={
        <div>
          <TopSection title="ภาพรวมการทำงานในองค์กรวันนี้" />
          <div className="flex space-x-4 mt-8">
            {renderCard('เข้างาน', 0, 'bg-accent1')}
            {renderCard('ลาป่วย', 0, 'bg-accent1')}
            {renderCard('ลากิจ', 0, 'bg-accent1')}
            {renderCard('ขาด', 0, 'bg-accent1')}
          </div>
          <div className="bg-white shadow rounded-lg mb-4 mt-4">
            <div className="flex flex-wrap gap-4">
              <Input
                className="flex-1 p-2 text-headFont"
                labelPlacement="outside"
                size="lg"
                name="name"
                placeholder="ค้นหาชื่อพนักงาน"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                name="role"
                label="เลือกตำแหน่ง"
                value={selectedRole}
                onChange={(r) => handleRoleChange(r.target.value)}
              >
                {filterOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    className="text-headFont"
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <NextTable
            rows={filteredData}
            columns={columns}
            rowClickHandler={handleRowClick}
            tabFieldName="Activity"
          />
        </div>
      }
    />
  );
}

const columns: any = [
  { title: 'Order', dataIndex: 'order', align: 'center' },
  { title: 'Full Name', dataIndex: 'name', align: 'left' },
  { title: 'Role', dataIndex: 'role', align: 'center' },
  { title: 'Activity', dataIndex: 'activity', align: 'center' },
  { title: 'In', dataIndex: 'in', align: 'center' },
  { title: 'Break', dataIndex: 'break', align: 'center' },
  { title: 'Out', dataIndex: 'out', align: 'center' },
  { title: 'Summary', dataIndex: 'summery', align: 'center' },
  { title: 'Note', dataIndex: 'note', align: 'center' },
  { title: '', dataIndex: 'info', align: 'right' },
];


const initialData: EmployeeData[] = [
  {
    id: 1,
    order: '1',
    name: 'Vachira Rongmuang',
    role: 'Frontend',
    activity: 'เข้างาน',
    in: '08:00',
    break: '13:00',
    out: '17:00',
    summery: '08:00:00',
  //   note: '-',
  //   info: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="size-6"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9-3.75h.008v.008H12V8.25Z"
  //       />
  //     </svg>
  //   ),
  },
  {
    id: 2,
    order: '2',
    name: 'ปิยะวิทย์ เอี่ยมสำอางค์',
    role: 'Frontend',
    activity: 'พักเบรก',
    in: '08:00',
    break: '13:00',
    out: '17:00',
    summery: '08:00:00',
  //   note: '-',
  //   info: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="size-6"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9-3.75h.008v.008H12V8.25Z"
  //       />
  //     </svg>
  //   ),
  },
  {
    id: 3,
    order: '3',
    name: 'Beam',
    role: 'Backend',
    activity: 'ออกงาน',
    in: '08:00',
    break: '13:00',
    out: '17:00',
    summery: '08:00:00',
  //   note: '-',
  //   info: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="size-6"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9-3.75h.008v.008H12V8.25Z"
  //       />
  //     </svg>
  //   ),
  },
  {
    id: 4,
    order: '4',
    name: 'L',
    role: 'Mobile',
    activity: 'เข้างาน',
    in: '08:00',
    break: '13:00',
    out: '17:00',
    summery: '08:00:00',
  //   note: '-',
  //   info: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="size-6"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9-3.75h.008v.008H12V8.25Z"
  //       />
  //     </svg>
  //   ),
  },
  {
    id: 1,
    order: '1',
    name: 'Phuwis',
    role: 'Frontend',
    activity: 'เข้างาน',
    in: '08:00',
    break: '13:00',
    out: '17:00',
    summery: '08:00:00',
  //   note: '-',
  //   info: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="size-6"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9-3.75h.008v.008H12V8.25Z"
  //       />
  //     </svg>
  //   ),
  },
  {
    id: 1,
    order: '1',
    name: 'Vachira Rongmuang',
    role: 'Frontend',
    activity: 'เข้างาน',
    in: '08:00',
    break: '13:00',
    out: '17:00',
    summery: '08:00:00',
  //   note: '-',
  //   info: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="size-6"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9-3.75h.008v.008H12V8.25Z"
  //       />
  //     </svg>
  //   ),
  },
  {
    id: 1,
    order: '1',
    name: 'Vachira Rongmuang',
    role: 'Frontend',
    activity: 'เข้างาน',
    in: '08:00',
    break: '13:00',
    out: '17:00',
    summery: '08:00:00',
  //   note: '-',
  //   info: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="size-6"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0Zm-9-3.75h.008v.008H12V8.25Z"
  //       />
  //     </svg>
  //   ),
  },

];