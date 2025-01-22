'use client';

import { AdminSideBar } from '@/components/admin/adminSidebar';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { Breadcrumb } from '@/components/common/breadcrumb';
import * as Icon from '@ant-design/icons';
import { DropdownHead } from '@/components/admin/headDropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

// import { useSession } from 'next-auth/react';
import Loading from './loading';
import { getClientSession } from '@/libs/auth';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const me = getClientSession();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/login', // Redirect to login page after logout
    });
  };

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
      onclick: handleSignOut,
      path: '',
      icon: <Icon.LogoutOutlined />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-62 bg-primary shadow-md overflow-y-auto">
        <AdminSideBar />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex items-center justify-between ">
          <Breadcrumb />
          <div className="flex items-center space-x-4">
            <DropdownHead />
          </div>
        </header>

        <main className="bg-gray-100 flex-1 w-full overflow-y-auto">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}