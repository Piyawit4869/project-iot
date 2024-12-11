'use client';

import { AdminSideBar } from '@/components/admin/adminSidebar';
import Image from 'next/image';
import Logo from '../../../../public/logo.png';
import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/common/breadcrumb';
import * as Icon from '@ant-design/icons';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items = [
    {
      key: "new",
      label: "New file",
      path: '/admin/accounting/revenue',
      icon: <Icon.ScheduleOutlined />,

    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shadow-md">
        <AdminSideBar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <Breadcrumb />
          {/* <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1> */}
          <div className="flex items-center space-x-4">
            <Dropdown>
              <div>
                <DropdownTrigger>
                  <Link href={'#'}>
                    <Icon.BellFilled />
                  </Link>
                </DropdownTrigger>
              </div>
              <div>
                <DropdownMenu aria-label="Dynamic Actions" items={items}>
                    {(item) => (
                      <DropdownItem
                        key={item.key}
                        className={item.key === "delete" ? "text-danger" : ""}
                        color={item.key === "delete" ? "danger" : "default"}
                      >
                        {item.label}
                      </DropdownItem>
                    )}
                </DropdownMenu>
              </div>
            </Dropdown>

            <Dropdown>
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
                  {/* Dropdown (optional) */}

                  {/* Add dropdown menu logic here if needed */}
                </DropdownTrigger>
                </div>
                <DropdownMenu aria-label="Dynamic Actions" items={items}>
                  {(item) => (
                    <DropdownItem
                      key={item.key}
                      className={item.key === "delete" ? "text-danger" : ""}
                      color={item.key === "delete" ? "danger" : "default"}
                    >
                      {item.label}
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
