'use client';

import React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { AdminSideBar } from '../sidebar';

export function ActiveTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = React.useState(
    searchParams?.get('tab') || 'organization',
  );

  React.useEffect(() => {
    setActiveTab(searchParams?.get('tab') || 'organization');
  }, [searchParams]);

  const handleMenuClick = (key: string) => {
    const newUrl = `${pathname}?tab=${key}`;
    router.push(newUrl);
    setActiveTab(key); // อัปเดต state
  };

  return (
    <AdminSideBar
      isSidebarOpen={true}
      activeTab={activeTab}
      handleMenuClick={handleMenuClick}
    />
  );
}
