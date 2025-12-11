"use client";

import { id } from "date-fns/locale";
import {
  Package,
  Settings,
  User,
  Warehouse,
  MessageCircleMore,
  ShieldUser,
  BookA,
  Book,
  Users,
} from "lucide-react";
import React from "react";
import { Link, useRouteLoaderData } from "react-router";
import { inferRole, type Role } from "~/components/shared/sidebar";

type RomeApp = {
  id: string;
  name: string;
  nameLocal: string;
  icon: any;
  color: string;
  path: string;
};


function filterAppsByRole(items: RomeApp[], role: Role): RomeApp[] {
  // fix id ที่สะกดผิด
  const fixId = (id: string) => (id === "customer" ? "customer" : id);


  if (role === "owner") {
    return items.map((it) => ({ ...it, id: fixId(it.id) }));
  }

  if (role === "manager") {
    return items
      .map((it) => ({ ...it, id: fixId(it.id) }))
      .filter((it) => it.id !== "setting");
  }

  if (role === "sale") {
    const allow = new Set(["chat", "customers", "order", "on_boarding"]);
    return items
      .map((it) => ({ ...it, id: fixId(it.id) }))
      .filter((it) => allow.has(it.id));
  }

  // role === "stock"
  const allow = new Set(["product", "inventory", "on_boarding"]);
  return items
    .map((it) => ({ ...it, id: fixId(it.id) }))
    .filter((it) => allow.has(it.id));
}

export default function HomeComponent() {
  const { user, permission } = useRouteLoaderData("root");

  const role = React.useMemo(() => inferRole(user), [user]);

  const romeApps = [
    {
      id: "chat",
      name: "Chat",
      nameLocal: "แชท",
      icon: MessageCircleMore,
      color: "bg-gradient-to-br from-orange-500 to-red-500",
      path: "/message",
    },

    {
      id: "customers",
      name: "Customer",
      nameLocal: "ลูกค้า",
      icon: ShieldUser,
      color: "bg-gradient-to-br from-cyan-500 to-blue-500",
      path: "/customer",
    },

    {
      id: "order",
      name: "Order",
      nameLocal: "ออเดอร์",
      icon: BookA,
      color: "bg-gradient-to-br from-red-500 to-pink-500",
      path: "/orders",
    },

    {
      id: "inventory",
      name: "Inventory",
      nameLocal: "คลังสินค้า",
      icon: Warehouse,
      color: "bg-gradient-to-br from-orange-500 to-pink-500",
      path: "/inventory",
    },

    {
      id: "product",
      name: "Product",
      nameLocal: "สินค้า",
      icon: Package,
      color: "bg-gradient-to-br from-cyan-500 to-teal-500",
      path: "/products",
    },

    {
      id: "user",
      name: "Employee",
      nameLocal: "พนักงาน",
      icon: User,
      color: "bg-gradient-to-br from-yellow-500 to-green-500",
      path: "/users",
    },

    {
      id: "roles",
      name: "Role",
      nameLocal: "ตำแหน่ง",
      icon: Users,
      color: "bg-gradient-to-br from-blue-500 to-green-500",
      path: "/roles",
    },

    {
      id: "on_boarding",
      name: "On Boarding",
      nameLocal: "ออนบอร์ด",
      icon: Book,
      color: "bg-gradient-to-br from-purple-500 to-blue-500",
      path: "/on-boarding",
    },
    
    {
      id: "setting",
      name: "Settings",
      nameLocal: "การตั้งค่า",
      icon: Settings,
      color: "bg-gradient-to-br from-orange-500 to-yellow-500",
      path: "/setting-organization",
    },
  ];

  const getHomeMenu = (
    permission: Record<string, string[]> | undefined
  ): RomeApp[] => {
    if (!permission) return [];

    return romeApps.filter((app) => {
      const key = app.id === "customer" ? "customer" : app.id;

      return Array.isArray(permission[key]) && permission[key].length > 0;
    });
  };

  const appsForUser = React.useMemo(
    () => getHomeMenu(permission),
    [permission]
  );
  
console.log("romeapps:", romeApps);
console.log("gethomemanu:", getHomeMenu);
console.log("appsforuser:", appsForUser);
console.log("permission:", permission);

  return (
    <div className="container h-[calc(100vh-58px)] mx-auto">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Dashboard Content */}
        <div className="flex-1 p-6 bg-gradient-to-br">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-gray-800 to-teal-600 rounded-xl p-8 text-white mb-8">
            <h2 className="text-3xl font-bold mb-4">
              ยินดีต้อนรับสู่ระบบ ROME
            </h2>
            <p className="text-white text-lg mb-4">
              <strong>Resource Organization Management Empowerment</strong>
            </p>
            <p className="text-white mb-6">
              ระบบบริหารจัดการทรัพยากรองค์กรแบบครบวงจร เปิดใช้งานตั้งแต่กันยายน
              2025
              พร้อมโมดูลการทำงานที่หลากหลายเพื่อเพิ่มประสิทธิภาพการดำเนินงาน
            </p>
            <div className="flex items-center flex-col space-x-6 text-sm md:flex-row">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>{appsForUser?.length} โมดูลพร้อมใช้งาน</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>อัพเดทล่าสุด: กันยายน 2025</span>
              </div>
            </div>
          </div>

          {/* Apps Grid */}
          <div className="rounded-xl shadow-sm border p-6 dark:bg-card">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              โมดูลระบบ ROME
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {appsForUser.map((app) => {
                const IconComponent = app.icon;
                return (
                  <Link
                    key={app.id}
                    to={app.path}
                    className="group flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <button>
                      <div
                        className={`w-16 h-16 ${app.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200 shadow-lg`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white text-center mb-1">
                        {app.nameLocal}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-300 text-center">
                        {app.name}
                      </p>
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* System Status */}
          {/* <div className="grid lg:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  สถานะระบบ
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">ระบบออนไลน์</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-semibold text-green-600">100%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">โมดูลที่ใช้งาน</span>
                    <span className="font-semibold text-gray-800">24/24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">ผู้ใช้งานออนไลน์</span>
                    <span className="font-semibold text-gray-800">156 คน</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  การใช้งานยอดนิยม
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">การสนทนา</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">ปฏิทิน</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <CheckSquare className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">รายการงาน</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  ข้อมูลสำคัญ
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">ROME</div>
                    <div className="text-sm text-gray-600">
                      Resource Organization
                    </div>
                    <div className="text-sm text-gray-600">
                      Management Empowerment
                    </div>
                  </div>
                  <div className="text-center pt-4 border-t border-gray-100">
                    <div className="text-lg font-semibold text-gray-800">
                      เปิดใช้งาน
                    </div>
                    <div className="text-sm text-gray-600">มกราคม 2025</div>
                  </div>
                </div>
              </div>
            </div> */}
        </div>
      </div>
    </div>
  );
}

// function FeatureCard({
//   title,
//   description,
//   icon,
//   href,
// }: {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   href?: string;
// }) {
//   return href ? (
//     <Link href={href} className="block">
//       <Card className="hover:shadow-md transition-shadow duration-300 cursor-pointer">
//         <CardHeader className="flex items-center justify-center space-y-2">
//           {icon}
//           <CardTitle className="text-center">{title}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-sm text-muted-foreground text-center">
//             {description}
//           </p>
//         </CardContent>
//       </Card>
//     </Link>
//   ) : (
//     <div className="block">
//       <Card className="hover:shadow-md transition-shadow duration-300">
//         <CardHeader className="flex items-center justify-center space-y-2">
//           {icon}
//           <CardTitle className="text-center">{title}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-sm text-muted-foreground text-center">
//             {description}
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
