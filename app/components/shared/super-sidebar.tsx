import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import React from "react";
import * as Icons from "lucide-react";
import { HeadSidebar } from "../super-sidebar/head-sidebar";
import { MainSidebar } from "../super-sidebar/main-sidebar";
import { HomeSidebar } from "../super-sidebar/home-sidebar";

const renderIcon = (iconName: string) => {
  const IconComponent = Icons[iconName as keyof typeof Icons] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  return IconComponent ? <IconComponent className="w-10 h-10" /> : null;
};

type SidebarData = {
  home: {
    name: string;
    key: string;
    path: string;
    icon: string;
    isActive: boolean;
  }[];
  main: {
    name: string;
    key: string;
    icon: string;
    isActive: boolean;
    subMenu: {
      name: string;
      path: string;
      icon: string;
      isActive: boolean;
    }[];
  }[];
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  data: SidebarData;
};

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeadSidebar />
      </SidebarHeader>
      <SidebarContent>
        <HomeSidebar home={data.home} icon={renderIcon} />
        <MainSidebar items={data.main} icon={renderIcon} />
      </SidebarContent>
    </Sidebar>
  );
}
