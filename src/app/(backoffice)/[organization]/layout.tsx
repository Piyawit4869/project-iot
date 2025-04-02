"use client";

import { playlists } from "@/components/features/home/data/playlist";
import { Sidebar } from "@/components/shared/sidebar";
import React, { Suspense } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-gray-50">
      <aside className="w-62 shadow-md">
        <Suspense>
          <Sidebar playlists={playlists} className="hidden lg:block" />
        </Suspense>
      </aside>
      <main className="bg-gray-100 flex-1 w-full">
        <div className="flex-1 flex flex-col">
          <Suspense>{children}</Suspense>
        </div>
      </main>
    </div>
  );
}
