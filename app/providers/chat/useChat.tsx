import React, { createContext, useContext, useRef, useState } from "react";

export type Message = {
  id: string;
  chatRoomId: string;
  message: string;
  lineSubId: string;
  status: string;
  sender: string;
  recipient: string;
  isAiReply: boolean;
  platform: string;
  customerId: string;
  imageUrl: string;
  timestamp: string;
  messageId: string;
};

export type TypingUser = {
  userId: string;
  fullName: string;
};

export type ChatInputLabel = {
  chatRoomId: string;
  label: string;
};

type ChatContextType = {
  currentRoomId: string;
  messages: Message[];
  messagesAI: Message[];
  addMessage: (msg: Message) => void;
  addMessageAI: (msg: Message) => void;
  addMessagesToTop: (msgs: Message[]) => void;
  updateMessage: (id: string | number, updated: Partial<Message>) => void;
  removeMessage: () => void;
  clearMessagesAI: () => void;
  setCurrentRoomId: (roomId: string) => void;
  setMessagesAI: (value: any) => void;
  typingUsers: TypingUser[];
  setTypingUsers: React.Dispatch<React.SetStateAction<TypingUser[]>>;
  chatInputLabel: ChatInputLabel[];
  setChatInputLabel: React.Dispatch<React.SetStateAction<ChatInputLabel[]>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesAI, setMessagesAI] = useState<Message[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string>("");

  const [typingUsers, setTypingUsers] = React.useState<TypingUser[]>([]);
  const [chatInputLabel, setChatInputLabel] = React.useState<ChatInputLabel[]>(
    []
  );

  const addMessagesToTop = (msgs: Message[]) => {
    setMessages((prev) => {
      const newMessages = msgs.filter(
        (msg) => !prev.some((m) => m.timestamp === msg.timestamp)
      );
      return [...newMessages, ...prev];
    });
  };

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const addMessageAI = (msg: Message) => {
    setMessagesAI((prev) => [...prev, msg]);
  };

  const updateMessage = (id: string | number, updated: Partial<Message>) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...updated } : msg))
    );
  };

  const removeMessage = () => {
    setMessages([]);
    setMessagesAI([]);
  };

  const clearMessagesAI = () => {
    setMessages([]);
    setMessagesAI([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        messagesAI,
        currentRoomId,
        addMessage,
        addMessagesToTop,
        updateMessage,
        removeMessage,
        clearMessagesAI,
        addMessageAI,
        setCurrentRoomId,
        setMessagesAI,
        typingUsers,
        setTypingUsers,
        chatInputLabel,
        setChatInputLabel,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};
