'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Input, Link } from '@nextui-org/react';
import pagination from '@/pages/api/notations/pagination';
import { TablePagination } from '@/components/common/tablePagination';
import {
  handleDocumentStatusTag,
  handleStatusTag,
  handleTypeTag,
} from '@/components/common/common';

export default function NotationsPage() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState({ name: '', docNo: '' });
  const [items, setItems] = React.useState([]) as any;
  const [meta, setMeta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = React.useState(false);

  // Fetch data from the API
  const fetchNotations = async () => {
    setLoading(true);
    try {
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
      console.error('Error fetching notations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced function to handle filter changes
  const handleFilterChange = React.useCallback(
    debounce((updatedFilters) => {
      setPage(1); // Reset to the first page for new filters
      setFilters(updatedFilters);
    }),
    [],
  );

  // Handle input changes
  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };

  // Fetch data whenever filters, page, or rowsPerPage change
  React.useEffect(() => {
    fetchNotations();
  }, [filters, page, rowsPerPage]);

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="เอกสารทั้งหมด"
              buttons={[
                <Link href={'notation/template'} key={'template index button'}>
                  <Button className="bg-accent1 text-white" size="sm">
                    รูปแบบเอกสาร
                  </Button>
                </Link>,
                <Link href={'notation/create'} key={'create button'}>
                  <Button className="bg-accent1 text-white" size="sm">
                    สร้างเอกสาร
                  </Button>
                </Link>,
              ]}
            />
            <div className="bg-white shadow rounded-lg mb-4 mt-4 ">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <Input
                  className="w-full p-2 text-headFont"
                  labelPlacement="outside"
                  size="sm"
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
                  value={filters.docNo}
                  onChange={(e) => onInputChange('docNo', e.target.value)}
                />
              </div>
            </div>

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
  {
    title: 'ประเภทเอกสาร',
    dataIndex: 'type',
    render: (value: string) => {
      return handleTypeTag(value);
    },
  },
  {
    title: 'การดำเนินการ',
    dataIndex: 'status',
    render: (value: string) => {
      return handleStatusTag(value);
    },
  },
  {
    title: 'สถานะเอกสาร',
    dataIndex: 'docStatus',
    render: (value: any) => {
      return handleDocumentStatusTag(value);
    },
  },
];
