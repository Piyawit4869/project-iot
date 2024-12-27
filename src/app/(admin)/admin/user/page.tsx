'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import Link from 'next/link';
import { Button, Chip } from '@nextui-org/react';
import NextTable from '@/components/common/nextTable';
import Image from 'next/image';
import React from 'react';
import { usersLoader } from '@/app/api/user';
import { useRouter } from 'next/navigation';

export default function IndexPage() {
  const [users, setUsers] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await usersLoader();
        setUsers(result.items);
        console.log(result);
      } catch (error: any) {
        console.error('Error fetching notations:', error);
      }
    };

    fetchUsers();
  }, []);

  const row = users.map((user) => ({
    id: user.id,
    image: user.profile.photoUrl,
    username: user.profile.firstName,
    email: user.email,
    position: user.role.name,
    phone: user.profile.phone,
    status: user.role.status,
  }));

  const router = useRouter();
  const handleRowClick = (row: any) => {
    router.push(`user/${row.id}`); // Redirect to a dynamic route
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
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
              <div className="mt-4 mb-4">
                <NextTable
                  columns={columns}
                  rows={row}
                  rowClickHandler={handleRowClick}
                />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

const columns: any = [
  {
    title: 'รูปภาพ',
    dataIndex: 'image',
    render: () => {
      return (
        <Image
          src="/logo.png"
          alt="user"
          className="w-12 h-12 rounded-full"
          width={12}
          height={12}
        />
      );
    },
  },
  { title: 'ชื่อผู้ใช้', dataIndex: 'username' },
  { title: 'อีเมล', dataIndex: 'email' },
  { title: 'ตำแหน่ง', dataIndex: 'position' },
  { title: 'เบอร์โทรศัพท์', dataIndex: 'phone' },
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
