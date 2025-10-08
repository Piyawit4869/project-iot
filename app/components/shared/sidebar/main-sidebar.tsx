import React from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar";
import { Link, useLocation } from "react-router";

interface SidebarItem {
  name: string;
  key: string;
  icon?: string;
  path?: string;
  isActive: boolean;
  subMenu?: {
    name: string;
    path: string;
    icon?: string;
    isActive: boolean;
    disabled?: boolean;
  }[];
}

export function MainSidebar({
  items,
  icon,
}: {
  items: SidebarItem[];
  icon: (iconName: string) => React.ReactNode;
}) {
  const { pathname } = useLocation() ?? "";
  const pathUrl = pathname.split("/");
  const pathFeature = pathUrl && pathUrl[2];

  const isItemActive = (item: SidebarItem) => {
    if (!item.subMenu) return false;
    return item.subMenu.some((subMenu) => pathname.startsWith(subMenu.path));
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isDirect =
            !!item.path && (!item.subMenu || item.subMenu.length === 0);

          if (isDirect) {
            return (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.path ?? "")}
                >
                  <Link to={item.path ?? "#"}>
                    {item.icon && icon(item.icon)}
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.key}
              defaultOpen={isItemActive(item)}
              asChild
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={pathFeature === item.key}
                    className={
                      pathFeature === item.key ? "bg-black text-white" : ""
                    }
                  >
                    {item.icon && icon(item.icon)}
                    <span>{item.name}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subMenu?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.name}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === subItem.path}
                        >
                          <Link to={subItem.path}>
                            {subItem.icon && icon(subItem.icon)}
                            <span>{subItem.name}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
