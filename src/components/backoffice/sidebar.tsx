import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarContent,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react';
import * as Icons from 'lucide-react';
import { useClientSession } from '@/libs/auth';
import Image from 'next/image';
import Link from 'next/link';
import { isMenuActive } from '../common/common';
import {
  Collapsible,
  // CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { ChevronRight } from 'lucide-react';

const renderIcon = (iconName: string) => {
  const IconComponent = Icons[iconName as keyof typeof Icons] as any;
  return IconComponent ? <IconComponent className="w-10 h-10" /> : null;
};

export function AdminSideBar({
  isSidebarOpen,
  ...props
}: { isSidebarOpen: boolean } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname() ?? '';
  const me = useClientSession();
  const menuData: any = React.useMemo(
    () => [
      {
        name: 'ภาพรวม',
        key: 'home',
        icon: 'House',
        path: '/backoffice',
        isActive: false,
      },
      {
        name: 'บัญชี',
        key: 'accounting',
        icon: 'DollarSign',
        isActive: false,
        subMenu: [
          {
            name: 'ภาพรวม',
            path: '/backoffice/accounting/statement',
            icon: 'BarChart2',
            isActive: false,
          },
          {
            name: 'รายได้',
            path: '/backoffice/accounting/revenue',
            icon: 'TrendingUp',
            isActive: false,
          },
          {
            name: 'รายจ่าย',
            path: '/backoffice/accounting/expenses',
            icon: 'TrendingDown',
            isActive: false,
          },
          {
            name: 'วิเคราะห์',
            path: '/backoffice/accounting/analysis',
            icon: 'PieChart',
            isActive: false,
          },
        ],
      },
      {
        name: 'กิจกรรมการทำงาน',
        key: 'attendance',
        icon: 'UsersRound',
        isActive: false,
        subMenu: [
          {
            name: 'ภาพรวม',
            path: '/backoffice/attendance/overview',
            icon: 'LayoutPanelLeft',
            isActive: false,
          },
          {
            name: 'การเข้าทำงาน',
            path: '/backoffice/attendance/work-infomation',
            icon: 'BriefcaseBusiness',
            isActive: false,
          },
          {
            name: 'การเข้าใช้งาน',
            path: '/backoffice/attendance/whitelist',
            icon: 'ShieldCheck',
            isActive: false,
          },
          {
            name: 'การตั้งค่า',
            path: '/backoffice/attendance/setting',
            icon: 'Settings2',
            isActive: false,
          },
        ],
      },
      {
        name: 'เอกสาร',
        key: 'notation',
        icon: 'Folder',
        isActive: false,
        subMenu: [
          {
            name: 'เอกสารทั้งหมด',
            path: '/backoffice/notation',
            icon: 'FileType2',
            isActive: false,
          },
        ],
      },
      {
        name: 'สินค้าและบริการ',
        key: 'item',
        icon: 'Package',
        isActive: false,
        subMenu: [
          {
            name: 'สินค้าและบริการทั้งหมด',
            path: '/backoffice/item',
            icon: 'Package2',
            isActive: false,
          },
        ],
      },
      {
        name: 'ลูกค้า',
        key: 'customer',
        icon: 'UserRound',
        isActive: false,
        subMenu: [
          {
            name: 'ลูกค้าทั้งหมด',
            path: '/backoffice/customer',
            icon: 'UsersRound',
            isActive: false,
          },
        ],
      },
      {
        name: 'จัดการพนักงาน',
        key: 'user',
        icon: 'UserRoundPen',
        isActive: false,
        subMenu: [
          {
            name: 'พนักงาน',
            path: '/backoffice/user',
            icon: 'UserRoundCheck',
            isActive: false,
          },
          {
            name: 'ตำแหน่ง',
            path: '/backoffice/role',
            icon: 'UserRoundCog',
            isActive: false,
          },
          {
            name: 'ตำแหน่งพนักงาน',
            path: '/backoffice/employeeRole',
            icon: 'UserRoundCog',
            isActive: false,
          },
        ],
      },
      {
        name: 'การตั้งค่า',
        key: 'setting',
        icon: 'Bolt',
        isActive: false,
        subMenu: [
          {
            name: 'การตั้งค่าองค์กร',
            path: '/backoffice/organization',
            icon: 'Settings2',
            isActive: false,
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
        state[item.key] = item.subMenu.some((subItem: any) =>
          pathname.startsWith(subItem.path),
        );
      }
    });
    return state;
  }, [menuData, pathname]);

  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(initialSubMenuState);

  // const isMenuActive = (path: string) => pathname.startsWith(path);

  // console.log(pathname);

  // const splitPath = pathname.split('/');
  // console.log(splitPath[2]);

  // if (splitPath.length > 2) {
  //   console.log(splitPath[3]);
  // }

  const toggleSubMenu = useCallback((key: string, open?: boolean) => {
    setIsSubMenuOpen((prev: any) => ({
      ...prev,
      [key]: open !== undefined ? open : !prev[key],
    }));
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div
          className={`flex items-center py-4 transition-all duration-300 ${
            isSidebarOpen ? 'justify-start px-2' : 'justify-center'
          }`}
        >
          <Link href="/backoffice">
            <Image
              src={me?.organization?.logoUrl || '/path/to/fallback-logo.png'}
              alt="Logo"
              width={40}
              height={40}
              className="rounded-xl hover:scale-110"
            />
          </Link>
          {isSidebarOpen && (
            <span className="ml-2 font-bold text-lg transition-opacity duration-300 opacity-100">
              บริษัท {me?.organization?.nameTh} จำกัด
            </span>
          )}
        </div>
      </SidebarHeader>

      {/* SidebarContent section */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-accent1 py-2">
            เมนูหลัก
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuData.map((item: any) => {
              return (
                <Collapsible
                  key={item.key}
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem key={item.key}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        onClick={() => {
                          if (isSidebarOpen) toggleSubMenu(item.key);
                        }}
                        className={`py-5 ${
                          isMenuActive(item.subMenu?.path, pathname) ? '' : ''
                        }`}
                      >
                        {renderIcon(item.icon)}
                        <span
                          className={`transition-all duration-300 ${
                            isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
                          }`}
                        >
                          <a href={item.path}>{item.name}</a>
                        </span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {item.subMenu && isSubMenuOpen[item.key] && (
                      // <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subMenu?.map((subItem: any) => {
                          // if (pathname === subItem.path) {
                          //   console.log(subItem.name);
                          // }
                          // console.log(isSubMenuOpen);
                          return (
                            <SidebarMenuSubItem key={subItem.name}>
                              <SidebarMenuSubButton
                                key={subItem.path}
                                href={subItem.path}
                                isActive={pathname === subItem.path}
                                className={`py-4 ${
                                  pathname === subItem.path ? 'bg-blue-100' : ''
                                }`}
                              >
                                {renderIcon(subItem.icon)}
                                <span
                                  className={`transition-all duration-300 ${
                                    isSidebarOpen
                                      ? 'opacity-100'
                                      : 'opacity-0 hidden'
                                  }`}
                                >
                                  {subItem.name}
                                </span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                      // </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <div className="py-5 px-5">
          <hr />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
