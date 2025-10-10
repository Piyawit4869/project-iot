import React from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { GlobalImage } from "~/components/shared/global-image";
import { Card } from "~/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { ConnectLineValues } from "~/schemas/settings";

type ConnectLine2Props = {
  form: UseFormReturn<ConnectLineValues>;
};

export const ConnectLineStep2: React.FC<ConnectLine2Props> = (props) => {
  const { form } = props;

  const [tabMode, setTabMode] = React.useState<"hasBtn" | "noBtn">("hasBtn");

  return (
    <FormProvider {...form}>
      <div className="flex w-full flex-col space-y-6">
        <Card className="p-6">
          <div className="mb-4">
            <h1 className="text-4xl font-extrabold leading-tight">LINE</h1>
            <p className="text-sm text-gray-500">Official Account Manager</p>
            <h3 className="mt-4 text-base font-semibold">
              เชื่อมต่อ Rome Chat กับ LINE Official Account
            </h3>
          </div>

          <Tabs
            value={tabMode}
            onValueChange={(v) => setTabMode(v as typeof tabMode)}
            className="w-full"
          >
            <TabsList className="w-full justify-between p-1">
              <TabsTrigger
                value="hasBtn"
                className="w-[48%] rounded-md bg-white data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                กรณีมีปุ่ม Messaging API
              </TabsTrigger>
              <TabsTrigger
                value="noBtn"
                className="w-[48%] rounded-md bg-white data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                กรณีไม่มีปุ่ม Messaging API
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hasBtn" className="mt-4">
              <Tabs defaultValue="page1" className="w-full">
                <TabsContent value="page1" className="mt-4">
                  <div className="rounded-lg bg-gray-100 p-5">
                    <ol className="list-decimal space-y-3 pl-5 text-sm">
                      <li>เปิด https://manager.line.biz</li>
                      <li>
                        เลือกบัญชี LINE OA ที่ต้องการเชื่อมต่อ
                        และไปที่หน้าการตั้งค่า
                      </li>
                      <li>เลือก Messaging API ในเมนูด้านซ้ายมือ</li>
                      <li>กดปุ่ม ใช้ Messaging API</li>
                      <li>เลือกหรือสร้าง Provider ให้ถูกต้อง</li>
                      <li>
                        เพิ่ม Privacy policy หรือ Term of Use ได้ หรือข้าม
                      </li>
                      <li>ตรวจสอบข้อมูล และกด ตกลง</li>
                      <li>กลับมาที่ Rome Chat แล้วกดปุ่ม ถัดไป</li>
                    </ol>
                  </div>
                </TabsContent>

                <TabsContent value="page2" className="mt-4">
                  <div className="rounded-lg bg-gray-100 p-5">
                    <p className="mb-3 text-sm">
                      ตัวอย่างหน้าจอ Messaging API ที่มี Channel ID และ Channel
                      Secret
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="noBtn" className="mt-4">
              <Tabs defaultValue="page1" className="w-full">
                <TabsContent value="page1" className="mt-4">
                  <div className="rounded-lg bg-gray-100 p-5">
                    <ol className="list-decimal space-y-3 pl-5 text-sm">
                      <li>เปิด https://manager.line.biz</li>
                      <li>เลือกบัญชี LINE OA และไปที่หน้าการตั้งค่า</li>
                      <li>กดปุ่ม ใช้ Messaging API</li>
                      <li>สร้างหรือสลับไปยัง Provider ที่ถูกต้อง</li>
                      <li>ตรวจสอบว่ามี Channel ID และ Channel Secret แล้ว</li>
                    </ol>
                  </div>
                </TabsContent>

                <TabsContent value="page2" className="mt-4">
                  <div className="rounded-lg bg-gray-100 p-5">
                    <p className="mb-3 text-sm">
                      ภาพตัวอย่างตำแหน่งปุ่ม ใช้ Messaging API
                    </p>
                    <div className="overflow-hidden rounded-lg border bg-white">
                      <GlobalImage
                        src=""
                        alt="example"
                        width={200}
                        height={100}
                        className="rounded-xl object-contain object-center"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>

          <div className="space-y-8 p-8">
            <div className="px-2">
              <h1 className="text-3xl font-extrabold tracking-tight">LINE</h1>
              <p className="text-sm text-muted-foreground">
                Official Account Manager
              </p>
            </div>

            {/* ไม่ submit ที่นี่ ให้วิซาร์ดเป็นคน trigger/validate */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="rounded-xl bg-muted p-4">
                <p className="text-sm leading-6">
                  1. กรอก Channel ID และ Channel Secret จากหน้า Messaging API
                </p>

                <div className="space-y-4 mt-5">
                  <FormField
                    name="channelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Channel ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1234567890"
                            className="bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="channelSecret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Channel Secret</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1234567890abcdefghijk"
                            className="bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="px-2">
                <h2 className="text-3xl font-extrabold tracking-tight">LINE</h2>
                <p className="text-sm text-muted-foreground">Developers</p>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl bg-muted p-4 space-y-4">
                  <p className="text-sm leading-6">
                    2. เปิด Messaging API settings ใน LINE Developers console
                    <br />
                    <span className="text-muted-foreground break-all">
                      https://developers.line.biz/console/channel/1234567890/messaging-api
                    </span>
                  </p>

                  <p className="text-sm leading-6">
                    3. เลื่อนลงไปที่ Channel access token (long-lived)
                  </p>
                  <p className="text-sm leading-6">
                    4. คัดลอก Channel access token (long-lived)
                    แล้ววางในช่องด้านล่าง
                  </p>

                  <FormField
                    name="accessToken"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Channel access token (long-lived)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="w231-12abcdefg1234567890"
                            className="bg-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </FormProvider>
  );
};
