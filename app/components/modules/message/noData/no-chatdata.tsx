import FeatureCard from "~/components/shared/feature-card";
import { Send, MessagesSquare, Paperclip, PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useIsMobile } from "~/hooks/use-mobile";
import StatusToolbar from "../status-toolbar";

export default function NoChatDetail() {
  const isMobile = useIsMobile();
  return (
    <>
      <div className="flex flex-col h-full bg-white dark:bg-background ">
        <div className="flex items-center justify-end gap-4  border-b bg-white dark:bg-border sticky top-0 z-10 mb-5 dark:bg-background">
          <StatusToolbar isDisable chatRoomDetail={undefined} total={0} />
          <div className="flex items-center gap-3">
            {/* Buttons */}
            {/* <Button
              type="button"
              disabled={true}
              size={"sm"}
              className="px-3 py-1  bg-gray-100 hover:bg-gray-200 text-sm text-black"
            >
              <Users className="w-4 h-4 mr-1" />
              ความสัมพันธ์ลูกค้า
            </Button> */}

            {/* <Button
              type="button"
              size={"sm"}
              disabled={true}
              className="px-3 py-1  bg-gray-100 hover:bg-gray-200 text-sm text-black"
            >
              <CircleCheckBig className="w-4 h-4 mr-1" />
              การตอบกลับ
            </Button> */}
            {/* <Button
              type="button"
              size={"sm"}
              disabled={true}
              className="px-3 py-1  bg-gray-100 hover:bg-gray-200 text-sm text-black"
            >
              <ListChecks className="w-4 h-4 mr-1" />
              ตรวจสอบสถานะ
            </Button> */}
            {/* <Button
              disabled={true}
              type="button"
              size={"sm"}
              className="btn px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm"
              onClick={() =>
                //  router.push("/notation-view")
                window.open("/notation-view", "_blank")
              }
            >
              <FileText className="w-4 h-4 mr-1" />
              ออกใบเสนอราคา
            </Button> */}
          </div>
        </div>

        <div
          className="flex flex-col space-y-6  px-4 z-0 relative justify-center"
          style={{
            height: "calc(100vh - 255px)",
          }}
        >
          <div className="flex w-full">
            {/* <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground font-medium">
                Anonymous
              </span>
              <Avatar className="w-6 h-6">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div> */}

            {/* <div
              className={`rounded-xl px-4 py-2 text-sm whitespace-pre-wrap bg-blue-500 text-white`}
            >
              ยินดีต้อนรับสู่ระบบแชทออนไลน์ของเรา
              ระบบนี้ออกแบบมาเพื่อให้คุณสามารถสื่อสารกับทีมงานหรือเพื่อนร่วมงานได้แบบเรียลไทม์
              ช่วยให้การทำงานร่วมกันสะดวกและรวดเร็วมากขึ้น
              <br />
              วิธีใช้งานเบื้องต้น
              <br />
              1. พิมพ์ข้อความ คลิกที่ช่องข้อความด้านล่างของหน้าจอ
              แล้วพิมพ์สิ่งที่คุณต้องการส่ง
              <br />
              2. ส่งข้อความ กดปุ่ม Enter หรือคลิกไอคอนส่ง
              เพื่อส่งข้อความไปยังคู่สนทนา
              <br />
              3. ส่งไฟล์หรือรูปภาพ คลิกไอคอนคลิปหนีบ เพื่ออัปโหลดไฟล์หรือรูปภาพ
              จากนั้นกดส่ง
              <br />
              4.ดูประวัติการสนทนา เลื่อนขึ้นเพื่อดูข้อความเก่า
              และสามารถค้นหาด้วยช่องค้นหาด้านบน
              <br />
            </div> */}

            <div className="flex flex-col h-[200px] w-full justify-center items-center gap-12">
              <h2 className="text-center text-2xl">
                ยินดีต้อนรับสู่แชท Feature ที่ผนวกร่วมกับ Rome AI
              </h2>
              <div className="w-[300px]">
                <FeatureCard
                  icon={<MessagesSquare className="w-8 h-8 text-blue-500" />}
                  title="แชท sale AI & Support"
                  description="ช่องทางแชทระหว่างฝ่ายขายและลูกค้า พร้อมผนวก AI ช่วยตอบคำถามและสนับสนุนการสนทนาอย่างรวดเร็วและแม่นยำ"
                />
              </div>
            </div>
            {/* 
            <span className="text-[10px] text-muted-foreground mt-1">
              12:34 PM
            </span> */}
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 pt-3 border-t w-full  ">
          {/* Preview */}

          <textarea
            disabled
            placeholder={
              isMobile
                ? "พิมพ์ข้อความเพื่อส่ง"
                : "Enter = ส่งข้อความ / Shift+Enter = ขึ้นบรรทัดใหม่"
            }
            className="w-full resize-none p-2 border-0 rounded-md outline-none h-[18vh] leading-6 overflow-auto"
          />

          <input type="file" disabled className="hidden" multiple />

          <div className="flex pb-4 items-center gap-5.5">
            <PlusCircle className="w-4 h-4 text-muted-foreground" />

            <Paperclip className="w-4 h-4  text-muted-foreground" />

            <Button size="icon" type="submit" disabled title="ส่ง">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
