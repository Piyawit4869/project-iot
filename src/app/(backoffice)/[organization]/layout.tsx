"use client";

import AdminSidebar from "@/components/shared/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div className="flex h-screen">
    //   <SidebarProvider>
    //     <aside className="bg-primary shadow-md overflow-y-auto">
    //       <AppSidebar />
    //     </aside>
    //     <main className="flex-1 w-full overflow-y-auto">
    //       <div className="flex-1 flex flex-col">
    //         <header className="bg-white shadow p-2 flex items-center justify-between">
    //           <div className="flex">
    //             <SidebarTrigger className="-ml-1" />
    //           </div>
    //           <div className="flex items-center space-x-4">{/* Header */}</div>
    //         </header>

    //         {children}
    //       </div>
    //     </main>
    //   </SidebarProvider>
    // </div>

    <div className="flex h-screen">
      {/* <aside className="bg-primary shadow-md overflow-y-auto"> */}
      <AdminSidebar />
      {/* </aside> */}
      <main className="flex-1 w-full overflow-y-auto">
        <div className="flex-1 flex flex-col">
          {/* <header className="bg-white shadow p-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">{/* Header </div>
            </header> */}

          {children}
        </div>
      </main>
    </div>
  );
}
