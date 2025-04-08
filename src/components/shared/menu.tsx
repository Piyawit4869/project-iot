import { signOut } from "next-auth/react";
import * as Icons from "lucide-react";
import {} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import React from "react";

type ItemMenuType = {
  key: string;
  label: string;
  path: string;
  icon: Icons.LucideIcon;
};

export function Menu() {
  const items: ItemMenuType[] = [
    {
      key: "profile",
      label: "Profile",
      path: "/organization/profile",
      icon: Icons.User,
    },
    {
      key: "setting",
      label: "Setting",
      path: "/organization/profile/setting",
      icon: Icons.Settings,
    },
  ];

  return (
    <div className="justify-between items-center flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icons.BellRing className="items-center hover:text-accent1 hover:scale-110 mr-5 mt-1 p-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Notification</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>New User</DropdownMenuItem>
          <DropdownMenuItem>Delete Notation</DropdownMenuItem>
          <DropdownMenuItem>Change Theme</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="hover:scale-110">
          <Image
            width={30}
            height={30}
            src="/assets/images/logo.webp"
            alt="Profile"
            className="rounded-full items-center"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>UTOTECH-owner</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {items.map((item: (typeof items)[0]) => (
              <DropdownMenuItem
                key={item.key}
                className={
                  item.key === "delete" ? "text-danger" : "text-headFont"
                }
                color={item.key === "delete" ? "danger" : "default"}
              >
                <a href={item.path}>
                  <div className="flex">
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <div className="ml-3">{item.label}</div>
                  </div>
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <Icons.LogOut className="ml-1" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
