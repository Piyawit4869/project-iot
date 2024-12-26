import React from 'react';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Input, Link } from '@nextui-org/react';
import pagination from '@/pages/api/notations/pagination';
import { TablePagination } from '@/components/common/tablePagination';

export default async function NotationsPage() {
  const page = 1;
  const rowsPerPage = 10;

  const { items, meta } = await pagination({ page, limit: rowsPerPage });

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="เอกสารทั้งหมด"
              buttons={[
                <Link href={'notation/create'} key={'create button'}>
                  <Button
                    className="bg-accent1 text-white"
                    key={'create button'}
                  >
                    สร้างเอกสาร
                  </Button>
                </Link>,
              ]}
            />
            <div className="bg-white shadow rounded-lg mb-4 mt-4">
              <div className="flex flex-wrap gap-4">
                <Input
                  className="flex-1 p-2 text-headFont"
                  labelPlacement="outside"
                  size="lg"
                  name="name"
                  placeholder="ค้นหาชื่อ"
                />
                <Input
                  className="flex-1 p-2 text-headFont"
                  labelPlacement="outside"
                  size="lg"
                  name="docNo"
                  placeholder="ค้นหาหมายเลขเอกสาร"
                />
              </div>
            </div>
            <TablePagination
              initialRows={items || []}
              initialMeta={meta || {}}
              rowsPerPage={10}
              columns={columns}
            />
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}

const columns = [
  {
    title: 'รหัสเอกสาร',
    dataIndex: 'docNo',
    link: '/admin/notation',
  },
  { title: 'ประเภทเอกสาร', dataIndex: 'type' },
  { title: 'การดำเนินการ', dataIndex: 'status' },
  { title: 'สถานะเอกสาร', dataIndex: 'docStatus' },
];
