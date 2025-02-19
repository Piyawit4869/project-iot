'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Input, Link } from '@nextui-org/react';
import paginationItems from '@/pages/api/items/pagination';
import TablePagination from '@/components/common/tablePagination';
import { Breadcrumb } from '@/components/common/breadcrumb';

export default function ItemsPage() {
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
  React.useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const { name, docNo } = filters;
        const { items: fetchedItems, meta: fetchedMeta } =
          await paginationItems({
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
    fetchItems();
  }, [page, rowsPerPage, filters]);

  // Debounced function to handle filter changes
  const handleFilterChange = React.useCallback((updatedFilters: any) => {
    debounce(() => {
      setPage(1); // Reset to the first page for new filters
      setFilters(updatedFilters);
    }, 300)();
  }, []);

  // Handle input changes
  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };

  return (
    <div>
      <div className="fixed mt-6 ml-12 top-0 z-10">
        <Breadcrumb />
      </div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="สินค้าและบริการทั้งหมด"
              buttons={[
                <Link href={'item/create'} key={'create button'}>
                  <Button
                    className="bg-accent1 text-white"
                    size="sm"
                    key={'create button'}
                  >
                    สร้างสินค้าและบริการ
                  </Button>
                </Link>,
              ]}
            />
            <div className="bg-white shadow rounded-lg mb-4 mt-4 ">
              <div className="grid grid-cols-1 sm:grid-cols-1">
                <Input
                  className="w-full p-2 text-headFont"
                  labelPlacement="outside"
                  size="sm"
                  name="name"
                  placeholder="ค้นหาชื่อ"
                  value={filters.name}
                  onChange={(e) => onInputChange('name', e.target.value)}
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
    title: 'ชื่อสินค้าและบริการ',
    dataIndex: 'name',
    link: '/backoffice/item',
  },
  {
    title: 'จำนวน',
    dataIndex: 'quantity',
  },
  {
    title: 'ราคาต่อชิ้น',
    dataIndex: 'unitPrice',
  },
  {
    title: 'ราคารวม',
    dataIndex: 'total',
  },
  {
    title: 'ส่วนลด',
    dataIndex: 'discount',
  },
  {
    title: 'รายละเอียด',
    dataIndex: 'description',
  },
];
