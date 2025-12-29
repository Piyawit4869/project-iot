import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useChat, type Message } from "~/providers/chat/useChat";

interface UseChatSocketProps {
  api: any;
  selectedRoom: { id: string } | null;
  me: { branchId?: string; id: string } | null;
  socketConfig: (api: any) => any;
}

export function useChatSocket({
  api,
  selectedRoom,
  me,
  socketConfig,
}: UseChatSocketProps) {
  const { addMessage } = useChat();

  useEffect(() => {
    if (!selectedRoom?.id) return;

    const socket = socketConfig(api);
    socket.emit("chat", { chatRoomId: `${selectedRoom.id}` });

    socket.on("chat", (msg: Message) => {
      socket.emit("mark-read", {
        chatRoomId: `${selectedRoom.id}`,
        branchId: me?.branchId,
      });

      addMessage({
        ...msg,
        id: uuidv4(),
        imageUrl:
          msg.imageUrl || `https://ui-avatars.com/api/?name=${msg.sender}`,
      });
    });

    return () => socket.disconnect();
  }, [selectedRoom?.id, me]);
}
