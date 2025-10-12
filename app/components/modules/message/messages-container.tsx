import React from "react";

import ChatbotSpaceNew from "./chatbot-space-new";
import { usePaginatedChatRooms } from "~/api/client/message/useMessage";
import { computeRooms } from "~/providers/chat/useChatRoom";
import { ChatProvider } from "~/providers/chat/useChat";
import { CustomerProvider } from "~/providers/customer-provider";

const MessagesContainer = ({ api }: { api: string }) => {
  const [combinedRooms, setCombinedRooms] = React.useState([]);
  const [realtimeChatRooms, setRealtimeChatRooms] = React.useState<any>();
  const { data: chatRooms } = usePaginatedChatRooms();

  React.useEffect(() => {
    const next = computeRooms(chatRooms, realtimeChatRooms) as any;
    setCombinedRooms(next);

    if (realtimeChatRooms) setRealtimeChatRooms(null);
  }, [chatRooms, realtimeChatRooms, setCombinedRooms, setRealtimeChatRooms]);

  return (
    <ChatProvider>
      <CustomerProvider>
        <ChatbotSpaceNew api={api} chatRooms={combinedRooms} />
      </CustomerProvider>
    </ChatProvider>
  );
};

export default MessagesContainer;
