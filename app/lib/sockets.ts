import {
  io,
  Socket,
  type ManagerOptions,
  type SocketOptions,
} from "socket.io-client";
import { env } from "~/utils/common/env";

export const socketConfig = (api: string): Socket => {
  const token = localStorage.getItem("accessToken");

  const options: Partial<ManagerOptions & SocketOptions> = {
    transports: ["websocket"],
    autoConnect: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    auth: {
      token: `Bearer ${token}`,
    },
  };

  const config: Socket = io("wss://service-zev.flune.xyz/live-chat", options);
  return config;
};
