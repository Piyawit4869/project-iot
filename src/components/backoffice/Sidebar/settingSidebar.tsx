'use client';

import { type LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavSetting({
  items,
}: {
  items: {
    name: string;
    key: string;
    path: string;
    icon: LucideIcon;
    isActive: false;
  }[];
}) {
  const router = useRouter();

  const handleClickSetting = (path: string) => {
    router.push(path);
  };

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild>
            <div onClick={() => handleClickSetting(item.path)}>
              <item.icon />
              <span>{item.name}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
