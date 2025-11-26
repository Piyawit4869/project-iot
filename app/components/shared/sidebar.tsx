import React from "react";
import * as Icons from "lucide-react";
import { useRouteLoaderData } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "~/components/ui/sidebar";

import { HeadSidebar } from "./sidebar/head-sidebar";
import { HomeSidebar, type SidebarItem } from "./sidebar/home-sidebar";
import { MainSidebar } from "./sidebar/main-sidebar";
import { getUserMapPermission, keyToModuleMap } from "~/utils/permission";

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
    path?: string;
    subMenu?: {
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

export type Role = "owner" | "manager" | "sale" | "stock" | "";
type MenuItem = {
  name: string;
  key: string;
  path?: string;
  icon?: string;
  isActive?: boolean;
};

export const inferRole = (me: any): Role => {
  const names: string[] =
    me?.userDepartments?.map((ud: any) =>
      String(ud?.department?.name || "")
        .toLowerCase()
        .trim()
    ) ?? [];

  const has = (kw: string | RegExp) =>
    names.some((n) => (kw instanceof RegExp ? kw.test(n) : n.includes(kw)));

  if (has("owner")) return "owner";
  if (has("manager")) return "manager";
  if (has(/sale|sales/)) return "sale";
  if (has(/stock/)) return "stock";

  return "";
};

function filterMenuByRole(items: MenuItem[], role: Role): MenuItem[] {
  const fixKey = (k: string) => (k === "customner" ? "customer" : k);

  if (role === "owner") {
    return items.map((it) => ({ ...it, key: fixKey(it.key) }));
  }

  if (role === "manager") {
    return items
      .map((it) => ({ ...it, key: fixKey(it.key) }))
      .filter((it) => it.key !== "setting-organization");
  }

  if (role === "sale") {
    const allow = new Set(["messages", "customer", "orders"]);
    return items
      .map((it) => ({ ...it, key: fixKey(it.key) }))
      .filter((it) => allow.has(it.key));
  }

  const allow = new Set(["product", "inventory"]);
  return items
    .map((it) => ({ ...it, key: fixKey(it.key) }))
    .filter((it) => allow.has(it.key));
}

const permissionToMenuKey: Record<string, string> = {
  chat: "messages",
  customers: "customer",
  order: "orders",
  inventory: "inventory",
  product: "product",
  user: "employee",
  role: "role",
};

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  const { user } = useRouteLoaderData("root");

  const normalizedPermissions = getUserMapPermission(user);

  const defaultHomeMenu: SidebarItem[] = [
    {
      name: "หน้าแรก",
      key: "home",
      path: "/",
      icon: "Home",
      isActive: false,
    },
  ];

  const homeItems = React.useMemo(() => {
    if (!normalizedPermissions) return defaultHomeMenu;

    const items = (data.home as MenuItem[])
      .map((item) => ({
        ...item,
        key: item.key === "customner" ? "customer" : item.key,
      }))
      .filter((item) => {
        if (item.key === "home") return true;

        const permKey = keyToModuleMap[item.key] ?? item.key;

        return Boolean(normalizedPermissions[permKey]?.length);
      });

    return items.map((it) => ({
      ...it,
      path: it.path ?? "/",
      isActive: it.isActive ?? false,
    }));
  }, [data.home, normalizedPermissions]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeadSidebar org={user} />
      </SidebarHeader>
      <SidebarContent>
        {/* {!role ? (
          <div className="flex flex-col gap-3 p-4">
            <SkeletonLoading className="h-[32px]" />
            <SkeletonLoading className="h-[32px]" />
            <SkeletonLoading className="h-[32px]" />
            <SkeletonLoading className="h-[32px]" />
            <SkeletonLoading className="h-[32px]" />
            <SkeletonLoading className="h-[32px]" />
            <SkeletonLoading className="h-[32px]" />
          </div>
        ) : ( */}
        <HomeSidebar home={homeItems} icon={renderIcon} />
        {/* )} */}
        <MainSidebar items={data.main} icon={renderIcon} />
      </SidebarContent>
    </Sidebar>
  );
}
