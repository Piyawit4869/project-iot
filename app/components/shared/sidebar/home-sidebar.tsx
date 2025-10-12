"use client";

import React from "react";
import { Link, useLocation } from "react-router";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

interface SidebarItem {
  name: string;
  key: string;
  path: string;
  icon?: string;
  isActive: boolean;
  subMenu?: {
    name: string;
    path: string;
    icon?: string;
    isActive: boolean;
    disabled?: boolean;
  }[];
}

export function HomeSidebar({
  home,
  icon,
}: {
  home: SidebarItem[];
  icon: (iconName: string) => React.ReactNode;
}) {
  const { pathname } = useLocation();
  const [activeKey, setActiveKey] = React.useState<string>("");
  const segments = pathname?.split("/").filter((p) => p !== "");

  React.useEffect(() => {
    const index = home.findIndex((item) =>
      item.path.includes(segments[0] || "")
    );

    if (index) {
      setActiveKey(home[index]?.key || "");
    } else {
      setActiveKey("home");
    }
  }, [segments]);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {home.map((item) => (
          <SidebarMenuItem key={item.key}>
            <SidebarMenuButton asChild isActive={activeKey === item.key}>
              <Link to={item.path}>
                {item.icon && icon(item.icon)}
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
