"use client";

import React from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface SidebarItem {
  name: string;
  key: string;
  path: string;
  icon?: string;
  isActive: boolean;
}

export function HomeSidebar({
  home,
  icon,
}: {
  home: SidebarItem[];
  icon: (iconName: string) => React.ReactNode;
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {home.map((item) => (
          <SidebarMenuItem key={item.key}>
            <SidebarMenuButton asChild>
              <a href={item.path}>
                {item.icon && icon(item.icon)}
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
