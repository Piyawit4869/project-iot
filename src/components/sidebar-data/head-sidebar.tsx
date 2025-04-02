"use client";

import * as React from "react";
import Image from "next/image";

import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function HeadSidebar() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-xl hover:scale-110"
          />
          <div className="text-lg font-semibold tracking-tight">
            <span>Utotech co., ltd</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
