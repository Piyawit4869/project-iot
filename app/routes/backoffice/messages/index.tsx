import MessagesContainer from "~/components/modules/message/messages-container";
import { ChatRoomProvider } from "~/providers/chat/useChatRoom";

export default function MessagePage() {
  const apiSocket = import.meta.env.PUBLIC_API_URL;

  return (
    <ChatRoomProvider>
      <MessagesContainer api={apiSocket} />
    </ChatRoomProvider>
  );
}
