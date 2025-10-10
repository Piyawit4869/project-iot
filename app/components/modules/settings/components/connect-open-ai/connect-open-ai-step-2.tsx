import { Card } from "~/components/ui/card";

export const ConnectOpenAiStep2 = () => {
  return (
    <div className="flex w-full flex-col space-y-6">
      {/* <Tabcontrol
        title="การเชื่อมต่อผู้ช่วย"
        backpath="/organization/setting-organization/chatbot"
        buttons={[
          <Link
            href="/organization/setting-organization/chatbot/connect"
            key="connect-btn"
          >
            <Button className="gap-2">
              <Link2 />
              เชื่อมต่อ
            </Button>
          </Link>,
        ]}
      /> */}

      <Card className="p-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">AI Chat</h1>
        </div>
        <div className="">
          <h2 className="text-base font-semibold">(OpenAI Assistant)</h2>
        </div>
        <div className="mt-3 text-sm ">
          <p>ขั้นตอนที่ 1: สร้าง Assistant จาก OpenAI</p>
          <p className="font-bold mt-3">
            **คีย์ API นี้จะเชื่อมโยงกับผู้ใช้ของคุณ และสามารถใช้ส่งคำขอต่าง ๆ
            กับโปรเจกต์ที่เลือกไว้ หากคุณถูกลบออกจากองค์กรหรือโปรเจกต์
            คีย์นี้จะไม่สามารถใช้งานได้
          </p>
        </div>
        <div className="mt-5 space-y-3">
          <div className="rounded-lg bg-gray-100 p-4">
            <ul className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                1. ไปที่: https://platform.openai.com/assistants
              </div>
              <div className="flex items-start gap-2">
                2. คลิกปุ่ม Create Assistant
              </div>
              <div className="flex items-start gap-2">
                3. กรอกข้อมูลดังนี้: <br />• Name: ตั้งชื่อผู้ช่วย เช่น
                SupportBot <br />• System instructions: เช่น
                คุณคือผู้ช่วยตอบคำถามลูกค้า ลดภาระทีมงานหน้าบ้าน
                ใช้แทนการตอบคำถามซ้ำ ๆ และคำถามพื้นฐาน ช่วยให้ทีมโฟกัสงานสำคัญ
                <br />• Model: เลือก gpt-4o <br />• Tools: เลือกเปิดใช้งาน File
                Search, Code Interpreter หรือ Functions ตามความเหมาะสม
              </div>
              <div className="flex items-start gap-2">
                4.กด Save แล้ว คัดลอก Assistant ID เช่น asst_abc123xyz
              </div>
            </ul>
          </div>
        </div>
        <div className="my-4 text-sm ">
          <p>ขั้นตอนที่ 2: ปรับการตั้งค่าให้เป็นดังนี้</p>
        </div>

        <div className="rounded-lg bg-gray-100 p-4">
          <ul className="space-y-3 text-sm">
            <div className="flex items-start gap-2">Assistant ID</div>
            <div className="flex items-start gap-2">Model</div>
            <div className="flex items-start gap-2">System instructions</div>
            <div className="flex items-start gap-2">Tools</div>
            <div className="flex items-start gap-2">Temperature</div>
            <div className="flex items-start gap-2">Top P</div>
          </ul>
        </div>
      </Card>
    </div>
  );
};
