'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NextTable from '@/components/common/nextTable';
import Image from 'next/image';
import {
  Button,
  Chip
} from '@nextui-org/react';
import React from 'react';

export default function IndexPage() {
  const router = useRouter();

  const handleRowClick = (row: any) => {
    router.push(`user/${row.id}`); // Redirect to a dynamic route
};

  // Example data for the table
  // const organizations = [
  //   { id: 1, name: 'John Doe', slug: '1', role: 'Owner' },
  //   { id: 2, name: 'Doe John', slug: '2', role: 'Manager' },
  //   { id: 3, name: 'Don joh', slug: '3', role: 'Employee' },
  // ];

  // const handleRowClick = (slug: string) => {
  //   router.push(`user/${slug}`);
  // };

  // const handleNewPageClick = () => {
  //   router.push('user/new');
  // };

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
                    <Button className="bg-accent2 text-white" key={'create button'}>
                      เพิ่มข้อมูลผูัใช้
                    </Button>
                  </Link>,
                ]}
              />
              <div className='mt-4 mb-4'>
                <NextTable
                  columns={columns}
                  rows={data}
                  rowClickHandler={handleRowClick}
                />
              </div>
            </div>
          }
        />
        {/* Table */}
        {/* <div className="bg-white shadow rounded-md overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Username
                </th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr
                  key={org.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(org.slug)}
                >
                  <td className="px-6 py-4 text-gray-700">{org.id}</td>
                  <td className="px-6 py-4 text-gray-700">{org.name}</td>
                  <td className="px-6 py-4 text-gray-700">{org.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}

const columns: any = [
  { title: 'รูปภาพ', 
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
    }
  },
  { title: 'ชื่อผู้ใช้', dataIndex: 'username' },
  { title: 'อีเมล', dataIndex: 'gmail' },
  { title: 'ตำแหน่ง', dataIndex: 'position' },
  { title: 'เบอร์โทรศัพท์', dataIndex: 'phone' },
  { 
    title: 'สถานะ', 
    dataIndex: 'status',
    render: () => (
      <Chip color="success" variant="bordered">
        พร้อมใช้งาน
      </Chip>
    )
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
