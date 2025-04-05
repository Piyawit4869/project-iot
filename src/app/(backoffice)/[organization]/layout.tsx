/** @format */

"use client";

import { HeaderBreadcrumb } from "@/components/shared/header-breadcrumb";
import { Menu } from "@/components/shared/menu";
import { AppSidebar } from "@/components/shared/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <aside>
          <AppSidebar />
        </aside>
        <main className="flex-1 w-full overflow-y-auto">
          <div className="flex-1 flex flex-col">
            <header className="bg-white shadow p-2 flex items-center justify-between">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <HeaderBreadcrumb />
              </div>
              <div className="flex items-center space-x-4">
                <Menu />
              </div>
            </header>

            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
