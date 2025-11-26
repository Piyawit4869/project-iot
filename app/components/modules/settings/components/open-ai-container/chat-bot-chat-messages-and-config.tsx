import dayjs from "dayjs";
import React from "react";
import { usePaginatedChatRoomAIConfig } from "~/api/client/settings";
import type { ChatRoomSchemaType, ConnectAiValues } from "~/schemas/settings";
import { flushSync } from "react-dom";
import { GlobalImage } from "~/components/shared/global-image";
import { X } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { ChatInputOpenAiConfig } from "./chat-input-open-ai-config";
import { useChat } from "~/providers/chat/useChat";
import { formatDateHHMM } from "~/components/shared/global-format";
import { StreamingText } from "~/components/modules/message/streaming-text";
import LoadingAnimation from "~/components/modules/message/loading-animation";
import { useConnectedChatRoomAIConfig } from "~/api/client/customer/useCustomer";

interface ChatBotChatMessagesAndConfigProps {
  chatRoomId: string;
  autoScroll: boolean;
  setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRoom?: ChatRoomSchemaType;
  searchPrompt?: string;
  data: ConnectAiValues;
}

export const ChatBotChatMessagesAndConfig: React.FC<
  ChatBotChatMessagesAndConfigProps
> = (props) => {
  const {
    chatRoomId,
    selectedRoom,
    autoScroll,
    setAutoScroll,
    data,
    searchPrompt,
  } = props;

  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);
  const newestSeenId = React.useRef<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState("");

  const [showTopLoading, setShowTopLoading] = React.useState(false);
  const [hasScrolledOnce, setHasScrolledOnce] = React.useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = React.useState(false);
  const [isScrollReady, setIsScrollReady] = React.useState(false);
  // const [isCheckStatusOpen, setCheckStatusOpen] = useState(false);
  // const [AIOpen, setAIOpen] = useState(false);
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

  const { mutateAsync: connectedChatRoomAI, isPending: isPendingAI } =
    useConnectedChatRoomAIConfig();

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
                className={`flex max-w-[75%] flex-col gap-1 ${
                  isUser ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-6 h-6">
                    <img
                      src={avatarFallback || "/avatar.png"}
                      alt="avatar"
                      className="rounded-full object-cover w-full h-full"
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
                    {index === combinedMessages.length - 1 && msg.streaming ? (
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
          })}
          {isPendingAI && (
            <div
              className={
                "mt-4 flex max-w-[75%] flex-col gap-1 mr-auto items-start"
              }
            >
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
                  ROME AI
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
        <ChatInputOpenAiConfig
          data={data}
          chatRoomId={chatRoomId}
          isAILoading={false}
          isPendingAI={isPendingAI}
          connectedChatRoomAI={connectedChatRoomAI}
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
              <X className="w-5 h-5" />
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
};
