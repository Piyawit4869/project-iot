import React from "react";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const ConnectLine1 = () => {
  const [form, setForm] = React.useState({
    channelId: "",
    channelSecret: "",
    longLivedToken: "",
  });

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

      {/* Section: Official Account Manager */}
      <Card>
        <div className="space-y-8 p-8">
          <div className="px-2">
            <h1 className="text-3xl font-extrabold tracking-tight">LINE</h1>
            <p className="text-sm text-muted-foreground">
              Official Account Manager
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl bg-muted p-4">
              <p className="text-sm leading-6">
                1. กรอกข้อมูล แชนแนล ID Channel ID และ ความลับแชนแนล Channel
                Secret จากหน้า Messaging API ในกล่องด้านล่าง
              </p>

              <div className="space-y-4 mt-5">
                <div className="space-y-2">
                  <Label htmlFor="channelId">Channel ID</Label>
                  <Input
                    id="channelId"
                    placeholder="1234567890"
                    className="bg-white"
                    value={form.channelId}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, channelId: e.target.value }))
                    }
                  />
                </div>

                <div className="space-y-2 mt-5">
                  <Label htmlFor="channelSecret">Channel Secret</Label>
                  <Input
                    id="channelSecret"
                    placeholder="1234567890abcdefghijk"
                    className="bg-white"
                    value={form.channelSecret}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, channelSecret: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Developers */}
          <div className="px-2">
            <h2 className="text-3xl font-extrabold tracking-tight">LINE</h2>
            <p className="text-sm text-muted-foreground">Developers</p>
          </div>

          <>
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
                  3. เลื่อนลงไปส่วนล่างของหน้าเว็บ หาหัวข้อ Channel access token
                  (long-lived)
                  <br />
                  <span className="text-muted-foreground">
                    หากยังไม่ปรากฏข้อมูล อาจต้องกดปุ่มสร้าง Channel ID
                    หรือยืนยันในฝั่ง Provider ของ LINE OA
                  </span>
                </p>

                <p className="text-sm leading-6">
                  4. คัดลอก Channel access token (long-lived)
                  เพื่อวางในช่องด้านล่างนี้ หากคัดลอกไม่ติดให้คัดลอกใหม่
                </p>

                <div className="space-y-2">
                  <Label htmlFor="token">
                    Channel access token (long-lived)
                  </Label>
                  <Input
                    id="token"
                    placeholder="w231-12abcdefg1234567890"
                    className="bg-white"
                    value={form.longLivedToken}
                    onChange={(e) =>
                      setForm((s) => ({ ...s, longLivedToken: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          </>
        </div>
      </Card>
    </div>
  );
};
