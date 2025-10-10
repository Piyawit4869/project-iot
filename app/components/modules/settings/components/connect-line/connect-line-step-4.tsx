"use client";

import { Card } from "~/components/ui/card";

export const ConnectLineStep4 = () => {
  return (
    <div className="flex w-full flex-col space-y-6">
      {/* <Tabcontrol
        title="การเชื่อมต่อ LINE Official Account"
        backpath="/organization/setting-organization/chatbot"
        buttons={[
          <Link href="/organization/setting-organization/chatbot" key="back">
            <Button variant="outline">ย้อนกลับ</Button>
          </Link>,
          <Link href="/organization/user/create" key="next">
            <Button className="ml-2">ถัดไป</Button>
          </Link>,
        ]}
      /> */}

      <Card className="p-6">
        {/* หัวข้อใหญ่ */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold leading-tight">LINE</h1>
          <p className="text-sm text-muted-foreground">
            Official Account Manager
          </p>
        </div>

        {/* เนื้อหาอธิบาย + ขั้นตอน */}
        <div className="mt-6 space-y-6 text-sm">
          <div>
            <p className="font-medium">
              1. เปิด ตั้งค่าการตอบกลับ (Response Settings)
            </p>
            <p className="text-muted-foreground break-all">
              https://manager.line.biz/account/@mybasicid/setting/response
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-medium">2. ปรับการตั้งค่าให้เป็นดังนี้:</p>

            {/* กล่องสรุปสถานะ */}
            <div className="rounded-lg border bg-muted/40">
              <div className="grid grid-cols-12 items-center gap-2 px-4 py-3">
                <div className="col-span-9 text-[15px]">แชท</div>
                <div className="col-span-3 text-right text-sm text-muted-foreground">
                  ปิด (Disabled)
                </div>
              </div>
              <div className="border-t" />
              <div className="grid grid-cols-12 items-center gap-2 px-4 py-3">
                <div className="col-span-9 text-[15px]">
                  ข้อความทักทายเพื่อนใหม่ (Greeting message)*
                </div>
                <div className="col-span-3 text-right text-sm text-muted-foreground">
                  ปิด (Disabled)
                </div>
              </div>
              <div className="border-t" />
              <div className="grid grid-cols-12 items-center gap-2 px-4 py-3">
                <div className="col-span-9 text-[15px]">Webhook</div>
                <div className="col-span-3 text-right text-sm font-medium text-emerald-600">
                  เปิด (Enabled)
                </div>
              </div>
              <div className="border-t" />
              <div className="grid grid-cols-12 items-center gap-2 px-4 py-3">
                <div className="col-span-9 text-[15px]">
                  ข้อความตอบกลับอัตโนมัติ (Auto-response)
                </div>
                <div className="col-span-3 text-right text-sm text-muted-foreground">
                  ปิด (Disabled)
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
