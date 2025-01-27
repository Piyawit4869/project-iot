'use client';

import { AdminSideBar } from '@/components/admin/adminSidebar';
import React, { Suspense } from 'react';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { DropdownHead } from '@/components/admin/headDropdown';

// import { useSession } from 'next-auth/react';
import Loading from './loading';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-62 bg-primary shadow-md overflow-y-auto">
        <AdminSideBar />
      </aside>
      <main className="bg-gray-100 flex-1 w-full overflow-y-auto">
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow p-4 items-center flex justify-between ">
            <Breadcrumb />
            <div className="flex items-center space-x-4">
              <DropdownHead />
            </div>
          </header>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </main>
    </div>
  );
}
