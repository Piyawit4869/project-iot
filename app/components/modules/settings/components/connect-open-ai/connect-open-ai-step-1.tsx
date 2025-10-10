import { UserRound } from "lucide-react";
import { GlobalImage } from "~/components/shared/global-image";
import { Card } from "~/components/ui/card";

export const ConnectOpenAiStep1 = () => {
  return (
    <div className="flex w-full flex-col space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
            <UserRound className="h-6 w-6 text-white" />
          </div>

          <div className="w-8 border-t border-dashed border-gray-300"></div>
          <GlobalImage
            src={"https://img2.pic.in.th/pic/33722e2c587cf835d3c51.md.png"}
            alt="Customer"
            className="w-[50px] h-[50px] rounded-full object-cover mt-0.5"
          />
        </div>

        <div className="ml-1 mt-3">
          <h2 className="text-base font-semibold">
            การเชื่อมต่อ AI Assistant (OpenAI)
          </h2>
          <p className="text-sm text-gray-500">
            การเชื่อมต่อ AI Assistant (OpenAI)
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <p className="text-sm">
            1. ผู้ดำเนินการเชื่อมต่อจำเป็นต้องมีสิทธิ์เป็นเจ้าของโปรเจกต์หรือ
            Admin บนระบบของคุณ
          </p>

          <div className="rounded-lg bg-gray-100 p-4">
            <ul className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                1.ตอบกลับลูกค้าอัตโนมัติ
                ระบบสามารถให้คำตอบและแนะนำข้อมูลได้ทันที ไม่ต้องรอพนักงาน
              </div>
              <div className="flex items-start gap-2">
                2.ช่วยแนะนำสินค้า / บริการ / ข้อมูลต่างๆ ผู้ช่วย AI
                สามารถอ้างอิงข้อมูลจากระบบหรือเอกสารที่กำหนดไว้
              </div>
              <div className="flex items-start gap-2">
                3.ลดภาระทีมงานหน้าบ้าน ใช้แทนการตอบคำถามซ้ำ ๆ และคำถามพื้นฐาน
                ช่วยให้ทีมโฟกัสงานสำคัญ
              </div>
              <div className="flex items-start gap-2">
                4.สร้างประสบการณ์ใช้งานที่ทันสมัย ลูกค้าสามารถโต้ตอบกับ AI
                ได้เสมือนคุยกับพนักงานจริง
              </div>
              <div className="flex items-start gap-2">
                5.วิเคราะห์และต่อยอดข้อมูลจากการสนทนา
                สามารถนำข้อความแชทไปวิเคราะห์
                เพื่อต่อยอดการขายหรือปรับปรุงบริการ
              </div>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
