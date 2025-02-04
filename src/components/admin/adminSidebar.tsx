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
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react';
import * as Icons from 'lucide-react';
import { useClientSession } from '@/libs/auth';

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
        state[item.key] = item.subMenu.some((subItem: any) =>
          pathname.startsWith(subItem.path),
        );
      }
    });
    return state;
  }, [menuData, pathname]);

  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(initialSubMenuState);

  const isMenuActive = (path: string) => pathname.startsWith(path);

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
          <img
            src={me?.organization?.logoUrl || '/path/to/fallback-logo.png'}
            alt="Logo"
            className="w-10  rounded-xl "
          />
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
            All features
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuData.map((item: any) => (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton
                  onClick={() => {
                    if (isSidebarOpen) toggleSubMenu(item.key);
                  }}
                  className={`py-5 ${
                    isMenuActive(item.subMenu[0]?.path) ? '' : ''
                  }`}
                >
                  {renderIcon(item.icon)}
                  <span
                    className={`transition-all duration-300 ${
                      isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
                    }`}
                  >
                    {item.name}
                  </span>
                </SidebarMenuButton>

                {item.subMenu && isSubMenuOpen[item.key] && (
                  <SidebarMenuSub>
                    {item.subMenu.map((subItem: any) => (
                      <SidebarMenuSubButton
                        key={subItem.path}
                        href={subItem.path}
                        isActive={pathname === subItem.path} // ทำให้แสดง active
                        className={`py-4 ${
                          pathname === subItem.path ? 'bg-blue-100' : ''
                        }`}
                      >
                        {renderIcon(subItem.icon)}
                        <span
                          className={`transition-all duration-300 ${
                            isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
                          }`}
                        >
                          {subItem.name}
                        </span>
                      </SidebarMenuSubButton>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <div className="py-5 px-5">
          <hr />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
