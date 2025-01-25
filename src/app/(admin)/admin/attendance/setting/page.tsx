'use client';

import React, { useState, useEffect } from 'react';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Input, Link } from '@nextui-org/react';
import pagination from '@/pages/api/config/pagination';
import { TablePagination } from '@/components/common/tablePagination';
import { formatDate } from '@/utils/enums/date'; // <-- Import formatDate here
import debounce from 'lodash/debounce';

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

interface ConfigItem {
  id: number;
  branchId: string;
  branchName: string;
  workStartTime: string;
  workEndTime: string;
  breakStartTime: string;
  breakEndTime: string;
}

const columns = [
  // {
  //   title: 'ชื่อสาขา',
  //   dataIndex: '',
  //   Link: '/admin/attendance/setting',
  // },
  {
    title: 'id',
    dataIndex: 'id',
    link: '/admin/attendance/setting',
  },
  {
    title: 'เวลาเข้างาน',
    dataIndex: 'workStartTime',
  },
  {
    title: 'เวลาเริ่มพักเบรก',
    dataIndex: 'breakStartTime',
  },
  {
    title: 'เวลาเลิกพักเบรก',
    dataIndex: 'breakEndTime',
  },
  {
    title: 'เวลาเลิกงาน',
    dataIndex: 'workEndTime',
  },
  {
    title: '',
    dataIndex: 'branchId',
    link: '/admin/attendance/setting',
  },
];

export default function SettingAttendancePage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [items, setItems] = useState<ConfigItem[]>([]);
  const [filters, setFilters] = useState<FilterState>({ name: '', status: '' });
  const [meta, setMeta] = useState<MetaData>({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const { name, status } = filters;
      const { items: fetchedItems, meta: fetchedMeta } = await pagination({
        page,
        limit: rowsPerPage,
        ...(name && { name }),
        ...(status && { status }),
      });

      console.log('Fetched Items:', fetchedItems);
      console.log('Fetched Meta:', fetchedMeta);

      setItems(
        fetchedItems.map((item: ConfigItem) => ({
          ...item,
          WorkStart: formatDate(item.workStartTime).time,
          WorkEnd: formatDate(item.workEndTime).time,
          BreakStart: formatDate(item.breakStartTime).time,
          BreakEnd: formatDate(item.breakEndTime).time,
        })),
      );
      setMeta(fetchedMeta);
    } catch (error) {
      console.error('Error fetching work info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = React.useCallback(
    debounce((updatedFilters) => {
      setPage(1); // Reset to the first page for new filters
      setFilters(updatedFilters);
    }),
    [filters, setPage, setFilters],
  );

  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };

  // const handleStatusChange = (status: string) => {
  //   const updatedFilters = { ...filters, status };
  //   handleFilterChange(updatedFilters); // This will trigger the debounced filter change
  // };

  useEffect(() => {
    fetchConfig();
  }, [filters, page, rowsPerPage]);

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="การตั้งค่าการเข้าออกงาน"
              buttons={[
                <Link href={'setting/create'} key={'create-set-button-unique'}>
                  <Button className="bg-accent1 text-white" size="sm">
                    สร้างการตั้งค่า
                  </Button>
                </Link>,
              ]}
            />
            <div className="bg-white shadow rounded-2xl mb-4 mt-4 ">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <Input
                  className="w-full p-2 text-headFont"
                  labelPlacement="outside"
                  size="sm"
                  radius="sm"
                  name="name"
                  placeholder="ค้นหาชื่อ"
                  value={filters.name}
                  onChange={(e) => onInputChange('name', e.target.value)}
                />
                <Input
                  className="w-full p-2 text-headFont"
                  labelPlacement="outside"
                  size="sm"
                  name="docNo"
                  placeholder="ค้นหาหมายเลขเอกสาร"
                  value={filters.status}
                  onChange={(e) => onInputChange('status', e.target.value)}
                />
              </div>
            </div>

            <div>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="spinner"></div>
                </div>
              ) : (
                <TablePagination
                  initialRows={items}
                  initialMeta={meta}
                  rowsPerPage={rowsPerPage}
                  columns={columns as any}
                  onPageChange={(newPage) => setPage(newPage)}
                  onRowsPerPageChange={(newRowsPerPage) =>
                    setRowsPerPage(newRowsPerPage)
                  }
                />
              )}
            </div>
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}
