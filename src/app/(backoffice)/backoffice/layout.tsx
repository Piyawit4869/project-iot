'use client';

// import { AdminSideBar } from '@/components/backoffice/sidebar';
import React, { Suspense } from 'react';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { DropdownHead } from '@/components/backoffice/headDropdown';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

// import { useSession } from 'next-auth/react';
import Loading from './loading';
import { AdminSideBar } from '@/components/backoffice/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarProvider open={isSidebarOpen} onOpenChange={setSidebarOpen}>
        <aside className="w-62 bg-primary shadow-md overflow-y-auto">
          <Suspense>
            <AdminSideBar isSidebarOpen={isSidebarOpen} />
          </Suspense>
        </aside>
        <main className="bg-gray-100 flex-1 w-full overflow-y-auto">
          <div className="flex-1 flex flex-col">
            <header className="bg-white shadow p-4 flex items-center justify-between">
              <div className="flex">
                <SidebarTrigger
                  className="cursor-pointer text-primary mr-5 "
                  onClick={() => setSidebarOpen((prev) => !prev)}
                ></SidebarTrigger>

                <Breadcrumb />
              </div>
              <div className="flex items-center space-x-4">
                <DropdownHead />
              </div>
            </header>

            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
