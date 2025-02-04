'use client';

import Scaffold from '@/components/common/scaffold';
// import debounce from 'lodash/debounce';
import { TopSection } from '@/components/common/topSection';
import Link from 'next/link';
import { Button, Chip } from '@nextui-org/react';
import React from 'react';
import { TablePagination } from '@/components/common/tablePagination';
import pagination from '@/pages/api/user/pagination';

export default function IndexPage() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [filters, setFilters] = React.useState({});
  const [items, setItems] = React.useState([]) as any;
  const [meta, setMeta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  const fetchUser = async () => {
    setLoading(true);
    try {
      // const {} = filters;
      const { items: fetchedItems, meta: fetchedMeta } = await pagination({
        page,
        limit: rowsPerPage,
        // ...(name && { name }),
        // ...(docNo && { docNo }),
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

  // Fetch data whenever filters, page, or rowsPerPage change
  React.useEffect(() => {
    fetchUser();
  },);
  // }, [filters, page, rowsPerPage]);

  return (
    <div>
      {/* Page Header */}
      <Scaffold
        child={
          <div>
            <TopSection
              title="ข้อมูลผู้ใช้"
              buttons={[
                <Link href={'user/new'} key={'create button'}>
                  <Button
                    className="bg-accent1 text-white"
                    key={'create button'}
                  >
                    เพิ่มข้อมูลผูัใช้
                  </Button>
                </Link>,
              ]}
            />

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="mt-6">
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
              </div>
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
    title: 'รูปภาพ',
    dataIndex: 'image',
    render: () => {
      return '-';
    },
  },
  {
    title: 'ชื่อผู้ใช้',
    dataIndex: 'name',
    link: '/admin/user',
    render: (_: any, record: any) => {
      return (
        <Link href={`/admin/user/${record.id}`}>
          {record.profile.firstName}
        </Link>
      );
    },
  },
  { title: 'อีเมล', dataIndex: 'email' },
  {
    title: 'ตำแหน่ง',
    dataIndex: 'position',
    render: (_: any, record: any) => {
      return <span>{record.role?.name}</span>;
    },
  },
  {
    title: 'เบอร์โทรศัพท์',
    dataIndex: 'phone',
    render: (_: any, record: any) => {
      return <span>{record.profile.phone}</span>;
    },
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    render: () => (
      <Chip color="success" variant="bordered">
        พร้อมใช้งาน
      </Chip>
    ),
  },
];
