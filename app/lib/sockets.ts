import { io, Socket } from "socket.io-client";
import { env } from "~/utils/common/env";

export const socketConfig = (api: string): Socket => {
  const config: Socket = io(env.BASE_URL + `/live-chat`, {
    transports: ["websocket"],
    autoConnect: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
  });
  return config;
};
