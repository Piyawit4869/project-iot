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
import React, { useCallback } from 'react';
import * as Icons from 'lucide-react';
import { useClientSession } from '@/libs/auth';

const renderIcon = (iconName: string) => {
  const IconComponent = Icons[iconName as keyof typeof Icons] as any;
  return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
};

export function AdminSideBar() {
  const pathname = usePathname() ?? '';
  const [isSidebarOpen] = React.useState(true);
  const [open, setOpen] = React.useState(true);

  const me = useClientSession();
  console.log(me);

  const menuData: any = React.useMemo(
    () => [
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
        icon: 'UsersRound',
        subMenu: [
          {
            name: 'ภาพรวม',
            path: '/admin/attendance/overview',
            icon: 'LayoutPanelLeft',
          },
          {
            name: 'การเข้าทำงาน',
            path: '/admin/attendance/work-infomation',
            icon: 'BriefcaseBusiness',
          },
          {
            name: 'การเข้าใช้งาน',
            path: '/admin/attendance/whitelist',
            icon: 'ShieldCheck',
          },
          {
            name: 'การตั้งค่า',
            path: '/admin/attendance/setting',
            icon: 'Settings2',
          },
        ],
      },
      {
        name: 'เอกสาร',
        key: 'notation',
        icon: 'Folder',
        subMenu: [
          { name: 'เอกสารทั้งหมด', path: '/admin/notation', icon: 'FileType2' },
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
            icon: 'Package2',
          },
        ],
      },
      {
        name: 'ลูกค้า',
        key: 'customer',
        icon: 'UserRound',
        subMenu: [
          {
            name: 'ลูกค้าทั้งหมด',
            path: '/admin/customer',
            icon: 'UsersRound',
          },
        ],
      },
      {
        name: 'จัดการพนักงาน',
        key: 'user',
        icon: 'UserRoundPen',
        subMenu: [
          { name: 'พนักงาน', path: '/admin/user', icon: 'UserRoundCheck' },
          { name: 'ตำแหน่ง', path: '/admin/role', icon: 'UserRoundCog' },
          {
            name: 'ตำแหน่งพนักงาน',
            path: '/admin/employeeRole',
            icon: 'UserRoundCog',
          },
        ],
      },
      {
        name: 'การตั้งค่า',
        key: 'setting',
        icon: 'Bolt',
        subMenu: [
          {
            name: 'การตั้งค่าองค์กร',
            path: '/admin/organization',
            icon: 'Settings2',
          },
        ],
      },
    ],
    [],
  );

  const initialSubMenuState = React.useMemo(() => {
    const state: any = {};
    menuData.forEach((item: any) => {
      if (item.subMenu) {
        state[item.key] = true;
      }
    });
    return state;
  }, [menuData]);
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(initialSubMenuState);

  const toggleSubMenu = useCallback((key: string) => {
    setIsSubMenuOpen((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return (
    <SidebarProvider
      defaultOpen={true}
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
      }}
    >
      <Sidebar>
        <div className="flex items-center justify-start py-5 px-5">
          <img
            src={me?.organization?.logoUrl}
            alt="Logo"
            width={50}
            height={50}
            className="mr-2 w-10 h-10 rounded-xl"
          />
          {isSidebarOpen && (
            <span className="font-bold text-lg ">
              บริษัท {me?.organization?.nameTh} จำกัด
            </span>
          )}
        </div>
        <div className="flex items-center justify-between px-4">
          {isSidebarOpen && (
            <SidebarMenu>
              <SidebarGroupLabel className="text-accent1 py-2">
                All features
              </SidebarGroupLabel>
              {menuData.map((item: any) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => toggleSubMenu(item.key)}
                    className="py-5"
                  >
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
                          className="py-4"
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
