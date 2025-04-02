// import { cn } from "@/libs/utils";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Playlist } from "../features/home/data/playlist";

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
//   playlists: Playlist[];
// }

// export function Sidebar({ className, playlists }: SidebarProps) {
//   return (
//     <div className={cn("pb-12", className)}>
//       <div className="space-y-4 py-4 overflow-auto max-h-[calc(100vh-114px)]">
//         <div className="px-3 py-2">
//           <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
//             Discover
//           </h2>
//           <div className="space-y-1">
//             <Button variant="secondary" className="w-full justify-start">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="mr-2 h-4 w-4"
//               >
//                 <circle cx="12" cy="12" r="10" />
//                 <polygon points="10 8 16 12 10 16 10 8" />
//               </svg>
//               Listen Now
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="mr-2 h-4 w-4"
//               >
//                 <rect width="7" height="7" x="3" y="3" rx="1" />
//                 <rect width="7" height="7" x="14" y="3" rx="1" />
//                 <rect width="7" height="7" x="14" y="14" rx="1" />
//                 <rect width="7" height="7" x="3" y="14" rx="1" />
//               </svg>
//               Browse
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="mr-2 h-4 w-4"
//               >
//                 <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
//                 <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
//                 <circle cx="12" cy="12" r="2" />
//                 <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
//                 <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
//               </svg>
//               Radio
//             </Button>
//           </div>
//         </div>
//         <div className="px-3 py-2">
//           <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
//             Library
//           </h2>
//           <div className="space-y-1">
//             <Button variant="ghost" className="w-full justify-start">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="mr-2 h-4 w-4"
//               >
//                 <path d="M21 15V6" />
//                 <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
//                 <path d="M12 12H3" />
//                 <path d="M16 6H3" />
//                 <path d="M12 18H3" />
//               </svg>
//               Playlists
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="mr-2 h-4 w-4"
//               >
//                 <circle cx="8" cy="18" r="4" />
//                 <path d="M12 18V2l7 4" />
//               </svg>
//               Songs
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="mr-2 h-4 w-4"
//               >
//                 <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//                 <circle cx="12" cy="7" r="4" />
//               </svg>
//               Made for You
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="mr-2 h-4 w-4"
//               >
//                 <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
//                 <circle cx="17" cy="7" r="5" />
//               </svg>
//               Artists
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="mr-2 h-4 w-4"
//               >
//                 <path d="m16 6 4 14" />
//                 <path d="M12 6v14" />
//                 <path d="M8 8v12" />
//                 <path d="M4 4v16" />
//               </svg>
//               Albums
//             </Button>
//           </div>
//         </div>
//         <div className="py-2">
//           <h2 className="relative px-7 text-lg font-semibold tracking-tight">
//             Playlists
//           </h2>
//           <ScrollArea className="h-[300px] px-1">
//             <div className="space-y-1 p-2">
//               {playlists?.map((playlist, i) => (
//                 <Button
//                   key={`${playlist}-${i}`}
//                   variant="ghost"
//                   className="w-full justify-start font-normal"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="mr-2 h-4 w-4"
//                   >
//                     <path d="M21 15V6" />
//                     <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
//                     <path d="M12 12H3" />
//                     <path d="M16 6H3" />
//                     <path d="M12 18H3" />
//                   </svg>
//                   {playlist}
//                 </Button>
//               ))}
//             </div>
//           </ScrollArea>
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronRight } from "lucide-react";
import React from "react";
import * as Icons from "lucide-react";

const data = [
  {
    name: "บัญชี",
    key: "accounting",
    icon: "DollarSign",
    subMenu: [
      {
        name: "ภาพรวม",
        path: "/admin/accounting/statement",
        icon: "BarChart2",
      },
      {
        name: "รายได้",
        path: "/admin/accounting/revenue",
        icon: "TrendingUp",
      },
      {
        name: "รายจ่าย",
        path: "/admin/accounting/expenses",
        icon: "TrendingDown",
      },
      {
        name: "วิเคราะห์",
        path: "/admin/accounting/analysis",
        icon: "PieChart",
      },
    ],
  },
  {
    name: "กิจกรรมการทำงาน",
    key: "attendance",
    icon: "Users",
    subMenu: [
      { name: "ภาพรวม", path: "/admin/attendance/overview", icon: "Grid" },
      {
        name: "การเข้าทำงาน",
        path: "/admin/attendance/work-infomation",
        icon: "Briefcase",
      },
      {
        name: "การเข้าใช้งาน",
        path: "/admin/attendance/whitelist",
        icon: "FileText",
      },
      {
        name: "การตั้งค่า",
        path: "/admin/attendance/config_attendance",
        icon: "Settings",
      },
    ],
  },
  {
    name: "เอกสาร",
    key: "notation",
    icon: "File",
    subMenu: [
      { name: "เอกสารทั้งหมด", path: "/admin/notation", icon: "Folder" },
    ],
  },
  {
    name: "สินค้าและบริการ",
    key: "item",
    icon: "Package",
    subMenu: [
      {
        name: "สินค้าและบริการทั้งหมด",
        path: "/admin/item",
        icon: "Archive",
      },
    ],
  },
  {
    name: "ลูกค้า",
    key: "customer",
    icon: "Smile",
    subMenu: [
      { name: "ลูกค้าทั้งหมด", path: "/admin/customer", icon: "Users" },
    ],
  },
  {
    name: "จัดการพนักงาน",
    key: "user",
    icon: "User",
    subMenu: [
      { name: "พนักงาน", path: "/admin/user", icon: "UserCheck" },
      { name: "ตำแหน่ง", path: "/admin/role", icon: "Grid" },
    ],
  },
  {
    name: "การตั้งค่า",
    key: "setting",
    icon: "Settings",
    subMenu: [
      {
        name: "การตั้งค่าองค์กร",
        path: "/admin/organization",
        icon: "Settings",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div>
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span>บริษัท ยูโทเทค จำกัด</span>
          </div>
        </SidebarHeader>
        {/* <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4"></div>
          </header>
        </SidebarInset> */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-accent1 py-2">
            เมนูหลัก
          </SidebarGroupLabel>
          <SidebarMenu>
            {data.map((item) => (
              // <div key={index}>{index}</div>
              <Collapsible key={item.key} asChild className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.name}>
                      <span>{item.name}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subMenu?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.name}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.path}>
                              <span>{subItem.name}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </Sidebar>
    </SidebarProvider>
  );
}
