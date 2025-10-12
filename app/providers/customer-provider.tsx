import React, {
  createContext,
  useContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

export type CustomerMessage = {
  roomId: string;
  lastestMessage: string;
};

export type CustomerContextType = {
  messages: CustomerMessage[];
  messagesAI: CustomerMessage[];
  messagesAITest: CustomerMessage[];
  setMessages: Dispatch<SetStateAction<CustomerMessage[]>>;
  setMessagesAI: Dispatch<SetStateAction<CustomerMessage[]>>;
  setMessagesAITest: Dispatch<SetStateAction<CustomerMessage[]>>;
};

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = React.useState<CustomerMessage[]>([]);
  const [messagesAI, setMessagesAI] = React.useState<CustomerMessage[]>([]);
  const [messagesAITest, setMessagesAITest] = React.useState<CustomerMessage[]>(
    []
  );

  return (
    <CustomerContext.Provider
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
    </CustomerContext.Provider>
  );
}

export function useCustomer(): CustomerContextType {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within an CustomerProvider");
  }
  return context;
}
