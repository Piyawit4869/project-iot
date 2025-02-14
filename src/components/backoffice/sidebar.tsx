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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react';
import * as Icons from 'lucide-react';
import { useClientSession } from '@/libs/auth';
import Image from 'next/image';
import Link from 'next/link';
// import { isMenuActive } from '../common/common';
// import { Collapsible, CollapsibleTrigger } from '../ui/collapsible';
// import { ChevronRight } from 'lucide-react';
import { NavHome } from './Sidebar/homeSidebar';
import { NavSetting } from './Sidebar/settingSidebar';
import { Button } from '@nextui-org/react';

const renderIcon = (iconName: string) => {
  const IconComponent = Icons[iconName as keyof typeof Icons] as any;
  return IconComponent ? <IconComponent className="w-10 h-10" /> : null;
};

export function AdminSideBar({
  isSidebarOpen,
  ...props
}: { isSidebarOpen: boolean } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname() ?? '';
  const pathUrl = pathname.split('/');
  const pathFeature = pathUrl && pathUrl[2];
  const pathSubFeature = pathUrl && pathUrl[3];
  console.log({ pathSubFeature });

  const me = useClientSession();
  const menuData: any = React.useMemo(() => {
    return {
      home: [
        {
          name: 'ภาพรวม',
          key: 'home',
          icon: Icons.House,
          path: '/backoffice',
          isActive: false,
        },
      ],
      main: [
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
          key: 'manageUsers',
          icon: 'UserRoundPen',
          isActive: false,
          subMenu: [
            {
              name: 'พนักงาน',
              path: '/backoffice/manageUsers/user',
              icon: 'UserRoundCheck',
              isActive: false,
            },
            {
              name: 'ตำแหน่ง',
              path: '/backoffice/manageUsers/role',
              icon: 'UserRoundCog',
              isActive: false,
            },
            {
              name: 'ตำแหน่งพนักงาน',
              path: '/backoffice/manageUsers/employeeRole',
              icon: 'UserRoundCog',
              isActive: false,
            },
          ],
        },
      ],
      setting: [
        {
          name: 'การตั้งค่า',
          path: '/backoffice/organization',
          key: 'setting',
          icon: Icons.Bolt,
          isActive: false,
        },
      ],
    };
  }, []);

  const menuSetting: any = React.useMemo(() => {
    return {
      setting: [
        {
          name: 'การตั้งค่า',
          // key: 'setting',
          icon: 'Bolt',
          isActive: false,
          subMenu: [
            {
              name: 'ข้อมูลองค์กร',
              icon: 'SquareChartGantt',
              key: 'organization',
              isActive: false,
            },
            {
              name: 'ข้อมูลสาขา',
              icon: 'Building2',
              key: 'branch',
              isActive: false,
            },
            {
              name: 'ข้อมูลที่อยู่',
              icon: 'MapPinCheck',
              key: 'address',
              isActive: false,
            },
            {
              name: 'การตั้งค่า',
              icon: 'SlidersHorizontal',
              key: 'setting',
              isActive: false,
            },
          ],
        },
      ],
    };
  }, []);

  const searchParams = useSearchParams();

  const router = useRouter();
  const activeTab = searchParams?.get('tab') || 'organization';

  const handleMenuClick = (key: string) => {
    const newUrl = `${pathname}?tab=${key}`;
    router.push(newUrl);
  };

  const initialSubMenuState = React.useMemo(() => {
    const state: any = {};
    (Object.values(menuData) as any[][]).forEach((menuItems: any[]) => {
      menuItems.forEach((item: any) => {
        if (item.subMenu) {
          state[item.key] = item.subMenu.some((subItem: any) =>
            pathname.startsWith(subItem.path),
          );
        }
      });
    });

    return state;
  }, [menuData, pathname]);

  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(initialSubMenuState);
  const [menuSidebar, setMenuSidebar] = React.useState<any[]>(menuData.main);

  React.useEffect(() => {
    if (location.pathname.startsWith('/backoffice/organization')) {
      setMenuSidebar(menuSetting.setting);
    } else {
      setMenuSidebar(menuData.main);
    }
  }, [menuData.main, menuSetting.setting]);

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
            <NavHome items={menuData.home} />
            {menuSidebar.map((item: any) => {
              return (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => {
                      if (isSidebarOpen) toggleSubMenu(item.key);
                    }}
                    isActive={pathFeature === item.key}
                  >
                    {renderIcon(item.icon)}
                    <span
                      className={`transition-all duration-300 ${
                        isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'
                      }`}
                    >
                      <a href={item.path}>{item.name}</a>
                    </span>
                    {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                  </SidebarMenuButton>

                  {item.subMenu && isSubMenuOpen[item.key] && (
                    <SidebarMenuSub>
                      {item.subMenu?.map((subItem: any) => {
                        return (
                          <SidebarMenuSubItem key={subItem.name}>
                            <SidebarMenuSubButton
                              key={subItem.path}
                              href={subItem.path}
                              isActive={pathname === subItem.path}
                              className={`py-4 ${
                                (activeTab === subItem.key,
                                pathname === subItem.path ? 'bg-blue-100' : '')
                              }`}
                              onClick={() => handleMenuClick(subItem.key)}
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
                  )}
                </SidebarMenuItem>
              );
            })}

            {menuSidebar === menuData.main && (
              <NavSetting
                items={menuData.setting}
                // onMenuClick={handleMenuClick}
              />
            )}
          </SidebarMenu>
        </SidebarGroup>
        <div className="py-5 px-5">
          <hr />
          {menuSidebar === menuSetting.setting && (
            <div className="flex items-center justify-center h-full mt-3">
              <Button
                onClick={() => setMenuSidebar(menuData.main)}
                className="rounded-full"
                size="sm"
              >
                <Icons.ChevronLeft />
              </Button>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
