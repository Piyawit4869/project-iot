'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import {

  Input,
  Select,
  SelectItem,
  DatePicker,
} from '@nextui-org/react';
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
} from '@nextui-org/react';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AttendancesPage() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  const filteredData = data.filter((row) => {
    const matchesSearch = row.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole
      ? row.role.toLowerCase().includes(selectedRole.toLowerCase())
      : true;
    const matchesActivity = selectedActivity
      ? row.activity.toLowerCase().includes(selectedActivity.toLowerCase())
      : true;

    return matchesSearch && matchesRole && matchesActivity;
  });

  const handleRowClick = (row: any) => {
    router.push(`attendance/${row.id}`); // Redirect to a dynamic route
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection title="ภาพรวมการทำงานในองค์กรวันนี้" />
          <div className=" grid grid-row-5 grid-flow-col gap-5 mt-10">
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <h2 className="text-md">ยังไม่เข้างาน</h2>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <h1> 0 คน </h1>
              </CardBody>
              <Divider />
            </Card>

            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <h2 className="text-md">ลากิจ / ลาป่วย </h2>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <h1> 0 คน </h1>
              </CardBody>
              <Divider />
            </Card>

            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <h2 className="text-md">เข้างานแล้ว</h2>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <h1> 0 คน </h1>
              </CardBody>
              <Divider />
            </Card>
          </div>
          {/* Filter Bar */}
          <div className="bg-white shadow rounded-lg  mb-4 mt-4">
            <div className="flex flex-wrap gap-4">
              {/* Search Bar */}
              <Input
                className="flex-1 p-2 text-headFont"
                labelPlacement="outside"
                size="lg"
                name="name"
                value={searchTerm}
                placeholder="Search Employee name"
              />

              {/* Role Filter */}

              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                value={selectedRole}
                name="role"
                label="Select Role"
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <SelectItem className="text-headFont" key={'option1'}>
                  ทุกประเภท
                </SelectItem>
                <SelectItem className="text-headFont" key={'option2'}>
                  Front end
                </SelectItem>
                <SelectItem className="text-headFont" key={'option3'}>
                  Back end
                </SelectItem>
              </Select>
              {/* Activity Filter */}
              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                value={selectedActivity}
                name="activity"
                label="Select Activity"
                onChange={(e) => setSelectedActivity(e.target.value)}
              >
                <SelectItem className="text-headFont" key={'option1'}>
                  ทุกประเภท
                </SelectItem>
                <SelectItem className="text-headFont" key={'option2'}>
                  Front end
                </SelectItem>
                <SelectItem className="text-headFont" key={'option3'}>
                  Back end
                </SelectItem>
              </Select>
              {/* Day Filter */}
              <DatePicker
                className=" flex-1 p-2 text-headFont"
                label="Select Date"
              />
            </div>
          </div>

          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.dataIndex} className="p-2 border">
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id} className="border">
                  {columns.map((col) => (
                    <td key={col.dataIndex} className="p-2 border">
                      {row[col.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    />
  );
}

const columns: any = [
  { title: 'Order', dataIndex: 'order' },
  { title: 'Full Name', dataIndex: 'name' },
  { title: 'Role', dataIndex: 'role' },
  { title: 'activity', dataIndex: 'activity' },
  { title: 'in', dataIndex: 'in' },
  { title: 'break', dataIndex: 'break' },
  { title: 'out', dataIndex: 'out' },
  { title: 'summery', dataIndex: 'summery' },
  { title: 'note', dataIndex: 'note' },
  { title: '', dataIndex: 'info' },
];

const data = [
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
    note: '-',
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    order: '2',
    name: 'Piyawit Eamsamarng',
    role: 'Backend',
    activity: 'พักเบรก',
    in: '08:00',
    break: '13:00',
    out: '17:00',
    summery: '08:00:00',
    note: '-',
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    order: '3',
    name: 'L',
    role: 'Edit',
    activity: 'เข้างาน',
    in: '08:00',
    break: '13:00',
    out: '17:00',
    summery: '08:00:00',
    note: '-',
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
    ),
  },
];
