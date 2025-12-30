import React from "react";
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
  const { addMessage, setTypingUsers } = useChat();

  const typingTimeouts = React.useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    if (!selectedRoom?.id) return;

    const socket = socketConfig(api);
    socket.emit("chat", { chatRoomId: `${selectedRoom.id}` });

    socket.on("typing", (payload: any) => {
      console.log("👂 typing event onnnnnn:", payload);

      setTypingUsers((prev) => {
        if (prev.some((u) => u.userId === payload.userId)) {
          return prev;
        }

        return [
          ...prev,
          {
            userId: payload.userId,
            fullName: payload.fullName,
          },
        ];
      });

      if (typingTimeouts.current[payload.userId]) {
        clearTimeout(typingTimeouts.current[payload.userId]);
      }

      typingTimeouts.current[payload.userId] = setTimeout(() => {
        setTypingUsers((prev) =>
          prev.filter((u) => u.userId !== payload.userId)
        );
        delete typingTimeouts.current[payload.userId];
      }, 2000); // 👈 1.5 sec
    });

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

// export function useChatSocket({
//   api,
//   selectedRoom,
//   me,
//   socketConfig,
// }: UseChatSocketProps) {
//   const { addMessage, typingUsers, setTypingUsers } = useChat();

//   // keep timeout per user
//   const typingTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

//   useEffect(() => {
//     if (!selectedRoom?.id) return;

//     const socket = socketConfig(api);

//     socket.emit("join-room", { chatRoomId: selectedRoom.id });

//     socket.on("typing", (payload: any) => {
//       console.log("👂 typing event:", payload);

//       if (payload.userId === me?.id) return;

//       // ✅ ADD USER (if not exists)
//       setTypingUsers((prev) => {
//         if (prev.some((u) => u.userId === payload.userId)) {
//           return prev;
//         }

//         return [
//           ...prev,
//           {
//             userId: payload.userId,
//             fullName: payload.fullName,
//           },
//         ];
//       });

//       // ✅ RESET TIMER
//       if (typingTimeouts.current[payload.userId]) {
//         clearTimeout(typingTimeouts.current[payload.userId]);
//       }

//       typingTimeouts.current[payload.userId] = setTimeout(() => {
//         setTypingUsers((prev) =>
//           prev.filter((u) => u.userId !== payload.userId)
//         );
//         delete typingTimeouts.current[payload.userId];
//       }, 1500); // 👈 1.5 sec
//     });

//     socket.on("chat", (msg: Message) => {
//       addMessage({ ...msg, id: uuidv4() });
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [selectedRoom?.id, me?.id]);
// }
