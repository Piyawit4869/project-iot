import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import React, { useRef, useState } from "react";
import dayjs from "dayjs";

import FeatureCard from "~/components/shared/feature-card";
import {
  AudioLines,
  MessagesSquare,
  PauseIcon,
  Play,
  PlayIcon,
} from "lucide-react";
import ChatInput from "./chat-input";

import { CustomerChatSkeleton } from "./noData/customer-chat-skeleton";
import { socketConfig } from "~/lib/sockets";
import type { ChatRoomSchemaType } from "~/schemas/message/message";
import { usePaginatedMessagesCursor } from "~/api/client/message/useMessage";
import { useChat, type Message } from "~/providers/chat/useChat";
import StatusToolbar from "./status-toolbar";
import ReactLinkify from "react-linkify";
import {
  formatDateAndTime,
  formatShowTime,
} from "~/components/shared/global-format";

import {
  FileText,
  FileType,
  FileSpreadsheet,
  FileArchive,
  File,
} from "lucide-react";
import LoadingAnimation from "./loading-animation";

import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export function getFileIcon(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() || "";

  switch (ext) {
    case "pdf":
      return <FileText className="w-8 h-8 text-red-500" />;
    case "doc":
    case "docx":
      return <FileType className="w-8 h-8 text-blue-500" />;
    case "xls":
    case "xlsx":
      return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
    case "zip":
    case "rar":
      return <FileArchive className="w-8 h-8 text-yellow-500" />;
    default:
      return <File className="w-8 h-8 text-muted-foreground" />;
  }
}

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

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export default function ChatMessages({
  api,
  customer,
  selectedRoom,
  setAutoScroll,
}: {
  api: string;
  customer: any;
  autoScroll: boolean;
  selectedRoom: ChatRoomSchemaType;
  setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loadingFirstTime, setLoadingFirstTime] = React.useState(true);
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const [currentMsgAI, setCurrentMsgAI] = React.useState<any>({});
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const newestSeenId = React.useRef<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState("");

  const [showTopLoading, setShowTopLoading] = useState(false);
  const [buttonScrollToBottom, setButtonScrollToBottom] = React.useState(false);

  const { messages: socketMessages, addMessage } = useChat();
  const [cursor, setCursor] = React.useState<string>("");

  const messageRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});

  const [targetMessageId, setTargetMessageId] = useState<string>("");
  const [targetMessageOffset, setTargetMessageOffset] = useState<number | null>(
    null
  );
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(
    null
  );

  const [hasScrolledToTarget, setHasScrolledToTarget] = useState(false);

  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePaginatedMessagesCursor(selectedRoom.id, targetMessageId);

  const paginatedMessages = messagesData?.pages.flatMap((page) => page) ?? [];

  // const combinedMessages = React.useMemo(() => {
  //   const paginated = paginatedMessages.flatMap((m) => m.items || []);
  //   const messages = [...paginated, ...socketMessages.flatMap((m) => m || [])]
  //     .sort(
  //       (a, b) =>
  //         dayjs(a.createdAt ?? a.timestamp).valueOf() -
  //         dayjs(b.createdAt ?? b.timestamp).valueOf()
  //     )
  //     .filter((c) => c.chatRoomId === selectedRoom?.id)
  //     .map((message) => {
  //       return {
  //         ...message,
  //         read: message?.platform !== "backoffice" && true,
  //       };
  //     });

  //   const isLast = messages.length - 1;
  //   const isLastNotBackoffice = messages[isLast]?.platform !== "backoffice";

  //   let result = messages;

  //   if (isLastNotBackoffice) {
  //     result = messages.map((message) => {
  //       return { ...message, read: true };
  //     });
  //   }

  //   return result;
  // }, [paginatedMessages, socketMessages]);

  const combinedMessages = React.useMemo(() => {
    const paginated = paginatedMessages.flatMap((m) => m.items || []);
    const messages = [...paginated, ...socketMessages.flatMap((m) => m || [])]
      .sort(
        (a, b) =>
          dayjs(a.createdAt ?? a.timestamp).valueOf() -
          dayjs(b.createdAt ?? b.timestamp).valueOf()
      )
      .filter((c) => c.chatRoomId === selectedRoom?.id)
      .map((message) => ({
        ...message,
        read: message?.platform !== "backoffice" && true,
      }));

    // ------------------------------------------------
    // GROUPING LOGIC
    // ------------------------------------------------

    let groupId = 0;

    const result = messages.map((msg, index) => {
      const prev = messages[index - 1];
      const next = messages[index + 1];

      // check previous
      const samePrev =
        prev &&
        prev.sender === msg.sender &&
        prev.platform === msg.platform &&
        Math.abs(
          dayjs(msg.createdAt ?? msg.timestamp).diff(
            dayjs(prev.createdAt ?? prev.timestamp)
          )
        ) <
          60 * 1000;

      if (!samePrev) {
        groupId += 1; // new group
      }

      // check next
      const sameNext =
        next &&
        next.sender === msg.sender &&
        next.platform === msg.platform &&
        Math.abs(
          dayjs(next.createdAt ?? next.timestamp).diff(
            dayjs(msg.createdAt ?? msg.timestamp)
          )
        ) <
          60 * 1000;

      return {
        ...msg,
        groupId,
        isFirstInGroup: !samePrev,
        isLastInGroup: !sameNext,
        showAvatar: !samePrev,
        showTime: !sameNext,
      };
    });

    // auto read last message
    const isLast = result.length - 1;
    const isLastNotBackoffice = result[isLast]?.platform !== "backoffice";

    // find last message
    const lastIndex = result.length - 1;
    const lastMsg = result[lastIndex];

    const isLastAIProcessing =
      lastMsg?.messageLabel === "ROME AI กำลังประมวลผล";

    // ถ้าข้อความสุดท้าย "ไม่ใช่" AI → ให้โชว์ avatar
    if (!isLastAIProcessing) {
      result[lastIndex] = {
        ...lastMsg,
        showAvatar: true,
        isFirstInGroup: true,
      };
    }

    // ถ้าเป็น AI processing → ให้ซ่อน avatar
    if (isLastAIProcessing) {
      result[lastIndex] = {
        ...lastMsg,
        showAvatar: false,
      };
    }

    if (isLastNotBackoffice) {
      return result.map((m) => ({ ...m, read: true }));
    }
    return result;
  }, [paginatedMessages, socketMessages, selectedRoom?.id]);

  const isNoMessageData = !messagesData || messagesData.pages.length === 0;

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function renderMessageContent(
    msg: any,
    isBackoffice: boolean,
    setPreviewUrl: any
  ) {
    const message = msg?.message ?? "";
    const type = msg?.messageType;

    const isLabel = msg?.isLabel;

    if (isLabel) {
      const formattedTime = formatShowTime(
        msg.createdAt ? msg.createdAt : msg.timestamp
      );
      return (
        <div
          className={`flex w-full justify-center align-center whitespace-pre-wrap`}
        >
          <div className="flex flex-col items-center bg-muted text-primary rounded-full px-5 py-1 text-sm">
            <span className="text-[12px] text-muted-foreground mt-1 ">
              {formattedTime}
            </span>

            <span className="text-[12px] text-bold">{message}</span>
          </div>
        </div>
      );
    }

    // TEXT
    if (type === "text" || type === null) {
      return (
        <div
          className={`rounded-xl px-4 py-2 text-sm whitespace-pre-wrap ${
            isBackoffice ? "bg-blue-500 text-white" : "bg-muted text-primary"
          }`}
        >
          <MessageText text={String(message)} />
        </div>
      );
    }

    // STICKER
    if (type === "sticker") {
      return <img src={message} width={150} height={150} />;
    }

    // FILE (PDF / DOC / ZIP ecc.)
    if (type === "file") {
      const filename = message.split("/").pop() ?? "ไฟล์แนบ";

      return (
        <div
          className="flex items-center gap-3 bg-muted p-3 rounded-xl cursor-pointer hover:bg-muted/70"
          onClick={() => window.open(message, "_blank")}
        >
          {getFileIcon(filename)}

          <div className="flex flex-col">
            <span className="text-sm font-medium">{filename}</span>
            <span className="text-xs text-muted-foreground">
              แตะเพื่อเปิดไฟล์
            </span>
          </div>
        </div>
      );
    }

    if (type === "image") {
      return (
        <div onClick={() => setPreviewUrl(message)} className="cursor-pointer">
          <img
            src={message}
            width={180}
            height={180}
            className="rounded-md object-cover"
          />
        </div>
      );
    }

    // VIDEO
    if (type === "video") {
      return (
        <div
          className="relative cursor-pointer"
          onClick={() => {
            const videoEl = document.createElement("video");
            videoEl.src = message;
            videoEl.autoplay = true;
            videoEl.controls = true;
            videoEl.style.width = "100%";
            videoEl.style.height = "100%";

            // เปิด fullscreen
            videoEl.onloadedmetadata = async () => {
              document.body.appendChild(videoEl);

              try {
                if (videoEl.requestFullscreen) {
                  await videoEl.requestFullscreen();
                }

                await videoEl.play();
              } catch (err) {
                console.error("Fullscreen error:", err);
                videoEl.play();
              }

              // เมื่อออก fullscreen ให้ลบ element
              videoEl.onfullscreenchange = () => {
                if (!document.fullscreenElement) {
                  videoEl.pause();
                  videoEl.remove();
                }
              };
            };
          }}
        >
          {/* Thumbnail */}
          <video
            src={message}
            width={200}
            height={200}
            className="rounded-lg"
            muted
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 rounded-full p-3">
              <Play className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      );
    }

    if (type === "audio") {
      return (
        <div
          className="flex items-center gap-3 bg-muted px-3 py-2 rounded-xl cursor-pointer"
          onClick={togglePlay}
        >
          <AudioLines className="w-6 h-6 text-primary" />

          <span className="font-medium text-sm">
            {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
          </span>

          {/* เวลา (เล่นไป / ทั้งหมด) */}
          <span className="text-xs font-medium ml-2">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <audio
            ref={audioRef}
            src={message}
            preload="auto"
            onLoadedMetadata={() => {
              const audio = audioRef.current;
              if (!audio) return;
              setDuration(audio.duration);
            }}
            onTimeUpdate={() => {
              const audio = audioRef.current;
              if (!audio) return;
              setCurrentTime(audio.currentTime);
            }}
            onEnded={() => {
              setPlaying(false);
              setCurrentTime(0);
            }}
          />
        </div>
      );
    }

    // FALLBACK (เช่น dicebear)
    return (
      <span className="text-[16px] text-muted-foreground mt-1 ">
        ระบบยังไม่รองรับการส่งแบบ Location
      </span>
    );
  }

  React.useLayoutEffect(() => {
    const el = scrollAreaRef.current;
    if (!el || !combinedMessages?.length) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [!!combinedMessages?.length]);

  React.useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

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
  }, [bottomRef.current]);

  React.useEffect(() => {
    if (messagesData?.pages?.length === 1) {
      setAutoScroll(true);
    }
  }, [messagesData]);

  React.useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;

    const THRESHOLD = 5;

    const onScroll = () => {
      if (!hasNextPage || isFetchingNextPage) return;

      if (el.scrollTop <= THRESHOLD) {
        const prevScrollHeight = el.scrollHeight;
        setShowTopLoading(true);

        fetchNextPage().finally(() => {
          setShowTopLoading(false);
          requestAnimationFrame(() => {
            const newScrollHeight = el.scrollHeight;
            const heightDiff = newScrollHeight - prevScrollHeight;
            el.scrollTop = heightDiff;
          });
        });
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
    const socket = socketConfig(api);

    if (selectedRoom?.id) {
      socket.emit("chat", { chatRoomId: `${selectedRoom.id}` });
    }

    socket.on("chat", (msg: Message) => {
      console.log("chat", msg);

      if (msg && msg?.platform === "line") {
        const audio = new Audio("/sounds/level-up.mp3");
        audio.play();
      }

      addMessage({
        ...msg,
        id: uuidv4(),
        imageUrl:
          msg.imageUrl || `https://ui-avatars.com/api/?name=${msg.sender}`,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedRoom]);

  const handleSearchClick = (messageId: string, messageOffset: number) => {
    setTargetMessageId(messageId);
    setTargetMessageOffset(messageOffset);
    setHasScrolledToTarget(false);
  };

  React.useEffect(() => {
    if (!targetMessageId || hasScrolledToTarget) return;

    const el = messageRefs.current[targetMessageId];

    const container = scrollAreaRef.current;
    if (!el || !container) return;

    requestAnimationFrame(() => {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const elCenter = el.offsetTop + elRect.height / 2 - containerRect.top;

      const scrollTop =
        elCenter - container.clientHeight / 2 + container.scrollTop;

      container.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });

      el.classList.add("shake");

      const timer = setTimeout(() => {
        el.classList.remove("shake");
      }, 500);

      setHasScrolledToTarget(true);

      return () => clearTimeout(timer);
    });
  }, [targetMessageId, messagesData, hasScrolledToTarget]);

  // React.useEffect(() => {
  //   setLoadingFirstTime(true);

  //   const timer = setTimeout(() => {
  //     setLoadingFirstTime(false);
  //   }, 200);

  //   return () => clearTimeout(timer);
  // }, [selectedRoom?.id]);

  const lastMessage =
    combinedMessages &&
    combinedMessages.length &&
    combinedMessages[combinedMessages.length - 1];

  const messageLoadingStyle =
    "absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-white dark:bg-gray-800 text-xs text-muted-foreground text-center py-2 px-4 rounded-lg shadow-md w-fit";

  const seemoreStyle = `
                    sticky bottom-5 left-1/2 -translate-x-1/2 z-20
                    bg-white dark:bg-gray-800
                    text-xs text-muted-foreground text-center
                    py-2 px-4
                    rounded-full shadow-lg
                    w-fit cursor-pointer
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    transition-colors duration-200
                `;

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

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-white  dark:bg-background">
      <div className="items-center justify-between gap-4 p-2 border-b bg-white dark:bg-background">
        <div className="hidden xl:block">
          <StatusToolbar
            chatRoomDetail={selectedRoom}
            setCursor={setCursor}
            total={messagesData?.pages[0]?.meta?.total ?? 0}
            onSearchClick={handleSearchClick}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col max-h-[calc(100vh-175px)]">
        <div
          ref={scrollAreaRef}
          className="flex h-full flex-col space-y-4 overflow-y-auto px-4 z-0 relative dark:bg-background"
        >
          {showTopLoading && (
            <div className={messageLoadingStyle}>กำลังโหลดข้อความ...</div>
          )}

          {combinedMessages &&
            combinedMessages.length > 0 &&
            _.uniqBy(combinedMessages, "id").map((msg: any, index: number) => {
              const isBackoffice = msg.platform === "backoffice";

              if (msg.messageLabel === "ROME AI กำลังประมวลผล") return null;

              const isTarget = msg.id === targetMessageId;

              const avatarFallback =
                msg.imageUrl && !msg.imageUrl.includes("http")
                  ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      msg.imageUrl
                    )}`
                  : msg?.imageUrl;

              const formattedTime = formatDateAndTime(
                msg.createdAt ? msg.createdAt : msg.timestamp
              );

              return (
                <div
                  key={`${index}-${msg.id}`}
                  ref={(el) => (messageRefs.current[msg.id] = el) as any}
                  id={`msg-${msg.id}`}
                >
                  {msg && msg?.firstMessageToday && (
                    <div className="flex items-center justify-center pt-6">
                      <span className="text-sm text-[12px] text-muted-foreground">
                        {formattedTime}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex flex-col ${msg.isLabel ? "" : "max-w-[75%]"} ${
                      msg.platform === "backoffice"
                        ? "items-end ml-auto"
                        : "items-start mr-auto"
                    } ${msg.isFirstInGroup ? "pt-5" : "pt-0"}`}
                  >
                    {msg.showAvatar && !msg.isLabel && (
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
                    )}
                    {renderMessageContent(msg, isBackoffice, setPreviewUrl)}
                    {msg.showTime && !msg.isLabel && (
                      <span className="text-[10px] text-muted-foreground mt-1 ">
                        {msg.read && <span>อ่านแล้ว,</span>} {formattedTime}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

          {lastMessage.messageLabel === "ROME AI กำลังประมวลผล" && (
            <div className="w-full mt-4 flex justify-end flex-col gap-1 mr-auto items-end">
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
            <button onClick={scrollToBottom} className={seemoreStyle}>
              ดูข้อความล่าสุด
            </button>
          )}
        </div>

        <ChatInput selectedRoom={selectedRoom} customer={customer} />
      </div>

      {previewUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewUrl("")}
        >
          <div
            className="relative bg-transparent rounded-lg overflow-hidden max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewUrl}
              alt="preview"
              className="w-auto h-[90vh] object-contain rounded-lg"
              width={1200}
              height={800}
            />
          </div>
        </div>
      )}
    </div>
  );
}
