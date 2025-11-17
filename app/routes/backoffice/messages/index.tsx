import MessagesContainer from "~/components/modules/message/messages-container";
import { ChatRoomProvider } from "~/providers/chat/useChatRoom";
import { env } from "~/utils/common/env";

export default function MessagePage() {
  const apiSocket = env.PUBLIC_API_URL;

  return (
    <ChatRoomProvider>
      <MessagesContainer api={apiSocket} />
    </ChatRoomProvider>
  );
}
