import { useEffect } from "react";
import { socketConfig } from "~/lib/sockets";
import { v4 as uuid } from "uuid";

export function useSocketMessage(api: string, roomId: string, append: any) {
  useEffect(() => {
    const socket = socketConfig(api);

    socket.emit("chat", { chatRoomId: roomId });

    socket.on("chat", (msg: any) => {
      append({
        ...msg,
        id: uuid(),
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);
}
