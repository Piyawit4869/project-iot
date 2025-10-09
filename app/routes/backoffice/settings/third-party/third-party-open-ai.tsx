import { env } from "process";
import { OpenAiContainerSettingsChatBot } from "~/components/modules/settings/components/open-ai-container/open-ai-container-settings-chat-bot";
import { CustomerProvider } from "~/hooks/customer/useCustomerStore";
import { ChatProvider } from "~/providers/chat/useChat";
import { ChatBotProvider } from "~/providers/chat/useChatbot";
import { ChatRoomProvider } from "~/providers/chat/useChatRoom";
import { MessageProvider } from "~/providers/chat/useMessage";

export default function ThirdPartyOpenAiPage() {
  const apiSocket = new URL(env.base_url ?? "http://localhost:3000").origin;

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
