import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { GlobalImage } from "@/components/shared/global-image";

type Props = {
  messages: any[]; // เรียงจากเก่า -> ใหม่
  hasMoreAbove: boolean;
  loadMoreAbove: () => void; // ดึงหน้าเก่าขึ้นบน
};
const SCROLL_THRESHOLD = 48; // px

export default function ChatScroller({
  messages,
  hasMoreAbove,
  loadMoreAbove,
}: Props) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const topSentinelRef = React.useRef<HTMLDivElement | null>(null);
  const bottomSentinelRef = React.useRef<HTMLDivElement | null>(null);
  const newestSeenId = React.useRef<string | null>(null);

  const [atBottom, setAtBottom] = React.useState(true);
  const [showJump, setShowJump] = React.useState(false); // ปุ่มไปล่างสุด
  const prevHeights = React.useRef<{ before: number; after: number } | null>(
    null
  );

  // 1) ตรวจว่าผู้ใช้ "อยู่ล่างสุด"
  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = el;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      const isAtBottom = distanceFromBottom <= SCROLL_THRESHOLD;
      setAtBottom(isAtBottom);
      setShowJump(!isAtBottom);
    };

    // passive เพื่อความลื่นไหล
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // 2) สังเกต “ด้านล่าง” ด้วย IntersectionObserver (กันกรณีมีการยืดหดความสูง)
  React.useEffect(() => {
    if (!viewportRef.current || !bottomSentinelRef.current) return;
    const io = new IntersectionObserver(
      ([entry]: any) => {
        setAtBottom(entry.isIntersecting);
        setShowJump(!entry.isIntersecting);
      },
      { root: viewportRef.current, threshold: 1 }
    );
    io.observe(bottomSentinelRef.current);
    return () => io.disconnect();
  }, []);

  // 3) โหลดแชทเก่าเมื่อ “ท็อปเซนทิเนล” เข้าจอ และรักษาตำแหน่งการอ่าน
  React.useEffect(() => {
    if (!viewportRef.current || !topSentinelRef.current) return;
    const root = viewportRef.current;
    const io = new IntersectionObserver(
      async ([entry]: any) => {
        if (!entry.isIntersecting || !hasMoreAbove) return;

        // จดจำความสูงก่อนโหลด
        prevHeights.current = { before: root.scrollHeight, after: 0 };

        await loadMoreAbove();

        // รอ DOM วาดเสร็จ
        requestAnimationFrame(() => {
          if (!viewportRef.current) return;
          prevHeights.current!.after = viewportRef.current.scrollHeight;
          const delta =
            prevHeights.current!.after - prevHeights.current!.before;
          // ขยับ scrollTop ลงมาเท่าที่เพิ่มขึ้น → ภาพจะนิ่ง
          viewportRef.current.scrollTop += delta;
        });
      },
      { root, threshold: 0.01 }
    );
    io.observe(topSentinelRef.current);
    return () => io.disconnect();
  }, [hasMoreAbove, loadMoreAbove]);

  // 4) เมื่อมี “ข้อความใหม่เข้ามา”
  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el || messages?.length === 0) return;

    const newest = messages[messages.length - 1] as any;
    const isNewMessage =
      newestSeenId.current && newestSeenId.current !== newest.timestamp;

    newestSeenId.current = newest.timestamp;
    if (isNewMessage && !atBottom) {
      // ถ้าอยู่ล่างสุด → เลื่อนลงแบบลื่น

      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      });
    } else if (isNewMessage && atBottom) {
      // ไม่อยู่ล่างสุด → แค่โชว์ปุ่ม Jump ไม่เด้งจอ

      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      });
    } else if (!atBottom) {
      setShowJump(true);
    }
  }, [messages, atBottom]);

  // 5) ปุ่ม “ไปข้อความล่าสุด”
  const jumpToBottom = () => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="chat-wrap">
      <div ref={viewportRef} className="chat-viewport">
        <div ref={topSentinelRef} aria-hidden style={{ height: 1 }} />

        {messages?.map((msg, i) => {
          const isUser = msg.platform === "backoffice";
          const avatarFallback =
            msg.imageUrl && !msg.imageUrl.includes("http")
              ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  msg.imageUrl
                )}`
              : msg.imageUrl;

          const formattedTime = dayjs(
            msg.createdAt ? msg.createdAt : msg.timestamp
          ).format("DD MMM YYYY, HH:mm");

          return (
            <div
              key={i}
              className={`flex max-w-[70%] flex-col gap-1 ${
                isUser ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {!isUser ? (
                  <>
                    <Avatar className="w-6 h-6">
                      <Image
                        src={avatarFallback || "/avatar.png"}
                        alt="avatar"
                        fill
                        unoptimized
                        className="rounded-full object-cover"
                      />
                      <AvatarFallback>
                        {(msg.sender || msg.recipient || "U")[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground font-medium">
                      {msg.sender || msg.recipient || "Anonymous"}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-muted-foreground font-medium">
                      {msg.sender || msg.recipient || "Anonymous"}
                    </span>
                    <Avatar className="w-6 h-6">
                      <Image
                        src={avatarFallback || "/avatar.png"}
                        alt="avatar"
                        fill
                        unoptimized
                        className="rounded-full object-cover"
                      />
                      <AvatarFallback>
                        {(msg.sender || msg.recipient || "U")[0]}
                      </AvatarFallback>
                    </Avatar>
                  </>
                )}
              </div>

              {msg.messageType === "text" ? (
                <div
                  className={`rounded-xl px-4 py-2 text-sm whitespace-pre-wrap ${
                    isUser ? "bg-blue-500 text-white" : "bg-muted text-primary"
                  }`}
                >
                  {msg.message}
                </div>
              ) : (
                <GlobalImage src={msg.message} />
              )}

              <span className="text-[10px] text-muted-foreground mt-1">
                {formattedTime}
              </span>
            </div>
          );
        })}
        <div ref={bottomSentinelRef} aria-hidden style={{ height: 1 }} />
      </div>

      {showJump && (
        <button className="jump" onClick={jumpToBottom}>
          ไปข้อความล่าสุด
        </button>
      )}
    </div>
  );
}
