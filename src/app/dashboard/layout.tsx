'use client';

import { AdminSideBar } from '@/components/admin/adminSidebar';
import Image from 'next/image';
import React, { Suspense } from 'react';
import { Breadcrumb } from '@/components/common/breadcrumb';
import * as Icon from '@ant-design/icons';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
} from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const local =
    typeof window !== 'undefined' ? window.localStorage.getItem('me') : '{}';
  const me = JSON.parse(local || '');

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/login', // Redirect to login page after logout
    });
  };

  React.useEffect(() => {
    if (!me) {
      router.push('/');
    }
  }, []);

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
      <aside className="w-62 bg-primary shadow-md overflow-y-auto">
        <AdminSideBar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between ">
          <Breadcrumb />
          <div className="flex items-center space-x-4">
            <Button key="logout" onPress={handleSignOut}>
              Log Out
            </Button>
            <Dropdown
              showArrow
              classNames={{
                base: 'before:bg-default-200', // change arrow background
                content:
                  'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black',
              }}
            >
              <DropdownTrigger>
                <Icon.BellFilled className="text-headFont" />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown menu with description"
                variant="faded"
              >
                <DropdownSection title="การแจ้งเตือน">
                  <DropdownItem key="new" description="Create new user succeed">
                    New User
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    description="Dalete Notation PO-25010700242"
                  >
                    Delete Notation
                  </DropdownItem>
                  <DropdownItem key="change" description="Change theme Black">
                    Change Theme
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              showArrow
              classNames={{
                base: 'before:bg-default-200', // change arrow background
                content:
                  'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black',
              }}
            >
              <div className="relative">
                <DropdownTrigger>
                  <button className="flex items-center space-x-2">
                    <Image
                      width={100}
                      height={100}
                      src={'/logo.png'} // Replace with the path to your profile image
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-800 text-xs">
                      {`${
                        me?.profile?.firstName ? me?.profile?.firstName : ''
                      } ${me?.profile?.lastName ? me?.profile?.lastName : ''}`}
                    </span>
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
                      <div className="flex">
                        {item.icon}
                        <div className="ml-3 text-xs">{item.label}</div>
                      </div>
                    </Link>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </header>

        {/* Page Content */}
        <main className="bg-gray-100 flex-1 w-full overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="relative flex flex-col items-center space-y-4">
                  {/* Spinner */}
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                  {/* Loading Text */}
                  <p className="text-gray-600 text-lg font-semibold animate-pulse">
                    Loading, please wait...
                  </p>
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
