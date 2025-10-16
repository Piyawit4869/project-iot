import { GlobalImage } from "~/components/shared/global-image";

import {
  Bot,
  Box,
  CirclePlus,
  Notebook,
  PlusCircleIcon,
  PlusIcon,
  Settings,
  X,
} from "lucide-react";
import React from "react";
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

/* import { useState } from "react"; */

export default function MenuWhenNoData() {
  const { me } = useRouteLoaderData("root");

  const classForTaps = `
     group relative inline-flex items-center gap-2
     rounded-md text-sm font-semibold
     px-3 py-2 hover:bg-popover hover:text-foreground dark:hover:bg-popover dark:hover:text-white
     w-25
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
    <>
      <aside className="pt-2 flex flex-col w-full h-[calc(100vh-50px)] border-l border-r overflow-auto bg-white dark:bg-background px-4 justify-between">
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
                <TabsList className="w-full">
                  {dataInTaps.map(({ value, label, Icon }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      // className="px-3 py-2 rounded-md hover:bg-popover hover:text-foreground dark:hover:bg-popover dark:hover:text-white"
                      className={classForTaps}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="note">
                  <div className="flex items-center justify-between ">
                    <label className="text-sm font-semibold">โน้ต</label>
                    <button type="button" className="text-gray-400 " disabled>
                      <PlusIcon />
                    </button>
                  </div>

                  <p className="text-gray-400 mt-4 text-center">
                    กดเลือกแชทเพื่อใช้งาน Feature
                  </p>
                  {/* <div>
                    <div className="flex flex-col justify-between w-full border-t pt-4 ">
                      <div className="flex justify-between"></div>
                      <Textarea
                        placeholder="พิมพ์โน้ตของคุณที่นี่..."
                        disabled
                        rows={4}
                      />

                      <p className="text-xs text-gray-400 mt-2">
                        ยังไม่มีโน้ต
                        คุณสามารถเขียนบันทึกเกี่ยวกับลูกค้ารายนี้ได้ที่นี่
                      </p>
                    </div>

                    <div className="space-y-2 flex flex-col mt-3">
                      <div className="flex justify-between">
                        <label className="text-sm font-semibold">
                          รายละเอียดสินค้า/บริการ
                        </label>
                      </div>
                      <Textarea
                        placeholder="พิมพ์รายละเอียดสินค้า/บริการของคุณที่นี่..."
                        disabled
                        rows={4}
                      />

                      <p className="text-xs text-gray-400">
                        ยังไม่มีรายละเอียดสินค้า/บริการ <br />
                        คุณสามารถเขียนบันทึกเกี่ยวกับรายละเอียดสินค้า/บริการได้ที่นี่
                      </p>
                    </div>

                    <div className="space-y-2 flex flex-col mt-3">
                      <div className="flex justify-between">
                        <label className="text-sm font-semibold">
                          เงื่อนไขราคาและโปรโมชั่น
                        </label>
                      </div>
                      <Textarea
                        placeholder="พิมพ์เงื่อนไขราคาและโปรโมชั่นของคุณที่นี่..."
                        disabled
                        rows={4}
                      />

                      <p className="text-xs text-gray-400">
                        ยังไม่มีเงื่อนไขราคาและโปรโมชั่น <br />
                        คุณสามารถเขียนบันทึกเกี่ยวกับเงื่อนไขราคาและโปรโมชั่นได้ที่นี่
                      </p>
                    </div>

                    <div className="space-y-2 flex flex-col mt-3">
                      <div className="flex justify-between">
                        <label className="text-sm font-semibold">
                          บุคลิกหรือลักษณะนิสัย
                        </label>
                      </div>
                      <Textarea
                        placeholder="พิมพ์บุคลิกหรือลักษณะนิสัยที่นี่..."
                        disabled
                        rows={4}
                      />

                      <p className="text-xs text-gray-400">
                        ยังไม่มีบุคลิกหรือลักษณะนิสัย <br />
                        คุณสามารถเขียนบันทึกเกี่ยวกับบุคลิกหรือลักษณะนิสัยได้ที่นี่
                      </p>
                    </div>
                  </div> */}
                </TabsContent>

                <TabsContent value="product">
                  <div className="flex flex-row item-center justify-between gap-12">
                    <p className="text-sm font-semibold mb-2">สินค้าที่สนใจ</p>
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
                    กดเลือกแชทเพื่อใช้งาน Feature
                  </p>
                  {/* <div>
                    <div className="flex flex-col justify-between w-full border-t pt-4 ">
                      <div className="flex flex-row item-center justify-between gap-12">
                        <p className="text-sm font-semibold mb-2">
                          สินค้าที่สนใจ
                        </p>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-[30px] w-[90px] p-2 gap-2 border-amber-500"
                          disabled={true}
                        >
                          <PlusCircleIcon />
                          <span className="text-[12px] ">เพิ่มสินค้า</span>
                        </Button>
                        <SelectorItemsModal
                          selected={["1", "2", "3"]}
                          onChange={() => {}}
                          customButton={
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-[30px] w-[90px] p-2 gap-2 border-amber-500"
                              disabled={true}
                            >
                              <PlusCircleIcon />
                              <span className="text-[12px] ">เพิ่มสินค้า</span>
                            </Button>
                          }
                          items={[]}
                        />
                      </div>

                      <div className="flex flex-col">
                        <p className="text-center text-xs text-gray-400 mt-10">
                          ยังไม่มีสินค้าที่สนใจ
                        </p>
                      </div>

                      <GlobalButton
                        label="สร้างออเดอร์"
                        className="mt-8"
                        disabled
                      />
                    </div>

                    <div className="space-y-3 border-t-1 pt-2">
                      <p className="text-sm text-muted-foreground mb-2 font-semibold">
                        รายการสินค้าในระบบ
                      </p>
                      <Input placeholder="ค้นหาด้วยชื่อ" disabled />

                      <ScrollArea className="h-35 rounded-md border p-1">
                        <ul>
                          <p className="text-center text-sm text-muted-foreground py-4">
                            ยังไม่มีสินค้าในระบบ
                          </p>
                        </ul>
                      </ScrollArea>
                    </div>
                  </div> */}
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
                  <p className="text-gray-400 mt-4 text-center">
                    กดเลือกแชทเพื่อใช้งาน Feature
                  </p>
                  {/* <div className="flex w-full border-t pt-4 ">
                    <div
                      className={cn(
                        "w-full text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                      )}
                    >
                      <div className="flex items-center justify-between mt-6 mb-3">
                        <Label htmlFor="ai-enabled" className="text-sm">
                          เปิดใช้งานตลอดเวลา
                        </Label>
                        <Switch id="ai-enabled" disabled />
                      </div>

                      <div className="flex items-center justify-between mt-6 mb-3">
                        <Label
                          htmlFor="ai-enabled-condition"
                          className="text-sm"
                        >
                          ใช้งาน AI ตามเงื่อนไข
                        </Label>
                        <Switch id="ai-enabled-condition" disabled />
                      </div>

                      <div
                        className={cn(
                          "mt-4 space-y-4 transition-all",
                          "opacity-50 pointer-events-none"
                        )}
                      >
                        <div className="flex flex-col gap-2">
                          <Label className="text-sm">
                            ช่วงเวลาที่ให้ AI ตอบ
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input type="time" className="w-[120px]" />
                            <span className="text-sm">ถึง</span>
                            <Input type="time" className="w-[120px]" disabled />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="text-sm">
                            หากไม่มีการตอบกลับจากเซลภายใน (ชั่วโมง)
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input type="time" className="w-[120px]" disabled />
                          </div>
                        </div>
                      </div>

                      <GlobalButton
                        label="บันทึกการตั้งค่า AI"
                        className="mt-8"
                        disabled
                      />
                    </div>
                  </div> */}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
