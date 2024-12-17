'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Icon from '@ant-design/icons';

export function AdminSideBar() {
  const pathname = usePathname();
  const [menuItems, setMenuItems] = React.useState([]);
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState<{
    [key: string]: boolean;
  }>({});

  // Simulate fetching menu data (replace with an actual API call if needed)
  React.useEffect(() => {
    const fetchMenuItems = async () => {
      // Example data structure for menu items
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

  const toggleSubMenu = (key: string) => {
    setIsSubMenuOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex w-[300px]">
      {/* Sidebar */}
      <aside className="w-64 bg-primary shadow-md">
        <div className="flex flex-col items-center py-6">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <h1 className="text-xl font-bold text-primaryFont">Super Admin</h1>
        </div>

        {/* Sidebar Menu with Scrolling */}
        <nav className="flex flex-col h-full p-4 space-y-4 overflow-y-auto max-h-screen">
          {menuItems.map((item: any, index) => (
            <React.Fragment key={index}>
              {/* Main Menu Item */}
              <Link
                key={index}
                href={item.path}
                className={`block px-4 py-2 rounded-md text-lg font-ibm cursor-pointer ${
                  pathname === item.path
                    ? 'bg-primaryFont text-secondaryFont'
                    : 'text-primaryFont hover:bg-primaryFont hover:text-secondaryFont'
                }`}
                onClick={
                  item.subMenu ? () => toggleSubMenu(item.key) : undefined
                }
              >
                <div className="flex justify-between ">
                  <div>
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
                          ? 'bg-primaryFont text-secondaryFont'
                          : 'text-primaryFont hover:bg-primaryFont hover:text-secondaryFont'
                      }`}
                    >
                      <div className="flex gap-1">
                        <div>
                          {subItem.icon}
                          <span className="ml-2">{subItem.name}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
      </aside>
    </div>
  );
}
