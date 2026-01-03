import React, { useRef, useState } from "react";
import _ from "lodash";

import { socketConfig } from "~/lib/sockets";
import { CustomerChatSkeleton } from "./noData/customer-chat-skeleton";
import type { ChatRoomSchemaType } from "~/schemas/message/message";
import { usePaginatedMessagesCursor } from "~/api/client/message/useMessage";
import { useChat } from "~/providers/chat/useChat";

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

  const isAtBottomRef = React.useRef<boolean>(true);

  const prevMessageLengthRef = React.useRef<number>(0);

  const hasInitialScrolledRef = React.useRef<boolean>(false);

  const isFetchingPrevRef = React.useRef<boolean>(false);

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollRafRef = React.useRef<number | null>(null);

  const isProgrammaticScroll = React.useRef(false);

  const [previewUrl, setPreviewUrl] = React.useState("");

  const [isSearching, setIsSearching] = React.useState<boolean>(false);

  const [showTopLoading, setShowTopLoading] = useState(false);
  const [buttonScrollToBottom, setButtonScrollToBottom] = React.useState(false);

  const [replyRefMessage, setReplyRefMessage] = useState<string | null>(null);

  const { messages: socketMessages, addMessage, typingUsers } = useChat();

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
    setIsSearching(true);
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
    if (messagesData?.pages?.length === 1) {
      setAutoScroll(true);
    }
  }, [messagesData]);

  console.log({ combinedMessages });

  React.useEffect(() => {
    // show button to scroll down
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = scrollArea;
      const THRESHOLD = 20;

      isAtBottomRef.current =
        scrollTop + clientHeight >= scrollHeight - THRESHOLD;

      setButtonScrollToBottom(!isAtBottomRef.current);
    };

    scrollArea.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      scrollArea.removeEventListener("scroll", handleScroll);
    };
  }, [bottomRef.current]);

  React.useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;

    const THRESHOLD = 5;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const THRESHOLD = 20;

      isAtBottomRef.current =
        scrollTop + clientHeight >= scrollHeight - THRESHOLD;

      setButtonScrollToBottom(!isAtBottomRef.current);

      if (isSearching || isProgrammaticScroll.current) return;

      if (!hasNextPage || isFetchingNextPage) return;

      if (scrollTop <= 5 && meta?.prev) {
        isFetchingPrevRef.current = true;

        const prevHeight = el.scrollHeight;
        setShowTopLoading(true);
        setDirection("prev");

        fetchNextPage().finally(() => {
          setShowTopLoading(false);

          requestAnimationFrame(() => {
            el.scrollTop = el.scrollHeight - prevHeight;
            isFetchingPrevRef.current = false;
          });
        });
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [hasNextPage, isFetchingNextPage, meta, isSearching]);

  React.useEffect(() => {
    if (!targetMessageId || hasScrolledToTarget) return;

    const el = messageRefs.current[targetMessageId];
    const container = scrollAreaRef.current;
    if (!el || !container) return;

    isProgrammaticScroll.current = true;
    setIsSearching(true);

    requestAnimationFrame(() => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      el.classList.add("shake");
      setTimeout(() => el.classList.remove("shake"), 500);

      setHasScrolledToTarget(true);

      setTimeout(() => {
        isProgrammaticScroll.current = false;
        setIsSearching(false);
        setTargetMessageId("");
        setDirection("prev");
      }, 800); // ⬅️ สำคัญ
    });
  }, [targetMessageId, messagesData]);

  React.useEffect(() => {
    if (selectedRoom) {
      setTargetMessageId("");
    }
  }, [selectedRoom]);

  const lastMessage =
    combinedMessages &&
    combinedMessages.length &&
    combinedMessages[combinedMessages.length - 1];

  const scheduleScrollToBottom = React.useCallback(() => {
    if (scrollRafRef.current) return;

    scrollRafRef.current = requestAnimationFrame(() => {
      const el = scrollAreaRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
      scrollRafRef.current = null;
    });
  }, []);

  React.useEffect(() => {
    const handleImageLoaded = () => {
      const el = scrollAreaRef.current;
      if (!el) return;

      if (!hasInitialScrolledRef.current) {
        hasInitialScrolledRef.current = true;
        isAtBottomRef.current = true;
        scheduleScrollToBottom();
        return;
      }

      if (!isAtBottomRef.current) return;

      scheduleScrollToBottom();
    };

    window.addEventListener("chat-image-loaded", handleImageLoaded);
    return () => {
      window.removeEventListener("chat-image-loaded", handleImageLoaded);
    };
  }, [scheduleScrollToBottom]);

  React.useEffect(() => {
    const currentLength = combinedMessages.length;
    const prevLength = prevMessageLengthRef.current;

    if (currentLength <= prevLength) {
      prevMessageLengthRef.current = currentLength;
      return;
    }

    prevMessageLengthRef.current = currentLength;

    if (isFetchingPrevRef.current) return;
    if (isSearching) return;

    const el = scrollAreaRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [combinedMessages.length, isSearching]);

  React.useEffect(() => {
    hasInitialScrolledRef.current = false;
  }, [selectedRoom?.id]);

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
        api={api}
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
        typingUsers={typingUsers}
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
