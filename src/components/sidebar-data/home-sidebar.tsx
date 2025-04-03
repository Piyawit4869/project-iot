"use client";

import Image from "next/image";
import { LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

export function HomeSidebar({
  home,
}: {
  home: {
    name: string;
    key: string;
    icon?: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {home.map((item) => (
          <SidebarMenuItem key={item.key}>
            <SidebarMenuButton tooltip={item.name}>
              {item.icon && <item.icon />}
              <span>{item.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
