import React from "react";

import ChatlistSidebar from "./chatlist-sidebar";
import { useChatRoom } from "~/providers/chat/useChatRoom";

export const ChatlistContainer = ({
  chatRooms,
  resize,
  api,
  handleChangeSelectedRoom,
}: {
  chatRooms: any;
  resize: number;
  api: string;
  handleChangeSelectedRoom: (room: any) => void;
}) => {
  const {
    customer: currentCustomer,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    realtimeChatRooms,
    rooms,
    setSidebarOpen,
    fetchNextPage,
    setOnSelectRoom,
  } = useChatRoom();

  return (
    <div className="h-[calc(100vh-50px)]">
      <ChatlistSidebar
        api={api}
        resize={resize}
        handleChangeSelectedRoom={handleChangeSelectedRoom}
        details={{
          rooms,
          chatRooms,
          isLoading,
          hasNextPage,
          isFetchingNextPage,
          realtimeChatRooms,
          setSidebarOpen,
          fetchNextPage,
          setOnSelectRoom,
          currentCustomer,
          handleChangeSelectedRoom,
        }}
      />
    </div>
  );
};
