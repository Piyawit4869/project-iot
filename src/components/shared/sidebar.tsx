import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import React from "react";
import * as Icons from "lucide-react";
import { HeadSidebar } from "../sidebar-data/head-sidebar";
import { MainSidebar } from "../sidebar-data/main-sidebar";
import { HomeSidebar } from "../sidebar-data/home-sidebar";

const data = {
  head: [
    {
      name: "Utotech co., ltd",
      logo: "/logo.png",
    },
  ],
  home: [
    {
      name: "Home",
      key: "home",
      icon: Icons.Home,
    },
  ],
  main: [
    {
      name: "Account",
      key: "accounting",
      icon: Icons.DollarSign,
      subMenu: [
        {
          name: "Overview",
          path: "/admin/accounting/statement",
          icon: Icons.BarChart2,
        },
        {
          name: "Revenue",
          path: "/admin/accounting/revenue",
          icon: Icons.TrendingUp,
        },
        {
          name: "Expenses",
          path: "/admin/accounting/expenses",
          icon: Icons.TrendingDown,
        },
        {
          name: "Analysis",
          path: "/admin/accounting/analysis",
          icon: Icons.PieChart,
        },
      ],
    },
    {
      name: "Attendance",
      key: "attendance",
      icon: Icons.Users,
      subMenu: [
        {
          name: "Overview",
          path: "/admin/attendance/overview",
          icon: Icons.Grid,
        },
        {
          name: "Work Information",
          path: "/admin/attendance/work-infomation",
          icon: Icons.Briefcase,
        },
        {
          name: "Whitelist",
          path: "/admin/attendance/whitelist",
          icon: Icons.FileText,
        },
        {
          name: "Approval",
          path: "/admin/attendance/config_attendance",
          icon: Icons.Settings,
        },
        {
          name: "Appointment",
          path: "/admin/attendance/config_attendance",
          icon: Icons.Settings,
        },
      ],
    },
    {
      name: "Notation",
      key: "notation",
      icon: Icons.File,
      subMenu: [
        { name: "All Notation", path: "/admin/notation", icon: Icons.Folder },
      ],
    },
    {
      name: "Products",
      key: "item",
      icon: Icons.Package,
      subMenu: [
        {
          name: "All Products",
          path: "/admin/item",
          icon: Icons.Archive,
        },
      ],
    },
    {
      name: "Customer",
      key: "customer",
      icon: Icons.Smile,
      subMenu: [
        { name: "All Customer", path: "/admin/customer", icon: Icons.Users },
      ],
    },
    {
      name: "Employee",
      key: "user",
      icon: Icons.User,
      subMenu: [
        { name: "Employee", path: "/admin/user", icon: Icons.UserCheck },
        { name: "Role", path: "/admin/role", icon: Icons.Grid },
        { name: "Employee Role", path: "/admin/role", icon: Icons.Grid },
      ],
    },
    {
      name: "Setting",
      key: "setting",
      icon: Icons.Settings,
      subMenu: [
        {
          name: "Setting Organization",
          path: "/admin/organization",
          icon: Icons.Settings,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeadSidebar head={data.head} />
      </SidebarHeader>
      <SidebarContent>
        <HomeSidebar home={data.home} />
        <MainSidebar items={data.main} />
      </SidebarContent>
    </Sidebar>
  );
}
