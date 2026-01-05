import { ChatBubble } from "./chat-bubble";
import { ProfileCardCarousel } from "./profile-card-carousel";
import { QuickReply } from "./quick-reply";

export function PreviewPane({ item }: { item?: any }) {
  const fallback = (
    <div className="h-full w-full grid place-items-center text-muted-foreground">
      เลือกรายการทางซ้ายเพื่อดูตัวอย่าง
    </div>
  );

  if (!item) {
    return (
      <div className="h-full gap-0  pb-0">
        <div className="bg-[#2a5182] text-white rounded-t-xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-black grid place-items-center text-xs font-semibold">
              ogga
            </div>
            <span className="text-sm font-medium">ดูตัวอย่าง</span>
          </div>
          <div className="text-xs opacity-80">ตัวอย่างการแสดงผล</div>
        </div>
        <div className="p-4 h-full max-h-[600px] rounded-b-xl bg-[linear-gradient(180deg,#cfe3ff_0%,#d7e9ff_35%,#e7f0ff_100%)]">
          {fallback}
        </div>
      </div>
    );
  }

  if (item.type === "card") {
    return <ProfileCardCarousel items={item} />;
  } else if (item.type === "quick_reply") {
    return <QuickReply items={item} />;
  }

  return (
    <div className="h-full gap-0 pb-0">
      <div className="bg-[#2a5182] text-white rounded-t-xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-black grid place-items-center text-xs font-semibold">
            ogga
          </div>
          <span className="text-sm font-medium">ดูตัวอย่าง</span>
        </div>
        <div className="text-xs opacity-80">ตัวอย่างการแสดงผล</div>
      </div>
      <div className="p-4 h-full max-h-[600px] rounded-b-xl bg-[linear-gradient(180deg,#cfe3ff_0%,#d7e9ff_35%,#e7f0ff_100%)]">
        <div className="mt-2">
          <ChatBubble
            text={item?.content?.messages?.[0]?.text ?? "ตัวอย่างข้อความ"}
          />
        </div>
      </div>
    </div>
  );
}
