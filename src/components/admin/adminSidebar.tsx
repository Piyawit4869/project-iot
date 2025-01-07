'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Icon from '@ant-design/icons';

export function AdminSideBar() {
  const pathname = usePathname() ?? ''; // ใช้ Default Value
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
          key: 'attendance',
          path: '',
          icon: <Icon.UserOutlined />,
          subMenu: [
            {
              name: 'ภาพรวม',
              path: '/admin/attendance/overview',
              icon: <Icon.ScheduleOutlined />,
            },
            {
              name: 'การตั้งค่า',
              path: '/admin/attendance/config_attendance',
              icon: <Icon.ScheduleOutlined />,
            },
            {
              name: 'การเข้าใช้งาน',
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
          path: '/admin/notation',
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

  const toggleSubMenu = (key: string) => {
    setIsSubMenuOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex w-[250px] overflow-x-hidden">
      {/* Sidebar */}
      <aside className="bg-primary shadow-md w-full">
        <div className="flex flex-col items-center py-6">
          {/* Logo */}
          <Image
            src="/logoRome.png"
            alt="Logo"
            width={150}
            height={200}
            className="mb-4"
          />
          <h1 className="text-xl font-bold text-primaryFont">Admin</h1>
        </div>

        {/* Sidebar Menu with Scrolling */}
        <nav className="m-4 space-y-1.5 overflow-y-auto max-h-screen -mt-4 pb-6">
          {menuItems.map((item: any, index) => (
            <React.Fragment key={index}>
              {/* Main Menu Item */}
              <Link
                href={item.path}
                className={`block px-4 py-2 rounded-md text-lg font-ibm cursor-pointer ${
                  pathname === item.path ||
                  (Array.isArray(item.relatedPaths) &&
                    item.relatedPaths.some((p : any) => pathname.startsWith(p)))
                    ? 'bg-primaryFont text-secondaryFont'
                    : 'text-primaryFont hover:bg-primaryFont hover:text-secondaryFont'
                }`}
                onClick={item.subMenu ? () => toggleSubMenu(item.key) : undefined}
              >
                <div className="flex justify-between">
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
                <div className="px-2 space-y-1.5">
                  {item.subMenu.map((subItem: any, subIndex: number) => (
                    <Link
                      key={subIndex}
                      href={subItem.path}
                      className={`block px-4 py-2 rounded-md text-lg font-ibm ${
                        pathname === subItem.path ||
                        pathname.startsWith(subItem.path)
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
