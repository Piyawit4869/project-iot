import { OpenAiContainerSettingsChatBot } from "~/components/modules/settings/components/open-ai-container/open-ai-container-settings-chat-bot";
import { CustomerProvider } from "~/hooks/customer/useCustomerStore";
import { ChatProvider } from "~/providers/chat/useChat";
import { ChatBotProvider } from "~/providers/chat/useChatbot";
import { ChatRoomProvider } from "~/providers/chat/useChatRoom";
import { MessageProvider } from "~/providers/chat/useMessage";
import { env } from "~/utils/common/env";

export default function ThirdPartyOpenAiPage() {
  const apiSocket = env?.PUBLIC_API_URL ?? "http://localhost:3000";

  return (
    <ChatProvider>
      <CustomerProvider>
        <ChatBotProvider>
          <ChatRoomProvider>
            <MessageProvider>
              <OpenAiContainerSettingsChatBot api={apiSocket} />
            </MessageProvider>
          </ChatRoomProvider>
        </ChatBotProvider>
      </CustomerProvider>
    </ChatProvider>
  );
}
