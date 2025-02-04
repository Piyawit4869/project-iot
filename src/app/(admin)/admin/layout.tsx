'use client';

import { AdminSideBar } from '@/components/admin/adminSidebar';
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumb } from '@/components/common/breadcrumb';
import { DropdownHead } from '@/components/admin/headDropdown';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      <SidebarProvider open={isSidebarOpen} onOpenChange={setSidebarOpen}>
        {/* ปรับขนาด Sidebar และเพิ่มการเปลี่ยนแปลงแบบลื่นไหล */}
        <aside>
          <AdminSideBar isSidebarOpen={isSidebarOpen} />
        </aside>

        <main className="bg-gray-100 flex-1 w-full overflow-y-auto">
          <div className="flex-1 flex flex-col">
            <header className="bg-white shadow p-4 items-center flex justify-between">
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
              {/* ปุ่มสลับ Sidebar */}
            </header>
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
