import { UserRound } from "lucide-react";
import { GlobalImage } from "~/components/shared/global-image";
import { Card } from "~/components/ui/card";
import { ChecklistItem } from "./check-list-item";

export const ConnectLineStep1 = () => {
  return (
    <div className="flex w-full flex-col space-y-6">
      {/* <Tabcontrol
        title="การเชื่อมต่อ LINE Official Account"
        backpath="/organization/setting-organization/chatbot"
        buttons={[
          <Link href="" key="connect-btn">
            <Button className="gap-2">
              <Link2 />
              เชื่อมต่อกับ LINE Official Account
            </Button>
          </Link>,
        ]}
      /> */}

      <Card className="p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
            <UserRound className="h-6 w-6 text-white" />
          </div>

          <div className="w-8 border-t border-dashed border-gray-300"></div>

          <GlobalImage
            src={"https://img2.pic.in.th/pic/download-1857e4987ee8ff3ad.th.png"}
            alt="Customer"
            className="w-[50px] h-[50px] rounded-full object-cover mt-0.5"
          />
        </div>

        <div className="ml-1 mt-3">
          <h2 className="text-base font-semibold">เชื่อมต่อ Rome Chat</h2>
          <p className="text-sm text-gray-500">กับ LINE Official Account</p>
        </div>

        <div className="mt-5 space-y-3">
          <p className="text-sm">
            1. ผู้ดำเนินการเชื่อมต่อจำเป็นต้องเป็นเจ้าของบทบาทของท่าน
            (Administrator) ใน LINE OA และ Provider ของ LINE OA
            ที่ต้องการเชื่อมต่อ
          </p>

          <div className="rounded-lg bg-gray-100 p-4">
            <ul className="space-y-3 text-sm">
              <ChecklistItem>
                ดึงบทสนทนาจากลูกค้าใน LINE OA ผ่านทาง Rome Chat
              </ChecklistItem>
              <ChecklistItem>
                ใช้บทสนทนาเพื่อช่วยตอบกลับลูกค้าได้ภายใน 24 ชั่วโมง
              </ChecklistItem>
              <ChecklistItem>
                สร้างและส่งโครงคำทักทายหรือสรุปปัญหาให้เหมาะของลูกค้า ผ่านทาง
                Rome Chat
              </ChecklistItem>
              <ChecklistItem>
                ธุรกิจต้องสามารถตอบกลับผ่าน LINE OA manager ได้ด้วยการอนุมัติ
                ผ่านระบบ Rome Chat อาจจะต้องส่งข้อความในช่องทาง LINE OA
                ในบางกรณี ตามนโยบายในการใช้
              </ChecklistItem>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
