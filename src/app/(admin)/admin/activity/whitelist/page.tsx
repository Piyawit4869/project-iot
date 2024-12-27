'use client';

import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Input } from '@nextui-org/react';
import pagination from '@/pages/api/whitelists/pagination';
import { TablePagination } from '@/components/common/tablePagination';
import { whitelistsLoader } from '@/app/api/whitelists';

// TypeScript Types
interface FilterState {
  name: string;
  docNo: string;
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
}

export default function WhitelistsPage() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<FilterState>({ name: '', docNo: '' });
  const [whitelists, setWhitelists] = useState<WhitelistItem[]>([]);
  const [items, setItems] = useState<WhitelistItem[]>([]);
  const [meta, setMeta] = useState<MetaData>({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(false);

  // Fetch data from the API
  const fetchWhitelists = async () => {
    setLoading(true);
    try {
      // Fetch whitelist general data
      const result = await whitelistsLoader();
      setWhitelists(result.items);

      // Fetch paginated data with filters
      const { name, docNo } = filters;
      const { items: fetchedItems, meta: fetchedMeta } = await pagination({
        page,
        limit: rowsPerPage,
        ...(name && { name }),
        ...(docNo && { docNo }),
      });
      setItems(fetchedItems);
      setMeta(fetchedMeta);
    } catch (error) {
      console.error('Error fetching whitelists:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced function to handle filter changes
  const handleFilterChange = useCallback(
    debounce((updatedFilters: FilterState) => {
      setPage(1); // Reset to the first page for new filters
      setFilters(updatedFilters);
    }, 500), // Debounce delay (500ms)
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
            <TopSection title="ไวท์ลิสต์" />
            <div className="bg-white shadow rounded-lg mb-4 mt-4">
              <div className="flex flex-wrap gap-4">
                <Input
                  className="flex-1 p-2 text-headFont"
                  labelPlacement="outside"
                  size="lg"
                  name="name"
                  placeholder="ค้นหาชื่อ"
                  value={filters.name}
                  onChange={(e) => onInputChange('name', e.target.value)}
                />
                <Input
                  className="flex-1 p-2 text-headFont"
                  labelPlacement="outside"
                  size="lg"
                  name="docNo"
                  placeholder="ค้นหาหมายเลขเอกสาร"
                  value={filters.docNo}
                  onChange={(e) => onInputChange('docNo', e.target.value)}
                />
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="spinner"></div> {/* Make sure to style this spinner */}
              </div>
            ) : (
              <TablePagination
                initialRows={items}
                initialMeta={meta}
                rowsPerPage={rowsPerPage}
                columns={columns}
                onPageChange={(newPage) => setPage(newPage)}
                onRowsPerPageChange={(newRowsPerPage) => setRowsPerPage(newRowsPerPage)}
              />
            )}
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}

// Table Columns
const columns = [
  {
    title: 'ไอดี',
    dataIndex: 'id',
  },
  { title: 'สถานะ', dataIndex: 'status' },
  { title: 'ไอพี', dataIndex: 'ip' },
  { title: 'สร้างวันที่', dataIndex: 'createdAt' },
  { title: 'บราวเซอร์', dataIndex: 'browser' },
  { title: 'ระบบปฏิบัติการ', dataIndex: 'os' },
];
