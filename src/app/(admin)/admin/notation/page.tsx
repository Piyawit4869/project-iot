'use client';

import NextTable from '@/components/common/nextTable';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotationsPage() {
  const router = useRouter();

  const handleRowClick = (row: any) => {
    router.push(`notation/${row.id}`); // Redirect to a dynamic route
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="เอกสารทั้งหมด"
            buttons={[
              <Link href={'notation/create'} key={'create button'}>
                <Button className="bg-accent2 text-white" key={'create button'}>
                  สร้างเอกสาร
                </Button>
              </Link>,
            ]}
          />
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
  { title: 'รหัสเอกสาร', dataIndex: 'docNo' },
  { title: 'ประเภทเอกสาร', dataIndex: 'type' },
  { title: 'การดำเนินการ', dataIndex: 'status' },
  { title: 'สถานะเอกสาร', dataIndex: 'docStatus' },
];

const data = [
  {
    id: 1,
    docNo: 'QU-20241212',
    type: 'ใบเสนอราคา',
    status: 'แบบร่าง',
    docStatus: 'แบบร่าง',
  },
  {
    id: 2,
    docNo: 'RC-20241212',
    type: 'ใบเสร็จรับเงิน',
    status: 'แบบร่าง',
    docStatus: 'แบบร่าง',
  },
];
