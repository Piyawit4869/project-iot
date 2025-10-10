import React, { createContext, useContext } from "react";

export type Message = {
  roomId: string;
  lastestMessage: string;
};

export type MessageContextType = {
  messages: Message[];
  messagesAI: Message[];
  messagesAITest: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setMessagesAI: React.Dispatch<React.SetStateAction<Message[]>>;
  setMessagesAITest: React.Dispatch<React.SetStateAction<Message[]>>;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [messagesAI, setMessagesAI] = React.useState<Message[]>([]);
  const [messagesAITest, setMessagesAITest] = React.useState<Message[]>([]);

  return (
    <MessageContext.Provider
      value={{
        messages,
        messagesAI,
        messagesAITest,
        setMessages,
        setMessagesAI,
        setMessagesAITest,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage(): MessageContextType {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
}
