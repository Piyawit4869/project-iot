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
import pagination from '@/pages/api/whitelists/pagination';
import { TablePagination } from '@/components/common/tablePagination';
import { getWhitelists } from '@/pages/api/whitelists/get';
import * as Icon from '@ant-design/icons';

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
    name: string;
    nation: string;
  };
}

const columns = [
  { title: 'ไอพี', dataIndex: 'ip', link: '/admin/attendance/whitelist' },
  { title: 'ไอเอสพี', dataIndex: 'isp' },
  { title: 'สถานะ', dataIndex: 'status' },
  { title: 'บราวเซอร์', dataIndex: 'browser' },
  { title: 'ระบบปฏิบัติการ', dataIndex: 'os' },
  { title: 'ที่อยู่', dataIndex: 'addressName' },
  { title: 'ประเทศ', dataIndex: 'addressNation' },
  { title: 'สร้างวันที่', dataIndex: 'createdAt' },
];

export default function WhitelistsPage() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<FilterState>({ ip: '', status: '' });
  const [, setWhitelists] = useState<WhitelistItem[]>([]);
  const [items, setItems] = useState<WhitelistItem[]>([]);
  const [meta, setMeta] = useState<MetaData>({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(false);

  const fetchWhitelists = async () => {
    setLoading(true);
    try {
      const result = await getWhitelists();
      setWhitelists(result.items);

      const { ip, status } = filters;
      const { items: fetchedItems, meta: fetchedMeta } = await pagination({
        page,
        limit: rowsPerPage,
        ...(ip && { ip }),
        ...(status && { status }),
      });
      setItems(
        fetchedItems.map((item: WhitelistItem) => ({
          ...item,
          addressName: item.address.name || '',
          addressNation: item.address.nation || '',
        })),
      );
      setMeta(fetchedMeta);
    } catch (error) {
      console.error('Error fetching whitelists:', error);
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

  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };

  const handleStatusChange = (status: string) => {
    const updatedFilters = { ...filters, status };
    handleFilterChange(updatedFilters); // This will trigger the debounced filter change
  };

  useEffect(() => {
    fetchWhitelists();
  }, [filters, page, rowsPerPage]);

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="ไวท์ลิสต์"
              buttons={[
                <Link href={'whitelist/create'} key={'create button'}>
                  <Button className="bg-accent1 text-white" key={'create button'}>
                    สร้างไวท์ลิสต์
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
                <div className="bg-white shadow rounded-lg mb-4 mt-4">
                  <div className="flex flex-wrap gap-4">
                    <Input
                      className="flex-1 p-2 text-headFont"
                      labelPlacement="outside"
                      size="lg"
                      name="name"
                      placeholder="ค้นหา ip"
                      value={filters.ip}
                      onChange={(e) => onInputChange('ip', e.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 p-4">
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
                </div>

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
