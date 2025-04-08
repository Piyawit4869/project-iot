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
      logo: "/assets/images/logo.webp",
    },
  ],
  home: [
    {
      name: "Home",
      key: "home",
      path: "/organization",
      icon: Icons.Home,
      isActive: false,
    },
  ],
  main: [
    {
      name: "Accounting",
      key: "account",
      icon: Icons.DollarSign,
      isActive: false,
      subMenu: [
        {
          name: "Overview",
          path: "/organization/account/overview",
          icon: Icons.BarChart2,
          isActive: false,
        },
        {
          name: "Revenue",
          path: "/organization/account/revenue",
          icon: Icons.TrendingUp,
          isActive: false,
        },
        {
          name: "Expenses",
          path: "/organization/account/expenses",
          icon: Icons.TrendingDown,
          isActive: false,
        },
        {
          name: "Analysis",
          path: "/organization/account/analysis",
          icon: Icons.PieChart,
          isActive: false,
        },
      ],
    },
    {
      name: "Attendance",
      key: "attendance",
      icon: Icons.UsersRound,
      isActive: false,
      subMenu: [
        {
          name: "Overview",
          path: "/organization/attendance/overview",
          icon: Icons.Grid,
          isActive: false,
        },
        {
          name: "Work Information",
          path: "/organization/attendance/work-infomation",
          icon: Icons.Briefcase,
          isActive: false,
        },
        {
          name: "Whitelist",
          path: "/organization/attendance/whitelist",
          icon: Icons.FileText,
          isActive: false,
        },
        {
          name: "Approval",
          path: "/organization/attendance/approval",
          icon: Icons.Settings,
          isActive: false,
        },
        {
          name: "Appointment",
          path: "/organization/attendance/appointment",
          icon: Icons.Settings,
          isActive: false,
        },
      ],
    },
    {
      name: "Notation",
      key: "notation",
      icon: Icons.File,
      isActive: false,
      subMenu: [
        {
          name: "All Notation",
          path: "/organization/notation",
          icon: Icons.Folder,
          isActive: false,
        },
      ],
    },
    {
      name: "Products",
      key: "products",
      icon: Icons.Package,
      isActive: false,
      subMenu: [
        {
          name: "All Products",
          path: "/organization/products",
          icon: Icons.Archive,
          isActive: false,
        },
      ],
    },
    {
      name: "Customer",
      key: "customer",
      icon: Icons.Smile,
      isActive: false,
      subMenu: [
        {
          name: "All Customer",
          path: "/organization/customer",
          icon: Icons.Users,
          isActive: false,
        },
      ],
    },
    {
      name: "Employee",
      key: "user",
      icon: Icons.User,
      isActive: false,
      subMenu: [
        {
          name: "Employee",
          path: "/organization/user",
          icon: Icons.User,
          isActive: false,
        },
        {
          name: "Role",
          path: "/organization/user/role",
          icon: Icons.Users,
          isActive: false,
        },
        {
          name: "Employee Role",
          path: "/organization/user/employeerole",
          icon: Icons.Users,
          isActive: false,
        },
      ],
    },
    {
      name: "Setting",
      key: "setting",
      icon: Icons.Settings,
      isActive: false,
      subMenu: [
        {
          name: "Organization",
          path: "/organization/setting/organization",
          icon: Icons.SquareChartGantt,
          isActive: false,
        },
        {
          name: "Branch",
          path: "/organization/setting/branch",
          icon: Icons.Building2,
          isActive: false,
        },
        {
          name: "Address",
          path: "/organization/setting/address",
          icon: Icons.MapPinCheck,
          isActive: false,
        },
        {
          name: "Settings",
          path: "/organization/setting",
          icon: Icons.SlidersHorizontal,
          isActive: false,
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
