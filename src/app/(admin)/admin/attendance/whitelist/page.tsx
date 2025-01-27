'use client';

import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Input, Button, Link, Tabs, Tab } from '@nextui-org/react';
import pagination from '@/pages/api/whitelists/pagination';
import { TablePagination } from '@/components/common/tablePagination';
import { formatDate } from '@/utils/enums/date';
// import * as Icon from '@ant-design/icons';

interface FilterState {
  ip: string;
  status: string;
}

interface MetaData {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface WhitelistItem {
  id: string;
  status: string;
  ip: string;
  createdAt: string;
  browser: string;
  os: string;
  address: {
    country: string;
    province: string;
    city: string;
    subDistrict: string;
    road: string;
    alley: string;
    name: string;
    houseNo: string;
  };
}

const columns = [
  { title: 'ไอพี', dataIndex: 'ip', link: '/admin/attendance/whitelist' },
  { title: 'ไอเอสพี', dataIndex: 'isp' },
  { title: 'สถานะ', dataIndex: 'status' },
  { title: 'บราวเซอร์', dataIndex: 'browser' },
  { title: 'ระบบปฏิบัติการ', dataIndex: 'os' },
  { title: 'ที่อยู่', dataIndex: 'addressName' },
  { title: 'บ้านเลขที', dataIndex: 'addressHouseNo' },
  { title: 'ประเทศ', dataIndex: 'addressCountry' },
  { title: 'จังหวัด', dataIndex: 'addressProvince' },
  { title: 'เขต/อำเภอ', dataIndex: 'addressCity' },
  { title: 'แขวง/ตำบล', dataIndex: 'addressSubdistrict' },
  { title: 'ซอย', dataIndex: 'addressAlley' },
  { title: 'ถนน', dataIndex: 'addressRoad' },
  { title: 'สร้างวันที่', dataIndex: 'createdAtDate' },
];

export default function WhitelistsPage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<FilterState>({ ip: '', status: '' });
  const [items, setItems] = useState<WhitelistItem[]>([]);
  const [meta, setMeta] = useState<MetaData>({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  const fetchWhitelists = async () => {
    setLoading(true);
    try {
      const { ip, status } = filters;
      const { items: fetchedItems, meta: fetchedMeta } = await pagination({
        page,
        limit: rowsPerPage,
        ...(ip && { ip }),
        ...(status && { status }),
      });

      console.log('Fetched Items:', fetchedItems);
      console.log('Fetched Meta:', fetchedMeta);

      setItems(
        fetchedItems.map((item: WhitelistItem) => ({
          ...item,
          addressCountry: item?.address?.country || '',
          addressProvince: item?.address?.province || '',
          addressCity: item?.address?.city || '',
          addressSubdistrict: item?.address?.subDistrict || '',
          addressRoad: item?.address?.road || '',
          addressAlley: item?.address?.alley || '',
          addressHouseNo: item?.address?.houseNo || '',
          addressName: item?.address?.name || '',
          createdAtDate: formatDate(item?.createdAt).date,
        })),
      );
      setMeta(fetchedMeta);
    } catch (error) {
      console.error('Error fetching whitelists:', error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchWhitelists();
  });

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="การเข้าใช้งาน"
              buttons={[
                <Link href={'whitelist/create'} key={'create button'}>
                  <Button
                    className="bg-accent1 text-white"
                    key={'create button'}
                    size="sm"
                  >
                    สร้างการเข้าใช้งาน
                  </Button>
                </Link>,
              ]}
            />

            <div className="bg-white shadow rounded-lg mb-4 mt-4">
              <div className="flex flex-wrap gap-4">
                <Input
                  className="flex-1 p-2 text-headFont"
                  labelPlacement="outside"
                  size="sm"
                  name="name"
                  placeholder="ค้นหา ip"
                  value={filters.ip}
                  onChange={(e) => onInputChange('ip', e.target.value)}
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
