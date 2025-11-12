import dayjs from "dayjs";
import { Send } from "lucide-react";
import React from "react";
import { formatDateHHMM } from "~/components/shared/global-format";
import { GlobalImage } from "~/components/shared/global-image";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

interface AIInsightExampleRenderProps {
  customerName: string;
  heightOffset?: number;
}

export const AIInsightExampleRender: React.FC<AIInsightExampleRenderProps> = (
  props
) => {
  const { customerName, heightOffset = 346 } = props;

  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);

  const combinedMessages = [
    {
      firstMessageToday: false,
      chatRoomId: "f10574c5-fe1e-4216-85f3-d5400af2e4ad",
      chatRoomType: "assistant",
      message: `สวัสดีค่ะคุณ ${customerName}' 😊\n\nจากข้อมูลที่มีตอนนี้ คุณเป็นลูกค้าใหม่ของเราค่ะ ยังไม่มีข้อมูลเพิ่มเติมเกี่ยวกับสไตล์การคุยหรือความต้องการเฉพาะ แต่ยินดีมากที่ได้รู้จักนะคะ ถ้ามีข้อมูลเพิ่มเติมหรืออยากเล่าให้ฟังเพิ่มเติมเกี่ยวกับงานที่สนใจ แจ้งได้เลยนะคะ\n\nถ้าต้องการเริ่มต้นสั่งงานหรือสอบถามข้อมูลเพิ่มเติม น้องพร้อมช่วยเสมอค่ะ`,
      messageLabel: `สวัสดีค่ะคุณ ${customerName}' 😊\n\nจากข้อมูลที่มีตอนนี้ คุณเป็นลูกค้าใหม่ของเราค่ะ ยังไม่มีข้อมูลเพิ่มเติมเกี่ยวกับสไตล์การคุยหรือความต้องการเฉพาะ แต่ยินดีมากที่ได้รู้จักนะคะ ถ้ามีข้อมูลเพิ่มเติมหรืออยากเล่าให้ฟังเพิ่มเติมเกี่ยวกับงานที่สนใจ แจ้งได้เลยนะคะ\n\nถ้าต้องการเริ่มต้นสั่งงานหรือสอบถามข้อมูลเพิ่มเติม น้องพร้อมช่วยเสมอค่ะ`,
      messageType: "text",
      originMessageFromAi: `สวัสดีค่ะคุณ ${customerName}\' 😊\n\nจากข้อมูลที่มีตอนนี้ คุณเป็นลูกค้าใหม่ของเราค่ะ ยังไม่มีข้อมูลเพิ่มเติมเกี่ยวกับสไตล์การคุยหรือความต้องการเฉพาะ แต่ยินดีมากที่ได้รู้จักนะคะ ถ้ามีข้อมูลเพิ่มเติมหรืออยากเล่าให้ฟังเพิ่มเติมเกี่ยวกับงานที่สนใจ แจ้งได้เลยนะคะ\n\nถ้าต้องการเริ่มต้นสั่งงานหรือสอบถามข้อมูลเพิ่มเติม น้องพร้อมช่วยเสมอค่ะ\n\n<<DATA_UPDATE>>\n{\n  "customerName": "Phoom\'",\n  "customerStatus": "ใหม่"\n}\n<<END>>`,
      status: "active",
      sender: "ROME AI",
      recipient: "owner utotech",
      isAiReply: true,
      aiThreadId: "thread_ZBBpyo6kNhTVg8Dy3PAygn43",
      customerAssistantId: "e879f21b-c5f2-4f69-919c-ced280da3a5f",
      internalUserId: "5e760162-d2c3-4598-a714-24b0f68e85de",
      platform: "backoffice",
      imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=rome",
      timestamp: "2025-10-28T16:58:14.536Z",
      branchId: "48a6d728-3b49-494e-8265-406d4a7c8a07",
      organizationId: "d17d372b-5006-4623-ab11-df90a0d96c18",
      id: "chat:room:assistant:f10574c5-fe1e-4216-85f3-d5400af2e4ad:7",
    },
    {
      firstMessageToday: true,
      chatRoomId: "f10574c5-fe1e-4216-85f3-d5400af2e4ad",
      chatRoomType: "assistant",
      message: "สวัสดีครับ",
      messageType: "text",
      status: "active",
      sender: "owner utotech",
      recipient: "backoffice",
      platform: "backoffice",
      isAiReply: false,
      customerId: "e879f21b-c5f2-4f69-919c-ced280da3a5f",
      imageUrl:
        "https://storage.googleapis.com/utotech-storage/c108f6a6-ff44-4c0f-8c63-4c4f65089414-206117-9144c47ed76647dd869dc8a948b1b1e7885406.png",
      timestamp: "2025-10-28T17:01:10.725Z",
      branchId: "48a6d728-3b49-494e-8265-406d4a7c8a07",
      organizationId: "d17d372b-5006-4623-ab11-df90a0d96c18",
      userId: "5e760162-d2c3-4598-a714-24b0f68e85de",
      id: "chat:room:assistant:f10574c5-fe1e-4216-85f3-d5400af2e4ad:8",
    },
    {
      firstMessageToday: true,
      chatRoomId: "f10574c5-fe1e-4216-85f3-d5400af2e4ad",
      chatRoomType: "assistant",
      message:
        "บทสนทนานี้คือข้อความตอบกลับตัวอย่างสำหรับการสนทนากับ  ROME AI Assistant นะคะ 😊",
      messageLabel:
        "บทสนทนานี้คือข้อความตอบกลับตัวอย่างสำหรับการสนทนากับ  ROME AI Assistant นะคะ 😊",
      messageType: "text",
      originMessageFromAi:
        "บทสนทนานี้คือข้อความตอบกลับตัวอย่างสำหรับการสนทนากับ  ROME AI Assistant นะคะ 😊",
      status: "active",
      sender: "ROME AI",
      recipient: "owner utotech",
      isAiReply: true,
      aiThreadId: "thread_ZBBpyo6kNhTVg8Dy3PAygn43",
      customerAssistantId: "e879f21b-c5f2-4f69-919c-ced280da3a5f",
      internalUserId: "5e760162-d2c3-4598-a714-24b0f68e85de",
      platform: "backoffice",
      imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=rome",
      timestamp: "2025-10-28T17:01:24.084Z",
      branchId: "48a6d728-3b49-494e-8265-406d4a7c8a07",
      organizationId: "d17d372b-5006-4623-ab11-df90a0d96c18",
      id: "chat:room:assistant:f10574c5-fe1e-4216-85f3-d5400af2e4ad:9",
    },
  ];

  const messagesLoading = [
    {
      id: 1,
      type: "text",
      messageType: "text",
      message: "",
      sender: "user",
      imageUrl: "",
      recipient: "",
      name: "",
    },
    {
      id: 2,
      type: "text",
      messageType: "text",
      message: "AI กำลังตอบ...",
      sender: "ROME Ai",
      imageUrl: "https://api.dicebear.com/9.x/glass/svg?seed=rome",
      recipient: "",
      name: "ROME AI Assistant",
    },
  ];

  React.useEffect(() => {
    const container = scrollAreaRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [combinedMessages]);

  return (
    <div
      className="flex flex-col border rounded-sm bg-white dark:bg-background"
      style={{ height: `calc(100vh - ${heightOffset}px)` }}
    >
      <div
        className="flex flex-1 flex-col"
        style={{
          height: 350,
        }}
      >
        <div
          ref={scrollAreaRef}
          className="flex h-full flex-col space-y-6 overflow-y-auto px-4 z-0 relative  "
        >
          {combinedMessages && combinedMessages.length
            ? combinedMessages.map((msg: any, index) => {
                const isUser = msg.sender !== "ROME AI";
                const avatarFallback =
                  msg.imageUrl && !msg.imageUrl.includes("http")
                    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        msg.imageUrl
                      )}`
                    : msg.imageUrl;

                const formattedTime = formatDateHHMM(
                  msg.createdAt ? msg.createdAt : msg.timestamp
                );

                return (
                  <div
                    key={`${msg.lineSubId}+${index}+${msg.sender}`}
                    className={`mt-4 flex max-w-[75%] flex-col gap-1 ${
                      isUser ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="w-6 h-6">
                        <img
                          src={avatarFallback || "/avatar.png"}
                          alt="avatar"
                          className="rounded-full object-cover"
                        />
                        <AvatarFallback>
                          {(msg.sender || msg.recipient || "U")[0]}
                        </AvatarFallback>
                      </Avatar>
                      {isUser ? (
                        <span className="text-xs text-muted-foreground font-medium">
                          {msg.sender || msg.recipient || "Anonymous"}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground font-medium">
                          ROME AI Assistant
                        </span>
                      )}
                    </div>

                    {msg.messageType === "text" ? (
                      <div
                        className={`rounded-xl px-4 py-2 text-sm whitespace-pre-wrap ${
                          isUser
                            ? "bg-blue-500 text-white"
                            : "bg-muted text-primary"
                        }`}
                      >
                        {msg.message}
                      </div>
                    ) : (
                      <div
                        // onClick={() => setPreviewUrl(msg.message)}
                        className="cursor-pointer"
                      >
                        <GlobalImage src={msg.message} />
                      </div>
                    )}

                    <span className="text-[10px] text-muted-foreground mt-1">
                      {formattedTime}
                    </span>
                  </div>
                );
              })
            : messagesLoading.map((msg, index) => {
                const isUser = msg.sender !== "ROME AI";

                const avatarFallback =
                  msg.imageUrl && !msg.imageUrl.includes("http")
                    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        msg.imageUrl
                      )}`
                    : msg.imageUrl;

                return (
                  <div
                    key={index}
                    className={`mt-4 flex max-w-[75%] flex-col gap-1 ${
                      isUser ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="w-6 h-6">
                        <img
                          src={avatarFallback || "/avatar.png"}
                          alt="avatar"
                          className="rounded-full object-cover"
                        />
                        <AvatarFallback>
                          {(msg.sender || "U")[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground font-medium">
                        {msg.sender || msg.recipient || "Anonymous"}
                      </span>
                    </div>

                    {msg.messageType === "text" ? (
                      <div
                        className={`rounded-xl px-4 py-2 text-sm whitespace-pre-wrap ${
                          isUser
                            ? "bg-blue-500 text-white"
                            : "bg-muted text-primary"
                        }`}
                      >
                        {msg.message}
                      </div>
                    ) : (
                      <div
                        // onClick={() => setPreviewUrl(msg?.message || "")}
                        className="cursor-pointer"
                      >
                        <GlobalImage src={msg?.message || ""} />
                      </div>
                    )}
                  </div>
                );
              })}
        </div>
        <form onSubmit={() => {}} className="gap-2 border-t w-full">
          <textarea
            placeholder="สอบถาม AI ได้เลย"
            className="flex-1 max-h-[300px] w-full resize-none overflow-auto p-2 border-0 rounded-md outline-none"
            disabled={true}
            rows={1}
          />

          <input type="file" accept="image/*" className="hidden" />

          <div className="flex justify-end p-4">
            <Button
              size="icon"
              type="submit"
              // disabled={isPending}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
