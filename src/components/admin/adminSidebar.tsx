'use client';

import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarMenuButton,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import React from 'react';
import * as Icons from 'lucide-react';
import { getClientSession } from '@/libs/auth';

const renderIcon = (iconName: string) => {
  const IconComponent = Icons[iconName as keyof typeof Icons] as any;
  return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
};

export function AdminSideBar() {
  const pathname = usePathname() ?? '';
  const [menuItems, setMenuItems] = React.useState([]);
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState({}) as any;
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [open, setOpen] = React.useState(true);
  // const local =
  //   typeof window !== 'undefined' ? window.localStorage.getItem('me') : '{}';
  // const me = JSON.parse(local || '');

  const me = getClientSession();

  console.log({ me });

  React.useEffect(() => {
    const menuData: any = [
      {
        name: 'บัญชี',
        key: 'accounting',
        icon: 'DollarSign',
        subMenu: [
          {
            name: 'ภาพรวม',
            path: '/admin/accounting/statement',
            icon: 'BarChart2',
          },
          {
            name: 'รายได้',
            path: '/admin/accounting/revenue',
            icon: 'TrendingUp',
          },
          {
            name: 'รายจ่าย',
            path: '/admin/accounting/expenses',
            icon: 'TrendingDown',
          },
          {
            name: 'วิเคราะห์',
            path: '/admin/accounting/analysis',
            icon: 'PieChart',
          },
        ],
      },
      {
        name: 'กิจกรรมการทำงาน',
        key: 'attendance',
        icon: 'Users',
        subMenu: [
          { name: 'ภาพรวม', path: '/admin/attendance/overview', icon: 'Grid' },
          {
            name: 'การเข้าทำงาน',
            path: '/admin/attendance/work-infomation',
            icon: 'Briefcase',
          },
          {
            name: 'การเข้าใช้งาน',
            path: '/admin/attendance/whitelist',
            icon: 'FileText',
          },
          {
            name: 'การตั้งค่า',
            path: '/admin/attendance/setting',
            icon: 'Settings',
          },
        ],
      },
      {
        name: 'เอกสาร',
        key: 'notation',
        icon: 'File',
        subMenu: [
          { name: 'เอกสารทั้งหมด', path: '/admin/notation', icon: 'Folder' },
        ],
      },
      {
        name: 'สินค้าและบริการ',
        key: 'item',
        icon: 'Package',
        subMenu: [
          {
            name: 'สินค้าและบริการทั้งหมด',
            path: '/admin/item',
            icon: 'Archive',
          },
        ],
      },
      {
        name: 'ลูกค้า',
        key: 'customer',
        icon: 'Smile',
        subMenu: [
          { name: 'ลูกค้าทั้งหมด', path: '/admin/customer', icon: 'Users' },
        ],
      },
      {
        name: 'จัดการพนักงาน',
        key: 'user',
        icon: 'User',
        subMenu: [
          { name: 'พนักงาน', path: '/admin/user', icon: 'UserCheck' },
          { name: 'ตำแหน่ง', path: '/admin/role', icon: 'Grid' },
        ],
      },
      {
        name: 'การตั้งค่า',
        key: 'setting',
        icon: 'Settings',
        subMenu: [
          {
            name: 'การตั้งค่าองค์กร',
            path: '/admin/organization',
            icon: 'Settings',
          },
        ],
      },
    ];

    // Set all submenus to open by default
    const initialSubMenuState: any = {};
    menuData.forEach((item: any) => {
      if (item.subMenu) {
        initialSubMenuState[item.key] = true;
      }
    });

    setMenuItems(menuData);
    setIsSubMenuOpen(initialSubMenuState);
  }, [pathname]);

  const toggleSubMenu = (key: any) => {
    setIsSubMenuOpen((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  // const toggleSidebar = () => {
  //   setIsSidebarOpen((prev) => !prev);
  // };

  return (
    <SidebarProvider
      defaultOpen={true}
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
      }}
    >
      <Sidebar>
        <div className="flex items-center justify-start p-2">
          <img
            src={me?.organization?.logoUrl} // Replace with your actual logo path in the `public` folder
            alt="Logo"
            width={50}
            height={50}
            className="mr-2 w-10 h-10 rounded-lg"
          />
          {isSidebarOpen && (
            <span className="text-lg font-bold">
              บริษัท {me?.organization?.nameTh} จำกัด
            </span>
          )}
        </div>
        <div className="flex items-center justify-between p-2">
          {isSidebarOpen && (
            <SidebarMenu>
              <SidebarGroupLabel>Core features</SidebarGroupLabel>
              {menuItems.map((item: any) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton onClick={() => toggleSubMenu(item.key)}>
                    {renderIcon(item.icon)}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                  {item.subMenu && isSubMenuOpen[item.key] && (
                    <SidebarMenuSub>
                      {item.subMenu.map((subItem: any) => (
                        <SidebarMenuSubButton
                          key={subItem.path}
                          href={subItem.path}
                          isActive={pathname === subItem.path}
                        >
                          {renderIcon(subItem.icon)}
                          <span>{subItem.name}</span>
                        </SidebarMenuSubButton>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          )}
        </div>
      </Sidebar>
    </SidebarProvider>
  );
}
