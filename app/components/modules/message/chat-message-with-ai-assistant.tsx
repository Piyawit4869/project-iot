"use client";

import { usePaginatedChatRoomAI } from "@/actions/chat/client/useMessage";
import { ChatRoomSchemaType } from "@/schemas/chat/message";

import React, { useRef, useState } from "react";
import { useChat } from "@/stores/chat/useChat";
import dayjs from "dayjs";
import * as Icons from "lucide-react";

import { GlobalImage } from "@/components/shared/global-image";
import { flushSync } from "react-dom";
import { ConnectAiValues } from "@/schemas/ExternalConnection/ExternalConnection";

// import FeatureCard from "@/components/shared/feature-card";
// import { MessagesSquare } from "lucide-react";
// import { Button } from "@/components/ui";
// import ChatInput from "./chat-input";
// import { OrderViewModal } from "./orders-view-modal";
// import { AIMessageView } from "./ai-message-view-modal";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ChatInputAIConfig from "./chat-input-ai";

export default function ChatMessagesWithAIConfig({
  chatRoomId,
  // searchPrompt,
  // selectedRoom,
  autoScroll,
  setAutoScroll,
  // data,
  // searchPrompt,
}: {
  chatRoomId: string;
  autoScroll: boolean;
  setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRoom?: ChatRoomSchemaType;
  searchPrompt?: string;
  data: ConnectAiValues;
}) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const newestSeenId = React.useRef<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState("");

  const [showTopLoading, setShowTopLoading] = useState(false);
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const [isScrollReady, setIsScrollReady] = useState(false);
  // const [isCheckStatusOpen, setCheckStatusOpen] = useState(false);
  // const [AIOpen, setAIOpen] = useState(false);
  const [buttonScrollToBottom, setButtonScrollToBottom] = React.useState(false);
  const { messages: socketMessages } = useChat();

  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    // refetch,
  } = usePaginatedChatRoomAI(chatRoomId || "");

  const paginatedMessages = messagesData?.pages.flatMap((page) => page) ?? [];

  const combinedMessages = React.useMemo(() => {
    const paginated = paginatedMessages?.flatMap((m) => m.items || []);
    return [...paginated, ...socketMessages.flatMap((m) => m || [])]
      .filter((c) => c.chatRoomId)
      .sort(
        (a, b) =>
          dayjs(a.createdAt ?? a.timestamp).valueOf() -
          dayjs(b.createdAt ?? b.timestamp).valueOf()
      );
  }, [paginatedMessages, socketMessages]);

  // const isNoMessageData = !messagesData || messagesData.pages.length === 0;

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) {
      return;
    }
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = scrollArea;
      const isContentScrollable = scrollHeight > clientHeight;
      const SCROLL_THRESHOLD = 50;
      const isNotAtBottom =
        scrollTop < scrollHeight - clientHeight - SCROLL_THRESHOLD;
      setButtonScrollToBottom(isContentScrollable && isNotAtBottom);
    };
    scrollArea.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      scrollArea.removeEventListener("scroll", handleScroll);
    };
  }, [scrollAreaRef.current]);

  React.useEffect(() => {
    if (messagesData?.pages?.length === 1) {
      setAutoScroll(true);
    }
  }, [messagesData]);

  React.useEffect(() => {
    if (!autoScroll || !bottomRef.current) return;

    const scrollToBottom = () => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setAutoScroll(false);
      setHasAutoScrolled(true);
      setTimeout(() => {
        setIsScrollReady(true);
      }, 300);
    };

    requestAnimationFrame(() => {
      setTimeout(scrollToBottom, 0);
    });
  }, [combinedMessages, autoScroll]);

  React.useEffect(() => {
    const el = scrollAreaRef.current;
    if (!isScrollReady || !el) return;

    const handleScroll = () => {
      if (
        el.scrollTop < 10 &&
        hasNextPage &&
        !isFetchingNextPage &&
        hasScrolledOnce
      ) {
        const prevScrollHeight = el.scrollHeight;

        setShowTopLoading(true);

        fetchNextPage().finally(() => {
          setShowTopLoading(false);

          flushSync(() => {
            requestAnimationFrame(() => {
              const newScrollHeight = el.scrollHeight;
              const heightDiff = newScrollHeight - prevScrollHeight;
              el.scrollTop = heightDiff;
            });
          });
        });
      }

      if (!hasScrolledOnce && hasAutoScrolled) {
        setHasScrolledOnce(true);
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [
    isScrollReady,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    hasScrolledOnce,
    hasAutoScrolled,
  ]);

  React.useEffect(() => {
    const el = scrollAreaRef.current;
    const messages = combinedMessages;
    if (!el || messages?.length === 0) return;
    const newest = messages[messages.length - 1] as any;
    const isNewMessage =
      newestSeenId.current && newestSeenId.current !== newest.timestamp;
    newestSeenId.current = newest.timestamp;
    if (isNewMessage) {
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      });
    }
  }, [combinedMessages]);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full items-center justify-center gap-4 px-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`flex max-w-[75%] flex-col gap-1 ${
              i % 2 === 0 ? "ml-auto items-end" : "mr-auto items-start"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
              <div className="w-16 h-4 bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="rounded-xl bg-gray-200 px-4 py-3 animate-pulse h-6 w-[200px]" />
          </div>
        ))}
      </div>
    );
  }

  // if (isNoMessageData) {
  //   return (
  //     <div className="flex flex-col h-[200px] w-full justify-center items-center gap-12">
  //       <h2 className="text-center text-2xl">
  //         ยินดีต้อนรับสู่แชท Feature ที่ผนวกร่วมกับ Rome AI
  //       </h2>
  //       <div className="w-[300px]">
  //         <FeatureCard
  //           icon={<MessagesSquare className="w-8 h-8 text-blue-500" />}
  //           title="แชท sale AI & Support"
  //           description="ช่องทางแชทระหว่างฝ่ายขายและลูกค้า พร้อมผนวก AI ช่วยตอบคำถามและสนับสนุนการสนทนาอย่างรวดเร็วและแม่นยำ"
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col h-[calc(100vh-400px)] bg-white dark:bg-secondary">
      <div
        className="flex flex-1 flex-col"
        style={{
          height: 350,
        }}
      >
        <div
          ref={scrollAreaRef}
          className="flex h-full flex-col space-y-6 overflow-y-auto px-4 z-0 relative dark:bg-background"
        >
          {showTopLoading && (
            <div
              className="
      absolute top-4 left-1/2 -translate-x-1/2 z-30
      bg-white dark:bg-gray-800
      text-xs text-muted-foreground text-center
      py-2 px-4
      rounded-lg shadow-md
      w-fit
    "
            >
              กำลังโหลดข้อความ...
            </div>
          )}

          {combinedMessages.map((msg, index) => {
            const isUser = msg.sender !== "ROME Ai";

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
                key={`${msg.lineSubId}+${index}+${msg.sender}`}
                className={`flex max-w-[75%] flex-col gap-1 ${
                  isUser ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
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
                    onClick={() => setPreviewUrl(msg.message)}
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
          })}
          <div ref={bottomRef} />
          {buttonScrollToBottom && (
            <button
              onClick={scrollToBottom}
              className="
                    sticky bottom-5 left-1/2 -translate-x-1/2 z-20
                    bg-white dark:bg-gray-800
                    text-xs text-muted-foreground text-center
                    py-2 px-4
                    rounded-full shadow-lg
                    w-fit cursor-pointer
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    transition-colors duration-200
                "
            >
              ดูข้อความล่าสุด
            </button>
          )}
        </div>
        <ChatInputAIConfig chatRoomId={chatRoomId} isAILoading={false} />
      </div>

      {/* <ChecklistDialog
        open={isCheckStatusOpen}
        onOpenChange={setCheckStatusOpen}
        checklist={checklistData}
        data={customerData}
      /> */}

      {previewUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 h-full"
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewUrl("")}
        >
          <div
            className="relative bg-transparent rounded-lg overflow-hidden w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-10 right-8 bg-white/90 rounded-full p-1 border"
              onClick={() => setPreviewUrl("")}
              aria-label="ปิด"
            >
              <Icons.X className="w-5 h-5" />
            </button>
            <GlobalImage
              src={previewUrl}
              alt="preview"
              className="w-full h-full object-contain"
              width={1200}
              height={800}
            />
          </div>
        </div>
      )}
    </div>
  );
}
