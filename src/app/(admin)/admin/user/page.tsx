'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import Link from 'next/link';
import { Button, Chip } from '@nextui-org/react';
import NextTable from '@/components/common/nextTable';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { usersLoader } from '@/app/api/user';

export default function IndexPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await usersLoader();
        setUsers(result);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);
  console.log(error);
  console.log(isLoading);

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
                  rows={data}
                  // rowClickHandler={handleRowClick}
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
  { title: 'ชื่อผู้ใช้', dataIndex: 'createdBy' },
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

const data = [
  {
    id: 1,
    image: '',
    username: 'chief phuwis',
    gmail: 'phuwisw@threechief.com',
    position: 'employee',
    phone: '0804237373',
    status: 'พร้อมใช้งาน',
  },
  {
    id: 2,
    image: '',
    username: 'K.123',
    gmail: 'phoom1@utotech.org',
    position: 'employee',
    phone: '0804237373',
    status: 'พร้อมใช้งาน',
  },
  {
    id: 3,
    image: '',
    username: 'TRTxQc',
    gmail: 'organization@threechief.com',
    position: 'owner',
    phone: '0804237373',
    status: 'พร้อมใช้งาน',
  },
];
