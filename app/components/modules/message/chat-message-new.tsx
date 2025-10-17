"use client";

import { usePaginatedMessages } from "@/actions/chat/client/useMessage";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatRoomSchemaType } from "@/schemas/chat/message";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useChat } from "@/stores/chat/useChat";
import dayjs from "dayjs";

import { GlobalImage } from "@/components/shared/global-image";
import FeatureCard from "@/components/shared/feature-card";
import { MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui";
import { ChecklistDialog } from "./check-status";
import ChatInput from "./chat-input";

export default function ChatMessages({
  autoScroll,
  setAutoScroll,
  selectedRoom,
  isCreateOrderOpen,
}: {
  autoScroll: boolean;
  setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRoom: ChatRoomSchemaType;
  isCreateOrderOpen: boolean;
}) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [showTopLoading, setShowTopLoading] = useState(false);
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const [isScrollReady, setIsScrollReady] = useState(false);
  const [isCheckStatusOpen, setCheckStatusOpen] = useState(false);
  const [buttonScrollToBottom, setButtonScrollToBottom] = React.useState(false);

  const { messages: socketMessages } = useChat();

  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePaginatedMessages(selectedRoom.id);

  const paginatedMessages =
    messagesData?.pages.flatMap((page) => page.res) ?? [];

  const combinedMessages = [
    ...paginatedMessages.flatMap((m) => m.items || []),
    ...socketMessages.flatMap((m) => m || []),
  ].sort(
    (a, b) =>
      dayjs(a.createdAt ?? a.timestamp).valueOf() -
      dayjs(b.createdAt ?? b.timestamp).valueOf()
  );

  const isNoMessageData = !messagesData || messagesData.pages.length === 0;
  const customerData = {
    status: "active",
    type: "retail",
    name: "ACME Corp",
    id: selectedRoom.customer.id,
  };

  const checklistData = [
    { key: "status", label: "สถานะลูกค้า" },
    { key: "type", label: "ประเภทกิจการ" },
    { key: "name", label: "ชื่อลูกค้า" },
    {
      key: "taxId",
      label:
        customerData.type === "juristic_person"
          ? "เลขประจำตัวผู้เสียภาษี"
          : "เลขประจำตัวประชาชน",
    },
    { key: "businessPhone", label: "หมายเลขโทรศัพท์กิจการ" },
    { key: "businessEmail", label: "อีเมลกิจการ" },
    { key: "importantDate", label: "วันสำคัญของกิจการ" },
    { key: "establishedDate", label: "วันก่อตั้งของกิจการ" },
    { key: "accountOwner", label: "ชื่อเจ้าของบัญชี" },
  ];

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

  useEffect(() => {
    if (messagesData?.pages?.length === 1) {
      setAutoScroll(true);
    }
  }, [messagesData]);

  useEffect(() => {
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

  useEffect(() => {
    if (!isScrollReady) return;

    const handleScroll = () => {
      const el = scrollAreaRef.current;

      if (!el) return;

      if (!hasScrolledOnce && hasAutoScrolled) {
        setHasScrolledOnce(true);
      }

      if (
        el.scrollTop < 10 &&
        hasNextPage &&
        !isFetchingNextPage &&
        hasScrolledOnce
      ) {
        const previousScrollHeight = el.scrollHeight;

        setShowTopLoading(true);
        fetchNextPage().finally(() => {
          setShowTopLoading(false);

          requestAnimationFrame(() => {
            setTimeout(() => {
              const newScrollHeight = el.scrollHeight;
              const heightDifference = newScrollHeight - previousScrollHeight;

              el.scrollTop = heightDifference;
            }, 300);
          });
        });
      }
    };

    const el = scrollAreaRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }

    return () => el?.removeEventListener("scroll", handleScroll);
  }, [
    isScrollReady,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    hasScrolledOnce,
    hasAutoScrolled, // Make sure these are still relevant to your current state logic
  ]);

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

  if (isNoMessageData) {
    return (
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
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-secondary">
      <div className="flex items-center justify-end gap-4 p-4 border-b bg-white dark:bg-border sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            {selectedRoom?.users?.map((user) => (
              <Avatar
                key={user?.id}
                className="w-8 h-8 border-2 border-white shadow-sm"
              >
                <AvatarFallback>
                  {user?.id?.slice(0, 2).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>

          {/* Buttons */}
          <Button
            type="button"
            size={"sm"}
            className="px-3 py-1  bg-gray-100 hover:bg-gray-200 text-sm text-black"
            onClick={() => {
              setCheckStatusOpen(true);
            }}
          >
            ตรวจสอบสถานะ
          </Button>
          <Button
            disabled={!isCreateOrderOpen}
            type="button"
            size={"sm"}
            className="btn px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm"
            onClick={() =>
              //  router.push("/notation-view")
              window.open("/notation-view", "_blank")
            }
          >
            ออกใบเสนอราคา
          </Button>
        </div>
      </div>

      <div
        ref={scrollAreaRef}
        className="flex flex-col space-y-6 overflow-y-auto px-4 z-0 relative"
        style={{
          height: "calc(100vh - 240px)",
        }}
      >
        {showTopLoading && (
          <div
            className="
        sticky left-1/2 -translate-x-1/2 z-20
        bg-white dark:bg-gray-800
        text-xs text-muted-foreground text-center
        py-2 px-4
        rounded-b-lg shadow-md
        w-fit
      "
          >
            กำลังโหลดข้อความ...
          </div>
        )}

        {combinedMessages.map((msg, i) => {
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
      <ChatInput selectedRoom={selectedRoom} />
      <ChecklistDialog
        open={isCheckStatusOpen}
        onOpenChange={setCheckStatusOpen}
        checklist={checklistData}
        data={customerData}
      />
    </div>
  );
}
