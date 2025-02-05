'use client';

import React from 'react';
// import debounce from 'lodash/debounce';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Input, Link } from '@nextui-org/react';
import paginationRoles from '@/pages/api/role/pagination';
import { TablePagination } from '@/components/common/tablePagination';

export default function RolesPage() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters] = React.useState({
    name: '',
  });
  const [items, setItems] = React.useState([]) as any;
  const [meta, setMeta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  // const [loading, setLoading] = React.useState(false);

  // Fetch data from the API
  React.useEffect(() => {
    const fetchCustomer = async () => {
      // setLoading(true);
      try {
        // const { name } = filters;
        const { items: fetchedItems } = await paginationRoles({
          page,
          limit: rowsPerPage,
          // ...(name && { name }),
        });
        setItems(fetchedItems.items);
        setMeta(fetchedItems.meta);
      } catch (error) {
        console.log('Error fetching notations:', error);
      } finally {
        // setLoading(false);
      }
    };
    fetchCustomer();
  }, [page, rowsPerPage]);

  // Debounced function to handle filter changes
  // const handleFilterChange = React.useCallback(
  //   debounce((updatedFilters) => {
  //     setPage(1); // Reset to the first page for new filters
  //     setFilters(updatedFilters);
  //   }),
  //   [],
  // );

  // Handle input changes
  // const onInputChange = (key: keyof typeof filters, value: string) => {
  //   const updatedFilters = { ...filters, [key]: value };
  //   handleFilterChange(updatedFilters);
  // };

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="ตำแหน่งทั้งหมด"
              buttons={[
                <Link href={'role/create'} key={'create button'}>
                  <Button
                    className="bg-accent1 text-white"
                    size="sm"
                    key={'create button'}
                  >
                    สร้างตำแหน่ง
                  </Button>
                </Link>,
              ]}
            />
            <div className="bg-white shadow rounded-lg mb-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-1">
                {/* 🔹 Filter by Company Name */}
                <Input
                  className="w-full p-2 text-headFont"
                  labelPlacement="outside"
                  size="sm"
                  name="name"
                  placeholder="ค้นหาชื่อตำแหน่ง"
                  value={filters.name}
                  isDisabled
                  // onChange={(e) => onInputChange('name', e.target.value)}
                />
              </div>
            </div>

            {/* {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="spinner"></div>
              </div>
            ) : ( */}
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
            {/* )} */}
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}

const columns = [
  {
    title: 'ชื่อตำแหน่ง',
    dataIndex: 'name',
    link: '/backoffice/role',
  },
  {
    title: 'รายละเอียดตำแหน่ง',
    dataIndex: 'description',
  },
];
