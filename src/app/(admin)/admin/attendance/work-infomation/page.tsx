'use client';

import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import {
  Input,
  Button,
  Link,
  Popover,
  PopoverTrigger,
} from '@nextui-org/react';
import pagination from '@/pages/api/workinfos/pagination';
import { TablePagination } from '@/components/common/tablePagination';
import { formatDate } from '@/utils/enums/date'; // <-- Import formatDate here
import { render } from 'react-dom';
// import * as Icon from '@ant-design/icons';

interface FilterState {
  name: string; // Changed from 'ip' to 'name'
  status: string;
}

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<FilterState>({ name: '', status: '' }); // Changed to 'name'
  const [items, setItems] = useState<WorkInfoItem[]>([]);
  const [meta, setMeta] = useState<MetaData>({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(false);

  const fetchWorkInfo = async () => {
    setLoading(true);
    try {
      const { name, status } = filters; // Changed from 'ip' to 'name'
      const { items: fetchedItems, meta: fetchedMeta } = await pagination({
        page,
        limit: rowsPerPage,
        ...(name && { name }), // Updated to filter by 'name'
        ...(status && { status }),
      });

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

  const handleFilterChange = useCallback(
    debounce((updatedFilters) => {
      setPage(1); // Reset to the first page for new filters
      setFilters(updatedFilters);
    }, 500),
    [],
  );

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
  }, [filters, page, rowsPerPage]);

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
                    className="bg-accent1 text-white"
                    key={'create button'}
                  >
                    สร้างข้อมูลการทำงาน
                  </Button>
                </Link>,
              ]}
            />
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
                {/* <div className="bg-white shadow rounded-lg mb-4 mt-4">
                  <div className="flex flex-wrap gap-4">
                    <Input
                      className="flex-1 p-2 text-headFont"
                      labelPlacement="outside"
                      size="lg"
                      name="name"  // Updated the name to 'name'
                      placeholder="ค้นหาชื่อ"  // Updated the placeholder text
                      value={filters.name}  // Updated to bind 'name' instead of 'ip'
                      onChange={(e) => onInputChange('name', e.target.value)}  // Updated to handle 'name'
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 p-4">
                    <Popover placement="bottom" showArrow={true}>
                      <PopoverTrigger>
                        <Button
                          onClick={() => handleStatusChange('')}
                          className="bg-accent1 text-white"
                        >
                          All
                        </Button>
                      </PopoverTrigger>
                      <></>
                    </Popover>

                    <Popover placement="bottom" showArrow={true}>
                      <PopoverTrigger>
                        <Button
                          onClick={() => handleStatusChange('pending')}
                          className=""
                        >
                          <Icon.SyncOutlined spin />
                          Pending
                        </Button>
                      </PopoverTrigger>
                      <></>
                    </Popover>

                    <Popover placement="bottom" showArrow={true}>
                      <PopoverTrigger>
                        <Button
                          onClick={() => handleStatusChange('approved')}
                          className="bg-accent1 text-white"
                        >
                          <Icon.CheckOutlined />
                          Approved
                        </Button>
                      </PopoverTrigger>
                      <></>
                    </Popover>

                    <Popover placement="bottom" showArrow={true}>
                      <PopoverTrigger>
                        <Button
                          onClick={() => handleStatusChange('rejected')}
                          className="bg-accent2 text-white"
                        >
                          <Icon.CloseOutlined />
                          Rejected
                        </Button>
                      </PopoverTrigger>
                      <></>
                    </Popover>
                  </div>
                </div> */}

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
