"use client";

import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import dynamic from "next/dynamic";

// import { ChatRoomSchemaType } from "@/schemas/chat/message";
// import Image from "next/image";
// import { Skeleton } from "../ui";
// import Link from "next/link";
import { useChatRoom } from "@/stores/chat/useRoom";

export default function ChatFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const { selectedRoom, isLoading } = useChatRoom();

  const SocketClientMessage = dynamic(
    () => import("@/components/features/message/chatbox"),
    {
      ssr: false,
    }
  );

  const toggleChatList = () => {
    setIsOpen((prev) => !prev);
    setActiveChat(null);
  };

  // const openChat = (name: string) => {
  //   setActiveChat(name);
  // };

  // const visibleChats = chatRooms?.slice(0, 3) ?? [];
  // const remainingCount = (chatRooms?.length ?? 0) - visibleChats.length;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* {isOpen &&
        (isLoading ? (
          <>
            <Skeleton className="w-14 h-14 rounded-full" />
            <Skeleton className="w-14 h-14 rounded-full" />
            <Skeleton className="w-14 h-14 rounded-full" />
          </>
        ) : (
          <>
            {visibleChats.map((chat: ChatRoomSchemaType) => {
              const fallbackImage =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(chat.name);

              return (
                <Button
                  key={chat.name}
                  onClick={() => {
                    removeMessage();
                    setSelectedRoom(chat);
                    openChat(chat.name);
                  }}
                  className="w-14 h-14 p-0 rounded-full shadow-lg bg-white hover:bg-muted"
                >
                  <Image
                    src={fallbackImage}
                    alt={chat.name}
                    width={56}
                    height={56}
                    unoptimized
                    className="rounded-full object-cover w-full h-full"
                  />
                </Button>
              );
            })}

            {remainingCount > 0 && (
              <Link href={"/organization//message"}>
                <Button className="w-14 h-14 rounded-full bg-primary text-white hover:bg-primary/90">
                  +{remainingCount}
                </Button>
              </Link>
            )}
          </>
        ))} */}

      {activeChat && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md">
          <SocketClientMessage
            chatName={activeChat}
            roomLoading={isLoading}
            selectedRoom={selectedRoom}
          />
        </div>
      )}

      <Button
        onClick={toggleChatList}
        size="icon"
        className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary text-white"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}
