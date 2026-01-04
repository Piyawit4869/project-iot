import _ from "lodash";

import { formatDateAndTime } from "~/components/shared/global-format";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { MessageAILoading } from "./MessageAILoading";
import ChatInput from "../chat-input";
import { MessageRenderer } from "../render-message-content";
import { MessageMenu } from "../MessageMenu";
import React from "react";
import { useChat, type TypingUser } from "~/providers/chat/useChat";
import { cn } from "~/lib/utils";
import PlaceholderImage from "/assets/images/placeholder.webp";

interface MessageBodyProps {
  api: string;
  messageRefs: React.RefObject<{ [id: string]: HTMLDivElement | null }>;
  bottomRef: React.RefObject<HTMLDivElement | null>;

  showTopLoading: boolean;
  combinedMessages: any[];

  audioRef: React.RefObject<HTMLAudioElement | null>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  togglePlay: () => void;

  setPreviewUrl?: (url: string) => void;

  buttonScrollToBottom: boolean;
  scrollToBottom: () => void;

  onReply: (msg: any) => void;
  replyRefMessage: any;
  setReplyRefMessage: React.Dispatch<React.SetStateAction<any>>;
  copyMessage: (text: string) => void;

  lastMessage: any;
  subId: string;
  selectedRoom: any;
  customer: any;
  typingUsers: TypingUser[];
}

export const MessageBody = React.forwardRef<HTMLDivElement, MessageBodyProps>(
  (props, scrollRef) => {
    const {
      api,
      messageRefs,
      audioRef,
      bottomRef,
      showTopLoading,
      combinedMessages,
      playing,
      setPlaying,
      currentTime,
      setCurrentTime,
      duration,
      setDuration,
      togglePlay,
      buttonScrollToBottom,
      scrollToBottom,
      replyRefMessage,
      setReplyRefMessage,
      copyMessage,
      lastMessage,
      subId,
      selectedRoom,
      customer,
      onReply,
      setPreviewUrl,
      typingUsers,
    } = props;

    return (
      <div className="flex flex-1 flex-col h-full">
        <div
          ref={scrollRef}
          className="flex h-[calc(100vh-330px)] flex-col space-y-4 overflow-y-auto px-4 z-0 relative dark:bg-background"
        >
          {showTopLoading && (
            <div className={messageLoadingStyle}>กำลังโหลดข้อความ...</div>
          )}

          {combinedMessages &&
            combinedMessages.length > 0 &&
            _.uniqBy(combinedMessages, "id").map((msg: any, index: number) => {
              const isBackoffice = msg.platform === "backoffice";

              if (msg.messageLabel === "ROME AI กำลังประมวลผล") return null;

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
                  className={cn(lastMessage ? "animate-message-in" : "")}
                >
                  {msg && msg?.firstMessageToday && (
                    <div className="flex items-center justify-center pt-6">
                      <span className="text-sm text-[12px] text-muted-foreground">
                        {formattedTime}
                      </span>
                    </div>
                  )}
                  <div
                    className={`group flex flex-col ${msg.isLabel || msg.contents?.name ? "" : "max-w-[75%]"} ${
                      msg.platform !== "line"
                        ? "items-end ml-auto"
                        : "items-start mr-auto"
                    } ${msg.isFirstInGroup ? "pt-5" : "pt-0"}`}
                  >
                    {msg.showAvatar && !msg.isLabel && (
                      <div className="flex items-center gap-2 mb-1">
                        <img
                          src={msg.imageUrl ?? PlaceholderImage}
                          alt="avatar"
                          className="w-5 h-5 rounded-full object-cover"
                        />

                        <span className="text-xs text-muted-foreground font-medium">
                          {msg.sender || msg.recipient || "Anonymous"}
                        </span>
                      </div>
                    )}
                    <MessageRenderer
                      msg={msg}
                      isBackoffice={isBackoffice}
                      setPreviewUrl={setPreviewUrl}
                      playing={playing}
                      setPlaying={setPlaying}
                      currentTime={currentTime}
                      setCurrentTime={setCurrentTime}
                      duration={duration}
                      setDuration={setDuration}
                      audioRef={audioRef}
                      togglePlay={togglePlay}
                    />
                    {msg.platform === "line" && (
                      <MessageMenu
                        msg={msg}
                        onReply={() => onReply(msg)}
                        onCopy={() => copyMessage(msg.message)}
                      />
                    )}

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
            <MessageAILoading />
          )}

          <div ref={bottomRef} />
          {buttonScrollToBottom && (
            <button onClick={scrollToBottom} className={seemoreStyle}>
              ดูข้อความล่าสุด
            </button>
          )}
        </div>

        {typingUsers && typingUsers.length > 0 && (
          <div className="px-4 py-2 text-sm text-muted-foreground bg-white dark:bg-background">
            {typingUsers.length >= 3
              ? "คนอื่น ๆ กำลังพิมพ์..."
              : `${typingUsers.map((u) => u.fullName ?? "").join(", ")} กำลังพิมพ์...`}
          </div>
        )}

        <ChatInput
          api={api}
          subId={subId}
          selectedRoom={selectedRoom}
          customer={customer}
          replyRefMessage={replyRefMessage}
          setReplyRefMessage={setReplyRefMessage}
        />
      </div>
    );
  }
);

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
