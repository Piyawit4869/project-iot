'use client';

import React from 'react';
import Scaffold from '@/components/common/scaffold';
import Image from 'next/image';
import { TopSection } from '@/components/common/topSection';
import Link from 'next/link';
import { Button, Chip } from '@nextui-org/react';
import pagination from '@/pages/api/user/pagination';
import * as Icons from 'lucide-react';
import { Breadcrumb } from '@/components/common/breadcrumb';
import dynamic from 'next/dynamic';
import { SkeletonLoad } from '@/components/backoffice/skeleton/skeleton';

const TablePagination = dynamic(
  () => import('@/components/common/tablePagination'),
  {
    ssr: false,
    loading: () => <SkeletonLoad.Table rowCount={10} columns={columns} />,
  },
);

export default function IndexPage() {
  const [page, setPage] = React.useState(1);
  const [, setLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [items, setItems] = React.useState([]) as any;
  const [meta, setMeta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  React.useEffect(() => {
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

    fetchUser();
  }, [page, rowsPerPage]);

  return (
    <div>
      <div className="fixed mt-6 ml-12 top-0 z-10">
        <Breadcrumb />
      </div>
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
    align: 'center',
    dataIndex: 'image',
    render: (_: any, record: any) => {
      return (
        <Image
          className="rounded-md"
          src={record.profile.photoUrl || '/images/default-profile.png'}
          alt="User profile photo"
          width={50}
          height={50}
        />
      );
    },
  },
  {
    title: 'ชื่อผู้ใช้',
    dataIndex: 'name',
    key: 'name',
    link: '/backoffice/manageUsers/user',
    render: (_: any, record: any) => {
      return (
        <Link
          className="text-accent1 hover:underline"
          href={`/backoffice/manageUsers/user/${record.id}`}
        >
          {record.userName}
        </Link>
      );
    },
  },
  { title: 'รหัสพนักงาน', dataIndex: 'emId', key: 'emId' },
  { title: 'อีเมล', dataIndex: 'email', key: 'email' },
  {
    title: 'ตำแหน่ง',
    align: 'center',
    dataIndex: 'position',
    key: 'position',
    render: (_: any, record: any) => {
      return <span>{record.role?.name}</span>;
    },
  },
  {
    title: 'เบอร์โทรศัพท์',
    dataIndex: 'phone',
    key: 'phone',
    render: (_: any, record: any) => {
      return <span>{record.profile.phone}</span>;
    },
  },
  {
    title: 'สถานะ',
    align: 'center',
    dataIndex: 'status',
    key: 'status',
    render: () => (
      <Chip color="success" variant="bordered">
        พร้อมใช้งาน
      </Chip>
    ),
  },
  {
    title: '',
    dataIndex: 'edit',
    key: 'edit',
    align: 'center',
    render: (_: any, record: any) => (
      <Link href={`/backoffice/manageUsers/user/${record.id}`}>
        <Button className="bg-accent3 text-white" size="sm">
          <Icons.PencilLine />
        </Button>
      </Link>
    ),
  },
];

console.log({});
