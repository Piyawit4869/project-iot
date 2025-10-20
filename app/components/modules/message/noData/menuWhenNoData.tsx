import { GlobalImage } from "~/components/shared/global-image";

import {
  Bot,
  Box,
  CirclePlus,
  Notebook,
  PlusIcon,
  SendHorizonal,
  Settings,
  X,
} from "lucide-react";
import { useRouteLoaderData } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Avatar } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";

export const MOCK_PRODUCTS = [
  {
    id: "p001",
    name: "เสื้อเชิ้ตผ้าฝ้ายสีขาว",
    sku: "SHIRT-WH-001",
    available: 25,
    salePrice: 490,
    status: "active",
    imageUrl:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&q=80",
  },
  {
    id: "p002",
    name: "กางเกงผ้าแสลคทรงตรง",
    sku: "PANTS-BL-002",
    available: 0,
    salePrice: 690,
    status: "inactive",
    imageUrl:
      "https://storage.googleapis.com/utotech-storage/2b09ef5d-39e9-4515-a21e-96ecb41196ba-081958c718bf4c63adbcc0719ee51d04473521.png",
  },
  {
    id: "p003",
    name: "กระเป๋าผ้าแคนวาสพรีเมียม",
    sku: "BAG-CV-003",
    available: 12,
    salePrice: 350,
    status: "active",
    imageUrl:
      "https://storage.googleapis.com/utotech-storage/7f06ba3d-59c7-4c49-96eb-4d8adc8c09b0-fe81ea52d26e4f87b501dff25565f7d4501363.png",
  },
];

interface MenuWhenNoDataProps {
  hasCustomerId?: boolean;
}

export default function MenuWhenNoData({
  hasCustomerId = true,
}: MenuWhenNoDataProps) {
  const { me } = useRouteLoaderData("root");

  const classForTaps = `
     group relative inline-flex items-center gap-2
     rounded-md text-sm font-semibold
     px-3 py-2 hover:bg-popover hover:text-foreground dark:hover:bg-popover dark:hover:text-white
     w-full
     text-gray-500 data-[state=active]:text-white
     data-[state=active]:text-[#19142A]
     data-[state=inactive]:hover:bg-gray-100
      data-[state=active]:shadow-none
     transition-colors

     focus-visible:outline-none focus-visible:ring-0
     disabled:opacity-50 disabled:pointer-events-none

     after:absolute after:bottom-[-1px] after:left-1/2 after:-translate-x-1/2
     after:h-0.5 after:w-25 after:rounded-full after:bg-[#19142A]
     data-[state=inactive]:after:hidden
   `;

  const dataInTaps = [
    { value: "note", label: "โน้ต", Icon: Notebook },
    { value: "product", label: "สินค้า", Icon: Box },
    { value: "settingAI", label: "การตั้งค่า AI", Icon: Bot },
  ];

  const organization = me?.organization;
  const logoUrl = organization?.logoUrl;

  return (
    <div className="relative">
      <aside
        className={`pt-2 flex flex-col w-full h-[calc(100vh-50px)] border-l border-r overflow-auto bg-white dark:bg-background px-4 justify-between ${
          !hasCustomerId ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div>
          <button className="flex w-full items-center justify-between gap-2 h-[60px] rounded-b-2xl px-2 py-4 bg-background sticky top-0 z-30 transition-colors">
            <div className="flex gap-2 ">
              <GlobalImage
                src={logoUrl || ""}
                alt="profile-image"
                width={30}
                height={30}
                className="w-[35px] h-[35px] rounded-full object-cover border-2 border-amber-500"
              />
              <div className="flex flex-col ml-1">
                <h2 className="font-semibold text-lg mr-auto ">
                  ยินดีต้อนรับสู่แชท Feature
                </h2>
              </div>
            </div>
          </button>

          <div className="px-4">
            <div className="mt-4 space-y-4">
              <p className="font-semibold text-sm text-muted-foreground mb-1">
                ผู้รับผิดชอบหลัก
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="relative inline-block">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button disabled={true}>
                          <GlobalImage
                            src={logoUrl || ""}
                            alt="profile-image"
                            width={30}
                            height={30}
                            className="w-[35px] h-[35px] rounded-full object-cover border-2 border-amber-500"
                          />
                        </button>
                      </TooltipTrigger>
                    </Tooltip>
                  </TooltipProvider>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute -top-1 -right-1 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100 transition"
                  >
                    <X className="w-2 h-2 text-gray-600" />
                  </button>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="rounded-full object-cover"
                        disabled={true}
                      >
                        <CirclePlus className="w-9 h-9 text-gray-300" />
                      </button>
                    </PopoverTrigger>
                  </Popover>
                </div>
              </div>

              <p className="font-semibold text-sm text-muted-foreground mb-1">
                ผู้รับผิดชอบรอง
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="relative inline-block">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button disabled={true}>
                          <GlobalImage
                            src={logoUrl || ""}
                            alt="profile-image"
                            width={30}
                            height={30}
                            className="w-[35px] h-[35px] rounded-full object-cover border-2 border-amber-500"
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>-</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute -top-1 -right-1 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100 transition"
                  >
                    <X className="w-2 h-2 text-gray-600" />
                  </button>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="rounded-full object-cover"
                        disabled={true}
                      >
                        <CirclePlus className="w-9 h-9 text-gray-300" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <div className="flex flex-col p-2 max-h-[200px] overflow-y-auto">
                        <button className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-left w-full">
                          <span className="text-sm font-medium">userName</span>
                        </button>
                        <span className="flex items-center justify-center text-sm text-muted-foreground p-2">
                          กำลังเพิ่มผู้รับผิดชอบ...
                        </span>

                        <span className="flex items-center justify-center text-sm text-muted-foreground p-2">
                          ไม่มีผู้รับผิดชอบให้เลือก
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Tabs defaultValue="note">
                <TabsList className="w-full ">
                  {dataInTaps.map(({ value, label, Icon }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className={classForTaps}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="note">
                  <div className="max-w-xl mx-auto w-full overflow-auto">
                    <div className="flex items-center justify-between ">
                      <label className="text-sm font-semibold">โน้ต</label>
                      <button type="button" className="text-gray-400 " disabled>
                        <PlusIcon />
                      </button>
                    </div>

                    <p className="text-gray-400 mt-4 text-center">
                      ตัวอย่างการเขียนโน้ตเกี่ยวกับบุคลิกลูกค้า
                    </p>
                    <div>
                      <div className="flex flex-col justify-between w-auto pt-4 overflow-auto">
                        <div className="flex justify-between"></div>
                        <Textarea
                          placeholder="พิมพ์โน้ตของคุณที่นี่..."
                          disabled
                          rows={4}
                        />

                        <p className="text-xs text-gray-400 mt-2">
                          ยังไม่มีโน้ต
                          คุณสามารถเขียนบันทึกเกี่ยวกับบุคลิกหรือลักษณะนิสัยได้ที่นี่
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="product">
                  <div className="max-w-xl mx-auto w-full">
                    <div className="flex flex-row items-center justify-between gap-12">
                      <p className="text-sm font-semibold mb-2">
                        สินค้าที่สนใจ
                      </p>
                      <div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-[30px] w-[70px] px-2 gap-2 mr-2"
                          disabled
                        >
                          <span className="text-[12px]">กรอง</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-[30px] w-[70px] p-2 px-3"
                          disabled
                        >
                          <span className="text-[12px]">ตะกร้า</span>
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-400 mt-4 text-center">
                      ตัวอย่างการเลือกสินค้า
                    </p>

                    <ul className="mt-6 border rounded-md divide-y  bg-background">
                      {MOCK_PRODUCTS.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-12 h-12 rounded object-cover border"
                          />

                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.sku}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              สินค้าคงเหลือ: {item.available} ชิ้น
                            </p>
                          </div>

                          {/* ส่วนราคากับแท็กสถานะ */}
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-sm font-semibold text-blue-600">
                              {item.salePrice} ฿
                            </span>
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                item.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {item.status === "active"
                                ? "สั่งซื้อได้"
                                : "สินค้าหมด"}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="settingAI">
                  <div className="flex flex-row justify-between items-center w-full">
                    <h3 className="text-sm font-semibold mt-1">พูดคุยกับ AI</h3>

                    <Button
                      type="button"
                      size={"sm"}
                      disabled
                      className="px-3 py-1  bg-gray-100 hover:bg-gray-200 text-sm text-black"
                    >
                      <Settings />
                    </Button>
                  </div>
                  <p className="text-gray-400 text-center py-5">
                    ตัวอย่างหน้าจอการพูดคุยกับแชท AI
                  </p>
                  <div className="max-w-xl mx-auto bg-background rounded-xl shadow p-4 border">
                    <h2 className="text-lg font-semibold mb-3">
                      ตัวอย่างหน้าจอ
                    </h2>

                    <div className="flex items-start gap-2 mb-6">
                      <Avatar className="bg-gradient-to-br from-purple-400 to-indigo-400 text-white flex items-center justify-center">
                        AI
                      </Avatar>
                      <Card className="bg-muted px-3 py-2">
                        <p className="text-sm">
                          สวัสดีค่ะ ขอทราบชื่อคุณลูกค้าได้ไหมคะ 😊
                        </p>
                        {/* <span className="block text-xs text-muted-foreground mt-1">
                          26 ก.ย. 2025, 00:55
                        </span> */}
                      </Card>
                    </div>

                    <div className="flex items-start gap-2 mb-6 justify-end">
                      <Card className="bg-primary text-primary-foreground px-3 py-2 max-w-[80%]">
                        <p className="text-sm">Kira</p>
                        {/* <span className="block text-xs text-primary-foreground/70 mt-1 text-right">
                          26 ก.ย. 2025, 00:55
                        </span> */}
                      </Card>
                      <Avatar className="bg-black text-white flex items-center justify-center">
                        U
                      </Avatar>
                    </div>

                    <div className="flex items-start gap-2 mb-6">
                      <Avatar className="bg-gradient-to-br from-purple-400 to-indigo-400 text-white flex items-center justify-center">
                        AI
                      </Avatar>
                      <Card className="bg-muted px-3 py-2 ">
                        <p className="text-sm">
                          สวัสดีค่ะ ยินดีต้อนรับสู่ OGGa Idea น้อง OGGa AI ค่ะ
                          ขอทราบชื่อคุณลูกค้าได้ไหมคะ 😊
                        </p>
                        {/* <span className="block text-xs text-muted-foreground mt-1">
                          26 ก.ย. 2025, 00:57
                        </span> */}
                      </Card>
                    </div>

                    <div className="border-t pt-4 mt-6">
                      <div className="flex items-center gap-2 text-muted-foreground opacity-60">
                        {/* กล่องข้อความจำลอง */}
                        <div className="border rounded-lg px-3 py-2 w-full bg-muted cursor-not-allowed">
                          <span className="text-sm">
                            สอบถามข้อมูลเกี่ยวกับลูกค้าคนนี้...
                          </span>
                        </div>

                        {/* ปุ่มส่ง (จำลอง กดไม่ได้) */}
                        <div className="p-2 rounded-full bg-muted cursor-not-allowed">
                          <SendHorizonal className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        {!hasCustomerId && (
          <div className="absolute top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-white/80 dark:bg-background/80">
            <p className="text-center text-md font-semibold p-10">
              ข้อมูลชุดนี้เป็นข้อมูล import และ รอการตอบกลับจากไลน์
              เพื่อเริ่มต้นการใช้งานระบบ
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
