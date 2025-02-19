'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Input, Tabs, Tab } from '@nextui-org/react';
import pagination from '@/pages/api/approval/pagination';
import { TablePagination } from '@/components/common/tablePagination';
//function helper
import { formatDate } from '@/utils/enums/date';
// import * as Icon from '@ant-design/icons';

interface FilterState {
  createdBy: string;
  status: string;
}

interface MetaData {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface ApprovalItem {
  status: string;
  type: string;
  reasons: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  approvedBy: string;
  rejectedBy: string;
  createdBy: string;
}

const columns = [
  {
    title: 'ชื่อ',
    dataIndex: 'createdBy',
    link: '/backoffice/attendance/approval',
  },
  { title: 'สถานะ', dataIndex: 'status' },
  { title: 'ประเภทการลา', dataIndex: 'type' },
  { title: 'เหตุผล', dataIndex: 'reasons' },
  { title: 'วันที่ลา', dataIndex: 'createdAtDate' },
  { title: 'ตั้งแต่วันที่', dataIndex: 'startDated' },
  { title: 'ถึงวันที่', dataIndex: 'endDated' },
  { title: 'อนุญาตโดย', dataIndex: 'approvedBy' },
  { title: 'ปฏิเสธโดย', dataIndex: 'rejectedBy' },
];

export default function ApprovalPages() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState<FilterState>({
    createdBy: '',
    status: '',
  });
  const [items, setItems] = React.useState<ApprovalItem[]>([]);
  const [meta, setMeta] = React.useState<MetaData>({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  React.useEffect(() => {
    const fetchWhitelists = async () => {
      setLoading(true);
      try {
        const { createdBy, status } = filters;
        const { items: fetchedItems, meta: fetchedMeta } = await pagination({
          page,
          limit: rowsPerPage,
          ...(createdBy && { createdBy }),
          ...(status && { status }),
        });

        setItems(
          fetchedItems.map((item: ApprovalItem) => ({
            ...item,
            createdAtDate: formatDate(item?.createdAt).date,
            startDated: formatDate(item?.startDate).date,
            endDated: formatDate(item?.endDate).date,
          })),
        );
        setMeta(fetchedMeta);
      } catch (error) {
        console.error('Error fetching whitelists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWhitelists();
  }, [page, rowsPerPage, filters]);

  // Debounced function to handle filter changes
  const handleFilterChange = React.useCallback((updatedFilters: any) => {
    debounce(() => {
      setPage(1); // Reset to the first page for new filters
      setFilters(updatedFilters);
    }, 300)();
  }, []);

  const colors = ['secondary'];

  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };

  const handleTabChange = (status: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, status }));
  };

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection title="การลา" />

            <div className="bg-white shadow rounded-lg mb-4 mt-4">
              <div className="flex flex-wrap gap-4">
                <Input
                  className="flex-1 p-2 text-headFont"
                  labelPlacement="outside"
                  size="sm"
                  name="name"
                  placeholder="ค้นหาชื่อ"
                  value={filters.createdBy}
                  onChange={(e) => onInputChange('createdBy', e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 p-2">
              <div className="flex w-full flex-col">
                {colors.map((color) => (
                  <Tabs
                    key={color}
                    color={'secondary'}
                    selectedKey={filters.status}
                    radius="full"
                    aria-label="Tabs colors"
                    onSelectionChange={(key) => handleTabChange(key as string)}
                  >
                    <Tab key="" title="All" />
                    <Tab key="pending" title="Pending" />
                    <Tab key="approved" title="Approved" />
                    <Tab key="rejected" title="Rejected" />
                  </Tabs>
                ))}
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
                  columns={columns as any}
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
