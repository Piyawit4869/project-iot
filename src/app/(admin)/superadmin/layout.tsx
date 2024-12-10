'use client';

import { SuperAdminSideBar } from '@/components/superadmin/superadminSidebar';
import Image from 'next/image';
import Logo from '../../../../public/logo.png';
import React from 'react';
import { Breadcrumb } from '@/components/common/breadcrumb';
import * as Icon from '@ant-design/icons';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shadow-md">
        <SuperAdminSideBar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <Breadcrumb />
          {/* <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1> */}
          <div className="flex items-center space-x-4">
            <Link href={'#'}>
              <Icon.BellFilled />
            </Link>
            <div className="relative">
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
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
