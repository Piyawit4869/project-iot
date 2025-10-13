import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";

import { GlobalImage } from "~/components/shared/global-image";
import { cn } from "~/lib/utils";
import { useChat } from "~/providers/chat/useChat";
import {
  mergeRoomImmutable,
  useChatRoom,
  type ChatRoom,
} from "~/providers/chat/useChatRoom";
import { useRouteLoaderData } from "react-router";
import { socketConfig } from "~/lib/sockets";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Expand, Icon } from "lucide-react";

interface Props {
  handleChangeSelectedRoom: (room: any) => void;
  api: string;
  resize: number;
  details: any;
}
export default function ChatlistSidebar({
  api,
  resize,
  details,
  handleChangeSelectedRoom,
}: Props) {
  const { me } = useRouteLoaderData("root");

  const {
    chatRooms,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    setSidebarOpen,
    fetchNextPage,
    setOnSelectRoom,
    currentCustomer,
  } = details;

  const [allRooms, setAllRooms] = React.useState<ChatRoom[]>([]);

  React.useEffect(() => {
    const socket = socketConfig(api);

    if (me?.branchId) {
      socket.emit("rooms", `${me.branchId}`);
    }

    socket.on("rooms", (room: any) => {
      console.log({ room });
      setAllRooms((prev) => mergeRoomImmutable(prev, room));
    });

    return () => {
      socket.disconnect();
    };
  }, [me]);

  React.useEffect(() => {
    if (chatRooms) {
      setAllRooms(chatRooms);
    }
  }, [chatRooms]);

  console.log({ chatRooms });

  const { currentRoomId } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || isFetchingNextPage || !hasNextPage) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (
      el &&
      el.scrollHeight <= el.clientHeight &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <aside className="h-full border-r dark:bg-background flex flex-col border-l">
      <div className="p-3 border-b flex flex-col">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">แชท</h2>
          <Button variant="link" className="px-0">
            นำออกข้อมูล
          </Button>
        </div>

        <Input placeholder="ค้นหา" className="w-full" />
      </div>

      <div
        className="flex-1 overflow-y-auto"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {isLoading ? (
          <LoadingSkeleton />
        ) : allRooms.length > 0 ? (
          allRooms.map((chat: any, i: any) => (
            <ChatItem
              key={chat?.id + i}
              roomId={chat?.id ?? ""}
              selectedRoom={currentRoomId}
              resize={resize}
              name={chat?.customer?.fullName || chat?.name}
              message={chat?.latestMessage?.messageLabel}
              time={
                chat?.updatedAt
                  ? dayjs(chat?.latestMessage?.createdAt).format("h:mm A") || ""
                  : "-"
              }
              image={chat?.customer?.imageUrl || ""}
              unread={chat?.unreadMessageCount > 0}
              countUnreadMessage={chat?.unreadMessageCount || 0}
              currentCustomer={currentCustomer}
              onChatClick={() => {
                handleChangeSelectedRoom(chat);
                setSidebarOpen(false);
                setOnSelectRoom(true);
                // removeMessage(); // clear messages from previous room

                // Zero out unread count in realtimeChatRooms (optional)
                // setRealtimeChatRooms?.((prev: any) => {
                //   if (prev?.id === chat?.id) {
                //     return { ...prev, unreadMessageCount: 0 };
                //   }
                //   return prev;
                // });
              }}
            />
          ))
        ) : (
          <EmptyChat />
        )}

        {hasNextPage && (
          <div className="p-4 text-center text-gray-400 ">
            กำลังโหลดเพิ่มเติม...
          </div>
        )}
      </div>
    </aside>
  );
}

type ChatItemProps = {
  name: string;
  message: string;
  time: string;
  unread?: boolean;
  image?: string;
  countUnreadMessage: number;
  onChatClick?: () => void;
  resize: number;
  selectedRoom: string;
  roomId: string;
  currentCustomer: any;
};

function ChatItem({
  name,
  message,
  time,
  unread = false,
  image,
  countUnreadMessage = 0,
  onChatClick,
  resize,
  roomId,
}: ChatItemProps) {
  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}`;
  const { autoReadMsg } = useChatRoom();
  const { setCurrentRoomId, currentRoomId } = useChat();

  return (
    <div
      className={cn(
        "sm:justify-center",
        currentRoomId === roomId && "bg-gray-300",
        resize <= 25 && "justify-center",
        "flex items-center px-4 py-3 hover:bg-border cursor-pointer transition w-full"
        // unread && "bg-gray-200"
      )}
      onClick={() => {
        setCurrentRoomId?.(roomId);
        onChatClick?.();
      }}
    >
      <div className="relative w-12 h-12 shrink-0">
        <GlobalImage
          src={!image || image === "" ? fallbackImage : image}
          alt={name}
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
      </div>

      {resize > 25 && (
        <div className="hidden ml-3 lg:flex flex-col min-w-0 flex-1">
          <div className="flex justify-between items-center gap-2 min-w-0">
            <p className={cn("text-sm truncate")}>{name}</p>

            <span className="text-xs text-black-400 whitespace-nowrap shrink-0">
              {time}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <p
              className={cn(
                "text-sm truncate text-black-400  sm:max-w-[200px] lg:max-w-[250px] min-w-[170px] whitespace-nowrap overflow-hidden",
                unread && "font-medium"
              )}
            >
              {message}
            </p>

            {!autoReadMsg && countUnreadMessage > 0 && (
              <span
                className="ml-2 inline-grid place-items-center min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-medium"
                aria-hidden
              >
                {countUnreadMessage}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-2/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

const EmptyChat = () => {
  return (
    <div className="text-center text-gray-400 py-6">
      ขณะนี้ยังไม่มีรายการแชท
    </div>
  );
};
