'use client';

import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Icon from '@ant-design/icons';

export function AdminSideBar() {
  const pathname = usePathname() ?? ''; // Default value
  const [menuItems, setMenuItems] = useState([]);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<{
    [key: string]: boolean;
  }>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state

  // Fetching menu items (mock data, replace with API if needed)
  useEffect(() => {
    const fetchMenuItems = async () => {
      const menuData: any = [
        {
          name: 'บัญชี',
          key: 'accounting',
          path: '',
          icon: <Icon.DollarOutlined />,
          subMenu: [
            {
              name: 'ภาพรวม',
              path: '/admin/accounting/statement',
              icon: <Icon.FundProjectionScreenOutlined />,
            },
            {
              name: 'รายได้',
              path: '/admin/accounting/revenue',
              icon: <Icon.RiseOutlined />,
            },
            {
              name: 'รายจ่าย',
              path: '/admin/accounting/expenses',
              icon: <Icon.FallOutlined />,
            },
            {
              name: 'วิเคราะห์',
              path: '/admin/accounting/analysis',
              icon: <Icon.AreaChartOutlined />,
            },
          ],
        },
        {
          name: 'กิจกรรมการทำงาน',
          key: 'attendance',
          path: '',
          icon: <Icon.UserOutlined />,
          subMenu: [
            {
              name: 'ภาพรวม',
              path: '/admin/attendance/overview',
              icon: <Icon.ClusterOutlined />,
            },
            {
              name: 'การตั้งค่า',
              path: '/admin/attendance/config_attendance',
              icon: <Icon.SettingOutlined />,
            },
            {
              name: 'ไวท์ลิสต์',
              path: '/admin/attendance/whitelist',
              icon: <Icon.ScheduleOutlined />,
            },
            {
              name: 'การลางาน',
              path: '/admin/attendance/approval',
              icon: <Icon.ScheduleOutlined />,
            },
          ],
        },
        {
          name: 'เอกสาร',
          key: 'notation',
          icon: <Icon.FileTextOutlined />,
          path: '',
          subMenu: [
            {
              name: 'เอกสารทั้งหมด',
              path: '/admin/notation',
              icon: <Icon.FileSearchOutlined />,
            },
          ],
        },
        {
          name: 'ผู้ใช้',
          path: '/admin/user',
          relatedPaths: ['/admin/user/new'],
          icon: <Icon.UserOutlined />,
        },
        {
          name: 'การตั้งค่า',
          key: 'setting',
          path: '/admin/organization',
          icon: <Icon.SettingOutlined />,
        },
      ];
      setMenuItems(menuData);
    };

    fetchMenuItems();
  }, []);

  // Toggle Submenu
  const toggleSubMenu = (key: string) => {
    setIsSubMenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle Sidebar (Mobile & Desktop)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex">
      {/* Sidebar Toggle Button (Visible on Mobile) */}
      <button
        className="lg:hidden fixed bottom-5 left-5 bg-primary text-secondary p-2 rounded-full z-50 shadow-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <Icon.MenuFoldOutlined />
        ) : (
          <Icon.MenuUnfoldOutlined />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-primary shadow-md h-screen lg:w-[230px] fixed lg:relative transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 z-40 lg:block flex flex-col`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center py-6">
          <Image
            src="/logoRome.png"
            alt="Logo"
            width={150}
            height={200}
            className="mb-4"
          />
          <h1 className="text-base font-bold text-primaryFont">Admin</h1>
        </div>

        {/* Sidebar Menu with Scrolling */}
        <nav className="m-4 space-y-1.5 overflow-y-auto max-h-screen -mt-4 pb-6">
          {menuItems.map((item: any, index) => (
            <React.Fragment key={index}>
              {/* Main Menu Item */}
              <Link
                href={item.path}
                className={`block px-4 py-2 rounded-md text-sm font-ibm cursor-pointer flex items-center justify-between ${
                  pathname === item.path ||
                  (Array.isArray(item.relatedPaths) &&
                    item.relatedPaths.some((p: any) => pathname.startsWith(p)))
                    ? 'bg-primaryFont text-secondaryFont'
                    : 'text-primaryFont hover:bg-primaryFont hover:text-secondaryFont'
                }`}
                onClick={
                  item.subMenu ? () => toggleSubMenu(item.key) : undefined
                }
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </div>
                {item.subMenu && (
                  <div>
                    {isSubMenuOpen[item.key] ? (
                      <Icon.CaretUpOutlined />
                    ) : (
                      <Icon.CaretDownOutlined />
                    )}
                  </div>
                )}
              </Link>

              {/* Submenu */}
              {item.subMenu && isSubMenuOpen[item.key] && (
                <div className="px-2 space-y-1.5">
                  {item.subMenu.map((subItem: any, subIndex: number) => (
                    <Link
                      key={subIndex}
                      href={subItem.path}
                      className={`block px-4 py-2 rounded-md text-sm font-ibm flex items-center ${
                        pathname === subItem.path ||
                        pathname.startsWith(subItem.path)
                          ? 'bg-primaryFont text-secondaryFont'
                          : 'text-primaryFont hover:bg-primaryFont hover:text-secondaryFont'
                      }`}
                    >
                      {subItem.icon}
                      <span className="ml-2">{subItem.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
      </aside>

      {/* Overlay for Mobile (Click to close sidebar) */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
