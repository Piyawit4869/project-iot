'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Icon from '@ant-design/icons';

export function AdminSideBar() {
  const pathname = usePathname();
  const [menuItems, setMenuItems] = React.useState([]);
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);
  const [isSubMenu1Open, setIsSubMenu1Open] = React.useState(false);

  // Simulate fetching menu data (replace with an actual API call if needed)
  React.useEffect(() => {
    const fetchMenuItems = async () => {
      // Example data structure for menu items
      const menuData: any = [
        {
          name: 'รายรับ-รายจ่าย',
          path: '',
          icon: <Icon.PieChartOutlined />,
          subMenu: [
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
            {
              name: 'รายรับและรายจ่าย',
              path: '/admin/accounting/index',
              icon: <Icon.ScheduleOutlined />,
            },
          ],
        },
        // {
        //   name: 'ของต้นน้ำ',
        //   path: '/superadmin/user',
        //   icon: <Icon.UserOutlined />,
        //   subMenu: [
        //     {
        //       name: 'รายรับ',
        //       path: '/admin/accounting/revenue',
        //       icon: <Icon.ScheduleOutlined />,
        //     },
        //     {
        //       name: 'รายจ่าย',
        //       path: '/admin/accounting/expenses',
        //       icon: <Icon.ScheduleOutlined />,
        //     },
        //     {
        //       name: 'รายรับและรายจ่าย',
        //       path: '/admin/accounting/index',
        //       icon: <Icon.ScheduleOutlined />,
        //     },
        //   ],
        // },
        {
          name: 'ผู้ใช้',
          path: '/superadmin/user',
          icon: <Icon.UserOutlined />,
        },
        {
          name: 'เอกสาร',
          path: '/superadmin/user',
          icon: <Icon.FileTextOutlined />,
        },
        {
          name: 'ข้อมูลองค์กร',
          path: '/superadmin/user',
          icon: <Icon.SettingOutlined />,
        },
      ];
      setMenuItems(menuData);
    };

    fetchMenuItems();
  }, []);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen); 
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
            <div
              className={`block px-4 py-2 rounded-md text-lg font-ibm cursor-pointer ${
                pathname === item.path
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={item.subMenu ? toggleSubMenu : undefined}
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
            </div>

            {item.subMenu && isSubMenuOpen && (
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