import { GlobalImage } from "~/components/shared/global-image";

import {
  Bot,
  Box,
  CirclePlus,
  FileImage,
  Notebook,
  PlusIcon,
  Send,
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
import { AIInsightExampleRender } from "../ai-insight-example-render";
import { Separator } from "~/components/ui/separator";
import GlobalButton from "~/components/shared/global-button";
import { NoteLists } from "../note-lists";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import HeroSearch from "../hero-search";
import ChatInputAIAssistant from "../chat-input-ai-assistant";

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
        className={`pt-2 flex flex-col w-full border-l border-r overflow-auto bg-white dark:bg-background px-4 justify-between ${
          !hasCustomerId ? "opacity-50 pointer-events-none" : ""
        }`}
        style={{ height: "calc(100vh - 50px)" }}
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

          <div className="px-4 mt-2">
            <div className="mt-4 space-y-1">
              <div className="flex flex-row">
                <div>
                  <p className="font-semibold text-sm text-muted-foreground mb-1">
                    ผู้รับผิดชอบหลัก
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="relative inline-block">
                      <button
                        type="button"
                        className="rounded-full object-cover "
                      >
                        <CirclePlus className="w-9 h-9 text-gray-300 " />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mx-2 w-[0.8px] h-hull bg-gray-200" />
                <div>
                  <p className="font-semibold text-sm text-muted-foreground mb-1">
                    ผู้รับผิดชอบรอง
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <div className="relative inline-block">
                      <button
                        type="button"
                        className="rounded-full object-cover "
                      >
                        <CirclePlus className="w-9 h-9 text-gray-300 " />
                      </button>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>

              {/* TAG UI START */}
              <div className="px-1">
                <Separator className="mt-2 mb-2" />

                <div className="px-2">
                  <h2>แท็กลูกค้า</h2>
                  <div className="flex justify-center p-4">
                    <span className="text-sm transition-colors break-words text-slate-400 italic">
                      ยังไม่มีข้อมูล
                    </span>
                  </div>
                </div>
                <GlobalButton
                  className="mt-4"
                  key="sync-ai"
                  type="button"
                  disabled
                  variant="secondary"
                  icon={<PlusIcon />}
                  label={<span className="hidden sm:inline">แก้ไขแท็ก</span>}
                />
                <Separator className="mt-2 mb-2" />
              </div>
              {/* TAG UI END*/}

              <Tabs defaultValue="note">
                <TabsList className="w-full">
                  {dataInTaps.map(({ value, label, Icon }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className={classForTaps}
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="note">
                  <NoteLists disable={true} />
                </TabsContent>

                <TabsContent value="product">
                  <div className="flex flex-col justify-between w-full pt-1">
                    <div className="flex flex-row items-center justify-between gap-12">
                      <p className="text-sm font-semibold mb-2">
                        สินค้าที่สนใจ
                      </p>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-[30px] w-[70px] px-2 gap-2"
                          disabled
                        >
                          <span className="text-[12px]">กรอง</span>
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          disabled
                          className="h-[30px] w-[70px] p-2 px-3"
                        >
                          <span className="text-[12px]">ตะกร้า</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-2 font-semibold">
                      รายการสินค้าในระบบ
                    </p>
                    <Input placeholder="ค้นหาด้วยชื่อ" disabled />

                    <ScrollArea className="h-[calc(100vh-560px)] rounded-md border p-2 dark:bg-black/30 pb-[35px]">
                      <ul className="space-y-2">
                        <p className="text-center text-sm text-muted-foreground py-4 ">
                          ไม่พบสินค้าในรายการ
                        </p>
                      </ul>
                    </ScrollArea>
                  </div>
                </TabsContent>

                <TabsContent value="settingAI">
                  <div className="space-y-3 h-[calc(100vh-450px)] overflow-none ">
                    <div className="flex flex-row justify-between items-center w-full ">
                      <h3 className="text-sm font-semibold mt-1">
                        พูดคุยกับ AI
                      </h3>

                      <Button
                        type="button"
                        size={"sm"}
                        disabled
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm text-black"
                      >
                        <Settings />
                      </Button>
                    </div>
                    <div className=" border px-2 rounded-md">
                      <div className="min-h-[270px]"></div>
                      <div className="gap-2 border-t w-full ">
                        <textarea
                          placeholder="สอบถาม AI ได้เลย"
                          className="flex-1 max-h-[30px] w-full resize-none overflow-hidden p-2 border-0 rounded-md outline-none"
                          disabled
                        />

                        <div className="flex justify-end p-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            disabled={true}
                          >
                            <FileImage />
                          </Button>
                          <Button size="icon" type="submit" disabled={true}>
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
