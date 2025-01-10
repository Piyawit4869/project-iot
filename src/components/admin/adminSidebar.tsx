'use client';

import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Icon from '@ant-design/icons';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

export function AdminSideBar() {
  const pathname = usePathname() ?? '';
  const [menuItems, setMenuItems] = useState([]);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<{
    [key: string]: boolean;
  }>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const menuData: any = [
      {
        name: 'บัญชี',
        key: 'accounting',
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
        subMenu: [
          {
            name: 'เอกสารทั้งหมด',
            path: '/admin/notation',
            icon: <Icon.FileSearchOutlined />,
          },
        ],
      },
      {
        name: 'สินค้าและบริการ',
        key: 'item',
        icon: <Icon.ProductOutlined />,
        subMenu: [
          {
            name: 'สินค้าและบริการทั้งหมด',
            path: '/admin/item',
            icon: <Icon.AppstoreOutlined />,
          },
        ],
      },
      {
        name: 'ลูกค้า',
        key: 'customer',
        icon: <Icon.SmileOutlined />,
        subMenu: [
          {
            name: 'ลูกค้าทั้งหมด',
            path: '/admin/customer',
            icon: <Icon.SmileOutlined />,
          },
        ],
      },
      { name: 'ผู้ใช้', path: '/admin/user', icon: <Icon.UserOutlined /> },
      {
        name: 'การตั้งค่า',
        key: 'setting',
        path: '/admin/organization',
        icon: <Icon.SettingOutlined />,
      },
    ];

    // Default open submenu based on the current pathname
    const initialSubMenuState: { [key: string]: boolean } = {};
    menuData.forEach((item: any) => {
      if (item.subMenu) {
        const isActive = item.subMenu.some(
          (subItem: any) => subItem.path === pathname,
        );
        if (isActive) {
          initialSubMenuState[item.key] = true;
        }
      }
    });

    setMenuItems(menuData);
    setIsSubMenuOpen(initialSubMenuState); // Set default open state
  }, [pathname]);

  const toggleSubMenu = (key: string) => {
    setIsSubMenuOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex">
      {/* Sidebar Wrapper */}
      <div
        className={`relative h-screen transition-all duration-300 z-50 ${
          isSidebarOpen ? 'w-[230px]' : isMobile ? 'w-[0px]' : 'w-[80px]'
        }`}
      >
        {/* Sidebar */}
        <aside
          className={`bg-primary shadow-md h-screen transition-all duration-300 fixed lg:relative transform flex flex-col overflow-y-auto ${
            isSidebarOpen ? 'w-[230px]' : isMobile ? 'w-[0px]' : 'w-[80px]'
          }`}
        >
          {/* Logo */}
          <div className="flex flex-col items-center py-6">
            <Image
              src="/logoRome.png"
              alt="Logo"
              width={isSidebarOpen ? 150 : 50}
              height={50}
              className="mb-4"
            />
            <h1
              className={`text-base font-bold text-primaryFont ${
                isSidebarOpen ? 'block' : 'hidden'
              }`}
            >
              Admin
            </h1>
          </div>

          {/* Sidebar Menu */}
          <nav
            className={
              isSidebarOpen ? 'm-4 space-y-1.5 -mt-4 pb-6' : 'space-y-1.5'
            }
          >
            {menuItems.map((item: any, index) => (
              <React.Fragment key={index}>
                {/* Expanded Sidebar */}
                {isSidebarOpen ? (
                  <Link
                    href={item.path || '#'}
                    className={`block px-4 py-2 rounded-md text-sm font-ibm cursor-pointer flex items-center justify-between ${
                      pathname === item.path
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
                ) : (
                  /* Collapsed Sidebar (Use Dropdown) */
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="bg-transparent shadow-none hover:bg-gray-300 w-full flex items-center justify-center py-1 rounded-md">
                        <div>{item.icon}</div>
                      </Button>
                    </DropdownTrigger>
                    {item.subMenu && (
                      <DropdownMenu
                        aria-label="Submenu"
                        className="bg-white shadow-lg rounded-md w-[200px] p-2"
                      >
                        {item.subMenu.map((subItem: any, subIndex: number) => (
                          <DropdownItem
                            key={subIndex}
                            className="py-2 hover:bg-gray-100 rounded-md"
                          >
                            <Link
                              href={subItem.path}
                              className="flex items-center gap-3"
                            >
                              {subItem.icon}
                              <span className="text-black">{subItem.name}</span>
                            </Link>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    )}
                  </Dropdown>
                )}

                {/* Submenu for Expanded Sidebar */}
                {item.subMenu && isSubMenuOpen[item.key] && isSidebarOpen && (
                  <div className="pl-4 space-y-1 transition-all">
                    {item.subMenu.map((subItem: any, subIndex: number) => (
                      <Link
                        key={subIndex}
                        href={subItem.path}
                        className={`block px-4 py-2 rounded-md text-sm font-ibm flex items-center ${
                          pathname === subItem.path
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
      </div>

      {/* Collapse Button - Adjusts on Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-[45px] bg-white text-gray-800 shadow-lg p-2 rounded-full hover:bg-gray-700 hover:text-white transition z-[100]"
        style={{
          transition: 'left 0.3s ease-in-out',
          left: isSidebarOpen
            ? isMobile
              ? '230px'
              : '240px'
            : isMobile
            ? '0px'
            : '90px',
        }}
      >
        {isSidebarOpen ? (
          <Icon.MenuFoldOutlined />
        ) : (
          <Icon.MenuUnfoldOutlined />
        )}
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
