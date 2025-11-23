// chat/helpers/socket.attach.ts
import { socketConfig } from "~/lib/sockets";
import { v4 as uuidv4 } from "uuid";

export function attachSocket({ api, selectedRoom, addMessage }: any) {
  const socket = socketConfig(api);

  if (selectedRoom?.id) {
    socket.emit("chat", { chatRoomId: `${selectedRoom.id}` });
  }

  socket.on("chat", (msg) => {
    if (msg?.platform === "line") {
      new Audio("/sounds/level-up.mp3").play();
    }

    addMessage({
      ...msg,
      id: uuidv4(),
      imageUrl:
        msg.imageUrl || `https://ui-avatars.com/api/?name=${msg.sender}`,
    });
  });

  return () => socket.disconnect();
}
