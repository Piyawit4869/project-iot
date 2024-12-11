'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Icon from '@ant-design/icons';

export function AdminSideBar() {
  const pathname = usePathname();
  const [menuItems, setMenuItems] = React.useState([]);
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState<{ [key: string]: boolean }>({});


  // Simulate fetching menu data (replace with an actual API call if needed)
  React.useEffect(() => {
    const fetchMenuItems = async () => {
      // Example data structure for menu items
      const menuData: any = [
        {
          name: 'บัญชี',
          key: 'accounting',
          path: '',
          icon: <Icon.PieChartOutlined />,
          subMenu: [
            {
              name: 'สรุปผล',
              path: '/admin/accounting/',
              icon: <Icon.ScheduleOutlined />,
            },
            {
              name: 'รายรับและรายจ่าย',
              path: '/admin/accounting/statement',
              icon: <Icon.ScheduleOutlined />,
            },
            {
              name: 'รายรับ',
              path: '/admin/accounting/revenue',
              icon: <Icon.ScheduleOutlined />,
            },
            {
              name: 'รายจ่าย',
              path: '/admin/accounting/expenses',
              icon: <Icon.ScheduleOutlined />,
            },
          ],
        },
        {
          name: 'กิจกรรมการทำงาน',
          key: 'activity',
          path: '',
          icon: <Icon.UserOutlined />,
          subMenu: [
            {
              name: 'ภาพรวม',
              path: '/admin/activity/attendance',
              icon: <Icon.ScheduleOutlined />,
            },
            {
              name: 'การเข้าออกงาน',
              path: '/admin/activity/attendance/action',
              icon: <Icon.ScheduleOutlined />,
            },
            {
              name: 'การลางาน',
              path: '/admin/activity/approval',
              icon: <Icon.ScheduleOutlined />,
            },
            {
              name: 'การนัดหมาย',
              path: '/admin/activity/appointment',
              icon: <Icon.ScheduleOutlined />,
            },
          ],
        },
        {
          name: 'ผู้ใช้',
          path: '/admin/user',
          icon: <Icon.UserOutlined />,
        },
        {
          name: 'เอกสาร',
          path: '/admin/notation',
          icon: <Icon.FileTextOutlined />,
        },
        {
          name: 'ข้อมูลองค์กร',
          path: '/admin/organization',
          icon: <Icon.SettingOutlined />,
        },
      ];
      setMenuItems(menuData);
    };

    fetchMenuItems();
  }, []);

  const toggleSubMenu = (key: string) => {
    setIsSubMenuOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    })); 
  };

  return (
    <div className="flex ">
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

        <nav className="flex flex-col h-full p-4 space-y-4">
          {menuItems.map((item: any, index) => (
            <React.Fragment key={index}>
            {/* Main Menu Item */}
            <Link
              key={index}
              href={item.path}
              className={`block px-4 py-2 rounded-md text-lg font-ibm cursor-pointer ${
                pathname === item.path
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={item.subMenu ? () => toggleSubMenu(item.key) : undefined}
            >
              <div className="flex gap-1">
                {item.icon}
                {item.name}
                  {item.subMenu && (
                    <div>
                      {isSubMenuOpen ? (
                        <Icon.CaretUpOutlined />
                      ) : (
                        <Icon.CaretDownOutlined />
                      )}
                    </div>
                  )}
              </div>
            </Link>

            {item.subMenu && isSubMenuOpen[item.key] && (
              <div className="pl-6 space-y-2">
                {item.subMenu.map((subItem: any, subIndex: number) => (
                  <Link
                    key={subIndex}
                    href={subItem.path}
                    className={`block px-4 py-2 rounded-md text-lg font-ibm ${
                      pathname === subItem.path
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex gap-1">
                      {subItem.icon}
                      {subItem.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </React.Fragment>
          ))}
            {/* <Link
              href="/admin/user"
              className={`block px-4 py-2 rounded-md text-lg font-medium ${
                pathname === '/superadmin/user'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              User
            </Link> */}
        </nav>
      </aside>
    </div>
  );
}