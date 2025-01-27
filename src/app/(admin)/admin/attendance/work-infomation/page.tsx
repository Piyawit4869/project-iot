'use client';

import React, { useState, useEffect } from 'react';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Link, Input } from '@nextui-org/react';
import pagination from '@/pages/api/workinfos/pagination';
import { TablePagination } from '@/components/common/tablePagination';
import { formatDate } from '@/utils/enums/date'; // <-- Import formatDate here
// import debounce from 'lodash/debounce';
// import * as Icon from '@ant-design/icons';

// interface FilterState {
//   name: string; // Changed from 'ip' to 'name'
//   status: string;
// }

interface MetaData {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface WorkInfoItem {
  id: string;
  prefix: string;
  name: string;
  status: string;
  active: boolean;
  isCurrent: boolean;
  descriptions: string;
  priority: string;
  startDate: string | null;
  dueDate: string | null;
  limitTimePerDay: number;
  inspector: string;
  startCredit: number;
  totalCredit: number;
  totalWorkHours: number;
  payDay: string | null;
  note: string;
  createdAt: string | null;
}

const columns = [
  {
    title: 'ชื่อ',
    dataIndex: 'name',
    link: '/admin/attendance/work-infomation',
  },
  { title: 'คำนำหน้า', dataIndex: 'prefix' },
  { title: 'สถานะ', dataIndex: 'status' },
  { title: 'คำอธิบายงาน', dataIndex: 'descriptions' },
  { title: 'ความสำคัญ', dataIndex: 'priority' },
  { title: 'วันที่เริ่มต้น', dataIndex: 'startDate' },
  { title: 'วันสิ้นสุด', dataIndex: 'dueDate' },
  { title: 'เวลาจำกัดต่อวัน', dataIndex: 'limitTimePerDay' },
  { title: 'ผู้ตรวจสอบ', dataIndex: 'inspector' },
  { title: 'เครดิตเริ่มต้น', dataIndex: 'startCredit' },
  { title: 'เครดิตรวม', dataIndex: 'totalCredit' },
  { title: 'ชั่วโมงทำงานรวม', dataIndex: 'totalWorkHours' },
  { title: 'วันที่จ่ายเงิน', dataIndex: 'payDayDate' },
  { title: 'เวลาที่จ่ายเงิน', dataIndex: 'payDayTime' },
  { title: 'หมายเหตุ', dataIndex: 'note' },
  { title: 'สร้างวันที่', dataIndex: 'createdAtDate' },
  { title: 'เวลาที่สร้าง', dataIndex: 'createdAtTime' },
];

export default function WorkInfoPage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [items, setItems] = useState<WorkInfoItem[]>([]);
  // const [filters, setFilters] = useState<FilterState>({ name: '', status: '' });
  const [meta, setMeta] = useState<MetaData>({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  const fetchWorkInfo = async () => {
    setLoading(true);
    try {
      // const { name, status } = filters;
      const { items: fetchedItems, meta: fetchedMeta } = await pagination({
        page,
        limit: rowsPerPage,
        // ...(name && { name }),
        // ...(status && { status }),
      });

      console.log('Fetched Items:', fetchedItems);
      console.log('Fetched Meta:', fetchedMeta);

      setItems(
        fetchedItems.map((item: WorkInfoItem) => ({
          ...item,
          createdAtDate: formatDate(item.createdAt).date,
          createdAtTime: formatDate(item.createdAt).time, // <-- Use formatDate here
          dueDate: formatDate(item.dueDate).date, // <-- Use formatDate here
          startDate: formatDate(item.startDate).date, // <-- Use formatDate here
          payDayDate: formatDate(item.payDay).date,
          payDayTime: formatDate(item.payDay).time,
        })),
      );
      setMeta(fetchedMeta);
    } catch (error) {
      console.error('Error fetching work info:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleFilterChange = React.useCallback(
  //     debounce((updatedFilters) => {
  //       setPage(1); // Reset to the first page for new filters
  //       setFilters(updatedFilters);
  //     }),
  //     [filters],
  //   );

  // const onInputChange = (key: keyof typeof filters, value: string) => {
  //   const updatedFilters = { ...filters, [key]: value };
  //   handleFilterChange(updatedFilters);
  // };

  // const handleStatusChange = (status: string) => {
  //   const updatedFilters = { ...filters, status };
  //   handleFilterChange(updatedFilters); // This will trigger the debounced filter change
  // };

  useEffect(() => {
    fetchWorkInfo();
  }, [page, rowsPerPage]);

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="ข้อมูลการทำงาน"
              buttons={[
                <Link href={'work-infomation/create'} key={'create button'}>
                  <Button
                    size="sm"
                    className="bg-accent1 text-white"
                    key={'create button'}
                  >
                    สร้างข้อมูลการทำงาน
                  </Button>
                </Link>,
              ]}
            />
            <div className="bg-white shadow rounded-2xl mb-4 mt-4">
              <div className="flex flex-wrap gap-4">
                <Input
                  className="flex-1 p-2 text-headFont"
                  labelPlacement="outside"
                  size="sm"
                  radius="sm"
                  name="name"
                  placeholder="ค้นหาชื่อ"
                  // value={filters.name}
                  // onChange={(e) => onInputChange('name', e.target.value)}
                />
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-[350px]">
                <div className="relative flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600 text-lg font-semibold animate-pulse">
                    Loading, please wait...
                  </p>
                </div>
              </div>
            ) : (
              <>
                <TablePagination
                  initialRows={items}
                  initialMeta={meta}
                  rowsPerPage={rowsPerPage}
                  columns={columns}
                  onPageChange={(newPage) => setPage(newPage)}
                  onRowsPerPageChange={(newRowsPerPage) =>
                    setRowsPerPage(newRowsPerPage)
                  }
                />
              </>
            )}
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}
