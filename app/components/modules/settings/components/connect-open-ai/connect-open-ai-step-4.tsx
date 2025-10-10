import { Card } from "~/components/ui/card";

export const ConnectOpenAiStep4 = () => {
  return (
    <div className="flex w-full flex-col space-y-6">
      {/* <Tabcontrol
        title="การเชื่อมต่อผู้ช่วย"
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
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">AI Chat</h1>
        </div>
        <div className="">
          <h2 className="text-base font-semibold">(OpenAI Assistant)</h2>
        </div>
        <div className="mt-3 text-sm ">
          <p> ขั้นตอนที่ 3: สร้าง API Key</p>
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
                1. ไปที่ https://platform.openai.com/api-keys
              </div>
              <div className="flex items-start gap-2">
                2. กด Create secret key
              </div>
              <div className="flex items-start gap-2">
                3. ใส่ชื่อที่เข้าใจง่ายสำหรับจำแนกคีย์นี้
              </div>
              <div className="flex items-start gap-2">
                4. เลือกโปรเจกต์ที่จะใช้คีย์นี้ เช่น Default project
              </div>
              <div className="flex items-start gap-2">
                5. Permissions (สิทธิ์ในการเข้าถึง): เลือก All (ทั้งหมด)
              </div>
              <div className="flex items-start gap-2">
                6. กดคลิกคำว่า Create secret key = สร้างคีย์ลับ
              </div>
              <div className="flex items-start gap-2">
                7. คัดลอก key เช่น sk-xxx... ไว้ใช้ตอนเชื่อมต่อ
              </div>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
