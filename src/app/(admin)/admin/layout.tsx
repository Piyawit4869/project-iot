'use client';

import { AdminSideBar } from '@/components/admin/adminSidebar';
import Image from 'next/image';
import Logo from '../../../../public/logo.png';
import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/common/breadcrumb';
import * as Icon from '@ant-design/icons';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from '@nextui-org/react';
import CardComponent from '@/components/common/card';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items = [
    {
      key: 'profile',
      label: 'โปรไฟล์',
      path: '/admin/profile',
      icon: <Icon.UserOutlined />,
    },
    {
      key: 'setting',
      label: 'ตั้งค่า',
      path: '/admin/profile/setting',
      icon: <Icon.SettingOutlined />,
    },
    {
      key: 'logout',
      label: 'ออกจากระบบ',
      path: '/login',
      icon: <Icon.LogoutOutlined />,
    },
  ];



  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-primary shadow-md overflow-y-auto">
        <AdminSideBar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <Breadcrumb />
          <div className="flex items-center space-x-4">
            <Dropdown 
              showArrow
              classNames={{
                base: "before:bg-default-200", // change arrow background
                content:"py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
              }}
            >
              <div>
                <DropdownTrigger>
                  <Link href={'#'}>
                    <Icon.BellFilled className="text-headFont" />
                  </Link>
                </DropdownTrigger>
              </div>
              <DropdownMenu aria-label="Dynamic Actions">
                <DropdownSection title="การแจ้งเตือน" items={items}>
                {(item) => (
                  <DropdownItem
                    key={item.key}
                    className={
                      item.key === 'delete' ? 'text-danger' : 'text-headFont'
                    }
                    color={item.key === 'delete' ? 'danger' : 'default'}
                  >
                    <CardComponent>
                      
                    </CardComponent>
                  </DropdownItem>
                )}
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>

            <Dropdown 
              showArrow
              classNames={{
                base: "before:bg-default-200", // change arrow background
                content:"py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
              }}
            >
              <div className="relative">
                <DropdownTrigger>
                  <button className="flex items-center space-x-2">
                    <Image
                      src={Logo} // Replace with the path to your profile image
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-600">John Doe</span>
                  </button>
                </DropdownTrigger>
              </div>
              <DropdownMenu aria-label="Dynamic Actions" items={items}>
                {(item) => (
                  <DropdownItem
                    key={item.key}
                    className={
                      item.key === 'delete' ? 'text-danger' : 'text-headFont'
                    }
                    color={item.key === 'delete' ? 'danger' : 'default'}
                  >
                    <Link href={item.path}>
                      <div className='flex'>
                        {item.icon}
                        <div className='ml-3'>
                          {item.label}
                        </div>
                      </div>
                    </Link>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
