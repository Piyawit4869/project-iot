import { io, Socket } from "socket.io-client";

export const socketConfig = (api: string): Socket => {
  const config: Socket = io(api + `/live-chat`, {
    transports: ["websocket"],
    // autoConnect: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
  });
  return config;
};
