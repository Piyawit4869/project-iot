import * as React from "react";
import * as Icons from "lucide-react";
import { useNavigate, useRouteLoaderData } from "react-router";
import { User, Mail, IdCard, Shield } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SkeletonLoading } from "./skeleton-loading";
import { GlobalImage } from "./global-image";

type ItemMenuType = {
  key: string;
  label: string;
  path: string;
  icon: Icons.LucideIcon;
};

export function Menu() {
  const { me } = useRouteLoaderData("root");
  const navigate = useNavigate();
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  const firstName = me?.profile?.firstName?.trim();
  const lastName = me?.profile?.lastName?.trim();
  const userName = me?.userName?.trim();
  const email = me?.email?.trim();
  const role = me?.mainDepartment;

  const hasFullName = firstName || lastName;

  const displayFullname = hasFullName
    ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
    : (userName ?? "");

  // const [language, setLanguage] = React.useState<"en" | "th">("th");

  // const toggleLanguage = () => {
  //   setLanguage((prev) => (prev === "th" ? "en" : "th"));
  // };

  const items: ItemMenuType[] = [
    {
      key: "profile",
      label: "โปรไฟล์",
      path: `/users/${me?.id}`, // เปลี่ยนเป็น dynamic user id
      icon: Icons.User,
    },
    {
      key: "setting",
      label: "ตั้งค่า",
      path: "/setting-organization",
      icon: Icons.Settings,
    },
  ];

  return (
    <div className="justify-between items-center flex gap-1 pr-3">
      {/* <button
        onClick={toggleLanguage}
        className="relative w-10 h-5 rounded-full border border-border shadow-inner transition-colors duration-300"
      >
        <span
          className={`absolute top-[2px] left-[2px] h-4 w-6 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300
          ${language === "en" ? "translate-x-[10px]" : "translate-x-0"}
          text-black dark:text-white`}
        >
          {language.toUpperCase()}
        </span>
      </button> */}

      <Popover>
        <PopoverTrigger asChild>
          <Icons.BellRing className="items-center hover:text-accent1 hover:scale-110 mr-5 mt-1 p-1 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent>
          <DropdownMenuLabel className="text-base">
            การแจ้งเตือน
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="grid gap-4 mt-4">
            <div className="space-y-2">
              <h6 className="font-medium leading-none">ไม่มีการแจ้งเตือน</h6>
            </div>
            {/* <div className="space-y-2">
              <h6 className="font-medium leading-none">การจัดการงาน</h6>
              <p className="text-sm text-muted-foreground">
                เจมส์ เข้างาน 10:00
              </p>
              <DropdownMenuSeparator />
              <h6 className="font-medium leading-none mt-2">ผู้ช่วยส่วนตัว</h6>
              <p className="text-sm text-muted-foreground">
                สวัสดี วันนี้มีอะไรให้ช่วยไหม
              </p>
            </div> */}
          </div>
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger className="hover:scale-110">
          {!me?.profile ? (
            <SkeletonLoading
              height="h-[32px]"
              width="w-[32px]"
              shape="rounded"
            />
          ) : (
            <GlobalImage
              src={me?.profile?.imageUrl}
              alt="profile-image"
              width={30}
              height={30}
              className="w-9 h-9 min-w-9 min-h-9 shrink-0 rounded-lg object-cover object-center block"
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span>{displayFullname ?? "-"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{email ?? "-"}</span>
              </div>

              <div className="flex items-center gap-2">
                <IdCard className="h-4 w-4 text-primary" />
                <span>{userName ?? "-"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>{role ?? "-"}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {items.map((item) => (
              <DropdownMenuItem
                key={item.key}
                className={
                  item.key === "delete" ? "text-danger" : "text-headFont"
                }
              >
                <a href={item.path} className="flex items-center w-full">
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <div className="ml-3">{item.label}</div>
                </a>
              </DropdownMenuItem>
            ))}

            <DropdownMenuItem>
              <Icons.Palette className="w-5 h-5" />
              <button
                onClick={toggleDarkMode}
                className="relative w-10 h-5 rounded-full border border-border shadow-inner transition-colors duration-300"
              >
                <span
                  className={`absolute top-[1px] left-[2px] h-4 w-4 flex items-center justify-center rounded-full transition-all duration-300
          ${
            isDark
              ? "translate-x-[18px] bg-blue-500"
              : "translate-x-0 bg-yellow-400"
          } text-white`}
                >
                  {isDark ? (
                    <Icons.Moon className="h-[12px] w-[12px]" />
                  ) : (
                    <Icons.Sun className="h-[12px] w-[12px]" />
                  )}
                </span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigate("/logout")}
            className="cursor-pointer"
          >
            <Icons.LogOut className="ml-1 mr-2 w-5 h-5" />
            ออกจากระบบ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
