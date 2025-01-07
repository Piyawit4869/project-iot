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
      const transformedItems = result.items.map((item: WhitelistItem) => ({
        ...item,
        addressName: item.address.name || '',addressNation: item.address.nation || '',
      }));
      console.log(result.items)
      // console.log(result.items.address.name)
      // console.log(result.items);
      // const Items = result.items.map((v : any) =>  v)
      // const Items = result.items[0].address.name
      // console.log(Items)
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

  // Handle input changes
  const onInputChange = (key: keyof FilterState, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };

  // Fetch data whenever filters, page, or rowsPerPage change
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
            <div className="bg-white shadow rounded-lg mb-4 mt-4">
              <div className="flex flex-wrap gap-4">
                <Input
                  className="flex-1 p-2 text-headFont"
                  labelPlacement="outside"
                  size="lg"
                  name="name"
                  placeholder="ค้นหาชื่อ"
                  value={filters.ip}
                  onChange={(e) => onInputChange('ip', e.target.value)}
                />
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="spinner"></div>{' '}
                {/* Make sure to style this spinner */}
              </div>
            ) : (
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
            )}
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}
