'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import * as Icon from '@ant-design/icons';

export function SuperAdminSideBar() {
  const pathname = usePathname();
  const [menuItems, setMenuItems] = React.useState([]);

  // Simulate fetching menu data (replace with an actual API call if needed)
  React.useEffect(() => {
    const fetchMenuItems = async () => {
      // Example data structure for menu items
      const menuData: any = [
        {
          name: 'วิเคราะห์ระบบ',
          path: '/superadmin/analytic',
          icon: <Icon.PieChartOutlined />,
        },
        {
          name: 'องค์กร',
          path: '/superadmin/organization',
          icon: <Icon.ScheduleOutlined />,
        },
        {
          name: 'พนักงาน',
          path: '/superadmin/user',
          icon: <Icon.UserOutlined />,
        },
      ];
      setMenuItems(menuData);
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shadow-md">
        <div className="flex flex-col items-center py-6">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <h1 className="text-xl font-bold text-gray-700">Super Admin</h1>
        </div>

        <nav className="flex flex-col h-full p-2 space-y-1">
          {menuItems.map((item: any, index) => (
            <Link
              key={index}
              href={item.path}
              className={`block px-4 py-2 rounded-md text-lg font-ibm ${
                pathname === item.path
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex gap-1 ">
                {item.icon}
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
