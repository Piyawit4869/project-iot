import ChatlistSidebar from "./chatlist-sidebar";
import { useChatRoom } from "~/providers/chat/useChatRoom";

export const ChatlistContainer = ({
  chatRooms,
  api,
  handleChangeSelectedRoom,
}: {
  chatRooms: any;
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
    setSearch,
  } = useChatRoom();

  return (
    <div className="h-full">
      <ChatlistSidebar
        api={api}
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
          setSearch,
        }}
      />
    </div>
  );
};
