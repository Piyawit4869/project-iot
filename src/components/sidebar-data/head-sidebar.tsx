"use client";

import Image from "next/image";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function HeadSidebar({
  head,
}: {
  head: {
    name: string;
    logo: string;
  }[];
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          {head.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <Image
                src={item.logo}
                alt="logo"
                width={40}
                height={40}
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              />
              <span className="truncate font-semibold">{item.name}</span>
            </div>
          ))}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
