"use client";

import React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

interface SidebarItem {
  name: string;
  key: string;
  icon?: LucideIcon;
  isActive: boolean;
  subMenu?: {
    name: string;
    path: string;
    icon?: LucideIcon;
    isActive: boolean;
  }[];
}

export function MainSidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname() ?? "";
  const pathUrl = pathname.split("/");
  const pathFeature = pathUrl && pathUrl[2];

  const isItemActive = (item: SidebarItem) => {
    if (!item.subMenu) return false;
    return item.subMenu.some((subMenu) => pathname.startsWith(subMenu.path));
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Feature</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.name}
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
                  {item.icon && <item.icon />}
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
                        key={subItem.name}
                        isActive={pathname === subItem.path}
                      >
                        <a href={subItem.path}>
                          {subItem.icon && <subItem.icon />}
                          <span>{subItem.name}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
