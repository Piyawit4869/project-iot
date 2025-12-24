import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { socketConfig } from "~/lib/sockets";
import { CustomerChatSkeleton } from "./noData/customer-chat-skeleton";
import type { ChatRoomSchemaType } from "~/schemas/message/message";
import { usePaginatedMessagesCursor } from "~/api/client/message/useMessage";
import { useChat, type Message } from "~/providers/chat/useChat";

import { useRouteLoaderData } from "react-router";
import { MessageNoData } from "./chat/MessageNoData";
import { MessagePreviewImage } from "./chat/MessagePreviewImage";
import { MessageHeader } from "./chat/MessageHeader";
import { MessageBody } from "./chat/MessageBody";
import { useChatController } from "~/hooks/chat/useChatController";

export const ChatMessages = ({
  api,
  subId,
  customer,
  selectedRoom,
  setAutoScroll,
}: {
  api: string;
  subId: string;
  customer: any;
  autoScroll: boolean;
  isLineGroup: boolean;
  selectedRoom: ChatRoomSchemaType;
  setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { me } = useRouteLoaderData("root");

  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      // setPlaying(true);
    }
  };

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const newestSeenId = React.useRef<string | null>(null);

  const [previewUrl, setPreviewUrl] = React.useState("");

  const [showTopLoading, setShowTopLoading] = useState(false);
  const [buttonScrollToBottom, setButtonScrollToBottom] = React.useState(false);

  const [replyRefMessage, setReplyRefMessage] = useState<string | null>(null);

  const { messages: socketMessages, addMessage } = useChat();

  const messageRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});

  const [targetMessageId, setTargetMessageId] = useState<string>("");
  const [direction, setDirection] = useState<string>("prev");

  const [hasScrolledToTarget, setHasScrolledToTarget] = useState(false);

  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePaginatedMessagesCursor(selectedRoom.id, targetMessageId, direction);

  const { combinedMessages } = useChatController({
    api,
    me,
    selectedRoom,
    pages: messagesData?.pages ?? [],
    socketMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    socketConfig,
  });
  const meta = messagesData?.pages?.[0]?.meta;

  const isNoMessageData = !messagesData || messagesData.pages.length === 0;

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchClick = (messageId: string) => {
    setTargetMessageId(messageId);
    setDirection("none");
    setHasScrolledToTarget(false);
  };

  const onReply = (msg: any) => {
    setReplyRefMessage(msg);
  };

  const copyMessage = (text: string) => {
    if (!navigator?.clipboard) return;

    navigator.clipboard.writeText(text).catch((err) => {
      console.error("copy failed", err);
    });
  };

  React.useEffect(() => {
    //new message and auto scroll
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
    if (messagesData?.pages?.length === 1) {
      setAutoScroll(true);
    }
  }, [messagesData]);

  React.useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el || !combinedMessages?.length) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [!!combinedMessages?.length]);

  React.useEffect(() => {
    // show button to scroll down
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = scrollArea;
      const isContentScrollable = scrollHeight > clientHeight;
      const SCROLL_THRESHOLD = 5;
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
    // scroll top and down to load

    const el = scrollAreaRef.current;
    if (!el) return;

    const THRESHOLD = 5;

    const onScroll = () => {
      if (!hasNextPage || isFetchingNextPage) return;

      if (el.scrollTop <= THRESHOLD && meta.prev) {
        const prevScrollHeight = el.scrollHeight;
        setShowTopLoading(true);
        setDirection("prev");

        fetchNextPage().finally(() => {
          setShowTopLoading(false);
          requestAnimationFrame(() => {
            const newScrollHeight = el.scrollHeight;
            const heightDiff = newScrollHeight - prevScrollHeight;
            el.scrollTop = heightDiff;
          });
        });
      }

      const isBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - THRESHOLD;

      if (isBottom && meta.next) {
        setDirection("next");
        fetchNextPage();
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  React.useEffect(() => {
    // search and shaker
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

  React.useEffect(() => {
    //clear target on new select room

    if (selectedRoom) {
      setTargetMessageId("");
    }
  }, [selectedRoom]);

  const lastMessage =
    combinedMessages &&
    combinedMessages.length &&
    combinedMessages[combinedMessages.length - 1];

  if (isLoading && selectedRoom) {
    return <CustomerChatSkeleton />;
  }

  if (isNoMessageData) {
    return <MessageNoData />;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-white dark:bg-background">
      <MessageHeader
        chatRoomDetail={selectedRoom}
        total={messagesData?.pages[0]?.meta?.total ?? 0}
        onSearchClick={handleSearchClick}
      />

      <MessageBody
        ref={scrollAreaRef}
        messageRefs={messageRefs}
        showTopLoading={showTopLoading}
        combinedMessages={combinedMessages}
        bottomRef={bottomRef}
        audioRef={audioRef}
        playing={playing}
        setPlaying={setPlaying}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        duration={duration}
        setDuration={setDuration}
        togglePlay={togglePlay}
        setPreviewUrl={setPreviewUrl}
        buttonScrollToBottom={buttonScrollToBottom}
        scrollToBottom={scrollToBottom}
        onReply={onReply}
        replyRefMessage={replyRefMessage}
        setReplyRefMessage={setReplyRefMessage}
        copyMessage={copyMessage}
        lastMessage={lastMessage}
        subId={subId}
        selectedRoom={selectedRoom}
        customer={customer}
      />

      {previewUrl && (
        <MessagePreviewImage
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
        />
      )}
    </div>
  );
};

export default ChatMessages;
