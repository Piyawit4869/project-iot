import React, { useRef, useState } from "react";

import dayjs from "dayjs";
import * as Icons from "lucide-react";

import { GlobalImage } from "~/components/shared/global-image";

import { flushSync } from "react-dom";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { CustomerChatSkeleton } from "./noData/customer-chat-skeleton";
import ChatInputAIAssistant from "./chat-input-ai-assistant";
import { useRouteLoaderData } from "react-router";
import { usePaginatedChatRoomAI } from "~/api/client/message/useMessage";
import { useChat } from "~/providers/chat/useChat";
import { StreamingText } from "./streaming-text";
import { useConnectedChatRoomAssistant } from "~/api/client/customer/useCustomer";
import LoadingAnimation from "./loading-animation";
import { usePaginatedChatRoomAIConfig } from "~/api/client/settings";

export default function ChatMessagesWithAI({
  customerId,
  chatRoomId,
  autoScroll,
  setAutoScroll,
  searchPrompt,
  isAILoading,
}: {
  customerId: string;
  chatRoomId: string;
  autoScroll: boolean;
  setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
  searchPrompt?: string;
  isAILoading: boolean;
}) {
  const { me } = useRouteLoaderData("root");

  const profile = me?.profile;

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const newestSeenId = React.useRef<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState("");

  const [showTopLoading, setShowTopLoading] = useState(false);
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const [isScrollReady, setIsScrollReady] = useState(false);
  const [buttonScrollToBottom, setButtonScrollToBottom] = React.useState(false);
  const { messagesAI: socketMessages } = useChat();

  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    // refetch,
  } = usePaginatedChatRoomAIConfig(chatRoomId || "");

  const { mutateAsync: connectedChatRoomAIAssistant, isPending: isPendingAI } =
    useConnectedChatRoomAssistant();

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

  if (isLoading && customerId) {
    return <CustomerChatSkeleton />;
  }

  const messagesLoading = [
    {
      id: 1,
      type: "text",
      messageType: "text",
      message: searchPrompt,
      sender: "user",
      imageUrl: profile?.imageUrl,
      recipient: "",
      name: profile?.firstName,
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

  const lastMessage =
    messagesLoading &&
    messagesLoading.length &&
    messagesLoading[messagesLoading.length - 1];

  return (
    <div className="flex flex-col h-[calc(100vh-500px)] border-1 rounded-sm bg-white dark:bg-background overflow-hidden">
      <div
        className="flex flex-1 flex-col"
        style={{
          height: 300,
        }}
      >
        <div
          ref={scrollAreaRef}
          className="flex h-full flex-col space-y-6 overflow-y-auto px-4 z-0 relative"
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

          {combinedMessages && combinedMessages.length
            ? combinedMessages.map((msg, index) => {
                const isUser = msg.sender !== "ROME AI";

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
                        {index === combinedMessages.length - 1 &&
                        msg.streaming &&
                        !isAILoading ? (
                          <StreamingText text={msg.message} speed={40} />
                        ) : (
                          msg.message
                        )}
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
              })
            : messagesLoading.map((msg, index) => {
                const isUser = msg.sender !== "ROME Ai";

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
                        {msg.message === "AI กำลังตอบ..." ? (
                          <LoadingAnimation />
                        ) : (
                          msg.message
                        )}
                      </div>
                    ) : (
                      <div
                        onClick={() => setPreviewUrl(msg?.message || "")}
                        className="cursor-pointer"
                      >
                        <GlobalImage src={msg?.message || ""} />
                      </div>
                    )}
                  </div>
                );
              })}

          {isPendingAI && (
            <div className="mt-4 flex max-w-[50%] flex-col gap-1 mr-auto items-start">
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="w-6 h-6">
                  <img
                    src={"https://api.dicebear.com/9.x/glass/svg?seed=rome"}
                    alt="avatar"
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback>{"U"[0]}</AvatarFallback>
                </Avatar>

                <span className="text-xs text-muted-foreground font-medium">
                  ROME AI Assistant
                </span>
              </div>
              <div
                className={`rounded-xl px-4 py-2 text-sm whitespace-pre-wrap bg-muted text-primary"`}
              >
                <LoadingAnimation />
              </div>
            </div>
          )}
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
        <ChatInputAIAssistant
          isPendingAI={isPendingAI}
          isAILoading={isAILoading}
          firstTimeMessage={searchPrompt}
          customerId={customerId}
          chatRoomId={chatRoomId}
          connectedChatRoomAIAssistant={connectedChatRoomAIAssistant}
        />
      </div>

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
