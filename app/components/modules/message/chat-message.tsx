"use client";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import * as Icons from "lucide-react";

import { GlobalImage } from "~/components/shared/global-image";
import FeatureCard from "~/components/shared/feature-card";
import { MessagesSquare } from "lucide-react";
import { Button } from "~/components/ui/button";
import ChatInput from "./chat-input";
import { OrderViewModal } from "./orders-view-modal";
import { AIMessageView } from "./ai-message-view-modal";
import { flushSync } from "react-dom";
import { CustomerChatSkeleton } from "./noData/customer-chat-skeleton";
import { useRouteLoaderData } from "react-router";
import { socketConfig } from "~/lib/sockets";
import type { ChatRoomSchemaType } from "~/schemas/message/message";
import { usePaginatedMessages } from "~/api/client/message/useMessage";
import { useChat, type Message } from "~/providers/chat/useChat";
import StatusToolbar from "./status-toolbar";
import ReactLinkify from "react-linkify";

export function MessageText({ text }: { text: string }) {
  return (
    <ReactLinkify
      componentDecorator={(decoratedHref, decoratedText, key) => (
        <a
          href={decoratedHref}
          key={key}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {decoratedText}
        </a>
      )}
    >
      {text}
    </ReactLinkify>
  );
}

export default function ChatMessages({
  api,
  autoScroll,
  setAutoScroll,
  selectedRoom,
  customer,
}: {
  api: string;
  autoScroll: boolean;
  setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRoom: ChatRoomSchemaType;
  isCreateOrderOpen: boolean;
  customer: any;
}) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const newestSeenId = React.useRef<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState("");

  const [showTopLoading, setShowTopLoading] = useState(false);
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const [isScrollReady, setIsScrollReady] = useState(false);
  const [isCheckStatusOpen, setCheckStatusOpen] = useState(false);
  const [AIOpen, setAIOpen] = useState(false);
  const [buttonScrollToBottom, setButtonScrollToBottom] = React.useState(false);

  const { messages: socketMessages, addMessage } = useChat();

  console.log({ selectedRoom });

  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePaginatedMessages(selectedRoom.id);

  const paginatedMessages = messagesData?.pages.flatMap((page) => page) ?? [];

  const combinedMessages = React.useMemo(() => {
    const paginated = paginatedMessages.flatMap((m) => m.items || []);
    const messages = [...paginated, ...socketMessages.flatMap((m) => m || [])]
      .sort(
        (a, b) =>
          dayjs(a.createdAt ?? a.timestamp).valueOf() -
          dayjs(b.createdAt ?? b.timestamp).valueOf()
      )
      .filter((c) => c.chatRoomId === selectedRoom?.id);
    return messages;
  }, [paginatedMessages, socketMessages]);

  const isNoMessageData = !messagesData || messagesData.pages.length === 0;

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

  React.useEffect(() => {
    if (!isLoading) {
      const socket = socketConfig(api);
      const body = {
        chatRoomId: selectedRoom?.id,
        userId: selectedRoom.customerId,
        branchId: selectedRoom?.branchId,
      };

      socket.emit("mark-read", body); // manual read
      socket.emit("recent-chat", body);
    }
  }, [isLoading, selectedRoom]);

  React.useEffect(() => {
    const socket = socketConfig(api);

    if (selectedRoom?.id) {
      socket.emit("chat", { chatRoomId: `${selectedRoom.id}` });
    }

    socket.on("chat", (msg: Message) => {
      // const isCurrentRoom =
      //   selectedRoom?.id && msg.chatRoomId === selectedRoom.id;

      // if (isCurrentRoom) {
      // const body = {
      //   chatRoomId: selectedRoom.id,
      //   userId: selectedRoom?.customer?.id,
      //   branchId: selectedRoom.branchId,
      // };
      // socket.emit("mark-read", body);
      // setAutoReadMsg(true);
      // setRealtimeChatRooms((prev: any) => ({
      //   ...prev,
      //   unreadMessageCount: 0,
      // }));
      // }

      addMessage({
        ...msg,
        imageUrl:
          msg.imageUrl || `https://ui-avatars.com/api/?name=${msg.sender}`,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedRoom]);

  if (isLoading && selectedRoom) {
    return <CustomerChatSkeleton />;
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
  {
    /* <Button
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
          </Button> */
  }
  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-white dark:bg-secondary">
      <div className="flex items-center justify-between gap-4 p-2 border-b bg-white dark:bg-background">
        <div className="hidden xl:block">
          <StatusToolbar value={"done"} chatRoomDetail={selectedRoom} />
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            size={"sm"}
            className=" bg-muted-foreground text-background hover:bg-gray-200 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
            onClick={() => {
              setAIOpen(true);
            }}
          >
            ข้อมูลลูกค้าผ่าน AI
          </Button>
          <Button
            type="button"
            size={"sm"}
            className="px-3 py-1 bg-black hover:bg-gray-600 text-sm text-background dark:bg-primary"
            onClick={() => {
              setCheckStatusOpen(true);
            }}
          >
            ดูออเดอร์
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col max-h-[calc(100vh-175px)]">
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
            const isBackoffice = msg.platform === "backoffice";

            const avatarFallback =
              msg.imageUrl && !msg.imageUrl.includes("http")
                ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    msg.imageUrl
                  )}`
                : customer?.profile?.imageUrl;

            const formattedTime = dayjs(
              msg.createdAt ? msg.createdAt : msg.timestamp
            ).format("DD MMM YYYY, HH:mm");

            return (
              <div
                key={`${msg.lineSubId}+${index}+${msg.sender}`}
                className={`flex max-w-[75%] flex-col gap-1 ${
                  isBackoffice ? "ml-auto items-end" : "mr-auto items-start"
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
                  <span className="text-xs text-muted-foreground font-medium">
                    {msg.sender || msg.recipient || "Anonymous"}
                  </span>
                </div>

                {msg?.messageType === "text" || msg?.messageType === null ? (
                  <div
                    className={`rounded-xl px-4 py-2 text-sm whitespace-pre-wrap ${
                      isBackoffice
                        ? "bg-blue-500 text-white"
                        : "bg-muted text-primary"
                    }`}
                  >
                    {/* {msg.message} */}
                    <MessageText text={msg.message} />
                  </div>
                ) : (
                  <div
                    onClick={() => setPreviewUrl(msg.message)}
                    className="cursor-pointer"
                  >
                    <img
                      src={msg.message}
                      width={100}
                      height={100}
                      // notShowPreview={
                      //   msg.message ===
                      //   "https://api.dicebear.com/9.x/initials/svg?seed=X&backgroundColor=ffd5dc&scale=100"
                      // }
                    />
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
        <ChatInput selectedRoom={selectedRoom} />
      </div>

      {/* <ChecklistDialog
        open={isCheckStatusOpen}
        onOpenChange={setCheckStatusOpen}
        checklist={checklistData}
        data={customerData}
      /> */}

      <OrderViewModal
        open={isCheckStatusOpen}
        onOpenChange={setCheckStatusOpen}
      />

      <AIMessageView
        open={AIOpen}
        onOpenChange={setAIOpen}
        customer={customer}
      />

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
