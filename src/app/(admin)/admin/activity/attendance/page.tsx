'use client';

import NextTable from '@/components/common/nextTable';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { CalendarDate } from '@internationalized/date';
import {
  Button,
  Input,
  Select,
  SelectItem,
  DatePicker,
} from '@nextui-org/react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AttendancesPage() {
  const router = useRouter();

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
                placeholder="Search Employee name"
              />

              {/* Category Filter */}

              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                name="role"
                label="Select Role"
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
                name="activity"
                label="Select Activity"
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

          <NextTable
            columns={columns}
            rows={data}
            rowClickHandler={handleRowClick}
          />
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
