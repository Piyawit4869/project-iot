"use client";

import React, { createContext, useContext, useState } from "react";

export type Message = {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  imageUrl?: string;
  platform?: string;
};

export type RoomMessageState = {
  messages: Message[];
  lastestMessage: string;
};

export type MessageContextType = {
  messages: Record<string, RoomMessageState>;
  setMessages: React.Dispatch<
    React.SetStateAction<Record<string, RoomMessageState>>
  >;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const ChatBotProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<Record<string, RoomMessageState>>(
    {}
  );

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useChatBot = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context)
    throw new Error("useChatBot must be used within a ChatBotProvider");
  return context;
};
